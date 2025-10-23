from langchain.chains.retrieval import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain.chains.history_aware_retriever import create_history_aware_retriever
from langchain_core.prompts import MessagesPlaceholder
from ubility_langchain.model import Model
from ubility_langchain.vector_store import VectorStore
from ubility_langchain.langchain_memory import Memory, get_session_history
from logger_config import logger

from typing_extensions import Annotated, TypedDict
from typing import List
from langchain_core.runnables import RunnablePassthrough

class AnswerWithSources(TypedDict):
    """An answer to the question, with references."""

    answer: Annotated[
        str,
        ...,
        "The answer to the user question. Only answer. No references",
    ]
    references: Annotated[
        List[str],
        ...,
        "List only the names of the documents (excluding file paths) that were used to answer the question. Do not provide any explanations or additional information.",
    ]

class RAG:
    def __init__(self, data, credentials):
        self.data = data
        self.credentials = credentials
    
    async def _execute_rag_without_memory(self, sio, sid, conversation, input):
        try:
            if "provider" in self.data['embedding'] and "model" in self.data['embedding']:
                embeddings = Model(provider=self.data['embedding']["provider"], model=self.data['embedding']["model"], credentials=self.credentials[self.data['embedding']['credential']]).embedding()
            else:
                raise Exception("Missing Embedding Model Data")

            if 'type' in self.data['vectorStore'] :
                if self.data['vectorStore']['type'] != 'localStore':
                    vectorStore_type = self.data['vectorStore']["type"]
                    retriever = VectorStore(vectorStore_type, self.credentials[self.data['vectorStore']['credential']], self.data['vectorStore']).retrieve_data(embedding=embeddings)
                else:
                    if conversation: 
                        self.data['vectorStore']['dialogue_id'] = conversation['dialogue_id']
                    from ubility_langchain.document_loader import DocumentLoader
                    doc = DocumentLoader(type="basicDataLoader").load(self.data['vectorStore'])
            else:
                raise Exception('Missing VectorStore type')

            if "provider" in self.data['model'] and "params" in self.data['model'] and "optionals" in self.data['model']["params"]:
                llm = Model(provider=self.data['model']["provider"], model=self.data['model']["model"] if "model" in self.data['model'] else "", credentials= self.credentials[self.data['model']['credential']], params=self.data['model']["params"]).chat()
            else:
                raise Exception("Missing Model Data")

            if "prompt" in self.data['inputs'] and self.data['inputs']["prompt"]:
                template = self.data['inputs']["prompt"]
            else:
                template = """
                As an AI assistant you provide answers to the question {question} based on the given context. 
                You must adhere to the following points:
                -Do not use any external data source
                -Do not use your data set
                -Do not use internet to get answer
                -Do not use any external data source if the context is empty
                -Say I don't know. if the context is empty
                -------------------
                context: {context}
                """

            if input:
                self.data['inputs']["query"] = input # set the last input value

            if self.data['vectorStore']['type'] == 'localStore':
                input_data = {"question":self.data['inputs']["query"], "context":doc}
                prompt = ChatPromptTemplate.from_template(template)
                chain = (
                    {"context": RunnablePassthrough(), "question": RunnablePassthrough()}
                    | prompt
                    | llm.with_structured_output(AnswerWithSources)
                )

            else:
                input_data = self.data['inputs']["query"]
                prompt = ChatPromptTemplate.from_template(template)
                chain = (
                    {"context": retriever, "question": RunnablePassthrough()}
                    | prompt
                    | llm.with_structured_output(AnswerWithSources)
                )

            result = ''
            if sio and sid:
                for chunk in chain.stream(input_data):
                    if "answer" in chunk:
                        await sio.emit('rag', {
                            'type': 'chunk',
                            'answer': chunk["answer"]
                        }, room=sid)
                        result = chunk

                    if "references" in chunk:
                        await sio.emit('rag', {
                            'type': 'chunk',
                            'references': chunk["references"]
                        }, room=sid)
                        result = chunk

                await sio.emit('end', {
                    'type': 'end of chunks'
                }, room=sid)
            else:
                for chunk in chain.stream(input_data):
                    if "answer" in chunk:
                        result = chunk

            return result
        except Exception as exc:
            if sio and sid:
                logger.error(f"an error occurred while running this ai node: {str(exc)}")
                await sio.emit('error_message', {
                    'type': 'error_message',
                    'error': 'an error occurred while running this ai node'
                    }, room=sid)
            raise Exception(exc)
        
    async def _execute_rag_with_memory(self, sio, sid, conversation, conversation_id, input):
        try:
            if "provider" in self.data['model'] and "params" in self.data['model'] and "optionals" in self.data['model']["params"]:
                llm_model = Model(provider=self.data['model']["provider"], model=self.data['model']["model"] if "model" in self.data['model'] else "", credentials= self.credentials[self.data['model']['credential']], params=self.data['model']["params"]).chat()
            else:
                raise Exception("Missing Model Data")

            if "provider" in self.data['embedding'] and "model" in self.data['embedding']:
                embeddings = Model(provider=self.data['embedding']["provider"], model=self.data['embedding']["model"], credentials=self.credentials[self.data['embedding']['credential']]).embedding()
            else:
                raise Exception("Missing Embedding Model Data")

            if 'type' in self.data['vectorStore'] :
                vectorStore_type = self.data['vectorStore']["type"]
                if self.data['vectorStore']['type'] != 'localStore':
                    retriever = VectorStore(vectorStore_type, self.credentials[self.data['vectorStore']['credential']], self.data['vectorStore']).retrieve_data(embedding=embeddings)
                else:
                    if conversation:
                        self.data['vectorStore']['dialogue_id'] = conversation['dialogue_id']
                    from ubility_langchain.document_loader import DocumentLoader
                    doc = DocumentLoader(type="basicDataLoader").load(self.data['vectorStore'])
                    retriever = VectorStore(vectorStore_type, {}, self.data['vectorStore']).retrieve_data(embedding=embeddings, documents=doc)
                    
            else:
                raise Exception('Missing VectorStore type')
            
            if conversation_id:
                memory = Memory(historyId=conversation_id)
                # load ubility memory
                memory.load_streaming_memory(conversation_id)

            if "rephrasePrompt" in self.data['inputs'] and self.data['inputs']["rephrasePrompt"] != "":
                rephrasePrompt = self.data['inputs']["rephrasePrompt"]
            else:
                rephrasePrompt = """
                Given the following conversation and a user question, rephrase the question to be a standalone question.
                Chat History:
                {history}
                Follow Up Input: {question}
                Standalone Question:
                """

            if "responsePrompt" in self.data['inputs'] and self.data['inputs']["responsePrompt"] != "":
                responsePrompt = self.data['inputs']["responsePrompt"]
            else:
                responsePrompt = """
                I want you to act as a document that I am having a conversation with. Your name is "AI Assistant". Using the provided context, answer the user's question to the best of your ability using the resources provided.
                If there is nothing in the context relevant to the question at hand, just say "Hmm, I'm not sure" and stop after that. Refuse to answer any question not about the info. Never break character.
                ------------
                {context}
                ------------
                REMEMBER: If there is no relevant information within the context, just say "Hmm, I'm not sure". Don't try to make up an answer. Never break character.
                """
            
            contextualize_q_prompt = ChatPromptTemplate.from_messages(
                [
                    ("system", rephrasePrompt),
                    MessagesPlaceholder("history"),
                    ("human", "{input}"),
                ]
            )
            history_aware_retriever = create_history_aware_retriever(
                llm_model, retriever, contextualize_q_prompt
            )

            qa_prompt = ChatPromptTemplate.from_messages(
                [
                    ("system", responsePrompt),
                    MessagesPlaceholder("history"),
                    ("human", "{input}"),
                ]
            )
            question_answer_chain = create_stuff_documents_chain(llm_model, qa_prompt)

            rag_chain = create_retrieval_chain(
                history_aware_retriever, question_answer_chain
            )
            conversational_rag_chain = RunnableWithMessageHistory(
                rag_chain,
                get_session_history,
                input_messages_key="input",
                history_messages_key="history",
                output_messages_key="answer",
            )

            if input:
                self.data['inputs']["query"] = input # set the last input value

            result = ""
            if sio and sid and conversation_id:
                for chunk in conversational_rag_chain.stream({"input": self.data['inputs']['query']}, config={"configurable": {"session_id": conversation_id}}):
                    if "answer" in chunk:
                        await sio.emit('rag', {
                            'type': 'chunk',
                            'answer': chunk["answer"]
                        }, room=sid)
                        result += chunk['answer']
                result = {"answer": result}
                await sio.emit('end', {
                    'type': 'end of chunks'
                }, room=sid)
            else:
                result = conversational_rag_chain.invoke({"input": self.data['inputs']['query']}, config={"configurable": {"session_id": None}})
                result = {"answer": result['answer']}

            return result

        except Exception as exc:
            if sio and sid:
                logger.error(f"an error occurred while running this ai node: {str(exc)}")
                await sio.emit('error_message', {
                    'type': 'error_message',
                    'error': 'an error occurred while running this ai node'
                    }, room=sid)
            raise Exception(exc)

    async def stream(self, sio, sid, conversation, conversation_id, input=None):
        # return await self._execute_rag_with_memory(sio, sid, conversation, conversation_id, input)
        return await self._execute_rag_without_memory(sio, sid, conversation, input)
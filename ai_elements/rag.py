from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import ChatPromptTemplate
from typing_extensions import Annotated, TypedDict
from typing import List
from ubility_langchain.vector_store import VectorStore
from ubility_langchain.model import Model
import logging


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
    
    async def stream(self, sio, sid, conversation, input=None):
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
                logging.error(f"an error occurred while running this ai node: {str(exc)}")
                await sio.emit('error_message', {
                    'type': 'error_message',
                    'error': 'an error occurred while running this ai node'
                    }, room=sid)
            raise Exception(exc)
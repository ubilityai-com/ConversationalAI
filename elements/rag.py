from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import ChatPromptTemplate
from typing_extensions import Annotated, TypedDict
from typing import List
from ubility_langchain.document_loader import DocumentLoader
from ubility_langchain.vector_store import VectorStore
from ubility_langchain.model import Model


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
    
    async def stream(self, sio, sid):
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
                    # in this case, data['vectorStore'] will contain file name instead of file content ---> get file content from the file name and add this key to data['vectorStore']
                    doc = DocumentLoader(type="basicDataLoader").load(self.data['vectorStore'])
            else:
                raise Exception('Missing VectorStore type')

            if "provider" in self.data['model'] and "params" in self.data['model'] and "optionals" in self.data['model']["params"]:
                llm = Model(provider=self.data['model']["provider"], model=self.data['model']["model"] if "model" in self.data['model'] else "", credentials= self.credentials[self.data['model']['credential']], params=self.data['model']["params"]).chat()
            else:
                raise Exception("Missing Model Data")

            if self.data['vectorStore']['type'] == 'localStore':
                if "prompt" in self.data['inputs']:
                    template = self.data['inputs']["prompt"]
                else:
                    template = """
                    As an AI assistant you provide answers to the question {question} based on the given document. 
                    You must adhere to the following points:
                    -Do not use any external data source
                    -Do not use your data set
                    -Do not use internet to get answer
                    -Do not use any external data source if the document is empty
                    -Say Idont know. if the document is empty
                    -------------------
                    document: {document}
                    """
                    
                input_data = {"question":self.data['inputs']["query"], "document":doc}
                prompt = ChatPromptTemplate.from_template(template)
                chain = (
                    {"document": RunnablePassthrough(), "question": RunnablePassthrough()}
                    | prompt
                    | llm.with_structured_output(AnswerWithSources)
                )

            else:
                if "prompt" in self.data['inputs']:
                    template = self.data['inputs']["prompt"]
                else:
                    template = """
                    As an AI assistant you provide answers to the question {question} based on the given context. 
                    You must adhere to the following points:
                    -Do not use any external data source
                    -Do not use your data set
                    -Do not use internet to get answer
                    -Do not use any external data source if the context is empty
                    -Say Idont know. if the context is empty
                    -------------------
                    context: {context}
                    """

                input_data = self.data['inputs']["query"]
                prompt = ChatPromptTemplate.from_template(template)
                chain = (
                    {"context": retriever, "question": RunnablePassthrough()}
                    | prompt
                    | llm.with_structured_output(AnswerWithSources)
                )

            result = ''
            for chunk in chain.stream(input_data):
                if "answer" in chunk:
                    await sio.emit('message', {
                        'type': 'chunk',
                        'chunk': chunk["answer"]
                    }, room=sid)
                    result = chunk["answer"]

            await sio.emit('message', {
                'type': 'end of chunks'
            }, room=sid)

            return result

        except Exception as exc:
            await sio.emit('error_message', {
                'type': 'error_message',
                'error': str(exc)
                }, room=sid)
            raise Exception(exc)
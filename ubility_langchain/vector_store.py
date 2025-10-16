
###################################################################################
# A vector store takes care of storing embedded data and performing vector search.#
###################################################################################
import logging
from langchain_core.embeddings import Embeddings


class VectorStore:
    
    _VALID_TYPES=["pinecone"]
    
    
    def __init__(
        self,
        type: str,
        credentials: dict,
        params: dict = {}
        ):
        """
            Create object for your vector store
            
            Example:
                .. code-block:: python

                    my_vectorstore_object = VectorStore(
                        type = "pinecone",
                        credentials = {"pineconeApiKey":"********************"},
                        params = {"indexName":"my_index_name"}
                    )
        """
        logging.info("--------------Start--------------")
        logging.info("Setting up vectore store object")
        
        if type in self._VALID_TYPES:
            self.type = type
        else:
            raise ValueError(f"Invalid type '{type}'. Valid types are: {', '.join(self._VALID_TYPES)}")
        
        self.credentials=credentials
        self.params=params

        # Call the vector store functions based on the type
        if self.type == "pinecone":
            logging.info("It is a pinecone vector store")
            self._setup_pinecone(self.credentials, self.params)
            

    #set up pinecone object 
    def _setup_pinecone(self,cred,params):
        try:
            if "pineconeApiKey" in cred:
                self.api_key = cred["pineconeApiKey"]
                self.index_name=params["indexName"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing Pinecone credentials")
        except Exception as error:
            raise Exception(error)

 
    def retrieve_data(
        self,
        embedding:Embeddings
        ):
        """
            Retrieve data from your vectore store

            Args:
                embedding: numerical representations of texts in a multidimensional space (you can retrieve it from embedding models)
                
            Return VectorStoreRetriever initialized from this VectorStore.

        """
        logging.info("Retrieve data from your vectore store")
        try:
            if self.type == "pinecone":
                from langchain_pinecone import PineconeVectorStore as langPinecone
                vectordb = langPinecone(
                    embedding=embedding,
                    index_name=self.index_name,
                    pinecone_api_key=self.api_key
                )
                retriever = vectordb.as_retriever()

            return retriever
        except ValueError as error:
            raise ValueError(error)
        except Exception as error:
            raise Exception(error)
        
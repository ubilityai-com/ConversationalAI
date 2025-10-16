##################################################################
# Use document loaders to load data from a source as Document's. #
##################################################################
from langchain_community.document_loaders import (
    TextLoader,
    PyPDFLoader,
    CSVLoader,
    JSONLoader,
    SeleniumURLLoader,
    UnstructuredExcelLoader,
    UnstructuredPowerPointLoader,
    UnstructuredWordDocumentLoader,
)
import logging
import os


file_name=''


class DocumentLoader:
    
    _VALID_LOADERS=["basicDataLoader"]
    
    def __init__(
        self,
        type: str
        ):
        """
            Create object for your Document Loader
            
            Example:
                .. code-block:: python

                    my_dl_object = DocumentLoader(
                        type = "basicDataLoader"
                    )
        """
        logging.info("Setting up document loader object")
        
        if type in self._VALID_LOADERS:
            self.type = type
        else:
            raise ValueError(f"Invalid provider '{type}'. Valid providers are: {', '.join(self._VALID_LOADERS)}")
        

    def load(self,loader_data: dict):
        global file_name
        """
            Load data method
            
            Example:
                .. code-block:: python
                    
                    data={"dataType":"pdf", "dataFormat": "Name", "data": "FILE_NAME.pdf"}
                    my_dl_object = DocumentLoader(type = "basicDataLoader").load(data)
        """
        try:
            logging.info("Load data method")

            if self.type == "basicDataLoader":
                response = basicDataLoader(loader_data)
            return response.load()

        except Exception as error:
            raise Exception(error)


def basicDataLoader(loader_data):
    logging.info("load data in basicDataLoader")
    global file_name
    try:
        dataType = loader_data.get('dataType', None)
        dataFormat = loader_data['dataFormat'] # Name or URL
        data = loader_data['data']

        if dataType and dataFormat == 'Name':
            logging.info("load data from a local file")
            temp_folder_path = f"{os.getcwd()}/temp" # get current working directory 
            file_name=f"{temp_folder_path}/{loader_data['dialogue_id']}/{data}" # in this case, data is the file name

            allowed_data_types = ["pdf", "csv", "json", "txt", "xls", "xlsx", "doc", "docx", "ppt", "pptx"]
            if dataType not in allowed_data_types:
                raise Exception(f"Invalid data type: '{dataType}'. Valid data types: {', '.join(allowed_data_types)}")

            if dataType == "pdf":
                logging.info("data type PDF")
                response = PyPDFLoader(file_name)

            elif dataType == "csv":
                logging.info("data type CSV")
                response = CSVLoader(file_name)

            elif dataType == "json":
                logging.info("data type JSON")
                response = JSONLoader(file_path=file_name,jq_schema='.',text_content=False)

            elif dataType == "txt":
                logging.info("data type TEXT")
                response = TextLoader(file_name)

            elif dataType == "xls" or dataType == "xlsx":
                logging.info("data type Excel")
                response = UnstructuredExcelLoader(file_name)

            elif dataType == "doc" or dataType == "docx":
                logging.info("data type Word")
                response = UnstructuredWordDocumentLoader(file_name)

            elif dataType == "ppt" or dataType == "pptx":
                logging.info("data type Powerpoint")
                response = UnstructuredPowerPointLoader(file_name)
        
        else:
            logging.info("load data by URL")
            response = SeleniumURLLoader([data]) # data is the url to load

        return response
    except Exception as error:
        raise Exception(error)
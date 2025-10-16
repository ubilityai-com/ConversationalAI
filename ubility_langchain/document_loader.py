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
            if self.type == "basicDataLoader":
                response = basicDataLoader(loader_data)
            return response.load()

        except Exception as error:
            raise Exception(error)


def basicDataLoader(loader_data):
    global file_name
    try:
        dataType = loader_data.get('dataType', None)
        dataFormat = loader_data['dataFormat'] # Name or URL
        data = loader_data['data']

        if dataType and dataFormat == 'Name':
            temp_folder_path = f"{os.getcwd()}/temp" # get current working directory 
            file_name=f"{temp_folder_path}/{loader_data['dialogue_id']}/{data}" # in this case, data is the file name

            allowed_data_types = ["pdf", "csv", "json", "txt", "xls", "xlsx", "doc", "docx", "ppt", "pptx"]
            if dataType not in allowed_data_types:
                raise Exception(f"Invalid data type: '{dataType}'. Valid data types: {', '.join(allowed_data_types)}")

            if dataType == "pdf":
                response = PyPDFLoader(file_name)

            elif dataType == "csv":
                response = CSVLoader(file_name)

            elif dataType == "json":
                response = JSONLoader(file_path=file_name,jq_schema='.',text_content=False)

            elif dataType == "txt":
                response = TextLoader(file_name)

            elif dataType == "xls" or dataType == "xlsx":
                response = UnstructuredExcelLoader(file_name)

            elif dataType == "doc" or dataType == "docx":
                response = UnstructuredWordDocumentLoader(file_name)

            elif dataType == "ppt" or dataType == "pptx":
                response = UnstructuredPowerPointLoader(file_name)
        
        else:
            response = SeleniumURLLoader([data]) # data is the url to load

        return response
    except Exception as error:
        raise Exception(error)
##################################################################
# Use document loaders to load data from a source as Document's. #
##################################################################
import logging
import os
import base64
import random
import string
import json


from langchain_community.document_loaders import TextLoader,PyPDFLoader,CSVLoader,JSONLoader,SeleniumURLLoader,WikipediaLoader,UnstructuredExcelLoader,UnstructuredPowerPointLoader,UnstructuredWordDocumentLoader


file_name=''


class DocumentLoader:
    
    _VALID_LOADERS=["basicDataLoader","webPageLoader","wikipediaLoader"]
    
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
                    
                    urls_list=["https://uintegrate.io"]
                    data={"urls":urls_list}
                    my_dl_object = DocumentLoader(type = "webPageLoader").load(data)
        """
        try:
            logging.info("Load data method")

            if self.type == "basicDataLoader":
                response = basicDataLoader(loader_data)
            elif self.type == "webPageLoader":
                response = webPageLoader(loader_data)
            elif self.type == "wikipediaLoader":
                response = wikipediaLoader(loader_data)
            documents = response.load()

            for doc in documents:
                if "links" in doc.metadata:
                    # If links are complex, ensure they are strings or lists of strings
                    links = doc.metadata["links"]
                    if isinstance(links, list):
                        # Simplify the links, e.g., extract URLs only as strings
                        doc.metadata["links"] = [str(link.get("url", "")) for link in links if "url" in link]
                    else:
                        # Convert to string if it's not already
                        doc.metadata["links"] = str(links)

            logging.info("////file_name////")
            logging.info(file_name)
            logging.info("////file_name////")
            # if file_name != "":
            #     logging.info(f"deleting temp file: {file_name}")
            #     os.remove(file_name) #delete file 
            #     file_name=''
            #     logging.info("file deleted succ")
            return documents
        except Exception as error:
            raise Exception(error)


def wikipediaLoader(loader_data):
    logging.info("load data in wikipediaLoader")
    try:
        docs=loader_data['loadMaxDocs']
        query=loader_data['query']
        return WikipediaLoader(query=query, load_max_docs=docs)
    except Exception as error:
        raise Exception(error)


def webPageLoader(loader_data):
    logging.info("load data in webPageLoader")
    try:
        url = loader_data['url']
        return SeleniumURLLoader([url])
    except Exception as error:
        raise Exception(error)

def basicDataLoader(loader_data):
    logging.info("load data in basicDataLoader")
    global file_name
    try:
        temp_folder_path = f"{os.getcwd()}/temp" # get current working directory 
        dataType = loader_data['dataType']
        dataFormat = loader_data['dataFormat']
        data = loader_data['data']
        allowed_data_types = ["pdf", "csv", "json", "txt", "xls", "xlsx", "doc", "docx", "ppt", "pptx"]
        if dataType not in allowed_data_types:
            raise Exception(f"Invalid data type: '{dataType}'. Valid data types: {', '.join(allowed_data_types)}")

        if dataType == "pdf":
            logging.info("data type PDF")
            if dataFormat == "URL":  # no (Data) format_type for pdf
                logging.info("data format URL")
                response = PyPDFLoader(data)
            elif dataFormat == "Name":
                logging.info("load data from a local file")
                file_name=f"{temp_folder_path}/{loader_data['dialogue_id']}/{data}" # in this case, the variable data will contain the file name
                response = PyPDFLoader(file_name)
        elif dataType == "csv":
            logging.info("data type CSV")
            if dataFormat == "Data": 
                logging.info("data format DATA")
                file_name=f"{temp_folder_path}/{loader_data['dialogue_id']}/{data}" # in this case, the variable data will contain the file name
                response = CSVLoader(file_name)
            elif dataFormat == "Name":
                logging.info("load data from a local file")
                file_name=f"{temp_folder_path}/{loader_data['dialogue_id']}/{data}" # in this case, the variable data will contain the file name
                response = CSVLoader(file_name)
        elif dataType == "json":
            logging.info("data type JSON")
            if dataFormat == "URL":
                logging.info("data format URL")
                response = SeleniumURLLoader([data])
            elif dataFormat == "Data":
                logging.info("data format DATA")
                temp_file_name=generate_random_filename("json")
                file_name=f"{temp_folder_path}/{loader_data['dialogue_id']}/{temp_file_name}" 
                if isinstance(data,dict):
                    data=json.dumps(data)
                data=data.replace("'", '"')
                data=data.replace("True", 'true')
                data=data.replace("False", 'false')
                data=data.replace("null", 'None')
                create_temp_file(file_name,data) #create file
                response = JSONLoader(file_path=file_name,jq_schema='.',text_content=False)
            elif dataFormat == "Name":
                logging.info("load data from a local file")
                file_name=f"{temp_folder_path}/{loader_data['dialogue_id']}/{data}" # in this case, the variable data will contain the file name
                response = JSONLoader(file_path=file_name,jq_schema='.',text_content=False)
        elif dataType == "txt":
            logging.info("data type TEXT")
            if dataFormat == "URL":
                logging.info("data format URL")
                response = SeleniumURLLoader([data])
            elif dataFormat == "Data":
                logging.info("data format DATA")
                temp_file_name=generate_random_filename("txt")
                file_name=f"{temp_folder_path}/{loader_data['dialogue_id']}/{temp_file_name}" 
                create_temp_file(file_name,data) #create file
                response = TextLoader(file_name)
            elif dataFormat == "Name":
                logging.info("load data from a local file")
                file_name=f"{temp_folder_path}/{loader_data['dialogue_id']}/{data}" # in this case, the variable data will contain the file name
                response = TextLoader(file_name)
        elif dataType == "xls" or dataType == "xlsx":
            logging.info("data type Excel")
            if dataFormat == "URL": 
                logging.info("data format URL")
                response = SeleniumURLLoader([data])
            elif dataFormat == "Name":
                logging.info("load data from a local file")
                file_name=f"{temp_folder_path}/{loader_data['dialogue_id']}/{data}" # in this case, the variable data will contain the file name
                response = UnstructuredExcelLoader(file_name)
        elif dataType == "doc" or dataType == "docx":
            logging.info("data type Word")
            if dataFormat == "URL": 
                logging.info("data format URL")
                response = SeleniumURLLoader([data])
            elif dataFormat == "Name":
                logging.info("load data from a local file")
                file_name=f"{temp_folder_path}/{loader_data['dialogue_id']}/{data}" # in this case, the variable data will contain the file name
                response = UnstructuredWordDocumentLoader(file_name)
        elif dataType == "ppt" or dataType == "pptx":
            logging.info("data type Powerpoint")
            if dataFormat == "URL": 
                logging.info("data format URL")
                response = SeleniumURLLoader([data])
            elif dataFormat == "Name":
                logging.info("load data from a local file")
                file_name=f"{temp_folder_path}/{loader_data['dialogue_id']}/{data}" # in this case, the variable data will contain the file name
                response = UnstructuredPowerPointLoader(file_name)
        return response
    except Exception as error:
        raise Exception(error)

def generate_random_filename(extension):
    logging.info("generate random filename")
    try:
        random_string = ''.join(random.choices(string.ascii_letters + string.digits, k=10))  # Generate a random string of letters and digits
        filename = random_string + '.' + extension   # Concatenate the random string with the extension
        return filename
    except Exception as error:
        raise Exception (error)



def create_temp_file(temp_file_name,data):
    logging.info("creating file")
    try:
        with open(temp_file_name, 'w') as file:
            try:
                file.write(data)
            except (IOError, OSError):
                raise Exception("Error writing to file")
    except (FileNotFoundError, PermissionError, OSError):
        raise Exception("Error opening file")
    finally:
        file.close()
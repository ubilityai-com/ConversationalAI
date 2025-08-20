#####################################################################
# The core element of any language model application is...the model.#
#####################################################################


# pip install -qU langchain-anthropic
# pip install --upgrade --quiet  langchain-aws
# pip install langchain-openai
# pip install --upgrade --quiet  langchain-google-vertexai
# pip install -U langchain-mistralai
# pip install --upgrade langchain-together
# pip install -U langchain-cohere
# pip install -qU langchain-google-genai
# pip install -qU langchain-groq
# pip install langchain-ai21
# pip install -qU langchain-fireworks
# pip install -qU langchain-huggingface
# pip install langchain_nvidia_ai_endpoints
# pip install langchain_nomic
# pip install langchain-deepseek
# pip install langchain-xai
# pip install langchain-cerebras
# pip install langchain_ollama

import logging
from typing import (Any,Callable,Dict,Generator,Iterable,List,Optional,Tuple,Type)
import os
import types


class Model:
    
    _VALID_PROVIDERS=["openAi","ollama","anthropic","awsBedrock","azureOpenAi","mistralAi","cohere","togetherAi","huggingFace","vertexAi","googleGenerativeAi","groq","ai21","fireworks","nvidia","nomic", "deepseek", "xai", "openRouter", "cerebras", "ibm", "liteLLM"]
    
    def __init__(
        self,
        provider: str,
        model: str,
        credentials: dict,
        params: dict = {}
        ):
        """
            Create object for your model
            
            Example:
                .. code-block:: python

                    from ubility_langchain.model import Model

                    my_model_object = Model(
                        provider = "openAi",
                        credentials = {"apiKey":"fdfd7fds8fsd"},
                        model = "text-embedding-3-large"
                    )
        """
        logging.info("--------------Start--------------")
        logging.info("Setting up model object")
        
        if provider in self._VALID_PROVIDERS:
            self.provider = provider
        else:
            raise ValueError(f"Invalid provider '{provider}'. Valid providers are: {', '.join(self._VALID_PROVIDERS)}")
        
        self.model= model
        self.credentials=credentials
        self.params=params
        
        # Call the model functions based on the provider
        if self.provider == "openAi":
            logging.info("It is a openAi provider")
            self._setup_openAi(self.credentials)
        elif self.provider == "ollama":
            logging.info("It is a ollama provider")
            self._setup_ollama(self.credentials)
        elif self.provider == "anthropic":
            logging.info("It is an anthropic provider")
            self._setup_anthropic(self.credentials)
        elif self.provider == "awsBedrock":
            logging.info("It is an awsBedrock provider")
            self._setup_awsBedrock(self.credentials)
        elif self.provider == "deepseek":
            logging.info("It is a deepseek provider")
            self._setup_deepseek(self.credentials)
        elif self.provider == "xai":
            logging.info("It is an xai provider")
            self._setup_xai(self.credentials)
        elif self.provider == "openRouter":
            logging.info("It is an openRouter provider")
            self._setup_openRouter(self.credentials)
        elif self.provider == "cerebras":
            logging.info("It is an cerebras provider")
            self._setup_cerebras(self.credentials)
        elif self.provider == "ibm":
            logging.info("It is an IBM Watsonx provider")
            self._setup_ibm(self.credentials)
        elif self.provider == "liteLLM":
            logging.info("It is an liteLLM provider")
            self._setup_liteLLM(self.credentials)
        elif self.provider == "azureOpenAi":
            logging.info("It is an azureOpenAi provider")
            self._setup_azureOpenAi(self.credentials)
        elif self.provider == "mistralAi":
            logging.info("It is an mistralAi provider")
            self._setup_mistralAi(self.credentials)
        elif self.provider == "cohere":
            logging.info("It is an cohere provider")
            self._setup_cohere(self.credentials)
        elif self.provider == "togetherAi":
            logging.info("It is an togetherAi provider")
            self._setup_togetherAi(self.credentials)
        elif self.provider == "huggingFace":
            logging.info("It is an huggingFace provider")
            self._setup_huggingFace(self.credentials)
        elif self.provider == "vertexAi":
            logging.info("It is an vertexAi provider")
            self._setup_vertexAi(self.credentials)
        elif self.provider == "googleGenerativeAi":
            logging.info("It is an GoogleGenerativeAi provider")
            self._setup_googleGenerativeAI(self.credentials)
        elif self.provider == "groq":
            logging.info("It is an Groq provider")
            self._setup_groq(self.credentials)
        elif self.provider == "fireworks":
            logging.info("It is an Fireworks provider")
            self._setup_fireworks(self.credentials)
        elif self.provider == "ai21":
            logging.info("It is an Ai21 provider")
            self._setup_ai21(self.credentials)
        elif self.provider =="nvidia" :
            logging.info("It is a nvidia provider")
            self._setup_nvidia(self.credentials)
        elif self.provider =="nomic" :
            logging.info("It is a nomic provider")
            self._setup_nomic(self.credentials)

    #set up openAi object 
    def _setup_openAi(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing OpenAI credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up ollama object 
    def _setup_ollama(self,cred):
        try:
            if "ollamaBaseUrl" in cred:
                self.base_url=cred["ollamaBaseUrl"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing Ollama credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up anthropic object 
    def _setup_anthropic(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing Anthropic credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up awsBedrock object 
    def _setup_awsBedrock(self,cred):
        try:
            if "regionName" in cred:
                self.region_name=cred["regionName"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing AWS Bedrock credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up deepseek object 
    def _setup_deepseek(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing Deepseek credentials")
        except Exception as error:
            raise Exception(error)

    #set up xai object 
    def _setup_xai(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing XAI credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up openRouter object 
    def _setup_openRouter(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing OpenRouter credentials")
        except Exception as error:
            raise Exception(error)
    
    #set up cerebras object 
    def _setup_cerebras(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing Cerebras credentials")
        except Exception as error:
            raise Exception(error)

    #set up ibm object 
    def _setup_ibm(self,cred):
        try:
            if "apiKey" in cred and "baseUrl" in cred and "projectId" in cred and "version" in cred:
                self.api_key=cred["apiKey"]
                self.base_url=cred["baseUrl"]
                self.project_id=cred["projectId"]
                self.version=cred["version"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing IBM credentials")
        except Exception as error:
            raise Exception(error)

    #set up liteLLM object 
    def _setup_liteLLM(self,cred):
        try:
            if "apiKey" in cred and "baseUrl" in cred:
                self.api_key=cred["apiKey"]
                self.base_url=cred["baseUrl"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing liteLLM credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up azureOpenAi object 
    def _setup_azureOpenAi(self,cred):
        try:
            if "apiKey" in cred and "apiVersion" in cred and "resourceName" in cred:
                self.api_key=cred["apiKey"]
                self.api_version=cred["apiVersion"]
                self.azure_endpoint=f"https://{cred['resourceName']}.openai.azure.com/"
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing Azure OpenAI credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up mistralAi object 
    def _setup_mistralAi(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing MistralAI credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up cohere object 
    def _setup_cohere(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing Cohere credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up togetherAi object 
    def _setup_togetherAi(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing TogetherAi credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up huggingFace object 
    def _setup_huggingFace(self,cred):
        try:
            if "apiToken" in cred:
                self.api_token=cred["apiToken"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing HuggingFace credentials or params")
        except Exception as error:
            raise Exception(error)

    #set up vertexAi object 
    def _setup_vertexAi(self,cred):
        try:
            if "projectId" in cred and 'credentials' in cred:
                optionals = self.params
                self.kwargs = {
                        "project_id": cred["projectId"],
                        "credentials": cred["credentials"],
                        **optionals
                    }
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing VertexAI credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up googleGenerativeAI object 
    def _setup_googleGenerativeAI(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing Gemini credentials")
        except Exception as error:
            raise Exception(error)
    
    #set up groq object 
    def _setup_groq(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing Groq credentials")
        except Exception as error:
            raise Exception(error) 

    # set up fireworks object
    def _setup_fireworks(self, cred):
        try:
            if "apiKey" in cred:
                self.api_key = cred["apiKey"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing Fireworks credentials")
        except Exception as error:
            raise Exception(error)

    # set up ai21 object
    def _setup_ai21(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing AI21 credentials")
        except Exception as error:
            raise Exception(error) 
        
    def _setup_nvidia(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
                logging.info("--------------Done--------------")
            elif "baseUrl" in cred:
                self.baseUrl= cred["baseUrl"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing Nvidia credentials")
        except Exception as error:
            raise Exception(error) 

    def _setup_nomic(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
                logging.info("--------------Done--------------")
            else:
                raise Exception("missing Nomic credentials")
        except Exception as error:
            raise Exception(error) 

    def embedding(self):
        """
            Embedding model are used to transform words into numerical arrays or vectors.
        """
        _VALID_EMBEDDING_PROVIDERS=["openAi","ollama","googleGenerativeAi","togetherAi","cohere","mistralAi","fireworks","nvidia","nomic", "ibm"]
        logging.info("Create embedding model")
        try:
            if self.provider in _VALID_EMBEDDING_PROVIDERS:
                optionals = self.params
                if self.provider == "openAi":
                    from langchain_openai import OpenAIEmbeddings
                    response = OpenAIEmbeddings(openai_api_key= self.api_key,model=self.model,**optionals)
                elif self.provider == "ollama":
                    from langchain_community.embeddings import OllamaEmbeddings
                    response = OllamaEmbeddings(base_url=self.base_url,model=self.model,**optionals)
                elif self.provider == "googleGenerativeAi":
                    from langchain_google_genai import GoogleGenerativeAIEmbeddings
                    response = GoogleGenerativeAIEmbeddings(google_api_key=self.api_key,model=self.model,**optionals) 
                elif self.provider == "togetherAi":
                    from langchain_together import TogetherEmbeddings   
                    response = TogetherEmbeddings(api_key=self.api_key,model=self.model,**optionals)
                elif self.provider == "cohere":
                    from langchain_cohere import CohereEmbeddings
                    response = CohereEmbeddings(cohere_api_key=self.api_key,model=self.model,**optionals)
                elif self.provider == "mistralAi":
                    from langchain_mistralai import MistralAIEmbeddings
                    response = MistralAIEmbeddings(api_key=self.api_key,model=self.model,**optionals)
                elif self.provider == "ibm":
                    from langchain_ibm import WatsonxEmbeddings
                    ibm_watson_params = {}
                    if "truncateInputTokens" in optionals:
                        from ibm_watsonx_ai.metanames import EmbedTextParamsMetaNames
                        ibm_watson_params[EmbedTextParamsMetaNames.TRUNCATE_INPUT_TOKENS] = int(optionals.pop("truncateInputTokens"))
                    response = WatsonxEmbeddings(model_id=self.model, project_id=self.project_id, url=self.base_url, apikey=self.api_key, version=self.version, **optionals, params=ibm_watson_params)
                elif self.provider == "fireworks":
                    from langchain_fireworks import FireworksEmbeddings
                    response = FireworksEmbeddings(api_key=self.api_key, model=self.model, **optionals)
                elif self.provider == "nvidia":
                    from langchain_nvidia_ai_endpoints import NVIDIAEmbeddings
                    if self.api_key:
                       response = NVIDIAEmbeddings(api_key=self.api_key,model=self.model,**optionals) 
                    elif self.baseUrl :    
                       response = NVIDIAEmbeddings(base_url =self.baseUrl,model=self.model,**optionals)
                elif self.provider == "nomic":
                    from langchain_nomic import NomicEmbeddings
                    response = NomicEmbeddings(nomic_api_key=self.api_key,model=self.model,**optionals)
                return response
            else:
                raise ValueError(f"Invalid method for provider '{self.provider}'. Valid providers for embedding method are: {', '.join(_VALID_EMBEDDING_PROVIDERS)}")
        except ValueError as error:
            raise ValueError(error)
        except Exception as error:
            raise Exception(error)
        
    def chat(self):
        """
            A chat model is a language model that uses chat messages as inputs and returns chat messages as outputs (as opposed to using plain text)
        """
        _VALID_CHAT_PROVIDERS=["openAi","ollama","anthropic","awsBedrock","azureOpenAi","mistralAi","cohere","togetherAi","huggingFace","vertexAi","googleGenerativeAi","groq","fireworks","ai21","nvidia", "deepseek", "xai", "openRouter", "cerebras", "ibm", "liteLLM"]
        logging.info("Create chat model")
        try:
            if self.provider in _VALID_CHAT_PROVIDERS:
                optionals = self.params["optionals"]
                if self.provider == "openAi":
                    from langchain_openai import ChatOpenAI
                    llm = ChatOpenAI(model=self.model, api_key=self.api_key,**optionals)
                elif self.provider == "ollama":
                    from langchain_community.chat_models.ollama import ChatOllama
                    llm = ChatOllama(model=self.model, base_url=self.base_url,**optionals)
                elif self.provider == "anthropic":
                    from langchain_anthropic import ChatAnthropic
                    llm = ChatAnthropic(model=self.model, anthropic_api_key=self.api_key,**optionals)
                elif self.provider == "awsBedrock":
                    from langchain_aws import ChatBedrock
                    llm = ChatBedrock(region_name=self.region_name, model_id=self.model, model_kwargs=optionals)
                elif self.provider == "deepseek":
                    from langchain_deepseek import ChatDeepSeek
                    llm = ChatDeepSeek(api_key=self.api_key, model=self.model, **optionals)
                elif self.provider == "xai":
                    from langchain_xai import ChatXAI
                    llm = ChatXAI(api_key=self.api_key, model=self.model, **optionals)
                elif self.provider == "openRouter":
                    from langchain_openai import ChatOpenAI
                    llm = ChatOpenAI(model=self.model, api_key=self.api_key,**optionals)
                elif self.provider == "cerebras":
                    from langchain_cerebras import ChatCerebras
                    llm = ChatCerebras(model=self.model, api_key=self.api_key,**optionals)
                elif self.provider == "ibm":
                    from langchain_ibm import ChatWatsonx
                    llm = ChatWatsonx(model_id=self.model, project_id=self.project_id, url=self.base_url, apikey=self.api_key, version=self.version, **optionals)
                elif self.provider == "liteLLM":
                    from langchain_openai import ChatOpenAI
                    llm = ChatOpenAI(model=self.model, api_key=self.api_key, base_url=self.base_url, **optionals)
                elif self.provider == "azureOpenAi":
                    from langchain_openai import AzureChatOpenAI
                    llm = AzureChatOpenAI(azure_deployment=self.model ,api_key=self.api_key, api_version=self.api_version, azure_endpoint=self.azure_endpoint, **optionals)
                elif self.provider == "mistralAi":
                    from langchain_mistralai import ChatMistralAI
                    llm = ChatMistralAI(api_key=self.api_key, model_name=self.model, **optionals)
                elif self.provider == "cohere":
                    from langchain_cohere import ChatCohere
                    llm = ChatCohere(cohere_api_key=self.api_key, model=self.model, **optionals)
                elif self.provider == "togetherAi":
                    from langchain_together import ChatTogether
                    llm = ChatTogether(api_key=self.api_key, model=self.model, **optionals)
                elif self.provider == "huggingFace":
                    from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
                    llm_model = HuggingFaceEndpoint(huggingfacehub_api_token=self.api_token, repo_id=self.model, **optionals)
                    llm = ChatHuggingFace(llm=llm_model)
                elif self.provider == "vertexAi":
                    from langchain_google_vertexai import ChatVertexAI
                    kwargs=self.kwargs
                    llm = ChatVertexAI(model_name=self.model, **kwargs)
                elif self.provider == "googleGenerativeAi":
                    from langchain_google_genai import ChatGoogleGenerativeAI
                    llm = ChatGoogleGenerativeAI(api_key=self.api_key,model=self.model,**optionals)
                elif self.provider == "groq":    
                    from langchain_groq import ChatGroq
                    llm = ChatGroq(api_key=self.api_key,model=self.model,**optionals)
                elif self.provider == "fireworks":
                    from langchain_fireworks import ChatFireworks
                    llm = ChatFireworks(api_key=self.api_key, model=self.model, **optionals)
                elif self.provider == "ai21":
                    from langchain_ai21 import ChatAI21
                    llm = ChatAI21(api_key=self.api_key, model=self.model, **optionals)
                elif self.provider == "nvidia":    
                    from langchain_nvidia_ai_endpoints import ChatNVIDIA 
                    if self.api_key:
                       llm = ChatNVIDIA(api_key=self.api_key,model=self.model,**optionals) 
                    elif self.baseUrl :    
                       llm = ChatNVIDIA(base_url=self.baseUrl,model=self.model,**optionals) 
                return llm
            else:
                raise ValueError(f"Invalid method for provider '{self.provider}'. Valid providers for chat method are: {', '.join(_VALID_CHAT_PROVIDERS)}")
        except ValueError as error:
            raise ValueError(error)
        except Exception as error:
            raise Exception(error)
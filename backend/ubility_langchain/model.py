#####################################################################
# The core element of any language model application is...the model.#
#####################################################################

import logging
import json


class Model:
    
    _VALID_PROVIDERS=["openAi","ollama","anthropic","awsBedrock","azureOpenAi","mistralAi","cohere","togetherAi","huggingFace","vertexAi","googleGenerativeAi","groq","fireworks","nvidia","nomic", "deepseek", "xai", "openRouter", "cerebras", "ibm", "liteLLM"]
    
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
        
        if provider in self._VALID_PROVIDERS:
            self.provider = provider
        else:
            raise ValueError(f"Invalid provider '{provider}'. Valid providers are: {', '.join(self._VALID_PROVIDERS)}")
        
        self.model= model
        self.credentials=credentials
        self.params=params
        
        # Call the model functions based on the provider
        if self.provider == "openAi":
            self._setup_openAi(self.credentials)
        elif self.provider == "ollama":
            self._setup_ollama(self.credentials)
        elif self.provider == "anthropic":
            self._setup_anthropic(self.credentials)
        elif self.provider == "awsBedrock":
            self._setup_awsBedrock(self.credentials)
        elif self.provider == "deepseek":
            self._setup_deepseek(self.credentials)
        elif self.provider == "xai":
            self._setup_xai(self.credentials)
        elif self.provider == "openRouter":
            self._setup_openRouter(self.credentials)
        elif self.provider == "cerebras":
            self._setup_cerebras(self.credentials)
        elif self.provider == "ibm":
            self._setup_ibm(self.credentials)
        elif self.provider == "liteLLM":
            self._setup_liteLLM(self.credentials)
        elif self.provider == "azureOpenAi":
            self._setup_azureOpenAi(self.credentials)
        elif self.provider == "mistralAi":
            self._setup_mistralAi(self.credentials)
        elif self.provider == "cohere":
            self._setup_cohere(self.credentials)
        elif self.provider == "togetherAi":
            self._setup_togetherAi(self.credentials)
        elif self.provider == "huggingFace":
            self._setup_huggingFace(self.credentials)
        elif self.provider == "vertexAi":
            self._setup_vertexAi(self.credentials)
        elif self.provider == "googleGenerativeAi":
            self._setup_googleGenerativeAI(self.credentials)
        elif self.provider == "groq":
            self._setup_groq(self.credentials)
        elif self.provider == "fireworks":
            self._setup_fireworks(self.credentials)
        elif self.provider =="nvidia" :
            self._setup_nvidia(self.credentials)
        elif self.provider =="nomic" :
            self._setup_nomic(self.credentials)

    #set up openAi object 
    def _setup_openAi(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
            else:
                raise Exception("missing OpenAI credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up ollama object 
    def _setup_ollama(self,cred):
        try:
            if "ollamaBaseUrl" in cred:
                self.base_url=cred["ollamaBaseUrl"]
            else:
                raise Exception("missing Ollama credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up anthropic object 
    def _setup_anthropic(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
            else:
                raise Exception("missing Anthropic credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up awsBedrock object 
    def _setup_awsBedrock(self,cred):
        try:
            if "regionName" in cred:
                self.region_name=cred["regionName"]
            else:
                raise Exception("missing AWS Bedrock credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up deepseek object 
    def _setup_deepseek(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
            else:
                raise Exception("missing Deepseek credentials")
        except Exception as error:
            raise Exception(error)

    #set up xai object 
    def _setup_xai(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
            else:
                raise Exception("missing XAI credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up openRouter object 
    def _setup_openRouter(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
            else:
                raise Exception("missing OpenRouter credentials")
        except Exception as error:
            raise Exception(error)
    
    #set up cerebras object 
    def _setup_cerebras(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
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
            else:
                raise Exception("missing Azure OpenAI credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up mistralAi object 
    def _setup_mistralAi(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
            else:
                raise Exception("missing MistralAI credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up cohere object 
    def _setup_cohere(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
            else:
                raise Exception("missing Cohere credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up togetherAi object 
    def _setup_togetherAi(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
            else:
                raise Exception("missing TogetherAi credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up huggingFace object 
    def _setup_huggingFace(self,cred):
        try:
            if "apiToken" in cred:
                self.api_token=cred["apiToken"]
            else:
                raise Exception("missing HuggingFace credentials or params")
        except Exception as error:
            raise Exception(error)

    #set up vertexAi object 
    def _setup_vertexAi(self,cred):
        try:
            if "projectId" in cred and 'credentials' in cred:
                from google.oauth2 import service_account
                service_account_info = json.load(cred["credentials"])
                self.kwargs = {
                        "project": cred["projectId"],
                        "credentials": service_account.Credentials.from_service_account_info(service_account_info)
                    }
            else:
                raise Exception("missing VertexAI credentials")
        except Exception as error:
            raise Exception(error)
        
    #set up googleGenerativeAI object 
    def _setup_googleGenerativeAI(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
            else:
                raise Exception("missing Gemini credentials")
        except Exception as error:
            raise Exception(error)
    
    #set up groq object 
    def _setup_groq(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
            else:
                raise Exception("missing Groq credentials")
        except Exception as error:
            raise Exception(error) 

    # set up fireworks object
    def _setup_fireworks(self, cred):
        try:
            if "apiKey" in cred:
                self.api_key = cred["apiKey"]
            else:
                raise Exception("missing Fireworks credentials")
        except Exception as error:
            raise Exception(error)
        
    def _setup_nvidia(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
            elif "baseUrl" in cred:
                self.baseUrl= cred["baseUrl"]
            else:
                raise Exception("missing Nvidia credentials")
        except Exception as error:
            raise Exception(error) 

    def _setup_nomic(self,cred):
        try:
            if "apiKey" in cred:
                self.api_key=cred["apiKey"]
            else:
                raise Exception("missing Nomic credentials")
        except Exception as error:
            raise Exception(error) 

    def embedding(self):
        """
            Embedding model are used to transform words into numerical arrays or vectors.
        """
        _VALID_EMBEDDING_PROVIDERS=["openAi","ollama","googleGenerativeAi","togetherAi","cohere","mistralAi","fireworks","nvidia","nomic", "ibm"]
        try:
            if self.provider in _VALID_EMBEDDING_PROVIDERS:
                optionals = self.params
                if self.provider == "openAi":
                    from langchain_openai import OpenAIEmbeddings
                    response = OpenAIEmbeddings(openai_api_key= self.api_key,model=self.model,**optionals)
                elif self.provider == "ollama":
                    from langchain_ollama import OllamaEmbeddings
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
        _VALID_CHAT_PROVIDERS=["openAi","ollama","anthropic","awsBedrock","azureOpenAi","mistralAi","cohere","togetherAi","huggingFace","vertexAi","googleGenerativeAi","groq","fireworks","nvidia", "deepseek", "xai", "openRouter", "cerebras", "ibm", "liteLLM"]
        try:
            if self.provider in _VALID_CHAT_PROVIDERS:
                optionals = self.params["optionals"]
                if self.provider == "openAi":
                    from langchain_openai import ChatOpenAI
                    llm = ChatOpenAI(model=self.model, api_key=self.api_key,**optionals)
                elif self.provider == "ollama":
                    from langchain_ollama import ChatOllama
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
                    llm = ChatVertexAI(model=self.model, **kwargs, **optionals)
                elif self.provider == "googleGenerativeAi":
                    from langchain_google_genai import ChatGoogleGenerativeAI
                    llm = ChatGoogleGenerativeAI(api_key=self.api_key,model=self.model,**optionals)
                elif self.provider == "groq":    
                    from langchain_groq import ChatGroq
                    llm = ChatGroq(api_key=self.api_key,model=self.model,**optionals)
                elif self.provider == "fireworks":
                    from langchain_fireworks import ChatFireworks
                    llm = ChatFireworks(api_key=self.api_key, model=self.model, **optionals)
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
from app import http_app
from models.credentials import get_credentials_by_names
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import aiohttp, json
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

############################# Slack API's  ###############################
class SlackAppIntegration(BaseModel):
    credential_name: str


@http_app.post("/bot/slack/listUsers")
async def list_slack_users(payload: SlackAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})

        token = json_cred["accessToken"]
        url = "https://www.slack.com/api/users.list"
        headers = {"Authorization": f"Bearer {token}"}
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
        if "members" in result:
            users = [
                {"name": user["name"], "id": user["id"]}
                for user in result["members"]
                if not user["deleted"]
            ]
            return {"Users": users}
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})



@http_app.post("/bot/slack/listChannels")
async def get_slack_channels(payload: SlackAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})

        token = json_cred["accessToken"]
        url = "https://www.slack.com/api/conversations.list?types=public_channel,private_channel,mpim"
        headers = {"Authorization": f"Bearer {token}"}

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()

        if "channels" in result:
            channels = [
                {"name": channel["name"], "id": channel["id"]}
                for channel in result["channels"]
            ]
            return {"channels": channels}

        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})
        

############################# OpenAi API's  ###############################

class OpenAiAppIntegration(BaseModel):
    credential_name: str
    modelType: str

@http_app.post("/bot/openai/listModels")
async def openAi_list_models(payload: OpenAiAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})

        modelType = payload.modelType
        apiKey = json_cred["apiKey"]
        url = "https://api.openai.com/v1/models"
        headers = {"Authorization": f"Bearer {apiKey}"}

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, ssl=False) as response:
                response.raise_for_status()
                result = await response.json()
        if "error" not in result:
            models = result["data"]
            embedding_models = [m["id"] for m in models if "embedding" in m["id"]]
            if modelType == "embedding":
                return {"Models": embedding_models}
            else:
                non_embedding_models = [m["id"] for m in models if "embedding" not in m["id"]]
                return {"Models": non_embedding_models}
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# TogetherAi API's  ###############################

class TogetherAiAppIntegration(BaseModel):
    credential_name: str
    modelType: str


@http_app.post("/bot/togetherAi/listModels")
async def togetherAi_list_models(payload: TogetherAiAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        modelType = payload.modelType
        apiKey = json_cred["apiKey"]
        url = "https://api.together.xyz/v1/models"
        headers = {"Authorization": f"Bearer {apiKey}"}

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
        if "error" not in result:
            data = [model["id"] for model in result if model["type"] == modelType]
            return {"Models": data}
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})
    



############################# Cerebras API's  ###############################

class CerebrasAppIntegration(BaseModel):
    credential_name: str
    modelType: str


@http_app.post("/bot/cerebras/listModels")
async def cerebras_list_models(payload: CerebrasAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        # modelType = payload.modelType
        apiKey = json_cred["apiKey"]
        url = "https://api.cerebras.ai/v1/models"
        headers = {"Authorization": f"Bearer {apiKey}"}

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
        if "data" in result:
            models = result.get("data", [])
            data = [model.get("id") for model in models]
            return {"Models": data}
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})
    


############################# OpenRouter API's  ###############################

class OpenRouterAppIntegration(BaseModel):
    credential_name: str
    modelType: str


@http_app.post("/bot/openRouter/listModels")
async def openrouter_list_models(payload: OpenRouterAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        # modelType = payload.modelType
        apiKey = json_cred["apiKey"]
        url = "https://openrouter.ai/api/v1/models/user"
        headers = {
            "Authorization": f"Bearer {apiKey}",
            "Accept": "application/json"
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
        if "data" in result:
            models = result.get("data", [])
            data = [model.get("id") for model in models]
            return {"Models": data}
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})
    


############################# LiteLLM API's  ###############################

class LiteLLMAppIntegration(BaseModel):
    credential_name: str
    modelType: str


@http_app.post("/bot/liteLlm/listModels")
async def litellm_list_models(payload: LiteLLMAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred and "baseUrl" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        # modelType = payload.modelType
        apiKey = json_cred["apiKey"]
        baseUrl = json_cred["baseUrl"]
        url = f"{baseUrl}/model/info"
        headers = {
            "Authorization": f"Bearer {apiKey}",
            "Accept": "application/json"
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
        if "data" in result:
            models = result.get("data", [])
            data = [model.get("model_name") for model in models]
            return {"Models": data}
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})
    


############################# IBM Watsonx API's  ###############################

class IBMWatsonxAppIntegration(BaseModel):
    credential_name: str
    modelType: str


@http_app.post("/bot/ibmWatsonx/listModels")
async def ibm_watsonx_list_models(payload: IBMWatsonxAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred and "baseUrl" not in json_cred and "version" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        modelType = payload.modelType
        apiKey = json_cred["apiKey"]
        baseUrl = json_cred["baseUrl"]
        version = json_cred["version"]
        url = "https://iam.cloud.ibm.com/identity/token"
        headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        data = {
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
            "apikey": apiKey
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=headers, data=data) as response:
                response.raise_for_status()
                result = await response.json()
        if "access_token" in result:
            access_token = result["access_token"]
            response = None
            result = None
            url = f"{baseUrl}/ml/v1/foundation_model_specs"
            headers = {
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/json"
            }
            data = {"version": version}
            if modelType == "embedding":
                data["filters"] = "function_embedding"
            else:
                data["filters"] = "function_text_chat"
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers, params=data) as response:
                    response.raise_for_status()
                    result = await response.json()
            if "resources" in result:
                models = result.get("resources", [])
                data = [model.get("model_id") for model in models]
                return {"Models": data}
            return JSONResponse(status_code=500, content={"Error": str(result)})
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})
    



############################## gmail's api#################################

class GmailAppIntegration(BaseModel):
    credential_name: str


def google_gmail_create_token(cred):
    try:
        result={}
        result['token']=cred['accessToken']
        result['refresh_token']=cred['refreshToken']
        result['token_uri']="https://oauth2.googleapis.com/token"
        result['client_id']=cred['clientID']
        result['client_secret']=cred['clientSecret']
        result['scopes']=["https://mail.google.com/"]
        result['expiry']=cred['expirey']
        return json.dumps(result)
    except Exception as e:
        raise Exception(e)


def google_create_service(cred, API_SERVICE_NAME, API_VERSION):
    try:
        credential = json.loads(cred)
        creds = Credentials.from_authorized_user_info(credential)
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        service = build(API_SERVICE_NAME, API_VERSION,
                        credentials=creds, static_discovery=False)
        print(API_SERVICE_NAME, API_VERSION, 'service created successfully')
        return service
    except Exception as e:
        # print(e)
        print(f'Failed to create service instance for {API_SERVICE_NAME}')
        raise Exception(
            f'Failed to create service instance for {API_SERVICE_NAME}',e)


@http_app.post("/bot/gmail/getGmailLabels")
async def gmail_get_labels(payload: GmailAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if not all(cred in json_cred for cred in ['accessToken', 'refreshToken', 'clientSecret', 'clientID', 'expirey']):
           return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        token = google_gmail_create_token(json_cred)
        service = google_create_service(token,'gmail','v1')
        labels = service.users().labels().list(userId='me').execute()
        # return {"Labels": labels['labels']}
        return labels

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})
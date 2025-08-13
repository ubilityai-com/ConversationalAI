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
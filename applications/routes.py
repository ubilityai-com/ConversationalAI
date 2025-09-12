from app import http_app
from models.credentials import get_credentials_by_names
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import aiohttp, json, httpx
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from langchain_nvidia_ai_endpoints import ChatNVIDIA,NVIDIAEmbeddings
from langchain_mcp_adapters.client import MultiServerMCPClient
from aiohttp import BasicAuth
import asana
from asana.rest import ApiException
import xmlrpc.client
import sys, os,base64
status = [200, 201, 202, 204, 206, 207, 208]



################################### outlook's apis ###############################



async def microsoft_refresh_token(refresh_token: str, client_id: str, client_secret: str):
    token_endpoint = "https://login.microsoftonline.com/common/oauth2/v2.0/token"
    dataa = {
        'client_id': client_id,
        'client_secret': client_secret,
        'scope': ' '.join(['https://graph.microsoft.com/.default', 'offline_access']),
        'refresh_token': refresh_token,
        "grant_type": "refresh_token",
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(token_endpoint, data=dataa) as response:
            response.raise_for_status()
            result = await response.json()
            if response.status in status and "access_token" in result:
                return result
            return {"Error" : result}



class MicrosoftTokenIntegration(BaseModel):
    clientId: str
    clientSecret: str
    code : str
    redirectUri: str

@http_app.post("/bot/microsoft/getToken")
async def microsoft_token(payload: MicrosoftTokenIntegration):
    try:
        
        client_id = payload.clientId
        client_secret = payload.clientSecret
        auth_code= payload.code 
        redirect_uri= payload.redirectUri
        token_endpoint = "https://login.microsoftonline.com/common/oauth2/v2.0/token"
        dataa = {
            'client_id': client_id,
            'client_secret': client_secret,
            'scope': ' '.join(['https://graph.microsoft.com/.default'] +['offline_access']),
            'code': auth_code,
            "grant_type": "authorization_code",
            'redirect_uri': redirect_uri,
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(url=token_endpoint, data=dataa) as response:
                result = await response.json()
                if response.status in status:
                    return result
                return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

class MicrosoftAppIntegration(BaseModel):
    credential_name: str

@http_app.post("/bot/outlook/getManyCalendarGroup")
async def outlook_list_calendargroups(payload: MicrosoftAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)[payload.credential_name]

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']):
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        client_id = json_cred['clientId']
        client_secret = json_cred['clientSecret']
        refresh_token = json_cred['refreshToken']
        token = await microsoft_refresh_token(refresh_token,client_id,client_secret)
        url = f"https://graph.microsoft.com/v1.0/me/calendarGroups?$select=id,name"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
            if "error" not in result:
                calendarsGroups = result.get('value', [])
                simplified_calendarsGroups = [{"id": calendar.get(
                    'id'), "name": calendar.get('name')} for calendar in calendarsGroups]
                return {"calendarGroups": simplified_calendarsGroups}
            return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})



@http_app.post("/bot/outlook/getManyCalendar")
async def outlook_list_calendars(payload: MicrosoftAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)[payload.credential_name]

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']):
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        client_id = json_cred['clientId']
        client_secret = json_cred['clientSecret']
        refresh_token = json_cred['refreshToken']
        token = await microsoft_refresh_token(refresh_token,client_id,client_secret)
        url = f"https://graph.microsoft.com/v1.0/me/calendars?$select=id,name"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
            if "error" not in result:
                calendars = result.get('value', [])
                simplified_calendars = [{"id": calendar.get(
                    'id'), "name": calendar.get('name')} for calendar in calendars]
                return {"Calendars": simplified_calendars}
            return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})



@http_app.post("/bot/outlook/getManyContact")
async def outlook_list_contacts(payload: MicrosoftAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)[payload.credential_name]

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']):
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        client_id = json_cred['clientId']
        client_secret = json_cred['clientSecret']
        refresh_token = json_cred['refreshToken']
        token = await microsoft_refresh_token(refresh_token,client_id,client_secret)
        url = f"https://graph.microsoft.com/v1.0/me/contacts?$select=id,displayName"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
            if "error" not in result:
                contacts = result.get('value', [])
                simplified_contacts = [{"id": contact.get('id'), "displayName": contact.get(
                    'displayName')} for contact in contacts]
                return {"Contacts": simplified_contacts}
            return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


@http_app.post("/bot/outlook/getManyFolder")
async def outlook_list_folders(payload: MicrosoftAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)[payload.credential_name]

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']):
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        client_id = json_cred['clientId']
        client_secret = json_cred['clientSecret']
        refresh_token = json_cred['refreshToken']
        token = await microsoft_refresh_token(refresh_token,client_id,client_secret)
        url = f"https://graph.microsoft.com/v1.0/me/mailFolders?$select=id,displayName"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
            if "error" not in result:
                folders = result.get('value', [])
                simplified_folders = [{"id": folder.get('id'), "displayName": folder.get(
                    'displayName')} for folder in folders]
                return {"Folders": simplified_folders}
            return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


@http_app.post("/bot/outlook/getManyMessage")
async def outlook_list_messages(payload: MicrosoftAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)[payload.credential_name]

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']):
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        client_id = json_cred['clientId']
        client_secret = json_cred['clientSecret']
        refresh_token = json_cred['refreshToken']
        token = await microsoft_refresh_token(refresh_token,client_id,client_secret)
        url = f"https://graph.microsoft.com/v1.0/me/messages?$select=id,subject"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
            if "error" not in result:
                messages = result.get('value', [])
                simplified_messages = [{"id": message.get('id'), "subject": message.get(
                    'subject')} for message in messages]
                return {"Messages": simplified_messages}
            return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

@http_app.post("/bot/outlook/getContactFolders")
async def outlook_list_contactfolders(payload: MicrosoftAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)[payload.credential_name]

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']):
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        client_id = json_cred['clientId']
        client_secret = json_cred['clientSecret']
        refresh_token = json_cred['refreshToken']
        token = await microsoft_refresh_token(refresh_token,client_id,client_secret)
        url = f"https://graph.microsoft.com/v1.0/me/contactFolders"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
            if "error" not in result:
                return {"Folders":result['value']}
            return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

class OutlookEventAppIntegration(BaseModel):
    credential_name: str
    calendar_id : str

@http_app.post("/bot/outlook/getManyEvent")
async def outlook_list_events(payload: OutlookEventAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)[payload.credential_name]

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']):
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        client_id = json_cred['clientId']
        client_secret = json_cred['clientSecret']
        refresh_token = json_cred['refreshToken']
        token = await microsoft_refresh_token(refresh_token,client_id,client_secret)
        url = f"https://graph.microsoft.com/v1.0/me/calendars/{payload.calendar_id}/events?$select=id,subject"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
            if "error" not in result:
                events = result.get('value', [])
                simplified_events = [{"id": event.get('id'), "subject": event.get(
                    'subject')} for event in events]
                return {"Events": simplified_events}
            return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


class OutlookAttachmentAppIntegration(BaseModel):
    credential_name: str
    message_id : str

@http_app.post("/bot/outlook/getManyAttachment")
async def outlook_list_attachments(payload: OutlookAttachmentAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)[payload.credential_name]
        
        #no need here to check the existence of message_id in payload since the class gonna raise the "422 Unprocessable Entity" error itself
        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']):
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        client_id = json_cred['clientId']
        client_secret = json_cred['clientSecret']
        refresh_token = json_cred['refreshToken']
        token = await microsoft_refresh_token(refresh_token,client_id,client_secret)
        url = f"https://graph.microsoft.com/v1.0/me/messages/{payload.message_id}/attachments?$select=name"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
            if "error" not in result:
                attachments = result.get('value', [])
                simplified_attachments = [{"id": attachment.get('id'), "name": attachment.get(
                    'name')} for attachment in attachments]
                return {"Attachments": simplified_attachments}
            return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

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


############################# Gemini Connector API's  ###############################
class GeminiAppIntegration(BaseModel):
    credential_name: str
    api_version: str

@http_app.post("/bot/gemini/getModels")
async def gemini_list_models(payload: GeminiAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})

        apiKey = json_cred["apiKey"]
        apiVersion = payload.api_version
        url = f"https://generativelanguage.googleapis.com/{apiVersion}/models?key={apiKey}"
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                response.raise_for_status()
                result = await response.json()
        if "models" in result:
            filtered_models = []
            for model in result["models"]:
                if "generateContent" in model.get("supportedGenerationMethods", []):
                    filtered_models.append({
                        "name": model.get("name"),
                        "displayName": model.get("displayName")
                    })
            return {"models": filtered_models}
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


@http_app.post("/bot/gemini/getImageModels")
async def gemini_list_image_models(payload: GeminiAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})

        apiKey = json_cred["apiKey"]
        url = f"https://generativelanguage.googleapis.com/v1beta/models?key={apiKey}"
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                response.raise_for_status()
                result = await response.json()
        if "models" in result:
            filtered_models = []
            for model in result["models"]:
                if "generateContent" in model.get("supportedGenerationMethods", []) and "image" in model.get("name", "").lower():
                    filtered_models.append({
                        "name": model.get("name"),
                        "displayName": model.get("displayName")
                    })
            return {"models": filtered_models}
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


@http_app.post("/bot/gemini/getFiles")
async def gemini_get_many_file(payload: GeminiAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})

        apiKey = json_cred["apiKey"]
        # apiVersion = payload.api_version
        url = "https://generativelanguage.googleapis.com/v1beta/files"
        headers = {"x-goog-api-key": apiKey}
        files = []
        page_token = None
        async with aiohttp.ClientSession() as session:
            while True:
                params = {"pageSize": 100}
                if page_token:
                    params["pageToken"] = page_token
                async with session.get(url, headers=headers, params=params) as response:
                    response.raise_for_status()
                    data = await response.json()
                files.extend(data.get("files", []))
                page_token = data.get("nextPageToken")
                if not page_token:
                    break
            if "error" in data:
                JSONResponse(status_code=500, content={"Error": str(data)})
            else:
                return {"files":files}

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# OpenAI Connector API's  ###############################
class OpenAiAppIntegration(BaseModel):
    credential_name: str

@http_app.post("/bot/openaiConnector/getModels")
async def openai_connector_list_models(payload: OpenAiAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})

        apiKey = json_cred["apiKey"]
        url = "https://api.openai.com/v1/models"
        headers = {"Authorization": f"Bearer {apiKey}"}
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
        if "data" in result:
            models = result["data"]
            models_data = [m["id"] for m in models if "gpt-4o" in m["id"]]
            return {"Models": models_data}
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# Microsoft Excel API's  ###############################
class MicrosoftExcelAppIntegration(BaseModel):
    credential_name: str

@http_app.post("/bot/excel/getWorkbooks")
async def excel_get_workbooks(payload: MicrosoftExcelAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "refreshToken" not in json_cred or "clientId" not in json_cred or "clientSecret" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        refresh_token = json_cred['refreshToken']
        client_id=json_cred['clientId']
        client_secret=json_cred['clientSecret']
        token = await microsoft_refresh_token(refresh_token,client_id,client_secret)
        EXCEL_API_URL = f"https://graph.microsoft.com/v1.0/me/drive/root/search(q='.xlsx')"
        headers = {
            'Content-Type': 'application/json',
            "Authorization": f"Bearer {token['access_token']}",
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(EXCEL_API_URL, headers=headers) as response:
                response.raise_for_status()
                data = await response.json()
                if response.status in status and data:
                    workbooks = data.get("value", [])
                    workbook_info = [{"id": workbook["id"], "name": workbook['name'].rsplit('.', 1)[0]}
                                for workbook in workbooks]
                    return {"workbooks": workbook_info}
                raise Exception(
                    f"Failed to retrieve Workbooks. Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

class MicrosoftExcelGetWorksheetsAppIntegration(BaseModel):
    credential_name: str
    workbookId: str

@http_app.post("/bot/excel/getWorksheets")
async def excel_get_worksheets(payload: MicrosoftExcelGetWorksheetsAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "refreshToken" not in json_cred or "clientId" not in json_cred or "clientSecret" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        workbookId = payload.workbookId
        refresh_token = json_cred['refreshToken']
        client_id=json_cred['clientId']
        client_secret=json_cred['clientSecret']
        token = await microsoft_refresh_token(refresh_token,client_id,client_secret)
        EXCEL_API_URL = f"https://graph.microsoft.com/v1.0/me/drive/items/{workbookId}/workbook/worksheets"
        headers = {
            'Content-Type': 'application/json',
            "Authorization": f"Bearer {token['access_token']}",
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(EXCEL_API_URL, headers=headers) as response:
                response.raise_for_status()
                data = await response.json()
                if response.status in status and data:
                    worksheets = data.get("value", [])
                    worksheet_info = [{"id": worksheet["id"], "name": worksheet['name']}
                                for worksheet in worksheets]
                    return {"worksheets": worksheet_info}
                raise Exception(
                    f"Failed to retrieve Worksheets. Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

class MicrosoftExcelGetTablesAppIntegration(BaseModel):
    credential_name: str
    workbookId: str
    worksheetId:str

@http_app.post("/bot/excel/getTables")
async def excel_get_tables(payload: MicrosoftExcelGetTablesAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "refreshToken" not in json_cred or "clientId" not in json_cred or "clientSecret" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        workbookId = payload.workbookId
        worksheetId = payload.worksheetId
        refresh_token = json_cred['refreshToken']
        client_id=json_cred['clientId']
        client_secret=json_cred['clientSecret']
        token = await microsoft_refresh_token(refresh_token,client_id,client_secret)
        EXCEL_API_URL = f"https://graph.microsoft.com/v1.0/me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables"
        headers = {
            'Content-Type': 'application/json',
            "Authorization": f"Bearer {token['access_token']}",
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(EXCEL_API_URL, headers=headers) as response:
                response.raise_for_status()
                data = await response.json()
                if response.status in status and data:
                    tables = data.get("value", [])
                    table_info = [{"id": table["id"], "name": table['name']}
                                for table in tables]
                    return {"tables": table_info}
                raise Exception(
                    f"Failed to retrieve Tables. Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

class MicrosoftExcelGetColumnsAppIntegration(BaseModel):
    credential_name: str
    workbookId: str
    worksheetId: str
    tableID: str

@http_app.post("/bot/excel/getColumns")
async def excel_get_columns(payload: MicrosoftExcelGetColumnsAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "refreshToken" not in json_cred or "clientId" not in json_cred or "clientSecret" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        workbookId = payload.workbookId
        worksheetId = payload.worksheetId
        tableID = payload.tableID
        refresh_token = json_cred['refreshToken']
        client_id=json_cred['clientId']
        client_secret=json_cred['clientSecret']
        token = await microsoft_refresh_token(refresh_token,client_id,client_secret)
        EXCEL_API_URL = f"https://graph.microsoft.com/v1.0/me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables/{tableID}/columns"
        headers = {
            'Content-Type': 'application/json',
            "Authorization": f"Bearer {token['access_token']}",
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(EXCEL_API_URL, headers=headers) as response:
                response.raise_for_status()
                data = await response.json()
                if response.status in status and data:
                    columns = data.get("value", [])
                    column_info = [{"id": column["id"], "name": column['name']}
                                for column in columns]
                    return {"columns": column_info}
                raise Exception(
                    f"Failed to retrieve Columns. Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# Freshdesk API's  ###############################

class FreshdeskAppIntegration(BaseModel):
    credential_name: str


@http_app.post("/bot/freshdesk/listTickets")
async def freshdesk_get_all_tickets(payload: FreshdeskAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred or "domain" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        domain = json_cred["domain"]
        apiKey = json_cred["apiKey"]
        url = f"https://{domain}.freshdesk.com/api/v2/tickets"
        if ".freshdesk.com" in domain:
            raise Exception(f"Invalid URL detected. Please verify your domain name. Domain: {domain}, URL: {url}")
        async with aiohttp.ClientSession() as session:
            async with session.get(url, auth=BasicAuth(apiKey, "X")) as response:
                response.raise_for_status()
                result = await response.json()
        for item in result:
            if item == "errors" or item == "code":
                raise Exception(result)
        tickets = []
        for ticket in result:
            ticketId = ticket["id"]
            tickets.append({"id": ticketId})
        return {"tickets": tickets}

    except Exception as e:
        if "Expecting value" in str(e):
            return JSONResponse(status_code=500, content={"Error": "Invalid Domain"})
        else:
            return JSONResponse(status_code=500, content={"Error": str(e)})

@http_app.post("/bot/freshdesk/listContacts")
async def freshdesk_get_all_contacts(payload: FreshdeskAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred or "domain" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        domain = json_cred["domain"]
        apiKey = json_cred["apiKey"]
        url = f"https://{domain}.freshdesk.com/api/v2/contacts"
        if ".freshdesk.com" in domain:
            raise Exception(f"Invalid URL detected. Please verify your domain name. Domain: {domain}, URL: {url}")
        async with aiohttp.ClientSession() as session:
            async with session.get(url, auth=BasicAuth(apiKey, "X")) as response:
                response.raise_for_status()
                result = await response.json()
        for item in result:
            if item == "errors" or item == "code":
                raise Exception(result)
        contacts = []
        for contact in result:
            contactId = contact["id"]
            contactName = contact["name"]
            contacts.append({"id": contactId, "name": contactName})
        return {"contacts": contacts}

    except Exception as e:
        if "Expecting value" in str(e):
            return JSONResponse(status_code=500, content={"Error": "Invalid Domain"})
        else:
            return JSONResponse(status_code=500, content={"Error": str(e)})

############################# Zendesk API's  ###############################

class ZendeskTokenIntegration(BaseModel):
    baseUrl: str
    clientId: str
    clientSecret : str
    redirectUri: str
    code: str

@http_app.post("/bot/zendesk/getToken")
async def zendesk_get_oauth_token(payload: ZendeskTokenIntegration):
    try:
        baseUrl = payload.baseUrl
        clientId = payload.clientId
        clientSecret = payload.clientSecret
        redirectUri = payload.redirectUri 
        code = payload.code
        url = f"https://{baseUrl}.zendesk.com/oauth/tokens"
        headers = {"Content-Type": "application/json"}
        data = {
            "grant_type": "authorization_code",
            "code": code,
            "client_id": clientId,
            "client_secret": clientSecret,
            "redirect_uri": redirectUri,
            "scope": "read write",
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(url=url,headers=headers, data=data) as response:
                result = await response.json()
                if response.status in status:
                    return result
                return JSONResponse(status_code=500, content={"Error": str(result)})
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

async def zendesk_process_credentials(creds):
    try:
        if "accessToken" in creds and "baseUrl" in creds:
            accessToken = creds["accessToken"]
            baseUrl = creds["baseUrl"]
            Authorization = f"Bearer {accessToken}"
        elif "apiToken" in creds and "baseUrl" in creds and "email" in creds:
            email = creds["email"]
            apiToken = creds["apiToken"]
            baseUrl = creds["baseUrl"]
            Authorization = f"Basic {base64.b64encode(f'{email}/token:{apiToken}'.encode()).decode()}"
        else:
            return {"error": "missing required data"} 
        return {"Authorization": Authorization, "baseUrl": baseUrl}
    except Exception as error:
        raise Exception({"error":error})

class ZendeskAppIntegration(BaseModel):
    credential_name: str
 
@http_app.post("/bot/zendesk/getUsers")
async def zendesk_get_users(payload: ZendeskAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        creds = await zendesk_process_credentials(json_cred)
        if "error" not in creds:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/users"
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status in status:
                        users_info = [{"id": user['id'], "name": user['name']}
                        for user in result.get('users', [])]
                        return {"users": users_info}
                    else:
                        return JSONResponse(status_code=500, content={"Error": str(result)})
        else:
            return JSONResponse(status_code=500, content={"Error": creds})
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})
    
@http_app.post("/bot/zendesk/getOrganizations")
async def zendesk_get_organizations(payload: ZendeskAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        creds = await zendesk_process_credentials(json_cred)
        if "error" not in creds:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/organizations" 
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status in status:
                        organizations_info = [{"id": organization['id'], "name": organization['name']}
                        for organization in result.get('organizations', [])]
                        return {"organizations": organizations_info}
                    else:
                        return JSONResponse(status_code=500, content={"Error": str(result)})
        else:
            return JSONResponse(status_code=500, content={"Error": creds})
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

@http_app.post("/bot/zendesk/getGroups")
async def zendesk_get_groups(payload: ZendeskAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        creds = await zendesk_process_credentials(json_cred)
        if "error" not in creds:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/groups"
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status in status:
                        groups_info = [{"id": group['id'], "name": group['name']}
                        for group in result.get('groups', [])]
                        return {"groups":groups_info}
                    else:
                        return JSONResponse(status_code=500, content={"Error": str(result)})
        else:
            return JSONResponse(status_code=500, content={"Error": creds})
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

@http_app.post("/bot/zendesk/getTags")
async def zendesk_get_tags(payload: ZendeskAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        creds = await zendesk_process_credentials(json_cred)
        if "error" not in creds:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/tags"
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status in status:
                        tags_info = [{"name": tag['name']}
                        for tag in result.get('tags', [])]
                        return {"tags":tags_info}
                    else:
                        return JSONResponse(status_code=500, content={"Error": str(result)})
        else:
            return JSONResponse(status_code=500, content={"Error": creds})
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# Asana API's  ###############################

class AsanaAppIntegration(BaseModel):
    credential_name: str

@http_app.post("/bot/asana/getWorkspaces")
async def asana_get_workspaces(payload: AsanaAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        accessToken = json_cred["accessToken"]
        configuration = asana.Configuration()
        configuration.access_token = accessToken
        api_client = asana.ApiClient(configuration)
        workspaces_api_instance = asana.WorkspacesApi(api_client)
        opts = {'opt_fields': "name", }
        api_response = workspaces_api_instance.get_workspaces(opts)
        workspaces = list(api_response)
        return {"workspaces": workspaces}
    except ApiException as e:
        return JSONResponse(status_code=500, content={"Error": str(json.loads(e.body))})
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

class AsanaWithWorkspaceAppIntegration(BaseModel):
    credential_name: str
    workspace: str

@http_app.post("/bot/asana/getProjects")
async def asana_get_projects(payload: AsanaWithWorkspaceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        accessToken = json_cred["accessToken"]
        workspace = payload.workspace
        configuration = asana.Configuration()
        configuration.access_token = accessToken
        api_client = asana.ApiClient(configuration)
        projects_api_instance = asana.ProjectsApi(api_client)
        opts = {
            "workspace": workspace,
            "opt_fields": "name",
        }
        api_response = projects_api_instance.get_projects(opts)
        projects = list(api_response)
        return {"projects": projects}
    except ApiException as e:
        return JSONResponse(status_code=500, content={"Error": str(json.loads(e.body))})
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

@http_app.post("/bot/asana/getTeams")
async def asana_get_teams(payload: AsanaWithWorkspaceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        accessToken = json_cred["accessToken"]
        workspace_gid = payload.workspace
        configuration = asana.Configuration()
        configuration.access_token = accessToken
        api_client = asana.ApiClient(configuration)
        teams_api_instance = asana.TeamsApi(api_client)
        opts = {
            'opt_fields': "name",
        }
        api_response = teams_api_instance.get_teams_for_workspace(
            workspace_gid, opts)
        teams = list(api_response)
        return {"teams": teams}
    except ApiException as e:
        return JSONResponse(status_code=500, content={"Error": str(json.loads(e.body))})
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

@http_app.post("/bot/asana/getUsers")
async def asana_get_users(payload: AsanaWithWorkspaceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        accessToken = json_cred["accessToken"]
        workspace_gid = payload.workspace
        configuration = asana.Configuration()
        configuration.access_token = accessToken
        api_client = asana.ApiClient(configuration)
        users_api_instance = asana.UsersApi(api_client)
        opts = {}
        api_response = users_api_instance.get_users_for_workspace(
            workspace_gid, opts)
        users = list(api_response)
        return {"users": users}
    except ApiException as e:
        return JSONResponse(status_code=500, content={"Error": str(json.loads(e.body))})
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

class AsanaWithProjectGidAppIntegration(BaseModel):
    credential_name: str
    project_gid: str


@http_app.post("/bot/asana/getSections")
async def asana_get_sections(payload: AsanaWithProjectGidAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        accessToken = json_cred["accessToken"]
        project_gid = payload.project_gid
        configuration = asana.Configuration()
        configuration.access_token = accessToken
        api_client = asana.ApiClient(configuration)
        sections_api_instance = asana.SectionsApi(api_client)
        opts = {'opt_fields': "name", }
        api_response = sections_api_instance.get_sections_for_project(project_gid, opts)
        sections = list(api_response)
        return {"sections": sections}
    except ApiException as e:
        return JSONResponse(status_code=500, content={"Error": str(json.loads(e.body))})
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

@http_app.post("/bot/asana/getProjectTemplates")
async def asana_get_project_templates(payload: AsanaWithWorkspaceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        accessToken = json_cred["accessToken"]
        workspace = payload.workspace
        configuration = asana.Configuration()
        configuration.access_token = accessToken
        api_client = asana.ApiClient(configuration)
        project_templates_api_instance = asana.ProjectTemplatesApi(api_client)
        opts = {
            'workspace': workspace,
        }
        api_response = project_templates_api_instance.get_project_templates(opts)
        templates = list(api_response)
        return {"templates": templates}
    except ApiException as e:
        return JSONResponse(status_code=500, content={"Error": str(json.loads(e.body))})
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


######################################## Airtable Routes ######################################

class AirtableAppIntegration(BaseModel):
    credential_name: str

@http_app.post("/bot/airtable/getBases")
async def airtable_get_bases(payload: AirtableAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accesstoken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        accessToken = json_cred["accesstoken"]
        url = "https://api.airtable.com/v0/meta/bases"
        headers = {
            "Authorization": f"Bearer {accessToken}"
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                json_response = await response.json()
                if response.status == 200 and json_response:
                    bases = json_response.get("bases", [])
                    if bases:
                        bases_info = [
                            {"id": base["id"], "name": base["name"]}
                            for base in bases
                        ]
                    return {"bases": bases_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

class AirtableGetTablesAppIntegration(BaseModel):
    credential_name: str
    baseID: str

@http_app.post("/bot/airtable/getTables")
async def airtable_get_tables(payload: AirtableGetTablesAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accesstoken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        accessToken = json_cred["accesstoken"]
        base_id = payload.baseID
        url = f"https://api.airtable.com/v0/meta/bases/{base_id}/tables"
        headers = {
            "Authorization": f"Bearer {accessToken}"
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                json_response = await response.json()
                if response.status == 200 and json_response:
                    tables = json_response.get("tables", [])
                    if tables:
                        tables_info = [
                            {"id": table["id"], "name": table["name"]}
                            for table in tables
                        ]
                    return {"tables": tables_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

class AirtableGetTableDataAppIntegration(BaseModel):
    credential_name: str
    baseID: str
    tableID: str

@http_app.post("/bot/airtable/getTableFields")
async def airtable_get_table_fields(payload: AirtableGetTableDataAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accesstoken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        accessToken = json_cred["accesstoken"]
        base_id = payload.baseID
        table_id = payload.tableID
        fields = []
        url = f"https://api.airtable.com/v0/meta/bases/{base_id}/tables"
        headers = {
            "Authorization": f"Bearer {accessToken}"
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                json_response = await response.json()
                if response.status == 200 and json_response:
                    for table in json_response.get("tables", []):
                        if table["id"] == table_id:
                            fields = table.get("fields", [])
                            break
                    if fields:
                        fields_info = [
                            {"id": field["id"], "name": field["name"]}
                            for field in fields
                        ]
                    return {"fields": fields_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

@http_app.post("/bot/airtable/getTableViews")
async def airtable_get_table_views(payload: AirtableGetTableDataAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accesstoken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        accessToken = json_cred["accesstoken"]
        base_id = payload.baseID
        table_id = payload.tableID
        views = []
        url = f"https://api.airtable.com/v0/meta/bases/{base_id}/tables"
        headers = {
            "Authorization": f"Bearer {accessToken}"
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                json_response = await response.json()
                if response.status == 200 and json_response:
                    for table in json_response.get("tables", []):
                        if table["id"] == table_id:
                            views = table.get("views", [])
                            break
                    if views:
                        views_info = [
                            {"id": view["id"], "name": view["name"]}
                            for view in views
                        ]
                    return {"views": views_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


##################################### Clickup API's ########################################################

class ClickWithListAppIntegration(BaseModel):
    credential_name: str
    list_id: str

async def clickup_extract_credentials(creds):
    if 'accessToken' in creds and 'clientID' in creds:
        return f"Bearer {creds['accessToken']}"
    elif 'accessToken' in creds:
        return creds['accessToken']
    else:
        raise Exception("Missing Access Token")

@http_app.post("/bot/clickup/getTasks")
async def clickup_get_tasks(payload: ClickWithListAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        list_id = payload.list_id
        accessToken = await clickup_extract_credentials(json_cred)
        api_url = f"https://api.clickup.com/api/v2/list/{list_id}/task"
        headers = {'Authorization': accessToken, 'Content-Type': 'application/json'}
        async with aiohttp.ClientSession() as session:
            async with session.get(api_url,headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    tasks_info = [{"id": task['id'], "name": task['name']}
                    for task in data.get('tasks', [])]
                    return {"tasks": tasks_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})
    
class ClickupWithFolderAppIntegration(BaseModel):
    credential_name: str
    folder_id: str

@http_app.post("/bot/clickup/getLists")
async def clickup_get_lists(payload: ClickupWithFolderAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        folder_id = payload.folder_id
        accessToken = await clickup_extract_credentials(json_cred)
        api_url = f"https://api.clickup.com/api/v2/folder/{folder_id}/list"
        headers = {'Authorization': accessToken, 'Content-Type': 'application/json'}
        async with aiohttp.ClientSession() as session:
            async with session.get(api_url,headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    lists_info = [{"id": int(list['id']), "name": list['name']}
                    for list in data.get('lists', [])]
                    return {"lists": lists_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

class ClickupWithSpaceAppIntegration(BaseModel):
    credential_name: str
    space_id: str

@http_app.post("/bot/clickup/getFolders")
async def clickup_get_folders(payload: ClickupWithSpaceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        space_id = payload.space_id
        accessToken = await clickup_extract_credentials(json_cred)
        api_url = f"https://api.clickup.com/api/v2/space/{space_id}/folder"
        headers = {'Authorization': accessToken, 'Content-Type': 'application/json'}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(api_url,headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    folders_info = [{"id": int(folder['id']), "name": folder['name']}
                    for folder in data.get('folders', [])]
                    return {"folders": folders_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

class ClickupAppIntegration(BaseModel):
    credential_name: str

@http_app.post("/bot/clickup/getTeams")
async def clickup_get_teams(payload: ClickupAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        
        accessToken = await clickup_extract_credentials(json_cred)
        api_url = "https://api.clickup.com/api/v2/team"
        headers = {'Authorization': accessToken, 'Content-Type': 'application/json'}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(api_url,headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    teams_info = [{"id": team['id'], "name": team['name']}
                    for team in data.get('teams', [])]
                    return {"teams": teams_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

class ClickupWithteamAppIntegration(BaseModel):
    credential_name: str
    team_id: str

@http_app.post("/bot/clickup/getSpaces")
async def clickup_get_spaces(payload: ClickupWithteamAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        
        team_id = payload.team_id
        accessToken = await clickup_extract_credentials(json_cred)
        api_url = f"https://api.clickup.com/api/v2/team/{team_id}/space"
        headers = {'Authorization': accessToken, 'Content-Type': 'application/json'}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(api_url,headers=headers, params={"archived":"True"}) as response:
                if response.status == 200:
                    data = await response.json()
                    spaces_info = [{"id": int(space['id']), "name": space['name']}
                    for space in data.get('spaces', [])]
                    return {"spaces": spaces_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

@http_app.post("/bot/clickup/getFolderlessLists")
async def clickup_get_forderless_lists(payload: ClickupWithSpaceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        space_id = payload.space_id
        accessToken = await clickup_extract_credentials(json_cred)
        api_url = f"https://api.clickup.com/api/v2/space/{space_id}/list"
        headers = {'Authorization': accessToken, 'Content-Type': 'application/json'}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(api_url,headers=headers, params={"archived":"True"}) as response:
                if response.status == 200:
                    data = await response.json()
                    lists_info = [{"id": int(list['id']), "name": list['name']}
                    for list in data.get('lists', [])]
                    return {"lists": lists_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

@http_app.post("/bot/clickup/getAccessibleCustomFields")
async def clickup_get_accessible_custom_fields(payload: ClickWithListAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        accessToken = await clickup_extract_credentials(json_cred)
        list_id = payload.list_id
        api_url = f"https://api.clickup.com/api/v2/list/{list_id}/field"
        headers = {'Authorization': accessToken, 'Content-Type': 'application/json'}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(api_url,headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    fields_info = [{"id": field['id'], "name": field['name']}
                    for field in data.get('fields', [])]
                    return {"fields": fields_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

@http_app.post("/bot/clickup/getListStatuses")
async def clickup_get_list_statuses(payload: ClickWithListAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        accessToken = await clickup_extract_credentials(json_cred)
        list_id = payload.list_id
        api_url = f"https://api.clickup.com/api/v2/list/{list_id}"
        headers = {'Authorization': accessToken, 'Content-Type': 'application/json'}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(api_url,headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    statuses_info = [{"id": status['status'], "name": status['status']}
                    for status in data.get('statuses', [])]
                    return {"statuses": statuses_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

@http_app.post("/bot/clickup/getListMembers")
async def clickup_get_list_members(payload: ClickWithListAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        accessToken = await clickup_extract_credentials(json_cred)
        list_id = payload.list_id
        api_url = f"https://api.clickup.com/api/v2/list/{list_id}/member"
        headers = {'Authorization': accessToken, 'Content-Type': 'application/json'}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(api_url,headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    members_info = [{"id": member['id'], "name": member['username']}
                    for member in data.get('members', [])]
                    return {"members": members_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

@http_app.post("/bot/clickup/getTags")
async def clickup_get_tags(payload: ClickupWithSpaceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        accessToken = await clickup_extract_credentials(json_cred)
        space_id = payload.space_id
        api_url = f"https://api.clickup.com/api/v2/space/{space_id}/tag"
        headers = {'Authorization': accessToken, 'Content-Type': 'application/json'}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(api_url,headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    tags_info = [{"id": tag['name'], "name": tag['name']}
                    for tag in data.get('tags', [])]
                    return {"tags": tags_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

@http_app.post("/bot/clickup/getTeamMembers")
async def clickup_get_team_members(payload: ClickupWithteamAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        accessToken = await clickup_extract_credentials(json_cred)
        team_id = payload.team_id
        api_url = f"https://api.clickup.com/api/v2/team/{team_id}"
        headers = {'Authorization': accessToken, 'Content-Type': 'application/json'}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(api_url,headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    members_info = [{"id": member['user']['id'], "name": member['user']['username']}
                    for member in data['team'].get('members', [])]
                    return {"members": members_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

class ClickupGetTokenAppIntegration(BaseModel):
    clientID: str
    clientSecret: str
    code: str

@http_app.post("/bot/clickup/getToken")
async def clickup_get_token(payload: ClickupGetTokenAppIntegration):
    try:
        status=[200, 201, 202, 204, 206, 207, 208]
        clientId= payload.clientID
        clientSecret= payload.clientSecret
        code= payload.code
        token_endpoint = "https://api.clickup.com/api/v2/oauth/token"
        data = {
            'client_id': clientId,
            'client_secret': clientSecret,
            'code': code,
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.post(token_endpoint,data=data) as response:
                if response.status in status:
                    return await response.json()
                raise Exception(
                    f"Token request failed. Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# Zoom API's  ###############################

class ZoomGetTokenAppIntegration(BaseModel):
    client_id: str
    client_secret: str
    code: str
    redirect_uri: str

@http_app.post("/bot/getRefreshToken")
async def zoom_generate_refresh_token(payload: ZoomGetTokenAppIntegration):
    try:
        client_id=payload.client_id
        client_secret=payload.client_secret
        code=payload.code
        redirect_uri=payload.redirect_uri
        token_url = 'https://zoom.us/oauth/token'
        token_params = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri':redirect_uri,
        'client_id': client_id,
        'client_secret': client_secret,
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.post(token_url,data=token_params) as response:
                response.raise_for_status()
                response_json = await response.json()
                if "refresh_token" in response_json:
                    return response_json['refresh_token']
                raise Exception(
                    f"Invalid refresh_token. Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# Odoo API's  ###############################

class OdooAppIntegration(BaseModel):
    credential_name: str

@http_app.post("/bot/odoo/getManyContact")
async def odoo_get_many_contact(payload: OdooAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "url" not in json_cred or "db" not in json_cred or "username" not in json_cred or "apiPassword" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        url = json_cred["url"]
        db = json_cred["db"]
        username = json_cred["username"]
        apiPassword = json_cred["apiPassword"]
        common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
        uid = common.authenticate(db, username, apiPassword, {})
        if uid:
            models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")
            model = "res.partner"
            ids = models.execute_kw(db, uid, apiPassword, model, "search", [[]])
            data = models.execute_kw(
                db, uid, apiPassword, model, "read", [ids], {"fields": ["name"]}
            )
            return {"Contacts": data}
        else:
            raise Exception("Authentication failed. Please check your credentials.")
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


@http_app.post("/bot/odoo/getManyCompany")
async def odoo_get_many_company(payload: OdooAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "url" not in json_cred or "db" not in json_cred or "username" not in json_cred or "apiPassword" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        url = json_cred["url"]
        db = json_cred["db"]
        username = json_cred["username"]
        apiPassword = json_cred["apiPassword"]
        common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
        uid = common.authenticate(db, username, apiPassword, {})
        if uid:
            models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")
            model = "res.company"
            ids = models.execute_kw(db, uid, apiPassword, model, "search", [[]])
            data = models.execute_kw(
                db, uid, apiPassword, model, "read", [ids], {"fields": ["name"]}
            )
            return {"Companies": data}
        else:
            raise Exception("Authentication failed. Please check your credentials.")
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


@http_app.post("/bot/odoo/getAllModel")
async def odoo_get_all_model(payload: OdooAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "url" not in json_cred or "db" not in json_cred or "username" not in json_cred or "apiPassword" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        url = json_cred["url"]
        db = json_cred["db"]
        username = json_cred["username"]
        apiPassword = json_cred["apiPassword"]
        common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
        uid = common.authenticate(db, username, apiPassword, {})
        if uid:
            models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")
            models_list = models.execute_kw(
                db,
                uid,
                apiPassword,
                "ir.model",
                "search_read",
                [[]],
                {"fields": ["model", "display_name"]},
            )
            return {"models": models_list}
        else:
            raise Exception("Authentication failed. Please check your credentials.")
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


@http_app.post("/bot/odoo/getManyOpportunity")
async def odoo_get_many_opportunity(payload: OdooAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "url" not in json_cred or "db" not in json_cred or "username" not in json_cred or "apiPassword" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        url = json_cred["url"]
        db = json_cred["db"]
        username = json_cred["username"]
        apiPassword = json_cred["apiPassword"]
        common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
        uid = common.authenticate(db, username, apiPassword, {})
        if uid:
            models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")
            model = "crm.lead"
            ids = models.execute_kw(db, uid, apiPassword, model, "search", [[]])
            data = models.execute_kw(
                db, uid, apiPassword, model, "read", [ids], {"fields": ["name"]}
            )
            return {"Opportunities": data}
        else:
            raise Exception("Authentication failed. Please check your credentials.")
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


@http_app.post("/bot/odoo/getManyUser")
async def odoo_get_many_user(payload: OdooAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "url" not in json_cred or "db" not in json_cred or "username" not in json_cred or "apiPassword" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        url = json_cred["url"]
        db = json_cred["db"]
        username = json_cred["username"]
        apiPassword = json_cred["apiPassword"]
        common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
        uid = common.authenticate(db, username, apiPassword, {})
        if uid:
            models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")
            user_model = "res.users"
            ids = models.execute_kw(
                db, uid, apiPassword, user_model, "search", [[]]
            )
            data = models.execute_kw(
                db,
                uid,
                apiPassword,
                user_model,
                "read",
                [ids],
                {"fields": ["name"]},
            )
            return {"Users": data}
        else:
            raise Exception("Authentication failed. Please check your credentials.")
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


@http_app.post("/bot/odoo/getManySalesTeam")
async def odoo_get_many_sales_team(payload: OdooAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "url" not in json_cred or "db" not in json_cred or "username" not in json_cred or "apiPassword" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        url = json_cred["url"]
        db = json_cred["db"]
        username = json_cred["username"]
        apiPassword = json_cred["apiPassword"]
        common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
        uid = common.authenticate(db, username, apiPassword, {})
        if uid:
            models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")
            model = "crm.team"
            ids = models.execute_kw(db, uid, apiPassword, model, "search", [[]])
            data = models.execute_kw(
                db, uid, apiPassword, model, "read", [ids], {"fields": ["name"]}
            )
            return {"SalesTeam": data}
        else:
            raise Exception("Authentication failed. Please check your credentials.")
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


@http_app.post("/bot/odoo/getManySalesTeamMember")
async def odoo_get_many_sales_team_member(payload: OdooAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "url" not in json_cred or "db" not in json_cred or "username" not in json_cred or "apiPassword" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        url = json_cred["url"]
        db = json_cred["db"]
        username = json_cred["username"]
        apiPassword = json_cred["apiPassword"]
        common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
        uid = common.authenticate(db, username, apiPassword, {})
        if uid:
            models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")
            model = "crm.team.member"
            ids = models.execute_kw(db, uid, apiPassword, model, "search", [[]])
            data = models.execute_kw(
                db, uid, apiPassword, model, "read", [ids], {"fields": ["name"]}
            )
            return {"SalesTeamMember": data}
        else:
            raise Exception("Authentication failed. Please check your credentials.")
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


@http_app.post("/bot/odoo/getManySalesOrder")
async def odoo_get_many_sales_order(payload: OdooAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "url" not in json_cred or "db" not in json_cred or "username" not in json_cred or "apiPassword" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        url = json_cred["url"]
        db = json_cred["db"]
        username = json_cred["username"]
        apiPassword = json_cred["apiPassword"]
        common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
        uid = common.authenticate(db, username, apiPassword, {})
        if uid:
            models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")
            model = "sale.order"
            ids = models.execute_kw(db, uid, apiPassword, model, "search", [[]])
            data = models.execute_kw(
                db, uid, apiPassword, model, "read", [ids], {"fields": ["name"]}
            )
            return {"SalesOrders": data}
        else:
            raise Exception("Authentication failed. Please check your credentials.")
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


@http_app.post("/bot/odoo/getManyProduct")
async def odoo_get_many_product(payload: OdooAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "url" not in json_cred or "db" not in json_cred or "username" not in json_cred or "apiPassword" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        url = json_cred["url"]
        db = json_cred["db"]
        username = json_cred["username"]
        apiPassword = json_cred["apiPassword"]
        common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
        uid = common.authenticate(db, username, apiPassword, {})
        if uid:
            models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")
            model = "product.template"
            ids = models.execute_kw(db, uid, apiPassword, model, "search", [[]])
            data = models.execute_kw(
                db, uid, apiPassword, model, "read", [ids], {"fields": ["name"]}
            )
            return {"Products": data}
        else:
            raise Exception("Authentication failed. Please check your credentials.")
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


@http_app.post("/bot/odoo/getManyProductCategory")
async def odoo_get_many_product_category(payload: OdooAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "url" not in json_cred or "db" not in json_cred or "username" not in json_cred or "apiPassword" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        url = json_cred["url"]
        db = json_cred["db"]
        username = json_cred["username"]
        apiPassword = json_cred["apiPassword"]
        common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
        uid = common.authenticate(db, username, apiPassword, {})
        if uid:
            models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")
            model = "product.category"
            ids = models.execute_kw(db, uid, apiPassword, model, "search", [[]])
            data = models.execute_kw(
                db, uid, apiPassword, model, "read", [ids], {"fields": ["name"]}
            )
            return {"Categories": data}
        else:
            raise Exception("Authentication failed. Please check your credentials.")
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


@http_app.post("/bot/odoo/getManyCountry")
async def odoo_get_many_country(payload: OdooAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "url" not in json_cred or "db" not in json_cred or "username" not in json_cred or "apiPassword" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        url = json_cred["url"]
        db = json_cred["db"]
        username = json_cred["username"]
        apiPassword = json_cred["apiPassword"]
        common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
        uid = common.authenticate(db, username, apiPassword, {})
        if uid:
            models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")
            model = "res.country"
            ids = models.execute_kw(db, uid, apiPassword, model, "search", [[]])
            data = models.execute_kw(
                db, uid, apiPassword, model, "read", [ids], {"fields": ["name"]}
            )
            return {"Country": data}
        else:
            raise Exception("Authentication failed. Please check your credentials.")
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


@http_app.post("/bot/odoo/getManyState")
async def odoo_get_many_state(payload: OdooAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "url" not in json_cred or "db" not in json_cred or "username" not in json_cred or "apiPassword" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        url = json_cred["url"]
        db = json_cred["db"]
        username = json_cred["username"]
        apiPassword = json_cred["apiPassword"]
        common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
        uid = common.authenticate(db, username, apiPassword, {})
        if uid:
            models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")
            model = "res.country.state"
            ids = models.execute_kw(db, uid, apiPassword, model, "search", [[]])
            data = models.execute_kw(
                db, uid, apiPassword, model, "read", [ids], {"fields": ["name"]}
            )
            return {"State": data}
        else:
            raise Exception("Authentication failed. Please check your credentials.")
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# Zoho API's  ###############################

class zohoCRMGetTokenAppIntegration(BaseModel):
    client_id: str
    client_secret: str
    code: str
    redirect_uri: str

@http_app.post("/bot/zohoCRM/getRefreshToken")
async def zohoCRM_generate_refresh_token(payload: zohoCRMGetTokenAppIntegration):
    try:
        client_id=payload.client_id
        client_secret=payload.client_secret
        code=payload.code
        redirect_uri=payload.redirect_uri
        url = f"https://accounts.zoho.com/oauth/v2/token?client_id={client_id}&client_secret={client_secret}&grant_type=authorization_code&redirect_uri={redirect_uri}&code={code}"
        async with aiohttp.ClientSession() as session:
            async with session.post(url) as response:
                response.raise_for_status()
                response_json = await response.json()
                if "refresh_token" in response_json:
                    return response_json["refresh_token"]
                else:
                    return JSONResponse(status_code=500, content={"refresh_token": "Invalid refresh_token"})
    except Exception as error:
            return JSONResponse(status_code=500, content={"Error": error})

class zohoCRMAppIntegration(BaseModel):
    credential_name: str

async def zohoCRM_refresh_access_token(client_id, client_secret, refresh_token):
    try:
        url = f"https://accounts.zoho.com/oauth/v2/token?refresh_token={refresh_token}&client_id={client_id}&client_secret={client_secret}&grant_type=refresh_token"
        async with aiohttp.ClientSession() as session:
            async with session.post(url) as response:
                response.raise_for_status()
                result = await response.json()
                if "access_token" in result:
                    return result["access_token"]
                raise Exception({"access_token": "Invalid access_token"})
    except Exception as error:
        raise Exception(error)

@http_app.post("/bot/zohoCRM/listAccounts")
async def zohoCRM_list_accounts(payload: zohoCRMAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        if "clientID" in json_cred and "clientSecret" in json_cred and "refreshToken" in json_cred:
            access_token = await zohoCRM_refresh_access_token(client_id=json_cred["clientID"],client_secret=json_cred["clientSecret"],refresh_token=json_cred["refreshToken"])
            url = f"https://www.zohoapis.com/crm/v5/Accounts?fields=Account_Name"
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    response_json = await response.json()
                    accounts = []
                    for account in response_json["data"]:
                        accountId = account["id"]
                        accountName = account["Account_Name"]
                        accounts.append({"id": accountId, "name": accountName})
                    return {"accounts": accounts}
        return JSONResponse(status_code=400, content={"Error": "Missing required data."})
    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": e})

@http_app.post("/bot/zohoCRM/listContacts")
async def zohoCRM_list_contacts(payload: zohoCRMAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        if "clientID" in json_cred and "clientSecret" in json_cred and "refreshToken" in json_cred:
            access_token = await zohoCRM_refresh_access_token(client_id=json_cred["clientID"],client_secret=json_cred["clientSecret"],refresh_token=json_cred["refreshToken"])
            url = f"https://www.zohoapis.com/crm/v5/Contacts?fields=Full_Name"
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    response_json = await response.json()
                    contacts = []
                    for contact in response_json["data"]:
                        contactId = contact["id"]
                        contactName = contact["Full_Name"]
                        contacts.append({"id": contactId, "name": contactName})
                    return {"contacts": contacts}
        return JSONResponse(status_code=400, content={"Error": "Missing required data."})
    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": e})

@http_app.post("/bot/zohoCRM/listDeals")
async def zohoCRM_list_deals(payload: zohoCRMAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        if "clientID" in json_cred and "clientSecret" in json_cred and "refreshToken" in json_cred:
            access_token = await zohoCRM_refresh_access_token(client_id=json_cred["clientID"],client_secret=json_cred["clientSecret"],refresh_token=json_cred["refreshToken"])
            url = f"https://www.zohoapis.com/crm/v5/Deals?fields=Deal_Name"
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    response_json = await response.json()
                    deals = []
                    for deal in response_json["data"]:
                        dealId = deal["id"]
                        dealName = deal["Deal_Name"]
                        deals.append({"id": dealId, "name": dealName})
                    return {"deals": deals}
        return JSONResponse(status_code=400, content={"Error": "Missing required data."})
    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": e})

@http_app.post("/bot/zohoCRM/listLeads")
async def zohoCRM_list_leads(payload: zohoCRMAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        if "clientID" in json_cred and "clientSecret" in json_cred and "refreshToken" in json_cred:
            access_token = await zohoCRM_refresh_access_token(client_id=json_cred["clientID"],client_secret=json_cred["clientSecret"],refresh_token=json_cred["refreshToken"])
            url = f"https://www.zohoapis.com/crm/v5/Leads?fields=Full_Name"
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    response_json = await response.json()
                    leads = []
                    for lead in response_json["data"]:
                        leadId = lead["id"]
                        leadName = lead["Full_Name"]
                        leads.append({"id": leadId, "name": leadName})
                    return {"leads": leads}
        return JSONResponse(status_code=400, content={"Error": "Missing required data."})
    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": e})


############################# Salesforce API's  ###############################

class SalesForceAppIntegration(BaseModel):
    credential_name: str

async def salesforce_refresh_access_token(client_id, client_secret, refresh_token):
    try:
        url = f"https://login.salesforce.com/services/oauth2/token?grant_type=refresh_token&client_id={client_id}&client_secret={client_secret}&refresh_token={refresh_token}"
        async with aiohttp.ClientSession() as session:
            async with session.post(url) as response:
                response_json = await response.json()
                if "access_token" in response_json:
                    return response_json["access_token"]
                raise Exception(
                    f"Failed refreshing access token. Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        raise Exception(error)

@http_app.post("/bot/salesforce/listUsers")
async def salesforce_list_users(payload: SalesForceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "clientID" not in json_cred or "clientSecret" not in json_cred or "refreshToken" not in json_cred or "domainName" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        domain = json_cred["domainName"]
        token = await salesforce_refresh_access_token(client_id=json_cred["clientID"],client_secret=json_cred["clientSecret"],refresh_token=json_cred["refreshToken"])
        url = f"https://{domain}.my.salesforce.com/services/data/v58.0/query?q=SELECT Id, Name FROM User"
        headers = {"Authorization": f"Bearer {token}"}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                result = await response.json()
        if type(result) == list:
            for item in result[0]:
                if item == "errorCode":
                    raise Exception(str(result))
        else:
            for item in result:
                if item == "errorCode":
                    raise Exception(str(result))
            if "records" in result:
                users = []
                for user in result["records"]:
                    userId = user["Id"]
                    userName = user["Name"]
                    users.append({"id": userId, "name": userName})
                return {"users": users}
    except Exception as e:
        if "Expecting value" in str(e):
            return JSONResponse(status_code=500, content={"Error": "Invalid Domain"})
        else:
            return JSONResponse(status_code=500, content={"Error": str(e)})


@http_app.post("/bot/salesforce/listTasks")
async def salesforce_list_tasks(payload: SalesForceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "clientID" not in json_cred or "clientSecret" not in json_cred or "refreshToken" not in json_cred or "domainName" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        domain = json_cred["domainName"]
        token = await salesforce_refresh_access_token(client_id=json_cred["clientID"],client_secret=json_cred["clientSecret"],refresh_token=json_cred["refreshToken"])
        url = f"https://{domain}.my.salesforce.com/services/data/v58.0/query?q=SELECT Id FROM Task"
        headers = {"Authorization": f"Bearer {token}"}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                result = await response.json()
        if type(result) == list:
            for item in result[0]:
                if item == "errorCode":
                    raise Exception(str(result))
        else:
            for item in result:
                if item == "errorCode":
                    raise Exception(str(result))
            if "records" in result:
                tasks = []
                for task in result["records"]:
                    taskId = task["Id"]
                    tasks.append({"id": taskId})
                return {"tasks": tasks}
    except Exception as e:
        if "Expecting value" in str(e):
            return JSONResponse(status_code=500, content={"Error": "Invalid Domain"})
        else:
            return JSONResponse(status_code=500, content={"Error": str(e)})


@http_app.post("/bot/salesforce/listAccounts")
async def salesforce_list_accounts(payload: SalesForceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "clientID" not in json_cred or "clientSecret" not in json_cred or "refreshToken" not in json_cred or "domainName" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        domain = json_cred["domainName"]
        token = await salesforce_refresh_access_token(client_id=json_cred["clientID"],client_secret=json_cred["clientSecret"],refresh_token=json_cred["refreshToken"])
        url = f"https://{domain}.my.salesforce.com/services/data/v58.0/query?q=SELECT Id, Name FROM Account"
        headers = {"Authorization": f"Bearer {token}"}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                result = await response.json()
        if type(result) == list:
            for item in result[0]:
                if item == "errorCode":
                    raise Exception(str(result))
        else:
            for item in result:
                if item == "errorCode":
                    raise Exception(str(result))
            if "records" in result:
                accounts = []
                for account in result["records"]:
                    accountId = account["Id"]
                    accountName = account["Name"]
                    accounts.append({"id": accountId, "name": accountName})
                return {"accounts": accounts}
    except Exception as e:
        if "Expecting value" in str(e):
            return JSONResponse(status_code=500, content={"Error": "Invalid Domain"})
        else:
            return JSONResponse(status_code=500, content={"Error": str(e)})


@http_app.post("/bot/salesforce/listAttachments")
async def salesforce_list_attachments(payload: SalesForceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "clientID" not in json_cred or "clientSecret" not in json_cred or "refreshToken" not in json_cred or "domainName" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        domain = json_cred["domainName"]
        token = await salesforce_refresh_access_token(client_id=json_cred["clientID"],client_secret=json_cred["clientSecret"],refresh_token=json_cred["refreshToken"])
        url = f"https://{domain}.my.salesforce.com/services/data/v58.0/query?q=SELECT Id, Name FROM Attachment"
        headers = {"Authorization": f"Bearer {token}"}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                result = await response.json()
        if type(result) == list:
            for item in result[0]:
                if item == "errorCode":
                    raise Exception(str(result))
        else:
            for item in result:
                if item == "errorCode":
                    raise Exception(str(result))
            if "records" in result:
                attachments = []
                for attachment in result["records"]:
                    attachmentId = attachment["Id"]
                    attachmentName = attachment["Name"]
                    attachments.append({"id": attachmentId, "name": attachmentName})
                return {"attachments": attachments}
    except Exception as e:
        if "Expecting value" in str(e):
            return JSONResponse(status_code=500, content={"Error": "Invalid Domain"})
        else:
            return JSONResponse(status_code=500, content={"Error": str(e)})


@http_app.post("/bot/salesforce/listCases")
async def salesforce_list_cases(payload: SalesForceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "clientID" not in json_cred or "clientSecret" not in json_cred or "refreshToken" not in json_cred or "domainName" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        domain = json_cred["domainName"]
        token = await salesforce_refresh_access_token(client_id=json_cred["clientID"],client_secret=json_cred["clientSecret"],refresh_token=json_cred["refreshToken"])
        url = f"https://{domain}.my.salesforce.com/services/data/v58.0/query?q=SELECT Id FROM Case"
        headers = {"Authorization": f"Bearer {token}"}
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                result = await response.json()
        if type(result) == list:
            for item in result[0]:
                if item == "errorCode":
                    raise Exception(str(result))
        else:
            for item in result:
                if item == "errorCode":
                    raise Exception(str(result))
            if "records" in result:
                cases = []
                for case in result["records"]:
                    caseId = case["Id"]
                    cases.append({"id": caseId})
                return {"cases": cases}
    except Exception as e:
        if "Expecting value" in str(e):
            return JSONResponse(status_code=500, content={"Error": "Invalid Domain"})
        else:
            return JSONResponse(status_code=500, content={"Error": str(e)})


@http_app.post("/bot/salesforce/listContacts")
async def salesforce_list_contacts(payload: SalesForceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "clientID" not in json_cred or "clientSecret" not in json_cred or "refreshToken" not in json_cred or "domainName" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        domain = json_cred["domainName"]
        token = await salesforce_refresh_access_token(client_id=json_cred["clientID"],client_secret=json_cred["clientSecret"],refresh_token=json_cred["refreshToken"])
        url = f"https://{domain}.my.salesforce.com/services/data/v58.0/query?q=SELECT Id, Name FROM Contact"
        headers = {"Authorization": f"Bearer {token}"}
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                result = await response.json()
        if type(result) == list:
            for item in result[0]:
                if item == "errorCode":
                    raise Exception(str(result))
        else:
            for item in result:
                if item == "errorCode":
                    raise Exception(str(result))
            if "records" in result:
                contacts = []
                for contact in result["records"]:
                    contactId = contact["Id"]
                    contactName = contact["Name"]
                    contacts.append({"id": contactId, "name": contactName})
                return {"contacts": contacts}
    except Exception as e:
        if "Expecting value" in str(e):
            return JSONResponse(status_code=500, content={"Error": "Invalid Domain"})
        else:
            return JSONResponse(status_code=500, content={"Error": str(e)})


@http_app.post("/bot/salesforce/listLeads")
async def salesforce_list_leads(payload: SalesForceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "clientID" not in json_cred or "clientSecret" not in json_cred or "refreshToken" not in json_cred or "domainName" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        domain = json_cred["domainName"]
        token = await salesforce_refresh_access_token(client_id=json_cred["clientID"],client_secret=json_cred["clientSecret"],refresh_token=json_cred["refreshToken"])
        url = f"https://{domain}.my.salesforce.com/services/data/v58.0/query?q=SELECT Id, Name FROM Lead"
        headers = {"Authorization": f"Bearer {token}"}
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                result = await response.json()
        if type(result) == list:
            for item in result[0]:
                if item == "errorCode":
                    raise Exception(str(result))
        else:
            for item in result:
                if item == "errorCode":
                    raise Exception(str(result))
            if "records" in result:
                leads = []
                for lead in result["records"]:
                    leadId = lead["Id"]
                    leadName = lead["Name"]
                    leads.append({"id": leadId, "name": leadName})
                return {"leads": leads}
    except Exception as e:
        if "Expecting value" in str(e):
            return JSONResponse(status_code=500, content={"Error": "Invalid Domain"})
        else:
            return JSONResponse(status_code=500, content={"Error": str(e)})


@http_app.post("/bot/salesforce/listOpportunities")
async def salesforce_list_opportunities(payload: SalesForceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "clientID" not in json_cred or "clientSecret" not in json_cred or "refreshToken" not in json_cred or "domainName" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        domain = json_cred["domainName"]
        token = await salesforce_refresh_access_token(client_id=json_cred["clientID"],client_secret=json_cred["clientSecret"],refresh_token=json_cred["refreshToken"])
        url = f"https://{domain}.my.salesforce.com/services/data/v58.0/query?q=SELECT Id, Name FROM Opportunity"
        headers = {"Authorization": f"Bearer {token}"}
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                result = await response.json()
        if type(result) == list:
            for item in result[0]:
                if item == "errorCode":
                    raise Exception(str(result))
        else:
            for item in result:
                if item == "errorCode":
                    raise Exception(str(result))
            if "records" in result:
                opportunities = []
                for opportunity in result["records"]:
                    opportunityId = opportunity["Id"]
                    opportunityName = opportunity["Name"]
                    opportunities.append(
                        {"id": opportunityId, "name": opportunityName}
                    )
                return {"opportunities": opportunities}
    except Exception as e:
        if "Expecting value" in str(e):
            return JSONResponse(status_code=500, content={"Error": "Invalid Domain"})
        else:
            return JSONResponse(status_code=500, content={"Error": str(e)})


@http_app.post("/bot/salesforce/listCampaigns")
async def salesforce_list_campaigns(payload: SalesForceAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "clientID" not in json_cred or "clientSecret" not in json_cred or "refreshToken" not in json_cred or "domainName" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        domain = json_cred["domainName"]
        token = await salesforce_refresh_access_token(client_id=json_cred["clientID"],client_secret=json_cred["clientSecret"],refresh_token=json_cred["refreshToken"])
        url = f"https://{domain}.my.salesforce.com/services/data/v58.0/query?q=SELECT Id, Name FROM Campaign"
        headers = {"Authorization": f"Bearer {token}"}
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                result = await response.json()
        if type(result) == list:
            for item in result[0]:
                if item == "errorCode":
                    raise Exception(str(result))
        else:
            for item in result:
                if item == "errorCode":
                    raise Exception(str(result))
            if "records" in result:
                campaigns = []
                for campaign in result["records"]:
                    campaignId = campaign["Id"]
                    campaignName = campaign["Name"]
                    campaigns.append({"id": campaignId, "name": campaignName})
                return {"campaigns": campaigns}
    except Exception as e:
        if "Expecting value" in str(e):
            return JSONResponse(status_code=500, content={"Error": "Invalid Domain"})
        else:
            return JSONResponse(status_code=500, content={"Error": str(e)})

class SalesForceWithCustomObjectAppIntegration(BaseModel):
    credential_name: str
    customObjectName: str

@http_app.post("/bot/salesforce/listCustomObjectRecords")
async def salesforce_list_custom_objects(payload: SalesForceWithCustomObjectAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "clientID" not in json_cred or "clientSecret" not in json_cred or "refreshToken" not in json_cred or "domainName" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        domain = json_cred["domainName"]
        token = await salesforce_refresh_access_token(client_id=json_cred["clientID"],client_secret=json_cred["clientSecret"],refresh_token=json_cred["refreshToken"])
        custom_object_name = payload.customObjectName
        url = f"https://{domain}.my.salesforce.com/services/data/v58.0/query?q=Select Id FROM {custom_object_name}"
        headers = {"Authorization": f"Bearer {token}"}
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                result = await response.json()
        if type(result) == list:
            for item in result[0]:
                if item == "errorCode":
                    raise Exception(str(result))
        else:
            for item in result:
                if item == "errorCode":
                    raise Exception(str(result))
            if "records" in result:
                CustomObjs = []
                for CustomObj in result["records"]:
                    CustomObjId = CustomObj["Id"]
                    CustomObjs.append({"id": CustomObjId})
                return {"CustomObjs": CustomObjs}
    except Exception as e:
        if "Expecting value" in str(e):
            return JSONResponse(status_code=500, content={"Error": "Invalid Domain"})
        else:
            return JSONResponse(status_code=500, content={"Error": str(e)})



############################# Whatsapp API's  ###############################

class whatsappAppIntegration(BaseModel):
    credential_name: str

@http_app.post("/bot/whatsapp/getPhoneNumbers")
async def whatsapp_get_phoneNumbers(payload: whatsappAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred or "whatsappAccountId" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        accessToken = json_cred["accessToken"]
        whatsappAccountId = json_cred["whatsappAccountId"]
        url = f"https://graph.facebook.com/v21.0/{whatsappAccountId}/phone_numbers"
        headers = {"Authorization": f"Bearer {accessToken}"}
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                results = await response.json()
                if results.get("data"):
                    list_info = [
                        {"id": result["id"], "display_phone_number": result["display_phone_number"]} for result in results["data"]]
                    return {"PhoneNumbers": list_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})
    
@http_app.post("/bot/whatsapp/getTemplates")
async def whatsapp_get_message_templates(payload: whatsappAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "accessToken" not in json_cred or "whatsappAccountId" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required credential data."})

        accessToken = json_cred["accessToken"]
        whatsappAccountId = json_cred["whatsappAccountId"]
        url = f"https://graph.facebook.com/v21.0/{whatsappAccountId}/message_templates"
        headers = {"Authorization": f"Bearer {accessToken}"}
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                results = await response.json()
                if results.get("data"):
                    list_info = [
                    {
                        "label": f"{template['name']} ({template['language']})",
                        "value": f"{template['name']}::{template['language']}"
                    } for template in results['data']]
                    return {"Templates": list_info}
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# Hubspot API's  ###############################
class HubspotGetTokenAppIntegration(BaseModel):
    client_id: str
    client_secret: str
    code: str
    redirect_uri: str

@http_app.post("/bot/hubspot/getRefresh")
async def hubspot_get_refresh(payload: HubspotGetTokenAppIntegration):
    try:
        client_id=payload.client_id
        client_secret=payload.client_secret
        code=payload.code
        redirect_uri=payload.redirect_uri
        url = "https://api.hubapi.com/oauth/v1/token"
        headers = {
            "Content-Type":"application/x-www-form-urlencoded",
            "Accept":"application/json",
        }
        token_data = {
            "grant_type":"authorization_code",
            "client_id":client_id,
            "client_secret":client_secret,
            "redirect_uri":redirect_uri,
            "code":code
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(url=url,headers=headers,data=token_data) as response:
                if response.status == 200:
                    token_info = await response.json()
                    accessToken = token_info['access_token']
                    refresh_token = token_info['refresh_token']
                    return { "refresh_token":refresh_token ,"access_token":accessToken}
                else:
                    return JSONResponse(status_code=500, content={"Error": "Failed to obtain token."})
    except Exception as error:
            return JSONResponse(status_code=500, content={"Error": str(error)})
    
async def hubspot_refresh_token(credentials):
    try:
        url = "https://api.hubapi.com/oauth/v1/token"
        cred = credentials
        client_id = cred['clientID']
        client_secret = cred['clientSecret']
        refresh_token = cred['refreshToken']
        redirect_uri = cred['redirectUri']
        headers= {
            "Content-Type":"application/x-www-form-urlencoded",
            "Accept":"application/json",
        }
        token_data = {
            "grant_type":"refresh_token",
            "client_id":client_id,
            "client_secret":client_secret,
            "refresh_token":refresh_token,
            "redirect_uri":redirect_uri
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(url=url, headers=headers, data=token_data) as response:
                response.raise_for_status()
                if response.status == 200:
                    token_info = await response.json()
                    accessToken = token_info['access_token']
                    return accessToken
                else:
                    raise Exception(response.json())

    except Exception as error:
        raise Exception(error)
    
class HubspotAppIntegration(BaseModel):
    credential_name: str

@http_app.post("/bot/hubspot/getContacts")
async def hubspot_get_contacts(payload: HubspotAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        if "clientID" and "clientSecret" and "refreshToken" and "redirectUri" in json_cred:
            access_token = await hubspot_refresh_token(json_cred)
            api_url = "https://api.hubapi.com/crm/v3/objects/contacts?limit=100"
            headers = {
                        'Content-Type': 'application/json',
                        'Authorization': f'Bearer {access_token}'
                    }
            async with aiohttp.ClientSession() as session:
                async with session.get(api_url,headers=headers) as response:
                    response.raise_for_status()
                    data = await response.json() 
                    if response.status==200:
                        contacts_info = [{"id": contact['id'], "email": contact['properties']['email']}
                        for contact in data.get('results', [])]
                        return {"contacts": contacts_info}
                    else:
                        return JSONResponse(status_code=500, content={"Error":data}), 500
        else:
            return JSONResponse(status_code=500, content={"Error":"missing required fields"}), 400
    except Exception as error:
            return JSONResponse(status_code=500, content={"Error": str(error)})
    
@http_app.post("/bot/hubspot/getCompanies")
async def hubspot_get_companies(payload: HubspotAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        if "clientID" and "clientSecret" and "refreshToken" and "redirectUri" in json_cred:
            access_token = await hubspot_refresh_token(json_cred)
            api_url = "https://api.hubapi.com/crm/v3/objects/companies?limit=100"
            headers = {
                        'Content-Type': 'application/json',
                        'Authorization': f'Bearer {access_token}'
                    }
            async with aiohttp.ClientSession() as session:
                async with session.get(api_url,headers=headers) as response:
                    response.raise_for_status()
                    data = await response.json() 
                    if response.status==200:
                        companies_info = [{"id": company['id'], "domain": company['properties']['domain']}
                        for company in data.get('results', [])]
                        return {"companies": companies_info}
                    else:
                        return JSONResponse(status_code=500, content={"Error":data}), 500
        else:
            return JSONResponse(status_code=500, content={"Error":"missing required fields"}), 400
    except Exception as error:
            return JSONResponse(status_code=500, content={"Error": str(error)})
    
@http_app.post("/bot/hubspot/getDeals")
async def hubspot_get_deals(payload: HubspotAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        if "clientID" and "clientSecret" and "refreshToken" and "redirectUri" in json_cred:
            access_token = await hubspot_refresh_token(json_cred)
            api_url = "https://api.hubapi.com/crm/v3/objects/deals?limit=100"
            headers = {
                        'Content-Type': 'application/json',
                        'Authorization': f'Bearer {access_token}'
                    }
            async with aiohttp.ClientSession() as session:
                async with session.get(api_url,headers=headers) as response:
                    response.raise_for_status()
                    data = await response.json() 
                    if response.status==200:
                        deals_info = [{"id": deal['id'], "name": deal['properties']['dealname']}
                        for deal in data.get('results', [])]
                        return {"deals": deals_info}
                    else:
                        return JSONResponse(status_code=500, content={"Error":data}), 500
        else:
            return JSONResponse(status_code=500, content={"Error":"missing required fields"}), 400
    except Exception as error:
            return JSONResponse(status_code=500, content={"Error": str(error)})

@http_app.post("/bot/hubspot/getTickets")
async def hubspot_get_tickets(payload: HubspotAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        if "clientID" and "clientSecret" and "refreshToken" and "redirectUri" in json_cred:
            access_token = await hubspot_refresh_token(json_cred)
            api_url = "https://api.hubapi.com/crm/v3/objects/tickets?limit=100"
            headers = {
                        'Content-Type': 'application/json',
                        'Authorization': f'Bearer {access_token}'
                    }
            async with aiohttp.ClientSession() as session:
                async with session.get(api_url,headers=headers) as response:
                    response.raise_for_status()
                    data = await response.json() 
                    if response.status==200:
                        tickets_info = [{"id": ticket['id']}
                        for ticket in data.get('results', [])]
                        return {"tickets": tickets_info}
                    else:
                        return JSONResponse(status_code=500, content={"Error":data}), 500
        else:
            return JSONResponse(status_code=500, content={"Error":"missing required fields"}), 400
    except Exception as error:
            return JSONResponse(status_code=500, content={"Error": str(error)})
    
@http_app.post("/bot/hubspot/getCalls")
async def hubspot_get_calls(payload: HubspotAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        if "clientID" and "clientSecret" and "refreshToken" and "redirectUri" in json_cred:
            access_token = await hubspot_refresh_token(json_cred)
            api_url = "https://api.hubapi.com/crm/v3/objects/calls?limit=100"
            headers = {
                        'Content-Type': 'application/json',
                        'Authorization': f'Bearer {access_token}'
                    }
            async with aiohttp.ClientSession() as session:
                async with session.get(api_url,headers=headers) as response:
                    response.raise_for_status()
                    data = await response.json() 
                    if response.status==200:
                        calls_info = [{"id": call['id']}
                        for call in data.get('results', [])]
                        return {"calls": calls_info}
                    else:
                        return JSONResponse(status_code=500, content={"Error":data}), 500
        else:
            return JSONResponse(status_code=500, content={"Error":"missing required fields"}), 400
    except Exception as error:
            return JSONResponse(status_code=500, content={"Error": str(error)})
    
@http_app.post("/bot/hubspot/getDispositions")
async def hubspot_get_dispositions(payload: HubspotAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        if "clientID" and "clientSecret" and "refreshToken" and "redirectUri" in json_cred:
            access_token = await hubspot_refresh_token(json_cred)
            api_url = "https://api.hubapi.com/calling/v1/dispositions"
            headers = {
                        'Content-Type': 'application/json',
                        'Authorization': f'Bearer {access_token}'
                    }
            async with aiohttp.ClientSession() as session:
                async with session.get(api_url,headers=headers) as response:
                    response.raise_for_status()
                    data = await response.json() 
                    if response.status==200:
                        return {"Dispositions": data}
                    else:
                        return JSONResponse(status_code=500, content={"Error":data}), 500
        else:
            return JSONResponse(status_code=500, content={"Error":"missing required fields"}), 400
    except Exception as error:
            return JSONResponse(status_code=500, content={"Error": str(error)})

################################ AI Providers List Models BaseModel ################################

class AiProvidersListModelsAppIntegration(BaseModel):
    credential_name: str
    modelType: str

############################# OpenAi API's  ###############################

@http_app.post("/bot/openai/listModels")
async def openAi_list_models(payload: AiProvidersListModelsAppIntegration):
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

@http_app.post("/bot/togetherAi/listModels")
async def togetherAi_list_models(payload: AiProvidersListModelsAppIntegration):
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


############################# Cohere API's  ###############################

@http_app.post("/bot/cohere/listModels")
async def cohere_list_models(payload: AiProvidersListModelsAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        modelType = payload.modelType
        apiKey = json_cred["apiKey"]
        
        if modelType == "embedding":
            endpoint = "embed"
        else:
            endpoint = modelType
        url = f"https://api.cohere.com/v1/models?endpoint={endpoint}"
        headers = {"Authorization": f"Bearer {apiKey}"}

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
        if "models" in result:
            models = result.get("models", [])
            data = [model["name"] for model in models]
            return {"Models": data}
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# Anthropic API's  ###############################

@http_app.post("/bot/anthropic/listModels")
async def anthropic_list_models(payload: AiProvidersListModelsAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        # modelType = payload.modelType
        apiKey = json_cred["apiKey"]
        url = "https://api.anthropic.com/v1/models"
        headers = {"x-api-key": apiKey, "anthropic-version": "2023-06-01"}
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
        if "data" in result:
            models = result.get("data")
            data = [model["id"] for model in models]
            return {"Models": data}
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# Mistral AI API's  ###############################

@http_app.post("/bot/mistralAi/listModels")
async def mistralai_list_models(payload: AiProvidersListModelsAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})

        modelType = payload.modelType
        apiKey = json_cred["apiKey"]
        url = "https://api.mistral.ai/v1/models"
        headers = {"Authorization": f"Bearer {apiKey}"}

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
        if "data" in result:
            models = result["data"]
            if modelType == "embedding":
                modelType = "embed"
                embedding_models = [m["id"] for m in models if modelType in m["id"]]
                return {"Models": embedding_models}
            else:
                non_embedding_models = [
                    m["id"] for m in models if "embed" not in m["id"]
                ]
                return {"Models": non_embedding_models}
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# Ollama API's  ###############################

@http_app.post("/bot/ollama/listModels")
async def ollama_list_models(payload: AiProvidersListModelsAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "ollamaBaseUrl" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        # modelType = payload.modelType
        baseUrl = json_cred["ollamaBaseUrl"]
        url = f"{baseUrl}/api/tags"

        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                response.raise_for_status()
                result = await response.json()
        if "models" in result:
            models = result.get("models")
            data = [model["name"] for model in models]
            return {"Models": data}
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# Google Generative AI API's  ###############################

class GoogleGenerativeAiListModelsAppIntegration(BaseModel):
    credential_name: str
    modelType: str
    apiVersion: str


@http_app.post("/bot/googleGenerativeAi/listModels")
async def googleGenerativeAi_list_models(payload: GoogleGenerativeAiListModelsAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})

        modelType = payload.modelType
        apiVersion = payload.apiVersion
        apiKey = json_cred["apiKey"]
        url = f"https://generativelanguage.googleapis.com/{apiVersion}/models?key={apiKey}"

        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                response.raise_for_status()
                result = await response.json()
        if "models" in result:
            models = result["models"]
            data = [
                    model["name"]
                    for model in models
                    if modelType in model.get("supportedGenerationMethods", [])
                ]
            return {"Models": data}
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# Groq API's  ###############################

@http_app.post("/bot/groq/listModels")
async def groq_list_models(payload: AiProvidersListModelsAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]

        if "apiKey" not in json_cred:
            return JSONResponse(status_code=400, content={"Error": "Missing required data."})
        
        # modelType = payload.modelType
        apiKey = json_cred["apiKey"]
        url = f"https://api.groq.com/openai/v1/models"
        headers = {"Authorization": f"Bearer {apiKey}"}

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
        if "data" in result:
            models = result.get("data")
            data = [model["id"] for model in models]
            return {"Models": data}
        return JSONResponse(status_code=500, content={"Error": str(result)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# Nvidia AI API's  ###############################

@http_app.post("/bot/nvidia/listModels")
async def nvidia_list_models(payload: AiProvidersListModelsAppIntegration):
    try:
        model_type = payload.modelType
        if model_type == "chat":
            available_models = ChatNVIDIA.get_available_models()
        elif model_type == "embedding":
            available_models = NVIDIAEmbeddings.get_available_models()
        model_ids = [model.id for model in available_models]
        return {"Models": model_ids}
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})


############################# Cerebras API's  ###############################

@http_app.post("/bot/cerebras/listModels")
async def cerebras_list_models(payload: AiProvidersListModelsAppIntegration):
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

@http_app.post("/bot/openRouter/listModels")
async def openrouter_list_models(payload: AiProvidersListModelsAppIntegration):
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

@http_app.post("/bot/liteLlm/listModels")
async def litellm_list_models(payload: AiProvidersListModelsAppIntegration):
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

@http_app.post("/bot/ibmWatsonx/listModels")
async def ibm_watsonx_list_models(payload: AiProvidersListModelsAppIntegration):
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
    

#################################################### GOOGLE MEET ############################################################

def google_calendar_create_token(cred):
    try:
        result = {}
        result['token'] = cred['accessToken']
        result['refresh_token'] = cred['refreshToken']
        result['token_uri'] = "https://oauth2.googleapis.com/token"
        result['client_id'] = cred['clientID']
        result['client_secret'] = cred['clientSecret']
        result['scopes'] = ['https://www.googleapis.com/auth/calendar']
        result['expiry'] = cred['expirey']
        return json.dumps(result)
    except Exception as e:
        raise Exception(e)
    
class googleMeetAppIntegration(BaseModel):
    credential_name: str

@http_app.post("/bot/google_meet/getCalendars")
async def google_meet_get_calendars(payload: googleMeetAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        cred = google_calendar_create_token(json_cred)
        service = google_create_service(cred,'calendar', 'v3')
        calendar_list = service.calendarList().list().execute()
        if calendar_list:
            filtered_calendars = []
            for calendar in calendar_list.get('items', []):
                if calendar.get('accessRole') in ['owner', 'writer']:
                    filtered_calendars.append({
                        'id': calendar.get('id'),
                        'summary': calendar.get('summary')
                    })
            return {"calendars":filtered_calendars }
        else:
            return JSONResponse(status_code=400, content={"Error": "Failed to retrieve Calendars."})
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

class GoogleMeetTimezoneAppIntegration(BaseModel):
    credential_name: str
    calendarId: str

@http_app.post("/bot/google_meet/getTimezone")
async def google_meet_get_timeZone(payload: GoogleMeetTimezoneAppIntegration):
    try:
        json_cred = get_credentials_by_names(payload.credential_name)
        json_cred = json_cred[payload.credential_name]
        cred = google_calendar_create_token(json_cred)
        service = google_create_service(cred,'calendar', 'v3')
        calendar = service.calendars().get(calendarId=payload.calendarId).execute()
        if calendar:
            timeZone = calendar.get('timeZone')
            return [{"timeZone":timeZone }]
        else:
            return JSONResponse(status_code=400, content={"Error": "Failed to retrieve Timezone."})
    except Exception as error:
        return JSONResponse(status_code=500, content={"Error": str(error)})

############################# MCP API's  ###############################
class McpTools(BaseModel):
    data: dict

@http_app.post("/bot/langchain/listMcpTools")
async def list_all_tool_names(tools: McpTools):
    def setup_mcp_servers(mcp):
        mcps = {}
        if "name" in mcp and "url" in mcp:
            mcpname = mcp["name"]
            mcps[mcpname] = {
                "url": mcp["url"],
                "transport": "sse" if "/sse" in mcp["url"] else "streamable_http"
            }
        elif "name" in mcp and "credential" in mcp:
            mcpname = mcp["name"].split("/")[0]

            json_cred = get_credentials_by_names(mcp['credential'])
            currentDir = os.getcwd()  # get current working directory

            # get cred value and create env vars
            envVars = {}
            if mcpname == 'SlackMcpServer':
                envVars = {'SLACK_BOT_TOKEN': json_cred[mcp['credential']]['accessToken']}
            elif mcpname == 'NotionMcpServer':
                envVars = {'NOTION_BOT_TOKEN': json_cred[mcp['credential']]['accessToken']}
            elif mcpname == 'WhatsappMcpServer':
                envVars = {'WHATSAPP_TOKEN': json_cred[mcp['credential']]['accessToken'], 'WHATSAPP_ACCOUNT_ID': json_cred[mcp['credential']]['whatsappAccountId']}
            elif mcpname == 'AirtableMcpServer':
                envVars = {'AIRTABLE_BOT_TOKEN': json_cred[mcp['credential']]['accesstoken']}
            elif mcpname == 'GoogleSheetsMcpServer':
                envVars = {
                    'GOOGLESHEETS_REFRESH_TOKEN': json_cred[mcp['credential']]['refreshToken'],
                    'GOOGLESHEETS_ACCESS_TOKEN': json_cred[mcp['credential']]['accessToken'],
                    'GOOGLESHEETS_CLIENT_ID': json_cred[mcp['credential']]['clientID'],
                    'GOOGLESHEETS_CLIENT_SECRET': json_cred[mcp['credential']]['clientSecret'],
                    'GOOGLESHEETS_SCOPE': json_cred[mcp['credential']]['scope'],
                    'GOOGLESHEETS_EXPIREY': json_cred[mcp['credential']]['expirey']
                    }
            elif mcpname == 'FreshdeskMcpServer':
                envVars = {
                    'FRESHDESK_API_KEY': json_cred[mcp['credential']]['apiKey'],
                    'FRESHDESK_DOMAIN': json_cred[mcp['credential']]['domain']
                    }
            elif mcpname == 'HubspotMcpServer':
                envVars = {
                    'HUBSPOT_REDIRECT_URI': json_cred[mcp['credential']]['redirectUri'],
                    'HUBSPOT_REFRESH_TOKEN': json_cred[mcp['credential']]['refreshToken'],
                    'HUBSPOT_CLIENT_ID': json_cred[mcp['credential']]['clientID'],
                    'HUBSPOT_CLIENT_SECRET': json_cred[mcp['credential']]['clientSecret']
                    }
            elif mcpname == 'MailchimpMcpServer':
                envVars = {
                    'MAILCHIMP_API_KEY': json_cred[mcp['credential']]['apiKey'],
                    'MAILCHIMP_SERVER_PREFIX': json_cred[mcp['credential']]['serverPrefix']
                    }
            elif mcpname == 'GmailMcpServer':
                envVars = {
                    'GMAIL_ACCESS_TOKEN': json_cred[mcp['credential']]['accessToken'],
                    'GMAIL_REFRESH_TOKEN': json_cred[mcp['credential']]['refreshToken'],
                    'GMAIL_CLIENT_ID': json_cred[mcp['credential']]['clientID'],
                    'GMAIL_CLIENT_SECRET': json_cred[mcp['credential']]['clientSecret'],
                    'GMAIL_EXPIREY': json_cred[mcp['credential']]['expirey']
                    }
            elif mcpname == 'GoogleCalendarMcpServer':
                envVars = {
                    'GOOGLE_CALENDAR_ACCESS_TOKEN': json_cred[mcp['credential']]['accessToken'],
                    'GOOGLE_CALENDAR_REFRESH_TOKEN': json_cred[mcp['credential']]['refreshToken'],
                    'GOOGLE_CALENDAR_CLIENT_ID': json_cred[mcp['credential']]['clientID'],
                    'GOOGLE_CALENDAR_CLIENT_SECRET': json_cred[mcp['credential']]['clientSecret'],
                    'GOOGLE_CALENDAR_SCOPE': json_cred[mcp['credential']]['scope'],
                    'GOOGLE_CALENDAR_EXPIREY': json_cred[mcp['credential']]['expirey']
                    }
            elif mcpname == 'GoogleDriveMcpServer':
                envVars = {
                    'GOOGLE_DRIVE_ACCESS_TOKEN': json_cred[mcp['credential']]['accessToken'],
                    'GOOGLE_DRIVE_REFRESH_TOKEN': json_cred[mcp['credential']]['refreshToken'],
                    'GOOGLE_DRIVE_CLIENT_ID': json_cred[mcp['credential']]['clientID'],
                    'GOOGLE_DRIVE_CLIENT_SECRET': json_cred[mcp['credential']]['clientSecret'],
                    'GOOGLE_DRIVE_EXPIREY': json_cred[mcp['credential']]['expirey']
                    }
            elif mcpname == 'StripeMcpServer':
                envVars = {'STRIPE_API_KEY': json_cred[mcp['credential']]['apiKey']}
            
            mcps[mcp["name"]] = {
                "command": sys.executable,
                "args": [f"{currentDir}/mcpServers/{mcpname}.py"],
                "transport": "stdio",
                "env": envVars
            }
        return mcps
    
    client = MultiServerMCPClient(setup_mcp_servers(tools.data))
    tools = await client.get_tools()
    
    return [tool.name for tool in tools]


@http_app.get("/bot/langchain/listMcps")
async def list_mcps():
    current_dir = os.getcwd()
    mcp_servers_dir = f"{current_dir}/mcpServers"

    mcp_names = []
    for mcpname in os.listdir(mcp_servers_dir):
        if os.path.isfile(os.path.join(mcp_servers_dir, mcpname)):
            mcpname = os.path.splitext(mcpname)[0]
            type = mcpname.split("McpServer")[0]
            google_mcps = ["Gmail", "GoogleCalendar", "GoogleDrive", "GoogleSheets"]
            if type in google_mcps:
                type = "Google"
            mcp_names.append({
                "name": mcpname,
                "type": f"{mcpname}/{type}"
            })
    return mcp_names




import aiohttp,sys,os,json
import  requests, base64
from models.credentials import get_credentials_by_names
from applications.functions import get_file_data,upload_file

status = [200, 201, 202, 204, 206, 207, 208]



sys.path.append(os.path.dirname(os.path.abspath(__file__)))




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
            if response.status in status:
                return result
            return {"Error" : result}

    
########################################## CONTACT ##########################################

async def outlook_get_many_contacts(json_cred, params, **kwargs):
    """
    Retrieve multiple contacts from Outlook using Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']):
            return  {"Error": "Missing required data."}
        
        client_id = json_cred['clientId']
        client_secret = json_cred['clientSecret']
        refresh_token = json_cred['refreshToken']
        token = await microsoft_refresh_token(refresh_token,client_id,client_secret)

        url = "https://graph.microsoft.com/v1.0/me/contacts"
        limit_param = params.get('limit')
        filter_param = params.get('filter')
        query_params = []
        if limit_param:
            query_params.append(f"$top={limit_param}")
        if filter_param:
            query_params.append(f"$filter={filter_param}")
        if query_params:
            url += "?" + "&".join(query_params)
        headers = {
            "Authorization": f"Bearer {token['access_token']}"
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
                if response.status in status:
                  return result['value']
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def outlook_get_contact(json_cred, params, **kwargs):

    """
    Retrieve a contact from Outlook using the Microsoft Graph API.

    """
    
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'contact_id' not in params:
            return {"Error": "Missing required data."}
        
        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])
        url = f"https://graph.microsoft.com/v1.0/me/contacts/{params['contact_id']}"

        headers = {"Authorization": f"Bearer {token['access_token']}"}
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def outlook_create_contact(json_cred, params, **kwargs):
    """
    Create a contact in Outlook using Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'givenName' not in params:
            return {"Error": "Missing required data."}
        
        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])
        url = "https://graph.microsoft.com/v1.0/me/contacts"

        headers = {"Authorization": f"Bearer {token['access_token']}", "Content-Type": "application/json"}

        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=headers, json=params) as response:
                result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}




async def outlook_update_contact(json_cred, params, **kwargs):
    """
    Update a contact in Outlook using the Microsoft Graph API.

    """
    try:

        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'contact_id' not in params:
            return {"Error": "Missing required data."}
        
        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])


        url = f"https://graph.microsoft.com/v1.0/me/contacts/{params['contact_id']}"

        headers = {"Authorization": f"Bearer {token['access_token']}", "Content-Type": "application/json"}

        data = {}
        for key, value in params.items():
            skip_keys = ["contact_id"]
            if key in skip_keys:
                continue
            if value:
                data[key] = value

        async with aiohttp.ClientSession() as session:
            async with session.patch(url, headers=headers, json=data) as response:
                result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}




async def outlook_delete_contact(json_cred, params, **kwargs):

    """
    Delete a contact in Outlook using the Microsoft Graph API.

    """
    try:

        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'contact_id' not in params:
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = f"https://graph.microsoft.com/v1.0/me/contacts/{params['contact_id']}"

        headers = {"Authorization": f"Bearer {token['access_token']}"}
        async with aiohttp.ClientSession() as session:
            async with session.delete(url, headers=headers) as response:
                if response.status in status:
                    return {"message": "Contact deleted successfully"}
                result = await response.json()
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

########################################## calendar ##########################################


async def outlook_get_many_calendars(json_cred, params, **kwargs):
    """
    Retrieve multiple calendars from Outlook using Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']):
            return {"Error": "Missing required data."}
        
        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = "https://graph.microsoft.com/v1.0/me/calendars"
        limit_param = params.get('limit')
        filter_param = params.get('filter')
        query_params = []
        if limit_param:
            query_params.append(f"$top={limit_param}")
        if filter_param:
            query_params.append(f"$filter={filter_param}")
        if query_params:
            url += "?" + "&".join(query_params)
        headers = {
            "Authorization": f"Bearer {token['access_token']}"
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
            if response.status in status:
              return result['value']
            return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def outlook_get_calendar(json_cred, params, **kwargs):
    """
    Retrieve a calendar from Outlook using the Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)
        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'calendar_id' not in params:
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = f"https://graph.microsoft.com/v1.0/me/calendars/{params['calendar_id']}"
        headers = {
            "Authorization": f"Bearer {token['access_token']}"
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def outlook_create_calendar(json_cred, params, **kwargs):
    """
    Create a calendar in Outlook using Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'name' not in params:
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

      
        url = f"https://graph.microsoft.com/v1.0/me"
        if 'calendarGroup_id' in params:
            url = f"{url}/calendarGroups/{params['calendarGroup_id']}/calendars"
        else:
            url = f"{url}/calendars"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
            "Content-Type": "application/json"
        }
        
        data = {}
        for key, value in params.items():
            skip_keys = ["calendarGroup_id"]
            if key in skip_keys:
                continue
            if value:
                data[key] = value

        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=headers, json=data) as response:
                result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def outlook_update_calendar(json_cred, params, **kwargs):
    """
    Update a calendar in Outlook using the Microsoft Graph API.

    """
    try:

        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'calendar_id' not in params:
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = f"https://graph.microsoft.com/v1.0/me/calendars/{params['calendar_id']}"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
            "Content-Type": "application/json"
        }
        data = {}
        for key, value in params.items():
            skip_keys = ["calendar_id"]
            if key in skip_keys:
                continue
            if value:
                data[key] = value

        async with aiohttp.ClientSession() as session:
            async with session.patch(url, headers=headers, json=data) as response:
                result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def outlook_delete_calendar(json_cred, params, **kwargs):
    """
    Delete a calendar in Outlook using the Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'calendar_id' not in params:
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = f"https://graph.microsoft.com/v1.0/me/calendars/{params['calendar_id']}"
        headers = {
            "Authorization": f"Bearer {token['access_token']}"
        }
        async with aiohttp.ClientSession() as session:
            async with session.delete(url, headers=headers) as response:
                if response.status in status:
                    return {"message": "Calendar deleted successfully"}
                result = await response.json()
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

########################################## folder ##########################################

async def outlook_get_many_folders(json_cred, params, **kwargs):

    """
    Retrieve multiple folders from Outlook using Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']):
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = "https://graph.microsoft.com/v1.0/me/mailFolders"
        limit_param = params.get('limit')
        filter_param = params.get('filter')
        query_params = []
        if limit_param:
            query_params.append(f"$top={limit_param}")
        if filter_param:
            query_params.append(f"$filter={filter_param}")
        if query_params:
            url += "?" + "&".join(query_params)
        headers = {
            "Authorization": f"Bearer {token['access_token']}"
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
            if response.status in status:
              return result['value']
            return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
 

async def outlook_get_folder(json_cred, params, **kwargs):
    """
    Retrieve a folder from Outlook using the Microsoft Graph API.

    """
    try:

        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'folder_id' not in params:
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = f"https://graph.microsoft.com/v1.0/me/mailFolders/{params['folder_id']}"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
            if response.status in status:
              return result
            return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def outlook_create_folder(json_cred, params, **kwargs):

    """
    Create a folder in Outlook using Microsoft Graph API.

    """
    try:
            json_cred = json.loads(json_cred)

            if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'displayName' not in params:
                return {"Error": "Missing required data."}

            token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])
            url = "https://graph.microsoft.com/v1.0/me/mailFolders"
            headers = {
                "Authorization": f"Bearer {token['access_token']}",
                "Content-Type": "application/json"
            }
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=params) as response:
                    result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def outlook_update_folder(json_cred, params, **kwargs):

    """
    Update a folder in Outlook using the Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'folder_id' not in params:
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])
        
        url = f"https://graph.microsoft.com/v1.0/me/mailFolders/{params['folder_id']}"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
            "Content-Type": "application/json"
        }
        data = {}
        for key, value in params.items():
            skip_keys = ["folder_id"]
            if key in skip_keys:
                continue
            if value:
                data[key] = value

        async with aiohttp.ClientSession() as session:
            async with session.patch(url, headers=headers, json=data) as response:
                result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def outlook_delete_folder(json_cred, params, **kwargs):

    """
    Delete an folder by ID using Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'folder_id' not in params:
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])
        url = f"https://graph.microsoft.com/v1.0/me/mailFolders/{params['folder_id']}"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }
        async with aiohttp.ClientSession() as session:
            async with session.delete(url, headers=headers) as response:
                if response.status in status:
                    return {"message": "Folder deleted successfully"}
                result = await response.json()
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

        

########################################## folder message ##########################################


async def outlook_get_many_folder_messages(json_cred, params, **kwargs):
    """
    Retrieves the messages in a folder from Outlook using Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'folder_id' not in params:
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])
        url = f"https://graph.microsoft.com/v1.0/me/mailFolders/{params['folder_id']}/messages"
        limit_param = params.get('limit')
        filter_param = params.get('filter')
        search_param = params.get('search')
        query_params = []
        if limit_param:
            query_params.append(f"$top={limit_param}")
        if search_param:
            query_params.append(f"$search={search_param}")
        if filter_param:
            query_params.append(f"$filter={filter_param}")
        if query_params:
            url += "?" + "&".join(query_params)
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
                if response.status in status:
                    return result['value']
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
          
             
            
##########################################  message ##########################################


async def outlook_get_many_message(json_cred, params, **kwargs):
    """
    Retrieve multiple messages from Outlook using Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']):
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = f"https://graph.microsoft.com/v1.0/me/messages"
        limit_param = params.get('limit')
        filter_param = params.get('filter')
        search_param = params.get('search')
        query_params = []
        if limit_param:
            query_params.append(f"$top={limit_param}")
        if search_param:
            query_params.append(f"$search={search_param}")
        if filter_param:
            query_params.append(f"$filter={filter_param}")
        if query_params:
            url += "?" + "&".join(query_params)
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
                if response.status in status:
                    return result['value']
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def outlook_get_message(json_cred, params, **kwargs):
    """
    Retrieve a message from Outlook using the Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'message_id' not in params:
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = f"https://graph.microsoft.com/v1.0/me/messages/{params['message_id']}"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
            "Content-type": "application/json"
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def outlook_delete_message(json_cred, params, **kwargs):
    """
    Delete an message by ID using Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'message_id' not in params:
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])
        url = f"https://graph.microsoft.com/v1.0/me/messages/{params['message_id']}"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }
        async with aiohttp.ClientSession() as session:
            async with session.delete(url, headers=headers) as response:
                if response.status in status:
                    return {"message": "Message deleted successfully"}
                result = await response.json()
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
            


async def outlook_move_message(json_cred, params, **kwargs):

    """
    Move a message to a specific folder in Outlook using Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'message_id' not in params:
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])
        url = f"https://graph.microsoft.com/v1.0/me/messages/{params['message_id']}/move"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
            "Content-Type": "application/json"
        }
        data = {}
        for key, value in params.items():
            skip_keys = ["message_id"]
            if key in skip_keys:
                continue
            if value:
                data[key] = value

        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=headers, json=data) as response:
                result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
        


async def outlook_reply_message(json_cred, params, **kwargs):
    """
    Create a reply to a message in Outlook.

    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :dialogue_id: (str, Required) - for uploading attachments.
        - :conv_id: (str, required) -  for uploading attachments.
        - :message_id: (str,required) - The ID of the Outlook message to which a reply will be created.
        - :reply_content_body: (str,required) - The body of the reply message.
        - :reply_contentType_body: (str,required) - The content Type of the reply message.

    Returns:
        dict: A dictionary containing information about the created reply.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or not all(param in params for param in ['message_id', 'reply_content_body', 'reply_contentType_body']):
            return {"Error": "Missing required data."}
            
        message_id = params["message_id"]
        reply_content_body = params.get("reply_content_body")
        reply_contentType_body = params.get("reply_contentType_body")
        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = f"https://graph.microsoft.com/v1.0/me/messages/{message_id}/reply"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
            "Content-Type": "application/json"
        }
        data = {
            "message": {
                "body": {
                    "content": reply_content_body,
                    "contentType": reply_contentType_body
                }
            }
        }

        attachments = params.get("attachments", "")
        if attachments:
            data["message"]["attachments"] = []
            for attachment in attachments:
                if attachment["type"] == "ByteString":
                    if kwargs:
                        # Extra conv_id & dialogue_id
                        dialogue_id = kwargs.get("dialogue_id")
                        conv_id = kwargs.get("conv_id")

                    contentData = get_file_data(dialogue_id,conv_id,attachment["contentBytes"])
                    if "Error" in contentData:
                        raise Exception(f"Failed to retrieve file content: {contentData['Error']}")
                    
                    # Extract file content and name
                    attachment_bytes = base64.b64encode(bytes.fromhex(contentData["file_content"])).decode('utf-8')
                    data["message"]["attachments"].append({
                        "@odata.type": "#microsoft.graph.fileAttachment",
                        "name": attachment["fileName"],
                        "contentBytes": attachment_bytes
                    })
                elif attachment["type"] == "url":
                    response = requests.get(attachment["url_attachment"])
                    if response.status_code == 200:
                        file_content = response.content
                        if file_content:
                            encoded_content = base64.b64encode(
                                file_content).decode('utf-8')
                            data["message"]["attachments"].append(
                                {
                                    "@odata.type": "#microsoft.graph.fileAttachment",
                                    "name": attachment["fileName"],
                                    "contentBytes": encoded_content
                                })
                        else:
                            raise Exception("File content is empty.")
                    else:
                        raise Exception(
                            f"Failed to download file from URL. Status code: {response.status_code}")
                else:
                    raise Exception(
                        f"Invalid attachment type: {attachment['type']}")

        for key, value in params.items():
            skip_keys = ["message_id", "reply_body"]
            if key in skip_keys:
                continue
            if value:
                data[key] = value
        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=headers, json=data) as response:
                result = await response.json()
                if response.status in status:
                    return {"Message": "Reply creation request accepted."}
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def outlook_send_message(json_cred, params, **kwargs):
    """
    Send a message in Outlook.

    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :dialogue_id: (str, Required) - for uploading attachments.
        - :conv_id: (str, required) - for uploading attachments.
        - :to_emails: (list,required) - List of email addresses for primary recipients.
        - :subject: (str,required) - The subject of the email.
        - :bodyFormat: (str,required) - The format of the email body ("text" or "html").
        - :body: (str,required) - The content of the email body.
        - :cc_emails: (list,optional) - List of email addresses for CC (Carbon Copy).
        - :bcc_emails: (list,optional) - List of email addresses for BCC (Blind Carbon Copy).
        - :attachments: (list, optional) - List of dictionaries representing attachments. 
            
         :type: (str, required) - Type of attachment ("ByteString" or "url").
         :fileName: (str, required) - Name of the attachment file.
         :contentBytes: (str,required if type is "ByteString") - Base64 encoded content of the attachment.
         :url_attachment: (str,required if type is "url") - URL of the attachment.

    Returns:
        dict: A dictionary indicating the success of the operation.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or not all(param in params for param in ['subject', 'body', 'bodyFormat','to_emails']):
            return {"Error": "Missing required data."}
        
        
        subject = params["subject"]
        body = params["body"]
        bodyFormat = params["bodyFormat"]
        to_emails = params["to_emails"]
        cc_emails = params.get("cc_emails", "")
        bcc_emails = params.get("bcc_emails", "")
        attachments = params.get("attachments", "")
        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = "https://graph.microsoft.com/v1.0/me/sendMail"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
            "Content-Type": "application/json"
        }
        email_data = {
            "message": {
                "subject": subject,
                "body": {
                    "content": body,
                    "contentType": bodyFormat
                },
                "toRecipients": [{"emailAddress": {"address": email}} for email in to_emails],
                "ccRecipients": [{"emailAddress": {"address": email}} for email in cc_emails],
                "bccRecipients": [{"emailAddress": {"address": email}} for email in bcc_emails],
            }
        }
        if attachments:
            email_data["message"]["attachments"] = []
            for attachment in attachments:
                if attachment["type"] == "ByteString":

                    if kwargs:
                        # Extra conv_id & dialogue_id
                        dialogue_id = kwargs.get("dialogue_id")
                        conv_id = kwargs.get("conv_id")

                    contentData = get_file_data(dialogue_id,conv_id,attachment["contentBytes"])
                    if "Error" in contentData:
                        raise Exception(f"Failed to retrieve file content: {contentData['Error']}")
                    
                    # Extract file content and name
                    attachment_bytes = base64.b64encode(bytes.fromhex(contentData["file_content"])).decode('utf-8')
                    email_data["message"]["attachments"].append({
                        "@odata.type": "#microsoft.graph.fileAttachment",
                        "name": attachment["fileName"],
                        "contentBytes": attachment_bytes
                    })
                elif attachment["type"] == "url":
                    response = requests.get(attachment["url_attachment"])
                    if response.status_code == 200:
                        file_content = response.content
                        if file_content:
                            encoded_content = base64.b64encode(
                                file_content).decode('utf-8')
                            email_data["message"]["attachments"].append(
                                {
                                    "@odata.type": "#microsoft.graph.fileAttachment",
                                    "name": attachment["fileName"],
                                    "contentBytes": encoded_content
                                })
                        else:
                            raise Exception("File content is empty.")
                    else:
                        raise Exception(
                            f"Failed to download file from URL. Status code: {response.status_code}")
                else:
                    raise Exception(
                        f"Invalid attachment type: {attachment['type']}")
        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=headers, json=email_data) as response:
                result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


##########################################  event ##########################################

async def outlook_get_event(json_cred, params, **kwargs):
    """
    Retrieve a specific event from a calendar using the Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or not all(param in params for param in ['calendar_id', 'event_id']):
            return  {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])
        
        url = f"https://graph.microsoft.com/v1.0/me/calendars/{params['calendar_id']}/events/{params['event_id']}"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
            }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()  
                result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    


async def outlook_delete_event(json_cred, params, **kwargs):
    """
    Delete an event by ID using Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or not all(param in params for param in ['calendar_id', 'event_id']):
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = f"https://graph.microsoft.com/v1.0/me/calendars/{params['calendar_id']}/events/{params['event_id']}"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }
        async with aiohttp.ClientSession() as session:
            async with session.delete(url, headers=headers) as response:
                if response.status in status:
                    return {"message": "Event deleted successfully"}
                result = await response.json()
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def outlook_get_many_event(json_cred, params, **kwargs):

    """
    Retrieve multiple events from Outlook using Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'calendar_id' not in params:
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = f"https://graph.microsoft.com/v1.0/me/calendars/{params['calendar_id']}/events"
        limit_param = params.get('limit')
        filter_param = params.get('filter')
        query_params = []
        if limit_param:
            query_params.append(f"$top={limit_param}")
        if filter_param:
            query_params.append(f"$filter={filter_param}")
        if query_params:
            url += "?" + "&".join(query_params)
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
                if response.status in status:
                    return result['value']
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def outlook_create_event(json_cred, params, **kwargs):
    """
    Create an event in Outlook using Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or not all(param in params for param in ['calendar_id', 'subject', 'start_time', 'end_time']):
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = f"https://graph.microsoft.com/v1.0/me/calendars/{params['calendar_id']}/events"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
            "Content-Type": "application/json"
        }
        data = {
            "start": {"dateTime": params['start_time'], "timeZone": "UTC"},
            "end": {"dateTime": params['end_time'], "timeZone": "UTC"}
        }
        body_content = params.get("body_content")
        if body_content:
            data["body"] = {
                    "content": body_content,
                    "contentType": "HTML"
                }

        for key, value in params.items():
            skip_keys = ["calendar_id", "body_content",
                            "start_time", "end_time"]
            if key in skip_keys:
                continue
            if value:
                data[key] = value

        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=headers, json=data) as response:
                result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    


async def outlook_update_event(json_cred,params, **kwargs):
    """
    Update an event in Outlook using the Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or not all(param in params for param in ['calendar_id', 'event_id']):
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = f"https://graph.microsoft.com/v1.0/me/calendars/{params['calendar_id']}/events/{params['event_id']}"
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
            "Content-Type": "application/json"
        }
        data={}

        for key, value in params.items():
            skip_keys = ["calendar_id", "event_id", "end_time", "start_time"]
            if key in skip_keys:
                continue
            if value:
                data[key] = value

        start_time = params.get('start_time')
        end_time = params.get('end_time')

        if start_time and end_time:
            data = {
                "start": {
                    "dateTime": start_time,
                    "timeZone": "UTC"
                },
                "end": {
                    "dateTime": end_time,
                    "timeZone": "UTC"
                }
            }
                
        async with aiohttp.ClientSession() as session:
            async with session.patch(url, headers=headers, json=data) as response:
                result = await response.json()
                if response.status in status:
                    return result
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

##########################################  message attachment ##########################################


async def outlook_get_many_message_attachment(json_cred, params, **kwargs):
    """
    Retrieves many attachments from an Outlook message using the Microsoft Graph API.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or 'message_id' not in params:
            return {"Error": "Missing required data."}

        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        url = f"https://graph.microsoft.com/v1.0/me/messages/{params['message_id']}/attachments"

        if not params['returnContent']: # get attachments without contents
            url += "?$select=contentType,isInline,lastModifiedDateTime,name,size"

        limit_param = params.get('limit')
        query_params = []
        if limit_param:
            query_params.append(f"$top={limit_param}")
        if query_params:
            url += "?" + "&".join(query_params)
        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
                if response.status in status:
                    return result['value']
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def outlook_get_message_attachment(json_cred, params, **kwargs):
    """
    Retrieve information about an attachment of a message in Outlook.

    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :dialogue_id: (str, Required) - for Downloading the file.
        - :conv_id: (str, required) - for Downloading the file.
        - :message_id: (str,required) - The ID of the Outlook message containing the attachment.
        - :attachment_id: (str,required) - The ID of the attachment to retrieve information.

    Returns:
        dict: A dictionary containing information about the attachment.

    """
    try:
        json_cred = json.loads(json_cred)

        if not all(cred in json_cred for cred in ['refreshToken', 'clientSecret', 'clientId']) or not all(param in params for param in ['message_id', 'attachment_id']):
            return {"Error": "Missing required data."}

        message_id = params["message_id"]
        attachment_id = params["attachment_id"]
        
        url = f"https://graph.microsoft.com/v1.0/me/messages/{message_id}/attachments/{attachment_id}"
        token = await microsoft_refresh_token(json_cred['refreshToken'], json_cred['clientId'], json_cred['clientSecret'])

        headers = {
            "Authorization": f"Bearer {token['access_token']}",
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                result = await response.json()
                if response.status in status:
                    if not params["returnContent"]:# get attachment with download option
                        file_bytes = base64.b64decode(result['contentBytes'])
                        file_name = result.get('name')
                        if kwargs:
                            # Extra conv_id & dialogue_id
                            dialogue_id = kwargs.get("dialogue_id")
                            conv_id = kwargs.get("conv_id")
                            result = upload_file(dialogue_id,conv_id,file_bytes,file_name) 
                    return result
                return {"Error": result} 

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
        
           
operations = {
    'GetManyContacts':outlook_get_many_contacts,
    'GetContact':outlook_get_contact,
    'CreateContact':outlook_create_contact,
    'UpdateContact':outlook_update_contact,
    'DeleteContact':outlook_delete_contact,
    'GetManyCalendars':outlook_get_many_calendars,
    'GetCalendar':outlook_get_calendar,
    'CreateCalendar':outlook_create_calendar,
    'UpdateCalendar':outlook_update_calendar,
    'DeleteCalendar':outlook_delete_calendar,
    'GetManyFolders':outlook_get_many_folders,
    'GetFolder':outlook_get_folder,
    'CreateFolder':outlook_create_folder,
    'UpdateFolder':outlook_update_folder,
    'DeleteFolder':outlook_delete_folder,
    'GetManyFolderMessages':outlook_get_many_folder_messages,
    'GetMessage':outlook_get_message,
    'GetManyMessages':outlook_get_many_message,
    'DeleteMessage':outlook_delete_message,
    'MoveMessage':outlook_move_message,
    'ReplyMessage':outlook_reply_message,
    'SendMessage':outlook_send_message,
    'GetEvent':outlook_get_event,
    'DeleteEvent':outlook_delete_event,
    'GetManyEvents':outlook_get_many_event,
    'CreateEvent':outlook_create_event,
    'UpdateEvent':outlook_update_event,
    'GetManyMessageAtts':outlook_get_many_message_attachment,
    'GetMessageAtt':outlook_get_message_attachment
}
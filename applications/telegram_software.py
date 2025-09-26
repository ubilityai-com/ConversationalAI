import aiohttp,sys,os,json

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from applications.functions import get_file_data,upload_file,normalize_params

async def telegram_send_message(json_cred, params, **kwargs):
    """
    Send Message to user from the bot.

    :param str accessToken:  Access Token for authentication with telegram bot.
    :param dict params: Dictionary containing parameters.

        -  :chat_id: (str, required) - The id of the chat where to send the message. 
        -  :text: (str, required) - The text message to be sent.
        -  :disable_notification: (bool, optional) - To send the message silently or not. 
        -  :protect_content: (bool, optional) - To protect the contents of the sent message from forwarding and saving.  

    Returns:
        Dict: Informations about the message sent.      

    """
    try:
        creds = json.loads(json_cred)
        if "accessToken" in creds:
            token = creds['accessToken']
            url = f"https://api.telegram.org/bot{token}/sendMessage"
            if 'chat_id' in params and 'text' in params:
                headers = {"Content-Type":"application/json"}
                async with aiohttp.ClientSession() as session:
                    async with session.post(url, headers=headers, json=params) as response:
                        response.raise_for_status()
                        if response.status == 200:
                            return await response.json()
                        raise Exception(
                            f"Status Code: {response.status}. Response: {await response.text()}"
                        )
            else:
                raise Exception('missing required param(s)')
        else:
            raise Exception('missing required credential')

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def telegram_delete_message(json_cred, params, **kwargs):
    """
    Delete Message sent from the bot.

    :param str accessToken:  Access Token for authentication with telegram bot.
    :param dict params: Dictionary containing parameters.

        -  :chat_id: (str, required) - The id of the chat where to send the message. 
        -  :message_id: (str, required) - The message id to be deleted.
        
    Returns:
        message: that the message is deleted.      

    """
    try:
        creds = json.loads(json_cred)
        if "accessToken" in creds:
            token = creds['accessToken']
            url = f"https://api.telegram.org/bot{token}/deleteMessage"
            if 'chat_id' in params and 'message_id' in params:
                headers = {"Content-Type":"application/json"}
                async with aiohttp.ClientSession() as session:
                    async with session.post(url, headers=headers, json=params) as response:
                        response.raise_for_status()
                        if response.status == 200:
                            return {"message": "message deleted"}
                        raise Exception(
                            f"Status Code: {response.status}. Response: {await response.text()}"
                        )
            else:
                raise Exception('missing required param(s)')
        else:
            raise Exception('missing required credential')

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def telegram_send_file(json_cred, params, **kwargs):
    """
    Send File to user from the bot.

    :param str accessToken:  Access Token for authentication with telegram bot.
    :param dict params: Dictionary containing parameters.

        -  :chat_id: (str, required) - The id of the chat where to send the file. 
        -  :document: (str, required) - The file to be sent.
        -  :disable_notification: (bool, optional) - To send the file silently or not. 
        -  :protect_content: (bool, optional) - To protect the contents of the sent file from forwarding and saving.  

    Returns:
        Dict: Informations about the file sent.      

    """
    try:
        creds = json.loads(json_cred)  
        if "accessToken" in creds:
            token = creds['accessToken']        
            if 'chat_id' in params and 'document' in params:
                url = f"https://api.telegram.org/bot{token}/sendDocument"

                file_name = params["document"]

                # file_path = f"/app/robotfiles/UbilityLibraries/temp/{file_name}"

                # # Check if the file exists
                # if not os.path.exists(file_path):
                #     raise Exception("File not found")
                # Create FormData and disable field quoting to preserve special characters in filenames
                data = aiohttp.FormData(quote_fields=False)
                
                # Add all parameters as form fields
                for key, value in params.items():
                    if key != 'document' and value is not None:
                        data.add_field(key, str(value))

                if kwargs:
                        # Extra conv_id & dialogue_id
                        dialogue_id = kwargs.get("dialogue_id")
                        conv_id = kwargs.get("conv_id")

                content_data = get_file_data(dialogue_id,conv_id,file_name)
                if "Error" in content_data:
                    raise Exception(f"Failed to retrieve file content: {content_data['Error']}")
                # Extract and decode the file content from hex to bytes
                file_to_send = bytes.fromhex(content_data["file_content"])
                
                # Add the file with the specified filename
                data.add_field('document', file_to_send, filename=file_name)

                async with aiohttp.ClientSession() as session:
                    async with session.post(url, data=data) as response:
                        response.raise_for_status()
                        if response.status == 200:
                            return await response.json()
                        raise Exception(
                            f"Status Code: {response.status}. Response: {await response.text()}"
                        )
            else:
                raise Exception('missing required param(s)')
        else:
            raise Exception('missing required credential')

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def telegram_get_file(json_cred, params, **kwargs):
    """
    Retrieve file sent from the bot.

    :param str accessToken:  Access Token for authentication with telegram bot.
    :param dict params: Dictionary containing parameters.

        -  :file_id: (str, required) - The id of the file to be retrieved. 
        
    Returns:
        Dict: Informations about the file.      

    """
    try:
        creds = json.loads(json_cred)
        if "accessToken" in creds:
            token = creds['accessToken']
            get_url = f"https://api.telegram.org/bot{token}/getFile"
            if 'file_id' in params:
                file_id = params['file_id']
                param = {"file_id": file_id}
                param = normalize_params(param)
                async with aiohttp.ClientSession() as session:
                    async with session.get(get_url, params=param) as response:
                        response.raise_for_status()
                        if response.status == 200:
                            js_res = await response.json()
                        else:
                            raise Exception(
                                f"Status Code: {response.status}. Response: {await response.text()}"
                            )
                    result = js_res['result']
                    file_path = result['file_path']
                    url_content = f"https://api.telegram.org/file/bot{token}/{file_path}"
                    async with session.get(url=url_content) as response:
                        response.raise_for_status()
                        if response.status == 200:
                            file_data = await response.read()
                        else:
                            raise Exception(
                                f"Status Code: {response.status}. Response: {await response.text()}"
                            )
                    if kwargs:
                        # Extra conv_id & dialogue_id
                        dialogue_id = kwargs.get("dialogue_id")
                        conv_id = kwargs.get("conv_id")
                        fileData = upload_file(dialogue_id, conv_id, file_data)
                    return fileData
            else:
                raise Exception('missing required param(s)')
        else:
            raise Exception('missing required credential')

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def telegram_get_chat(json_cred, params, **kwargs):
    """
    Retrieve chat sent from the bot.

    :param str accessToken:  Access Token for authentication with telegram bot.
    :param dict params: Dictionary containing parameters.

        -  :chat_id: (str, required) - The id of the chat to be retrieved. 
        
    Returns:
        Dict: Informations about the chat.      

    """
    try:
        creds = json.loads(json_cred)
        if "accessToken" in creds:
            token = creds['accessToken']
            url = f"https://api.telegram.org/bot{token}/getChat"
            if 'chat_id' in params:
                params = normalize_params(params)
                async with aiohttp.ClientSession() as session:
                    async with session.get(url, params=params) as response:
                        response.raise_for_status()
                        if response.status == 200:
                            return await response.json()
                        raise Exception(
                            f"Status Code: {response.status}. Response: {await response.text()}"
                        ) 
            else:
                raise Exception('missing required param(s)')
        else:
            raise Exception('missing required credential')

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}






operations = {
    'Send Message':telegram_send_message,
    'Delete Message':telegram_delete_message,
    'Get Chat':telegram_get_chat,
    'Get File':telegram_get_file,
    'Send File':telegram_send_file
}
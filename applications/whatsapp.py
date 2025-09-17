import aiohttp, json
import sys,os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from applications.functions import get_file_data, upload_file


async def whatsapp_send_message(json_cred, params, **kwargs):
    """
    Send a message to a WhatsApp user via the WhatsApp Business API.

    :param str accessToken: The access token for API authentication.
    :param dict params: Dictionary containing parameters.

    - :phone_number_id: (string,required) - The ID of the sender's phone number.
    - :to: (string,required) - The recipient's phone number in international format.
    - :type: (string,required) - The type of message being sent (e.g., "text", "image", "location").

    - Additional keys depending on `type`:

        - For `type="location"`:

            - :location: (optional): A dictionary containing location details, required if `type` is "location". The structure is as follows:

                - :latitude: (string,required) - Location latitude in decimal degrees.
                - :longitude: (string,required) - Location longitude in decimal degrees.
                - :name: (string,optional) - Location name.
                - :address: (string,optional) - Location address.

        - For `type="image"`:

            - :image: (optional): A dictionary containing image details, required if `type` is "image". The structure is as follows:

                - :id: (str, optional) - ID of the uploaded image
                - :caption: (str, optional) - Caption for the image.
                - :link: (str, optional) - URL of the image (used if `id` is not provided).

        - For `type="audio"`:

            - :audio: (optional): A dictionary containing audio details, required if `type` is "audio". The structure is as follows:

                - :id: (str, optional) - ID of the uploaded audio (used if `link` is not provided).
                - :link: (str, optional) - URL of the audio (used if `id` is not provided).

        - For `type="video"`:

            - :video: (optional): A dictionary containing video details, required if `type` is "video". The structure is as follows:

                - :id: (str, optional) - ID of the uploaded video (used if `link` is not provided).
                - :caption: (str, optional) - Caption for the video.
                - :link: (str, optional) - URL of the video (used if `id` is not provided).

        - For `type="document"`:

            - :document: (optional): A dictionary containing document details, required if `type` is "document". The structure is as follows:

                - :id: (str, optional) - ID of the uploaded document (used if `link` is not provided).
                - :filename: (str, optional) - Document filename, with extension. The WhatsApp client will use an appropriate file type icon based on the extension.
                - :caption: (str, optional) - Document caption text.
                - :link: (str, optional) - URL of the document (used if `id` is not provided).

        - For `type="contacts"`:

            :contacts: (optional): A dictionary containing contacts details, required if `type` is "contacts". The structure is as follows:
                
            - :addresses: (list, optional) - A list of address objects associated with the contact.
                
            :street: (str, optional) - Street address of the contact.
            :city: (str, optional) - City where the contact resides.
            :state: (str, optional) - Two-letter state code.
            :zip: (str, optional) - Postal or ZIP code.
            :country: (str, optional) - Country name.
            :country_code: (str, optional) - ISO two-letter country code.
            :type: (str, optional) - Type of address, such as home or work.

            - :birthday: (str, optional) - Contact's birthday in YYYY-MM-DD format.
            - :emails: (list, optional) - A list of email objects associated with the contact.

                - :email: (str, optional) - Email address of the contact.
                - :type: (str, optional) - Type of email, such as personal or work.

            - :name: (dict, optional) - The contact’s name, including the following subfields:

            :formatted_name: (str, required) - Contact's formatted name. This will appear in the message alongside the profile arrow button.
            :first_name: (str, optional) - Contact's first name.
            :last_name: (str, optional) - Contact's last name.
            :middle_name: (str, optional) - Contact's middle name.
            :suffix: (str, optional) - Suffix for the contact's name, if applicable
            :prefix: (str, optional) - Prefix for the contact's name, such as Mr., Ms., Dr., etc.

            - :org: (dict, optional) - The organization or company the contact is associated with.

                - :company: (str, optional) - Name of the company where the contact works.
                - :department: (str, optional) - Department within the company.
                - :title: (str, optional) - Contact's job title.

            - :phones: (list, optional) - A list of phone objects associated with the contact.
                
                - :phone: (str, optional) - WhatsApp user phone number.
                - :type: (str, optional) - Type of phone number. For example, cell, mobile, main, iPhone, home, work, etc.
                - :wa_id: (str, optional) - WhatsApp user phone number.

            - :urls: (list, optional) - A list of phone objects associated with the contact.

                - :url: (str, optional) - Website URL associated with the contact or their company.
                - :type: (str, optional) - Type of website. For example, company, work, personal, Facebook Page, Instagram, etc.
                
        - For `type="text"`:

            - :text: (dict,optional): A dictionary containing text details, required if `type` is "text". The structure is as follows:

                - :preview_url: (str, optional) - Set to true to have the WhatsApp client attempt to render a link preview of any URL in the body text string.
                - :body: (str, required) - Message body text. Supports URLs. Maximum 4096 characters.
                                          
    Returns:
        Dict: A dictionary containing the API response .

    """
    try:
        creds = json.loads(json_cred)
        if "accessToken" in creds and "phone_number_id" in params and "to" in params and "type" in params:
            accessToken = creds["accessToken"]
            phone_number_id = params["phone_number_id"]
            to = params["to"]
            message_type = params["type"]
            url = f"https://graph.facebook.com/v21.0/{phone_number_id}/messages"
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json",
            }
            data = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": to,
                "type": message_type,
            }
            for key, value in params.items():
                if value:
                    data[key] = value
                    
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=data) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing Input Data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def whatsapp_send_template_message(json_cred, params, **kwargs):
    """
    Sends a WhatsApp template message

    :param str accessToken: The access token for API authentication.
    :param dict params: Dictionary containing parameters.

    - :phone_number_id: (string,required) - The ID of the sender's phone number.
    - :to: (string,required) - The recipient's phone number in international format.
    - :template: (dict, required) - The template message structure.

        - :name: (string, required) - The name of the template. This should match the name of a template that has been approved by WhatsApp.
        - :template_value: (string, required) - Template info in "template_name::language" format.
        - :components: (list, optional) - A list of components that make up the template. This can include various parts of the message:

            - :body: (string,optional) - The main content of the message, usually containing placeholders for parameters (either positional or named).
            - :parameters: (list,optional) -  The custom parameter name used in your template. Must be lowercase letters and underscores only.
                
                - :type: Parameter type. Always the value "text"
                - :text: The actual text that will replace the named parameter in your template.

    Returns:
        Dict: A dictionary containing the API response .

    """
    try:
        creds = json.loads(json_cred)
        if "accessToken" in creds and "phone_number_id" in params and "to" in params and "template_value" in params:
            accessToken = creds["accessToken"]
            phone_number_id = params["phone_number_id"]
            to = params["to"]
            template_value = params["template_value"]
            template_name, language = template_value.split("::")
            url = f"https://graph.facebook.com/v21.0/{phone_number_id}/messages"
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json",
            }
            data = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": to,
                "type": "template",
                "template": {
                    "name": template_name,
                    "language": {"code": language},
                },
            }
            for key, value in params.items():
                if value:
                    data[key] = value
            
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=data) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing Input Data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def whatsapp_get_media(json_cred, params, **kwargs):
    """
    Returns the metadata for the media object.

    :creds: JSON Credentials for authenticating with facebook graph API.
    :params: Dictionary containing parameters.

    - :media_id: (str, Required) - ID of the media object to retrieve metadata for.

    Returns:
        Dict: a Dictionary containing the specified Media's metadata

    """
    try:
        creds = json.loads(json_cred)
        required_params=["media_id"]
        if all(param in params for param in required_params) and "accessToken" in creds:
            accessToken = creds["accessToken"]
            media_id = params["media_id"]
            url = f"https://graph.facebook.com/v21.0/{media_id}"
            headers = {
                "Authorization": f"Bearer {accessToken}",
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing Input Data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    

async def whatsapp_download_media(json_cred, params, **kwargs):
    """
    Downloads the media object.

    :creds: JSON Credentials for authenticating with facebook graph API.
    :params: Dictionary containing parameters.

    - :media_url: (str, Required) - URL of the media object to download. can be obtained from the metadata of the media object.

    Returns:
        Dict: a Dictionary representing the media

    """
    try:
        creds = json.loads(json_cred)
        required_params=["media_url"]
        if all(param in params for param in required_params) and "accessToken" in creds:
            accessToken = creds["accessToken"]
            media_url = params["media_url"]
            headers = {
                "Authorization": f"Bearer {accessToken}",
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url=media_url, headers=headers) as response:
                    if response.status == 200:
                        body = await response.read()
                        if kwargs:
                            # Extra conv_id & dialogue_id
                            dialogue_id = kwargs.get("dialogue_id")
                            conv_id = kwargs.get("conv_id")
                            fileData = upload_file(dialogue_id, conv_id, body)
                        return fileData
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing Input Data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
    
async def whatsapp_download_trigger_media(json_cred, params, **kwargs):
    """
    Downloads the media object from the trigger if the media_id is valid.

    :creds: JSON Credentials for authenticating with facebook graph API.
    :params: Dictionary containing parameters.

    - :media_id: (str, Required) - ID of the media object to download. can be obtained from the metadata of the media object or the trigger.

    Returns:
        Dict: a Dictionary containing the specified Media's metadata

    """
    try:
        required_params=["media_id"]
        if all(param in params for param in required_params):
            media_id = params["media_id"]
            if media_id:
                media_metadata = whatsapp_get_media(json_cred, {"media_id": media_id}, **kwargs)
                media_url = media_metadata.get("url", None)
                if media_url:
                    # Download the media
                    download_response = whatsapp_download_media(json_cred, {"media_url": media_url}, **kwargs)
                    return download_response
                elif "Error" in media_metadata:
                    return media_metadata
                else:
                    raise Exception("Media URL or MIME type not found in metadata.")
            else:
                raise Exception("Media ID has no value.")
        else:
            raise Exception("Missing Input Data")
    except Exception as err:
        return {"Error": str(err)}
    

async def whatsapp_upload_media(json_cred, params, **kwargs):
    """
    Uploads a media object.

    :creds: JSON Credentials for authenticating with facebook graph API.
    :params: Dictionary containing parameters.

    - :phone_number_id: (str, Required) - The ID of the uploader's phone number.
    - :media_type: (str, Required) - The mime type of media to upload. Supported values can be found in this `Page <https://www.geeksforgeeks.org/http-headers-content-type/>`_.
    - :url: (str) - The URL to download the media from. Required if `content` is not provided.
    - :content: (str) - The filename of the file to upload. Required if `url` is not provided.

    Returns:
        Dict: a Dictionary containing the Uploaded Media's ID

    """
    try:
        creds = json.loads(json_cred)
        required_params=["phone_number_id", "media_type"]
        required_or_params=["url","content"]
        if all(param in params for param in required_params) and any(param in params for param in required_or_params) and "accessToken" in creds:
            accessToken = creds["accessToken"]
            media_type = params["media_type"]
            phone_number_id = params["phone_number_id"]
            content = params.get("content")
            file_url = params.get("url")
            body = None
            url = f"https://graph.facebook.com/v21.0/{phone_number_id}/media"
            headers = {
                "Authorization": f"Bearer {accessToken}",
            }
            async with aiohttp.ClientSession() as session:
                if content:
                    if kwargs:
                        # Extra conv_id & dialogue_id
                        dialogue_id = kwargs.get("dialogue_id")
                        conv_id = kwargs.get("conv_id")

                    # Retrieve file content data
                    contentData = get_file_data(dialogue_id,conv_id,content)
                    if "Error" in contentData:
                        raise Exception(f"Failed to retrieve file content: {contentData['Error']}")
                    # Extract and decode the file content from hex to bytes
                    body = bytes.fromhex(contentData["file_content"])
                    file_name=contentData["file_name"]
                elif file_url:
                    try:
                        async with session.get(file_url) as url_response:
                            url_response.raise_for_status()
                            body = await url_response.read()
                            file_name = file_url.split("/")[-1]
                    except aiohttp.ClientError as e:
                        raise Exception(f"Error downloading file from URL: {e}")
                    except Exception as err:
                        raise Exception(f"Error downloading file from URL: {e}")
                    if not body:
                        raise Exception("File content is empty.")
                else:
                    raise Exception("Missing Input Data")
                data = aiohttp.FormData(quote_fields=False)
                data.add_field('file', body, filename=file_name, content_type=media_type)
                data.add_field("messaging_product", "whatsapp")
                data.add_field("type", media_type)
                async with session.post(url, headers=headers, data=data) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing Input Data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    



operations = {
    'Send Message':whatsapp_send_message,
    'Send Template Message':whatsapp_send_template_message,
    'Get Media':whatsapp_get_media,
    'Download Media':whatsapp_download_media,
    'Download Trigger Media':whatsapp_download_trigger_media,
    'Upload Media':whatsapp_upload_media
}
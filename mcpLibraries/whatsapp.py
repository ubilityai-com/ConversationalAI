import requests, json, base64, os ,sys, mimetypes


# robot_server = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
# sys.path.append(robot_server)
# from UbilityLibraries.regular_connectors.functions import SERVER_URL, create_token as generate_auth_token



def whatsapp_send_message(cred,params):
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
        creds = json.loads(cred)
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
            response = requests.post(url, headers=headers, json=data)
            if response.status_code == 200:
                return response.json()
            else:
                raise Exception(response.json())
        else:
            raise Exception("Missing Input Data")
    except Exception as error:
        raise Exception(error)

def whatsapp_send_template_message(cred,params):
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
        creds = json.loads(cred)
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
            response = requests.post(url, headers=headers, json=data)
            if response.status_code == 200:
                return response.json()
            else:
                raise Exception(response.json())
        else:
            raise Exception("Missing Input Data")
    except Exception as error:
        raise Exception(error)


def whatsapp_get_media(cred, params):
    """
    Returns the metadata for the media object.

    :creds: JSON Credentials for authenticating with facebook graph API.
    :params: Dictionary containing parameters.

    - :media_id: (str, Required) - ID of the media object to retrieve metadata for.

    Returns:
        Dict: a Dictionary containing the specified Media's metadata

    """
    try:
        creds = json.loads(cred)
        required_params=["media_id"]
        if all(param in params for param in required_params) and "accessToken" in creds:
            accessToken = creds["accessToken"]
            media_id = params["media_id"]
            url = f"https://graph.facebook.com/v21.0/{media_id}"
            headers = {
                "Authorization": f"Bearer {accessToken}",
            }
            response = requests.get(
                url=url, headers=headers)
            if response.status_code == 200:
                return response.json()
            else:
                raise Exception(
                    f"Status code: {response.status_code}. Response: {response.text}")
        else:
            raise Exception("Missing Input Data")
    except Exception as error:
        raise Exception(error)
    

# def whatsapp_download_media(cred, params):
#     """
#     Downloads the media object.

#     :creds: JSON Credentials for authenticating with facebook graph API.
#     :params: Dictionary containing parameters.

#     - :media_url: (str, Required) - URL of the media object to download. can be obtained from the metadata of the media object.
#     - :media_type: (str, Required) - the file extension of the media to download. e.g.: ("jpg", "png", "mp4", etc.)
#     - :flow_token: (str, Required) - The flow token of the flow to upload the media to.

#     Returns:
#         Dict: a Dictionary representing the media

#     """
#     try:
#         creds = json.loads(cred)
#         required_params=["media_url", "media_type", "flow_token"]
#         if all(param in params for param in required_params) and "accessToken" in creds:
#             accessToken = creds["accessToken"]
#             media_url = params["media_url"]
#             media_type = params["media_type"]
#             flow_token = params["flow_token"]
#             headers = {
#                 "Authorization": f"Bearer {accessToken}",
#             }
#             response = requests.get(
#                 url=media_url, headers=headers)
#             if response.status_code == 200:
#                 body = response.content
#                 # Size of the file
#                 file_size_bytes = len(body)
#                 # Get the file extension from the media type
#                 file_extension = media_type


#                 access_token = generate_auth_token(1,"")
#                 # Prepare headers for Flask endpoint
#                 flask_headers = {
#                     "File-Extension": file_extension,
#                     "Content-Type": "application/octet-stream",
#                     "Authorization": f"Bearer {access_token}",
#                     "File-Size":str(file_size_bytes)
#                 }

#                 # Forward binary data to Flask endpoint
#                 response = requests.post(
#                     f'{SERVER_URL}/api/upload_file/{flow_token}',
#                     headers=flask_headers,
#                     data=body
#                 )

#                 response.raise_for_status()
#                 return response.json()
#             else:
#                 raise Exception(
#                     f"Status code: {response.status_code}. Response: {response.text}")
#         else:
#             raise Exception("Missing Input Data")
#     except Exception as error:
#         raise Exception(error)
    
    
# def whatsapp_download_trigger_media(cred, params):
#     """
#     Downloads the media object from the trigger if the media_id is valid.

#     :creds: JSON Credentials for authenticating with facebook graph API.
#     :params: Dictionary containing parameters.

#     - :media_id: (str, Required) - ID of the media object to download. can be obtained from the metadata of the media object or the trigger.
#     - :flow_token: (str, Required) - The flow token of the flow to upload the media to.

#     Returns:
#         Dict: a Dictionary containing the specified Media's metadata

#     """
#     try:
#         required_params=["media_id", "flow_token"]
#         if all(param in params for param in required_params):
#             media_id = params["media_id"]
#             flow_token = params["flow_token"]
#             if media_id:
#                 media_metadata = whatsapp_get_media(cred, {"media_id": media_id})
#                 media_url = media_metadata.get("url", None)
#                 media_mimetype = media_metadata.get("mime_type", None)
#                 if media_url and media_mimetype:
#                     file_extension = mimetypes.guess_extension(media_mimetype)[1:]
#                     # Download the media
#                     download_response = whatsapp_download_media(cred, {"media_url": media_url, "media_type": file_extension, "flow_token": flow_token})
#                     return download_response
#                 else:
#                     raise Exception("Media URL or MIME type not found in metadata.")
#             else:
#                 raise Exception("Media ID has no value.")
#         else:
#             raise Exception("Missing Input Data")
#     except Exception as error:
#         raise Exception(error)
    

def whatsapp_upload_media(cred, params):
    """
    Uploads a media object.

    :creds: JSON Credentials for authenticating with facebook graph API.
    :params: Dictionary containing parameters.

    - :phone_number_id: (str, Required) - The ID of the uploader's phone number.
    - :media_type: (str, Required) - The mime type of media to upload. Supported values can be found in this `Page <https://www.geeksforgeeks.org/http-headers-content-type/>`_.
    - :file_name: (str, Required) - The name of the file to upload. This should include the file extension.
    - :url: (str) - The URL to download the media from. Required if `content` is not provided.
    - :content: (str) - the base64 encoded content of the media. or the filename of the file to upload. Required if `url` is not provided.

    Returns:
        Dict: a Dictionary containing the Uploaded Media's ID

    """
    try:
        creds = json.loads(cred)
        required_params=["phone_number_id", "media_type", "file_name"]
        required_or_params=["url","content"]
        if all(param in params for param in required_params) and any(param in params for param in required_or_params) and "accessToken" in creds:
            accessToken = creds["accessToken"]
            file_name = params["file_name"]
            media_type = params["media_type"]
            phone_number_id = params["phone_number_id"]
            content = params.get("content")
            file_url = params.get("url")
            body = None
            url = f"https://graph.facebook.com/v21.0/{phone_number_id}/media"
            headers = {
                "Authorization": f"Bearer {accessToken}",
            }
            if content:
                if content[:2] == "<<" and content[-2:] == ">>":
                    file_name = content[2:-2]
                    file_path = f"/app/robotfiles/UbilityLibraries/temp/{file_name}"

                    # Check if the file exists
                    if not os.path.exists(file_path):
                        raise Exception("File not found")
                    
                    
                    with open(file_path, "rb") as file:
                        files = {
                            "file": (file_name, file, media_type)
                        }
                        data = {
                            "messaging_product": "whatsapp",
                            "type": media_type
                        }
                        response = requests.post(
                            url=url, headers=headers, files=files, data=data
                        )
                        if response.status_code == 200:
                            return response.json()
                        else:
                            raise Exception(
                                f"Status code: {response.status_code}. Response: {response.text}"
                            )
                else:
                    body = base64.b64decode(content)
            elif file_url:
                try:
                    url_response = requests.get(file_url)
                    url_response.raise_for_status()  
                    body = url_response.content
                except requests.RequestException as e:
                    raise Exception(f"Error downloading file from URL: {e}")
                except Exception as e:
                    raise Exception(f"error: {e}")
                if not body:
                    raise Exception("File content is empty.")
            else:
                raise Exception("Missing Input Data")
            files = {
                "file": (file_name, body, media_type)
            }
            data = {
                "messaging_product": "whatsapp",
                "type": media_type
            }
            response = requests.post(
                url=url, headers=headers, files=files, data=data
            )
            if response.status_code == 200:
                return response.json()
            else:
                raise Exception(
                    f"Status code: {response.status_code}. Response: {response.text}"
                )
        else:
            raise Exception("Missing Input Data")
    except Exception as error:
        raise Exception(error)
    

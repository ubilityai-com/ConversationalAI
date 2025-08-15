from googleapiclient.discovery import build
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import requests
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
import json,mimetypes,os,sys
import logging
import sys,os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from applications.functions import get_file_data,upload_file


def create_service(access_token):
    try:
        API_SERVICE_NAME = "gmail"
        API_VERSION = "v1"
        creds_data = json.loads(access_token)
        creds = Credentials.from_authorized_user_info(creds_data)
        if creds and creds.expired and creds.refresh_token:
            # in this case the token is expired and we need to get a new access token
            creds.refresh(Request())
        service = build(
            API_SERVICE_NAME,API_VERSION, credentials=creds, static_discovery=False
        )

        logging.warning(API_SERVICE_NAME,API_VERSION, 'service created successfully')
        return service
    except Exception as e:
        logging.warning(f'Failed to create service instance for {e}')
        raise Exception(f'Failed to create service instance {e}')


def create_token(cred):
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


################################################# Messages #########################################


def gmail_addLabel(creds,request,**kwargs):
    """
    Adds a label to a specific Gmail message.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It must include:
        
            - **message_id** (str, required): The ID of the message to which the label should be added.
            - **label_id** (str, required): The ID of the label to be added.
            - **label_name** (str, optional): The name of the label to be added.

    Returns:
        dict: The response from the Gmail API after adding the label to the message.

        """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        message_id = request.get("message_id", "")
        label_id = request.get("label_id", "")
        label_name = request.get("label_name", "")

        if not (label_id or label_name):
            raise Exception("Missing input data")

        # Get the label ID if label_name is provided
        if label_name:
            labels = service.users().labels().list(userId="me").execute()
            for label in labels["labels"]:
                if label["name"] == label_name:
                    label_id = label["id"]
                    break

        # Add the label to the message
        if label_id:
            return (
                service.users()
                .messages()
                .modify(userId="me", id=message_id, body={"addLabelIds": [label_id]})
                .execute()
            )

    except Exception as e:
        raise Exception(e)


def gmail_deleteMessage(creds, request,**kwargs):
    """
    Deletes a specific Gmail message.
    
    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It must include:
        
            - **message_id** (str, required): The ID of the message to be deleted.

    Returns:
        dict: A dictionary with a result message containing the deleted message ID.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        message_id = request.get("message_id", "")
        if not message_id:
            raise Exception("Missing input data")
        service.users().messages().delete(
            userId="me", id=request["message_id"]
        ).execute()
        return {"Result": f"Deleted Message ID: {message_id}"}
    except Exception as e:
        raise Exception(e)


def gmail_getMessage(creds, request,**kwargs):
    """
    Retrieves a Gmail message or a list of Gmail messages based on the provided scope.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It may include:
        
            - **scope** (str, required): The scope of the request, either "single" or "all" (default is "single").
            - **message_id** (str, required if scope is "single"): The ID of the message to retrieve.
            - **labelIds** (list, optional): List of label IDs to filter the messages.
            - **maxResults** (int, optional, default=100): Maximum number of messages to retrieve.
            - **includeSpamTrash** (bool, optional, default=False): Whether to include messages from Spam and Trash folders.

    Returns:
        dict: The message(s) retrieved from Gmail API. If scope is "single", returns a single message. If scope is "all", returns a list of messages.

   """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        scope = request.get("scope", "single")

        if scope == "single":
            message_id = request.get("message_id", "")
            if not message_id:
                raise Exception("Missing input data")
            message = (
                service.users().messages().get(userId="me", id=message_id).execute()
            )
            return message
        elif scope == "all":
            label_ids = request.get("labelIds", [])
            max_results = request.get("maxResults", 100)
            spamTrash = request.get("includeSpamTrash", False)
            messages = (
                service.users()
                .messages()
                .list(
                    userId="me",
                    labelIds=label_ids,
                    maxResults=max_results,
                    includeSpamTrash=spamTrash,
                )
                .execute()
            )
            return messages

        else:
            raise Exception("Invalid scope specified")

    except Exception as e:
        raise Exception(e)


def gmail_markAsRead(creds, request, **kwargs):
    """
     Marks a specific Gmail message as read by removing the "UNREAD" label.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It must include:
        
            - **message_id** (str, required): The ID of the message to be marked as read.

    Returns:
        dict: The response from the Gmail API after modifying the message.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        message_id = request.get("message_id", "")
        if not message_id:
            raise Exception("Missing input data")

        body = {"removeLabelIds": ["UNREAD"]}
        return (
            service.users()
            .messages()
            .modify(userId="me", id=message_id, body=body)
            .execute()
        )
    except Exception as e:
        raise Exception(e)


def gmail_markAsUnread(creds,request, **kwargs):
    """
    Marks a specific Gmail message as unread by adding the "UNREAD" label.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It must include:
        
            - **message_id** (str, required): The ID of the message to be marked as unread.

    Returns:
        dict: The response from the Gmail API after modifying the message.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        message_id = request.get("message_id", "")
        if not message_id:
            raise Exception("Missing input data")

        body = {"addLabelIds": ["UNREAD"]}
        return (
            service.users()
            .messages()
            .modify(userId="me", id=request["message_id"], body=body)
            .execute()
        )
    except Exception as e:
        raise Exception(e)


def gmail_removeLabel(creds, request, **kwargs):
    """
     Removes a label from a specific Gmail message.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It may include:
        
            - **message_id** (str, required): The ID of the message to modify.
            - **label_id** (str, optional): The ID of the label to remove.it becom required if the label_name is not provided.
            - **label_name** (str, optional): The ID of the label to remove.

    Returns:
        dict: The response from the Gmail API after removing the label from the message.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        message_id = request.get("message_id", "")
        label_id = request.get("label_id", "")
        label_name = request.get("label_name", "")

        if not (label_id or label_name):
            raise Exception("Missing input data")

        # Get the label ID if label_name is provided
        if label_name:
            labels = service.users().labels().list(userId="me").execute()
            for label in labels["labels"]:
                if label["name"] == label_name:
                    label_id = label["id"]
                    break

        # Remove the label from the message
        if label_id:
            return (
                service.users()
                .messages()
                .modify(userId="me", id=message_id, body={"removeLabelIds": [label_id]})
                .execute()
            )

    except Exception as e:
        raise Exception(e)


def gmail_replyToMessage(creds, request, **kwargs):
    
    """
     Replies to a specific Gmail message with an optional message body, recipients, and attachments.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the reply. It may include:
        
            
            - **in_reply_to** (str, required): The ID of the message being replied to.
            - **type** (str, optional, default='plain'): The type of email content, either 'plain' or 'html'.
            - **cc_recipients** (str, optional): A comma-separated list of CC recipients.
            - **bcc_recipients** (str, optional): A comma-separated list of BCC recipients.
            - **message** (str, required): The body of the message being sent as a reply.
            - **attachments_list** (list, optional): A list of attachments, each of which must contain either a URL or base64 content.

    Returns:
        dict: The response from the Gmail API after sending the reply.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        to = ""
        subject = ""
        # id of the message we're replying to
        in_reply_to = request.get("in_reply_to", None)
        email_type = request.get("type", "plain")
        cc = request.get("cc_recipients", None)
        bcc = request.get("bcc_recipients", None)
        message = request.get("message", None)  # this is the message body
        attachments = request.get("attachments_list", None)
        # Test required fields
        if "in_reply_to" not in request and "message" not in request:
            raise Exception("Missing input data")

        service = create_service(access_token)
        # find the destination for the reply using in_reply_to
        original_message = (
            service.users().messages().get(userId="me", id=in_reply_to).execute()
        )
        thread_id = original_message.get("threadId", None)
        for header in original_message["payload"]["headers"]:
            if header["name"] == "From":
                to += header["value"]
            if header["name"] == "subject":
                subject = header["value"]

        mimeMessage = MIMEMultipart()
        # Fill mimeMessage fields
        mimeMessage["In-Reply-To"] = in_reply_to
        mimeMessage["References"] = in_reply_to
        mimeMessage["subject"] = "Reply :" + str(subject)
        mimeMessage["to"] = to
        mimeMessage["cc"] = cc
        mimeMessage["bcc"] = bcc
        email_content = MIMEText(message, email_type)

        # Add body content
        mimeMessage.attach(email_content)

        if attachments:
            for attach in attachments:
                if attach["type"] == "URL":
                    response = requests.get(attach["url"])
                    if response.status_code == 200:
                        content = response.content
                        # Extract the file name from the URL or provide a default name
                        filename = attach["name"]
                        # Create an attachment
                        attachment = MIMEBase("application", "octet-stream")
                        attachment.set_payload(content)
                        encoders.encode_base64(attachment)
                        attachment.add_header(
                            "Content-Disposition", "attachment", filename=filename
                        )
                        mimeMessage.attach(attachment)
                else:  # type = ByteString

                    if kwargs:
                        # Extra conv_id & dialogue_id
                        dialogue_id = kwargs.get("dialogue_id")
                        conv_id = kwargs.get("conv_id")

                    contentData = get_file_data(dialogue_id,conv_id,attach["content"])
                    if "Error" in contentData:
                        raise Exception(f"Failed to retrieve file content: {contentData['Error']}")
                    
                    # Extract and decode the file content from hex to bytes
                    data = bytes.fromhex(contentData["file_content"])  
                    payload = MIMEBase("application", "octet-stream")
                    payload.set_payload(data)
                    encoders.encode_base64(payload)
                    payload.add_header(
                        "Content-Disposition", "attachment", filename=attach["name"]
                    )
                    mimeMessage.attach(payload)

        raw_string = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()
        return (
            service.users()
            .messages()
            .send(userId="me", body={"raw": raw_string, "threadId": thread_id})
            .execute()
        )
    except Exception as e:
        raise Exception(e)


def gmail_sendMessage(creds, request, **kwargs):
     
    """
    Sends a message via Gmail API with optional attachments, CC, BCC, and subject.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the message to be sent. It may include:
        
            - **to** (str, required): The recipient's email address.
            - **body** (str, required): The body of the email message.
            - **cc** (str,optional): A comma-separated string or list of CC email addresses.
            - **bcc** (str, optional): A comma-separated string or list of BCC email addresses.
            - **subject** (str, optional): The subject of the email message.
            - **attachments_list** (list, optional): A list of attachments, each of which must contain either a URL or Upload File.
            - **type** (str, optional, default='plain'): The type of email content, either 'plain' or 'html'.

    Returns:
        dict: The response from the Gmail API after sending the message.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        to = request.get("to")
        body = request.get("body")
        cc = request.get("cc")
        bcc = request.get("bcc")
        subject = request.get("subject")
        attachments = request.get("attachments_list")
        type = request.get("type", "plain")
        # Test required fields
        if not to or not body:
            raise Exception("Missing input data")        

        service = create_service(access_token)
        mimeMessage = MIMEMultipart()

        # Fill mimeMessage fields
        if to:
            mimeMessage["to"] = to
        if cc:
            mimeMessage["cc"] = cc
        if bcc:
            mimeMessage["bcc"] = bcc
        if subject:
            mimeMessage["subject"] = subject

        email_content = MIMEText(body, type)
        # Add body content
        mimeMessage.attach(email_content)

        if attachments:
            for attach in attachments:
                if attach["type"] == "URL":
                    response = requests.get(attach["url"])
                    if response.status_code == 200:
                        content = response.content
                        # Extract the file name from the URL or provide a default name
                        filename = attach["name"]
                        # Create an attachment
                        attachment = MIMEBase("application", "octet-stream")
                        attachment.set_payload(content)
                        encoders.encode_base64(attachment)
                        attachment.add_header(
                            "Content-Disposition", "attachment", filename=filename
                        )
                        mimeMessage.attach(attachment)
                elif attach["type"] == "File":
                    if kwargs:
                        # Extra conv_id & dialogue_id
                        dialogue_id = kwargs.get("dialogue_id")
                        conv_id = kwargs.get("conv_id")

                    contentData = get_file_data(dialogue_id,conv_id,attach["content"])
                    if "Error" in contentData:
                        raise Exception(f"Failed to retrieve file content: {contentData['Error']}")
                    
                    # Extract and decode the file content from hex to bytes
                    data = bytes.fromhex(contentData["file_content"])
                    payload = MIMEBase("application", "octet-stream")
                    payload.set_payload(data)
                    encoders.encode_base64(payload)
                    payload.add_header(
                        "Content-Disposition", "attachment", filename=attach["name"]
                    )
                    mimeMessage.attach(payload)

        raw_string = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()

        return (
            service.users()
            .messages()
            .send(userId="me", body={"raw": raw_string})
            .execute()
        )

    except Exception as e:
        raise Exception(e)


# def gmail_check_and_download_attachments(creds, , request):
#     """
#         Checks if there are any attachments in the Gmail message, downloads them, 
#     and uploads them to the provided server URL.

#     Parameters:
#         creds (str): JSON-encoded string containing OAuth credentials.
#         params (dict): A dictionary containing the necessary parameters, 
#             including:
#             - message_id (str): The ID of the message.
#             - flow_token (str): The flow token for uploading the file.

#     Returns:
#         None
#     """
#     try:
#         cred = json.loads(creds)
#         access_token = create_token(cred)
#         service = create_service(access_token)

#         message = service.users().messages().get(userId="me", id=request["message_id"]).execute()
#         parts = message.get("payload", {}).get("parts", [])

#         if not parts:
#             return

#         for part in parts:
#             filename = part.get("filename")
#             body = part.get("body", {})
#             attachment_id = body.get("attachmentId")
#             mime_type = part.get("mimeType", "application/octet-stream")

#             if filename and attachment_id:
#                 attachment = service.users().messages().attachments().get(
#                     userId="me",
#                     messageId=request["message_id"],
#                     id=attachment_id
#                 ).execute()

#                 file_data = base64.urlsafe_b64decode(attachment["data"])
#                 file_size_bytes = len(file_data)
#                 file_extension = mimetypes.guess_extension(mime_type) or ".bin"

#                 with open(filename, 'wb') as f:
#                     f.write(file_data)

#                 access_token = generate_auth_token(1, "")

#                 headers = {
#                     "File-Extension": file_extension.lstrip('.'),
#                     "Content-Type": "application/octet-stream",
#                     "Authorization": f"Bearer {access_token}",
#                     "File-Size": str(file_size_bytes)
#                 }

#                 response = requests.post(
#                     f"{SERVER_URL}/api/upload_file/{request['flow_token']}",
#                     headers=headers,
#                     data=file_data
#                 )
#                 response.raise_for_status()
#                 return response.json()

#     except Exception as e:
#         raise Exception(e)


def gmail_list_message_attachments(creds, request, **kwargs):
    """
    lists the attachments in a Gmail message.

    Parameters:
        creds (str, Required): JSON-encoded string containing OAuth credentials.
        params (dict, Required): A dictionary containing the necessary parameters, 
            including:
            - message_id (str, Required): The ID of the message.

    Returns:
        dict: A dictionary containing the list of attachments in the message.
    """
    try:
        cred = json.loads(creds)
        access_token = create_token(cred)
        service = create_service(access_token)

        message = service.users().messages().get(userId="me", id=request["message_id"]).execute()
        parts = message.get("payload", {}).get("parts", [])
        attachments_list = []

        if parts:
            for part in parts:
                filename = part.get("filename", None)
                body = part.get("body", {})
                attachment_id = body.get("attachmentId", None)

                if filename and attachment_id:
                    attachments_list.append(part)
        
        return {"attachments": attachments_list}

    except Exception as e:
        raise Exception(e)


def gmail_download_attachment(creds, request, **kwargs):
    """
    Downloads an attachment from a Gmail message.

    Parameters:
        creds (str, Required): JSON-encoded string containing OAuth credentials.
        params (dict, Required): A dictionary containing the necessary parameters, 
            including:
            
            - :message_id: (str, Required) - The ID of the message.
            - :attachment_id: (str, Required) - The ID of the attachment.

    Returns:
        file: The downloaded file data.
    """
    try:
        cred = json.loads(creds)
        access_token = create_token(cred)
        service = create_service(access_token)
        message_id = request["message_id"]
        attachment_id = request["attachment_id"]

        
        attachment = service.users().messages().attachments().get(
            userId="me",
            messageId=message_id,
            id=attachment_id
        ).execute()

        file_data = base64.urlsafe_b64decode(attachment["data"])

        #get request to retrieve the file_name from gmail depending on attachment_id 
        message = service.users().messages().get(userId="me", id=message_id).execute()
        parts = message.get("payload", {}).get("parts", [])
        if parts:
            for part in parts:
                
                body = part.get("body", {})
                att_id = body["attachmentId"]
                if attachment_id == att_id:
                    file_name = part["filename"]
                if kwargs:
                    # Extra conv_id & dialogue_id
                    dialogue_id = kwargs.get("dialogue_id")
                    conv_id = kwargs.get("conv_id")

                response = upload_file(dialogue_id,conv_id,file_data,file_name)
        return response

    except Exception as e:
        raise Exception(e)


################################################# Threads #########################################

def gmail_addLabelToThread(creds, request, **kwargs):
    """
    Adds labels to a Gmail thread using the Gmail API.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for adding labels to the thread. It must include:
        
            - **thread_id** (str, required): The ID of the thread to which the label(s) will be added.
            - **label_ids** (str, required): A comma-separated string of label IDs to be added to the thread.

    Returns:
        dict: The response from the Gmail API after modifying the thread with the label(s).
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        thread_id = request.get("thread_id", "")
        ids = request.get("label_ids", None)
        label_ids = [id.strip() for id in ids.split(",")]

        if not (thread_id and label_ids):
            raise Exception("Missing input data")

        return (
            service.users()
            .threads()
            .modify(userId="me", id=thread_id, body={"addLabelIds": label_ids})
            .execute() 
        )

    except Exception as e:
        raise Exception(e)


def gmail_deleteThread(creds, request, **kwargs):
    """
    Deletes a Gmail thread using the Gmail API.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for deleting a Gmail thread. It must include:
        
            - **thread_id** (str, required): The ID of the thread to be deleted.

    Returns:
        dict: A dictionary containing the result of the operation, which includes the deleted thread ID.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        thread_id = request.get("thread_id", "")

        if not thread_id:
            raise Exception("Missing input data")

        service.users().threads().delete(userId="me", id=thread_id).execute()
        return {"Result": f"Deleted Thread ID: {thread_id}"}

    except Exception as e:
        raise Exception(e)


def gmail_getThreads(creds, request, **kwargs):
    """
      Retrieves Gmail threads based on specified filters and parameters.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters to filter and retrieve Gmail threads. It may include:
        
            - **scope** (str, required): The scope of the request, either "all" (all threads) or "single" (single thread).
            - **thread_id** (str, optional): The ID of the thread to retrieve (only required if `scope` is "single").
            - **limit** (int, optional): The maximum number of threads to retrieve (default is 100).
            - **include_spam_trash** (bool, optional): If True, includes spam and trash threads (default is False).
            - **label_ids** (str, optional): A comma-separated list of label IDs to filter threads by.
            - **search** (str, optional): A search query to filter threads by.
            - **read_status** (str, optional): Filter by read status. Possible values: "all", "read", "unread".
            - **received_after** (str, optional): A date to filter threads received after .
            - **received_before** (str, optional): A date to filter threads received before.

    Returns:
        dict: A dictionary containing the retrieved threads. If `scope` is "all", it returns all threads matching the filters. 
              If `scope` is "single", it returns the single thread specified by `thread_id`.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        scope = request.get("scope", "")
        thread_id = request.get("thread_id", "")
        limit = request.get("limit", 100)

        if scope == "all":
            query = ""
            include_spam_trash = request.get("include_spam_trash", False)
            if include_spam_trash:
                query += "in:spam OR in:trash "

            label_ids = request.get("label_ids", "")
            if label_ids:
                query += "label:" + label_ids + " "

            search = request.get("search", "")
            if search:
                query += search + " "

            read_status = request.get("read_status")
            if read_status:
                if read_status == "all":
                    query += "is:read OR is:unread "
                elif read_status == "unread":
                    query += "is:unread "
                elif read_status == "read":
                    query += "is:read "

            received_after = request.get("received_after", "")
            if received_after:
                query += "after:" + received_after + " "

            received_before = request.get("received_before", "")
            if received_before:
                query += "before:" + received_before + " "

            if query:
                threads = (
                    service.users()
                    .threads()
                    .list(userId="me", q=query, maxResults=limit)
                    .execute()
                )

            else:
                threads = (
                    service.users()
                    .threads()
                    .list(userId="me", maxResults=limit)
                    .execute()
                )

            all_threads = threads.get("threads", [])
            return {"all_threads": all_threads}

        elif scope == "single":
            if not thread_id:
                raise Exception("Missing input data")

            thread = service.users().threads().get(userId="me", id=thread_id).execute()

            return thread
        raise Exception("Missing input data")

    except Exception as e:
        raise Exception(e)


def gmail_removeLabelFromThread(creds, request, **kwargs):
    """
    Removes labels from a Gmail thread.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It may include:
        
            - **thread_id** (str, required): The ID of the thread from which labels will be removed.
            - **label_ids** (str, required): A comma-separated list of label IDs to remove from the thread.

    Returns:
        dict: The modified thread after removing the specified labels.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)

        thread_id = request.get("thread_id", "")
        label_ids_str = request.get("label_ids", "")

        if not thread_id or not label_ids_str:
            raise Exception("Missing input data")

        label_ids = [id.strip() for id in label_ids_str.split(",")]
        labels = service.users().labels().list(userId="me").execute()
        labels_to_remove = []

        for label_id in label_ids:
            id = None
            for label in labels.get("labels", []):
                if label["id"] == label_id:
                    id = label["id"]
                    break
            if id:
                labels_to_remove.append(id)
            else:
                raise Exception(f"Label with id '{label_id}' not found.")

        return (
            service.users()
            .threads()
            .modify(
                userId="me", id=thread_id, body={"removeLabelIds": labels_to_remove}
            )
            .execute()
        )

    except Exception as e:
        raise Exception(e)


def get_message_subject(id, service):
    """
     Removes a list of labels, which is A mechanism for organizing messages and threads, from a specific thread.

    :param str access_token: (str,required) Used for authentication. 
    :param str : (str,required) for the calendar, it's 'gmail'
    :param str API_VERSION: (str,required) the version used is v1  
    :param dict request: contains thread and label ids 
    
        - :thread_id: (str,REQUIRED) the thread id , to which the label will be added
        - :label_ids: (str,REQUIRED) The Id of the label to be removed 
        
    :return: Success or failure of the operation
    :rtype: dict
    """
    message = service.users().messages().get(userId="me", id=id).execute()
    print(f"in get_message_subject : {message['subject']}")
    return message["subject"]


def forge_reply(message_id, service):
    """
        Sends a reply to a certain messsage in a thread 

    :param str access_token: (str,required) Used for authentication. 
    :param str : (str,required) for the calendar, it's 'gmail'
    :param str API_VERSION: (str,required) the version used is v1  
    :param dict request: contains thread  id and related details
    
        - :thread_id: (str,REQUIRED) the thread id , to which the message belongs
        
        - :message_id: (str,REQUIRED) The id of the message to reply to
        
    :return: Success or failure of the operation
    :rtype: dict
    """
    message = service.users().messages().get(userId="me", id=message_id).execute()
    reply = {"threadId": message["threadId"]}
    for header in message["payload"]["headers"]:
        if header["name"] == "From":
            reply["to"] = header["value"]
        if header["name"] == "Subject":
            reply["subject"] = header["value"]
    return reply


def gmail_replyToThread(creds, request, **kwargs):
    """
    Replies to a Gmail thread with an optional message and attachments.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It may include:
        
            - **to_recipients** (str, optional): The recipient(s) of the reply.
            - **thread_id** (str, required): The thread ID to which the reply belongs.
            - **cc_recipients** (str, optional): The CC recipients of the reply comma-separated .
            - **bcc_recipients** (str, optional): The BCC recipients of the reply comma-separated .
            - **subject** (str, optional): The subject of the reply.
            - **message_body** (str, required): The body of the reply message.
            - **in_reply_to** (str, required): The message ID of the parent message to which the reply is being sent.
            - **email_type** (str, optional): The type of email body, either "plain" or "html" (default is "plain").
            - **attachments_list** (list of dicts, optional): A list of attachments to include in the reply. Each attachment may have:

    Returns:
        dict: The sent reply message with the thread ID and raw email content.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        mimeMessage = MIMEMultipart()
        # Extract the request parameters
        to = request.get("to_recipients", "")
        thread_id = request.get("thread_id", None)
        cc = request.get("cc_recipients", None)
        bcc = request.get("bcc_recipients", None)
        subject = request.get("subject", "")
        message = request.get("message_body", None)
        # message_id for the reply
        in_reply_to = request.get("in_reply_to", None)
        email_type = request.get("email_type", "plain")
        attachments = request.get("attachments_list", None)

        if not thread_id and not in_reply_to and not message:
            raise Exception("Missing input data")
        else:
            # Construct the email body

            mimeMessage["In-Reply-To"] = in_reply_to
            mimeMessage["References"] = in_reply_to
            # Fill the In-Reply-To field with the parent message ID
            reply = forge_reply(message_id=in_reply_to, service=service)
            if cc:
                mimeMessage["cc"] = cc
            if bcc:
                mimeMessage["bcc"] = bcc
            mimeMessage["subject"] = "Re :" + (subject or reply["subject"])
            mimeMessage["to"] = to or reply["to"]

            mimeMessage.attach(MIMEText(message, email_type))

            if attachments:
                for attach in attachments:
                    if attach["type"] == "URL":
                        response = requests.get(attach["url"])
                        if response.status_code == 200:
                            content = response.content
                            # Extract the file name from the URL or provide a default name
                            filename = attach["name"]
                            # Create an attachment
                            attachment = MIMEBase("application", "octet-stream")
                            attachment.set_payload(content)
                            encoders.encode_base64(attachment)
                            attachment.add_header(
                                "Content-Disposition", "attachment", filename=filename
                            )
                            mimeMessage.attach(attachment)
                    else:  # type = ByteString
                        if kwargs:

                            dialogue_id = kwargs.get("dialogue_id")
                            conv_id = kwargs.get("conv_id")

                        contentData = get_file_data(dialogue_id,conv_id,attach["content"])
                        if "Error" in contentData:
                            raise Exception(f"Failed to retrieve file content: {contentData['Error']}")
                    
                        # Extract and decode the file content from hex to bytes
                        data = bytes.fromhex(contentData["file_content"])
                        payload = MIMEBase("application", "octet-stream")
                        payload.set_payload(data)
                        encoders.encode_base64(payload)
                        payload.add_header(
                            "Content-Disposition", "attachment", filename=attach["name"]
                        )
                        mimeMessage.attach(payload)

            # Send the reply
            raw_string = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()
            reply_message = {
                "raw": raw_string,
                "threadId": thread_id or reply["threadId"],
            }

            return (
                service.users()
                .messages()
                .send(userId="me", body=reply_message)
                .execute()
            )

    except Exception as e:
        raise Exception(e)


def gmail_trashThread(creds, request, **kwargs):
    """
    Moves a specified Gmail thread to the trash.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It should include:
        
            - **thread_id** (str, required): The thread ID of the thread to be moved to trash.

    Returns:
        dict: A response indicating the successful move of the thread to trash.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        thread_id = request.get("thread_id", "")
        if not thread_id:
            raise Exception("Missing input data")

        service = create_service(access_token)

        # Trash the thread
        return service.users().threads().trash(userId="me", id=thread_id).execute()

    except Exception as e:
        raise Exception(e)


def gmail_untrashThread(creds, request, **kwargs):
    """
    Restores a specified Gmail thread from the trash.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It should include:
        
            - **thread_id** (str, required): The thread ID of the thread to be restored from trash.

    Returns:
        dict: A response indicating the successful restoration of the thread from the trash.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        thread_id = request.get("thread_id", "")
        if not thread_id:
            raise Exception("Missing input data")

        service = create_service(access_token)

        # Trash the thread
        return service.users().threads().untrash(userId="me", id=thread_id).execute()

    except Exception as e:
        raise Exception(e)


################################################# Label@@@ #########################################


def gmail_createLabel(creds, request, **kwargs):
    """
    Creates a new label in Gmail.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It should include:
        
            - **name** (str, required): The name of the label to be created.
            - **labelListVisibility** (str, optional): The visibility of the label in the label list. Default is "labelShow".
            - **messageListVisibility** (str, optional): The visibility of the label in message lists. Default is "show".

    Returns:
        dict: The response containing details of the created label.
    """

    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        name = request.get("name", "")
        if not name:
            raise Exception("Missing input data")
        label = {
            "name": name,
            "labelListVisibility": request.get("labelListVisibility", "labelShow"),
            "messageListVisibility": request.get("messageListVisibility", "show"),
        }

        created_label = (
            service.users().labels().create(userId="me", body=label).execute()
        )

        return created_label

    except Exception as e:
        raise Exception(e)

def gmail_deleteLabel(creds, request, **kwargs):
    """
    Deletes a label from the user's Gmail account.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It should include:
        
            - **label_id** (str, required): The ID of the label to be deleted.

    Returns:
        dict: A response containing a message indicating the label has been deleted.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        label_id = request.get("label_id", "")

        if not label_id:
            raise Exception("Missing input data")

        service.users().labels().delete(userId="me", id=label_id).execute()
        return {"Result": f"Deleted Label ID: {label_id}"}
    except Exception as e:
        raise Exception(e)


def gmail_getLabels(creds, request, **kwargs):
    """
    Retrieves labels from the user's Gmail account.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It should include:
        
             - **scope** (str, required): The scope of the request, either "single" or "all" (default is "single").
             - **label_id** (str, optional): The ID of the label to retrieve (required if scope is `"single"`).
             - **limit** (int, optional): The maximum number of labels to return (defaults to 100).

    Returns: 
        dict: A dictionary containing either:
        
            - A list of labels (if `scope` is `"all"`).
            - A specific label (if `scope` is `"single"` and `label_id` is provided).
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        scope = request.get("scope", "")
        label_id = request.get("label_id", "")
        limit = request.get("limit", 100)

        if scope == "all":
            labels = service.users().labels().list(userId="me").execute()
            all_labels = labels.get("labels", [])
            if limit and limit > 0:
                all_labels = all_labels[:limit]
            return {"labels": all_labels}

        elif scope == "single" and label_id:
            if not label_id:
                raise Exception("Missing input data")
            label = service.users().labels().get(userId="me", id=label_id).execute()
            return label
        raise Exception("Missing input data")

    except Exception as e:
        raise Exception(e)


################################################# Drafts## #########################################


def gmail_createDraft(creds, request, **kwargs):
    """
    Creates a draft email in the user's Gmail account.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It should include:
        
            - **to** (str, required): The recipient(s) of the email.
            - **body** (str, required): The body content of the email.
            - **cc** (str, optional): The CC recipients of the email.comma-separated.
            - **bcc** (str, optional): The BCC recipients of the email.comma-separated.
            - **subject** (str, optional): The subject of the email.
            - **attachments_list** (list, optional): A list of attachments to be added to the draft.
            - **type** (str, optional): The type of the email content, either `"plain"` (default) or `"html"`.

    Returns:
        dict: A dictionary containing the created draft, including details like the `id` and `message` object.
    """
    
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        mimeMessage = MIMEMultipart()

        to = request.get("to", None)
        body = request.get("body", None)
        cc = request.get("cc", None)
        bcc = request.get("bcc", None)
        subject = request.get("subject", None)
        attachments = request.get("attachments_list", None)
        type = request.get("type", "plain")
        # Test required fields
        if not to or not body:
            raise Exception("Missing input data")

        # Fill mimeMessage fields
        if to:
            mimeMessage["to"] = to
        if cc:
            mimeMessage["cc"] = cc
        if bcc:
            mimeMessage["bcc"] = bcc
        if subject:
            mimeMessage["subject"] = subject

        email_content = MIMEText(body, type)
        # Add body content
        mimeMessage.attach(email_content)
        
        if attachments:
            for attach in attachments:
                if attach["type"] == "URL":
                    response = requests.get(attach["url"])
                    if response.status_code == 200:
                        content = response.content
                        # Extract the file name from the URL or provide a default name
                        filename = attach["name"]
                        # Create an attachment
                        attachment = MIMEBase("application", "octet-stream")
                        attachment.set_payload(content)
                        encoders.encode_base64(attachment)
                        attachment.add_header(
                            "Content-Disposition", "attachment", filename=filename
                        )
                        mimeMessage.attach(attachment)
                elif attach["type"] == "ByteString":
                    if kwargs:
                        # Extra conv_id & dialogue_id
                        dialogue_id = kwargs.get("dialogue_id")
                        conv_id = kwargs.get("conv_id")

                    contentData = get_file_data(dialogue_id,conv_id,attach["content"])
                    if "Error" in contentData:
                        raise Exception(f"Failed to retrieve file content: {contentData['Error']}")
                    
                    # Extract and decode the file content from hex to bytes
                    data = bytes.fromhex(contentData["file_content"])
                    payload = MIMEBase("application", "octet-stream")
                    payload.set_payload(data)
                    encoders.encode_base64(payload)
                    payload.add_header(
                        "Content-Disposition", "attachment", filename=attach["name"]
                    )
                    mimeMessage.attach(payload)

        draft = {
            "message": {
                "raw": base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()
            }
        }

        return service.users().drafts().create(userId="me", body=draft).execute()

    except Exception as e:
        raise Exception(e)


def gmail_deleteDraft(creds, request, **kwargs):
    """
    Deletes a draft email from the user's Gmail account.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It should include:
        
            - **draft_id** (str, required): The ID of the draft to be deleted.

    Returns:
        dict: A dictionary containing the result of the operation, including the `draft_id` of the deleted draft.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        draft_id = request.get("draft_id", "")
        if not draft_id:
            raise Exception("Missing input data")
        service.users().drafts().delete(userId="me", id=request["draft_id"]).execute()
        return {"Result": f"Deleted Draft ID: {draft_id}"}

    except Exception as e:
        raise Exception(e)


def gmail_getDraft(creds, request, **kwargs):
    """
    Retrieves drafts from the user's Gmail account.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expiry** (str, required): Expiry date of the access token.

         (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It should include:
        
            - **scope** (str, required): Scope of the request, either `"all"` or `"single"`.
            - **limit** (int, optional): Maximum number of drafts to return (default is 100).
            - **draft_id** (str, required if scope is "single"): The ID of the draft to retrieve.

    Returns:
        dict: A dictionary containing the drafts. If `scope` is `"all"`, it will contain a list of all drafts (up to the limit). If `scope` is `"single"`, it will return a single draft based on the `draft_id`.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token)
        scope = request.get("scope", "")
        # Default to 100 if 'limit' is not provided
        limit = request.get("limit", 100)

        if scope == "all":
            all_drafts = service.users().drafts().list(userId="me").execute()
            drafts = all_drafts.get("drafts", [])

            if limit and limit > 0:
                drafts = drafts[:limit]

            return {"drafts": drafts}

        elif scope == "single":
            draft_id = request.get("draft_id", "")
            if not draft_id:
                raise Exception("Missing input data")

            return service.users().drafts().get(userId="me", id=draft_id).execute()

        raise Exception("Missing input data")

    except Exception as e:
        raise Exception(e)


operations = {
    'addLabel':gmail_addLabel,
    'deleteMessage':gmail_deleteMessage,
    'getMessage':gmail_getMessage,
    'markAsRead':gmail_markAsRead,
    'markAsUnread':gmail_markAsUnread,
    'removeLabel':gmail_removeLabel,
    'replyToMessage':gmail_replyToMessage,
    'sendMessage':gmail_sendMessage,
    'listAttachments':gmail_list_message_attachments,
    'downloadAttachment':gmail_download_attachment,
    'addLabelToThread':gmail_addLabelToThread,
    'deleteThread':gmail_deleteThread,
    'getThreads':gmail_getThreads,
    'removeLabelFromThread':gmail_removeLabelFromThread,
    # "":get_message_subject,
    # "":forge_reply,
    'replyToThread':gmail_replyToThread,
    'trashThread':gmail_trashThread,
    'untrashThread':gmail_untrashThread,
    'createLabel':gmail_createLabel,
    'deleteLabel':gmail_deleteLabel,
    'getLabels':gmail_getLabels,
    'createDraft':gmail_createDraft,
    'deleteDraft':gmail_deleteDraft,
    'getDraft':gmail_getDraft
}
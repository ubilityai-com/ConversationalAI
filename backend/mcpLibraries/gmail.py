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

def create_service(access_token, API_SERVICE_NAME, API_VERSION):
    try:
        creds_data = json.loads(access_token)
        creds = Credentials.from_authorized_user_info(creds_data)
        if creds and creds.expired and creds.refresh_token:
            # in this case the token is expired and we need to get a new access token
            creds.refresh(Request())
        service = build(
            API_SERVICE_NAME, API_VERSION, credentials=creds, static_discovery=False
        )

        logging.warning(f'{API_SERVICE_NAME}  {API_VERSION} service created successfully')
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


def gmail_addLabel(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It must include:
        
            - **message_id** (str, required): The ID of the message to which the label should be added.
            - **label_id** (str, required): comma-separated list of the label IDs to be added.

    Returns:
        dict: The response from the Gmail API after adding the label to the message.

        """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        message_id = request.get("message_id", "")
        label_id = request.get("label_id", "")
    
        if not label_id :
            raise Exception("Missing input data")

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

def gmail_deleteMessage(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It must include:
        
            - **message_id** (str, required): The ID of the message to be deleted.

    Returns:
        dict: A dictionary with a result message containing the deleted message ID.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        message_id = request.get("message_id", "")
        if not message_id:
            raise Exception("Missing input data")
        service.users().messages().delete(userId="me", id=request["message_id"]).execute()
        return {"Result": f"Deleted Message ID: {message_id}"}
    except Exception as e:
        raise Exception(e)

def gmail_getMessage(creds,API_SERVICE_NAME, API_VERSION, request):
    """
    Retrieves a Gmail message.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It may include:
        
            - **message_id** (str, required if scope is "single"): The ID of the message to retrieve.
    
    Returns:
        dict: returns a gmail single message.

   """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        message_id = request.get("message_id", "")
        if not message_id:
            raise Exception("Missing input data")
        message = (service.users().messages().get(userId="me", id=message_id).execute())
        return message
    except Exception as e:
        raise Exception(e)

def gmail_getMessages(creds,API_SERVICE_NAME, API_VERSION, request):
    """
    Retrieve a list of Gmail messages for the authenticated user.

    This function connects to the Gmail API using the provided credentials and retrieves a list 
    of messages filtered by optional parameters such as label IDs and spam/trash inclusion.

    :param str creds: JSON-encoded credentials used to obtain an access token.
    :param str API_SERVICE_NAME: Name of the Google API service. For Gmail, this should be `'gmail'`.
    :param str API_VERSION: Version of the Gmail API to use (e.g., `'v1'`).
    :param dict request: A dictionary containing request parameters:
        - **labelIds** (list of str, optional): List of label IDs to filter messages by.
        - **maxResults** (int, optional): Maximum number of messages to return. Default is 5.
        - **includeSpamTrash** (bool, optional): Whether to include messages from Spam and Trash. Default is False.

    :return: A dictionary containing the list of messages and associated metadata.
    :rtype: dict

    :raises Exception: If an error occurs during API call or service creation.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        label_ids = request.get("labelIds", [])
        max_results = request.get("maxResults", 5)
        spamTrash = request.get("includeSpamTrash", False)
        messages = (service.users().messages().list(userId="me",labelIds=label_ids,maxResults=max_results,includeSpamTrash=spamTrash,).execute())
        return messages
    except Exception as e:
        raise Exception(e)

def gmail_markAsRead(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It must include:
        
            - **message_id** (str, required): The ID of the message to be marked as read.

    Returns:
        dict: The response from the Gmail API after modifying the message.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
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

def gmail_markAsUnread(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It must include:
        
            - **message_id** (str, required): The ID of the message to be marked as unread.

    Returns:
        dict: The response from the Gmail API after modifying the message.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
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

def gmail_removeLabel(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It may include:
        
            - **message_id** (str, required): The ID of the message to modify.
            - **label_id** (str, optional): The ID of the label to remove.
    Returns:
        dict: The response from the Gmail API after removing the label from the message.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        message_id = request.get("message_id", "")
        label_id = request.get("label_id", "")

        if not label_id :
            raise Exception("Missing input data")

        if label_id:
            return (
                service.users()
                .messages()
                .modify(userId="me", id=message_id, body={"removeLabelIds": [label_id]})
                .execute()
            )

    except Exception as e:
        raise Exception(e)

def gmail_replyToMessage(creds,API_SERVICE_NAME, API_VERSION, request):
    
    """
     Replies to a specific Gmail message with an optional message body, recipients.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the reply. It may include:
        
            - **in_reply_to** (str, required): The ID of the message being replied to.
            - **type** (str, optional, default='plain'): The type of email content, either 'plain' or 'html'.
            - **cc_recipients** (str, optional): A comma-separated list of CC recipients.
            - **bcc_recipients** (str, optional): A comma-separated list of BCC recipients.
            - **message** (str, required): The body of the message being sent as a reply.

    Returns:
        dict: The response from the Gmail API after sending the reply.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        to = ""
        subject = ""
        in_reply_to = request.get("in_reply_to", None)
        email_type = request.get("type", "plain")
        cc = request.get("cc_recipients", None)
        bcc = request.get("bcc_recipients", None)
        message = request.get("message", None)  # this is the message body
        # Test required fields
        if "in_reply_to" not in request and "message" not in request:
            raise Exception("Missing input data")
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        # find the destination for the reply using in_reply_to
        original_message = (service.users().messages().get(userId="me", id=in_reply_to).execute())
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

        raw_string = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()
        return (
            service.users()
            .messages()
            .send(userId="me", body={"raw": raw_string, "threadId": thread_id})
            .execute()
        )
    except Exception as e:
        raise Exception(e)

def gmail_sendMessage(creds,API_SERVICE_NAME, API_VERSION, request):
     
    """
    Sends a message via Gmail API with optional CC, BCC, and subject.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the message to be sent. It may include:
        
            - **to** (str, required): The recipient's email address.
            - **body** (str, required): The body of the email message.
            - **cc** (str,optional): A comma-separated string or list of CC email addresses.
            - **bcc** (str, optional): A comma-separated string or list of BCC email addresses.
            - **subject** (str, optional): The subject of the email message.
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
        type = request.get("type", "plain")
        if not to or not body:
            raise Exception("Missing input data")        
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
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
        raw_string = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()
        return (
            service.users()
            .messages()
            .send(userId="me", body={"raw": raw_string})
            .execute()
        )
    except Exception as e:
        raise Exception(e)

################################################# Threads #########################################

def gmail_addLabelToThread(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

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
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
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

def gmail_deleteThread(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for deleting a Gmail thread. It must include:
        
            - **thread_id** (str, required): The ID of the thread to be deleted.

    Returns:
        dict: A dictionary containing the result of the operation, which includes the deleted thread ID.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        thread_id = request.get("thread_id", "")

        if not thread_id:
            raise Exception("Missing input data")

        service.users().threads().delete(userId="me", id=thread_id).execute()
        return {"Result": f"Deleted Thread ID: {thread_id}"}

    except Exception as e:
        raise Exception(e)

def gmail_getThreads(creds, API_SERVICE_NAME, API_VERSION, request):
    """
    Retrieves Gmail threads based on specified filters and parameters.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
                - clientID (str): OAuth client ID.
                - clientSecret (str): OAuth client secret.
                - accessToken (str): OAuth access token.
                - refreshToken (str): OAuth refresh token.
                - expirey (str): Expiry date of the access token.
        API_SERVICE_NAME (str): API service name (e.g., 'gmail').
        API_VERSION (str): API version (e.g., 'v1').
        request (dict): Filter options including:
            - limit (int): Max number of threads to retrieve.
            - include_spam_trash (bool): Include spam/trash if True.
            - label_ids (list): List of Gmail label IDs.
            - search (str): Free-text Gmail search query.
            - read_status (str): 'all', 'read', or 'unread'.
            - received_after (str): Date string (e.g., 2024/01/01).
            - received_before (str): Date string (e.g., 2024/12/31).
    
    Returns:
        dict: {"all_threads": list of matching threads}
    """
    try:
        cred = json.loads(creds)
        access_token = create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        limit = request.get("limit", 100)
        include_spam_trash = request.get("include_spam_trash", False)
        label_ids = request.get("label_ids", [])  
        search = request.get("search", "")
        read_status = request.get("read_status", "")
        received_after = request.get("received_after", "")
        received_before = request.get("received_before", "")
        query_parts = []

        if search:
            query_parts.append(search)
        if read_status == "all":
            query_parts.append("is:read OR is:unread")
        elif read_status == "unread":
            query_parts.append("is:unread")
        elif read_status == "read":
            query_parts.append("is:read")

        if received_after:
            query_parts.append(f"after:{received_after}")
        if received_before:
            query_parts.append(f"before:{received_before}")

        query_string = " ".join(query_parts).strip()

        threads = service.users().threads().list(
            userId="me",
            q=query_string if query_string else None,
            maxResults=limit,
            labelIds=label_ids if label_ids else None,
            includeSpamTrash=include_spam_trash
        ).execute()

        all_threads = threads.get("threads", [])
        return {"all_threads": all_threads}

    except Exception as e:
        raise Exception(f"Gmail thread fetch failed: {e}")

def gmail_getThread(creds,API_SERVICE_NAME, API_VERSION, request):
    """
      Retrieves Gmail thread based on the thread id.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the thread id to retrieve the Gmail thread. It include:
        
            - **thread_id** (str, optional): The ID of the thread to retrieve .

    Returns:
        dict: A dictionary containing the retrieved thread.
             
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        thread_id = request.get("thread_id", "")    
        if not thread_id:
                raise Exception("Missing input data")

        thread = service.users().threads().get(userId="me", id=thread_id).execute()
        return thread
        
    except Exception as e:
        raise Exception(e)

def gmail_removeLabelFromThread(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

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
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)

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
    :param str API_SERVICE_NAME: (str,required) for the calendar, it's 'gmail'
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
    :param str API_SERVICE_NAME: (str,required) for the calendar, it's 'gmail'
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

def gmail_replyToThread(creds,API_SERVICE_NAME, API_VERSION, request):
    """
    Replies to a Gmail thread with an optional message.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

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

    Returns:
        dict: The sent reply message with the thread ID and raw email content.
    """

    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
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

def gmail_trashThread(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

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

        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)

        # Trash the thread
        return service.users().threads().trash(userId="me", id=thread_id).execute()

    except Exception as e:
        raise Exception(e)

def gmail_untrashThread(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

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

        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)

        # Trash the thread
        return service.users().threads().untrash(userId="me", id=thread_id).execute()

    except Exception as e:
        raise Exception(e)

################################################# Label #########################################

def gmail_createLabel(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

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
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
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

def gmail_deleteLabel(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It should include:
        
            - **label_id** (str, required): The ID of the label to be deleted.

    Returns:
        dict: A response containing a message indicating the label has been deleted.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        label_id = request.get("label_id", "")

        if not label_id:
            raise Exception("Missing input data")

        service.users().labels().delete(userId="me", id=label_id).execute()
        return {"Result": f"Deleted Label ID: {label_id}"}
    except Exception as e:
        raise Exception(e)

def gmail_getLabels(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It should include:
             - **limit** (int, optional): The maximum number of labels to return (defaults to 100).

    Returns: 
        dict: A dictionary containing :  
          - A list of labels 

    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        limit = request.get("limit", 100)
        labels = service.users().labels().list(userId="me").execute()
        all_labels = labels.get("labels", [])
        if limit and limit > 0:
            all_labels = all_labels[:limit]
        return {"labels": all_labels}

    except Exception as e:
        raise Exception(e)

def gmail_getLabel(creds,API_SERVICE_NAME, API_VERSION, request):
    """
    Retrieves a label from the user's Gmail account.

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expirey** (str, required): Expiry date of the access token.

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It should include:
        
             - **label_id** (str, optional): The ID of the label to retrieve (required if scope is `"single"`).

    Returns: 
        dict: A dictionary containing :
        
            - the lable to get
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        label_id = request.get("label_id", "")
        if not label_id:
            raise Exception("Missing input data")
        label = service.users().labels().get(userId="me", id=label_id).execute()
        return label
    except Exception as e:
        raise Exception(e)

################################################# Drafts ###########################################

def gmail_createDraft(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It should include:
        
            - **to** (str, required): The recipient(s) of the email.
            - **body** (str, required): The body content of the email.
            - **cc** (str, optional): The CC recipients of the email.comma-separated.
            - **bcc** (str, optional): The BCC recipients of the email.comma-separated.
            - **subject** (str, optional): The subject of the email.
            - **type** (str, optional): The type of the email content, either `"plain"` (default) or `"html"`.

    Returns:
        dict: A dictionary containing the created draft, including details like the `id` and `message` object.
    """
    
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        mimeMessage = MIMEMultipart()
        to = request.get("to", None)
        body = request.get("body", None)
        cc = request.get("cc", None)
        bcc = request.get("bcc", None)
        subject = request.get("subject", None)
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
        
        draft = {
            "message": {
                "raw": base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()
            }
        }

        return service.users().drafts().create(userId="me", body=draft).execute()

    except Exception as e:
        raise Exception(e)

def gmail_deleteDraft(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It should include:
        
            - **draft_id** (str, required): The ID of the draft to be deleted.

    Returns:
        dict: A dictionary containing the result of the operation, including the `draft_id` of the deleted draft.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        draft_id = request.get("draft_id", "")
        if not draft_id:
            raise Exception("Missing input data")
        service.users().drafts().delete(userId="me", id=request["draft_id"]).execute()
        return {"Result": f"Deleted Draft ID: {draft_id}"}

    except Exception as e:
        raise Exception(e)

def gmail_getDrafts(creds,API_SERVICE_NAME, API_VERSION, request):
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

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It should include:
        
            - **limit** (int, optional): Maximum number of drafts to return (default is 100).
         
    Returns:
        dict: A dictionary containing the drafts.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        limit = request.get("limit", 100)
        all_drafts = service.users().drafts().list(userId="me").execute()
        drafts = all_drafts.get("drafts", [])
        if limit and limit > 0:
                drafts = drafts[:limit]

        return {"drafts": drafts}
    except Exception as e:
        raise Exception(e)

def gmail_getDraft(creds,API_SERVICE_NAME, API_VERSION, request):
    """
    Retrieves a draft .

    Parameters:
        creds (str): JSON-encoded string containing OAuth credentials.
            It must contain:
            
            - **clientID** (str, required): OAuth client ID.
            - **clientSecret** (str, required): OAuth client secret.
            - **accessToken** (str, required): OAuth access token for Gmail API.
            - **refreshToken** (str, required): OAuth refresh token for Gmail API.
            - **expiry** (str, required): Expiry date of the access token.

        API_SERVICE_NAME (str): The name of the API service (e.g., 'gmail').

        API_VERSION (str): The version of the API (e.g., 'v1').

        request (dict): A dictionary containing the parameters for the request. It should include:
        
            - **draft_id** (str, required if scope is "single"): The ID of the draft to retrieve.

    Returns:
        dict: A dictionary containing the draft.
    """
    try:
        cred=json.loads(creds)
        access_token=create_token(cred)
        service = create_service(access_token, API_SERVICE_NAME, API_VERSION)
        draft_id = request.get("draft_id", "")
        if not draft_id:
            raise Exception("Missing input data : draft_id")

        return service.users().drafts().get(userId="me", id=draft_id).execute()
    except Exception as e:
        raise Exception(e)
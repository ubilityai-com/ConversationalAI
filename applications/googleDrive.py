# import io
import os,sys
from googleapiclient.http import MediaIoBaseDownload,MediaFileUpload
import json,io,mimetypes
from io import BytesIO
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.http import MediaIoBaseUpload
import requests
status=[200, 201, 202, 204, 206, 207, 208]

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from applications.functions import get_file_data,upload_file


    # """
    # Create a new folder in Google Drive.

    # :param str access_token:
    #     The access token for authenticating with Google Drive. (required)

    # :param dict params:
    #     - content (str): The content to be added to the file.(required)
    #     - body (dict):
    #         - name (str): The name of the new folder. (required)
    #         - parents (list): A list of parent folder IDs where the new folder should be created. (optional)
    #     - ocrLanguage (str): The language to use for OCR (Optical Character Recognition).
    #     - useContentAsIndexableText (bool): Whether to use the content as indexable text.
    #     - properties (list): A list of custom properties with keys and values.
    #     - appProperties (list): A list of custom app properties with keys and values.

    # :return: The response from the Google Drive API after creating the folder.
    # :rtype: dict
    # """
def create_service(access_token, API_SERVICE_NAME="drive", API_VERSION="v3"):
    try:
        creds_data = json.loads(access_token)
        creds = Credentials.from_authorized_user_info(creds_data)
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        service = build(API_SERVICE_NAME, API_VERSION,
                        credentials=creds, static_discovery=False)
        return service
    except Exception as e:
        raise Exception(
            f'Failed to create service instance for {API_SERVICE_NAME} with error {str(e)}')

def create_token(cred):
    try:
        result={}
        result['token']=cred['accessToken']
        result['refresh_token']=cred['refreshToken']
        result['token_uri']="https://oauth2.googleapis.com/token"
        result['client_id']=cred['clientID']
        result['client_secret']=cred['clientSecret']
        result['scopes']=["https://www.googleapis.com/auth/drive"]
        result['expiry']=cred['expirey']
        return json.dumps(result)
    except Exception as e:
        raise Exception(e) 
    
def googledrive_create_folder(json_cred, params, **kwargs):
    """
    Create a new folder in Google Drive.

    :param str access_token:
        The access token for authenticating with Google Drive. (required)

    :param dict params:
        - body (dict):
            - name (str): The name of the folder. (required)
            - mimeType (str): The MIME type of the folder, indicating it is a Google Drive folder. (required)
            - parents (list): A list of parent folder IDs. (optional)

    :return: The response from the Google Drive API after creating the folder.
    :rtype: dict
    """
    try:
            cred=json.loads(json_cred)
            access_token=create_token(cred)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            service = create_service(access_token,'drive', 'v3')
            response = service.files().create(**data).execute()
            return response
    except Exception as e:
        return {"Error": str(e)}
      
def googledrive_delete_file(json_cred, params, **kwargs):
    """
    Delete a file or folder from Google Drive.

    :param str access_token:
        The access token for authenticating with Google Drive. (required)

    :param dict params:
        - fileId (str): The ID of the file or folder to be deleted. (required)
        - body (dict):
            -trashed(bool): Delete the file or folder permanently.(optional)

    :return: The response from the Google Drive API after deleting the file or folder.
    :rtype: str
    """
    try:
            cred=json.loads(json_cred)
            access_token=create_token(cred)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            service = create_service(access_token,'drive', 'v3')
            if 'body'in data :
                response = service.files().update(**data).execute()
                return response
            else:
                response = service.files().delete(**data).execute()
                return {"Message": "Item deleted successfully"}
    except Exception as e:
        return {"Error": str(e)}
    
def googledrive_share_file(json_cred, params, **kwargs):
    """
    Share a file or folder in Google Drive with specified permissions.

    :param str access_token:
        The access token for authenticating with Google Drive. (required)

    :param dict params:
        - fileId (str): The ID of the file or folder to be shared. (required)
        - emailMessage (str): A message to include in the email notification. (optional)
        - sendNotificationEmail (bool): Whether to send a notification email or not. (optional)
        - useDomainAdminAccess (bool): Whether to use domain administrator access. (optional)
        - transferOwnership (bool): Whether to transfer ownership to new specified owners. (optional)
        - body (dict):
            - role(str): The role granted by this permission.(optional)
            - type(str): The type of the grantee.(optional)
            - emailAddress(str): The email address of the user or group to which this permission refers.(optional)
            - domain(str): The domain to which this permission refers.(optional)
            - allowFileDiscovery(bool): Whether the permission allows the file to be discovered through search.(optional)


    :return: The response from the Google Drive API after sharing the file or folder.
    :rtype: dict
    """
    try:
            cred=json.loads(json_cred)
            access_token=create_token(cred)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            service = create_service(access_token,'drive', 'v3')
            response = service.permissions().create(**data).execute()
            return response
    except Exception as e:
        return {"Error": str(e)}
    
def googledrive_copy_file(json_cred, params, **kwargs):
    """
    Copy a file on Google Drive.

    :param str access_token:
        The access token for authenticating with Google Drive. (required)

    :param dict params:
        - fileId (str): The ID of the file to be copied.
        - body (dict):
            - name (str): The name for the copied file.
            - description (str): The description for the copied file.
            - parents (list): A list containing the ID(s) of the folder(s) where the copy should be placed.

    :return: The API response after copying the file.
    :rtype: dict
    """
    try:
            cred=json.loads(json_cred)
            access_token=create_token(cred)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            service = create_service(access_token,'drive', 'v3')
            response = service.files().copy(**data).execute()
            return response
    except Exception as e:
        return {"Error": str(e)}
       
def googledrive_move_file(json_cred, params, **kwargs):
    """
    Move a file or folder on Google Drive.

    :param str access_token:
        The access token for authenticating with Google Drive. (required)

    :param dict params:
        - fileId (str): The ID of the file or folder to be moved.(required)
        - addParents (str): ID of the folder where the file or folder should be moved.(required)

    :return: The API response after moving the file or folder.
    :rtype: dict
    """
    try:
            cred=json.loads(json_cred)
            access_token=create_token(cred)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            service = create_service(access_token,'drive', 'v3')
            response = service.files().update(**data).execute()
            return response
    except Exception as e:
        return {"Error": str(e)}

def googledrive_create_file_text(json_cred, params, **kwargs):
    """
    Create a new file in Google Drive.

    :param str access_token:
        The access token for authenticating with Google Drive. (required)

    :param dict params:
        - content (str): The content to be added to the file.(required)
        - body (dict):
            - name (str): The name of the new folder. (required)
            - parents (list): A list of parent folder IDs where the new folder should be created. (optional)
        - ocrLanguage (str): The language to use for OCR (Optical Character Recognition).(optional)
        - useContentAsIndexableText (bool): Whether to use the content as indexable text.(optional)
        - properties (list): A list of custom properties with keys and values.(optional)
        - appProperties (list): A list of custom app properties with keys and values.(optional)

    :return: The response from the Google Drive API after creating the folder.
    :rtype: dict
    """
    try:
            cred=json.loads(json_cred)
            access_token=create_token(cred)
            data = {}
            for key, value in params.items():
                if key=='content':
                     continue
                if value:
                    data[key] = value
            service = create_service(access_token,'drive', 'v3')
            media = MediaIoBaseUpload(
            BytesIO(params['content'].encode('utf-8')),
            mimetype='text/plain',
            resumable=True
        )
            response = service.files().create(**data,media_body=media).execute()
            return response
    except Exception as e:
        return {"Error": str(e)}

def googledrive_upload_file(json_cred, params, **kwargs):
    """
    Upload a file to Google Drive.

    :param str access_token:
        The access token for authenticating with Google Drive. (required)

    :param dict params:
            - data (bytes): The binary data of the file to be uploaded in the form of a base64 string.(required, if 'url' is not provided)
            - url (str): The URL from which the file should be downloaded for uploading.(required, if 'url' is not provided)
            - body (dict):
                - name (str): The name of the file.(required)
                - parents (list): A list containing the ID(s) of the folder(s) where the file should be uploaded.(optional)
                - ocrLanguage (str): The OCR language for the file.(optional)
                - useContentAsIndexableText (bool): Whether to use content as indexable text.(optional)
                - properties (list): A list of custom properties with keys and values.(optional)
                - appProperties (list): A list of custom app properties with keys and values.(optional)

    :return: The API response after uploading the file.
    :rtype: dict
    """
    try:
        cred=json.loads(json_cred)
        access_token=create_token(cred)
        data = {}
        for key, value in params.items():
            if value:
                data[key] = value

        filename = data["data"]
        service = create_service(access_token,'drive', 'v3')
        if 'data' in data:
            if kwargs:
                # Extra conv_id & dialogue_id
                dialogue_id = kwargs.get("dialogue_id")
                conv_id = kwargs.get("conv_id")

            contentData = get_file_data(dialogue_id,conv_id,filename)
            if "Error" in contentData:
                    raise Exception(f"Failed to retrieve file content: {contentData['Error']}")
            file_stream = io.BytesIO(bytes.fromhex(contentData["file_content"]))

            mime_type, _ = mimetypes.guess_type(contentData["file_name"])
            mime_type = mime_type or 'application/octet-stream'  
            
            # Set up the upload
            media_body = MediaIoBaseUpload(file_stream, mimetype=mime_type)

            # Upload to Google Drive
            file = service.files().create(
                body=data['body'],
                media_body=media_body,
                fields='id, name'
            ).execute()
            return file
        elif 'url' in data:
            response = requests.get(data['url'])
            if response.status_code in status:
                file_content = response.content
                media = MediaIoBaseUpload(BytesIO(file_content), mimetype='application/octet-stream', resumable=True)
                url = service.files().create(body=data['body'], media_body=media).execute()
                return url
        else:
            raise Exception("Missing 'data' or 'url' key in input.")
    except Exception as e:
        return {"Error": str(e)}
    

def googledrive_update_file(json_cred, params, **kwargs):
    """
    Update a file on Google Drive with new content and metadata.

    :param str access_token:
        The access token for authenticating with Google Drive. (required)

    :param dict params:
        - fileId (str): The ID of the file to be updated.(required)
        - data (bytes): The binary data of the file for updating its content.(required)
        - body (dict):
            - name (str): The new name of the file.(optional)
            - properties (list): A list of custom properties with keys and values.(optional)
            - appProperties (list): A list of custom app properties with keys and values.(optional)
            - ocrLanguage (str): The new OCR language for the file.(optional)
            - useContentAsIndexableText (bool): Whether to use content as indexable text.(optional)

    :return: The API response after updating the file.
    :rtype: dict
    """
    try:
            cred=json.loads(json_cred)
            access_token=create_token(cred)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            service = create_service(access_token,'drive', 'v3')
            file_metadata = service.files().get(fileId=data['fileId']).execute()
            new_file_name = data['body']['name'] if 'name' in data['body'] and data['body']['name']!='' else file_metadata['name']
            data['body']['name']= new_file_name
            media = MediaIoBaseUpload(BytesIO(data['data']), mimetype='application/octet-stream', resumable=True)
            response = service.files().update(fileId=data['fileId'],body=data['body'],media_body=media).execute()
            return response
    except Exception as e:
        return {"Error": str(e)}
       
def googledrive_get_many_files(json_cred, params, **kwargs):
    """
    Get a list of files from Google Drive based on specified criteria.

    :param str access_token:
        The access token for authenticating with Google Drive. (required)

    :param dict params:
        - pageSize (int): The maximum number of files to return per page.(optional)
        - parent (str): The ID of the parent folder.(optional)
        - trashed (bool): Whether to include trashed files.(optional)
        - type (list): A list of MIME types to filter the search.(optional)
        - fields (str): The fields to include in the response.(optional)
        - query (str): A custom query string for additional filtering.(optional)
        - name (str): The name of the file or folder to search for.(optional)
        
    :return: A dictionary containing information about the files matching the criteria.
    :rtype: dict
    """
    try:
            cred=json.loads(json_cred)
            access_token=create_token(cred)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            query_parts = []
            query_parts.append("mimeType != 'application/vnd.google-apps.folder'") 
            if 'query' in data:
                query_parts.append(data['query'])
            if 'name' in data:
                query_parts.append(f"name contains '{data['name']}'")
            if 'type' in data:
                type_queries = []
                for type_value in data['type']:
                    type_queries.append(f"({type_value})")
                type_query = " or ".join(type_queries)
                type_query = f"({type_query})"
                query_parts.append(type_query)
            if 'parent' in data:
                 query_parts.append((f"'{data['parent']}' in parents"))
            if 'trashed' in data:
                query_parts.append(f"trashed={data['trashed']}")
            query = " and ".join(query_parts)
            service = create_service(access_token,'drive', 'v3')
            if not query:
                files = service.files().list(**data).execute()
            else:
                data2 = {}
                for key, value in data.items():
                    if key=='name':
                        continue
                    if key=='type':
                         continue
                    if key=='query':
                         continue
                    if key=='parent':
                         continue
                    if key=='trashed':
                         continue
                    if value:
                        data2[key] = value
                files = service.files().list(**data2,q=query).execute()
            return files
    except Exception as e:
        return {"Error": str(e)}

def googledrive_get_many_folders(json_cred, params, **kwargs):
    """
    Get a list of folders from Google Drive based on specified criteria.

    :param str access_token:
        The access token for authenticating with Google Drive. (required)

    :param dict params:
        - pageSize (int): The maximum number of folders to return per page.(optional)
        - parent (str): The ID of the parent folder.(optional)
        - trashed (bool): Whether to include trashed folders.(optional)
        - fields (str): The fields to include in the response.(optional)
        - query (str): A custom query string for additional filtering.(optional)
        - name (str): The name of the folder to searc   h for.(optional)

    :return: A dictionary containing information about the folders matching the criteria.
    :rtype: dict
    """
    try:
            cred=json.loads(json_cred)
            access_token=create_token(cred)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            query_parts = []
            query_parts.append("mimeType ='application/vnd.google-apps.folder'") 
            if 'query' in data:
                query_parts.append(data['query'])
            if 'name' in data:
                query_parts.append(f"name contains '{data['name']}'")
            if 'parent' in data:
                 query_parts.append((f"'{data['parent']}' in parents"))
            if 'trashed' in data:
                query_parts.append(f"trashed={data['trashed']}")
            query = " and ".join(query_parts)
            service = create_service(access_token,'drive', 'v3')
            if not query:
                files = service.files().list(**data).execute()
            else:
                data2 = {}
                for key, value in data.items():
                    if key=='name':
                        continue
                    if key=='query':
                         continue
                    if key=='parent':
                         continue
                    if key=='trashed':
                         continue
                    if value:
                        data2[key] = value
                files = service.files().list(**data2,q=query).execute()
            return files
    except Exception as e:
        return {"Error": str(e)}
    
def googledrive_get_file(json_cred, params, **kwargs):
    """
    Retrieves a file from Google Drive and uploads it to a server endpoint.

    :param str access_token:
            The access token for authenticating with Google Drive. (required)

    :param dict params: Dictionary containing parameters for the file retrieval and upload.

            Required keys:
            - "fileId": The ID of the file in Google Drive.
            - "flow_id": (str, Required) - The flow id of the flow to upload the media to.
            - "user_id": (str, required) - The user id of the flow to upload the media to.

    :return: A dictionary containing the response from the upload server.
    :rtype: dict

    """
    # Map basic MIME types to file extensions
    MIME_TYPE_EXTENSION_MAP = {
        'application/pdf': 'pdf',
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'text/plain': 'txt',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'application/msword': 'doc',
        'application/vnd.ms-excel': 'xls',
        'application/zip': 'zip',
        'application/x-zip-compressed': 'zip',
    }
    # Handle Google Docs-native types
    export_mime_map = {
        'application/vnd.google-apps.document': ('application/pdf', 'pdf'),
        'application/vnd.google-apps.spreadsheet': ('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx'),
        'application/vnd.google-apps.presentation': ('application/pdf', 'pdf'),
    }
    try:
        cred=json.loads(json_cred)
        accesstoken = create_token(cred)
        service = create_service(accesstoken, "drive", "v3")
        if 'fileId' in params:
            fileId = params['fileId']
            # Get file metadata
            file_metadata = service.files().get(fileId=fileId).execute()
            mime_type = file_metadata.get("mimeType", "application/octet-stream")
            if mime_type in export_mime_map:
                export_mime, file_extension = export_mime_map[mime_type]
                request = service.files().export(fileId=fileId, mimeType=export_mime)
            else:
                # Fallback to binary media download
                request = service.files().get_media(fileId=fileId)
            # Download the file
            file_stream = BytesIO()
            downloader = MediaIoBaseDownload(file_stream, request)
            downloader.next_chunk()
            file_content = file_stream.getvalue()
            if kwargs:
                # Extra conv_id & dialogue_id
                dialogue_id = kwargs.get("dialogue_id")
                conv_id = kwargs.get("conv_id")
                fileData = upload_file(dialogue_id, conv_id, file_content)
            return fileData
        else:
            raise Exception("Missing input data")
    except Exception as e:
        return {"Error": str(e)}




operations = {
    'List Files':googledrive_get_many_files,
    'Create Folder':googledrive_create_folder,
    'Delete File':googledrive_delete_file,
    'Share File':googledrive_share_file,
    'Copy File':googledrive_copy_file,
    'Move File':googledrive_move_file,
    'Create File':googledrive_create_file_text,
    'Upload File':googledrive_upload_file,
    'Update File':googledrive_update_file,
    'Delete Folder':googledrive_delete_file,
    'Move Folder':googledrive_move_file,
    'Share Folder':googledrive_share_file,
    'List Folders':googledrive_get_many_folders,
    'Get File':googledrive_get_file
}
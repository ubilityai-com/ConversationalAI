from mcp.server.fastmcp import FastMCP
from typing import Optional
from pydantic import BaseModel, Field
import os, sys

apps = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(apps)

from mcpLibraries import googleDrive

mcp = FastMCP("GoogleDriveMcpServer")

class CreateGoogleDriveFolderBody(BaseModel):
    name: str = Field(None, description="The name of the folder.")
    parents: Optional[list] = Field(None, description="A list of parent folder IDs. If not provided, the folder will be created in the root directory.")


class CreateGoogleDriveFolderInput(BaseModel):
    body: CreateGoogleDriveFolderBody = Field(description="the body of the request to create a new folder in Google Drive. contains information about the folder to be created.")


class DeleteGoogleDriveItemBody(BaseModel):
    trashed: Optional[bool] = Field(None, description="whether to move the item to the trash (true) or permanently delete it (false). If not provided, the item will be permanantly deleted by default.")


class DeleteGoogleDriveItemInput(BaseModel):
    fileId: str = Field(description="The ID of the file or folder to be deleted.")
    body: Optional[DeleteGoogleDriveItemBody] = Field(None ,description="the body of the request to delete a file or folder in Google Drive. contains information about the deletion action.")


class ShareGoogleDriveItemBody(BaseModel):
    role: Optional[str] = Field(None, description="The role to grant the user or group. Valid values are (owner, reader, writer). If not provided, the default is (reader).")
    type: Optional[str] = Field(None, description="The type of the grantee. Valid values are (user, group, domain, anyone). If not provided, the default is (user).")
    emailAddress: Optional[str] = Field(None, description="The email address of the user or group to which this permission refers. This is required if type is (user, or group). If not provided, the default is None.")
    domain: Optional[str] = Field(None, description="The domain to which this permission refers. This is required if type is (domain). If not provided, the default is None.")
    allowFileDiscovery: Optional[bool] = Field(None, description="whether to allow the shared file or folder to be discovered by other users through search. If not provided, the default is true.")


class ShareGoogleDriveItemInput(BaseModel):
    fileId: str = Field(description="The ID of the file or folder to be shared.")
    emailMessage: Optional[str] = Field(None, description="An optional message to include in the email notification.")
    sendNotificationEmail: Optional[bool] = Field(None, description="whether to send a notification email to the users being shared with. If not provided, the default is true.")
    useDomainAdminAccess: Optional[bool] = Field(None, description="whether to use domain-wide delegation of authority to share the item. If not provided, the default is false.")
    transferOwnership: Optional[bool] = Field(None, description="whether to transfer ownership of the item to the user being shared with. If not provided, the default is false.")
    body: Optional[ShareGoogleDriveItemBody] = Field(None ,description="the body of the request to share a file or folder in Google Drive. contains information about the sharing action.")


class CopyGoogleDriveFileBody(BaseModel):
    name: Optional[str] = Field(None, description="The name of the copied file. If not provided, “Copy of {original file name}” will be used.")
    description: Optional[str] = Field(None, description="A description of the copied file. If not provided, the description of the original file will be used.")
    parents: Optional[list] = Field(None, description="A list of parent folder IDs where the copied file will be placed. If not provided, the copied file will be placed in the root directory.")


class CopyGoogleDriveFileInput(BaseModel):
    fileId: str = Field(description="The ID of the file to be copied.")
    body: Optional[CopyGoogleDriveFileBody] = Field(None ,description="the body of the request to copy a file in Google Drive. contains information about the copied file.")


class MoveGoogleDriveItemInput(BaseModel):
    fileId: str = Field(description="The ID of the file or folder to be moved.")
    addParents: str = Field(description="ID of the folder where the file or folder should be moved. If not provided, the file or folder will be moved to the root directory.")


class CreateGoogleDriveTextFileBody(BaseModel):
    name: Optional[str] = Field(None, description="The name of the new file.")
    parents: Optional[list] = Field(None, description="A list of parent folder IDs where the new folder should be created. If not provided, the file will be created in the root directory.")


class CreateGoogleDriveTextFileInput(BaseModel):
    content: str = Field(description="The content to be added to the file.")
    ocrLanguage: Optional[str] = Field(None, description="The language to use for OCR (Optical Character Recognition). If not provided, the default is en (English).")
    useContentAsIndexableText: Optional[bool] = Field(None, description="Whether to use the content as indexable text. If not provided, the default is true.")
    properties: Optional[list] = Field(None, description="A list of custom properties to be added to the file. Each property should be a dictionary with keys (key, value). If not provided, the default is an empty list.")
    appProperties: Optional[list] = Field(None, description="A list of custom application-specific properties to be added to the file. Each property should be a dictionary with keys (key, value). If not provided, the default is an empty list.")
    body: Optional[CreateGoogleDriveTextFileBody] = Field(None ,description="the body of the request to create a new text file in Google Drive. contains information about the new file to be created.")


class GetManyGoogleDriveFilesInput(BaseModel):
    pageSize: Optional[int] = Field(None ,description="The maximum number of files to return per page. If not provided, the default is 100.")
    parent: Optional[str] = Field(None ,description="The ID of the parent folder. If not provided, the default is the root directory.")
    trashed: Optional[bool] = Field(None ,description="Whether to include trashed files. If not provided, the default is false (do not include trashed files).")
    type: Optional[list] = Field(None ,description="A list of MIME types to filter the search. If not provided, the default is to include all file types.")
    query: Optional[str] = Field(None ,description="The search query to filter the files. If not provided, the default is to include all files.")
    name: Optional[str] = Field(None ,description="The name of the file to search for. If not provided, the default is to include all files.")


class GetManyGoogleDriveFoldersInput(BaseModel):
    pageSize: Optional[int] = Field(None ,description="The maximum number of folders to return per page. If not provided, the default is 100.")
    parent: Optional[str] = Field(None ,description="The ID of the parent folder. If not provided, the default is the root directory.")
    trashed: Optional[bool] = Field(None ,description="Whether to include trashed folders. If not provided, the default is false (do not include trashed folders).")
    query: Optional[str] = Field(None ,description="The search query to filter the folders. If not provided, the default is to include all folders.")
    name: Optional[str] = Field(None ,description="The name of the folder to search for. If not provided, the default is to include all folders.")


@mcp.tool()
async def googledrive_create_folder(params: CreateGoogleDriveFolderInput) -> dict:
    """
    Create a new folder in Google Drive.
    """
    try:
        creds = f'{{"clientID": "{os.environ.get("GOOGLE_DRIVE_CLIENT_ID")}", "clientSecret": "{os.environ.get("GOOGLE_DRIVE_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLE_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GOOGLE_REFRESH_TOKEN")}", "expirey": "{os.environ.get("GOOGLE_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        if "body" in params:
            params["body"]["mimeType"] = "application/vnd.google-apps.folder"
        else:
            params["body"] = {"mimeType" : "application/vnd.google-apps.folder"}
        response = googleDrive.googledrive_create_folder(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def googledrive_delete_file(params: DeleteGoogleDriveItemInput) -> dict:
    """
    Delete a file or folder from Google Drive.
    """
    try:
        creds = f'{{"clientID": "{os.environ.get("GOOGLE_DRIVE_CLIENT_ID")}", "clientSecret": "{os.environ.get("GOOGLE_DRIVE_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLE_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GOOGLE_REFRESH_TOKEN")}", "expirey": "{os.environ.get("GOOGLE_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleDrive.googledrive_delete_file(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def googledrive_share_file(params: ShareGoogleDriveItemInput) -> dict:
    """
    Share a file or folder in Google Drive with specified permissions.
    """
    try:
        creds = f'{{"clientID": "{os.environ.get("GOOGLE_DRIVE_CLIENT_ID")}", "clientSecret": "{os.environ.get("GOOGLE_DRIVE_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLE_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GOOGLE_REFRESH_TOKEN")}", "expirey": "{os.environ.get("GOOGLE_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleDrive.googledrive_share_file(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def googledrive_copy_file(params: CopyGoogleDriveFileInput) -> dict:
    """
    Copy a file on Google Drive.
    """
    try:
        creds = f'{{"clientID": "{os.environ.get("GOOGLE_DRIVE_CLIENT_ID")}", "clientSecret": "{os.environ.get("GOOGLE_DRIVE_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLE_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GOOGLE_REFRESH_TOKEN")}", "expirey": "{os.environ.get("GOOGLE_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleDrive.googledrive_copy_file(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def googledrive_move_file(params: MoveGoogleDriveItemInput) -> dict:
    """
    Move a file or folder on Google Drive.
    """
    try:
        creds = f'{{"clientID": "{os.environ.get("GOOGLE_DRIVE_CLIENT_ID")}", "clientSecret": "{os.environ.get("GOOGLE_DRIVE_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLE_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GOOGLE_REFRESH_TOKEN")}", "expirey": "{os.environ.get("GOOGLE_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleDrive.googledrive_move_file(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def googledrive_create_file_text(params: CreateGoogleDriveTextFileInput) -> dict:
    """
    Create a new text file in Google Drive.
    """
    try:
        creds = f'{{"clientID": "{os.environ.get("GOOGLE_DRIVE_CLIENT_ID")}", "clientSecret": "{os.environ.get("GOOGLE_DRIVE_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLE_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GOOGLE_REFRESH_TOKEN")}", "expirey": "{os.environ.get("GOOGLE_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleDrive.googledrive_create_file_text(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def googledrive_get_many_files(params: GetManyGoogleDriveFilesInput) -> dict:
    """
    Get a list of files from Google Drive based on specified criteria.
    """
    try:
        creds = f'{{"clientID": "{os.environ.get("GOOGLE_DRIVE_CLIENT_ID")}", "clientSecret": "{os.environ.get("GOOGLE_DRIVE_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLE_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GOOGLE_REFRESH_TOKEN")}", "expirey": "{os.environ.get("GOOGLE_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        params["fields"] = "*"
        response = googleDrive.googledrive_get_many_files(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def googledrive_get_many_folders(params: GetManyGoogleDriveFoldersInput) -> dict:
    """
    Get a list of folders from Google Drive based on specified criteria.
    """
    try:
        creds = f'{{"clientID": "{os.environ.get("GOOGLE_DRIVE_CLIENT_ID")}", "clientSecret": "{os.environ.get("GOOGLE_DRIVE_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLE_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GOOGLE_REFRESH_TOKEN")}", "expirey": "{os.environ.get("GOOGLE_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        params["fields"] = "*"
        response = googleDrive.googledrive_get_many_folders(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"


if __name__ == "__main__":
    mcp.run()
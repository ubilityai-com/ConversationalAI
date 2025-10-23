import aiohttp, sys, os, json
import base64

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from applications.functions import get_file_data, upload_file


status = [200, 201, 202, 204, 206, 207, 208]


async def onedrive_refresh_access_token(creds):
    try:
        cred = json.loads(creds)
        token_endpoint = "https://login.microsoftonline.com/common/oauth2/v2.0/token"
        request_body = {
            "client_id": cred["clientId"],
            "client_secret": cred["clientSecret"],
            "scope": " ".join(
                ["https://graph.microsoft.com/.default"] + ["offline_access"]
            ),
            "refresh_token": cred["refreshToken"],
            "grant_type": "refresh_token",
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(token_endpoint, data=request_body) as response:
                response.raise_for_status()
                result = await response.json()
                if "access_token" in result and response.status in status:
                    return result["access_token"]
                else:
                    raise Exception(
                        f"Token request failed with status code {response.status}: {await response.text()}"
                    )
    except aiohttp.ClientError as e:
        raise Exception(e)
    except Exception as e:
        raise Exception(e)


################################################################################################################

async def onedrive_get_file(json_cred, params, **kwargs):
    """
    Retrieve a file from OneDrive using the Microsoft Graph API.

    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :file_id: (str,required) - ID of the file to be retrieved.

    Returns:
        dict: Details of the retrieved file.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "file_id" in params:
            file_id = params["file_id"]
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/items/{file_id}"
            headers = {
                "Authorization": "Bearer " + access_token
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url=graph_api_url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def onedrive_copy_file(json_cred, params, **kwargs):
    """
    Asynchronously creates a copy of an driveItem (including any children), under a new parent item or with a new name. using the Graph API

    :accessToken: Access token String for authentication with Microsoft Graph API.
    :params: Dictionary containing parameters.

    - :file_id: (str,required) - ID of the file to be copied.
    - :name: (str,optional) - The new name for the copy. If this isn't provided, the same name will be used as the original.
    - :parentReference: (dict,required) - dictionary containing information about the parent destination for the copy operation
    
        - :driveId: (str,optional) - Unique identifier of the drive instance that contains the driveItem.
        - :driveType: (str,optional) - Identifies the type of drive.
        - :id: (str,optional) - Unique identifier of the driveItem in the drive or a listItem in a list.
        - :name: (str,optional) - The name of the item being referenced.
        - :path: (str,optional) - Path that can be used to navigate to the item.
        - :shareId: (str,optional) - A unique identifier for a shared resource that can be accessed via the `Shares <https://learn.microsoft.com/en-us/graph/api/shares-get?view=graph-rest-1.0>`_ API.
        - :siteId: (str,optional) - For OneDrive for Business and SharePoint, this property represents the ID of the site that contains the parent document library of the driveItem resource or the parent list of the listItem resource. The value is the same as the id property of that `site <https://learn.microsoft.com/en-us/graph/api/resources/site?view=graph-rest-1.0>`_ resource. It is an `opaque string that consists of three identifiers <https://learn.microsoft.com/en-us/graph/api/resources/site#id-property>`_ of the site. For OneDrive, this property is not populated.
        - :sharepointIds: (dict,optional) - Returns identifiers useful for SharePoint REST compatibility. 
        
            - :listId: (str,optional) - The unique identifier (guid) for the item's list in SharePoint.

    Returns:
        dict: Confirmation message after successful copying.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "file_id" in params:
            file_id = params["file_id"]
            parentReference = params.get("parentReference", {})
            name = params.get("name", "")
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/items/{file_id}/copy"
            headers = {
                "Authorization": "Bearer " + access_token,
                "Content-type": "application/json"
            }
            data = {}
            if parentReference:
                data["parentReference"] = parentReference
            if name:
                data["name"] = name
            
            async with aiohttp.ClientSession() as session:
                async with session.post(url=graph_api_url, headers=headers, json=data) as response:
                    response.raise_for_status()
                    if response.status == 202:
                        return {
                            "message": "File copied successfully!", 
                            "copy details link": response.headers.get("Location"),
                        }
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def onedrive_delete_file(json_cred, params, **kwargs):
    """
    Delete a DriveItem by using its ID. Deleting items using this method moves the items to the recycle bin instead of permanently deleting the item.

    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :file_id: (str,required) - ID of the file to be deleted.

    Returns:
        dict: Confirmation message after successful deletion.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "file_id" in params:
            file_id = params["file_id"]
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/items/{file_id}"
            headers = {
                "Authorization": "Bearer " + access_token,
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.delete(url=graph_api_url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 204:
                        return {"message": "File deleted successfully!"}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def onedrive_create_new_text_file(json_cred, params, **kwargs):
    """
    Provide the contents of a new text file in a single API call. This method only supports files up to 250 MB in size.

    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :parent_folder_id: (str,required) - ID of the parent folder the file needs to be uploaded to.
        - :name: (str,required) - the new name to be assigned to the file.
        - :content: (str,required) - the string content of the new text file to be created
    
    Returns:
        dict: contains a driveItem resource for the newly created file.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "parent_folder_id" in params and "name" in params and "content" in params:
            parent_folder_id = params["parent_folder_id"]
            name = params["name"]
            content = params["content"]
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/items/{parent_folder_id}:/{name}:/content"
            headers = {
                "Authorization": "Bearer " + access_token,
                "Content-type": "text/plain"
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.put(url=graph_api_url, headers=headers, data=content) as response:
                    response.raise_for_status()
                    if response.status == 201:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def onedrive_download_file(json_cred, params, **kwargs):
    """
    Retrieve a file download link from OneDrive using the Microsoft Graph API.

    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :file_id: (str,required) - ID of the file to be downloaded.

    Returns:
        dict: the downloaded file.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "file_id" in params:
            file_id = params["file_id"]
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/items/{file_id}/content"
            headers = {
                "Authorization": "Bearer " + access_token
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url=graph_api_url, headers=headers) as response:
                    response.raise_for_status()
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
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def onedrive_rename_file(json_cred, params, **kwargs):
    """
    Renames File with the provided name using Microsoft Graph API.

    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :file_id: (str,required) - ID of the file to be renamed.
        - :name: (str,required) - the new name to be assigned to the file.
    
    Returns:
        dict: driveItem resource of the renamed file.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "file_id" in params and "name" in params:
            file_id = params["file_id"]
            name = params["name"]
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/items/{file_id}"
            headers = {
                "Authorization": "Bearer " + access_token,
                "Content-type": "application/json"
            }
            data = {}
            data["name"] = name
            async with aiohttp.ClientSession() as session:
                async with session.patch(url=graph_api_url, headers=headers, json=data) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}




async def onedrive_search_file(json_cred, params, **kwargs):
    """
    Search the hierarchy of items for items matching a query. using the Microsoft Graph API.

    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :query: (str,required) - The query text used to search for items. Values may be matched across several fields including filename, metadata, and file content.

    Returns:
        dict: collection of DriveItems that match the search criteria. If no items were found, an empty collection is returned.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "query" in params:
            query = params["query"]
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/search(q='{query}')"
            headers = {
                "Authorization": "Bearer " + access_token,
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url=graph_api_url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def onedrive_share_file(json_cred, params, **kwargs):
    """
    creates a sharing link for DriveItem using Microsoft Graph API.

    :accessToken: Access token String for authentication with Microsoft Graph API.
    :params: Dictionary containing parameters.

    - :file_id: (str,required) - ID of the file to be shared.
    - :type: (str,required) - The type of sharing link to create. (view, edit, embed)
    - :scope: (str,required) - The scope of link to create. (anonymous, organization, users)
    - :password: (str,optional) - The password of the sharing link that is set by the creator. Optional and OneDrive Personal only.
    - :expirationDateTime: (str,optional) - A String with format of yyyy-MM-ddTHH:mm:ssZ of DateTime indicates the expiration time of the permission.
    - :retainInheritedPermissions: (bool,optional) - Optional. 
    
        If true (default), any existing inherited permissions are retained on 
        
        the shared item when sharing this item for the first time. 
        
        If false, all existing permissions are removed when sharing 
        
        for the first time.
    
    
    Returns:
        dict: returns a single Permission resource in the response body that represents the requested sharing permission.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "file_id" in params and "type" in params and "scope" in params:
            file_id = params["file_id"]
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/items/{file_id}/createLink"
            headers = {
                "Authorization": "Bearer " + access_token,
                "Content-type": "application/json"
            }
            data = {}
            ignore_keys = ["file_id"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            async with aiohttp.ClientSession() as session:
                async with session.post(url=graph_api_url, headers=headers, json=data) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def onedrive_upload_file(json_cred, params, **kwargs):
    """
    Provide the contents of a file in a single API call. This method only supports files up to 250 MB in size.

    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :parent_folder_id: (str,required) - ID of the parent folder the file needs to be uploaded to.
        - :name: (str,required) - the name to be assigned to the uploaded file as well as its extension.
        - :content_type: (str,required) - the value of the Content-type parameter to be included in the header that describes the type of the file.for more information see this `page <https://www.geeksforgeeks.org/http-headers-content-type/>`_.
        - :content_choice: (str,required) - choice for whether the user wants to upload a file by uploading it's bytestring or by providing a url. Optional Values: (byteString, url)
        - :content: (str,optional) - the base64 byte string content of the file to be uploaded. (is required when the value of content_choice is byteString)
        - :url: (str,optional) - the link containing the file to be uploaded. (is required when the value of content_choice is url)
    
    Returns:
        dict: contains a driveItem resource for the newly uploaded file.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "parent_folder_id" in params and "name" in params and "content_choice" in params and "content_type" in params:
            parent_folder_id = params["parent_folder_id"]
            name = params["name"]
            content_choice = params["content_choice"]
            content_type = params["content_type"]
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/items/{parent_folder_id}:/{name}:/content"
            headers = {
                "Authorization": "Bearer " + access_token,
                "Content-type": content_type,
            }
            body = ""
            async with aiohttp.ClientSession() as session:
                if content_choice == "byteString" and "content" in params:
                    content = params["content"]
                    # Retrieve file content data
                    if kwargs:
                        # Extra conv_id & dialogue_id
                        dialogue_id = kwargs.get("dialogue_id")
                        conv_id = kwargs.get("conv_id")

                    contentData = get_file_data(dialogue_id,conv_id,content)
                    if "Error" in contentData:
                        raise Exception(f"Failed to retrieve file content: {contentData['Error']}")
                    # Extract and decode the file content from hex to bytes
                    body = bytes.fromhex(contentData["file_content"])
                elif content_choice == "url" and "url" in params:
                    try:
                        async with session.get(params["url"]) as url_response:
                            url_response.raise_for_status()
                            if url_response.status in status:
                                body = await url_response.read()
                            else:
                                raise Exception(
                                    f"Status Code: {url_response.status}. Response: {await url_response.text()}"
                                )
                    except aiohttp.ClientError as e:
                        raise Exception(f"Error downloading file from URL: {e}")
                    except Exception as err:
                        raise Exception(f"Error downloading file from URL: {e}")
                    if not body:
                        raise Exception("File content is empty.")
                else:
                    raise Exception("missing input data")
                async with session.put(url=graph_api_url, headers=headers, data=body) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}






async def onedrive_create_folder(json_cred, params, **kwargs):
    """
    Create a new folder or DriveItem in a Drive with a specified parent item or path.
    
    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :name: (str,required) - the name to be assigned to the new folder.
        - :parent_folder_id: (str,optional) - ID of the parent folder of the new folder. if absent, the new folder will be created in the root folder.
    
    Returns:
        dict: driveItem resource of the newly created folder.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "name" in params:
            name = params["name"]
            if "parent_folder_id" in params:
                parent_folder_id = params["parent_folder_id"]
                graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/items/{parent_folder_id}/children"
            else:
                graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/root/children"
            
            headers = {
                "Authorization": "Bearer " + access_token,
                "Content-type": "application/json"
            }
            data = {
                "name": name,
                "folder": { },
                "@microsoft.graph.conflictBehavior": "rename"
            }
            async with aiohttp.ClientSession() as session:
                async with session.post(url=graph_api_url, headers=headers, json=data) as response:
                    response.raise_for_status()
                    if response.status == 201:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def onedrive_delete_folder(json_cred, params, **kwargs):
    """
    Delete a DriveItem by using its ID or path. Deleting items using this method moves the items to the recycle bin instead of permanently deleting the item.

    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :folder_id: (str,required) - ID of the folder to be deleted.

    Returns:
        dict: Confirmation message after successful deletion.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "folder_id" in params:
            folder_id = params["folder_id"]
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/items/{folder_id}"
            headers = {
                "Authorization": "Bearer " + access_token,
            }
            async with aiohttp.ClientSession() as session:
                async with session.delete(url=graph_api_url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 204:
                        return {"message": "Folder deleted successfully!"}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def onedrive_get_items_in_folder(json_cred, params, **kwargs):
    """
    Return a collection of DriveItems in the children relationship of a DriveItem.

    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :folder_id: (str,required) - ID of the folder containing the items to be retrieved.

    Returns:
        dict: the list of items in the children collection of the target item. The children collection will be composed of driveItem resources.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "folder_id" in params:
            folder_id = params["folder_id"]
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/items/{folder_id}/children"
            headers = {
                "Authorization": "Bearer " + access_token
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url=graph_api_url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def onedrive_rename_folder(json_cred, params, **kwargs):
    """
    Renames Folder with the provided name using Microsoft Graph API.
    
    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :folder_id: (str,required) - ID of the folder to be renamed.
        - :name: (str,required) - the new name to be assigned to the folder.
    
    Returns:
        dict: driveItem resource of the renamed folder.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "folder_id" in params and "name" in params:
            folder_id = params["folder_id"]
            name = params["name"]
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/items/{folder_id}"
            headers = {
                "Authorization": "Bearer " + access_token,
                "Content-type": "application/json"
            }
            data = {}
            data["name"] = name
            async with aiohttp.ClientSession() as session:
                async with session.patch(url=graph_api_url, headers=headers, json=data) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def onedrive_search_folder(json_cred, params, **kwargs):
    """
    Search the hierarchy of items for items matching a query. using the Microsoft Graph API.

    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :query: (str,required) - The query text used to search for items. Values may be matched across several fields including filename, metadata, and file content.

    Returns:
        dict: collection of DriveItems that match the search criteria. If no items were found, an empty collection is returned.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "query" in params:
            query = params["query"]
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/root/search(q='{query}')"
            headers = {
                "Authorization": "Bearer " + access_token,
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url=graph_api_url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def onedrive_share_folder(json_cred, params, **kwargs):
    """
    creates a sharing link for DriveItem using Microsoft Graph API.

    :accessToken: Access token String for authentication with Microsoft Graph API.
    :params: Dictionary containing parameters.

    - :folder_id: (str,required) - ID of the folder to be to be shared.
    - :type: (str,required) - The type of sharing link to create. (view, edit,embed)
    - :scope: (str,required) - The scope of link to create. (anonymous, organization, users)
    - :password: (str,optional) - The password of the sharing link that is set by the creator. Optional and OneDrive Personal only.
    - :expirationDateTime: (str,optional) - A String with format of yyyy-MM-ddTHH:mm:ssZ of DateTime indicates the expiration time of the permission.
    - :retainInheritedPermissions: (bool,optional) - Optional. 
    
        If true (default), any existing inherited permissions are retained on 
        
        the shared item when sharing this item for the first time. 
        
        If false, all existing permissions are removed when sharing 
        
        for the first time.
    
    
    Returns:
        dict: returns a single Permission resource in the response body that represents the requested sharing permissions.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "folder_id" in params and "type" in params and "scope" in params:
            folder_id = params["folder_id"]
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/items/{folder_id}/createLink"
            headers = {
                "Authorization": "Bearer " + access_token,
                "Content-type": "application/json"
            }
            data = {}
            ignore_keys = ["folder_id"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            async with aiohttp.ClientSession() as session:
                async with session.post(url=graph_api_url, headers=headers, json=data) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def onedrive_download_file_from_sharelink(json_cred, params, **kwargs):
    """
    Retrieve a file download link from a share link using the Microsoft Graph API.

    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :share_link: (str,required) - share link of the file to get direct download link for

    Returns:
        dict: the downloaded file.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "share_link" in params:
            share_link = params["share_link"]
            base64_value = base64.urlsafe_b64encode(share_link.encode('utf-8')).decode('utf-8').rstrip('=')
            encoded_link = f'u!{base64_value}'
            graph_api_url = f"https://graph.microsoft.com/v1.0/shares/{encoded_link}/driveItem/content"
            headers = {
                "Authorization": "Bearer " + access_token
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url=graph_api_url, headers=headers) as response:
                    response.raise_for_status()
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
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}




async def onedrive_replace_file_content(json_cred, params, **kwargs):
    """
    Provide the contents of a file in a single API call, replacing the original file content. This method only supports files up to 250 MB in size.

    :param str accessToken: Access token for authentication with Microsoft Graph API.
    :param dict params: Dictionary containing parameters.

        - :flow_id: (str, required) - The flow id of the flow to upload the file to.
        - :user_id: (str, required) - The user id of the flow to upload the file to.
        - :item_id: (str,required) - ID of the file to replace the content of
        - :content_type: (str,required) - the value of the Content-type parameter to be included in the header that describes the type of the file.for more information see this `page <https://www.geeksforgeeks.org/http-headers-content-type/>`_.
        - :content_choice: (str,required) - choice for whether the user wants to upload a file by uploading it's bytestring or by providing a url. Optional Values: (byteString, url)
        - :content: (str,optional) - the base64 byte string content of the file to be uploaded. (is required when the value of content_choice is byteString)
        - :url: (str,optional) - the link containing the file to be uploaded. (is required when the value of content_choice is url)
    
    Returns:
        dict: contains a driveItem resource for the newly uploaded file.
    """
    try:
        access_token = await onedrive_refresh_access_token(json_cred)
        if "item_id" in params and "content_choice" in params and "content_type" in params:
            item_id = params["item_id"]
            content_choice = params["content_choice"]
            content_type = params["content_type"]
            graph_api_url = f"https://graph.microsoft.com/v1.0/me/drive/items/{item_id}/content"
            headers = {
                "Authorization": "Bearer " + access_token,
                "Content-type": content_type,
            }
            body = ""
            async with aiohttp.ClientSession() as session:
                if content_choice == "byteString" and "content" in params:
                    content = params["content"]
                    if kwargs:
                        # Extra conv_id & dialogue_id
                        dialogue_id = kwargs.get("dialogue_id")
                        conv_id = kwargs.get("conv_id")

                    contentData = get_file_data(dialogue_id,conv_id,content)
                    if "Error" in contentData:
                        raise Exception(f"Failed to retrieve file content: {contentData['Error']}")
                    # Extract and decode the file content from hex to bytes
                    body = bytes.fromhex(contentData["file_content"])
                elif content_choice == "url" and "url" in params:
                    try:
                        async with session.get(params["url"]) as url_response:
                            url_response.raise_for_status()
                            if url_response.status in status:
                                body = await url_response.read()
                            else:
                                raise Exception(
                                    f"Status Code: {url_response.status}. Response: {await url_response.text()}"
                                )
                    except aiohttp.ClientError as e:
                        raise Exception(f"Error downloading file from URL: {e}")
                    except Exception as err:
                        raise Exception(f"Error downloading file from URL: {e}")
                    if not body:
                        raise Exception("File content is empty.")
                else:
                    raise Exception("missing input data")
                async with session.put(url=graph_api_url, headers=headers, data=body) as response:
                    response.raise_for_status()
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}





operations = {
    'Get File':onedrive_get_file,
    'Copy File':onedrive_copy_file,
    'Delete File':onedrive_delete_file,
    'Create New Text File':onedrive_create_new_text_file,
    'Download File':onedrive_download_file,
    'Rename File':onedrive_rename_file,
    'Search File':onedrive_search_file,
    'Share File':onedrive_share_file,
    'Upload File':onedrive_upload_file,
    'Create Folder':onedrive_create_folder,
    'Delete Folder':onedrive_delete_folder,
    'Get Items in Folder':onedrive_get_items_in_folder,
    'Rename Folder':onedrive_rename_folder,
    'Search Folder':onedrive_search_folder,
    'Share Folder':onedrive_share_folder,
    'Download File From ShareLink':onedrive_download_file_from_sharelink,
    'Replace File Content':onedrive_replace_file_content
}
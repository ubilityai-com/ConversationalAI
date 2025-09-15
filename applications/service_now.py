import aiohttp, json, os, sys


sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from applications.functions import get_file_data, upload_file



############################################## Authentication ###################################################


async def service_now_refresh_access_token(creds):
    try:
        cred=json.loads(creds)
        required_creds=["instanceDomain", "clientID", "clientSecret", "refreshToken"]
        if all(param in cred for param in required_creds):
            my_instance_domain = cred["instanceDomain"]
            client_id = cred['clientID']
            client_secret = cred['clientSecret']
            refresh_token = cred['refreshToken']
            
            
            token_endpoint = f"https://{my_instance_domain}.service-now.com/oauth_token.do"
            headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            data = {
                'grant_type': "refresh_token",
                'client_id': client_id,
                'client_secret': client_secret,
                'refresh_token': refresh_token
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.post(url=token_endpoint, headers=headers, data=data) as response:
                    response_json = await response.json()
                    if "access_token" in response_json and response.status == 200:
                        access_token = response_json["access_token"]
                        return access_token,my_instance_domain
                    else:
                        raise Exception(
                            f"Token request failed with status code {response.status}: {await response.text()}"
                        )
        else:
            raise Exception("missing credentials")
    except Exception as error:
        raise Exception(str(error))



################################################ Code #####################################################

############################################## Attachments ###################################################

async def service_now_get_many_attachments(json_cred, params, **kwargs):
    """
    Returns the metadata for multiple attachments.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :sysparm_limit: (int) - Maximum number of records to return. Default: 1000
    - :sysparm_query: (str) - Encoded query used to filter the result set. You can use a UI filter to obtain a properly encoded query. if you want to generate a query graphically visit this `Page. <https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters>`_ if you want to generate a query graphically visit this `Page. <https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters>`_

    Returns:
        dict: a Dictionary containing a list of Attachments metadata matching the query

    """
    try:
        accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
        url = f"https://{instance_domain}.service-now.com/api/now/attachment"
        headers = {
            "Authorization": "Bearer " + accessToken,
            "Accept": "application/json"
        }
        ignore_keys = []
        data = {
            key: value
            for (key, value) in params.items()
            if value
            if key not in ignore_keys
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url=url, headers=headers, params=data) as response:
                if response.status == 200:
                    result = await response.json()
                    result["paging_urls"] = response.headers.get("Link")
                    return result
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def service_now_get_attachment(json_cred, params, **kwargs):
    """
    Returns the metadata for the attachment file with a specific sys_id value.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :attachment_id: (str, Required) - Sys_id of the Attachment to retrieve.
    - :download: (boolean) - Flag that indicates whether to download the attachment file content. Default: false
    

    Returns:
        dict: a Dictionary containing the specified Attachment metadata or the file ID if download is true

    """
    try:
        required_params=["attachment_id"]
        if all(param in params for param in required_params):
            accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
            attachment_id = params["attachment_id"]
            download = params.get("download", False)
            url = f"https://{instance_domain}.service-now.com/api/now/attachment/{attachment_id}"
            headers = {
                "Authorization": "Bearer " + accessToken
            }
            async with aiohttp.ClientSession() as session:
                if download:
                    down_url = url + "/file"
                    async with session.get(url=down_url, headers=headers) as response:
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
                    headers["Accept"] = "application/json"
                    async with session.get(url=url, headers=headers) as response:
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


async def service_now_upload_attachment(json_cred, params, **kwargs):
    """
    Uploads a specified file as an attachment to a specified record.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :file_name: (str, Required) - the name to be assigned to the uploaded Attachment.
    - :table_name: (str, Required) - Name of the table to attach the file to.
    - :table_sys_id: (str, Required) - Sys_id of the record in the table specified in table_name that you want to attach the file to. 
    - :content_type: (str, Required) - the value of the Content-type parameter to be included in the header that describes the type of the file.for more information see this `Page <https://www.geeksforgeeks.org/http-headers-content-type/>`_.
    - :url: (str) - the link containing the file to be uploaded. (Required when content is undefined)
    - :content: (str) - the file name referring to a file to upload present on the platform. (Required when url is undefined)

    Returns:
        dict: a Dictionary containing the uploaded Attachment metadata

    """
    try:
        required_and_params=["file_name", "table_name", "table_sys_id", "content_type"]
        required_or_params=["url", "content"]
        if all(param in params for param in required_and_params) and any(param in params for param in required_or_params):
            content_type = params["content_type"]
            url = params.get("url", "")
            content = params.get("content", "")
            body = None
            accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
            main_url = f"https://{instance_domain}.service-now.com/api/now/attachment/file"
            headers = {
                "Authorization": "Bearer " + accessToken,
                "Content-type": content_type,
                "Accept": "application/json"
            }
            ignore_keys = ["content", "url", "content_type"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            async with aiohttp.ClientSession() as session:
                if content:
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
                elif url:
                    try:
                        async with session.get(url) as url_response:
                            url_response.raise_for_status()
                            body = await url_response.read()
                    except aiohttp.ClientError as e:
                        raise Exception(f"Error downloading file from URL: {e}")
                    except Exception as err:
                        raise Exception(f"Error downloading file from URL: {e}")
                    if not body:
                        raise Exception("File content is empty.")
                else:
                    raise Exception("missing input data")
                async with session.post(url=main_url, headers=headers, params=data, data=body) as response:
                    if response.status == 201:
                        result = await response.json()
                        result["attachment_download_link"] = response.headers.get("Location")
                        return result
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def service_now_delete_attachment(json_cred, params, **kwargs):
    """
    This method deletes the attachment with a specific sys_id value.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :attachment_id: (str, Required) - Sys_id of the Attachment to delete.
    

    Returns:
        dict: a Dictionary containing the specified Attachment metadata

    """
    try:
        required_params=["attachment_id"]
        if all(param in params for param in required_params):
            accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
            attachment_id = params["attachment_id"]
            url = f"https://{instance_domain}.service-now.com/api/now/attachment/{attachment_id}"
            headers = {
                "Authorization": "Bearer " + accessToken
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.delete(url=url, headers=headers) as response:
                    if response.status == 204:
                        return {"message": "Attachment Deleted successfully", "attachment_id": attachment_id}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


############################################## Tables ###################################################

async def service_now_get_many_table_records(json_cred, params, **kwargs):
    """
    Retrieves multiple records for the specified table.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :table_id: (str, Required) - Name of the table from which to retrieve the records.
    - :sysparm_fields: (str) - Comma-separated list of fields to return in the response.
    - :sysparm_display_value: (str) - Determines the type of data returned, either the actual values from the database or the display values of the fields. Display values are manipulated based on the actual value in the database and user or system settings and preferences. If returning display values, the value that is returned is dependent on the field type. Possible Values: (true, false, all) explanation: (true: Returns the display values for all fields, false: Returns the actual values from the database, all: Returns both actual and display values)
    - :sysparm_limit: (int) - Maximum number of records to return. Default: 10000
    - :sysparm_query: (str) - Encoded query used to filter the result set. You can use a UI filter to obtain a properly encoded query. if you want to generate a query graphically visit this `Page. <https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters>`_ if you want to generate a query graphically visit this `Page. <https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters>`_
    - :sysparm_exclude_reference_link: (boolean) - Flag that indicates whether to exclude 
    
        Table API links for reference fields.
    

    Returns:
        dict: a Dictionary containing a list of records in the specified table

    """
    try:
        required_params=["table_id"]
        if all(param in params for param in required_params):
            accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
            table_id = params['table_id']
            url = f"https://{instance_domain}.service-now.com/api/now/table/{table_id}"
            headers = {
                "Authorization": "Bearer " + accessToken,
                "Accept": "application/json"
            }
            ignore_keys = ["table_id"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, params=data) as response:
                    if response.status == 200:
                        result = await response.json()
                        result["paging_urls"] = response.headers.get("Link")
                        result["total_count"] = response.headers.get("X-Total-Count")
                        return result
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def service_now_get_table_record(json_cred, params, **kwargs):
    """
    Retrieves the record identified by the specified sys_id from the specified table.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :table_id: (str, Required) - Name of the table from which to retrieve the records.
    - :record_id: (str, Required) - Sys_id of the record to retrieve.
    - :sysparm_fields: (str) - Comma-separated list of fields to return in the response.
    - :sysparm_display_value: (str) - Determines the type of data returned, either the actual values from the database or the display values of the fields. Display values are manipulated based on the actual value in the database and user or system settings and preferences. If returning display values, the value that is returned is dependent on the field type. Possible Values: (true, false, all) explanation: (true: Returns the display values for all fields, false: Returns the actual values from the database, all: Returns both actual and display values)
    - :sysparm_exclude_reference_link: (boolean) - Flag that indicates whether to exclude 
    
        Table API links for reference fields.
    

    Returns:
        dict: a Dictionary containing the specified record

    """
    try:
        required_params=["table_id", "record_id"]
        if all(param in params for param in required_params):
            accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
            table_id = params['table_id']
            record_id = params["record_id"]
            url = f"https://{instance_domain}.service-now.com/api/now/table/{table_id}/{record_id}"
            headers = {
                "Authorization": "Bearer " + accessToken,
                "Accept": "application/json"
            }
            ignore_keys = ["table_id", "record_id"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, params=data) as response:
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


async def service_now_create_table_record(json_cred, params, **kwargs):
    """
    Inserts one record in the specified table. 

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :table_id: (str, Required) - Name of the table from which to retrieve the records.
    - :added_fields: (dict, Required) - Dictionary containing Field name as key and the associated value as value for each parameter to define in the specified record. 

    Returns:
        dict: a Dictionary containing the newly created record

    """
    try:
        required_params=["table_id"]
        if all(param in params for param in required_params):
            accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
            table_id = params['table_id']
            added_fields = params["added_fields"]
            url = f"https://{instance_domain}.service-now.com/api/now/table/{table_id}"
            headers = {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, headers=headers, json=added_fields) as response:
                    if response.status == 201:
                        result = await response.json()
                        result["created_resource_location"] = response.headers.get("Location")
                        return result
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def service_now_update_table_record(json_cred, params, **kwargs):
    """
    Updates the specified record with the name-value pairs included in the request body.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :table_id: (str, Required) - Name of the table from which to retrieve the records.
    - :record_id: (str, Required) - Sys_id of the record to update.
    - :added_fields: (dict, Required) - Dictionary containing Field name as key and the associated value as value for each parameter to define in the specified record. 

    Returns:
        dict: a Dictionary containing the newly updated record

    """
    try:
        required_params=["table_id", "record_id"]
        if all(param in params for param in required_params):
            accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
            table_id = params['table_id']
            record_id = params["record_id"]
            added_fields = params["added_fields"]
            url = f"https://{instance_domain}.service-now.com/api/now/table/{table_id}/{record_id}"
            headers = {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.patch(url=url, headers=headers, json=added_fields) as response:
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


async def service_now_delete_table_record(json_cred, params, **kwargs):
    """
    Deletes the specified record from the specified table.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :table_id: (str, Required) - Name of the table from which to retrieve the records.
    - :record_id: (str, Required) - Sys_id of the record to retrieve.
    

    Returns:
        dict: a Dictionary containing a success message

    """
    try:
        required_params=["table_id", "record_id"]
        if all(param in params for param in required_params):
            accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
            table_id = params['table_id']
            record_id = params["record_id"]
            url = f"https://{instance_domain}.service-now.com/api/now/table/{table_id}/{record_id}"
            headers = {
                "Authorization": "Bearer " + accessToken,
                "Accept": "application/json"
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.delete(url=url, headers=headers) as response:
                    if response.status == 204:
                        return {"message": "Record Deleted successfully", "Record_id": record_id}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


############################################## Incidents ###################################################

async def service_now_get_many_incidents(json_cred, params, **kwargs):
    """
    Retrieves multiple records for the incident table.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :sysparm_fields: (str) - Comma-separated list of fields to return in the response.
    - :sysparm_display_value: (str) - Determines the type of data returned, either the actual values from the database or the display values of the fields. Display values are manipulated based on the actual value in the database and user or system settings and preferences. If returning display values, the value that is returned is dependent on the field type. Possible Values: (true, false, all) explanation: (true: Returns the display values for all fields, false: Returns the actual values from the database, all: Returns both actual and display values)
    - :sysparm_limit: (int) - Maximum number of records to return. Default: 10000
    - :sysparm_query: (str) - Encoded query used to filter the result set. You can use a UI filter to obtain a properly encoded query. if you want to generate a query graphically visit this `Page. <https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters>`_
    - :sysparm_exclude_reference_link: (boolean) - Flag that indicates whether to exclude 
    
        Table API links for reference fields.
    

    Returns:
        dict: a Dictionary containing a list of records in the incident table

    """
    try:
        accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
        url = f"https://{instance_domain}.service-now.com/api/now/table/incident"
        headers = {
            "Authorization": "Bearer " + accessToken,
            "Accept": "application/json"
        }
        ignore_keys = []
        data = {
            key: value
            for (key, value) in params.items()
            if value
            if key not in ignore_keys
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url=url, headers=headers, params=data) as response:
                if response.status == 200:
                    result = await response.json()
                    result["paging_urls"] = response.headers.get("Link")
                    result["total_count"] = response.headers.get("X-Total-Count")
                    return result
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def service_now_get_incident(json_cred, params, **kwargs):
    """
    Retrieves the record identified by the specified sys_id from the incident table.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :record_id: (str, Required) - Sys_id of the record to retrieve.
    - :sysparm_fields: (str) - Comma-separated list of fields to return in the response.
    - :sysparm_display_value: (str) - Determines the type of data returned, either the actual values from the database or the display values of the fields. Display values are manipulated based on the actual value in the database and user or system settings and preferences. If returning display values, the value that is returned is dependent on the field type. Possible Values: (true, false, all) explanation: (true: Returns the display values for all fields, false: Returns the actual values from the database, all: Returns both actual and display values)
    - :sysparm_exclude_reference_link: (boolean) - Flag that indicates whether to exclude 
    
        Table API links for reference fields.
    

    Returns:
        dict: a Dictionary containing the specified record

    """
    try:
        required_params=["record_id"]
        if all(param in params for param in required_params):
            accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
            record_id = params["record_id"]
            url = f"https://{instance_domain}.service-now.com/api/now/table/incident/{record_id}"
            headers = {
                "Authorization": "Bearer " + accessToken,
                "Accept": "application/json"
            }
            ignore_keys = ["record_id"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, params=data) as response:
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


async def service_now_create_incident(json_cred, params, **kwargs):
    """
    Inserts one record in the incident table. 

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :added_fields: (dict, Required) - Dictionary containing Field name as key and the associated value as value for each parameter to define in the specified record. 

    Returns:
        dict: a Dictionary containing the newly created record

    """
    try:
        accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
        added_fields = params["added_fields"]
        url = f"https://{instance_domain}.service-now.com/api/now/table/incident"
        headers = {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(url=url, headers=headers, json=added_fields) as response:
                if response.status == 201:
                    result = await response.json()
                    result["created_resource_location"] = response.headers.get("Location")
                    return result
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def service_now_update_incident(json_cred, params, **kwargs):
    """
    Updates the specified record with the name-value pairs included in the request body.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :record_id: (str, Required) - Sys_id of the record to update.
    - :added_fields: (dict, Required) - Dictionary containing Field name as key and the associated value as value for each parameter to define in the specified record. 

    Returns:
        dict: a Dictionary containing the newly updated record

    """
    try:
        required_params=["record_id"]
        if all(param in params for param in required_params):
            accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
            record_id = params["record_id"]
            added_fields = params["added_fields"]
            url = f"https://{instance_domain}.service-now.com/api/now/table/incident/{record_id}"
            headers = {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.patch(url=url, headers=headers, json=added_fields) as response:
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


async def service_now_delete_incident(json_cred, params, **kwargs):
    """
    Deletes the specified record from the incident table.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :record_id: (str, Required) - Sys_id of the record to retrieve.
    

    Returns:
        dict: a Dictionary containing a success message

    """
    try:
        required_params=["record_id"]
        if all(param in params for param in required_params):
            accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
            record_id = params["record_id"]
            url = f"https://{instance_domain}.service-now.com/api/now/table/incident/{record_id}"
            headers = {
                "Authorization": "Bearer " + accessToken,
                "Accept": "application/json"
            }
            async with aiohttp.ClientSession() as session:
                async with session.delete(url=url, headers=headers) as response:
                    if response.status == 204:
                        return {"message": "Record Deleted successfully", "Record_id": record_id}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



############################################## Users ###################################################

async def service_now_get_many_users(json_cred, params, **kwargs):
    """
    Retrieves multiple records for the user table.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :sysparm_fields: (str) - Comma-separated list of fields to return in the response.
    - :sysparm_display_value: (str) - Determines the type of data returned, either the actual values from the database or the display values of the fields. Display values are manipulated based on the actual value in the database and user or system settings and preferences. If returning display values, the value that is returned is dependent on the field type. Possible Values: (true, false, all) explanation: (true: Returns the display values for all fields, false: Returns the actual values from the database, all: Returns both actual and display values)
    - :sysparm_limit: (int) - Maximum number of records to return. Default: 10000
    - :sysparm_query: (str) - Encoded query used to filter the result set. You can use a UI filter to obtain a properly encoded query. if you want to generate a query graphically visit this `Page. <https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters>`_
    - :sysparm_exclude_reference_link: (boolean) - Flag that indicates whether to exclude 
    
        Table API links for reference fields.
    

    Returns:
        dict: a Dictionary containing a list of records in the user table

    """
    try:
        accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
        url = f"https://{instance_domain}.service-now.com/api/now/table/sys_user"
        headers = {
            "Authorization": "Bearer " + accessToken,
            "Accept": "application/json"
        }
        ignore_keys = []
        data = {
            key: value
            for (key, value) in params.items()
            if value
            if key not in ignore_keys
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url=url, headers=headers, params=data) as response:
                if response.status == 200:
                    result = await response.json()
                    result["paging_urls"] = response.headers.get("Link")
                    result["total_count"] = response.headers.get("X-Total-Count")
                    return result
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def service_now_get_user(json_cred, params, **kwargs):
    """
    Retrieves the record identified by the specified sys_id from the user table.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :record_id: (str, Required) - Sys_id of the record to retrieve.
    - :sysparm_fields: (str) - Comma-separated list of fields to return in the response.
    - :sysparm_display_value: (str) - Determines the type of data returned, either the actual values from the database or the display values of the fields. Display values are manipulated based on the actual value in the database and user or system settings and preferences. If returning display values, the value that is returned is dependent on the field type. Possible Values: (true, false, all) explanation: (true: Returns the display values for all fields, false: Returns the actual values from the database, all: Returns both actual and display values)
    - :sysparm_exclude_reference_link: (boolean) - Flag that indicates whether to exclude 
    
        Table API links for reference fields.
    

    Returns:
        dict: a Dictionary containing the specified record

    """
    try:
        required_params=["record_id"]
        if all(param in params for param in required_params):
            accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
            record_id = params["record_id"]
            url = f"https://{instance_domain}.service-now.com/api/now/table/sys_user/{record_id}"
            headers = {
                "Authorization": "Bearer " + accessToken,
                "Accept": "application/json"
            }
            ignore_keys = ["record_id"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, params=data) as response:
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


async def service_now_create_user(json_cred, params, **kwargs):
    """
    Inserts one record in the user table. 

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :added_fields: (dict, Required) - Dictionary containing Field name as key and the associated value as value for each parameter to define in the specified record. 

    Returns:
        dict: a Dictionary containing the newly created record

    """
    try:
        accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
        added_fields = params["added_fields"]
        url = f"https://{instance_domain}.service-now.com/api/now/table/sys_user"
        headers = {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(url=url, headers=headers, json=added_fields) as response:
                if response.status == 201:
                    result = await response.json()
                    result["created_resource_location"] = response.headers.get("Location")
                    return result
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



async def service_now_update_user(json_cred, params, **kwargs):
    """
    Updates the specified record with the name-value pairs included in the request body.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :record_id: (str, Required) - Sys_id of the record to update.
    - :added_fields: (dict, Required) - Dictionary containing Field name as key and the associated value as value for each parameter to define in the specified record. 

    Returns:
        dict: a Dictionary containing the newly updated record

    """
    try:
        required_params=["record_id"]
        if all(param in params for param in required_params):
            accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
            record_id = params["record_id"]
            added_fields = params["added_fields"]
            url = f"https://{instance_domain}.service-now.com/api/now/table/sys_user/{record_id}"
            headers = {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            async with aiohttp.ClientSession() as session:
                async with session.patch(url=url, headers=headers, json=added_fields) as response:
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


async def service_now_delete_user(json_cred, params, **kwargs):
    """
    Deletes the specified record from the user table.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :record_id: (str, Required) - Sys_id of the record to retrieve.
    

    Returns:
        dict: a Dictionary containing a success message

    """
    try:
        required_params=["record_id"]
        if all(param in params for param in required_params):
            accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
            record_id = params["record_id"]
            url = f"https://{instance_domain}.service-now.com/api/now/table/sys_user/{record_id}"
            headers = {
                "Authorization": "Bearer " + accessToken,
                "Accept": "application/json"
            }
            async with aiohttp.ClientSession() as session:
                async with session.delete(url=url, headers=headers) as response:
                    if response.status == 204:
                        return {"message": "Record Deleted successfully", "Record_id": record_id}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



############################################## User Groups ###################################################

async def service_now_get_many_user_groups(json_cred, params, **kwargs):
    """
    Retrieves multiple records for the user groups table.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :sysparm_fields: (str) - Comma-separated list of fields to return in the response.
    - :sysparm_display_value: (str) - Determines the type of data returned, either the actual values from the database or the display values of the fields. Display values are manipulated based on the actual value in the database and user or system settings and preferences. If returning display values, the value that is returned is dependent on the field type. Possible Values: (true, false, all) explanation: (true: Returns the display values for all fields, false: Returns the actual values from the database, all: Returns both actual and display values)
    - :sysparm_limit: (int) - Maximum number of records to return. Default: 10000
    - :sysparm_query: (str) - Encoded query used to filter the result set. You can use a UI filter to obtain a properly encoded query. if you want to generate a query graphically visit this `Page. <https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters>`_
    - :sysparm_exclude_reference_link: (boolean) - Flag that indicates whether to exclude 
    
        Table API links for reference fields.
    

    Returns:
        dict: a Dictionary containing a list of records in the user groups table

    """
    try:
        accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
        url = f"https://{instance_domain}.service-now.com/api/now/table/sys_user_group"
        headers = {
            "Authorization": "Bearer " + accessToken,
            "Accept": "application/json"
        }
        ignore_keys = []
        data = {
            key: value
            for (key, value) in params.items()
            if value
            if key not in ignore_keys
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url=url, headers=headers, params=data) as response:
                if response.status == 200:
                    result = await response.json()
                    result["paging_urls"] = response.headers.get("Link")
                    result["total_count"] = response.headers.get("X-Total-Count")
                    return result
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



############################################## User Roles ###################################################

async def service_now_get_many_user_roles(json_cred, params, **kwargs):
    """
    Retrieves multiple records for the user roles table.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :sysparm_fields: (str) - Comma-separated list of fields to return in the response.
    - :sysparm_display_value: (str) - Determines the type of data returned, either the actual values from the database or the display values of the fields. Display values are manipulated based on the actual value in the database and user or system settings and preferences. If returning display values, the value that is returned is dependent on the field type. Possible Values: (true, false, all) explanation: (true: Returns the display values for all fields, false: Returns the actual values from the database, all: Returns both actual and display values)
    - :sysparm_limit: (int) - Maximum number of records to return. Default: 10000
    - :sysparm_query: (str) - Encoded query used to filter the result set. You can use a UI filter to obtain a properly encoded query. if you want to generate a query graphically visit this `Page. <https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters>`_
    - :sysparm_exclude_reference_link: (boolean) - Flag that indicates whether to exclude 
    
        Table API links for reference fields.
    

    Returns:
        dict: a Dictionary containing a list of records in the user roles table

    """
    try:
        accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
        url = f"https://{instance_domain}.service-now.com/api/now/table/sys_user_role"
        headers = {
            "Authorization": "Bearer " + accessToken,
            "Accept": "application/json"
        }
        ignore_keys = []
        data = {
            key: value
            for (key, value) in params.items()
            if value
            if key not in ignore_keys
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url=url, headers=headers, params=data) as response:
                if response.status == 200:
                    result = await response.json()
                    result["paging_urls"] = response.headers.get("Link")
                    result["total_count"] = response.headers.get("X-Total-Count")
                    return result
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



############################################## Business Services ###################################################

async def service_now_get_many_business_services(json_cred, params, **kwargs):
    """
    Retrieves multiple records for the business services table.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :sysparm_fields: (str) - Comma-separated list of fields to return in the response.
    - :sysparm_display_value: (str) - Determines the type of data returned, either the actual values from the database or the display values of the fields. Display values are manipulated based on the actual value in the database and user or system settings and preferences. If returning display values, the value that is returned is dependent on the field type. Possible Values: (true, false, all) explanation: (true: Returns the display values for all fields, false: Returns the actual values from the database, all: Returns both actual and display values)
    - :sysparm_limit: (int) - Maximum number of records to return. Default: 10000
    - :sysparm_query: (str) - Encoded query used to filter the result set. You can use a UI filter to obtain a properly encoded query. if you want to generate a query graphically visit this `Page. <https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters>`_
    - :sysparm_exclude_reference_link: (boolean) - Flag that indicates whether to exclude 
    
        Table API links for reference fields.
    

    Returns:
        dict: a Dictionary containing a list of records in the business services table

    """
    try:
        accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
        url = f"https://{instance_domain}.service-now.com/api/now/table/cmdb_ci_service"
        headers = {
            "Authorization": "Bearer " + accessToken,
            "Accept": "application/json"
        }
        ignore_keys = []
        data = {
            key: value
            for (key, value) in params.items()
            if value
            if key not in ignore_keys
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url=url, headers=headers, params=data) as response:
                if response.status == 200:
                    result = await response.json()
                    result["paging_urls"] = response.headers.get("Link")
                    result["total_count"] = response.headers.get("X-Total-Count")
                    return result
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



############################################## Configuration Items ###################################################

async def service_now_get_many_configuration_items(json_cred, params, **kwargs):
    """
    Retrieves multiple records for the configuration items table.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :sysparm_fields: (str) - Comma-separated list of fields to return in the response.
    - :sysparm_display_value: (str) - Determines the type of data returned, either the actual values from the database or the display values of the fields. Display values are manipulated based on the actual value in the database and user or system settings and preferences. If returning display values, the value that is returned is dependent on the field type. Possible Values: (true, false, all) explanation: (true: Returns the display values for all fields, false: Returns the actual values from the database, all: Returns both actual and display values)
    - :sysparm_limit: (int) - Maximum number of records to return. Default: 10000
    - :sysparm_query: (str) - Encoded query used to filter the result set. You can use a UI filter to obtain a properly encoded query. if you want to generate a query graphically visit this `Page. <https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters>`_
    - :sysparm_exclude_reference_link: (boolean) - Flag that indicates whether to exclude 
    
        Table API links for reference fields.
    

    Returns:
        dict: a Dictionary containing a list of records in the configuration items table

    """
    try:
        accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
        url = f"https://{instance_domain}.service-now.com/api/now/table/cmdb_ci"
        headers = {
            "Authorization": "Bearer " + accessToken,
            "Accept": "application/json"
        }
        ignore_keys = []
        data = {
            key: value
            for (key, value) in params.items()
            if value
            if key not in ignore_keys
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url=url, headers=headers, params=data) as response:
                if response.status == 200:
                    result = await response.json()
                    result["paging_urls"] = response.headers.get("Link")
                    result["total_count"] = response.headers.get("X-Total-Count")
                    return result
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



############################################## Departments ###################################################

async def service_now_get_many_deprtments(json_cred, params, **kwargs):
    """
    Retrieves multiple records for the deprtments table.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :sysparm_fields: (str) - Comma-separated list of fields to return in the response.
    - :sysparm_display_value: (str) - Determines the type of data returned, either the actual values from the database or the display values of the fields. Display values are manipulated based on the actual value in the database and user or system settings and preferences. If returning display values, the value that is returned is dependent on the field type. Possible Values: (true, false, all) explanation: (true: Returns the display values for all fields, false: Returns the actual values from the database, all: Returns both actual and display values)
    - :sysparm_limit: (int) - Maximum number of records to return. Default: 10000
    - :sysparm_query: (str) - Encoded query used to filter the result set. You can use a UI filter to obtain a properly encoded query. if you want to generate a query graphically visit this `Page. <https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters>`_
    - :sysparm_exclude_reference_link: (boolean) - Flag that indicates whether to exclude 
    
        Table API links for reference fields.
    

    Returns:
        dict: a Dictionary containing a list of records in the deprtments table

    """
    try:
        accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
        url = f"https://{instance_domain}.service-now.com/api/now/table/cmn_department"
        headers = {
            "Authorization": "Bearer " + accessToken,
            "Accept": "application/json"
        }
        ignore_keys = []
        data = {
            key: value
            for (key, value) in params.items()
            if value
            if key not in ignore_keys
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url=url, headers=headers, params=data) as response:
                if response.status == 200:
                    result = await response.json()
                    result["paging_urls"] = response.headers.get("Link")
                    result["total_count"] = response.headers.get("X-Total-Count")
                    return result
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



############################################## Dictionaries ###################################################

async def service_now_get_many_dictionaries(json_cred, params, **kwargs):
    """
    Retrieves multiple records for the dictionaries table.

    :creds: JSON Credentials for authenticating with Service Now API.
    :params: Dictionary containing parameters.

    - :sysparm_fields: (str) - Comma-separated list of fields to return in the response.
    - :sysparm_display_value: (str) - Determines the type of data returned, either the actual values from the database or the display values of the fields. Display values are manipulated based on the actual value in the database and user or system settings and preferences. If returning display values, the value that is returned is dependent on the field type. Possible Values: (true, false, all) explanation: (true: Returns the display values for all fields, false: Returns the actual values from the database, all: Returns both actual and display values)
    - :sysparm_limit: (int) - Maximum number of records to return. Default: 10000
    - :sysparm_query: (str) - Encoded query used to filter the result set. You can use a UI filter to obtain a properly encoded query. if you want to generate a query graphically visit this `Page. <https://developer.servicenow.com/dev.do#!/learn/learning-plans/xanadu/servicenow_application_developer/app_store_learnv2_rest_xanadu_more_about_query_parameters>`_
    - :sysparm_exclude_reference_link: (boolean) - Flag that indicates whether to exclude 
    
        Table API links for reference fields.
    

    Returns:
        dict: a Dictionary containing a list of records in the dictionaries table

    """
    try:
        accessToken, instance_domain = await service_now_refresh_access_token(json_cred)
        url = f"https://{instance_domain}.service-now.com/api/now/table/sys_dictionary"
        headers = {
            "Authorization": "Bearer " + accessToken,
            "Accept": "application/json"
        }
        ignore_keys = []
        data = {
            key: value
            for (key, value) in params.items()
            if value
            if key not in ignore_keys
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(url=url, headers=headers, params=data) as response:
                if response.status == 200:
                    result = await response.json()
                    result["paging_urls"] = response.headers.get("Link")
                    result["total_count"] = response.headers.get("X-Total-Count")
                    return result
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



operations = {
    "Get Many Table Records": service_now_get_many_table_records,
    "Get Table Record": service_now_get_table_record,
    "Create Table Record": service_now_create_table_record,
    "Update Table Record": service_now_update_table_record,
    "Delete Table Record": service_now_delete_table_record,
    "Get Many Incidents": service_now_get_many_incidents,
    "Get Incident": service_now_get_incident,
    "Create Incident": service_now_create_incident,
    "Update Incident": service_now_update_incident,
    "Delete Incident": service_now_delete_incident,
    "Get Many Users": service_now_get_many_users,
    "Get User": service_now_get_user,
    "Create User": service_now_create_user,
    "Update User": service_now_update_user,
    "Delete User": service_now_delete_user,
    "Get Many User Groups": service_now_get_many_user_groups,
    "Get Many User Roles": service_now_get_many_user_roles,
    "Get Many Business Services": service_now_get_many_business_services,
    "Get Many Configuration Items": service_now_get_many_configuration_items,
    "Get Many Departments": service_now_get_many_deprtments,
    "Get Many Dictionaries": service_now_get_many_dictionaries,
    "Get Many Attachments": service_now_get_many_attachments,
    "Get Attachment": service_now_get_attachment,
    "Upload Attachment": service_now_upload_attachment,
    "Delete Attachment": service_now_delete_attachment
}
import json
import aiohttp

############################################## Authentication ###################################################

async def extract_token(cred):
    """
    Retrieves The Access Token from the credentials
    
    :cred: JSON String used for authentication purposes.

    :return: Access Token
    :rtype: String
    """
    try:
        creds=json.loads(cred)
        if 'accesstoken' in creds:
            return creds['accesstoken']
        else:
            raise Exception("Missing Access Token")
    except Exception as e:
        raise Exception(
            f"failed to extract access token: {e}"
        )


########################## Code ####################################

########################## Bases ####################################


async def airtable_list_bases(json_cred, params, **kwargs):
    """
    Returns the list of bases the token can access, 1000 bases at a time. If there is another page to request, pass the offset as a URL query parameter. 
    
    :cred: JSON String used for authentication purposes.
    :params: Dictionary containing parameters.

    - :offset: (str,optional) - To fetch the next page of records, include offset from the previous request in the next request's parameters.
    
    :return: dictionary containing a list of base objects
    :rtype: Dict
    """
    try:
        accessToken = await extract_token(json_cred)
        url = f"https://api.airtable.com/v0/meta/bases"
        headers = {
            "Authorization": f"Bearer {accessToken}"
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
                response.raise_for_status()
                if response.status == 200:
                    return await response.json()
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def airtable_get_base_schemas(json_cred, params, **kwargs):
    """
    Returns the schema of the tables in the specified base.
    
    :cred: JSON String used for authentication purposes.
    :params: Dictionary containing parameters.
    
    - :base_id: (str,required) - Used to specify the base containing the table the user needs to interact with.
    - :include: (list of str,optional) - If specified, additional fields to include in the views object response; currently, this list only allows a single literal value visibleFieldIds (for views of type grid only)
    
    :return: dictionary containing a list of table schema objects
    :rtype: Dict
    """
    try:
        required_params=["base_id"]
        if all(param in params for param in required_params):
            accessToken = await extract_token(json_cred)
            base_id = params["base_id"]
            url = f"https://api.airtable.com/v0/meta/bases/{base_id}/tables"
            headers = {
                "Authorization": f"Bearer {accessToken}"
            }
            
            ignore_keys = ["base_id"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, params=data) as response:
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


########################## Records ####################################


async def airtable_list_records(json_cred, params, **kwargs):
    """
    Retrieve all matching records in a single list.
    
    :cred: JSON String used for authentication purposes.
    :params: Dictionary containing parameters.

    - :base_id: (str,required) - Used to specify the base containing the table the user needs to interact with.
    - :table_id: (str,required) - Used to specify the table the user needs to interact with.
    - :view: (str,optional) - The name or ID of a view. If set, only the records in that view will be returned.
    - :pageSize: (int,optional) - The number of records returned in each request. Must be less than or equal to 100. If no value given, Airtable's default is 100.
    - :maxRecords: (int,optional) - The maximum total number of records that will be returned in your requests. If this value is larger than pageSize (which is 100 by default), you may have to load multiple pages to reach this total.
    - :offset: (str,optional) - To fetch the next page of records, include offset from the previous request in the next request's parameters.
    - :fields: (list of str,optional) - List containing the name or ID of field or fields to be retrieved. Default is all fields.
    - :sort: (list of dict,optional) - A list of sort objects that specifies how the records will be ordered. Each sort object must have a field key specifying the name of the field to sort on, and an optional direction key that is either "asc" or "desc". The default direction is "asc".
    - :filterByFormula: (str,optional) - An Airtable formula. The formula will be evaluated for each record, and if the result is not false, the record will be included in the response. We recommend testing your formula in the Formula field UI before using it in your API request.
    - :cellFormat: (str,optional) - The cell format to request from the Airtable API (json, string).
    - :userLocale: (str,optional) - The user locale that should be used to format dates when using string as the cell_format. See `the documentation <https://support.airtable.com/hc/en-us/articles/220340268-Supported-locale-modifiers-for-SET-LOCALE>`_ for valid values.
    - :timeZone: (str,optional) - The time zone that should be used to format dates when using string as the cell_format. See `the documentation <https://support.airtable.com/hc/en-us/articles/216141558-Supported-timezones-for-SET-TIMEZONE>`_ for valid values .
    - :returnFieldsByFieldId: (bool,optional) - An optional boolean value that lets you return field objects where the key is the field id. This defaults to false, which returns field objects where the key is the field name.

    :return: List of record dictionaries with each dictionary representing a record
    :rtype: List[Dict]
    """
    try:
        required_params=["base_id", "table_id"]
        if all(param in params for param in required_params):
            accessToken = await extract_token(json_cred)
            base_id = params["base_id"]
            table_id = params["table_id"]
            url = f"https://api.airtable.com/v0/{base_id}/{table_id}/listRecords"
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json"
            }
            
            ignore_keys = ["base_id", "table_id"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, headers=headers, json=data) as response:
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


async def airtable_create_record(json_cred, params, **kwargs):
    """
    Create a new record.
    
    :cred: JSON String used for authentication purposes.
    :params: Dictionary containing parameters.

    - :base_id: (str,required) - Used to specify the base containing the table the user needs to interact with.
    - :table_id: (str,required) - Used to specify the table the user needs to interact with.
    - :fields: (dict,required) - Fields to insert. Must be a dict with field names or IDs as keys. It can be an empty dictionary or contain one or more key-value pairs based on user input. Example usage:

        - An empty 'fields' dictionary:
            {}

        - 'fields' dictionary with key-value pairs:
            {'field1': 'value1', 'field2': 42}
    
    - :typecast: (bool,optional) - The Airtable API will perform best-effort automatic data conversion from string values. Defaults to false.
    - :returnFieldsByFieldId: (bool,optional) - An optional boolean value that lets you return field objects where the key is the field id. This defaults to false, which returns field objects where the key is the field name.

    :return: RecordDict describing the created record
    :rtype: RecordDict
    """
    try:
        required_params=["base_id", "table_id", "fields"]
        if all(param in params for param in required_params):
            accessToken = await extract_token(json_cred)
            base_id = params["base_id"]
            table_id = params["table_id"]
            url = f"https://api.airtable.com/v0/{base_id}/{table_id}"
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json"
            }
            
            ignore_keys = ["base_id", "table_id"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, headers=headers, json=data) as response:
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


async def airtable_update_record(json_cred, params, **kwargs):
    """
    Update a particular record ID with the given fields.
    
    :cred: JSON String used for authentication purposes.
    :params: Dictionary containing parameters.

    - :base_id: (str,required) - Used to specify the base containing the table the user needs to interact with.
    - :table_id: (str,required) - Used to specify the table the user needs to interact with.
    - :record_id: (str,required) - An Airtable record id
    - :fields: (dict,required) - Fields to update. Must be a dict with field names or IDs as keys. It can be an empty dictionary or contain one or more key-value pairs based on user input. Example usage:

        - An empty 'fields' dictionary:
            {}

        - 'fields' dictionary with key-value pairs:
            {'field1': 'value1', 'field2': 42, ...}
    
    - :replace: (bool,optional) - If True, record is replaced in its entirety by provided fields; if a field is not included its value will bet set to null. If False, only provided fields are updated.
    - :typecast: (bool,optional) - The Airtable API will perform best-effort automatic data conversion from string values. Defaults to false.
    - :returnFieldsByFieldId: (bool,optional) - An optional boolean value that lets you return field objects where the key is the field id. This defaults to false, which returns field objects where the key is the field name.

    :return: RecordDict describing the created record
    :rtype: RecordDict
    """
    try:
        required_params=["base_id", "table_id", "record_id", "fields"]
        if all(param in params for param in required_params):
            accessToken = await extract_token(json_cred)
            base_id = params["base_id"]
            table_id = params["table_id"]
            record_id = params["record_id"]
            replace = params.get("replace", False)
            url = f"https://api.airtable.com/v0/{base_id}/{table_id}/{record_id}"
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json"
            }
            
            ignore_keys = ["base_id", "table_id", "replace", "record_id"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            async with aiohttp.ClientSession() as session:
                if replace:
                    async with session.put(url=url, headers=headers, json=data) as response:
                        response.raise_for_status()
                        if response.status == 200:
                            return await response.json()
                        raise Exception(
                            f"Status Code: {response.status}. Response: {await response.text()}"
                        )
                else:
                    async with session.patch(url=url, headers=headers, json=data) as response:
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


async def airtable_batch_update_or_create_records(json_cred, params, **kwargs):
    """
    Update or create records in batches, either using id (if given) or using a set of fields (key_fields) to look for matches.
    
    :cred: JSON String used for authentication purposes.
    :params: Dictionary containing parameters.

    - :base_id: (str,required) - Used to specify the base containing the table the user needs to interact with.
    - :table_id: (str,required) - Used to specify the table the user needs to interact with.
    - :records: (list of dict,required) - Iterable of dicts representing records to be updated or created.
        Each dictionary must have:
            - :id: (str,optional) - The ID of the record to be updated.
            - :fields: (dict,optional) - A dictionary of fields to be updated for the record.

        Example usage:

        [
            {
                "id": "recAdw9EjV90xbW",
                "fields": {
                    "Email": "alice@example.com"
                }
            },
            {
                "id": "recAdw9EjV90xbX",
                "fields": {
                    "Email": "bob@example.com"
                }
            },
            {},
            ...
        ]
    
    - :fieldsToMergeOn: (list of str,optional) - List of field names that Airtable should use to match records in the input with existing records on the server.
    - :replace: (bool,optional) - If True, record is replaced in its entirety by provided fields; if a field is not included its value will bet set to null. If False, only provided fields are updated.
    - :typecast: (bool,optional) - The Airtable API will perform best-effort automatic data conversion from string values. Defaults to false.
    - :returnFieldsByFieldId: (bool,optional) - An optional boolean value that lets you return field objects where the key is the field id. This defaults to false, which returns field objects where the key is the field name.

    :return: Dictionary containing a list of RecordDict with each one describing an updated or created record
    :rtype: Dict
    """
    try:
        required_params=["base_id", "table_id", "records"]
        if all(param in params for param in required_params):
            accessToken = await extract_token(json_cred)
            base_id = params["base_id"]
            table_id = params["table_id"]
            replace = params.get("replace", False)
            fieldsToMergeOn = params.get("fieldsToMergeOn", [])
            url = f"https://api.airtable.com/v0/{base_id}/{table_id}"
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json"
            }
            
            ignore_keys = ["base_id", "table_id", "replace", "fieldsToMergeOn"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            data["performUpsert"] = {"fieldsToMergeOn": fieldsToMergeOn}
            async with aiohttp.ClientSession() as session:
                if replace:
                    async with session.put(url=url, headers=headers, json=data) as response:
                        response.raise_for_status()
                        if response.status == 200:
                            return await response.json()
                        raise Exception(
                            f"Status Code: {response.status}. Response: {await response.text()}"
                        )
                else:
                    async with session.patch(url=url, headers=headers, json=data) as response:
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


async def airtable_delete_record(json_cred, params, **kwargs):
    """
    Delete the given record.
    
    :cred: JSON String used for authentication purposes.
    :params: Dictionary containing parameters.

    - :base_id: (str,required) - Used to specify the base containing the table the user needs to interact with.
    - :table_id: (str,required) - Used to specify the table the user needs to interact with.
    - :record_id: (str,required) - An Airtable record id
    
    :return: Confirmation that the record was deleted.
    :rtype: Dict
    """
    try:
        required_params=["base_id", "table_id", "record_id"]
        if all(param in params for param in required_params):
            accessToken = await extract_token(json_cred)
            base_id = params["base_id"]
            table_id = params["table_id"]
            record_id = params["record_id"]
            url = f"https://api.airtable.com/v0/{base_id}/{table_id}/{record_id}"
            headers = {
                "Authorization": f"Bearer {accessToken}"
            }
            async with aiohttp.ClientSession() as session:
                async with session.delete(url=url, headers=headers) as response:
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


async def airtable_batch_delete_records(json_cred, params, **kwargs):
    """
    Delete the given records, operating in batches.
    
    :cred: JSON String used for authentication purposes.
    :params: Dictionary containing parameters.

    - :base_id: (str,required) - Used to specify the base containing the table the user needs to interact with.
    - :table_id: (str,required) - Used to specify the table the user needs to interact with.
    - :record_ids: (list of str,required) - Record IDs to delete
    
    :return: Confirmation that the records were deleted.
    :rtype: Dict
    """
    try:
        required_params=["base_id", "table_id", "record_ids"]
        if all(param in params for param in required_params):
            accessToken = await extract_token(json_cred)
            base_id = params["base_id"]
            table_id = params["table_id"]
            record_ids = params["record_ids"]
            url = f"https://api.airtable.com/v0/{base_id}/{table_id}"
            headers = {
                "Authorization": f"Bearer {accessToken}"
            }
            data = {"records": record_ids}
            async with aiohttp.ClientSession() as session:
                async with session.delete(url=url, headers=headers, params=data) as response:
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


async def airtable_get_record(json_cred, params, **kwargs):
    """
    Retrieve a record by its ID.
    
    :cred: JSON String used for authentication purposes.
    :params: Dictionary containing parameters.

    - :base_id: (str,required) - Used to specify the base containing the table the user needs to interact with.
    - :table_id: (str,required) - Used to specify the table the user needs to interact with.
    - :record_id: (str,required) - An Airtable record id
    - :cellFormat: (str,optional) - The cell format to request from the Airtable API (json, string).
    - :userLocale: (str,optional) - The user locale that should be used to format dates when using string as the cell_format. See `the documentation <https://support.airtable.com/hc/en-us/articles/220340268-Supported-locale-modifiers-for-SET-LOCALE>`_ for valid values.
    - :timeZone: (str,optional) - The time zone that should be used to format dates when using string as the cell_format. See `the documentation <https://support.airtable.com/hc/en-us/articles/216141558-Supported-timezones-for-SET-TIMEZONE>`_ for valid values .
    - :returnFieldsByFieldId: (bool,optional) - An optional boolean value that lets you return field objects where the key is the field id. This defaults to false, which returns field objects where the key is the field name.

    :return: RecordDict describing the created record
    :rtype: RecordDict
    """
    try:
        required_params=["base_id", "table_id", "record_id"]
        if all(param in params for param in required_params):
            accessToken = await extract_token(json_cred)
            base_id = params["base_id"]
            table_id = params["table_id"]
            record_id = params["record_id"]
            url = f"https://api.airtable.com/v0/{base_id}/{table_id}/{record_id}"
            headers = {
                "Authorization": f"Bearer {accessToken}"
            }
            
            ignore_keys = ["base_id", "table_id", "record_id"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, params=data) as response:
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



operations = {
    'Get Record':airtable_get_record,
    'Find Records':airtable_list_records,
    'Create Record':airtable_create_record,
    'Update Record':airtable_update_record,
    'Delete Record':airtable_delete_record,
    'Batch Delete Records':airtable_batch_delete_records,
    'Update Create Record':airtable_batch_update_or_create_records,
    'Get Many Bases':airtable_list_bases,
    'Get Base Schema':airtable_get_base_schemas
}
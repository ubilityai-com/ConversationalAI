import aiohttp
import json

######################     Generate Access Token      ######################

async def zohoCRM_refresh_access_token(cred):
    """
    Refresh the Zoho CRM access token using a refresh token.

    :client_id: (str) - The client ID of the Zoho CRM connected app.
    :client_secret: (str) - The client secret of the Zoho CRM connected app.
    :refresh_token: (str) - The refresh token obtained during the initial authorization.

    Returns:
      str: The refreshed Zoho CRM access token.

    """
    try:
        credentials=json.loads(cred)
        refresh_token=credentials['refreshToken']
        client_id=credentials['clientID']
        client_secret=credentials['clientSecret']
        url = f"https://accounts.zoho.com/oauth/v2/token?refresh_token={refresh_token}&client_id={client_id}&client_secret={client_secret}&grant_type=refresh_token"
        async with aiohttp.ClientSession() as session:
            async with session.post(url) as response:
                response.raise_for_status()
                result = await response.json()
                if "access_token" in result:
                    return result["access_token"]
                raise Exception({"access_token": "Invalid access_token"})
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
   
###########################################################################################################################
# Contact Actions

async def zohoCRM_get_contact(cred, params, **kwargs):
    """
    Retrieve information about a specific contact.

    :access_token: The Zoho CRM access token for authentication..
    :params: A dictionary containing parameters:

    - :contact_id: (str, required) - The ID of the contact to be retrieved.

    Returns:
      dict: A dictionary containing the information of the specified contact.

    """
    try:
        if "contact_id" in params and params["contact_id"]:
            access_token = await zohoCRM_refresh_access_token(cred)
            id = params["contact_id"]
            url = f"https://www.zohoapis.com/crm/v5/Contacts/{id}"
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status == 204:
                        raise Exception("ID Not Found")
                    return {"Contact": result["data"]}
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zohoCRM_delete_contact(cred, params, **kwargs):
    """
    Delete a contact.

    :access_token: The Zoho CRM access token for authentication..
    :params: A dictionary containing parameters:

    - :contact_id: (str, required) - The ID of the contact to be deleted.

    Returns:
      dict: A dictionary containing information about the status of the deletion.

    """
    try:
        if "contact_id" in params and params["contact_id"]:
            access_token = await zohoCRM_refresh_access_token(cred)
            id = params["contact_id"]
            url = f"https://www.zohoapis.com/crm/v5/Contacts/{id}"
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.delete(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    return result
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zohoCRM_create_contact(cred, params, **kwargs):
    """
    Create a new contact.

    :access_token: The Zoho CRM access token for authentication..
    :params: A dictionary containing parameters:

    - :Last_Name: (str, required) - The last name of the contact.
    - :Title: (str, optional) - The title of the contact.
    - ... (other parameters): Additional parameters that can be included in the params.

    Returns:
      dict: A dictionary containing information about the created contact.

    """
    try:
        if "Last_Name" in params and params["Last_Name"]:
            access_token = await zohoCRM_refresh_access_token(cred)
            url = f"https://www.zohoapis.com/crm/v5/Contacts"
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            payload = {"data": [data]}
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=payload) as response:
                    response.raise_for_status()
                    response_json = await response.json()
                    if "code" in response_json and response_json["code"] != 0:
                        raise Exception(response_json)
                    if response_json["data"] and "code" in response_json["data"][0] and response_json["data"][0]["code"] != "SUCCESS":
                        raise Exception(response_json)
                    return response_json
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

###########################################################################################################################
# Account Actions



async def zohoCRM_get_account(cred, params, **kwargs):
    """
    Retrieve information about a specific account.

    :access_token: The Zoho CRM access token for authentication..
    :params: A dictionary containing parameters:

    - :account_id: (str, required) - The ID of the account to be retrieved.

    Returns:
      dict: A dictionary containing the information of the specified account.

    """
    try:
        if "account_id" in params and params["account_id"]:
            access_token = await zohoCRM_refresh_access_token(cred)
            id = params["account_id"]
            url = f"https://www.zohoapis.com/crm/v5/Accounts/{id}"
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status == 204:
                        raise Exception("ID Not Found")
                    return {"Account": result["data"]}
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zohoCRM_delete_account(cred, params, **kwargs):
    """
    Delete an account.

    :access_token: The Zoho CRM access token for authentication..
    :params: A dictionary containing parameters:

    - :account_id: (str, required) - The ID of the account to be deleted.

    Returns:
      dict: A dictionary containing information about the status of the deletion.

    """
    try:
        if "account_id" in params and params["account_id"]:
            access_token = await zohoCRM_refresh_access_token(cred)
            id = params["account_id"]
            url = f"https://www.zohoapis.com/crm/v5/Accounts/{id}"
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.delete(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    return result
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zohoCRM_create_account(cred, params, **kwargs):
    """
    Create a new account.

    :access_token: The Zoho CRM access token for authentication..
    :params: A dictionary containing parameters:

    - :Account_Name: (str, required) - The name of the account.
    - :Account_Type: (str, optional) - The type of the account.

        (Options: Analyst, Competitor, Customer, Distributor, Integrator, Investor, Partner, Press, Prospect, Reseller, Supplier, Vendor, or any other type)

    - ... (other parameters): Additional parameters that can be included in the params.

    Returns:
      dict: A dictionary containing information about the created account.

    """
    try:
        if "Account_Name" in params and params["Account_Name"]:
            access_token = await zohoCRM_refresh_access_token(cred)
            url = f"https://www.zohoapis.com/crm/v5/Accounts"
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            payload = {"data": [data]}
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=payload) as response:
                    response.raise_for_status()
                    response_json = await response.json()
                    if "code" in response_json and response_json["code"] != 0:
                        raise Exception(response_json)
                    if response_json["data"] and "code" in response_json["data"][0] and response_json["data"][0]["code"] != "SUCCESS":
                        raise Exception(response_json)
                    return response_json
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



###########################################################################################################################
# Deal Actions




async def zohoCRM_get_deal(cred, params, **kwargs):
    """
    Retrieve information about a specific deal.

    :access_token: The Zoho CRM access token for authentication..
    :params: A dictionary containing parameters:

    - :deal_id: (str, required) - The ID of the deal to be retrieved.

    Returns:
      dict: A dictionary containing the information of the specified deal.

    """
    try:
        if "deal_id" in params and params["deal_id"]:
            access_token = await zohoCRM_refresh_access_token(cred)
            id = params["deal_id"]
            url = f"https://www.zohoapis.com/crm/v5/Deals/{id}"
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status == 204:
                        raise Exception("ID Not Found")
                    return {"Deal": result["data"]}
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def zohoCRM_delete_deal(cred, params, **kwargs):
    """
    Delete a deal.

    :access_token: The Zoho CRM access token for authentication..
    :params: A dictionary containing parameters:

    - :deal_id: (str, required) - The ID of the deal to be deleted.

    Returns:
      dict: A dictionary containing information about the status of the deletion.

    """
    try:
        if "deal_id" in params and params["deal_id"]:
            access_token = await zohoCRM_refresh_access_token(cred)
            id = params["deal_id"]
            url = f"https://www.zohoapis.com/crm/v5/Deals/{id}"
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.delete(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    return result
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def zohoCRM_create_deal(cred, params, **kwargs):
    """
    Create a new deal.

    :access_token: The Zoho CRM access token for authentication..
    :params: A dictionary containing parameters:

    - :Deal_Name: (str, required) - The name of the deal.
    - :Stage: (str, required) - The stage of the deal.

        (Options: Qualification, Needs Analysis, Value Proposition, Identify Decision Makers, Proposal/Price Quote, Negotiation/Review, Closed Won, Closed Lost to Competition, or any other stage  )

    - ... (other parameters): Additional parameters that can be included in the params.

    Returns:
      dict: A dictionary containing information about the created deal.

    """
    try:
        if "Deal_Name" in params and params["Deal_Name"] and "Stage" in params and params["Stage"]:
            access_token = await zohoCRM_refresh_access_token(cred)
            url = f"https://www.zohoapis.com/crm/v5/Deals"
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            payload = {"data": [data]}
            headers = {"Authorization": f"Bearer {access_token}"}
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=payload) as response:
                    response.raise_for_status()
                    response_json = await response.json()
                    if "code" in response_json and response_json["code"] != 0:
                        raise Exception(response_json)
                    if response_json["data"] and "code" in response_json["data"][0] and response_json["data"][0]["code"] != "SUCCESS":
                        raise Exception(response_json)
                    return response_json
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


###########################################################################################################################
# Lead Actions


async def zohoCRM_get_lead(cred, params, **kwargs):
    """
    Retrieve information about a specific lead.

    :access_token: The Zoho CRM access token for authentication..
    :params: A dictionary containing parameters:

    - :lead_id: (str, required) - The ID of the lead to be retrieved.

    Returns:
      dict: A dictionary containing the information of the specified lead.

    """
    try:
        if "lead_id" in params and params["lead_id"]:
            access_token = await zohoCRM_refresh_access_token(cred)
            id = params["lead_id"]
            url = f"https://www.zohoapis.com/crm/v5/Leads/{id}"
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status == 204:
                        raise Exception("ID Not Found")
                    return {"Lead": result["data"]}
        else:
            raise Exception("Missing input data")

    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def zohoCRM_delete_lead(cred, params, **kwargs):
    """
    Delete a lead.

    :access_token: The Zoho CRM access token for authentication..
    :params: A dictionary containing parameters:

    - :lead_id: (str, required) - The ID of the lead to be deleted.

    Returns:
      dict: A dictionary containing information about the status of the deletion.

    """
    try:
        if "lead_id" in params and params["lead_id"]:
            access_token = await zohoCRM_refresh_access_token(cred)
            id = params["lead_id"]
            url = f"https://www.zohoapis.com/crm/v5/Leads/{id}"
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.delete(url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    return result
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def zohoCRM_create_lead(cred, params, **kwargs):
    """
    Create a new lead.

    :access_token: The Zoho CRM access token for authentication..
    :params: A dictionary containing parameters:

    - :Last_Name: (str, required) - The last name of the lead.
    - :Company: (str, required) - The name of the company associated with the lead.
    - ... (other parameters): Additional parameters that can be included in the params.

    Returns:
      dict: A dictionary containing information about the created lead.

    """
    try:
        if "Last_Name" in params and params["Last_Name"] and "Company" in params and params["Company"]:
            access_token = await zohoCRM_refresh_access_token(cred)
            url = f"https://www.zohoapis.com/crm/v5/Leads"
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            payload = {"data": [data]}
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=payload) as response:
                    response.raise_for_status()
                    response_json = await response.json()
                    if "code" in response_json and response_json["code"] != 0:
                        raise Exception(response_json)
                    if response_json["data"] and "code" in response_json["data"][0] and response_json["data"][0]["code"] != "SUCCESS":
                        raise Exception(response_json)
                    return response_json
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


###########################################################################################################################
# Call

async def zohoCRM_create_call(cred, params, **kwargs):
    """
    Creates a call record in Zoho CRM with the provided details.

    :access_token: The Zoho CRM access token for authentication..
    :params: A dictionary containing parameters:

    - :Call_Type: (str,required) - The type of call (e.g., 'Missed', 'Inbound', 'Outbound').
    - :Call_Start_Time: (str,required) - The start time of the call in ISO 8601 format (e.g., '2021-02-17T13:30:00+05:30').
    - :Who_Id: (dict,optional) - A dictionary containing the contact ID under the key 'id'. This refers to the person related to the call.
    - :Description: (str,optional) - A description of the call.
    - :Subject: (str,optional) - The subject or title of the call.
    - :Outbound_Call_Status: (str,optional) - The status of an outbound call. The possible values are Scheduled or Completed.
    - :Call_Duration: (str,optional) - The time duration in HH:mm format that the call lasted for.
    - :Call_Purpose: (str,optional) - The purpose of the call.
    - :What_Id: (dict,optional) - A dictionary containing the ID of a related record (e.g., a lead, account, or deal) under the key 'id'.
    - :$se_module: (str,optional) - The module that the 'What_Id' relates to (e.g., 'accounts', 'leads', etc.).

    Returns:
        dict: A dictionary containing the result of the call creation process from Zoho CRM.

    """
    try:
        if "Call_Type" in params and params["Call_Type"] and "Call_Start_Time" in params and params["Call_Start_Time"]:
            access_token = await zohoCRM_refresh_access_token(cred)
            url = f"https://www.zohoapis.com/crm/v5/Calls"
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            payload = {"data": [data]}
            headers = {"Authorization": f"Bearer {access_token}"}
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=payload) as response:
                    response.raise_for_status()
                    response_json = await response.json()
                    if "code" in response_json and response_json["code"] != 0:
                        raise Exception(response_json)
                    if response_json["data"] and "code" in response_json["data"][0] and response_json["data"][0]["code"] != "SUCCESS":
                        raise Exception(response_json)
                    return response_json
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

operations = {
    'Get Contact':zohoCRM_get_contact,
    'Delete Contact':zohoCRM_delete_contact,
    'Create Contact': zohoCRM_create_contact,
    'Get Account':zohoCRM_get_account,
    'Delete Account':zohoCRM_delete_account,
    'Create Account': zohoCRM_create_account,
    'Get Deal':zohoCRM_get_deal,
    'Delete Deal':zohoCRM_delete_deal,
    'Create Deal': zohoCRM_create_deal,
    'Get Lead':zohoCRM_get_lead,
    'Delete Lead':zohoCRM_delete_lead,
    'Create Lead': zohoCRM_create_lead,
    'Create Call': zohoCRM_create_call,
}

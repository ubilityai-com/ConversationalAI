import aiohttp,json,datetime

################## AUTHENTICATION ######################################################################################

async def hubspot_refresh_access_token(credentials):
    try:
        url = "https://api.hubapi.com/oauth/v1/token"
        cred = json.loads(credentials)
        client_id = cred['clientID']
        client_secret = cred['clientSecret']
        refresh_token = cred['refreshToken']
        redirect_uri = cred['redirectUri']
        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        }
        token_data = {
            "grant_type": "refresh_token",
            "client_id": client_id,
            "client_secret": client_secret,
            "refresh_token": refresh_token,
            "redirect_uri": redirect_uri
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(url=url, headers=headers, data=token_data) as response:
                response.raise_for_status()
                if response.status == 200:
                    token_info = await response.json()
                    accessToken = token_info['access_token']
                    return accessToken
                else:
                    raise Exception(response.json())
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

############# CONTACTS ####################################################################################

async def hubspot_get_contact(cred, params, **kwargs):
    """
        Returns a contact of a specific id with custom properties (if specified).

    :param str access_token: retrieved from the hubspot app.   
    :param dict params: filters the properties to be returned for the retrieved contact.

      :properties: (array of str) firstname,company,website,phone.
      :id: (str,required) The id of the contact to be retrieved

    :return: details about the retrieved contact,including the filtered properties
    :rtype: dict  
    """
    try:
        if 'id' in params:
            access_token = await hubspot_refresh_access_token(cred)
            url = f"https://api.hubapi.com/crm/v3/objects/contacts/{params['id']}"
            query_params = {}
            for key, value in params.items():
                if key != "id":
                    query_params[key] = value
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, params=query_params) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status == 404:
                        raise Exception("invalid input data")
                    return result
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def hubspot_create_contact(cred, params, **kwargs):
    """
        Creates a contact with properties passed in the parameters

    :param str access_token: retrieved from the hubspot app.
    :param dict params: contains specific properties to be added for the contact.

      :properties: (dict) email(required),phone,website,company,firstname,lifecyclestage,
        lastname,industry,country,fax
    :return: details about the created contact
    :rtype: dict  
    """
    try:
        if 'email' in params['properties']:
            access_token = await hubspot_refresh_access_token(cred)
            contact = {}
            for key, value in params.items():
                if value not in [None, "None", ""]:
                    contact[key] = value
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
            url = "https://api.hubapi.com/crm/v3/objects/contacts"
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, json=contact, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status == 201:
                        return result
                    else:
                        raise Exception(result)
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(e)}

async def hubspot_delete_contact(cred, params, **kwargs):
    """
        Deletes a contact of a specific id

    :param str access_token: retrieved from the hubspot app.
    :param dict params: contains the id of the contact to be deleted.

      :id:  (str,required) the id of the contact.
    
    :return: a statement about the successful deletion of the contact
    :rtype: json  
    """
    try:
        if 'id' in params:
            access_token = await hubspot_refresh_access_token(cred)
            url = f"https://api.hubapi.com/crm/v3/objects/contacts/{params['id']}"
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
            async with aiohttp.ClientSession() as session:
                async with session.delete(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 204:
                        return {"message": f"Contact with id {params['id']} successfully deleted"}
                    else :
                        raise Exception (f"the contact id : {params['id']} is incorrect ")
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

############# Deals ####################################################################################

async def hubspot_create_deal(cred, params, **kwargs):
    """
        Creates a deal with properties passed in the parameters

    :param str access_token: retrieved from the hubspot app.
    :param dict params: contains specific properties to be added for the deal.

      :properties: (dict) dealname(required),closedate,createdate,amount,dealstage,
                dealtype

    :return: details about the created deal
    :rtype: dict  
    """
    try:
        if 'dealname' in params['properties']:
            access_token = await hubspot_refresh_access_token(cred)
            keys_to_skip = ['dealCreateTime', 'dealCreateDate',
                            'dealCloseTime', 'dealCloseDate']
            deal = {}
            for key, value in params.items():
                if key not in keys_to_skip:
                    deal[key] = value
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
            if "dealCreateTime" in params and params['dealCreateTime']:
                deal_time = params['dealCreateTime']
                # Split the time to two parts: min and sec
                time_parts = deal_time.split(":")
                date_obj = ''
                # check existing of the meetingstartDate property
                if 'dealCreateDate' in params and params['dealCreateDate']:
                    deal_date = params['dealCreateDate']
                    # Convert string to date object
                    date_obj = datetime.datetime.strptime(
                        deal_date, "%Y-%m-%d").date()
                else:  # Put the date as today's date if not specified
                    deal_date = datetime.date.today()
                    # Convert string to date object
                    date_obj = datetime.datetime.strptime(
                        deal_date, "%Y-%m-%d").date()
                # Combine date and time into a datetime object
                combined_date = datetime.datetime(date_obj.year, date_obj.month, date_obj.day, int(
                    time_parts[0]), int(time_parts[1]), tzinfo=datetime.timezone.utc)
                # Convert to Unix timestamp in milliseconds as Hubspot API expects
                unix_date_create = int(combined_date.timestamp() * 1000)
                deal['properties']['createdate'] = unix_date_create
            if "dealCloseTime" in params and params['dealCloseTime']:
                deal_time = params['dealCloseTime']
                # Split the time to two parts: min and sec
                time_parts = deal_time.split(":")
                date_obj = ''
                # Check existing of the meetingEndtDate property
                if 'dealCloseDate' in params and params['dealCloseDate']:
                    deal_date = params['dealCloseDate']
                    # Convert string to date object
                    date_obj = datetime.datetime.strptime(
                        deal_date, "%Y-%m-%d").date()
                else:  # Put the date as today's date if not specified
                    deal_date = datetime.date.today()
                    # Convert string to date object
                    date_obj = datetime.datetime.strptime(
                        deal_date, "%Y-%m-%d").date()
                # Combine date and time into a datetime object
                combined_date = datetime.datetime(date_obj.year, date_obj.month, date_obj.day, int(
                    time_parts[0]), int(time_parts[1]), tzinfo=datetime.timezone.utc)
                # Convert to Unix timestamp in milliseconds as Hubspot API expects
                unix_date_end = int(combined_date.timestamp() * 1000)
                deal['properties']['closedate'] = unix_date_end
            url = "https://api.hubapi.com/crm/v3/objects/deals"
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, json=deal, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status == 201:
                        return result
                    else:
                        raise Exception(result)
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def hubspot_get_deal(cred, params, **kwargs):
    """
        Returns a deal of a specific id with custom properties (if specified).

    :param str access_token: retrieved from the hubspot app.   
    :param dict params: filters the properties to be returned for the retrieved deal.

        :properties: (array of str) dealname,amount,createdate,closedate.

        :id: (str,required) The id of the deal to be retrieved
    :return: details about the retrieved deal,including the filtered properties
    :rtype: dict  
    """
    try:
        if 'id' in params:
            access_token = await hubspot_refresh_access_token(cred)
            url = f"https://api.hubapi.com/crm/v3/objects/deals/{params['id']}"
            query_params = {}
            for key, value in params.items():
                if key != "id":
                    query_params[key] = value
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, params=query_params) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status == 404:
                        raise Exception("invalid input data")
                    return result
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def hubspot_delete_deal(cred, params, **kwargs):
    """
        Deletes a deal of a specific id

    :param str access_token: retrieved from the hubspot app.
    :param dict params: contains the id of the deal to be deleted.

      :id:  (str,required) the id of the deal.
    :return: a statement about the successful deletion of the deal
    :rtype: json  
    """
    try:
        if 'id' in params:
            access_token = await hubspot_refresh_access_token(cred)
            url = f"https://api.hubapi.com/crm/v3/objects/deals/{params['id']}"
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
            async with aiohttp.ClientSession() as session:
                async with session.delete(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 204:
                        return {"message": f"Deal with id {params['id']} successfully deleted"}
                    else :
                        raise Exception (f"the deal id : {params['id']} is incorrect ")
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

############# TICKETS ##############################################

async def hubspot_create_ticket(cred, params, **kwargs):
    """
        Creates a ticket with properties passed in the parameters

    :param str access_token: retrieved from the hubspot app.
    :param dict params: contains specific properties to be added for the ticket.

      :properties: (dict) hs_pipeline_stage (required),subject,hs_ticket_priority,
                hs_ticket_category,closed_date,createdate

    :return: details about the created ticket
    :rtype: dict  
    """
    try:
        if 'hs_pipeline_stage' in params['properties']:
            access_token = await hubspot_refresh_access_token(cred)
            ticket = {}
            keys_to_skip = ['ticketCreateTime', 'ticketCreateDate',
                            'ticketCloseTime', 'ticketCloseDate']
            for key, value in params.items():
                if key not in keys_to_skip:
                    ticket[key] = value
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
            if "ticketCreateTime" in params and params['ticketCreateTime']:
                ticket_time = params['ticketCreateTime']
                # Split the time to two parts: min and sec
                time_parts = ticket_time.split(":")
                date_obj = ''
                # check existing of the meetingstartDate property
                if 'ticketCreateDate' in params and params['ticketCreateDate']:
                    ticket_date = params['ticketCreateDate']
                    # Convert string to date object
                    date_obj = datetime.datetime.strptime(
                        ticket_date, "%Y-%m-%d").date()
                else:  # Put the date as today's date if not specified
                    ticket_date = datetime.date.today()
                    # Convert string to date object
                    date_obj = datetime.datetime.strptime(
                        ticket_date, "%Y-%m-%d").date()
                # Combine date and time into a datetime object
                combined_date = datetime.datetime(date_obj.year, date_obj.month, date_obj.day, int(
                    time_parts[0]), int(time_parts[1]), tzinfo=datetime.timezone.utc)
                # Convert to Unix timestamp in milliseconds as Hubspot API expects
                unix_date_create = int(combined_date.timestamp() * 1000)
                ticket['properties']['createdate'] = unix_date_create
            url = "https://api.hubapi.com/crm/v3/objects/tickets"
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, json=ticket, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status == 201:
                        return result
                    else:
                        raise Exception(result)
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def hubspot_get_ticket(cred, params, **kwargs):
    """
        Returns a ticket of a specific id with custom properties (if specified).

    :param str access_token: retrieved from the hubspot app.   
    :param dict params: filters the properties to be returned for the retrieved ticket.

        :properties: (array of str) subject,hs_ticket_priority,hs_ticket_category,
            closed_date,createdate.
        :id: (str,required) The id of the ticket to be retrieved
    :return: details about the retrieved ticket,including the filtered properties
    :rtype: dict  
    """
    try:
        if 'id' in params:
            access_token = await hubspot_refresh_access_token(cred)
            url = f"https://api.hubapi.com/crm/v3/objects/tickets/{params['id']}"
            query_params = {}
            for key, value in params.items():
                if key != "id":
                    query_params[key] = value
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, params=query_params) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status == 404:
                        raise Exception("invalid input data")
                    return result
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def hubspot_delete_ticket(cred, params, **kwargs):
    """
        Deletes a ticket of a specific id

    :param str access_token: retrieved from the hubspot app.
    :param dict params: contains the id of the ticket to be deleted.

      :id:  (str,required) the id of the ticket.
    :return: a statement about the successful deletion of the ticket
    :rtype: json  
    """
    try:
        if 'id' in params:
            access_token = await hubspot_refresh_access_token(cred)
            url = f"https://api.hubapi.com/crm/v3/objects/tickets/{params['id']}"
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
            async with aiohttp.ClientSession() as session:
                async with session.delete(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 204:
                        return {"message": f"Ticket with id {params['id']} successfully deleted"}
                    else :
                        raise Exception (f"the ticket id : {params['id']} is incorrect ")
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


##################### ENGAGEMENTS ########################################################################################
########## CALLS ################################

async def hubspot_create_call(cred, params, **kwargs):
    """
        Creates a call with properties passed in the parameters

    :param str access_token: retrieved from the hubspot app.
    :param dict params: contains specific properties to be added for the call.

        - :metadata: (dict) - Contains information specific to the call.

            - :body: (str,optional) - The content of the call or notes about it.
            - :durationMilliseconds: (str,optional) - The duration of the call in milliseconds (e.g., "380000000" for 380 seconds).
            - :fromNumber: (str,optional) - The phone number from which the call was made.
            - :recordingUrl: (str,optional) - A URL to the call recording, if available (can be empty).
            - :status: (str,optional) - The status of the call (e.g., "COMPLETED").
            - :toNumber: (str,optional) - The phone number to which the call was made.
            - :title: (str,optional) - A title or summary of the call.
            - :direction: (str,optional) - The direction of the call (e.g., "INBOUND" or "OUTBOUND").
            - :disposition: (str,optional) - The ID of the disposition associated with the call (used for categorizing the call).
    
        - :engagement: (dict): Contains engagement details.

            - :type: (str,optional) - The type of engagement (should be "CALL" for call engagements).
            - :timestamp: (str, optional) - The timestamp of the engagement in milliseconds since epoch .
    
        - :associations: (dict) - Contains IDs for associations related to the call.

            - :contactIds: (list,optional) - A list of contact IDs associated with the call.
            - :companyIds: (list,optional) - A list of company IDs associated with the call.
            - :dealIds: (list,optional) - A list of deal IDs associated with the call (can be empty).
            - :ownerIds: (list,optional) - A list of owner IDs associated with the call (can be empty).

    :return: details about the created deal
    :rtype: dict

    """
    try:
        if 'metadata' in params and params['metadata']:
            access_token = await hubspot_refresh_access_token(cred)
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
            url = "https://api.hubapi.com/engagements/v1/engagements"
            call = {}
            for key, value in params.items():
                call[key] = value
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, json=call, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status == 201:
                        return result
                    else:
                        raise Exception(result)
        else:
            raise Exception("At least one metadata field needs to set")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def hubspot_get_call(cred, params, **kwargs):
    """
        Returns a call of a specific id

    :param str access_token: retrieved from the hubspot app.   
    :param dict params: contains the id of the call to be returned.

        :id: (str,required) The id of the call to be retrieved.

    :return: details about the retrieved call
    :rtype: dict  
    """
    try:
        if 'id' in params:
            access_token = await hubspot_refresh_access_token(cred)
            url = f"https://api.hubapi.com/engagements/v1/engagements/{params['id']}"
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status == 404:
                        raise Exception("invalid input data")
                    return result
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def hubspot_delete_call(cred, params, **kwargs):
    """
        Deletes a call of a specific id

    :param str access_token: retrieved from the hubspot app.
    :param dict params: contains the id of the call to be deleted.

      :id:  (str,required) the id of the call.
    :return: a statement about the successful deletion of the call
    :rtype: json  
    """
    try:
        if 'id' in params:
            access_token = await hubspot_refresh_access_token(cred)
            url = f"https://api.hubapi.com/engagements/v1/engagements/{params['id']}"
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
            async with aiohttp.ClientSession() as session:
                async with session.delete(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 204:
                        return {"message": f"the Call with id {params['id']} successfully deleted"}
                    else :
                        raise Exception (f"the call id : {params['id']} is incorrect ")
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



operations = {
    "Get Contact": hubspot_get_contact,
    "Create Contact": hubspot_create_contact,
    "Delete Contact": hubspot_delete_contact,
    "Get Ticket": hubspot_get_ticket,
    "Create Ticket": hubspot_create_ticket,
    "Delete Ticket": hubspot_delete_ticket,
    "Get Deal": hubspot_get_deal,
    "Create Deal": hubspot_create_deal,
    "Delete Deal": hubspot_delete_deal,
    "Get Call": hubspot_get_call,
    "Create Call": hubspot_create_call,
    "Delete Call": hubspot_delete_call,
}

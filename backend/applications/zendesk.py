import base64, json
import aiohttp

def zendesk_process_credentials(cred):
    creds = json.loads(cred)
    try:
        if "accessToken" in creds and "baseUrl" in creds:
            accessToken = creds["accessToken"]
            baseUrl = creds["baseUrl"]
            Authorization = f"Bearer {accessToken}"
        elif "apiToken" in creds and "baseUrl" in creds and "email" in creds:
            email = creds["email"]
            apiToken = creds["apiToken"]
            baseUrl = creds["baseUrl"]
            Authorization = f"Basic {base64.b64encode(f'{email}/token:{apiToken}'.encode()).decode()}"
        else:
            raise Exception("Invalid credentials format: Missing required fields.")
        return {"Authorization": Authorization, "baseUrl": baseUrl}
    except Exception as err:
        raise Exception(err)
    
async def zendesk_create_ticket(cred,params, **kwargs):
    """
    Creates a ticket in Zendesk.

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :ticket: (dict, required) - Details of the ticket to be created.

            - :description: (str, required) - Description of the ticket.
            - :external_id: (str, optional) - An ID you can use to link Zendesk tickets to local records.
            - :group_id: (str, optional) - The ID of the group to assign the ticket to.
            - :recipient: (str, optional) - The email address of the person intended to receive the ticket.
            - :requester_id: (str, optional) - The ID of the user requesting the ticket.
            - :status: (str, optional) - The status of the ticket. Examples: "open", "pending", "solved", "closed".
            - :subject: (str, required) - The subject of the ticket.
            - :priority: (str, optional) - The priority of the ticket. Examples: "low", "normal", "high", "urgent".
            - :type: (str, optional) - The type of the ticket. Examples: "problem", "incident", "question", "task".
            - :tags: (list, optional) - Tags associated with the ticket.

    Returns:
        dict: A dictionary containing the created ticket details.
    """
    try:
        creds = zendesk_process_credentials(cred)
        if "description" in params["ticket"]:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            ticket = {}
            for key, value in params.items():
                ticket[key] = value
            url = f"https://{baseUrl}.zendesk.com/api/v2/tickets"
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=ticket) as response:
                    response.raise_for_status()
                    if response.status == 201:
                        result = await response.json()
                        return result
                    raise Exception(response.json())
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zendesk_get_ticket(cred,params, **kwargs):
    """
    Retrieves a specific ticket from Zendesk

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :id: (str,required) - The id of the ticket to be retrieved

    Returns:
      dict: A dictionary containing containing the ticket details.
    """
    try:
        creds = zendesk_process_credentials(cred)
        if "id" in params:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/tickets/{params['id']}"
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        result = await response.json()
                        return result
                    raise Exception(response.json())
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def zendesk_get_all_tickets(cred,params, **kwargs):
    """
    Retrieves all tickets from Zendesk.

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :sort_order: (str,optional) - Sorting order of tickets (e.g., "asc", "desc").
        - :status: (str,optional) - Filter tickets by status (e.g., "open","closed"...).
        - :group_id: (str,optional) - Filter tickets by group ID.

    Returns:
      dict: A dictionary containing the tickets.

    """
    try:
        creds = zendesk_process_credentials(cred)
        Authorization = creds["Authorization"]
        baseUrl = creds["baseUrl"]
        headers = {
            "Authorization": Authorization,
            "Content-Type": "application/json",
        }
        url = f"https://{baseUrl}.zendesk.com/api/v2/search?query=type:ticket"
        if "status" in params and params["status"]:
            url += f'+status:{params["status"]}'
        for key, value in params.items():
            if key == "status":
                continue
            if value:
                url += f"&{key}:{value}"
        async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        result = await response.json()
                        return result
                    raise Exception(response.json())
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zendesk_update_ticket(cred,params, **kwargs):
    """
    Updates a ticket in Zendesk.

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :ticket_id: (str, required) - The ID of the ticket to be updated.
        - :ticket: (dict, required) - Details of the ticket to be updated.

            - :description: (str, optional) - Updated description of the ticket.
            - :external_id: (str, optional) - Updated external ID for linking with local records.
            - :group_id: (str, optional) - Updated group ID to assign the ticket to.
            - :recipient: (str, optional) - Updated recipient email for the ticket.
            - :requester_id: (str, optional) - Updated requester ID.
            - :status: (str, optional) - Updated status of the ticket. Examples: "open", "pending", "solved", "closed".
            - :priority: (str, optional) - Updated priority of the ticket. Examples: "low", "normal", "high", "urgent".
            - :subject: (str, optional) - Updated subject of the ticket.
            - :type: (str, optional) - Updated type of the ticket. Examples: "problem", "incident", "question", "task".
            - :tags: (list of str, optional) - Updated tags associated with the ticket.
            - :assignee_email: (str, optional) - The email address of the agent to assign the ticket to

    Returns:
        dict: A dictionary containing the updated ticket details.
    """
    try:
        creds = zendesk_process_credentials(cred)
        if "ticket_id" in params:
            ticket_id = params["ticket_id"]
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/tickets/{ticket_id}"
            ticket = {}
            for key, value in params.items():
                if value:
                    ticket[key] = value
            async with aiohttp.ClientSession() as session:
                async with session.put(url, headers=headers, json=ticket) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        result = await response.json()
                        return result
                    raise Exception(response.json())
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zendesk_delete_ticket(cred,params, **kwargs):
    """
    Deletes a ticket in Zendesk

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :id: (str, optional) - The ID of the ticket to be deleted.

    Returns:
       dict: A dictionary with a confirmation message indicating successful deletion.
    """
    try:
        creds = zendesk_process_credentials(cred)
        if "id" in params:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/tickets/{params['id']}"
            async with aiohttp.ClientSession() as session:
                async with session.delete(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 204:
                        return {"message": f"Ticket with Id {params['id']} deleted successfully"}
                    raise Exception(response.json())
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zendesk_recover_ticket(cred,params, **kwargs):
    """
    Recovers a previously deleted ticket in Zendesk .

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :id: (str, required) - The ID of the ticket to be recovered.

    Returns:
        dict: A dictionary with a confirmation message indicating the successful recovery of the ticket.
    """
    try:
        creds = zendesk_process_credentials(cred)
        if "id" in params:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/deleted_tickets/{params['id']}/restore"
            async with aiohttp.ClientSession() as session:
                async with session.put(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        return {"message": "Successfully recovered ticket"}
                    raise Exception(response.json())
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zendesk_create_user(cred,params, **kwargs):
    """
    Creates a new user in Zendesk using the provided credentials and user details.

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :user: (dict, required) - Details of the user to create.

            - :name: (str, required) - The full name of the user.
            - :email: (str, required) - The email address of the user.
            - :alias: (str, optional) - An alias displayed to end users
            - :details: (str, optional) - Any details you want to store about the user, such as an address
            - :external_id: (str, optional) - An external ID to associate the user with your system.
            - :locale: (str, optional) - The user's locale.
            - :moderator: (str, optional) - Designates whether the user has forum moderation capabilities
            - :only_private_comments: (bool, optional) - true if the user can only create private comments
            - :organization_id: (str, optional) - The id of the user's organization.
            - :phone: (str, optional) - The user's primary phone number.
            - :restricted_agent: (bool, optional) - If the agent has any restrictions; false for admins and unrestricted agents, true for other agents
            - :role: (str, optional) - The role assigned to the user. Examples: "end-user", "agent", "admin".
            - :signature: (str, optional) - The user's signature. Only agents and admins can have signatures
            - :suspended: (bool, optional) - If the agent is suspended. Tickets from suspended users are also suspended, and these users cannot sign in to the end user portal
            - :ticket_restriction: (str, optional) - Specifies which tickets the user has access to. Possible values are: "organization", "groups", "assigned", "requested", null.
            - :time_zone: (str, optional) - The user's time zone.
            - :verified: (bool, optional) - Whether the user's email is verified. Default is `False`.
            - :tags: (list of str, optional) - Tags to associate with the user.
            - :notes: (str, optional) - Any notes you want to store about the user

    Returns:
        dict: A dictionary containing the details of the newly created user.
    """
    try:
        creds = zendesk_process_credentials(cred)
        if "name" in params["user"] and len(params["user"]["name"]) >= 1:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/users"
            new_user = {}
            for key, value in params.items():
                if value:
                    new_user[key] = value
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=new_user) as response:
                    response.raise_for_status()
                    if response.status == 201:
                        result = await response.json()
                        return result
                    raise Exception(response.json())
        else:
            raise Exception("Name must be at least one character long.")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zendesk_get_user(cred,params, **kwargs):
    """
    Retrieves details of a user from Zendesk .

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :id: (str, optional) - The ID of the user to retrieve.

    Returns:
        dict: A dictionary containing the details of the retrieved user.
    """
    try:
        creds = zendesk_process_credentials(cred)
        if "id" in params:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/users/{params['id']}"
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        result = await response.json()
                        return result
                    raise Exception(response.json())
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zendesk_get_all_users(cred,params, **kwargs):
    """
    Retrieves a list of all users from Zendesk using the provided credentials.

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :role: (str, optional) - Filter users by role. Examples: "end-user", "agent", "admin".

    Returns:
        dict: A dictionary containing the list of users and pagination details.
    """
    try:
        creds = zendesk_process_credentials(cred)
        Authorization = creds["Authorization"]
        baseUrl = creds["baseUrl"]
        headers = {
            "Authorization": Authorization,
            "Content-Type": "application/json",
        }
        url = f"https://{baseUrl}.zendesk.com/api/v2/users"
        query_string = "&".join([f"{key}={value}" for key, value in params.items()])
        full_url = f"{url}?{query_string}"
        async with aiohttp.ClientSession() as session:
                async with session.get(full_url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        result = await response.json()
                        return result
                    raise Exception(response.json())
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zendesk_delete_user(cred,params, **kwargs):
    """
    Deletes a user in Zendesk .

    :param cred: JSON string containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing the parameters for user deletion.

        - :id: (str, required) - The ID of the user to be deleted.

    Returns:
        dict: A dictionary with a confirmation message indicating successful deletion.
    """
    try:
        if "id" in params:
            creds = zendesk_process_credentials(cred)
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/users/{params['id']}"
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        return {"message": f"User with Id {params['id']} deleted successfully"}
                    raise Exception(response.json())
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zendesk_update_user(cred,params, **kwargs):
    """
    Updates an existing user in Zendesk .

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :id: (str, required) - The ID of the user to be updated.
        - :user: (dict, required) - Details of the user to update.

            - :name: (str, optional) - The full name of the user.
            - :email: (str, optional) - The email address of the user.
            - :alias: (str, optional) - An alias displayed to end users.
            - :details: (str, optional) - Additional details about the user (e.g., address).
            - :external_id: (str, optional) - An external ID to associate the user with your system.
            - :locale: (str, optional) - The user's locale setting.
            - :moderator: (bool, optional) - Whether the user has forum moderation capabilities.
            - :only_private_comments: (bool, optional) - `True` if the user can only create private comments.
            - :organization_id: (str, optional) - The ID of the user's organization.
            - :phone: (str, optional) - The user's primary phone number.
            - :restricted_agent: (bool, optional) - `True` if the agent has restrictions; `False` for admins and unrestricted agents.
            - :role: (str, optional) - The role assigned to the user. Examples: `"end-user"`, `"agent"`, `"admin"`.
            - :signature: (str, optional) - The user's signature (only for agents and admins).
            - :suspended: (bool, optional) - `True` if the agent is suspended. Suspended users cannot sign in.
            - :ticket_restriction: (str, optional) - Specifies which tickets the user has access to. Possible values: `"organization"`, `"groups"`, `"assigned"`, `"requested"`, `null`.
            - :time_zone: (str, optional) - The user's time zone.
            - :verified: (bool, optional) - Whether the user's email is verified.
            - :tags: (list of str, optional) - Tags to associate with the user.
            - :notes: (str, optional) - Any additional notes about the user.

    Returns:
        dict: A dictionary containing the updated user details.
    """
    try:
        creds = zendesk_process_credentials(cred)
        if "id" in params:
            id = params["id"]
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/users/{id}"
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            async with aiohttp.ClientSession() as session:
                async with session.put(url, headers=headers, json=data) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        result = await response.json()
                        return result
                    raise Exception(response.json())
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zendesk_get_user_org(cred,params, **kwargs):
    """
    Retrieves the organization details of a user in Zendesk .

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :id: (str, required) - The ID of the user whose organization details are to be retrieved.

    Returns:
        dict: A dictionary containing the organization details of the user.
    """
    try:
        creds = zendesk_process_credentials(cred)
        if "id" in params:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/users/{params['id']}/organizations"
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        result = await response.json()
                        return result
                    raise Exception(response.json())
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zendesk_get_data_related_to_user(cred,params, **kwargs):
    """
    Retrieves various data related to a specific user in Zendesk.

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :id: (str, required) - The ID of the user whose related data is to be retrieved.

    Returns:
        dict: A dictionary containing the related data .

    """
    try:
        creds = zendesk_process_credentials(cred)
        if "id" in params:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/users/{params['id']}/related"
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        result = await response.json()
                        return result
                    raise Exception(response.json())
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def zendesk_search_users(cred,params, **kwargs):
    """
    Searches for users in Zendesk.

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :query: (str, optional) - The search query to filter users. This could be a user's name, email, or any searchable field.
        - :external_id: (str, optional) - The external ID associated with the user. If provided, the search will return users matching this ID.

    Returns:
        dict: A dictionary containing the search results for users.
    """
    try:
        creds = zendesk_process_credentials(cred)
        Authorization = creds["Authorization"]
        baseUrl = creds["baseUrl"]
        headers = {
            "Authorization": Authorization,
            "Content-Type": "application/json",
        }
        url = f"https://{baseUrl}.zendesk.com/api/v2/users/search"
        query_dict = {key: value for key, value in params.items() if value}
        if query_dict:
            url += "?" + "&".join(f"{key}={value}" for key, value in query_dict.items())
        async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        result = await response.json()
                        return result
                    raise Exception(response.json())
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zendesk_get_organization(cred,params, **kwargs):
    """
    Retrieves the details of an organization in Zendesk.

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :id: (str, required) - The ID of the organization whose details are to be retrieved.

    Returns:
        dict: A dictionary containing the details of the requested organization.
    """
    try:
        creds = zendesk_process_credentials(cred)
        if "id" in params:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/organizations/{params['id']}"
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        result = await response.json()
                        return result
                    raise Exception(response.json())
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def zendesk_get_all_organizations(cred,params, **kwargs):
    """
    Retrieves all organizations in Zendesk.

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.

    Returns:
        dict: A dictionary containing the list of organizations and pagination details.
    """
    try:
        creds = zendesk_process_credentials(cred)
        Authorization = creds["Authorization"]
        baseUrl = creds["baseUrl"]
        headers = {
            "Authorization": Authorization,
            "Content-Type": "application/json",
        }
        url = f"https://{baseUrl}.zendesk.com/api/v2/organizations/"
        async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        result = await response.json()
                        return result
                    raise Exception(response.json())
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def zendesk_create_org(cred,params, **kwargs):
    """
    Creates a new organization in Zendesk.

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :organization: (dict, required) - The details of the organization to create.

            - :name: (str, required) - The name of the organization.
            - :tags: (list, optional) - The tags of the organization
            - :details: (str, optional) - Additional details about the organization.
            - :notes: (str, optional) - Notes about the organization.

    Returns:
        dict: A dictionary containing the details of the newly created organization.
    """
    try:
        creds = zendesk_process_credentials(cred)
        if "name" in params["organization"]:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/organizations/"
            data = {}
            for key, value in params.items():
                data[key] = value
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=data) as response:
                    response.raise_for_status()
                    if response.status == 201:
                        result = await response.json()
                        return result
                    raise Exception(response.json())
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def zendesk_update_org(cred,params, **kwargs):
    """
    Updates the details of an existing organization in Zendesk.

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :id: (str, required) - The ID of the organization to be updated.
        - :organization: (dict, required) - The updated details of the organization.

            - :name: (str, optional) - The name of the organization.
            - :tags: (list, optional) - The tags of the organization
            - :details: (str, optional) - Additional details about the organization.
            - :notes: (str, optional) - Notes about the organization.

    Returns:
        dict: A dictionary containing the details of the newly created organization.
    """
    try:
        creds = zendesk_process_credentials(cred)
        if "id" in params:
            id = params["id"]
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/organizations/{id}"
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            async with aiohttp.ClientSession() as session:
                async with session.put(url, headers=headers, json=data) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        result = await response.json()
                        return result
                    raise Exception(response.json())
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zendesk_delete_org(cred,params, **kwargs):
    """
    Deletes an existing organization in Zendesk.

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :id: (str, required) - The ID of the organization to be deleted.

    Returns:
        dict: A dictionary with a confirmation message indicating successful deletion.
    """
    try:
        creds = zendesk_process_credentials(cred)
        if "id" in params:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/organizations/{params['id']}"
            async with aiohttp.ClientSession() as session:
                async with session.delete(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        return {"message": f"Organization with Id {params['id']} deleted successfully"}
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zendesk_get_data_related_to_org(cred,params, **kwargs):
    """
    Retrieves data related to a specific organization in Zendesk .

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.
    :param dict params: Dictionary containing parameters.

        - :id: (str, required) - The ID of the organization whose related data is being retrieved.

    Returns:
        dict: A dictionary containing the related data for the specified organization.

    """
    try:
        creds = zendesk_process_credentials(cred)
        if "id" in params:
            Authorization = creds["Authorization"]
            baseUrl = creds["baseUrl"]
            headers = {
                "Authorization": Authorization,
                "Content-Type": "application/json",
            }
            url = f"https://{baseUrl}.zendesk.com/api/v2/organizations/{params['id']}/related"
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        result = await response.json()
                        return result
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def zendesk_count_organizations(cred,params, **kwargs):
    """
    Retrieves the count of organizations in Zendesk .

    :param dict cred: Dictionary containing the credentials processed by `zendesk_process_credentials`.

    Returns:
        dict: A dictionary containing the count of organizations.
    """
    try:
        creds = zendesk_process_credentials(cred)
        Authorization = creds["Authorization"]
        baseUrl = creds["baseUrl"]
        headers = {
            "Authorization": Authorization,
            "Content-Type": "application/json",
        }
        url = f"https://{baseUrl}.zendesk.com/api/v2/organizations/count"
        async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        result = await response.json()
                        return result
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


operations = {
    "Get Ticket": zendesk_get_ticket,
    "Get All Tickets": zendesk_get_all_tickets,
    "Delete Ticket": zendesk_delete_ticket,
    "Create Ticket": zendesk_create_ticket,
    "Update Ticket": zendesk_update_ticket,
    "Recover Ticket": zendesk_recover_ticket,
    "Get User": zendesk_get_user,
    "Get All Users": zendesk_get_all_users,
    "Delete User": zendesk_delete_user,
    "Create User": zendesk_create_user,
    "Update User": zendesk_update_user,
    "Get User Organization": zendesk_get_user_org,
    "Get Data Related To User": zendesk_get_data_related_to_user,
    "Search User": zendesk_search_users,
    "Get Organization": zendesk_get_organization,
    "Get All Organizations": zendesk_get_all_organizations,
    "Delete Organization": zendesk_delete_org,
    "Create Organization": zendesk_create_org,
    "Update Organization": zendesk_update_org,
    "Get Data Related To Organization": zendesk_get_data_related_to_org,
    "Count Organizations": zendesk_count_organizations,
}
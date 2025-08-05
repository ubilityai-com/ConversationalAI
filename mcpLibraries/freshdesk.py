import requests, json

###########################################################################
successStatus = [200, 201, 202, 204, 206, 207, 208]

# Ticket Actions
def freshdesk_get_ticket(cred, params):
    """
    Retrieve information about a specific ticket.

    :param dict cred: Dictionary containing Freshdesk credentials.

        :domain: (str, required) - The Freshdesk domain for the account.
        :apiKey: (str, required) - The API key for authentication.

    :param dict params: A dictionary containing parameters :

        - :ticket_id: The ID of the ticket to be retrieved.

    Returns:
      dict: A dictionary containing information about the specified ticket.

    """
    try:
        creds = json.loads(cred)
        if "apiKey" in creds and "domain" in creds and "ticket_id" in params:
            apiKey = creds["apiKey"]
            domain = creds["domain"]
            ticket_id = params["ticket_id"]
            url = f"https://{domain}.freshdesk.com/api/v2/tickets/{ticket_id}"
            if ".freshdesk.com" not in domain:
                response = requests.get(url, auth=(apiKey, apiKey))
                result = response.json()
                for item in result:
                    if item == "errors" or item == "code":
                        raise Exception(result)
                return result
            raise Exception(f"Invalid URL detected. Please verify your domain name. Domain: {domain}, URL: {url}")
        else:
            raise Exception("Missing input data")
    except Exception as e:
        if "Expecting value" in str(e):
            raise Exception("Invalid Domain OR Id Not Found")
        else:
            raise Exception(e)

def freshdesk_get_all_tickets(cred, params):
    """
    Get a list of tickets from Freshdesk based on specified parameters.

    :param dict cred: Dictionary containing Freshdesk credentials.

        :domain: (str, required) - The Freshdesk domain for the account.
        :apiKey: (str, required) - The API key for authentication.

    :param dict params: A dictionary containing parameters :

        - :company_id: (str, optional) - The ID of the company associated with the tickets.
        - :requester_id: (str, optional) - The ID of the requester associated with the tickets.
        - :email: (str, optional) - The email address associated with the tickets.
        - :include: (str, optional) - Specify additional details to include (stats, requester, description, company).
        - :updated_since: (str, optional) - Retrieve tickets updated since the specified date.

                (format: "YYYY-MM-DDTHH:MM:SS.000Z")

        - :order_type: (str, optional) - Specify the order type for sorting (asc, desc).
        - :order_by: (str, optional) - Specify the field for sorting tickets

                (Options: created_at, due_by, updated_at, priority, status, fr_due_by, nr_due_by, closed_at)

    Returns:
      dict: A dictionary containing a list of tickets based on the specified parameters.

    """
    try:
        creds = json.loads(cred)
        if "apiKey" in creds and "domain" in creds:
            apiKey = creds["apiKey"]
            domain = creds["domain"]
            url = f"https://{domain}.freshdesk.com/api/v2/tickets"
            if ".freshdesk.com" not in domain:
                query_string = ""
                for key, value in params.items():
                    if value:
                        query_string += f"&{key}={value}"
                if query_string != "":
                    url += f"?{query_string}"
                response = requests.get(url, auth=(apiKey, apiKey))
                result = response.json()
                for item in result:
                    if item == "errors" or item == "code":
                        raise Exception(result)
                return result
            raise Exception(
                f"Invalid URL detected. Please verify your domain name. Domain: {domain}, URL: {url}"
            )
        else:
            raise Exception("Missing input data")
    except Exception as e:
        if "Expecting value" in str(e):
            raise Exception("Invalid Domain")
        else:
            raise Exception(e)

def freshdesk_create_ticket(cred, params):
    """
    Create a new ticket in Freshdesk.

    :param dict cred: Dictionary containing Freshdesk credentials.

        :domain: (str, required) - The Freshdesk domain for the account.
        :apiKey: (str, required) - The API key for authentication.

    :param dict params: A dictionary containing parameters :

        - :description: (str, required) - The description of the ticket.
        - :subject: (str, required) - The subject of the ticket.
        - :priority: (int, required) - The priority of the ticket.

                Options: 1 [Low], 2 [Medium], 3 [High], 4 [Urgent]

        - :status: (int, required) - The status of the ticket.

                Options: 2 [Open], 3 [Pending], 4 [Resolved], 5 [Closed]

        - :source: (int, required) - The source of the ticket (1, 2, 3, 7, 9, 10).

                Options: 1 [Email], 2 [Portal], 3 [Phone], 7 [Chat], 9 [Feedback Widget], 10 [Outbound Email]

        - At least, one of these parameters is required:

            - :email: (str) - Email address of the requester. If no contact exists with this email address in Freshdesk, it will be added as a new contact.
            - :phone: (str) - Phone number of the requester. If no contact exists with this phone number in Freshdesk, it will be added as a new contact. If the phone number is set and the email address is not, then the name attribute is mandatory.
            - :requester_id: (int) - User ID of the requester. For existing contacts, the requester_id can be passed instead of the requester's email.
            - :facebook_id: (str) - Facebook ID of the requester. A contact should exist with this facebook_id in Freshdesk.
            - :unique_external_id: (str) - External ID of the requester. If no contact exists with this external ID in Freshdesk, they will be added as a new contact.
            - :twitter_id: (str) - Twitter handle of the requester. If no contact exists with this handle in Freshdesk, it will be added as a new contact.

        - :type: (str, optional) - Type of the ticket.

                (Options: Refund, Question, Problem, Incident, Feature Request)

        - :tags: (list of str, optional) - List of tags associated with the ticket.
        - :cc_emails: (list of str) - List of email addresses to be CC'd on the ticket.
        - :responder_id: (str, optional) - ID of the agent to whom the ticket has been assigned
        - :company_id: (int, optional) - ID of the company to which this ticket belongs
        - :due_by: (datetime, optional) - Timestamp that denotes when the ticket is due to be resolved
        - :email_config_id: (int, optional) - ID of email config which is used for this ticket.
        - :fr_due_by: (datetime, optional) - Timestamp that denotes when the first response is due
        - :group_id: (int, optional) - ID of the group to which the ticket has been assigned
        - :name: (str, optional) - Name of the requester
        - :product_id: (int, optional) - ID of the product to which the ticket is associated


    Returns:
      dict: A dictionary containing information about the created ticket.

    """
    try:
        creds = json.loads(cred)
        allRequired = [
            "priority",
            "status",
            "source",
            "description",
            "subject",
        ]
        oneRequired = [
            "requester_id",
            "email",
            "facebook_id",
            "phone",
            "twitter_id",
            "unique_external_id",
        ]
        # Check if All items in 'allRequired' exist, and at least one item from 'oneRequired' exists in 'params'
        if "apiKey" in creds and "domain" in creds and all(item in params for item in allRequired) and any(item in params for item in oneRequired):
            apiKey = creds["apiKey"]
            domain = creds["domain"]
            url = f"https://{domain}.freshdesk.com/api/v2/tickets"
            if ".freshdesk.com" not in domain:
                data = {"ticket": {}}
                for key, value in params.items():
                    if value:
                        data["ticket"][key] = value
                response = requests.post(url, auth=(apiKey, apiKey), json=data)
                result = response.json()
                for item in result:
                    if item == "errors" or item == "code":
                        raise Exception(result)
                return result
            else:
                raise Exception(f"Invalid URL detected. Please verify your domain name. Domain: {domain}, URL: {url}")
        else:
            raise Exception("Missing input data")
    except Exception as e:
        if "Expecting value" in str(e):
            raise Exception("Invalid Domain")
        else:
            raise Exception(e)

def freshdesk_delete_ticket(cred, params):
    """
    Delete a specific ticket.

    :param dict cred: Dictionary containing Freshdesk credentials.

        :domain: (str, required) - The Freshdesk domain for the account.
        :apiKey: (str, required) - The API key for authentication.

    :param dict params: A dictionary containing parameters :

        - :ticket_id: The ID of the ticket to be deleted.

    Returns:
      dict: A dictionary containing information about the status of the deletion.

    """
    try:
        creds = json.loads(cred)
        if "apiKey" in creds and "domain" in creds and "ticket_id" in params:
            apiKey = creds["apiKey"]
            domain = creds["domain"]
            ticket_id = params["ticket_id"]
            url = f"https://{domain}.freshdesk.com/api/v2/tickets/{ticket_id}"
            if ".freshdesk.com" not in domain:
                response = requests.delete(url, auth=(apiKey, apiKey))
                if response.status_code in successStatus:
                    return {"Result": f"Deleted ticket ID: {ticket_id}"}
                else:
                    raise Exception(f"Failed to delete the ticket. Status code: {response.status_code}")
            else:
                raise Exception(f"Invalid URL detected. Please verify your domain name. Domain: {domain}, URL: {url}")
        else:
            raise Exception("Missing input data")
    except Exception as e:
        if "Expecting value" in str(e):
            raise Exception("Invalid Domain OR Id Not Found")
        else:
            raise Exception(e)

def freshdesk_update_ticket(cred, params):
    """
    Update an existing ticket.

    :param dict cred: Dictionary containing Freshdesk credentials.

        :domain: (str, required) - The Freshdesk domain for the account.
        :apiKey: (str, required) - The API key for authentication.

    :param dict params: A dictionary containing parameters :

        - :ticket_id: (str, required) - The ID of the ticket to be updated.
        - :description: (str, optional) - The description of the ticket.
        - :subject: (str, optional) - The subject of the ticket.
        - :priority: (int, optional) - The priority of the ticket.

                Options: 1 [Low], 2 [Medium], 3 [High], 4 [Urgent]

        - :status: (int, optional) - The status of the ticket.

                Options: 2 [Open], 3 [Pending], 4 [Resolved], 5 [Closed]

        - :source: (int, optional) - The source of the ticket (1, 2, 3, 7, 9, 10).

                Options: 1 [Email], 2 [Portal], 3 [Phone], 7 [Chat], 9 [Feedback Widget], 10 [Outbound Email]

        - :email: (str) - Email address of the requester. If no contact exists with this email address in Freshdesk, it will be added as a new contact.
        - :phone: (str) - Phone number of the requester. If no contact exists with this phone number in Freshdesk, it will be added as a new contact. If the phone number is set and the email address is not, then the name attribute is mandatory.
        - :requester_id: (int) - User ID of the requester. For existing contacts, the requester_id can be passed instead of the requester's email.
        - :facebook_id: (str) - Facebook ID of the requester. A contact should exist with this facebook_id in Freshdesk.
        - :unique_external_id: (str) - External ID of the requester. If no contact exists with this external ID in Freshdesk, they will be added as a new contact.
        - :twitter_id: (str) - Twitter handle of the requester. If no contact exists with this handle in Freshdesk, it will be added as a new contact.

        - :type: (str, optional) - Type of the ticket.

                (Options: Refund, Question, Problem, Incident, Feature Request)

        - :tags: (list of str, optional) - List of tags associated with the ticket.
        - :cc_emails: (list of str) - List of email addresses to be CC'd on the ticket.
        - :responder_id: (str, optional) - ID of the agent to whom the ticket has been assigned
        - :company_id: (int, optional) - ID of the company to which this ticket belongs
        - :due_by: (datetime, optional) - Timestamp that denotes when the ticket is due to be resolved
        - :email_config_id: (int, optional) - ID of email config which is used for this ticket.
        - :fr_due_by: (datetime, optional) - Timestamp that denotes when the first response is due
        - :group_id: (int, optional) - ID of the group to which the ticket has been assigned
        - :name: (str, optional) - Name of the requester
        - :product_id: (int, optional) - ID of the product to which the ticket is associated

    Returns:
      dict: A dictionary containing information about the updated ticket.

    """
    try:
        creds = json.loads(cred)
        if "apiKey" in creds and "domain" in creds and "ticket_id" in params:
            apiKey = creds["apiKey"]
            domain = creds["domain"]
            ticket_id = params["ticket_id"]
            url = f"https://{domain}.freshdesk.com/api/v2/tickets/{ticket_id}"
            if ".freshdesk.com" not in domain:
                data = {"ticket": {}}
                for key, value in params.items():
                    if key == "ticket_id":
                        continue
                    if value:
                        data["ticket"][key] = value
                response = requests.put(url, auth=(apiKey, apiKey), json=data)
                result = response.json()
                for item in result:
                    if item == "errors" or item == "code" or item == "message":
                        raise Exception(result)
                return result
            else:
                raise Exception(f"Invalid URL detected. Please verify your domain name. Domain: {domain}, URL: {url}")
        else:
            raise Exception("Missing input data")

    except Exception as e:
        if "Expecting value" in str(e):
            raise Exception("Invalid Domain OR Id Not Found")
        else:
            raise Exception(e)

###########################################################################

# Contact Actions

def freshdesk_get_contact(cred, params):
    """
    Retrieve information about a specific contact.

    :param dict cred: Dictionary containing Freshdesk credentials.

        :domain: (str, required) - The Freshdesk domain for the account.
        :apiKey: (str, required) - The API key for authentication.

    :param dict params: A dictionary containing parameters :

        - :contact_id: The ID of the contact to be retrieved.

    Returns:
      dict: A dictionary containing information about the specified contact.

    """
    try:
        creds = json.loads(cred)
        if "apiKey" in creds and "domain" in creds and "contact_id" in params:
            apiKey = creds["apiKey"]
            domain = creds["domain"]
            contact_id = params["contact_id"]
            url = f"https://{domain}.freshdesk.com/api/v2/contacts/{contact_id}"
            if ".freshdesk.com" not in domain:
                response = requests.get(url, auth=(apiKey, apiKey))
                result = response.json()
                for item in result:
                    if item == "errors" or item == "code":
                        raise Exception(result)
                return result
            else:
                raise Exception(f"Invalid URL detected. Please verify your domain name. Domain: {domain}, URL: {url}")
        else:
            raise Exception("Missing input data")
    except Exception as e:
        if "Expecting value" in str(e):
            raise Exception("Invalid Domain OR Id Not Found")
        else:
            raise Exception(e)

def freshdesk_get_all_contacts(cred, params):
    """
    Get a list of contacts from Freshdesk based on specified parameters.

    :param dict cred: Dictionary containing Freshdesk credentials.

        :domain: (str, required) - The Freshdesk domain for the account.
        :apiKey: (str, required) - The API key for authentication.

    :param dict params: A dictionary containing parameters :

        - :company_id: (str, optional) - The ID of the company associated with the contacts.
        - :email: (str, optional) - The email address associated with the contacts.
        - :mobile: (str, optional) - The mobile number associated with the contacts.
        - :phone: (str, optional) - The phone number associated with the contacts.
        - :updated_since: (str, optional) - Retrieve contacts updated since the specified date.

                (format: "YYYY-MM-DDTHH:MM:SS.000Z")

        - :state: (str, optional) - The state of the contacts (blocked, deleted, unverified, verified).

    Returns:
      dict: A dictionary containing a list of contacts based on the specified parameters.

    """
    try:
        creds = json.loads(cred)
        if "apiKey" in creds and "domain" in creds:
            apiKey = creds["apiKey"]
            domain = creds["domain"]
            url = f"https://{domain}.freshdesk.com/api/v2/contacts"
            if ".freshdesk.com" not in domain:
                query_string = ""
                for key, value in params.items():
                    if value:
                        query_string += f"&{key}={value}"
                if query_string != "":
                    url += f"?{query_string}"
                response = requests.get(url, auth=(apiKey, apiKey))
                result = response.json()
                for item in result:
                    if item == "errors" or item == "code":
                        raise Exception(result)
                return result
            else:
                raise Exception(f"Invalid URL detected. Please verify your domain name. Domain: {domain}, URL: {url}")
        else:
            raise Exception("Missing input data")
    except Exception as e:
        if "Expecting value" in str(e):
            raise Exception("Invalid Domain")
        else:
            raise Exception(e)

def freshdesk_create_contact(cred, params):
    """
    Create a new contact in Freshdesk.

    :param dict cred: Dictionary containing Freshdesk credentials.

        :domain: (str, required) - The Freshdesk domain for the account.
        :apiKey: (str, required) - The API key for authentication.

    :param dict params: A dictionary containing parameters :

        - :email: (str, required) - The email address of the contact (unique identifier).
        - :custom_fields: (dict, optional) - Dictionary of custom fields.

                (e.g., {"key": "value"})

        - :other_emails: (list of str, optional) - List of other email addresses associated with the contact.
        - :other_companies: (list of dict, optional) - List of other companies associated with the contact.
            Each dict should have 'company_id' (int) and 'view_all_tickets' (bool).

        - :name: (str, optional) - Name of the contact
        - :address: (str, optional) - Address of the contact.
        - :description: (str, optional) - A small description of the contact
        - :job_title: (str, optional) - Job title of the contact
        - :language: (str, optional) - Language of the contact. Default language is "en". 
        - :mobile: (str, optional) - Mobile number of the contact
        - :phone: (str, optional) - 
        - :time_zone: (str, optional) - 
        - :twitter_id: (str, optional) - 
        - :unique_external_id: (str, optional) - 

        - :company_id: (int, optional) - ID of the primary company to which this contact belongs


    Returns:
      dict: A dictionary containing information about the created contact.

    """
    try:
        creds = json.loads(cred)
        if "apiKey" in creds and "domain" in creds and "email" in params:
            apiKey = creds["apiKey"]
            domain = creds["domain"]
            url = f"https://{domain}.freshdesk.com/api/v2/contacts"
            if ".freshdesk.com" not in domain:
                data = {}
                for key, value in params.items():
                    if value:
                        data[key] = value
                response = requests.post(url, auth=(apiKey, apiKey), json=data)
                result = response.json()
                for item in result:
                    if item == "errors" or item == "code":
                        raise Exception(result)
                return result
            else:
                raise Exception(f"Invalid URL detected. Please verify your domain name. Domain: {domain}, URL: {url}")
        else:
            raise Exception("Missing input data")
    except Exception as e:
        if "Expecting value" in str(e):
            raise Exception("Invalid Domain")
        else:
            raise Exception(e)

def freshdesk_delete_contact(cred, params):
    """
    Delete a specific contact.

    :param dict cred: Dictionary containing Freshdesk credentials.

        :domain: (str, required) - The Freshdesk domain for the account.
        :apiKey: (str, required) - The API key for authentication.

    :param dict params: A dictionary containing parameters :

        - :contact_id: The ID of the contact to be deleted.

    Returns:
      dict: A dictionary containing information about the status of the deletion.

    """
    try:
        creds = json.loads(cred)
        if "apiKey" in creds and "domain" in creds and "contact_id" in params:
            apiKey = creds["apiKey"]
            domain = creds["domain"]
            contact_id = params["contact_id"]
            url = f"https://{domain}.freshdesk.com/api/v2/contacts/{contact_id}"
            if ".freshdesk.com" not in domain:
                response = requests.delete(url, auth=(apiKey, apiKey))
                if response.status_code in successStatus:
                    return {"Result": f"Deleted contact ID: {contact_id}"}
                else:
                    raise Exception(f"Failed to delete the contact. Status code: {response.status_code}")
            else:
                raise Exception(f"Invalid URL detected. Please verify your domain name. Domain: {domain}, URL: {url}")
        else:
            raise Exception("Missing input data")
    except Exception as e:
        if "Expecting value" in str(e):
            raise Exception("Invalid Domain OR Id Not Found")
        else:
            raise Exception(e)

def freshdesk_update_contact(cred, params):
    """
    Update an existing contact.

    :param dict cred: Dictionary containing Freshdesk credentials.

        :domain: (str, required) - The Freshdesk domain for the account.
        :apiKey: (str, required) - The API key for authentication.

    :param dict params: A dictionary containing parameters :

        - :contact_id: The ID of the contact to be updated.
        - (Additional parameters): Other parameters to be updated, such as email, other_emails, etc.

    Returns:
      dict: A dictionary containing information about the updated contact.

    """
    try:
        creds = json.loads(cred)
        if "apiKey" in creds and "domain" in creds and "contact_id" in params:
            apiKey = creds["apiKey"]
            domain = creds["domain"]
            contact_id = params["contact_id"]
            url = f"https://{domain}.freshdesk.com/api/v2/contacts/{contact_id}"
            if ".freshdesk.com" not in domain:
                data = {}
                for key, value in params.items():
                    if key == "contact_id":
                        continue
                    if value:
                        data[key] = value
                response = requests.put(url, auth=(apiKey, apiKey), json=data)
                result = response.json()
                for item in result:
                    if item == "errors" or item == "code" or item == "message":
                        raise Exception(result)
                return result
            else:
                raise Exception(f"Invalid URL detected. Please verify your domain name. Domain: {domain}, URL: {url}")
        else:
            raise Exception("Missing input data")
    except Exception as e:
        if "Expecting value" in str(e):
            raise Exception("Invalid Domain OR Id Not Found")
        else:
            raise Exception(e)

import mimetypes
import aiohttp
import json

import sys,os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from applications.functions import get_file_data, upload_file, normalize_params


async def jira_authenticate(cred):
    creds=json.loads(cred)
    if 'email' in creds and 'apiToken' in creds and 'domain' in creds:
        domain = creds["domain"]
        apiToken = creds["apiToken"]
        email = creds["email"]
        
        async with aiohttp.ClientSession() as session:
            async with session.get(domain) as response:
                if response.status == 200:
                    auth = aiohttp.BasicAuth(email, apiToken)
                    return (domain, auth)
                raise Exception(
                    f"Incorrect domain. Status Code: {response.status}. Response: {await response.text()}"
                )
    else:
        raise Exception('Missing Credentials data')


async def jira_get_issues(json_cred, params, **kwargs):
    """
    Retrieve Jira issues based on specified parameters.

    :param dict params:
        - jql_str (dict): Jira Query Language (JQL) string parameters.
            - project (str): Jira project key. (required)
            - status (str): Desired issue status. (optional)
        - maxResults (int): Maximum number of issues to return. (optional)
        - expand (str): Additional information to include in the response. (optional)
        - fields (str): Comma-separated list of fields to include in the response. (optional)
        - properties (str): Comma-separated list of issue properties to include in the response. (optional)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: List of Jira issues as dictionaries.
    :rtype: list
    """
    try:
        if 'jql_str' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/search/jql"
            headers = {
                "Accept": "application/json"
            }
            data = {}
            jql_parts = []
            for key, value in params.items():
                if key=='jql_str':
                    jql_sub_parts = [f"{sub_key}={sub_value}" for sub_key, sub_value in value.items()]
                    jql_parts.append(' AND '.join(jql_sub_parts))
                elif value:
                    data[key] = value
            jql_query = ' AND '.join(jql_parts)
            data["jql"] = jql_query
            
            data = normalize_params(data)
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, auth=auth, params=data) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def jira_get_issue(json_cred, params, **kwargs):
    """
    Retrieve details of a specific Jira issue.

    :param dict params:
        - id (str): Jira issue ID. (required)
        - expand (str): Additional information to include in the response. (optional)
        - fields (str): Comma-separated list of fields to include in the response. (optional)
        - properties (str): Comma-separated list of issue properties to include in the response. (optional)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: Dictionary containing details of the specified Jira issue.
    :rtype: dict
    """
    try:
        if 'id' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/issue/{params['id']}"
            headers = {
                "Accept": "application/json"
            }
            ignore_keys = ["id"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            data = normalize_params(data)
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, auth=auth, params=data) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def jira_create_issue(json_cred, params, **kwargs):
    """
    Create a new Jira issue.

    :param dict params:
        - project (str): Key or ID of the Jira project. (required)
        - issuetype (str): Type of the issue. (required)
        - summary (str): Summary or title of the issue. (required)
        - description (str): Description of the issue. (optional)
        - reporter (dict): Dictionary containing information about the reporter.
            - id (str): ID of the reporter. (optional)
        - assignee (str): User ID or name to assign the issue. (optional)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: Dictionary containing details of the created Jira issue.
    :rtype: dict
    """
    try:
        if 'project' in params and 'issuetype' in params and 'summary' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/issue"
            headers = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
            data = {
                "fields": {
                    "project": {
                        "key": params["project"]
                    },
                    "issuetype": {
                        "id": params["issuetype"]
                    },
                    "summary": params["summary"]
                }
            }
            if "id" in params.get("reporter", {}):
                data["fields"]["reporter"] = {"id": params["reporter"]["id"]}
            if "assignee" in params:
                data["fields"]["assignee"] = {"id": params["assignee"]}
            if "description" in params:
                data["fields"]["description"] = {
                    "content": [
                        {
                            "content": [
                                {
                                "text": params["description"],
                                "type": "text"
                                }
                            ],
                            "type": "paragraph"
                        },
                    ],
                    "type": "doc",
                    "version": 1
                },
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, headers=headers, auth=auth, json=data) as response:
                    if response.status == 201:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def jira_delete_issue(json_cred, params, **kwargs):
    """
    Delete a Jira issue.

    :param dict params:
        - id (str): ID of the Jira issue to delete. (required)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: Success message indicating the deletion of the Jira issue.
    :rtype: str
    """
    try:
        if 'id' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/issue/{params['id']}"
            
            async with aiohttp.ClientSession() as session:
                async with session.delete(url=url, auth=auth) as response:
                    if response.status == 204:
                        return {"Message": "Issue deleted successfully"}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def jira_create_comment(json_cred, params, **kwargs):
    """
    Create a comment for a Jira issue.

    :param dict params:
        - issue (str): Key or ID of the Jira issue to comment on. (required)
        - body (str): Body text of the comment. (required)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: Information about the created comment.
    :rtype: dict
    """
    try:
        if 'issue' in params and 'body' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/issue/{params['issue']}/comment"
            headers = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
            data = {
                "body": {
                    "content": [
                        {
                            "content": [
                                {
                                    "text": params["body"],
                                    "type": "text"
                                }
                            ],
                            "type": "paragraph"
                        }
                    ],
                    "type": "doc",
                    "version": 1
                },
            }
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, headers=headers, auth=auth, json=data) as response:
                    if response.status == 201:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def jira_get_comments(json_cred, params, **kwargs):
    """
    Retrieve comments for a Jira issue.

    :param dict params:
        - issue (str): Key or ID of the Jira issue to retrieve comments for. (required)
        - expand (str): Additional information to include in the response. (optional)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: List of comments for the specified Jira issue.
    :rtype: list
    """
    try:
        if 'issue' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/issue/{params['issue']}/comment"
            headers = {
                "Accept": "application/json",
            }
            ignore_keys = ["issue"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            data = normalize_params(data)
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, auth=auth, params=data) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def jira_get_comment(json_cred, params, **kwargs):
    """
    Retrieve a specific comment for a Jira issue.

    :param dict params:
        - issue (str): Key or ID of the Jira issue containing the comment. (required)
        - comment (str): ID of the comment to retrieve. (required)
        - expand (str): Additional information to include in the response. (optional)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: Information about the specified Jira comment.
    :rtype: dict
    """
    try:
        if 'issue' in params and 'comment' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/issue/{params['issue']}/comment/{params['comment']}"
            headers = {
                "Accept": "application/json",
            }
            ignore_keys = ['issue', 'comment']
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            data = normalize_params(data)
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, auth=auth, params=data) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def jira_delete_comment(json_cred, params, **kwargs):
    """
    Delete a specific comment for a Jira issue.

    :param dict params:
        - issue (str): Key or ID of the Jira issue containing the comment. (required)
        - comment (str): ID of the comment to delete. (required)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: Success message indicating the comment was deleted.
    :rtype: str
    """
    try:
        if 'issue' in params and 'comment' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/issue/{params['issue']}/comment/{params['comment']}"
            
            async with aiohttp.ClientSession() as session:
                async with session.delete(url=url, auth=auth) as response:
                    if response.status == 204:
                        return {"Message": "Comment deleted successfully"}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def jira_update_comment(json_cred, params, **kwargs):
    """
    Update a specific comment for a Jira issue.

    :param dict params:
        - issue (str): Key or ID of the Jira issue containing the comment. (required)
        - comment (str): ID of the comment to update. (required)
        - body (str): New body text for the comment. (required)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: Success message indicating the comment was updated.
    :rtype: str
    """
    try:
        if 'issue' in params and 'body' in params and 'comment' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/issue/{params['issue']}/comment/{params['comment']}"
            headers = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
            data = {
                "body": {
                    "content": [
                        {
                            "content": [
                                {
                                    "text": params["body"],
                                    "type": "text"
                                }
                            ],
                            "type": "paragraph"
                        }
                    ],
                    "type": "doc",
                    "version": 1
                },
            }
            async with aiohttp.ClientSession() as session:
                async with session.put(url=url, headers=headers, auth=auth, json=data) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def jira_create_attachment(json_cred, params, **kwargs):
    """
    Create an attachment for a specific Jira issue.

    :param dict params:
        - issue (str): Key or ID of the Jira issue for which to create the attachment. (required)
        - filename (str): Name of the attachment file. (required)
        - attachment (str): file name of the attachment on the platform. (required, if 'url' is not provided)
        - url (str): URL of the file to attach. (required, if 'attachment' is not provided)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: Success message indicating the attachment was created successfully.
    :rtype: str
    """
    try:
        if 'issue' in params and ('attachment' in params or 'url' in params) and 'filename' in params:
            filename = params["filename"]
            guessed_mime, _ = mimetypes.guess_type(filename)
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/issue/{params['issue']}/attachments"
            headers = {
                "X-Atlassian-Token": "no-check",
                "Accept": "application/json"
            }
            body = b""
            async with aiohttp.ClientSession() as session:
                if 'attachment' in params:
                    content = params["attachment"]
                    
                    if kwargs:
                        # Extra conv_id & dialogue_id
                        dialogue_id = kwargs.get("dialogue_id")
                        conv_id = kwargs.get("conv_id")
                    # Retrieve file content data
                    contentData = get_file_data(dialogue_id,conv_id,content)
                    if "Error" in contentData:
                        raise Exception(f"Failed to retrieve file content: {contentData['Error']}")
                    # Extract and decode the file content from hex to bytes
                    body = bytes.fromhex(contentData["file_content"])
                elif 'url' in params:
                    try:
                        async with session.get(params["url"]) as url_response:
                            url_response.raise_for_status()
                            body = await url_response.read()
                            
                    except aiohttp.ClientError as e:
                        raise Exception(f"Error downloading file from URL: {e}")
                    except Exception as err:
                        raise Exception(f"Error downloading file from URL: {e}")
                    if not body:
                        raise Exception("File content is empty.")
                else:
                    raise Exception('Missing input data')
                data = aiohttp.FormData()
                data.add_field('file',
                            body,
                            filename=filename,
                            content_type=(guessed_mime or 'application/octet-stream'))
                
                async with session.post(url=url, headers=headers, auth=auth, data=data) as response:
                    if response.status == 200:
                        return {"attachments": await response.json()}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def jira_get_attachments(json_cred, params, **kwargs):
    """
    Retrieve information about attachments for a specific Jira issue.

    :param dict params:
        - id (str): Key or ID of the Jira issue for which to retrieve attachments. (required)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: List of dictionaries containing information about attachments for the specified Jira issue.
    :rtype: list[dict]
    """
    try:
        if 'id' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/issue/{params['id']}"
            headers = {
                "Accept": "application/json"
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, auth=auth) as response:
                    if response.status == 200:
                        result = await response.json()
                        attachments = result.get('fields', {}).get('attachment', [])
                        return {"attachments": attachments}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def jira_download_attachment(json_cred, params, **kwargs):
    """
    Retrieve a specific attachment from Jira.

    :param dict params:
        - id (str): ID of the attachment to download. (required)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: Dictionary containing information about the downloaded Jira attachment.
    :rtype: dict
    """
    try:
        if 'id' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/attachment/content/{params['id']}"
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, auth=auth) as response:
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
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def jira_get_attachment(json_cred, params, **kwargs):
    """
    Retrieve information about a specific attachment in Jira.

    :param dict params:
        - id (str): ID of the attachment to retrieve. (required)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: Dictionary containing information about the specified Jira attachment.
    :rtype: dict
    """
    try:
        if 'id' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/attachment/{params['id']}"
            headers = {
                "Accept": "application/json"
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, auth=auth) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}


async def jira_delete_attachment(json_cred, params, **kwargs):
    """
    Delete a specific attachment in Jira.

    :param dict params:
        - id (str): ID of the attachment to delete. (required)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: Success message indicating the attachment was deleted.
    :rtype: str
    """
    try:
        if 'id' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/attachment/{params['id']}"
            
            async with aiohttp.ClientSession() as session:
                async with session.delete(url=url, auth=auth) as response:
                    if response.status == 204:
                        return {"Message": "Attachment deleted successfully"}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def jira_create_user(json_cred, params, **kwargs):
    """
    Create a new user in Jira.

    :param dict params:
        - email (str): Email address for the new user. (required)
        - products(list of str): List of product keys to assign to the user. if not added, the new user will not be assigned any product. Possible Values: (jira-core, jira-servicedesk, jira-product-discovery, jira-software) (optional)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: the newly created user information.
    :rtype: dict
    """
    try:
        if 'email' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/user"
            headers = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
            data = {
                "emailAddress": params["email"],
                "products": params.get("products", [])
            }
            async with aiohttp.ClientSession() as session:
                async with session.post(url=url, headers=headers, auth=auth, json=data) as response:
                    if response.status == 201:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def jira_get_users(json_cred, params, **kwargs):
    """
    Get a list of users from Jira based on the specified query.

    :param dict params:
        - query (str): Query string to search for users. (required)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: List of users matching the specified query.
    :rtype: list
    """
    try:
        if 'query' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/user/search"
            headers = {
                "Accept": "application/json"
            }
            ignore_keys = []
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            data = normalize_params(data)
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, auth=auth, params=data) as response:
                    if response.status == 200:
                        users = await response.json()
                        return {"Users": users}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def jira_get_user(json_cred, params, **kwargs):
    """
    Get information about a user from Jira based on the specified user ID.

    :param dict params:
        - id (str): User ID for fetching user information. (required)
        - expand (str): Additional information to include in the response. (optional)

    :param JSON str cred: Used for Jira authentication. (required)

    :return: Information about the specified user.
    :rtype: dict
    """
    try:
        if 'id' in params:
            domain, auth = await jira_authenticate(json_cred)
            url = f"{domain}/rest/api/3/user"
            headers = {
                "Accept": "application/json"
            }
            ignore_keys = ["id"]
            data = {
                key: value
                for (key, value) in params.items()
                if value
                if key not in ignore_keys
            }
            data["accountId"] = params["id"]
            
            data = normalize_params(data)
            async with aiohttp.ClientSession() as session:
                async with session.get(url=url, headers=headers, auth=auth, params=data) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing input data')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



operations = {
    "Get Issue": jira_get_issue,
    "List Issues": jira_get_issues,
    "Create Issue": jira_create_issue,
    "Delete Issue": jira_delete_issue,
    "Create Comment": jira_create_comment,
    "Get Many Comment": jira_get_comments,
    "Get Comment": jira_get_comment,
    "Delete Comment": jira_delete_comment,
    "Update Comment": jira_update_comment,
    "Create User": jira_create_user,
    "Create Attachment": jira_create_attachment,
    "Get Many Attachment": jira_get_attachments,
    "Get Attachment": jira_get_attachment,
    "Download Attachment": jira_download_attachment,
    "Delete Attachment": jira_delete_attachment,
    "Get Many User": jira_get_users,
    "Get User": jira_get_user
}
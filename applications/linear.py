import json
import aiohttp

LINEAR_GRAPHQL_URL = "https://api.linear.app/graphql"

async def get_auth_headers(cred):
    """
    Extract authorization headers from credentials JSON string.

    :param dict cred:
        A dictionary containing the API key for authentication.

        - :apiKey (str): Linear API token used for authorization. (REQUIRED)

    :return: A dictionary containing the Authorization header in the format expected by the Linear API.
    :rtype: dict
    """
    creds = json.loads(cred)
    if "apiKey" not in creds:
        raise Exception("Missing 'apiKey' in credentials")

    return {
        "Authorization": creds["apiKey"],
        "Content-Type": "application/json"
    }

async def linear_get_all_issues(json_cred, params, **kwargs):
    """
    Execute a GraphQL query to retrieve issues from Linear using an API token.

    :param dict cred:
        A dictionary containing the API key for authentication.
        
        - :apiKey: (str): Linear API token used for authorization. (REQUIRED)

    :param dict params: (REQUIRED)
        A dictionary containing GraphQL variables for the query.

        The dictionary must include the following keys:

        - :first: (int, OPTIONAL): The number of issues to retrieve.

    :return: A dictionary containing the JSON response from the Linear GraphQL API or an error message.
    :rtype: dict
    """

    try:
        query = """
        query GetIssues($first: Int!) {
          issues(first: $first) {
            nodes {
              id
              title
              state {
                name
              }
              createdAt
              updatedAt
              url
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
        """
        headers = await get_auth_headers(json_cred)
        json_data = {
            "query": query,
            "variables": params
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(LINEAR_GRAPHQL_URL, json=json_data, headers=headers) as response:
                try:
                    response.raise_for_status()
                    return await response.json()
                except aiohttp.ClientResponseError as e:
                    error_text = await response.text()
                    raise Exception({
                        "Error": str(e),
                        "Response": error_text
                    })
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def linear_get_issue(json_cred, params, **kwargs):
    """
    Retrieve a specific issue from Linear using its ID.

    :param dict cred:
        A dictionary containing the API key for authentication.

        - :apiKey: (str): Linear API token used for authorization. (REQUIRED)

    :param dict params: (REQUIRED)
        A dictionary containing the required input to identify the issue.

        The dictionary must include the following key:

        - :id: (str, REQUIRED): The unique identifier of the Linear issue to retrieve.

    :return: A dictionary containing the JSON response from the Linear GraphQL API or an error message.
    :rtype: dict
    """
    try:
        if "id" in params:
            query = """
            query GetIssue($id: String!) {
              issue(id: $id) {
                id
                identifier
                title
                priority
                archivedAt
                assignee {
                  id
                  displayName
                }
                state {
                  id
                  name
                }
                createdAt
                creator {
                  id
                  displayName
                }
                description
                dueDate
                cycle {
                  id
                  name
                }
              }
            }
            """
            headers = await get_auth_headers(json_cred)
            json_data = {
                "query": query,
                "variables":params
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.post(LINEAR_GRAPHQL_URL, json=json_data, headers=headers) as response:
                    try:
                        response.raise_for_status()
                        return await response.json()
                    except aiohttp.ClientResponseError as e:
                        error_text = await response.text()
                        raise Exception({
                            "Error": str(e),
                            "Response": error_text
                        })
        else:
            raise Exception("Missing required parameter: 'id'")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def linear_delete_issue(json_cred, params, **kwargs):
    """
    Execute a GraphQL mutation to delete an issue from Linear using API token authentication.

    :param dict cred:
        A dictionary containing the API key for authentication.

        - :apiKey: (str): Linear API token used for authorization. (REQUIRED)

    :param dict params: (REQUIRED)
        A dictionary containing the required input to delete the issue.

        The dictionary must include the following key:

        - :id: (str, REQUIRED): The unique identifier of the Linear issue to delete.

    :return: A dictionary containing the JSON response from the Linear GraphQL API or an error message.
    :rtype: dict
    """

    try:
        if "id" in params:
            query = """
            mutation DeleteIssue($id: String!) {
              issueDelete(id: $id) {
                success
              }
            }
            """
            headers = await get_auth_headers(json_cred)
            json_data = {
                "query": query,
                "variables": params
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.post(LINEAR_GRAPHQL_URL, json=json_data, headers=headers) as response:
                    try:
                        response.raise_for_status()
                        return await response.json()
                    except aiohttp.ClientResponseError as e:
                        error_text = await response.text()
                        raise Exception({
                            "Error": str(e),
                            "Response": error_text
                        })
        else:
            raise Exception("Missing required data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def linear_create_issue(json_cred, params, **kwargs):
    """
    Execute a GraphQL mutation to create an issue in Linear using API token authentication.

    :param dict cred:
        A dictionary containing the API key for authentication.

        - :apiKey: (str): Linear API token used for authorization. (REQUIRED)

    :param dict params: (REQUIRED)
        A dictionary containing the required and optional fields to create the issue.

        The dictionary may include the following keys:

        - :title: (str, REQUIRED): The title of the issue.
        - :description: (str, OPTIONAL): Detailed description of the issue.
        - :teamId: (str, REQUIRED): UUID of the team to which the issue belongs.
        - :priority: (int, OPTIONAL): Priority level of the issue (e.g., 0 is lowest).
        - :assigneeId: (str, OPTIONAL): UUID of the user assigned to the issue.
        - :stateId: (str, OPTIONAL): UUID of the issue's state.

    :return: A dictionary containing the JSON response from the Linear GraphQL API or an error message.
    :rtype: dict
    """

    try:
        if "title" in params and "teamId" in params:
            query = """
            mutation CreateIssue($input: IssueCreateInput!) {
              issueCreate(input: $input) {
                success
                issue {
                  id
                  identifier
                  title
                  description
                  createdAt
                  state {
                    id
                    name
                  }
                  creator {
                    id
                    displayName
                  }
                  description
                  dueDate
                  cycle {
                  id
                  name
                }
                }
              }
            }
            """
            headers = await get_auth_headers(json_cred)
            json_data = {
                "query": query,
                "variables":{
                    "input": params 
                }
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.post(LINEAR_GRAPHQL_URL, json=json_data, headers=headers) as response:
                    try:
                        response.raise_for_status()
                        return await response.json()
                    except aiohttp.ClientResponseError as e:
                        error_text = await response.text()
                        raise Exception({
                            "Error": str(e),
                            "Response": error_text
                        })
        else:
            raise Exception("Missing required data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def linear_update_issue(json_cred, params, **kwargs):
    """
    Execute a GraphQL mutation to update an issue in Linear using API token authentication.

    :param dict cred:
        A dictionary containing the API key for authentication.

        - :apiKey: (str): Linear API token used for authorization. (REQUIRED)

    :param dict params: (REQUIRED)
        A dictionary containing the required issue ID and the fields to update.

        The dictionary must include the following keys:

        - :id: (str, REQUIRED): The unique identifier of the issue to update.
        - :input: (dict, REQUIRED): A dictionary of fields to update. May include:

            - :title: (str, OPTIONAL): The new title of the issue.
            - :description: (str, OPTIONAL): A detailed description of the issue.
            - :priority: (int, OPTIONAL): Priority level (0 = lowest).
            - :assigneeId: (str, OPTIONAL): UUID of the user assigned to the issue.
            - :stateId: (str, OPTIONAL): UUID of the issue's state.
            - :dueDate: (str, OPTIONAL): The due date in ISO 8601 format.
            - :labels: (list of str, OPTIONAL): List of label UUIDs associated with the issue.
            - :teamId: (str, OPTIONAL): UUID of the team related to the issue.

    :return: A dictionary containing the JSON response from the Linear GraphQL API or an error message.
    :rtype: dict
    """
    try:
        if "id" in params:
            query = """
            mutation UpdateIssue($id: String!, $input: IssueUpdateInput!) {
              issueUpdate(id: $id, input: $input) {
                success
                issue {
                  id
                  identifier
                  title
                  description
                  priority
                  state {
                    id
                    name
                  }
                  creator {
                    id
                    displayName
                  }
                  description
                  dueDate
                  cycle {
                  id
                  name
                  }
                  updatedAt
                }
              }
            }
            """
            headers = await get_auth_headers(json_cred)
            json_data = {
                "query": query,
                "variables": {
                    "id": params["id"],
                    "input": params["input"]
                }
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.post(LINEAR_GRAPHQL_URL, json=json_data, headers=headers) as response:
                    try:
                        response.raise_for_status()
                        return await response.json()
                    except aiohttp.ClientResponseError as e:
                        error_text = await response.text()
                        raise Exception({
                            "Error": str(e),
                            "Response": error_text
                        })
        else:
            raise Exception("Missing required data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def linear_add_comment(json_cred, params, **kwargs):
    """
    Execute a GraphQL mutation to add a comment to a Linear issue using API token authentication.

    :param dict cred:
        A dictionary containing the API key for authentication.

        - :apiKey: (str): Linear API token used for authorization. (REQUIRED)

    :param dict params: (REQUIRED)
        A dictionary containing the fields required to create the comment.

        The dictionary must include the following key:

        - :input: (dict, REQUIRED): A dictionary with comment creation fields. Must include:

            - :issueId: (str, REQUIRED): The unique identifier of the issue to comment on.
            - :body: (str, REQUIRED): The content/body of the comment.

    :return: A dictionary containing the JSON response from the Linear GraphQL API or an error message.
    :rtype: dict
    """
    try:
        if "issueId" in params and "body" in params:
            query = """
            mutation CreateComment($input: CommentCreateInput!) {
              commentCreate(input: $input) {
                success
                comment {
                  id
                  body
                  createdAt
                  user {
                    id
                    displayName
                  }
                }
              }
            }
            """
            headers = await get_auth_headers(json_cred)
            json_data = {
                "query": query,
                "variables": {
                    "input": params
                }
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.post(LINEAR_GRAPHQL_URL, json=json_data, headers=headers) as response:
                    try:
                        response.raise_for_status()
                        return await response.json()
                    except aiohttp.ClientResponseError as e:
                        error_text = await response.text()
                        raise Exception({
                            "Error": str(e),
                            "Response": error_text
                        })
        else:
            raise Exception("Missing required data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def linear_add_link_issue(json_cred, params, **kwargs):
    """
    Adds a link (attachment) to a Linear issue using GraphQL.

    :param dict cred:
        A dictionary containing the API key for authentication.

        - :apiKey: (str): Linear API token used for authorization. (REQUIRED)

    :param dict params: (REQUIRED)
        A dictionary containing the required fields to add the attachment.

        Must include the following keys:

        - :issueId: (str, REQUIRED): The UUID of the issue to attach the link to.
        - :title: (str, REQUIRED): The title of the attachment.
        - :url: (str, REQUIRED): The URL/link to be attached.

    :return: A dictionary containing the JSON response from the Linear GraphQL API or an error message.
    :rtype: dict
    """
    try:
        if "issueId" in params and "url" in params and "title" in params:
            query = """
            mutation CreateAttachment($input: AttachmentCreateInput!) {
              attachmentCreate(input: $input) {
                success
                attachment {
                  id
                  title
                  url
                }
              }
            }
            """
            json_data = {
                "query": query,
                "variables": {
                    "input": params
                }
            }
            headers = await get_auth_headers(json_cred)
            
            async with aiohttp.ClientSession() as session:
                async with session.post(LINEAR_GRAPHQL_URL, json=json_data, headers=headers) as response:
                    try:
                        response.raise_for_status()
                        return await response.json()
                    except aiohttp.ClientResponseError as e:
                        error_text = await response.text()
                        raise Exception({
                            "Error": str(e),
                            "Response": error_text
                        })
        else:
            raise Exception("Missing required data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



operations = {
    'Get All Issues':linear_get_all_issues,
    'Get Issues':linear_get_issue,
    'Delete Issues':linear_delete_issue,
    'Create Issues':linear_create_issue,
    'Update Issues':linear_update_issue,
    'Add Link Issues':linear_add_link_issue,
    'Add Comment Issues':linear_add_comment
}
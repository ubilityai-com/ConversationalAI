import aiohttp
import base64
import json

def get_auth_headers(cred):
    """
    Generate authentication headers based on the provided credentials dictionary.
    The function auto-detects the auth_type based on the provided keys in cred.

    :param dict cred: Dictionary containing authentication parameters.
    :return: Dictionary containing authentication headers.
    :rtype: dict
    """
    try:
        headers = {}
        if cred.get('apiKey') and cred.get('apiPassword'):
            auth_value = base64.b64encode(f"{cred['apiKey']}:{cred['apiPassword']}".encode()).decode('utf-8')
            headers['Authorization'] = f'Basic {auth_value}'
        elif cred.get('accessToken'):
            headers['Authorization'] = f"Bearer {cred['accessToken']}"
        elif cred.get('apiKey'):
            headers['Authorization'] = f"APIKey {cred['apiKey']}"
        elif not cred:
            headers = {}
        else:
            raise ValueError("Invalid or incomplete authentication credentials.")
        return headers
    except Exception as error:
        raise Exception(error)
    
async def graphql_query_Post(cred, params,**kwargs):
    """
    Execute a GraphQL query with the specified authentication.

    :param str url: (REQUIRED) The URL to the GraphQL endpoint.
    :param str query: (REQUIRED) The GraphQL query string.
    :param str auth_type: (REQUIRED) The type of authentication ('API_TOKEN', 'BASIC_AUTH', 'OAUTH', 'JWT').
    :param str api_token: (OPTIONAL) The API token used for authentication.
    :param str username: (OPTIONAL) The username for Basic Auth.
    :param str password: (OPTIONAL) The password for Basic Auth.
    :param str oauth_token: (OPTIONAL) The OAuth token used for authentication.
    :return: The response data from the GraphQL query.
    :rtype: dict
    """
    try:
        creds = json.loads(cred)
        if "query" in params and "variables" in params and "url" in params:
            headers = get_auth_headers(creds)
            json_data = {
                "query": params.get("query"),
                "variables": params.get("variables", {}),
            }
            async with aiohttp.ClientSession() as session:
                async with session.post(params.get("url"), json=json_data, headers=headers) as response:
                    response.raise_for_status()
                    result = await response.json()
                    if response.status == 200:
                        return result
                    return {"Error": result}
        else:
            raise Exception("Missing Input Data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

operations = {
    "Graphql Post":graphql_query_Post
}
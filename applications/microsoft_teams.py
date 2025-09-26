import json
import aiohttp
import os,sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from applications.functions import normalize_params

status = [200, 201, 202, 204, 206, 207, 208]

async def ref_token(creds):
    try:
        cred=json.loads(creds)
        token_endpoint="https://login.microsoftonline.com/common/oauth2/v2.0/token"
        request_body = {
            'client_id': cred['clientId'],
            'client_secret': cred['clientSecret'],
            'scope': ' '.join(['https://graph.microsoft.com/.default'] +['offline_access']),
            'refresh_token': cred['refreshToken'],
            'grant_type': 'refresh_token',
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(token_endpoint, data=request_body) as response:
                result = await response.json()
                if "access_token" in result and response.status in status:
                    return result["access_token"]
                else:
                    raise Exception(
                        f"Token request failed with status code {response.status}: {await response.text()}"
                    )
    except Exception as e:
        raise Exception(e)
    
async def microsoft_teams_get_many_teams(json_cred, params, **kwargs):  
    """
    Retrieve information about joined teams in Microsoft Teams.

    :param str accessToken: Microsoft Graph API access token. (required)

    :return: Information about the joined teams.
    :rtype: dict
    """
    try:
        accessToken = await ref_token(json_cred)
        graph_endpoint = "https://graph.microsoft.com/v1.0/me/joinedTeams"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {accessToken}",
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(graph_endpoint, headers=headers) as response:
                if response.status in status:
                    return await response.json()
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def microsoft_teams_create_team(json_cred, params, **kwargs):
    """
    Create a new team in Microsoft Teams.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - displayName (str): Display name of the new team. (required)
        - description (str): Description of the new team. (optional)
        - template@odata.bind (str): Template for the new team. (required)

    :return: A dictionary with a success message indicating the resource was created.
    :rtype: dict
    """
    try:
        accessToken = await ref_token(json_cred)
        if 'displayName' and 'template@odata.bind' in params:
            graph_endpoint = "https://graph.microsoft.com/v1.0/teams"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {accessToken}",
            }
            async with aiohttp.ClientSession() as session:
                async with session.post(graph_endpoint, headers=headers, json=params) as response:
                    if response.status in status:
                        return {"message":"Created successfully."}
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def microsoft_teams_get_channels_for_team(json_cred, params, **kwargs):
    """
    Retrieve channels for a team in Microsoft Teams.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - team_id (str): ID of the team to retrieve channels for. (required)

    :return: Information about the channels in the team.
    :rtype: dict
    """
    try:
        accessToken = await ref_token(json_cred)
        if "team_id" in params:
            team_id = params.pop("team_id")
            graph_endpoint = f"https://graph.microsoft.com/v1.0/teams/{team_id}/channels"
            headers = {
                "Authorization": f"Bearer {accessToken}",
            }
            params = normalize_params(params)
            async with aiohttp.ClientSession() as session:
                async with session.get(graph_endpoint, headers=headers, params=params) as response:
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def microsoft_teams_get_channel(json_cred, params, **kwargs):
    """
    Retrieve information about a channel in a team in Microsoft Teams.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - team_id (str): ID of the team containing the channel. (required)
        - channel_id (str): ID of the channel to retrieve. (required)

    :return: Information about the specified channel.
    :rtype: dict
    """
    try:
        accessToken = await ref_token(json_cred)
        if "team_id" and "channel_id" in params:
            graph_endpoint = f"https://graph.microsoft.com/v1.0/teams/{params['team_id']}/channels/{params['channel_id']}"
            headers = {
                "Authorization": f"Bearer {accessToken}",
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(graph_endpoint, headers=headers) as response:
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def microsoft_teams_send_message(json_cred, params, **kwargs):
    """
    Send a message to a channel in a team in Microsoft Teams.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - team_id (str): ID of the team containing the channel. (required)
        - channel_id (str): ID of the channel to send the message to. (required)
        - body (dict): Message body containing the content. (required)
            - content (str): Content of the message. (required)
            - contentType (str): Type of content. (optional)

    :return: Information about the sent message.
    :rtype: dict
    """
    try:
        accessToken = await ref_token(json_cred)
        if "team_id" in params and "channel_id" in params:
            team_id = params.pop("team_id")
            channel_id = params.pop("channel_id")
            graph_endpoint = f"https://graph.microsoft.com/v1.0/teams/{team_id}/channels/{channel_id}/messages"
            headers = {
                "Authorization": f"Bearer {accessToken}",
                "Content-Type": "application/json"
            }
            async with aiohttp.ClientSession() as session:
                async with session.post(graph_endpoint, headers=headers, json=params) as response:
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def microsoft_teams_create_channel(json_cred, params, **kwargs):
    """
    Create a new channel in Microsoft Teams.

    :param str accessToken: Microsoft Graph API access token. (required)
    :param dict params:
        - displayName (str): Display name of the new channel. (required)
        - description (str): Description of the new channel. (optional)
        - team_id (str): ID of the team to create channel  (required)

    :return: Information about the new channel in the team.
    :rtype: dict
    """
    try:
        accessToken = await ref_token(json_cred)
        if 'displayName' and 'team_id' in params:
            team_id=params["team_id"]
            graph_endpoint = f"https://graph.microsoft.com/v1.0/teams/{team_id}/channels"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {accessToken}",
            }
            async with aiohttp.ClientSession() as session:
                async with session.post(graph_endpoint, headers=headers, json=params) as response:
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def microsoft_teams_get_many_chatmessages(json_cred, params, **kwargs):  
    """
    Retrieve information about messages in a Microsoft Teams channel.

    :param str accessToken: Microsoft Graph API access token. (required)
        - team_id (str): The ID of the Microsoft Team. (required)
        - channel_id (str): The ID of the channel within the team. (required)

    :return: A dictionary containing information about the messages in the specified channel.
    :rtype: dict
    """
    try:
        accessToken = await ref_token(json_cred)
        if 'team_id' and 'channel_id' in params:
            team_id=params["team_id"]
            channel_id=params["channel_id"]
            graph_endpoint = f"https://graph.microsoft.com/v1.0/teams/{team_id}/channels/{channel_id}/messages"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {accessToken}",
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(graph_endpoint, headers=headers) as response:
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}
    
async def microsoft_teams_get_chatmessage(json_cred, params, **kwargs):  
    """
    Retrieve information about a specific message in a Microsoft Teams channel.

    :param str accessToken: Microsoft Graph API access token. (required)
        - team_id (str): The ID of the Microsoft Team. (required)
        - channel_id (str): The ID of the channel within the team. (required)
        - message_id (str): The ID of the message to retrieve. (required)

    :return: A dictionary containing details about the specified message.
    :rtype: dict
    """
    try:
        accessToken = await ref_token(json_cred)
        if 'team_id' and 'channel_id' and 'message_id' in params:
            team_id=params["team_id"]
            channel_id=params["channel_id"]
            message_id=params["message_id"]
            graph_endpoint = f"https://graph.microsoft.com/v1.0/teams/{team_id}/channels/{channel_id}/messages/{message_id}"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {accessToken}",
            }
            async with aiohttp.ClientSession() as session:
                async with session.get(graph_endpoint, headers=headers) as response:
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception("Missing input data")
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



operations = {
    'Get Many Teams':microsoft_teams_get_many_teams,
    'Create Team':microsoft_teams_create_team,
    'Get Many Channels':microsoft_teams_get_channels_for_team,
    'Get Channel':microsoft_teams_get_channel,
    'Send Message':microsoft_teams_send_message,
    'Create Channel':microsoft_teams_create_channel,
    'Get Many ChatMessage':microsoft_teams_get_many_chatmessages,
    'Get ChatMessage':microsoft_teams_get_chatmessage
}
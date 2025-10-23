import json
import aiohttp
import os,sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from applications.functions import normalize_params
status=[200, 201, 202, 204, 206, 207, 208]

async def refresh_access_token(cred):
    try:
        creds=json.loads(cred)
        token_params = {
            'grant_type': 'refresh_token',
            'refresh_token':creds['refreshToken'],
            'client_id': creds['clientID'],
            'client_secret': creds['clientSecret'],
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.post('https://zoom.us/oauth/token', data=token_params) as response:
                response.raise_for_status()
                result = await response.json()
                if "access_token" in result:
                    return result["access_token"]
                raise Exception(
                    f"Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        raise Exception(e)
    except Exception as err:
        raise Exception(err)

async def zoom_create_meeting(json_cred, params, **kwargs):
    """
    Create a Zoom meeting.

    :param dict params:
        - topic (str): Topic of the meeting. (required)
        - agenda (str): Agenda for the meeting. (optional)
        - duration (int): Duration of the meeting in minutes. (optional)
        - password (str): Password for the meeting. (optional)
        - schedule_for (str): Email address of the user to schedule the meeting for. (optional)
        - start_time (str): Start time of the meeting in the format "YYYY-MM-DDTHH:mm:ssZ". (optional)
        - timezone (str): Timezone for the meeting. (optional)
        - type (int): Type of meeting. (required)
        - settings (dict):
            - audio (str): Audio options for the meeting. (optional)
            - alternative_hosts (str): Email addresses of alternative hosts for the meeting. (optional)
            - auto_recording (str): Auto-recording setting for the meeting. (optional)
            - host_video (boolean): Start video when the host joins the meeting. (optional)
            - join_before_host (boolean): Allow participants to join the meeting before the host starts the meeting. (optional)
            - mute_upon_entry (boolean): Mute participants upon entry. (optional)
            - participant_video (boolean): Start video when participants join the meeting. (optional)
            - watermark (boolean): Whether to add a watermark when viewing a shared screen. (optional)
            - registration_type (int): Registration type for the meeting. (optional)

    :return: Information about the created Zoom meeting.
    :rtype: dict
    """
    try:
        access_token = await refresh_access_token(json_cred)
        data = {}
        for key, value in params.items():
            if value:
                data[key] = value
        url = 'https://api.zoom.us/v2/users/me/meetings'
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json',
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=headers, json=data) as response:
                if response.status in status:
                    return await response.json()
                raise Exception(
                    f"Meeting creation failed. Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zoom_get_meeting(json_cred, params, **kwargs):
    """
    Retrieve information about a Zoom meeting.

    :param dict params:
        - meetingId (str): ID of the Zoom meeting to retrieve information. (required)
        - occurrences (list):
            - occurrence_id: Occurrence Id for the meeting. (optional)

    :return: Information about the Zoom meeting.
    :rtype: dict
    """
    try:
        access_token = await refresh_access_token(json_cred)
        if 'meetingId' in params:
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            url = f'https://api.zoom.us/v2/meetings/{data["meetingId"]}'
            headers = {
                'Authorization': f'Bearer {access_token}',
                'Content-Type': 'application/json',
            }
            
            data = normalize_params(data)
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers, params=data) as response:
                    if response.status in status:
                        return await response.json()
                    raise Exception(
                        f"Meeting retrieval failed. Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing parameters')  
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zoom_list_meetings(json_cred, params, **kwargs):
    """
    List Zoom meetings for a specific user.

    :param dict params:
        - page_size (int): Number of meetings per page. (optional)
        - type (str): Type of meetings to list. (optional)

    :return: List of Zoom meetings.
    :rtype: dict
    """
    try:
        access_token = await refresh_access_token(json_cred)
        data = {}
        for key, value in params.items():
            if value:
                data[key] = value
        url = 'https://api.zoom.us/v2/users/me/meetings'
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json',
        }
        
        data = normalize_params(data)
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, params=data) as response:
                if response.status in status:
                    return await response.json()
                raise Exception(
                    f"Meeting listing failed. Status Code: {response.status}. Response: {await response.text()}"
                )
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zoom_update_meeting(json_cred, params, **kwargs):
    """
    Update information for a Zoom meeting.

    :param dict params:
        - meeting_id (str): ID of the Zoom meeting to update. (required)
        - topic (str): Topic of the meeting. (optional)
        - agenda (str): Agenda for the meeting. (optional)
        - duration (int): Duration of the meeting in minutes. (optional)
        - password (str): Password for the meeting. (optional)
        - schedule_for (str): Email address of the user to schedule the meeting for. (optional)
        - start_time (str): Start time of the meeting in the format "YYYY-MM-DDTHH:mm:ssZ". (optional)
        - timezone (str): Timezone for the meeting. (optional)
        - type (int): Type of meeting. (optional)
        - settings (dict):
            - audio (str): Audio options for the meeting. (optional)
            - alternative_hosts (str): Email addresses of alternative hosts for the meeting. (optional)
            - auto_recording (str): Auto-recording setting for the meeting. (optional)
            - host_video (boolean): Start video when the host joins the meeting. (optional)
            - join_before_host (boolean): Allow participants to join the meeting before the host starts the meeting. (optional)
            - mute_upon_entry (boolean): Mute participants upon entry. (optional)
            - participant_video (boolean): Start video when participants join the meeting. (optional)
            - watermark (boolean): Whether to add a watermark when viewing a shared screen. (optional)
            - registration_type (int): Registration type for the meeting. (optional)

    :return: Success message indicating the meeting was updated.
    :rtype: str
    """
    try:
        access_token = await refresh_access_token(json_cred)
        if 'meeting_id' in params:
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            url = f'https://api.zoom.us/v2/meetings/{data["meeting_id"]}'
            headers = {
                'Authorization': f'Bearer {access_token}',
                'Content-Type': 'application/json',
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.patch(url, headers=headers, json=data) as response:
                    if response.status in status:
                        return {"Message": "Meeting updated successfully"}
                    raise Exception(
                        f"Meeting update failed. Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing parameters')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}

async def zoom_delete_meeting(json_cred, params, **kwargs):
    """
    Delete a Zoom meeting.

    :param dict params:
        - meeting_id (str): ID of the Zoom meeting to delete. (required)

    :return: Success message indicating the meeting was deleted.
    :rtype: str
    """
    try:
        access_token = await refresh_access_token(json_cred)
        if 'meeting_id' in params:
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            url = f'https://api.zoom.us/v2/meetings/{data["meeting_id"]}'
            headers = {
                'Authorization': f'Bearer {access_token}',
                'Content-Type': 'application/json',
            }
            
            data = normalize_params(data)
            async with aiohttp.ClientSession() as session:
                async with session.delete(url, headers=headers, params=data) as response:
                    if response.status in status:
                        return {"Message": "Meeting deleted successfully"}
                    raise Exception(
                        f"Meeting deletion failed. Status Code: {response.status}. Response: {await response.text()}"
                    )
        else:
            raise Exception('Missing parameters')
    except aiohttp.ClientError as e:
        return {"Error": str(e)}
    except Exception as err:
        return {"Error": str(err)}



operations = {
    'Create Meeting':zoom_create_meeting,
    'Get Meeting':zoom_get_meeting,
    'List Meetings':zoom_list_meetings,
    'Update Meeting':zoom_update_meeting,
    'Delete Meeting':zoom_delete_meeting
}
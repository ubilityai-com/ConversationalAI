from slack_sdk import WebClient
import logging
import json
import requests
import base64
import os


# Message Actions

def slack_send_message(creds,params):
    """
    Send a message to a Slack channel/User.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :channel: (str, required) -  channel/user ID to send message to
        - One of these parameters is required to describe the content of the message.
            - :text: (str) - text message, how this field works and whether it is required depends on other fields you use in params.
            - :attachments: (list of json) - JSON-based array of structured attachments.
            - :blocks: (list of json) - JSON-based array of structured blocks.
        - :link_names: (bool, optional) - Find and link user groups.
        - :threads_ts: (str, optional) - Provide another message's ts value to make this message a reply.
        - :reply_broadcast: (bool, optional) - Used in conjunction with thread_ts and indicates whether reply should be made visible to everyone in the channel or conversation. 
        - :mrkdwn: (bool , optional) - Disable Slack markup parsing
        - :unfurl_links: (bool, optional) - Enable unfurling of primarily text-based content.
        - :unfurl_media: (bool, optional) - Pass false to disable unfurling of media content.
        - :as_user: (bool, optional) - Pass true to post the message as the authed user instead of as a bot.

    Returns:
      dict: A dictionary containing many keys related to the message sent.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "channel" in params and ("text" in params or "blocks" in params or "attachments" in params):
            token = cred["accessToken"]
            client = WebClient(token=token)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
                
            response = client.chat_postMessage(**data)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "channel" : response["channel"],
                "ts": response["ts"],
                "message": response["message"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as error:
        raise Exception(error)


def slack_update_message(creds,params):
    """
    Update an existing Slack message.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :channel: (str, required) -  User ID of chat containing the message to be updated.
        - :ts: (str, required) - The timestamp of the message to be updated.
        - :text: (str, required) - New text content for the message.
        - :link_names: (bool, optional) - Find and link channel names and usernames.
        - :reply_broadcast: (bool, optional) - Broadcast an existing thread reply to make it visible to everyone in the channel or conversation.
        - :as_user: (bool, optional) - Pass true to post the message as the authed user instead of as a bot.
        - :file_ids: (list of strings, optional) - Array of new file ids that will be sent with this message.

    Returns:
      dict: A dictionary containing many keys related to the updated message.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "channel" in params and "ts" in params:
            token = cred["accessToken"]
            client = WebClient(token=token)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            response = client.chat_update(**data)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "channel" : response["channel"],
                "ts": response["ts"],
                "message": response["message"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_delete_message(creds,params):
    """
    Delete a Slack message.
    
    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :channel: (str, required) -  Channel/User ID of conversation containing the message to be deleted.
        - :ts: (str, required) - The timestamp of the message to be deleted.
    
    Returns:
      dict: A dictionary containing a message indicating the success of the delete operation.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "channel" in params and "ts" in params:
            token = cred["accessToken"]
            channel_id = params["channel"]
            client = WebClient(token=token)
            logger = logging.getLogger(__name__)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            response = client.chat_delete(**data)
            logger.info(response)
            return {"Result" : f"The message has been deleted from this channel ID: {channel_id}"}
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_get_permalink(creds,params):
    """
    Get a permalink to a Slack message.
    
    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :channel: (str, required) -  Channel/User ID of conversation containing the message.
        - :message_ts: (str, required) - The timestamp of the message.
    
    Returns:
      dict: A dictionary containing the generated permalink for the specified message with other details.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "channel" in params and "message_ts" in params:
            token = cred["accessToken"]
            client = WebClient(token=token)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            response = client.chat_getPermalink(**data)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "channel" : response["channel"],
                "permalink": response["permalink"],
                "response_json":result
            }
            return response_json
        else:
            raise  ("Missing input data")
    except Exception as e:
        raise Exception(e)


#############################################################################################################################


# Channel Actions


def slack_get_channel(creds,params):
    """
    Get information about a Slack channel.
    
    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :channel: (str, required) -  The ID of the channel for which to retrieve information.
        - :include_num_members: (bool, optional) - Include the number of members 
        
                in the channel.
    
    Returns:
      dict: A dictionary containing information about the specified channel.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "channel" in params:
            token = cred["accessToken"]
            client = WebClient(token=token)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            response = client.conversations_info(**data)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "channel" : response["channel"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_get_many_channels(creds,params):
    """
    Retrieve a list of Slack channels based on specified parameters.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :types: (list of strings, optional) - to filter channels by types.

                (Options: public_channel, private_channel, mpim, im)
                
        - :exclude_archived: (bool, optional) - to exclude archived channels from the list.

    Returns:
      list: A list of channels retrieved from slack.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred:
            token = cred["accessToken"]
            client = WebClient(token=token)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            response = client.conversations_list(**data)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "channels" : response["channels"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_create_channel(creds,params):
    """
    Create a new Slack channel.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :name: (str, required) - The name of the new channel to be created.

    Returns:
      dict: A dictionary containing information about the newly created channel.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "name" in params:
            token = cred["accessToken"]
            client = WebClient(token=token)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            response = client.conversations_create(**data)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "channel" : response["channel"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_archive_conversation(creds,params):
    """
    Archive a Slack conversation (channel).

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :channel: (str, required) - The ID of the channel to be archived.

    Returns:
      dict: A dictionary containing a message indicating the success of the archive operation.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "channel" in params:
            token = cred["accessToken"]
            channel_id = params["channel"]
            client = WebClient(token=token)
            client.conversations_archive(channel=channel_id)
            return {"Result" : f"The channel has been archived successfully, channel ID: {channel_id}"}
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_unarchive_conversation(creds,params):
    """
    Unarchive a Slack conversation (channel).

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :channel: (str, required) - The ID of the channel to be unarchived.

    Returns:
      dict: A dictionary containing a message indicating the success of the unarchive operation.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "channel" in params:
            token = cred["accessToken"]
            channel_id = params["channel"]
            client = WebClient(token=token)
            client.conversations_unarchive(channel=channel_id)
            return {"Result" : f"The channel has been unarchived successfully, channel ID: {channel_id}"}
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_rename_conversation(creds,params):
    """
    Rename a Slack conversation (channel).

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :channel: (str, required) - The ID of the channel to be renamed.
        - :name: (str, required) - The new name for the channel.

    Returns:
      dict: A dictionary containing information about the renamed channel.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "channel" in params and "name" in params:
            token = cred["accessToken"]
            client = WebClient(token=token)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            response = client.conversations_rename(**data)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "channel" : response["channel"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_get_members(creds,params):
    """
    Get members of a Slack channel.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :channel: (str, required) - The ID of the channel for which to retrieve members.

    Returns:
      list: List of member IDs in the specified channel.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "channel" in params:
            token = cred["accessToken"]
            channel_id = params["channel"]
            client = WebClient(token=token)
            response = client.conversations_members(channel=channel_id)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "members" : response["members"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_leave_conversation(creds,params):
    """
    Leave a Slack conversation (channel).

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :channel: (str, required) - The ID of the channel to leave.

    Returns:
      dict: A dictionary containing a message indicating the successful leave from the channel.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "channel" in params:
            token = cred["accessToken"]
            channel_id = params["channel"]
            client = WebClient(token=token)
            client.conversations_leave(channel=channel_id)
            return {"Result" : f"You are leaved this channel: {channel_id}"}
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_join_conversation(creds,params):
    """
    Join a Slack conversation (channel).

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :channel: (str, required) - The ID of the channel to join.

    Returns:
      dict: A dictionary containing information about the joined channel.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "channel" in params:
            token = cred["accessToken"]
            channel_id = params["channel"]
            client = WebClient(token=token)
            response = client.conversations_join(channel=channel_id)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "channel" : response["channel"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_invite_users(creds,params):
    """
    Invite users to a Slack conversation (channel).

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :channel: (str, required) - The ID of the channel to which users will be invited.
        - :users: (list of strings, required) - List of user IDs to invite to the channel.

    Returns:
      dict: A dictionary containing information about the channel where users were invited.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "channel" in params and "users" in params:
            token = cred["accessToken"]
            client = WebClient(token=token)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            response = client.conversations_invite(**data)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "channel" : response["channel"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


#############################################################################################################################


# User Actions


def slack_get_user(creds,params):
    """
    Get information about a Slack user.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :user: (str, required) - The ID of the user for whom to retrieve information.

    Returns:
      dict: A dictionary containing information about the specified user.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "user" in params:
            token = cred["accessToken"]
            user_id = params["user"]
            client = WebClient(token=token)
            response = client.users_info(user=user_id)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "user" : response["user"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_get_many_users(creds,params):
    """
    Retrieve a list of Slack users.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.

    Returns:
      dict: A dictionary containing a list of members of the Slack workspace.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred:
            token = cred["accessToken"]
            client = WebClient(token=token)
            response = client.users_list()
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "members" : response["members"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_get_user_status(creds,params):
    """
    Get the presence status of a Slack user.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :user: (str, required) - The ID of the user for whom to retrieve presence status.

    Returns:
      dict: A dictionary containing information about the presence status of the specified user ("active" or "away").

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "user" in params:
            token = cred["accessToken"]
            user_id = params["user"]
            client = WebClient(token=token)
            response = client.users_getPresence(user=user_id)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "presence" : response["presence"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


#############################################################################################################################

# File Actions


def slack_get_file(creds,params):
    """
    Get information about a Slack file.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :file: (str, required) - The ID of the file for which to retrieve information.

    Returns:
      dict: A dictionary containing information about the specified file.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "file" in params:
            token = cred["accessToken"]
            file_id = params["file"]
            client = WebClient(token=token)
            response = client.files_info(file=file_id)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "content": response["content"],
                "file" : response["file"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)
    

def slack_get_many_files(creds,params):
    """
    Retrieve a list of Slack files.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :channel: (str, optional) - Filter files by channel ID.
        - :user: (str, optional) - Filter files created by a specific user ID.
        - :ts_from: (str, optional) - Filter files created after this timestamp.
        - :ts_to: (str, optional) - Filter files created before this timestamp.
        - :types: (str, optional) - An array of file types to include in the response.

                (Options: gdocs, images, pdfs, snippets, spaces, zips)

        - :show_files_hidden_by_limit: (bool, optional) - Show files that are hidden
                
                due to being over the storage limit.

    Returns:
      dict: A dictionary containing a list of files in the Slack workspace.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred:
            token = cred["accessToken"]
            client = WebClient(token=token)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            response = client.files_list(**data)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "files" : response["files"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_upload_file(creds,params):
    """
    Upload a file to a Slack channel.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :channel: (str, required) -The ID of the channel to which the file will be uploaded.
        - :filename: (str, required) - The name of the file ( with extention e.g .png, .txt, .csv ).
        - One of the following is required:
            - :url: (str) - online URL of the file to be uploaded.
            - :Content: (str) - Base64-encoded file content or <<....>> to load.
        - :title: (str, optional) - Title of the file.
        - :initial_comment: (str, optional) - Initial comment to add to the file.
        - :thread_ts: (str, optional) - Timestamp of the thread to which the file belongs.

    Returns:
      dict: A dictionary containing information about the uploaded file.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "channel" in params and "filename" in params and ("url" in params or "content" in params):
            token = cred["accessToken"]
            content = params.get("content")
            url = params.get("url")
            file_data = None
            file_path = None
            if content:
                if content.startswith("<<") and content.endswith(">>"):
                    file_name = content[2:-2]
                    file_path = f"/app/robotfiles/UbilityLibraries/temp/{file_name}"
                    if not os.path.exists(file_path):
                        raise Exception(f"File not found: {file_path}")
                    with open(file_path, "rb") as f:
                        file_data = f.read()
                else:
                    raise Exception("Invalid content format. Use <<filename>> for local file reference.")
            elif url:
                file_path = url
            client = WebClient(token=token)
            data = {}
            for key, value in params.items():
                if  key in ("url", "content"):  
                    continue
                if value:
                    data[key] = value

            if file_path and file_data is None:
                response = requests.get(file_path)
                if response.status_code == 200:
                    data["file"] = response.content
                else:
                    raise Exception(f"Failed to fetch the file. Status code: {response.status_code}")

            if file_data:
                data["file"] = file_data

            response = client.files_upload_v2(**data)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "file" : response["file"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


#############################################################################################################################

# User Group Actions


def slack_get_userGroups(creds,params):
    """
    Retrieve information about Slack user groups.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :include_count: (bool, optional) - Include the number of users in each User Group.
        - :include_disabled: (bool, optional) - Include disabled User Groups.
        - :include_users: (bool, optional) - Include the list of users for each User Group.

    Returns:
      dict: A dictionary containing list of user groups in the Slack workspace.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred:
            token = cred["accessToken"]
            client = WebClient(token=token)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            response = client.usergroups_list(**data)  
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "usergroups" : response["usergroups"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_create_userGroup(creds,params):
    """
    Create a Slack user group.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :name: (str, required) - The name of the user group to be created.
        - :channel: (str, optional) - The ID of a channel to associate with the user group.
        - :description: (str, optional) - A description of the user group.
        - :handle: (str, optional) - A handle that is used to mention the user group in messages.
        - :include_count: (bool, optional) - Include the number of users in the user group.

    Returns:
      dict: A dictionary containing information about the created user group.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "name" in params:
            token = cred["accessToken"]
            client = WebClient(token=token)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            response = client.usergroups_create(**data)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "usergroup" : response["usergroup"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_update_userGroup(creds,params):
    """
    Update a Slack user group.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :usergroup: (str, required) - The ID of the user group to be updated.
        - :name: (str, optional) - The new name of the user group.
        - :channels: (str, optional) - The new channel IDs to associate with the user group.
        - :description: (str, optional) - The new description of the user group.
        - :handle: (str, optional) - The new handle that is used to mention the user group in messages.
        - :include_count: (bool, optional) - Include the number of users in the user group.

    Returns:
      dict: A dictionary containing information about the updated user group.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "usergroup" in params:
            token = cred["accessToken"]
            client = WebClient(token=token)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            response = client.usergroups_update(**data)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "usergroup" : response["usergroup"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_enable_userGroup(creds,params):
    """
    Enable a previously disabled Slack user group.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :usergroup: (str, required) - The ID of the user group to be enabled.
        - :include_count: (bool, optional) - Include the number of users in the user group.

    Returns:
      dict: A dictionary containing information about the enabled user group.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "usergroup" in params:
            token = cred["accessToken"]
            client = WebClient(token=token)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            response = client.usergroups_enable(**data)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "usergroup" : response["usergroup"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)


def slack_disable_userGroup(creds,params):
    """
    Disable a Slack user group.

    :param dict params: Dictionary containing parameters.

        - :token: (str, required) - Access token for authenticating with Slack.
        - :usergroup: (str, required) - The ID of the user group to be disabled.
        - :include_count: (bool, optional) - Include the number of users in the user group.

    Returns:
      dict: A dictionary containing information about the disabled user group.

    """
    try:
        cred=json.loads(creds)
        if "accessToken" in cred and "usergroup" in params:
            token = cred["accessToken"]
            client = WebClient(token=token)
            data = {}
            for key, value in params.items():
                if value:
                    data[key] = value
            response = client.usergroups_disable(**data)
            result = json.loads(json.dumps(response, default=str))
            response_json = {
                "usergroup" : response["usergroup"],
                "response_json":result
            }
            return response_json
        else:
            raise Exception("Missing input data")
    except Exception as e:
        raise Exception(e)
    

operations = {
        'SEND_MESSAGE': slack_send_message,
        'UPDATE_MSG': slack_update_message,
        'DELETE_MSG': slack_delete_message,
        'GET_PERMALINK': slack_get_permalink,
        'GET_CHANNEL': slack_get_channel,
        'GET_MANY_CHANNELS': slack_get_many_channels,
        'CREATE_CHANNEL': slack_create_channel,
        'ARCHIVE_CONVERSATION': slack_archive_conversation,
        'UNARCHIVE_CONVERSATION': slack_unarchive_conversation,
        'RENAME_CONVERSATION': slack_rename_conversation,
        'GET_MEMBERS': slack_get_members,
        'LEAVE_CONVERSATION': slack_leave_conversation,
        'JOIN_CONVERSATION': slack_join_conversation,
        'INVITE_USERS': slack_invite_users,
        'GET_USER': slack_get_user,
        'GET_MANY_USERS': slack_get_many_users,
        'GET_USER_STATUS': slack_get_user_status,
        'GET_FILE': slack_get_file,
        'GET_MANY_FILES': slack_get_many_files,
        'UPLOAD_FILE': slack_upload_file,
        'CREATE_USER_GROUP': slack_create_userGroup,
        'ENABLE_USER_GROUP': slack_enable_userGroup,
        'DISABLE_USER_GROUP': slack_disable_userGroup,
        'GET_USER_GROUPS': slack_get_userGroups,
        'UPDATE_USER_GROUP': slack_update_userGroup
        }
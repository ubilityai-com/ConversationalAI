from mcp.server.fastmcp import FastMCP
from typing import Optional
from pydantic import BaseModel, Field
import os, sys

apps = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(apps)

from applications import slack

mcp = FastMCP("SlackMcpServer")

class SendSlackMessageInput(BaseModel):
    text: str = Field(description="Slack text message")
    channel: str = Field(description="Slack user or channel")


class DeleteSlackMessageInput(BaseModel):
    channel: str = Field(description="Slack channel ID")
    ts: str = Field(description="Timestamp of the message to delete")


class UpdateSlackMessageInput(BaseModel):
    channel: str = Field(description="Slack channel ID")
    ts: str = Field(description="Timestamp of the message to update")
    text: str = Field(description="New message content")


class GetSlackPermalinkInput(BaseModel):
    channel: str = Field(description="Slack channel ID")
    message_ts: str = Field(description="Timestamp of the message")


class GetSlackChannelInput(BaseModel):
    channel: str = Field(description="Slack channel ID")


class GetManySlackChannelsInput(BaseModel):
    types: Optional[list] = Field(description="to filter channels by types.(Options: public_channel, private_channel, mpim, im)")
    exclude_archived: Optional[bool] = Field(description="to exclude archived channels from the list.")


class CreateSlackChannelInput(BaseModel):
    name: str = Field(description="Name of the new channel")
    is_private: Optional[bool] = Field(description="public or private channel. use 'public' if it s not specified")


class ArchiveSlackConversationInput(BaseModel):
    channel: str = Field(description="Slack channel ID")


class UnarchiveSlackConversationInput(BaseModel):
    channel: str = Field(description="Slack channel ID")


class RenameSlackConversationInput(BaseModel):
    channel: str = Field(description="Slack channel ID")
    name: str = Field(description="New name for the channel")


class GetSlackMembersInput(BaseModel):
    channel: str = Field(description="Slack channel ID")


class GetSlackUserInput(BaseModel):
    user: str = Field(description="Slack user ID")


class GetSlackUserStatusInput(BaseModel):
    user: str = Field(description="Slack user ID")


class GetSlackFileInput(BaseModel):
    file: str = Field(description="Slack file ID")


class CreateSlackUserGroupInput(BaseModel):
    name: str = Field(description="Name of the user group")
    handle: Optional[str] = Field(description="Handle for the user group")
    description: Optional[str] = Field(description="Description of the user group")
    channel: Optional[str] = Field(description="The ID of a channel to associate with the user group.")
    include_count: Optional[bool] = Field(description="Include the number of users in the user group.")


class UpdateSlackUserGroupInput(BaseModel):
    usergroup: str = Field(description="Slack user group ID")
    name: Optional[str] = Field(description="New name for the user group")
    handle: Optional[str] = Field(description="New handle for the user group")
    description: Optional[str] = Field(description="New description for the user group")
    channel: Optional[str] = Field(description="The new ID of a channel to associate with the user group.")
    include_count: Optional[bool] = Field(description="Include the number of users in the user group.")


class EnableSlackUserGroupInput(BaseModel):
    usergroup: str = Field(description="Slack user group ID")
    include_count: Optional[bool] = Field(description="Include the number of users in the user group.")


class DisableSlackUserGroupInput(BaseModel):
    usergroup: str = Field(description="Slack user group ID")
    include_count: Optional[bool] = Field(description="Include the number of users in the user group.")


@mcp.tool()
async def slack_send_message(params: SendSlackMessageInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_send_message(creds=creds, params=params)
        return "Slack message sent successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_update_message(params: UpdateSlackMessageInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_update_message(creds=creds, params=params)
        return "Slack message updated successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_delete_message(params: DeleteSlackMessageInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_delete_message(creds=creds, params=params)
        return "Slack message deleted successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_get_permalink(params : GetSlackPermalinkInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_get_permalink(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_get_channel(params:GetSlackChannelInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_get_channel(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_get_many_channels(params: GetManySlackChannelsInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_get_many_channels(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_create_channel(params: CreateSlackChannelInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_create_channel(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_archive_conversation(params: ArchiveSlackConversationInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_archive_conversation(creds=creds, params=params)
        return "Slack conversation archived successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_unarchive_conversation(params: UnarchiveSlackConversationInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_unarchive_conversation(creds=creds, params=params)
        return "Slack conversation unarchived successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_rename_conversation(params: RenameSlackConversationInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_rename_conversation(creds=creds, params=params)
        return "Slack conversation name changed successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_get_members(params: GetSlackMembersInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_get_members(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_get_user(params: GetSlackUserInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_get_user(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_get_many_users() -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        response = slack.slack_get_many_users(creds=creds, params={})
        return response["members"]
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_get_user_status(params: GetSlackUserStatusInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_get_user_status(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_get_file(params: GetSlackFileInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_get_file(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_create_userGroup(params: CreateSlackUserGroupInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_create_userGroup(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_update_userGroup(params: UpdateSlackUserGroupInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_update_userGroup(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_enable_userGroup(params: EnableSlackUserGroupInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_enable_userGroup(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def slack_disable_userGroup(params: DisableSlackUserGroupInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("SLACK_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = slack.slack_disable_userGroup(creds=creds, params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"    


if __name__ == "__main__":
    mcp.run()
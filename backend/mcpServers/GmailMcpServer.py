from mcp.server.fastmcp import FastMCP
from typing import Optional
from pydantic import BaseModel, Field
import os, sys
from mcpLibraries import gmail

apps = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(apps)

mcp = FastMCP("GmailMcpServer")


class GmailAddLabelInput(BaseModel):
    message_id: str = Field(description="the message id , to which the label will be added.")
    label_id: str = Field(description="The Id of the label to be added.")


class GmailDeleteMessageInput(BaseModel):
    message_id: str = Field(description="The ID of the message to delete.")


class GmailGetMessageInput(BaseModel):
    message_id: str = Field(None,description="The ID of the message to be retrieved.")
    

class GmailGetMessagesInput(BaseModel):
    labelIds: Optional[list[str]] = Field(description="List of label IDs to filter messages by.")
    maxResults: Optional[int] = Field(description="Maximum number of messages to return.")
    includeSpamTrash: Optional[bool] = Field( description="Whether to include messages from Spam and Trash. Default is False.")
 

class GmailMarkAsReadInput(BaseModel):
    message_id: str = Field(description="The ID of the message whose label is to be changed.")


class GmailMarkAsUnReadInput(BaseModel):
    message_id: str = Field(description="The ID of the message whose label is to be changed.")


class GmailRemoveLabelInput(BaseModel):
    message_id: str = Field(description="The ID of the message whose label is to be changed.")
    label_id: Optional[str] = Field(None,description="The ID of the label to remove.")


class GmailReplyToMessageInput(BaseModel):
    in_reply_to: str = Field(description="The ID of the message to reply to.")
    message: str = Field(description="The message body.")
    type: Optional[str] = Field(None, description="The type of email content, either plain or html.")
    bcc_recipients: Optional[str] = Field(None,description="to send an email to multiple people without each recipient knowing the email details of the others.comma-separated")
    cc_recipients: Optional[str] = Field(None,description="to send an email to multiple people with each recipient knowing the email details of the others.comma-separated")


class GmailSendMessageInput(BaseModel):
    to: str = Field(description="The email of the user to whom the message is sent.")
    body: str = Field(description="The message body.")
    type: Optional[str] = Field(None, description="The type of email content, either plain or html." )
    bcc: Optional[str] = Field(None, description="to send an email to multiple people without each recipient knowing the email details of the others.")
    cc: Optional[str] = Field(None,description="to send an email to multiple people with each recipient knowing the email details of the others.",)
    subject: Optional[str] = Field(None, description="the subject of the message.")


class GmailAddLabelToThreadInput(BaseModel):
    thread_id: str = Field(description="the thread id , to which the label will be added.")
    label_ids: str = Field(description="A comma-separated string of label IDs to be added to the thread.")


class GmailDeleteThreadInput(BaseModel):
    thread_id: str = Field(description="The ID of the thread to delete.")


class GmailGetThreadInput(BaseModel): 
    thread_id: str = Field(description=" the id of the thread to be returned required if the scope is single.")       


class GmailGetThreadsInput(BaseModel): 
    limit: Optional[int] = Field(None, description="Maximum number of threads to return. This field defaults to 100.")
    includeSpamTrash: Optional[bool] = Field(None, description="Include threads from SPAM and TRASH in the results.")  
    label_ids: Optional[list[str]] = Field(None, description="A list of label IDs to filter threads by.")
    search: Optional[str] = Field(None, description="A search query to filter threads by.")
    read_status: Optional[str] = Field(None, description="Filter by read status. Possible values: 'all', 'read', 'unread'.")
    received_after: Optional[str] = Field(None, description="Filters threads received after a specific date.")
    received_before: Optional[str] = Field(None, description="Filters threads received before a specific date.")


class GmailRemoveLabelFromThreadInput(BaseModel): 
    thread_id: str = Field(description="The ID of the thread from which labels will be removed.")
    label_ids: str = Field(description="A comma-separated list of label IDs to remove from the thread.")         


class GmailReplyToThreadInput(BaseModel): 
    thread_id: str = Field(description="the id of the thread to reply to.")
    in_reply_to: str = Field(description="the id of the message to reply to")          
    message_body: str = Field(description="the message body ")             
    to_recipients: Optional[str] = Field(None, description=" list of email addresses for direct recipients.")
    cc_recipients: Optional[list] = Field(None, description="to send an email to multiple people with each recipient knowing the email details of the others.")
    bcc_recipients: Optional[list] = Field(None, description="to send an email to multiple people without each recipient knowing the email details of the others.")
    subject: Optional[str] = Field(None, description=" the message content ")
    email_type: Optional[str] = Field(None, description="The type of email content, either plain or html.")


class GmailTrashThreadInput(BaseModel): 
    thread_id: str = Field(description="The ID of the thread to be moved to trash.")
    

class GmailUnTrashThreadInput(BaseModel): 
    thread_id: str = Field(description="The ID of the thread to be untrashed")    


class GmailCreateLabelInput(BaseModel): 
    name: str = Field(description="The name of the label to be created.")
    labelListVisibility: Optional[str] = Field(None, description="The visibility of the label in the label list. Default is 'labelShow'.")
    messageListVisibility: Optional[str] = Field(None, description="The visibility of the label in message lists. Default is 'show'.")
              

class GmailDeleteLabelInput(BaseModel): 
    label_id: str = Field(description="The unique ID of the label to be deleted.")


class GmailGetLabelsInput(BaseModel): 
    limit: Optional[int] = Field(None, description="Limits the number of labels returned . Default is `100`.") 


class GmailGetLabelInput(BaseModel): 
    label_id: str= Field(description="The unique ID of the label to retrieve.")       


class GmailCreateDraftInput(BaseModel): 
    to: str = Field(description="Recipient email address.")
    body: str= Field(description="Email content.")
    subject: Optional[str] = Field(None, description="Subject line of the email.")
    cc: Optional[str] = Field(None, description="to send an email to multiple people with each recipient knowing the email details of the others.comma-separated.")
    bcc: Optional[str] = Field(None, description="to send an email to multiple people without each recipient knowing the email details of the others.comma-separated.")  
    type:Optional[str] = Field(None, description="The type of email content, either plain or html.")
    

class GmailDeleteDraftInput(BaseModel): 
    draft_id: str = Field(description=" the id of the draft to be deleted.")


class GmailGetDraftsInput(BaseModel): 
      limit: Optional[int] = Field(None, description="Limits the number of drafts returned. Defaults to `100`.")         


class GmailGetDraftInput(BaseModel): 
      draft_id: str = Field(None, description="The unique ID of the draft to retrieve.")       
                  

@mcp.tool()
async def gmail_addLabel(params: GmailAddLabelInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'        
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_addLabel(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return f"the label has been successfully added to the message ."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def gmail_deleteMessage(params: GmailDeleteMessageInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_deleteMessage(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return "message deleted successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def gmail_getMessage(params: GmailGetMessageInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_getMessage(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def gmail_getMessages(params: GmailGetMessagesInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_getMessages(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def gmail_markAsRead(params: GmailMarkAsReadInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_markAsRead(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return "message marked as read seccessfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def gmail_markAsUnread(params: GmailMarkAsUnReadInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_markAsUnread(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return "message marked as unread seccessfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def gmail_removeLabel(params: GmailRemoveLabelInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_removeLabel(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return "label removed successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def gmail_replyToMessage(params: GmailReplyToMessageInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_replyToMessage(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return "reply sent successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def gmail_sendMessage(params: GmailSendMessageInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_sendMessage(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return "message sent successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def gmail_addLabelToThread(params: GmailAddLabelToThreadInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_addLabelToThread(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return "label added to the thread successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def gmail_deleteThread(params: GmailDeleteThreadInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_deleteThread(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return "thread deleted successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def gmail_getThreads(params: GmailGetThreadsInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_getThreads(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def gmail_getThread(params: GmailGetThreadInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_getThread(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def gmail_removeLabelFromThread(params: GmailRemoveLabelFromThreadInput) -> dict:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_removeLabelFromThread(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def gmail_replyToThread(params: GmailReplyToThreadInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_replyToThread(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return "thread reply sent successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"    
    
@mcp.tool()
async def gmail_trashThread(params: GmailTrashThreadInput) -> str:
    try:
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_trashThread(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return "The thread has been moved to trash successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"    
    
@mcp.tool()
async def gmail_untrashThread(params: GmailUnTrashThreadInput) -> str:
    try: 
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_untrashThread(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return "The thread has been removed from trash successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"    
    
@mcp.tool()
async def gmail_createLabel(params: GmailCreateLabelInput) -> str:
    try: 
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_createLabel(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return "The label has been created successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"    
                    
@mcp.tool()
async def gmail_getLabels(params: GmailGetLabelsInput) -> dict:
    try: 
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_getLabels(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"    

@mcp.tool()
async def gmail_getLabel(params: GmailGetLabelInput) -> dict:
    try: 
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_getLabel(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"    
     
@mcp.tool()
async def gmail_deleteLabel(params: GmailDeleteLabelInput) -> str:
    try: 
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_deleteLabel(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return "label deleted successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"    

@mcp.tool()
async def gmail_createDraft(params: GmailCreateDraftInput) -> str:
    try: 
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_createDraft(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return "draft created successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"    

@mcp.tool()
async def gmail_deleteDraft(params: GmailDeleteDraftInput) -> str:
    try: 
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_deleteDraft(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return "draft deleted successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"    
    
@mcp.tool()
async def gmail_getDraft(params: GmailGetDraftInput) -> dict:
    try: 
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_getDraft(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"    
    
@mcp.tool()
async def gmail_getDrafts(params: GmailGetDraftsInput) -> dict:
    try: 
        creds = f'{{"accessToken": "{os.environ.get("GMAIL_ACCESS_TOKEN")}", "refreshToken": "{os.environ.get("GMAIL_REFRESH_TOKEN")}", "clientID": "{os.environ.get("GMAIL_CLIENT_ID")}", "clientSecret": "{os.environ.get("GMAIL_CLIENT_SECRET")}", "expirey": "{os.environ.get("GMAIL_EXPIREY")}"}}'
        params = params.model_dump(exclude_none=True)
        response = gmail.gmail_getDrafts(creds=creds, API_SERVICE_NAME="gmail", API_VERSION="v1", request=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"                                  
                                                           

if __name__ == "__main__":
    mcp.run()                                     
from mcp.server.fastmcp import FastMCP
from typing import Optional
from pydantic import BaseModel, Field
import os, sys

apps = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(apps)

from applications import notion

mcp = FastMCP("NotionMcpServer")

class NotionGetManyUsersInput(BaseModel): 
    page_size: Optional[int] = Field(None, description="Number of Notion users to include per page in the response (used for pagination).")


class NotionGetUsersInput(BaseModel): 
    user_id: str = Field(description="The unique Notion user ID to retrieve.")


class NotionGetManyDatabasesInput(BaseModel): 
    page_size: Optional[int] = Field(None, description="Number of Notion databases to include per page in the response (used for pagination).")


class NotionGetDatabasesInput(BaseModel): 
    database_id: str = Field(description="The unique ID of the Notion database to retrieve.")


class NotionSearchDatabasesInput(BaseModel): 
    database_id: str = Field(description="The unique Notion database ID to search within.")


class NotionTextLink(BaseModel):
    url: Optional[str] = Field(None, description="Optional hyperlink URL attached to Notion text content.")


class NotionTextContent(BaseModel):
    content: str = Field(None, description="The actual string content of the Notion text object.")
    link: Optional[NotionTextLink] = Field(None, description="Optional hyperlink metadata associated with the text.")


class NotionTextAnnotationsContent(BaseModel):
    bold: Optional[bool] = Field(None, description="Whether the Notion text is styled as bold.")
    italic: Optional[bool] = Field(None, description="Whether the Notion text is styled as italic.")
    strikethrough: Optional[bool] = Field(None, description="Whether the Notion text has a strikethrough style.")
    underline: Optional[bool] = Field(None, description="Whether the Notion text is underlined.")
    code: Optional[bool] = Field(None, description="Whether the Notion text is styled as inline code.")
    color: Optional[str] = Field("default", description="Text color as supported by Notion (e.g., 'default', 'blue', 'red').")


class NotionRichText(BaseModel):
    type: str = Field("text", description="Type of the Notion rich text object (usually 'text').")
    text: NotionTextContent = Field(None, description="The textual content of the Notion rich text object.")
    annotations: Optional[NotionTextAnnotationsContent] = Field(None, description="Formatting options for the Notion text.")
    plain_text: Optional[str] = Field(None, description="Plain string representation of the Notion text.")
    href: Optional[str] = Field(None, description="Hyperlink reference from the Notion rich text.")


class NotionTitleProperty(BaseModel):
    title: list[NotionRichText] = Field(None, description="List of Notion rich text objects that make up the page title.")


class NotionProperties(BaseModel):
    title: NotionTitleProperty = Field(None, description="The title property for the Notion page.")


class NotionParent(BaseModel):
    type: str = Field("page_id", description="Type of Notion parent object. Usually 'page_id'.")
    page_id: str = Field(None, description="The Notion page ID that acts as the parent.")


class NotionCreatePageInput(BaseModel):
    parent: NotionParent = Field(description="Information about the parent Notion page.")
    properties: NotionProperties = Field(description="Properties to set on the new Notion page, including title.")


class NotionGetPageInput(BaseModel): 
    page_id: str = Field(description="The unique Notion page ID to retrieve.")


class NotionArchivePageInput(BaseModel): 
    page_id: str = Field(description="The unique Notion page ID to archive or unarchive.")
    archived: bool = Field(description="Set to true to archive the Notion page, false to unarchive.")


class NotionGetBlockInput(BaseModel): 
    block_id: str = Field(description="The unique Notion block ID to retrieve.")


class NotionGetManyShildBlockInput(BaseModel): 
    block_id: str = Field(description="The Notion block ID whose children should be retrieved.")
    page_size: Optional[str] = Field(None, description="Maximum number of child blocks to return from Notion.")


class NotionExternalUrlContent(BaseModel):
    url: str = Field(None, description="External URL pointing to the media file used in a Notion block.")


class NotionFileBlockContent(BaseModel):
    type: str = Field("external", description="Type of the Notion file block source (usually 'external').")
    external: NotionExternalUrlContent = Field(None, description="Reference to an external file used in Notion.")


class NotionImageBlockContent(BaseModel):
    type: str = Field("external", description="Type of the Notion image block source (usually 'external').")
    external: NotionExternalUrlContent = Field(None, description="Reference to an external image used in Notion.")


class NotionPDFBlockContent(BaseModel):
    type: str = Field("external", description="Type of the Notion PDF block source (usually 'external').")
    external: NotionExternalUrlContent = Field(None, description="Reference to an external PDF file used in Notion.")


class NotionChildBlockContent(BaseModel):
    object: str = Field("block", description="The object type in Notion. Must always be 'block'.")
    type: str = Field(None, description="Type of Notion block (e.g., 'file', 'image', 'pdf').")
    file: Optional[NotionFileBlockContent] = Field(None, description="File block content if the Notion block type is 'file'.")
    image: Optional[NotionImageBlockContent] = Field(None, description="Image block content if the Notion block type is 'image'.")
    pdf: Optional[NotionPDFBlockContent] = Field(None, description="PDF block content if the Notion block type is 'pdf'.")


class NotionAppendChildrenInput(BaseModel):
    block_id: str = Field(description="The ID of the Notion parent block to which child blocks will be appended.")
    children: list[NotionChildBlockContent] = Field(description="List of child block objects to append to the specified Notion block.")


@mcp.tool()
async def notion_get_many_users(params: NotionGetManyUsersInput) -> dict:
    """
    Get Many Notion Users
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("NOTION_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = notion.notion_get_many_users(creds=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def notion_get_user(params: NotionGetUsersInput) -> dict:
    """
    Get Notion Users
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("NOTION_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = notion.notion_get_user(creds=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def notion_get_many_databases(params: NotionGetManyDatabasesInput) -> dict:
    """
    Get Many Notion Databases
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("NOTION_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = notion.notion_get_many_databases(creds=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def notion_get_database(params: NotionGetDatabasesInput) -> dict:
    """
    Get Notion Databases
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("NOTION_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = notion.notion_get_database(creds=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def notion_search_database(params: NotionSearchDatabasesInput) -> dict:
    """
    Search Notion Databases
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("NOTION_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = notion.notion_search_database(creds=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def notion_get_page(params: NotionGetPageInput) -> dict:
    """
    Get Notion Page
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("NOTION_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = notion.notion_get_page(creds=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def notion_create_page(params: NotionCreatePageInput) -> str:
    """
    Create Notion Page
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("NOTION_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = notion.notion_create_page(creds=creds, params=params)
        return "Notion Page created successfully"
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def notion_archive_page(params: NotionArchivePageInput) -> str:
    """
    Archive Notion Page
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("NOTION_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = notion.notion_archive_page(creds=creds, params=params)
        return "Notion Archive Page successfully"
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def notion_get_block(params: NotionGetBlockInput) -> dict:
    """
    Get Notion Block
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("NOTION_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = notion.notion_get_block(creds=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def notion_get_many_child_blocks(params: NotionGetManyShildBlockInput) -> dict:
    """
    Get Many Notion Shild Block
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("NOTION_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = notion.notion_get_many_child_blocks(creds=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def notion_append_child_blocks(params: NotionAppendChildrenInput) -> str:
    """
    Append Notion Shild Blocks
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("NOTION_BOT_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = notion.notion_append_child_blocks(creds=creds, params=params)
        return "Notion Append Shild Blocks successfully"
    except Exception as e:
        raise Exception(e)


if __name__ == "__main__":
    mcp.run()
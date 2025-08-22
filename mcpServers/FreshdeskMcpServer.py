from mcp.server.fastmcp import FastMCP
from typing import Optional
from pydantic import BaseModel, Field
import os, sys
from datetime import datetime

apps = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(apps)

from mcpLibraries import freshdesk

mcp = FastMCP("FreshdeskMcpServer")


class FreshdeskCreateTicketInput(BaseModel): 
    subject: str = Field(description="Subject of the Freshdesk ticket.") 
    description: str = Field(description="Detailed description of the Freshdesk ticket.") 
    priority: int = Field(description="Priority of the Freshdesk ticket (1: Low, 2: Medium, 3: High, 4: Urgent).") 
    source: int = Field(description="Source through which the Freshdesk ticket was created.") 
    status: int = Field(description="Current status of the Freshdesk ticket (1–5).") 
    email: Optional[str] = Field(None, description="Email address of the Freshdesk ticket requester.") 
    phone: Optional[str] = Field(None, description="Phone number of the Freshdesk ticket requester.")
    requester_id: Optional[int] = Field(None, description="Freshdesk user ID of the requester.")
    facebook_id: Optional[str] = Field(None, description="Facebook ID of the Freshdesk ticket requester.")
    unique_external_id: Optional[str] = Field(None, description="External ID of the Freshdesk ticket requester.")
    twitter_id: Optional[str] = Field(None, description="Twitter handle of the Freshdesk ticket requester.")
    tags: Optional[list] = Field(None, description="List of tags for categorizing the Freshdesk ticket.")
    cc_emails: Optional[list] = Field(None, description="List of CC email addresses for the Freshdesk ticket.")
    responder_id: Optional[str] = Field(None, description="Agent ID assigned to the Freshdesk ticket.")
    company_id: Optional[int] = Field(None, description="Company ID associated with the Freshdesk ticket.")
    due_by: Optional[datetime] = Field(None, description="Deadline by which the Freshdesk ticket must be resolved.")
    email_config_id: Optional[int] = Field(None, description="Email config ID used for this Freshdesk ticket.")
    fr_due_by: Optional[datetime] = Field(None, description="Due time for the first response to the Freshdesk ticket.")
    group_id: Optional[int] = Field(None, description="Group ID assigned to the Freshdesk ticket.")
    name: Optional[str] = Field(None, description="Name of the requester in Freshdesk.")
    product_id: Optional[str] = Field(None, description="Product ID associated with the Freshdesk ticket.")


class FreshdeskGetTicketInput(BaseModel): 
    ticket_id: str = Field(description="ID of the Freshdesk ticket to retrieve.")


class FreshdeskDeleteTicketInput(BaseModel): 
    ticket_id: str = Field(description="ID of the Freshdesk ticket to delete.")


class FreshdeskGetAllTicketInput(BaseModel): 
    company_id: Optional[str] = Field(None, description="Company ID to filter Freshdesk tickets.") 
    requester_id: Optional[str] = Field(None, description="Requester ID to filter Freshdesk tickets.") 
    email: Optional[str] = Field(None, description="Email to filter Freshdesk tickets.") 
    include: Optional[str] = Field(None, description="Extra fields to include in the Freshdesk ticket response (e.g., stats, requester).") 
    updated_since: Optional[str] = Field(None, description="Return Freshdesk tickets updated since this date.") 
    order_type: Optional[str] = Field(None, description="Sort order of Freshdesk tickets (asc or desc).") 
    order_by: Optional[str] = Field(None, description="Field by which to sort Freshdesk tickets (e.g., 'created_at').")


class FreshdeskUpdateTicketInput(BaseModel): 
    ticket_id: str = Field(description="ID of the Freshdesk ticket to update.")
    subject: Optional[str] = Field(None, description="Updated subject of the Freshdesk ticket.") 
    source: Optional[int] = Field(None, description="Updated source of the Freshdesk ticket.") 
    description: Optional[str] = Field(None, description="Updated description of the Freshdesk ticket.") 
    priority: Optional[int] = Field(None, description="Updated priority of the Freshdesk ticket.") 
    status: Optional[int] = Field(None, description="Updated status of the Freshdesk ticket.") 
    email: Optional[str] = Field(None, description="Updated email of the Freshdesk requester.") 
    phone: Optional[str] = Field(None, description="Updated phone of the Freshdesk requester.") 
    requester_id: Optional[int] = Field(None, description="Updated requester ID in Freshdesk.") 
    facebook_id: Optional[str] = Field(None, description="Updated Facebook ID in Freshdesk.") 
    unique_external_id: Optional[str] = Field(None, description="Updated external ID in Freshdesk.") 
    twitter_id: Optional[str] = Field(None, description="Updated Twitter ID in Freshdesk.") 
    tags: Optional[list] = Field(None, description="Updated list of tags in the Freshdesk ticket.") 
    cc_emails: Optional[list] = Field(None, description="Updated CC emails in the Freshdesk ticket.") 
    responder_id: Optional[str] = Field(None, description="Updated agent ID assigned to the Freshdesk ticket.") 
    company_id: Optional[int] = Field(None, description="Updated company ID associated with the Freshdesk ticket.") 
    due_by: Optional[datetime] = Field(None, description="Updated resolution due date of the Freshdesk ticket.") 
    email_config_id: Optional[int] = Field(None, description="Updated email config ID for the Freshdesk ticket.") 
    fr_due_by: Optional[datetime] = Field(None, description="Updated first response due date of the Freshdesk ticket.") 
    group_id: Optional[int] = Field(None, description="Updated group ID assigned to the Freshdesk ticket.") 
    name: Optional[str] = Field(None, description="Updated name of the Freshdesk requester.") 
    product_id: Optional[str] = Field(None, description="Updated product ID associated with the Freshdesk ticket.")


class FreshdeskCreateContactInput(BaseModel): 
    email: str = Field(description="Email address of the Freshdesk contact.") 
    custom_fields: Optional[dict] = Field(None, description="Custom fields associated with the Freshdesk contact.") 
    other_emails: Optional[list] = Field(None, description="List of additional email addresses for the Freshdesk contact.") 
    other_companies: Optional[list] = Field(None, description="List of other companies linked to the Freshdesk contact.") 
    name: Optional[str] = Field(None, description="Full name of the Freshdesk contact.") 
    address: Optional[str] = Field(None, description="Physical address of the Freshdesk contact.") 
    description: Optional[str] = Field(None, description="Description or notes about the Freshdesk contact.") 
    job_title: Optional[str] = Field(None, description="Job title of the Freshdesk contact.") 
    language: Optional[str] = Field(None, description="Preferred language of the Freshdesk contact.") 
    mobile: Optional[str] = Field(None, description="Mobile phone number of the Freshdesk contact.") 
    phone: Optional[str] = Field(None, description="Phone number of the Freshdesk contact.") 
    time_zone: Optional[str] = Field(None, description="Time zone of the Freshdesk contact.") 
    twitter_id: Optional[str] = Field(None, description="Twitter ID of the Freshdesk contact.") 
    unique_external_id: Optional[str] = Field(None, description="External unique identifier of the Freshdesk contact.") 
    company_id: Optional[str] = Field(None, description="Company ID associated with the Freshdesk contact.")


class FreshdeskGetAllContactInput(BaseModel): 
    company_id: Optional[str] = Field(None, description="Company ID to filter Freshdesk contacts.") 
    email: Optional[str] = Field(None, description="Email address to filter Freshdesk contacts.") 
    mobile: Optional[str] = Field(None, description="Mobile number to filter Freshdesk contacts.") 
    phone: Optional[str] = Field(None, description="Phone number to filter Freshdesk contacts.") 
    updated_since: Optional[str] = Field(None, description="Return Freshdesk contacts updated since this date.") 
    state: Optional[str] = Field(None, description="State of the Freshdesk contact (e.g., blocked, verified).")


class FreshdeskGetContactInput(BaseModel): 
    contact_id: str = Field(description="ID of the Freshdesk contact to retrieve.")


class FreshdeskDeleteContactInput(BaseModel): 
    contact_id: str = Field(description="ID of the Freshdesk contact to delete.")


class FreshdeskUpdateContactInput(BaseModel): 
    contact_id: str = Field(description="ID of the Freshdesk contact to update.")
    email: Optional[str] = Field(None, description="Updated email address of the Freshdesk contact.")
    custom_fields: Optional[dict] = Field(None, description="Updated custom fields for the Freshdesk contact.")
    other_emails: Optional[list] = Field(None, description="Updated additional email addresses for the Freshdesk contact.") 
    other_companies: Optional[list] = Field(None, description="Updated companies associated with the Freshdesk contact.")
    name: Optional[str] = Field(None, description="Updated full name of the Freshdesk contact.") 
    address: Optional[str] = Field(None, description="Updated address of the Freshdesk contact.") 
    description: Optional[str] = Field(None, description="Updated description of the Freshdesk contact.") 
    job_title: Optional[str] = Field(None, description="Updated job title of the Freshdesk contact.") 
    language: Optional[str] = Field(None, description="Updated language preference of the Freshdesk contact.") 
    mobile: Optional[str] = Field(None, description="Updated mobile number of the Freshdesk contact.") 
    phone: Optional[str] = Field(None, description="Updated phone number of the Freshdesk contact.") 
    time_zone: Optional[str] = Field(None, description="Updated time zone of the Freshdesk contact.") 
    twitter_id: Optional[str] = Field(None, description="Updated Twitter ID of the Freshdesk contact.") 
    unique_external_id: Optional[str] = Field(None, description="Updated external ID of the Freshdesk contact.") 
    company_id: Optional[str] = Field(None, description="Updated company ID linked to the Freshdesk contact.")


@mcp.tool()
async def freshdesk_create_ticket(params: FreshdeskCreateTicketInput) -> str:
    """
    create a Freshdesk ticket.
    """
    try:
        creds = f'{{"apiKey": "{os.environ.get("FRESHDESK_API_KEY")}", "domain": "{os.environ.get("FRESHDESK_DOMAIN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = freshdesk.freshdesk_create_ticket(cred=creds, params=params)
        return "Freshdesk ticket created successfully"
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def freshdesk_get_ticket(params: FreshdeskGetTicketInput) -> dict:
    """
    Get a Freshdesk ticket.
    """
    try:
        creds = f'{{"apiKey": "{os.environ.get("FRESHDESK_API_KEY")}", "domain": "{os.environ.get("FRESHDESK_DOMAIN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = freshdesk.freshdesk_get_ticket(cred=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def freshdesk_get_all_tickets(params: FreshdeskGetAllTicketInput) -> dict:
    """
    Get All Freshdesk ticket.
    """
    try:
        creds = f'{{"apiKey": "{os.environ.get("FRESHDESK_API_KEY")}", "domain": "{os.environ.get("FRESHDESK_DOMAIN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = freshdesk.freshdesk_get_all_tickets(cred=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def freshdesk_delete_ticket(params: FreshdeskDeleteTicketInput) -> str:
    """
    Delete a Freshdesk ticket.
    """
    try:
        creds = f'{{"apiKey": "{os.environ.get("FRESHDESK_API_KEY")}", "domain": "{os.environ.get("FRESHDESK_DOMAIN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = freshdesk.freshdesk_delete_ticket(cred=creds, params=params)
        return "Freshdesk ticket Deleted successfully"
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def freshdesk_update_ticket(params: FreshdeskUpdateTicketInput) -> str:
    """
    Update a Freshdesk Ticket.
    """
    try:
        creds = f'{{"apiKey": "{os.environ.get("FRESHDESK_API_KEY")}", "domain": "{os.environ.get("FRESHDESK_DOMAIN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = freshdesk.freshdesk_update_ticket(cred=creds, params=params)
        return "Freshdesk Ticket Updated successfully"
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def freshdesk_create_contact(params: FreshdeskCreateContactInput) -> str:
    """
    create a Freshdesk Contact.
    """
    try:
        creds = f'{{"apiKey": "{os.environ.get("FRESHDESK_API_KEY")}", "domain": "{os.environ.get("FRESHDESK_DOMAIN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = freshdesk.freshdesk_create_contact(cred=creds, params=params)
        return "Freshdesk Contact created successfully"
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def freshdesk_get_all_contacts(params: FreshdeskGetAllContactInput) -> dict:
    """
    Get All Freshdesk contacts.
    """
    try:
        creds = f'{{"apiKey": "{os.environ.get("FRESHDESK_API_KEY")}", "domain": "{os.environ.get("FRESHDESK_DOMAIN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = freshdesk.freshdesk_get_all_contacts(cred=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def freshdesk_get_contact(params: FreshdeskGetContactInput) -> dict:
    """
    Get Freshdesk contact.
    """
    try:
        creds = f'{{"apiKey": "{os.environ.get("FRESHDESK_API_KEY")}", "domain": "{os.environ.get("FRESHDESK_DOMAIN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = freshdesk.freshdesk_get_contact(cred=creds, params=params)
        return response
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def freshdesk_delete_contact(params: FreshdeskDeleteContactInput) -> str:
    """
    Delete a Freshdesk contact.
    """
    try:
        creds = f'{{"apiKey": "{os.environ.get("FRESHDESK_API_KEY")}", "domain": "{os.environ.get("FRESHDESK_DOMAIN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = freshdesk.freshdesk_delete_contact(cred=creds, params=params)
        return "Freshdesk Contact Deleted successfully"
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def freshdesk_update_contact(params: FreshdeskUpdateContactInput) -> str:
    """
    Update a Freshdesk contact.
    """
    try:
        creds = f'{{"apiKey": "{os.environ.get("FRESHDESK_API_KEY")}", "domain": "{os.environ.get("FRESHDESK_DOMAIN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = freshdesk.freshdesk_update_contact(cred=creds, params=params)
        return "Freshdesk Contact Updated successfully"
    except Exception as e:
        raise Exception(e)


if __name__ == "__main__":
    mcp.run()
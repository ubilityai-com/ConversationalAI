from mcp.server.fastmcp import FastMCP
from typing import Optional
from pydantic import BaseModel, Field
import os, sys

apps = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(apps)

from mcpLibraries import whatsapp

mcp = FastMCP("WhatsappMcpServer")

class SendWhatsappTextMessageContent(BaseModel):
    body: str = Field(None, description="Message body text. Supports URLs. Maximum 4096 characters.")
    preview_url: Optional[bool] = Field(None, description="Set to true to have the WhatsApp client attempt to render a link preview of any URL in the body text string.")

class SendWhatsappTextMessageInput(BaseModel):
    phone_number_id: str = Field(description="The ID of the phone number of the sender.")
    to: str = Field(description="The phone number of the Recipient in international format.")
    text: SendWhatsappTextMessageContent = Field(description="A dictionary containing text details for the message.")

class SendWhatsappLocationMessageContent(BaseModel):
    latitude: str = Field(None, description="Location latitude in decimal degrees.")
    longitude: str = Field(None, description="Location longitude in decimal degrees.")
    name: Optional[str] = Field(None, description="Name of the location.")
    address: Optional[str] = Field(None, description="Address of the location.")

class SendWhatsappLocationMessageInput(BaseModel):
    phone_number_id: str = Field(description="The ID of the phone number of the sender.")
    to: str = Field(description="The phone number of the Recipient in international format.")
    location: SendWhatsappLocationMessageContent = Field(description="A dictionary containing location details for the message.")

class SendWhatsappImageMessageContent(BaseModel):
    link: Optional[str] = Field(None, description="Link to the image to be sent. This should be a publicly accessible URL.")
    caption: Optional[str] = Field(None, description="Caption for the image. Maximum 1024 characters.")

class SendWhatsappImageMessageInput(BaseModel):
    phone_number_id: str = Field(description="The ID of the phone number of the sender.")
    to: str = Field(description="The phone number of the Recipient in international format.")
    image: SendWhatsappImageMessageContent = Field(description="A dictionary containing image details for the message.")

class SendWhatsappVideoMessageContent(BaseModel):
    link: Optional[str] = Field(None, description="Link to the video to be sent. This should be a publicly accessible URL.")
    caption: Optional[str] = Field(None, description="Caption for the video. Maximum 1024 characters.")

class SendWhatsappVideoMessageInput(BaseModel):
    phone_number_id: str = Field(description="The ID of the phone number of the sender.")
    to: str = Field(description="The phone number of the Recipient in international format.")
    video: SendWhatsappVideoMessageContent = Field(description="A dictionary containing video details for the message.")

class SendWhatsappAudioMessageContent(BaseModel):
    link: Optional[str] = Field(None, description="Link to the audio to be sent. This should be a publicly accessible URL.")

class SendWhatsappAudioMessageInput(BaseModel):
    phone_number_id: str = Field(description="The ID of the phone number of the sender.")
    to: str = Field(description="The phone number of the Recipient in international format.")
    audio: SendWhatsappAudioMessageContent = Field(description="A dictionary containing audio details for the message.")

class SendWhatsappDocumentMessageContent(BaseModel):
    link: Optional[str] = Field(None, description="Link to the document to be sent. This should be a publicly accessible URL.")
    caption: Optional[str] = Field(None, description="Caption for the document. Maximum 1024 characters.")
    filename: Optional[str] = Field(None, description="Document filename, with extension. The WhatsApp client will use an appropriate file type icon based on the extension. This is not the same as the media object filename, which is set when the media object is uploaded to WhatsApp. The filename here is used for display purposes in the WhatsApp client.")

class SendWhatsappDocumentMessageInput(BaseModel):
    phone_number_id: str = Field(description="The ID of the phone number of the sender.")
    to: str = Field(description="The phone number of the Recipient in international format.")
    document: SendWhatsappDocumentMessageContent = Field(description="A dictionary containing document details for the message.")

class SendWhatsappContactMessageAdresses(BaseModel):
    street: Optional[str] = Field(None, description="Street address of the contact. This should be a valid street address, such as (123 Main St).")
    city: Optional[str] = Field(None, description="City of the address. This should be a valid city name, such as (New York).")
    state: Optional[str] = Field(None, description="State or province of the address.")
    zip: Optional[str] = Field(None, description="ZIP or postal code of the address.")
    country: Optional[str] = Field(None, description="Country of the address, represented as a string. This should be a valid country name or code.")
    country_code: Optional[str] = Field(None, description="Country code of the address, represented as a string. This should be a valid ISO 3166-1 alpha-2 country code.")
    type: Optional[str] = Field(None, description="Type of address. Possible values: (home, work, other). This indicates the purpose of the address, such as home or work.")

class SendWhatsappContactMessageEmails(BaseModel):
    email: Optional[str] = Field(None, description="Email address of the contact. This should be a valid email format.")
    type: Optional[str] = Field(None, description="Type of email. Possible values: (personal, work, other). This indicates the purpose of the email address, such as personal or work.")

class SendWhatsappContactMessagePhones(BaseModel):
    phone: Optional[str] = Field(None, description="Phone number of the contact in international format. This should include the country code, such as (+14155552671).")
    type: Optional[str] = Field(None, description="Type of phone number. For example: cell, mobile, main, iPhone, home, work, etc.")
    wa_id: Optional[str] = Field(None, description="WhatsApp user ID of the contact. This is a unique identifier for the contact in WhatsApp, which can be used to send messages directly to them. If omitted, the message will display an Invite to WhatsApp button instead of the standard buttons.")

class SendWhatsappContactMessageUrls(BaseModel):
    url: Optional[str] = Field(None, description="Website URL associated with the contact or their company. This should be a valid URL format, such as (https://example.com).")
    type: Optional[str] = Field(None, description="Type of website. For example: company, work, personal, Facebook Page, Instagram, etc. This indicates the purpose of the URL, such as a company website or a personal blog.")

class SendWhatsappContactMessageName(BaseModel):
    formatted_name: Optional[str] = Field(None, description="Formatted name of the contact. This will appear in the message alongside the profile arrow button.")
    first_name: Optional[str] = Field(None, description="First name of the contact. This should be a valid first name, such as (John).")
    last_name: Optional[str] = Field(None, description="Last name of the contact. This should be a valid last name, such as (Doe).")
    middle_name: Optional[str] = Field(None, description="Middle name of the contact. This should be a valid middle name, such as (A).")
    suffix: Optional[str] = Field(None, description="Suffix of the of the name contact. This can be used to indicate titles such as Jr., Sr., III, etc.")
    prefix: Optional[str] = Field(None, description="Prefix of the of the name contact. This can be used to indicate titles such as Dr., Mr., Ms., etc.")

class SendWhatsappContactMessageContent(BaseModel):
    birthday: Optional[str] = Field(None, description="Birthday of the contact in ISO 8601 format (YYYY-MM-DD).")
    addresses: list[SendWhatsappContactMessageAdresses] = Field(description="List of addresses for the contact. Each address should be a dictionary containing Address details.")
    emails: list[SendWhatsappContactMessageEmails] = Field(description="List of email addresses for the contact. Each email should be a dictionary containing Email details.")
    phones: list[SendWhatsappContactMessagePhones] = Field(description="List of phone Addresses for the contact. Each phone address should be a dictionary containing Phone details.")
    urls: list[SendWhatsappContactMessageUrls] = Field(description="List of URL Addresses for the contact. Each URL Address should be a dictionary containing URL details.")
    name: SendWhatsappContactMessageName = Field(description="A dictionary containing the name details for the contact.")

class SendWhatsappContactMessageInput(BaseModel):
    phone_number_id: str = Field(description="The ID of the phone number of the sender.")
    to: str = Field(description="The phone number of the Recipient in international format.")
    contacts: list[SendWhatsappContactMessageContent] = Field(description="A list of dictionaries containing contact details for the message. Each dictionary should contain information about a single contact.")

class SendWhatsappTemplateMessageInput(BaseModel):
    phone_number_id: str = Field(description="The ID of the phone number of the sender.")
    to: str = Field(description="The phone number of the Recipient in international format.")
    template_value: str = Field(description="The Template Name and language in (template_name::language) format. where template_name should match the name of a template that has been approved by WhatsApp, and language should be in the format of language code, such as (en_US) for English (United States).")


@mcp.tool()
async def whatsapp_send_text_message(params: SendWhatsappTextMessageInput) -> str:
    """
    Send a text message to a WhatsApp user via the WhatsApp Business API.
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("WHATSAPP_TOKEN")}", "whatsappAccountId": "{os.environ.get("WHATSAPP_ACCOUNT_ID")}"}}'
        params = params.model_dump(exclude_none=True)
        params["type"] = "text"
        response = whatsapp.whatsapp_send_message(cred=creds, params=params)
        return "Whatsapp message sent successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def whatsapp_send_location_message(params: SendWhatsappLocationMessageInput) -> str:
    """
    Send a location to a WhatsApp user via the WhatsApp Business API.
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("WHATSAPP_TOKEN")}", "whatsappAccountId": "{os.environ.get("WHATSAPP_ACCOUNT_ID")}"}}'
        params = params.model_dump(exclude_none=True)
        params["type"] = "location"
        response = whatsapp.whatsapp_send_message(cred=creds, params=params)
        return "Whatsapp message sent successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def whatsapp_send_image_message(params: SendWhatsappImageMessageInput) -> str:
    """
    Send an image to a WhatsApp user via the WhatsApp Business API.
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("WHATSAPP_TOKEN")}", "whatsappAccountId": "{os.environ.get("WHATSAPP_ACCOUNT_ID")}"}}'
        params = params.model_dump(exclude_none=True)
        params["type"] = "image"
        response = whatsapp.whatsapp_send_message(cred=creds, params=params)
        return "Whatsapp message sent successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def whatsapp_send_video_message(params: SendWhatsappVideoMessageInput) -> str:
    """
    Send a video to a WhatsApp user via the WhatsApp Business API.
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("WHATSAPP_TOKEN")}", "whatsappAccountId": "{os.environ.get("WHATSAPP_ACCOUNT_ID")}"}}'
        params = params.model_dump(exclude_none=True)
        params["type"] = "video"
        response = whatsapp.whatsapp_send_message(cred=creds, params=params)
        return "Whatsapp message sent successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def whatsapp_send_audio_message(params: SendWhatsappAudioMessageInput) -> str:
    """
    Send an audio to a WhatsApp user via the WhatsApp Business API.
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("WHATSAPP_TOKEN")}", "whatsappAccountId": "{os.environ.get("WHATSAPP_ACCOUNT_ID")}"}}'
        params = params.model_dump(exclude_none=True)
        params["type"] = "audio"
        response = whatsapp.whatsapp_send_message(cred=creds, params=params)
        return "Whatsapp message sent successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def whatsapp_send_document_message(params: SendWhatsappDocumentMessageInput) -> str:
    """
    Send a document to a WhatsApp user via the WhatsApp Business API.
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("WHATSAPP_TOKEN")}", "whatsappAccountId": "{os.environ.get("WHATSAPP_ACCOUNT_ID")}"}}'
        params = params.model_dump(exclude_none=True)
        params["type"] = "document"
        response = whatsapp.whatsapp_send_message(cred=creds, params=params)
        return "Whatsapp message sent successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def whatsapp_send_contact_message(params: SendWhatsappContactMessageInput) -> str:
    """
    Send a contact to a WhatsApp user via the WhatsApp Business API.
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("WHATSAPP_TOKEN")}", "whatsappAccountId": "{os.environ.get("WHATSAPP_ACCOUNT_ID")}"}}'
        params = params.model_dump(exclude_none=True)
        params["type"] = "contacts"
        response = whatsapp.whatsapp_send_message(cred=creds, params=params)
        return "Whatsapp message sent successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"

@mcp.tool()
async def whatsapp_send_template_message(params: SendWhatsappTemplateMessageInput) -> str:
    """
    Sends a premade WhatsApp template message to a whatsapp user via the WhatsApp Business API.
    """
    try:
        creds = f'{{"accessToken": "{os.environ.get("WHATSAPP_TOKEN")}", "whatsappAccountId": "{os.environ.get("WHATSAPP_ACCOUNT_ID")}"}}'
        params = params.model_dump(exclude_none=True)
        response = whatsapp.whatsapp_send_template_message(cred=creds, params=params)
        return "Whatsapp message sent successfully."
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"


if __name__ == "__main__":
    mcp.run()
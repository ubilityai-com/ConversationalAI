from mcp.server.fastmcp import FastMCP
from typing import Optional
from pydantic import BaseModel, Field
import os, sys

apps = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(apps)

from mcpLibraries import hubspot_software

mcp = FastMCP("HubspotMcpServer")


class HubspotGetContactsInput(BaseModel): 
    properties: Optional[list] = Field(None, description="list of the properties to be returned in the response.city,country,company,website,work_email,field_of_study,firstname,lastname,industry,date_of_birth,job_function,jobtitle,relationship_status,message,mobilephone,numemployees,zip,seniority,fax,gender,hs_lead_status")
    limit: Optional[int] = Field(None, description="Maximum number of contacts to retrieve in the response.city,country,company,website,work_email,field_of_study,firstname,lastname,industry,date_of_birth,job_function,jobtitle,relationship_status,message,mobilephone,numemployees,zip,seniority,fax,gender,hs_lead_status")


class HubspotGetContactInput(BaseModel): 
    id: str = Field(description="The id of the contact to be retrieved")
    properties: Optional[list] = Field(None, description="list of the properties to be returned in the response.city,country,company,website,work_email,field_of_study,firstname,lastname,industry,date_of_birth,job_function,jobtitle,relationship_status,message,mobilephone,numemployees,zip,seniority,fax,gender,hs_lead_status")


class HubspotCreateContactProperties(BaseModel):
    email: str = Field(..., description="Email address of the contact (required).")
    lifecyclestage: Optional[str] = Field(None,description="Lifecycle stage of the contact. Available values: [lead, marketingqualifiedlead, subscriber, salesqualifiedlead, opportunity, customer, other]")
    city: Optional[str] = Field(None, description="City where the contact lives.")
    company: Optional[str] = Field(None, description="Name of the contact's company.")
    country: Optional[str] = Field(None, description="Country of the contact.")
    website: Optional[str] = Field(None, description="URL of the contact's website.")
    work_email: Optional[str] = Field(None, description="Work email address of the contact.")
    field_of_study: Optional[str] = Field(None, description="Field of study of the contact.")
    firstname: Optional[str] = Field(None, description="First name of the contact.")
    lastname: Optional[str] = Field(None, description="Last name of the contact.")
    industry: Optional[str] = Field(None, description="Industry associated with the contact.")
    job_function: Optional[str] = Field(None, description="Job function of the contact.")
    jobtitle: Optional[str] = Field(None, description="Job title of the contact.")
    message: Optional[str] = Field(None, description="Message provided by the contact.")
    mobilephone: Optional[str] = Field(None, description="Mobile phone number of the contact.")
    numemployees: Optional[str] = Field(None,description="Number of employees at the contact company. Available values: [None, 1-5, 5-25, 25-50, 50-100, 100-500, 500-1000, 1000+]")
    zip: Optional[str] = Field(None, description="Postal code or ZIP code of the contact.")
    relationship_status: Optional[str] = Field(None, description="Relationship status of the contact.")
    seniority: Optional[str] = Field(None, description="Seniority level of the contact.")
    fax: Optional[str] = Field(None, description="Fax number of the contact.")
    date_of_birth: Optional[str] = Field(None, description="Date of birth of the contact in format YYYY-MM-DD.")
    gender: Optional[str] = Field(None, description="Gender of the contact (male or female).")
    hs_lead_status: Optional[str] = Field(None,description="Lead status of the contact. Available values: OPEN_DEAL, BAD_TIMING, ATTEMPTED_TO_CONTACT")


class HubspotCreateContactInput(BaseModel): 
    properties: HubspotCreateContactProperties = Field(description="properties to be added to the contact.")


class HubspotUpdateContactProperties(BaseModel):
    email: Optional[str] = Field(None, description="The contact email address.")
    lifecyclestage: Optional[str] = Field(None,description="The lifecycle stage of the contact. Available values: [lead, marketingqualifiedlead, subscriber, salesqualifiedlead, opportunity, customer, other]")
    city: Optional[str] = Field(None, description="City of the contact.")
    company: Optional[str] = Field(None, description="Company name of the contact.")
    country: Optional[str] = Field(None, description="Country of the contact.")
    website: Optional[str] = Field(None, description="Website URL of the contact.")
    work_email: Optional[str] = Field(None, description="Work email address of the contact.")
    field_of_study: Optional[str] = Field(None, description="Field of study of the contact.")
    firstname: Optional[str] = Field(None, description="First name of the contact.")
    lastname: Optional[str] = Field(None, description="Last name of the contact.")
    industry: Optional[str] = Field(None, description="Industry the contact is associated with.")
    job_function: Optional[str] = Field(None, description="Job function of the contact.")
    jobtitle: Optional[str] = Field(None, description="Job title of the contact.")
    message: Optional[str] = Field(None, description="Message from the contact.")
    mobilephone: Optional[str] = Field(None, description="Mobile phone number of the contact.")
    numemployees: Optional[str] = Field(None,description="Number of employees at the contact company. Available values: [None, 1-5, 5-25, 25-50, 50-100, 100-500, 500-1000, 1000+]")
    zip: Optional[str] = Field(None, description="Postal code (ZIP) of the contact.")
    relationship_status: Optional[str] = Field(None, description="Relationship status of the contact.")
    seniority: Optional[str] = Field(None, description="Seniority level of the contact.")
    fax: Optional[str] = Field(None, description="Fax number of the contact.")
    date_of_birth: Optional[str] = Field(None, description="Date of birth of the contact (format: YYYY-MM-DD).")
    gender: Optional[str] = Field(None, description="Gender of the contact (male, female).")
    hs_lead_status: Optional[str] = Field(None,description="Lead status of the contact. Available values: OPEN_DEAL, BAD_TIMING, ATTEMPTED_TO_CONTACT" )


class HubspotUpdateContactInput(BaseModel): 
    id: str = Field(description="The ID of the contact to update.")
    properties: Optional[HubspotUpdateContactProperties] = Field(None, description="A dictionary of properties to update")


class HubspotSearchContactInput(BaseModel):
    query: Optional[str] = Field(None, description="Search query string to filter contacts by a keyword.")
    filterGroups: Optional[list] = Field( None, description=("A list of filter group dictionaries. Each dictionary contains 'filters', which is a list of filter conditions where each filter has 'propertyName', 'operator'(NEQ,EQ,GTE,GT,LT,LTE,IN,NOT_IN), and 'value'."))
    sorts: Optional[list] = Field(None, description="A list of sort conditions, where each dictionary has 'propertyName' and 'direction'(DESCENDING,ASCENDING). Example: [{'propertyName': 'firstname', 'direction': 'ASCENDING'}].")
    limit: Optional[int] = Field(None, description="Maximum number of contacts to retrieve in the response.")


class HubspotDeleteContactInput(BaseModel):
    id: str = Field(description="the id of the contact to delete.")


class HubspotGetCompaniesInput(BaseModel): 
    properties: Optional[list] = Field(None, description="list of the properties to be returned in the response.city,lifecyclestage,country,timezone,description,numberofemployees,about_us,address,domain,name,website,is_public,days_to_close,linkedinbio,founded_year,phone,zip,annual_revenue")
    limit: Optional[int] = Field(None, description="Maximum number of companies  to retrieve in the response.")


class HubspotGetcompanyInput(BaseModel): 
      id: str = Field(description="The id of the company to be retrieved.")


class HubspotCreateCompanyProperties(BaseModel):
    domain: str = Field(None, description="Domain of the company (required).")
    city: Optional[str] = Field(None, description="City of the company.")
    lifecyclestage: Optional[str] = Field(None,description="Lifecycle stage of the company. Available values: lead, marketingqualifiedlead, subscriber, salesqualifiedlead, opportunity, customer, other")
    country: Optional[str] = Field(None, description="Country of the company.")
    timezone: Optional[str] = Field(None, description="Timezone of the company.")
    description: Optional[str] = Field(None, description="Description of the company.")
    numberofemployees: Optional[str] = Field(None, description="Number of employees at the company.")
    about_us: Optional[str] = Field(None, description="Information about the company (About Us).")
    address: Optional[str] = Field(None, description="Address of the company.")
    name: Optional[str] = Field(None, description="Name of the company.")
    website: Optional[str] = Field(None, description="Website URL of the company.")
    is_public: Optional[str] = Field(None, description="Whether the company is public. true, false")
    linkedinbio: Optional[str] = Field(None, description="LinkedIn bio of the company.")
    founded_year: Optional[str] = Field(None, description="Year the company was founded.")
    phone: Optional[str] = Field(None, description="Phone number of the company.")
    zip: Optional[str] = Field(None, description="Postal code (ZIP) of the company.")
    annualrevenue: Optional[str] = Field(None, description="Annual revenue of the company.")
    

class HubspotCreateCompanyInput(BaseModel):
    properties: Optional[HubspotCreateCompanyProperties] = Field(description="Properties to be added to the new company.")


class HubspotUpdateCompanyProperties(BaseModel):
    domain: Optional[str] = Field(None, description="Domain of the company.")
    city: Optional[str] = Field(None, description="City of the company.")
    lifecyclestage: Optional[str] = Field( None,description="Lifecycle stage of the company. Available values: lead, marketingqualifiedlead, subscriber, salesqualifiedlead, opportunity, customer, other" )
    country: Optional[str] = Field(None, description="Country of the company.")
    timezone: Optional[str] = Field(None, description="Timezone of the company.")
    description: Optional[str] = Field(None, description="Description of the company.")
    numberofemployees: Optional[str] = Field(None, description="Number of employees at the company.")
    about_us: Optional[str] = Field(None, description="Information about the company (About Us).")
    address: Optional[str] = Field(None, description="Address of the company.")
    name: Optional[str] = Field(None, description="Name of the company.")
    website: Optional[str] = Field(None, description="Website URL of the company.")
    is_public: Optional[str] = Field(None, description="Whether the company is public. true, false")
    linkedinbio: Optional[str] = Field(None, description="LinkedIn bio of the company.")
    founded_year: Optional[str] = Field(None, description="Year the company was founded.")
    phone: Optional[str] = Field(None, description="Phone number of the company.")
    zip: Optional[str] = Field(None, description="Postal code (ZIP) of the company.")
    annualrevenue: Optional[str] = Field(None, description="Annual revenue of the company.")
    

class HubspotUpdateCompanyInput(BaseModel): 
    id: str = Field(description="the id of the company to be modified.")
    properties: Optional[HubspotUpdateCompanyProperties] = Field(None, description="A dictionary of properties to update")


class HubspotDeleteCompanyInput(BaseModel):
    id: str = Field(description="the id of the company to delete.")
  

class HubspotGetTicketsInput(BaseModel): 
    properties: Optional[list] = Field(None, description="list of the properties to be returned in the response.createdate,closed_date,hs_ticket_priority,hubspot_owner_id,subject,hs_ticket_category...")
    limit: Optional[int] = Field(None, description="Maximum number of tickets to retrieve in the response.")


class HubspotGetTicketInput(BaseModel): 
      id: str = Field(description="The id of the ticket to be retrieved.")
      properties: Optional[list] = Field(None, description="list of the properties to be returned in the response.createdate,closed_date,hs_ticket_priority,hubspot_owner_id,subject,hs_ticket_category")


class HubspotCreateTicketProperties(BaseModel):
    hs_pipeline_stage: str = Field(None, description="The stage of the ticket pipeline. Available values: 1 - New, 2 - Waiting On Contact, 3 - Waiting On Us, 4 - Closed (required)")
    subject: Optional[str] = Field(None, description="Subject of the ticket.")
    hs_ticket_priority: Optional[str] = Field(None, description="Priority of the ticket. Available values: [HIGH, MEDIUM, LOW]")
    hs_ticket_category: Optional[str] = Field(None, description="Category of the ticket. Available values: [GENERAL_INQUIRY, PRODUCT_ISSUE, FEATURE_REQUEST, BILLING_ISSUE]")
    hs_pipeline: str = Field(None, description="Pipeline of the ticket. Available value: 1 (Support Pipeline). Default is 1 if not specified.")


class HubspotCreateTicketInput(BaseModel): 
    properties: HubspotCreateTicketProperties = Field(..., description="Properties to be added to the ticket.")
    ticketCreateTime: Optional[str] = Field(None, description="Creation time of the ticket in HH:MM format.")
    ticketCreateDate: Optional[str] = Field(None, description="Creation date of the ticket in YYYY-MM-DD format.")
    

class HubspotUpdateTicketProperties(BaseModel):
    hs_pipeline_stage: Optional[str] = Field(None, description="The stage of the ticket pipeline. Available values: 1 - New, 2 - Waiting On Contact, 3 - Waiting On Us, 4 - Closed")
    subject: Optional[str] = Field(None, description="Subject of the ticket.")
    hs_ticket_priority: Optional[str] = Field(None, description="Priority of the ticket. Available values: [HIGH, MEDIUM, LOW]")
    hs_ticket_category: Optional[str] = Field(None, description="Category of the ticket. Available values: [GENERAL_INQUIRY, PRODUCT_ISSUE, FEATURE_REQUEST, BILLING_ISSUE]")
    hs_pipeline: Optional[str] = Field(None, description="Pipeline of the ticket. Available value: 1 (Support Pipeline). Default is 1 if not specified.")


class HubspotUpdateTicketInput(BaseModel):
    id: str = Field(description="The ID of the ticket to be modified.")
    properties: Optional[HubspotUpdateTicketProperties] = Field(None, description="A dictionary of properties to update.")
    ticketCreateTime: Optional[str] = Field(None, description="Creation time of the ticket in HH:MM format.")
    ticketCreateDate: Optional[str] = Field(None, description="Creation date of the ticket in YYYY-MM-DD format.")
    

class HubspotDeleteTicketInput(BaseModel):
    id: str = Field(description="the id of the ticket to delete.")


class HubspotGetDealsInput(BaseModel): 
    properties: Optional[list] = Field(None, description="list of the properties to be returned in the response.dealname,dealstage,amount,hs_forecast_amount,closedate,createdate,description ...")
    limit: Optional[int] = Field(None, description="Maximum number of deals to retrieve in the response.")


class HubspotGetDealInput(BaseModel): 
      id: str = Field(description="The id of the deal to be retrieved.")
      properties: Optional[list] = Field(None, description="list of the properties to be returned in the response.dealname,dealstage,amount,hs_forecast_amount,closedate,createdate,description...")


class HubspotCreateDealProperties(BaseModel):
    dealname: str = Field(..., description="The name of the deal.")
    dealtype: Optional[str] = Field(None, description="The type of the deal. Available values: newbusiness, existingbusiness")
    dealstage: Optional[str] = Field(None, description="The stage of the deal. Available values: contractsent, presentationscheduled, closedwon, decisionmakerboughtin, appointmentscheduled, qualifiedtobuy, closedlost")
    amount: Optional[str] = Field(None, description="The amount associated with the deal.")
    description: Optional[str] = Field(None, description="A description of the deal.")


class HubspotCreateDealInput(BaseModel):
    properties: HubspotCreateDealProperties = Field(description="Deal properties as a dictionary.")
    dealCreateTime: Optional[str] = Field(None, description="Creation time of the deal in HH:MM format.")
    dealCreateDate: Optional[str] = Field(None, description="Creation date of the deal in YYYY-MM-DD format.")
    dealCloseDate: Optional[str] = Field(None, description="Close date of the deal in YYYY-MM-DD format.")
    dealCloseTime: Optional[str] = Field(None, description="Close time of the deal in HH:MM format.")
  

class HubspotUpdateDealProperties(BaseModel):
    dealname: Optional[str] = Field(..., description="The name of the deal.")
    dealtype: Optional[str] = Field(None, description="the type of the deal. available values : newbusiness , existingbusiness")
    dealstage: Optional[str] = Field(None, description="The stage of the deal. available values : contractsent, presentationscheduled, closedwon, decisionmakerboughtin, appointmentscheduled, qualifiedtobuy, closedlost")
    amount: Optional[str] = Field(None, description="The amount associated with the deal.")
    description: Optional[str] = Field(None, description="A description of the deal.")   
        

class HubspotUpdateDealInput(BaseModel): 
    id: str = Field(description="the id of the deal to be modified.")
    properties: Optional[HubspotUpdateDealProperties] = Field(None, description="A dictionary of properties to update, where keys are property names and values are the new values.dealname,amount,dealstage(appointmentscheduled,qualifiedtobuy,presentationscheduled,decisionmakerboughtin,contractsent,closedwon,closedlost),dealtype( newbusiness,existingbusiness)....")
    dealCreateTime: Optional[str] = Field(None, description="Creation time of the deal in HH:MM format .")
    dealCreateDate: Optional[str] = Field(None, description="Creation date of the deal in YYYY-MM-DD format .")
    dealCloseDate: Optional[str] = Field(None, description="Close date of the deal in YYYY-MM-DD format.")
    dealCloseTime: Optional[str] = Field(None, description="Close time of the deal in HH:MM format .")
  

class HubspotDeleteDealInput(BaseModel):
    id: str = Field(description="the id of the deal to delete.")
 

class HubspotCreateCallMetadata(BaseModel):
    body: Optional[str] = Field(None, description="Notes or description of the call.")
    durationMilliseconds: Optional[int] = Field(None, description="Duration of the call in milliseconds.")
    fromNumber: Optional[str] = Field(None, description="The phone number the call originated from.")
    recordingUrl: Optional[str] = Field(None, description="URL of the call recording.")
    status: Optional[str] = Field(None, description="Status of the call available values: (RINGING,QUEUED,NO_ANSWER,IN_PROGRESS,FAILED,CONNECTING,CANCELED,CALLING_CRM_USER,BUSY,COMPLETED).")
    toNumber: Optional[str] = Field(None, description="The phone number the call was made to.")
    title: Optional[str] = Field(None, description="Title of the call.")
    direction: Optional[str] = Field(None, description="Direction of the call (INBOUND or OUTBOUND).")
    disposition: Optional[str] = Field(None, description="Disposition or outcome of the call.")


class HubspotCreateCallAssociations(BaseModel):
    contactIds: Optional[list[str]] = Field(None, description="List of contact IDs associated with the call.")
    companyIds: Optional[list[str]] = Field(None, description="List of company IDs associated with the call.")
    dealIds: Optional[list[str]] = Field(None, description="List of deal IDs associated with the call.")
    ownerIds: Optional[list[str]] = Field(None, description="List of owner IDs associated with the call.")


class HubspotCreateCallEngagement(BaseModel):
    type: str = Field(None, description="The type of engagement (should be (CALL) for call engagements).")
    timestamp: Optional[str] = Field(None, description="The timestamp of the engagement in milliseconds since epoch .")
                

class HubspotCreateCallInput(BaseModel):
    metadata: HubspotCreateCallMetadata = Field(description="Contains information specific to the call.At least one metadata field needs to set")
    engagement: HubspotCreateCallEngagement = Field(None, description="Contains engagement details it must be not null.")
    associations: Optional[HubspotCreateCallAssociations] = Field(None, description="Contains IDs for associations related to the call")


class HubspotGetCallsInput(BaseModel):
    limit: Optional[int] = Field(None, description="The max number of calls to be returned")
    association_id: Optional[str] = Field(None, description="The ID of the contact to retrieve calls associated with it.")
 

class HubspotGetCallInput(BaseModel): 
      id: str = Field(description="The id of the call to be retrieved.")
    

class HubspotDeleteCallInput(BaseModel):
    id: str = Field(description="the id of the call to delete.")


class HubspotCreateEmailProperties(BaseModel):
    hs_timestamp: str = Field(None,description="Unix timestamp of the email (required).")
    hs_email_direction: str = Field(None,description="Direction of the email. One of EMAIL, INCOMING_EMAIL, FORWARDED_EMAIL. Default is EMAIL. (required)")
    hs_email_status: Optional[str] = Field(None, description="Status of the email. One of BOUNCED, FAILED, SCHEDULED, SENDING, SENT.")
    hs_email_subject: Optional[str] = Field(None, description="Subject of the email.")
    hs_email_text: Optional[str] = Field(None, description="Plain text body of the email.")
    

class HubspotCreateEmailInput(BaseModel):
     properties: HubspotCreateEmailProperties = Field(description="Properties to be added to the email.")


class HubspotGetEmailsInput(BaseModel):
    limit: Optional[int] = Field(None, description="The max number of emails to be returned")
 

class HubspotGetEmailInput(BaseModel): 
      id: str = Field(description="The id of the email to be retrieved.")


class HubspotDeleteEmailInput(BaseModel):
    id: str = Field(description="the id of the email to delete.")
 

class HubspotCreateTaskProperties(BaseModel):
    hs_timestamp: str = Field(None, description="Unix timestamp of the task (required).")
    hs_task_subject: Optional[str] = Field(None, description="The subject of the task.")
    hs_task_body: Optional[str] = Field(None, description="The body of the task.")
    hs_task_priority: Optional[str] = Field(None, description="Priority of the task. One of LOW, MEDIUM, HIGH.")
    hs_task_status: Optional[str] = Field(None, description="Status of the task. One of NOT_STARTED, COMPLETED.")
    hs_task_type: Optional[str] = Field(None, description="Type of the task. One of EMAIL, CALL, TODO.")


class HubspotCreateTaskInput(BaseModel):
    properties: HubspotCreateTaskProperties = Field(description="Properties to be added to the task.")


class HubspotGetTasksInput(BaseModel):
    limit: Optional[int] = Field(None, description="The max number of tasks to be returned")
   

class HubspotGetTaskInput(BaseModel): 
      id: str = Field(description="The id of the task to be retrieved.")
  

class HubspotDeleteTaskInput(BaseModel):
    id: str = Field(description="the id of the task to delete.")


class HubspotCreateMeetingProperties(BaseModel):
    hs_timestamp: str = Field(None, description="The timestamp of the meeting (required).")
    hs_internal_meeting_notes: Optional[str] = Field(None, description="Internal notes about the meeting.")
    hs_meeting_title: Optional[str] = Field(None, description="Title of the meeting.")
    hs_meeting_body: Optional[str] = Field(None, description="Body content of the meeting.") 
    

class HubspotCreateMeetingInput(BaseModel): 
    properties: HubspotCreateMeetingProperties = Field(description="properties to be added to the meeting")
    meetingStartTime: Optional[str] = Field(None, description="start time of the meeting in HH:MM format.(optional)")
    meetingStartDate: Optional[str] = Field(None, description="start date of the meeting in YYYY-MM-DD format .(optional)")
    meetingEndDate: Optional[str] = Field(None, description="end date of the meeting in YYYY-MM-DD format.(optional)")
    meetingEndTime: Optional[str] = Field(None, description="end time of the meeting in HH:MM format .(optional)")
    

class HubspotGetMeetingsInput(BaseModel):
    limit: Optional[int] = Field(None, description="The max number of meetings to be returned")
    

class HubspotGetMeetingInput(BaseModel): 
      id: str = Field(description="The id of the meeting to be retrieved.")


class HubspotDeleteMeetingInput(BaseModel):
    id: str = Field(description="the id of the meeting to delete.")
 

class HubspotAddContactsToListInput(BaseModel):
    list_id: Optional[int] = Field(None, description="The id of the list to be added to.")
    record: Optional[list] = Field(None, description="The ids of the contacts to be added.")
 

class HubspotRemoveContactsFromListInput(BaseModel):
    list_id: Optional[int] = Field(None, description="The id of the list to remove contact from")
    record: Optional[list] = Field(None, description="The ids of the contacts to be removed.")

   
@mcp.tool()
async def hubspot_get_all_contacts(params: HubspotGetContactsInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_all_contacts(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"                                 

@mcp.tool()
async def hubspot_get_contact(params: HubspotGetContactInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_contact(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"                                 
        
@mcp.tool()
async def hubspot_create_contact(params: HubspotCreateContactInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_create_contact(access_token=access_token,params=params)
        return "contact created successfully. "
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"   
      
@mcp.tool()
async def hubspot_update_contact(params: HubspotUpdateContactInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_update_contact(access_token=access_token,params=params)
        return "contact updated successfully. "
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"                                 
                                              
@mcp.tool()
async def hubspot_delete_contact(params: HubspotDeleteContactInput) -> str:
    try:
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}' 
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_delete_contact(access_token=access_token,params=params)
        return "contact deleted successfully. "
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"                                 
                                              
@mcp.tool()
async def hubspot_search_contact(params: HubspotSearchContactInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_search_contact(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"          

@mcp.tool()
async def hubspot_create_company(params: HubspotCreateCompanyInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_create_company(access_token=access_token,params=params)
        return "company created successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"                                                

@mcp.tool()
async def hubspot_update_company(params: HubspotUpdateCompanyInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_update_company(access_token=access_token,params=params)
        return "company updated successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"                                                
                             
@mcp.tool()
async def hubspot_get_company(params: HubspotGetcompanyInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_company(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"                                                
                                   
@mcp.tool()
async def hubspot_get_all_companies(params: HubspotGetCompaniesInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_all_companies(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"                                                
                                   
@mcp.tool()
async def hubspot_delete_company(params: HubspotDeleteCompanyInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_delete_company(access_token=access_token,params=params)
        return "company deleted successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"          

@mcp.tool()
async def hubspot_create_ticket(params: HubspotCreateTicketInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_create_ticket(access_token=access_token,params=params)
        return "ticket created successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"
    
@mcp.tool()    
async def hubspot_update_ticket(params: HubspotUpdateTicketInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_update_ticket(access_token=access_token,params=params)
        return "ticket updated successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}" 
    
@mcp.tool()    
async def hubspot_get_ticket(params: HubspotGetTicketInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_ticket(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}" 

@mcp.tool()      
async def hubspot_get_all_tickets(params: HubspotGetTicketsInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_all_tickets(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"                                                                      

@mcp.tool()    
async def hubspot_delete_ticket(params: HubspotDeleteTicketInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_delete_ticket(access_token=access_token,params=params)
        return "ticket deleted successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"                           
  
@mcp.tool()
async def hubspot_create_deal(params: HubspotCreateDealInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_create_deal(access_token=access_token,params=params)
        return "deal created successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"
    
@mcp.tool()
async def hubspot_update_deal(params: HubspotUpdateDealInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_update_deal(access_token=access_token,params=params)
        return "deal updated successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"  
    
@mcp.tool()
async def hubspot_get_deal(params: HubspotGetDealInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_deal(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"   
    
@mcp.tool()
async def hubspot_get_many_deals(params: HubspotGetDealsInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_many_deals(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"            
    
@mcp.tool()
async def hubspot_delete_deal(params: HubspotDeleteDealInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_delete_deal(access_token=access_token,params=params)
        return "deal deleted successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}" 
 
@mcp.tool()
async def hubspot_create_call(params: HubspotCreateCallInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_create_call(access_token=access_token,params=params)
        return "new call created successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"  
    
@mcp.tool()
async def hubspot_get_call(params: HubspotGetCallInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_call(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"     
      
@mcp.tool()
async def hubspot_get_many_calls(params: HubspotGetCallsInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_many_calls(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"      
    
@mcp.tool()
async def hubspot_delete_call(params: HubspotDeleteCallInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_delete_call(access_token=access_token,params=params)
        return "call deleted successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"    

@mcp.tool()
async def hubspot_create_email(params: HubspotCreateEmailInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_create_email(access_token=access_token,params=params)
        return "new email created successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"  
   
@mcp.tool()
async def hubspot_get_email(params: HubspotGetEmailInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_email(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"  

@mcp.tool()
async def hubspot_get_many_emails(params: HubspotGetEmailsInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_many_emails(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"  
  
@mcp.tool()
async def hubspot_delete_email(params: HubspotDeleteEmailInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_delete_email(access_token=access_token,params=params)
        return "email deleted successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"     

@mcp.tool()
async def hubspot_create_task(params: HubspotCreateTaskInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_create_task(access_token=access_token,params=params)
        return "new task created successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"  
   
@mcp.tool()
async def hubspot_get_many_tasks(params: HubspotGetTasksInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_many_tasks(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"  

@mcp.tool()
async def hubspot_get_task(params: HubspotGetTaskInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_task(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"  
  
@mcp.tool()
async def hubspot_delete_task(params: HubspotDeleteTaskInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_delete_task(access_token=access_token,params=params)
        return "task deleted successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"  

@mcp.tool()
async def hubspot_create_meeting(params: HubspotCreateMeetingInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_create_meeting(access_token=access_token,params=params)
        return "new meeting created successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"  
   
@mcp.tool()
async def hubspot_get_meeting(params: HubspotGetMeetingInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_meeting(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"  

@mcp.tool()
async def hubspot_get_many_meetings(params: HubspotGetMeetingsInput) -> dict:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_get_many_meetings(access_token=access_token,params=params)
        return response
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"  
  
@mcp.tool()
async def hubspot_delete_meeting(params: HubspotDeleteMeetingInput) -> str:
    try:
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}' 
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_delete_meeting(access_token=access_token,params=params)
        return "meeting deleted successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"   
    
@mcp.tool()      
async def hubspot_add_to_list(params: HubspotAddContactsToListInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_add_to_list(access_token=access_token,params=params)
        return "contacts added to list successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"   
    
@mcp.tool()    
async def hubspot_remove_from_list(params: HubspotRemoveContactsFromListInput) -> str:
    try: 
        creds = f'{{"redirectUri": "{os.environ.get("HUBSPOT_REDIRECT_URI")}", "refreshToken": "{os.environ.get("HUBSPOT_REFRESH_TOKEN")}", "clientID": "{os.environ.get("HUBSPOT_CLIENT_ID")}", "clientSecret": "{os.environ.get("HUBSPOT_CLIENT_SECRET")}"}}'
        params = params.model_dump(exclude_none=True)
        access_token=hubspot_software.hubspot_refresh_access_token(creds)
        response = hubspot_software.hubspot_remove_from_list(access_token=access_token,params=params)
        return "contacts removed from the list successfully"
    except Exception as ex:
        return f"An unexpected error occurred: {str(ex)}"     
 

if __name__ == "__main__":
    mcp.run()
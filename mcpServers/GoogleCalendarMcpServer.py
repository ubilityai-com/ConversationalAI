from mcp.server.fastmcp import FastMCP
from typing import Optional
from pydantic import BaseModel, Field
import os, sys
from datetime import datetime

apps = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(apps)

from mcpLibraries import googleCalendar

mcp = FastMCP("GoogleCalendarMcpServer")

class GoogleCalendarGetAllEventsInput(BaseModel):
    calendarId: str = Field(description="The ID of the calendar to retrieve events from. Required.")
    orderBy: Optional[str] = Field(None, description="Order of events in the result. Accepted values: 'startTime', 'updated'.")
    timeMax: Optional[datetime] = Field(None, description="Upper bound (exclusive) for an event's start time to filter by.")
    timeMin: Optional[datetime] = Field(None, description="Lower bound (exclusive) for an event's end time to filter by.")
    iCalUID: Optional[str] = Field(None, description="Specifies an event ID in iCalendar format to filter the result.")
    maxAttendees: Optional[int] = Field(None, description="Maximum number of attendees to include in the response.")
    q: Optional[str] = Field(None, description="Free text search to match fields like summary, description, location.")
    showHiddenInvitations: Optional[bool] = Field(None, description="Whether to include hidden invitations in the result.")
    timeZone: Optional[str] = Field(None, description="Time zone used in the response.")
    updatedMin: Optional[datetime] = Field(None, description="Lower bound for an event's last modification time to filter by.")


class GoogleCalendarGetEventsInput(BaseModel):
    calendarId: str = Field(description="The ID of the calendar to retrieve events from. Required.")
    eventId: str = Field(description="The id of the event to be retrieved")


class GoogleCalendarDeleteEventsInput(BaseModel):
    calendarId: str = Field(description="The ID of the calendar to retrieve events from. Required.")
    eventId: str = Field(description="The id of the event to be retrieved")


class EventDateTimeContent(BaseModel):
    dateTime: str = Field(None, description="The time, as a combined date-time value (formatted according to RFC3339).")
    timeZone: Optional[str] = Field(None, description="Time zone of the event time.")


class EventAttendeeContent(BaseModel):
    email: str = Field(None, description="Email of the attendee.")


class GoogleCalendarCreateEventInput(BaseModel):
    calendarId: str = Field(description="The ID of the calendar to create the event in.")
    colorId: Optional[str] = Field(None, description="The color of the event. This is an ID referring to an entry in the calendar's color definition.")
    start: EventDateTimeContent = Field(description="Start date and time of the event.")
    end: EventDateTimeContent = Field(description="End date and time of the event.")
    visibility: Optional[str] = Field(None, description="Visibility of the event. Accepted values: 'default', 'public', 'private', 'confidential'.")
    description: Optional[str] = Field(None, description="Description of the event.")
    location: Optional[str] = Field(None, description="Geographic location of the event as free-form text.")
    maxAttendees: Optional[int] = Field(None, description="Maximum number of attendees to include in the response.")
    attendees: Optional[list[EventAttendeeContent]] = Field(None, description="List of attendees (emails).")
    guestsCanInviteOthers: Optional[bool] = Field(None, description="Whether attendees other than the organizer can invite others.")
    guestsCanModify: Optional[bool] = Field(None, description="Whether attendees other than the organizer can modify the event.")
    guestsCanSeeOtherGuests: Optional[bool] = Field(None, description="Whether attendees other than the organizer can see who the other attendees are.")
    sendUpdates: Optional[str] = Field(None, description="Whether to send notifications about the creation of the new event. Accepted values: 'all', 'externalOnly', 'none'.")


class EventDateTimeeContent(BaseModel):
    dateTime: str = Field(None, description="The time, as a combined date-time value (formatted according to RFC3339).")
    timeZone: Optional[str] = Field(None, description="Time zone of the event time.")


class EventAttendeeeContent(BaseModel):
    email: str = Field(None, description="Email of the attendee.")


class GoogleCalendarUpdateEventInput(BaseModel):
    calendarId: str = Field(description="The ID of the calendar that contains the event to update.")
    eventId: str = Field(description="The ID of the event to update.")
    summary: Optional[str] = Field(None, description="Title of the event.")
    colorId: Optional[str] = Field(None, description="Color ID of the event.")
    start: Optional[EventDateTimeeContent] = Field(None, description="Start time of the event.")
    end: Optional[EventDateTimeeContent] = Field(None, description="End time of the event.")
    visibility: Optional[str] = Field(None, description="Event visibility: 'default', 'public', 'private', 'confidential'.")
    description: Optional[str] = Field(None, description="Description of the event.")
    location: Optional[str] = Field(None, description="Location of the event.")
    maxAttendees: Optional[int] = Field(None, description="Maximum number of attendees.")
    attendees: Optional[list[EventAttendeeeContent]] = Field(None, description="List of attendees.")
    guestsCanInviteOthers: Optional[bool] = Field(None, description="Whether guests can invite others.")
    guestsCanModify: Optional[bool] = Field(None, description="Whether guests can modify the event.")
    guestsCanSeeOtherGuests: Optional[bool] = Field(None, description="Whether guests can see each other.")
    sendUpdates: Optional[str] = Field(None, description="Whether to send updates. Accepted: 'all', 'externalOnly', 'none'.")


class GoogleCalendarGetCalendarInput(BaseModel):
    calendarId: str = Field(description="The ID of the calendar to retrieve events from. Required.")


@mcp.tool()
async def Google_Calendar_get_all_events(params: GoogleCalendarGetAllEventsInput) -> dict:
    """
    Get all Events Google Calendar
    """
    try:
        creds = f'{{ "refreshToken": "{os.environ.get("GOOGLE_CALENDAR_REFRESH_TOKEN")}","clientID": "{os.environ.get("GOOGLE_CALENDAR_CLIENT_ID")}","expirey": "{os.environ.get("GOOGLE_CALENDAR_EXPIREY")}","scope": "{os.environ.get("GOOGLE_CALENDAR_SCOPE")}", "clientSecret": "{os.environ.get("GOOGLE_CALENDAR_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLE_CALENDAR_ACCESS_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleCalendar.Google_Calendar_get_all_events(creds=creds, API_SERVICE_NAME="calendar", API_VERSION="v3", params=params)
        return response
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def Google_Calendar_get_event(params: GoogleCalendarGetEventsInput) -> dict:
    """
    Get Event Google Calendar
    """
    try:
        creds = f'{{ "refreshToken": "{os.environ.get("GOOGLE_CALENDAR_REFRESH_TOKEN")}","clientID": "{os.environ.get("GOOGLE_CALENDAR_CLIENT_ID")}","expirey": "{os.environ.get("GOOGLE_CALENDAR_EXPIREY")}","scope": "{os.environ.get("GOOGLE_CALENDAR_SCOPE")}", "clientSecret": "{os.environ.get("GOOGLE_CALENDAR_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLE_CALENDAR_ACCESS_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleCalendar.Google_Calendar_get_event(creds=creds, API_SERVICE_NAME="calendar", API_VERSION="v3", params=params)
        return response 
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def Google_Calendar_delete_event(params: GoogleCalendarDeleteEventsInput) -> str:
    """
    Delete Event Google Calendar
    """
    try:
        creds = f'{{ "refreshToken": "{os.environ.get("GOOGLE_CALENDAR_REFRESH_TOKEN")}","clientID": "{os.environ.get("GOOGLE_CALENDAR_CLIENT_ID")}","expirey": "{os.environ.get("GOOGLE_CALENDAR_EXPIREY")}","scope": "{os.environ.get("GOOGLE_CALENDAR_SCOPE")}", "clientSecret": "{os.environ.get("GOOGLE_CALENDAR_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLE_CALENDAR_ACCESS_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleCalendar.Google_Calendar_delete_event(creds=creds, API_SERVICE_NAME="calendar", API_VERSION="v3", params=params)
        return "Google Calendar Event Deleted successfully" 
    except Exception as e:
        raise Exception(e)
    
@mcp.tool()
async def Google_Calendar_create_event(params: GoogleCalendarCreateEventInput) -> str:
    """
    Create Event Google Calendar
    """
    try:
        creds = f'{{ "refreshToken": "{os.environ.get("GOOGLE_CALENDAR_REFRESH_TOKEN")}","clientID": "{os.environ.get("GOOGLE_CALENDAR_CLIENT_ID")}","expirey": "{os.environ.get("GOOGLE_CALENDAR_EXPIREY")}","scope": "{os.environ.get("GOOGLE_CALENDAR_SCOPE")}", "clientSecret": "{os.environ.get("GOOGLE_CALENDAR_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLE_CALENDAR_ACCESS_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleCalendar.Google_Calendar_create_event(creds=creds, API_SERVICE_NAME="calendar", API_VERSION="v3", params=params)
        return "Google Calendar Event Created successfully" 
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def Google_Calendar_update_event(params: GoogleCalendarUpdateEventInput) -> str:
    """
    Update Event Google Calendar
    """
    try:
        creds = f'{{ "refreshToken": "{os.environ.get("GOOGLE_CALENDAR_REFRESH_TOKEN")}","clientID": "{os.environ.get("GOOGLE_CALENDAR_CLIENT_ID")}","expirey": "{os.environ.get("GOOGLE_CALENDAR_EXPIREY")}","scope": "{os.environ.get("GOOGLE_CALENDAR_SCOPE")}", "clientSecret": "{os.environ.get("GOOGLE_CALENDAR_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLE_CALENDAR_ACCESS_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleCalendar.Google_Calendar_update_event(creds=creds, API_SERVICE_NAME="calendar", API_VERSION="v3", params=params)
        return "Google Calendar Event Updated successfully" 
    except Exception as e:
        raise Exception(e)

@mcp.tool()
async def Google_Calendar_get_calendar(params: GoogleCalendarGetCalendarInput) -> dict:
    """
    Get Calender Google Calendar
    """
    try:
        creds = f'{{ "refreshToken": "{os.environ.get("GOOGLE_CALENDAR_REFRESH_TOKEN")}","clientID": "{os.environ.get("GOOGLE_CALENDAR_CLIENT_ID")}","expirey": "{os.environ.get("GOOGLE_CALENDAR_EXPIREY")}","scope": "{os.environ.get("GOOGLE_CALENDAR_SCOPE")}", "clientSecret": "{os.environ.get("GOOGLE_CALENDAR_CLIENT_SECRET")}", "accessToken": "{os.environ.get("GOOGLE_CALENDAR_ACCESS_TOKEN")}"}}'
        params = params.model_dump(exclude_none=True)
        response = googleCalendar.Google_Calendar_get_calendar(creds=creds, API_SERVICE_NAME="calendar", API_VERSION="v3", params=params)
        return response 
    except Exception as e:
        raise Exception(e)
    

if __name__ == "__main__":
    mcp.run()
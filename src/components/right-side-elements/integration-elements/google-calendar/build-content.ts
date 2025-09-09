import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};
    if (inputs.type === "Event") {
        if (inputs.operation === "Get Event") {
            jsonToSend = {
                ...jsonToSend,
                calendarId: inputs.get_calendar_id,
                eventId: inputs.get_event_id,
            };
        } else if (inputs.operation === "Get All Events") {
            jsonToSend = {
                ...jsonToSend,
                calendarId: inputs.get_calendar_id,

                orderBy: getAccvalue(inputs, "get_all_events_order_by"),
                timeMax: getAccvalue(inputs, "get_all_events_time_max"),
                timeMin: getAccvalue(inputs, "get_all_events_time_min"),
                iCalUID: getAccvalue(inputs, "get_all_events_iCalUID"),
                maxAttendees: getAccvalue(
                    inputs,
                    "get_all_events_max_attendees"
                ),
                q: getAccvalue(inputs, "get_all_events_query"),
                showDeleted: getAccvalue(inputs, "get_all_events_showDeleted"),
                showHiddenInvitations: getAccvalue(
                    inputs,
                    "get_all_events_showHiddenInvitations"
                ),
                singleEvents: getAccvalue(inputs, "get_all_events_singleEvents"),

                timeZone: getAccvalue(inputs, "get_all_events_timeZone"),
                updatedMin: getAccvalue(inputs, "get_all_events_updatedMin"),
            };
        } else if (inputs.operation === "Delete Event") {
            jsonToSend = {
                ...jsonToSend,
                calendarId: inputs.get_calendar_id,
                eventId: inputs.delete_event_id,
            };
        } else if (inputs.operation === "Update Event") {
            jsonToSend = {
                ...jsonToSend,
                calendarId: inputs.get_calendar_id,
                eventId: inputs.update_event_id,

                summary: getAccvalue(inputs, "update_event_summary"),
                visibility: getAccvalue(inputs, "update_event_visibility"),
                description: getAccvalue(inputs, "update_event_description"),
                location: getAccvalue(inputs, "update_event_location"),
                maxAttendees: getAccvalue(inputs, "update_event_max_attendees"),
                attendees: { email: inputs.update_event_attendees },
                start: { dateTime: inputs.update_event_start },

                end: { dateTime: inputs.update_event_end },

                conferenceData: {
                    typeId: getAccvalue(inputs, "update_event_conferenceData"),
                },
                id: getAccvalue(inputs, "update_event_id2"),
                colorId: getAccvalue(inputs, "update_event_color_id"),
                guestsCanInviteOthers: getAccvalue(
                    inputs,
                    "update_event_guestsCanInviteOthers"
                ),
                guestsCanModify: getAccvalue(
                    inputs,
                    "update_event_guestsCanModify"
                ),
                guestsCanSeeOtherGuests: getAccvalue(
                    inputs,
                    "update_event_guestsCanSeeOtherGuests"
                ),
                sendUpdates: getAccvalue(inputs, "update_event_sendUpdates"),
            };
        } else if (inputs.operation === "Create Event") {
            jsonToSend = {
                ...jsonToSend,
                calendarId: inputs.get_calendar_id,
                start: {
                    dateTime: inputs.create_event_start_dateTime,
                    timeZone: getAccvalue(inputs, "create_event_timezone"),
                },
                end: {
                    dateTime: inputs.create_event_end_dateTime,
                    timeZone: getAccvalue(inputs, "create_event_timezone"),
                },
                summary: getAccvalue(inputs, "create_event_summary"),
                visibility: getAccvalue(inputs, "create_event_visibility"),
                description: getAccvalue(inputs, "create_event_description"),
                location: getAccvalue(inputs, "create_event_location"),
                maxAttendees: getAccvalue(inputs, "create_event_max_attendees"),
                attendees: { email: inputs.create_event_attendees },
                conferenceData: {
                    typeId: getAccvalue(inputs, "create_event_conferenceData"),
                },
                id: getAccvalue(inputs, "create_event_id"),
                colorId: getAccvalue(inputs, "create_event_color_id"),
                guestsCanInviteOthers: getAccvalue(
                    inputs,
                    "create_event_guestsCanInviteOthers"
                ),
                guestsCanModify: getAccvalue(
                    inputs,
                    "create_event_guestsCanModify"
                ),
                guestsCanSeeOtherGuests: getAccvalue(
                    inputs,
                    "create_event_guestsCanSeeOtherGuests"
                ),
                sendUpdates: getAccvalue(inputs, "create_event_sendUpdates"),
            };
        }
    } else if (inputs.type === "Calendar") {
        if (inputs.operation === "Get Calendar") {
            jsonToSend = {
                ...jsonToSend,
                calendarId: inputs.get_calendar_id,
            };
        }
    }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "googleCalendar",
            credential: inputs.cred,
            operation: inputs.operation,
            saveOutputAs: getOutputVariablesByNodeId(selectedNode.id),
        },
    };
    return {
        type: "AppIntegration",
        content: content,
        cred: inputs?.cred,
    };
}
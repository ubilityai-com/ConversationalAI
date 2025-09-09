import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};
    if (inputs.operation === "Create Meet") {
        jsonToSend = {
            calendar_id: inputs.calendarId,
            summary: getAccvalue(inputs, "summaryMeet"),
            description: getAccvalue(inputs, "descMeet"),
            start: {
                'dateTime': inputs.dTimeStart,
                timeZone: inputs.timeZone,
            },
            end: {
                'dateTime': inputs.dTimeEnd,
                timeZone: inputs.timeZone,
            },
            attendees: inputs.emails.map((field: any) => {
                return {
                    email: field.emailsAttendee,
                };
            })
        };
    }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "googleMeet",
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
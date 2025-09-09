import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};

    if (inputs.type === "Meeting") {
        if (inputs.operation === "Create Meeting") {
            jsonToSend = {
                topic: inputs.topicCreate,
                agenda: getAccvalue(inputs, "agenda"),
                duration: getAccvalue(inputs, "duration"),
                password: getAccvalue(inputs, "password"),
                schedule_for: getAccvalue(inputs, "scheduleFor"),
                start_time: getAccvalue(inputs, "startTime"),
                timezone: getAccvalue(inputs, "timezone"),
                type: getAccvalue(inputs, "typeCreate"),
                settings: {
                    audio: getAccvalue(inputs, "audioCreate"),
                    alternative_hosts: getAccvalue(inputs, "alternativeHosts"),
                    auto_recording: getAccvalue(inputs, "autoRecording"),
                    host_video: getAccvalue(inputs, "hostVideo"),
                    join_before_host: getAccvalue(inputs, "joinBeforeHost"),
                    mute_upon_entry: getAccvalue(inputs, "mutingUponEntry"),
                    participant_video: getAccvalue(inputs, "participantVideo"),
                    watermark: getAccvalue(inputs, "watermarkCreate"),
                    registration_type: getAccvalue(inputs, "registrationType"),
                },
            };
        } else if (inputs.operation === "Get Meeting") {
            jsonToSend = {
                ...jsonToSend,
                meetingId: inputs.meetingIdGet,
            };
            if (getAccvalue(inputs, "occurrenceIdGet")) {
                jsonToSend = {
                ...jsonToSend,
                occurrences: [
                    { occurrence_id: getAccvalue(inputs, "occurrenceIdGet") },
                ],
            };
            };
        } else if (inputs.operation === "List Meetings") {
            jsonToSend = {
                ...jsonToSend,
                page_size: inputs.limitGetMany,
                type: getAccvalue(inputs, "typeGetMany"),
            };
        } else if (inputs.operation === "Delete Meeting") {
            jsonToSend = {
                ...jsonToSend,
                meeting_id: inputs.meetingIdDelete,
            };
        } else if (inputs.operation === "Update Meeting") {
            jsonToSend = {
                meeting_id: inputs.meetingIdUpdate,
                topic: getAccvalue(inputs, "topicUpdate"),
                agenda: getAccvalue(inputs, "agendaUpdate"),
                duration: getAccvalue(inputs, "durationUpdate"),
                password: getAccvalue(inputs, "passwordUpdate"),
                schedule_for: getAccvalue(inputs, "scheduleForUpdate"),
                start_time: getAccvalue(inputs, "startTimeUpdate"),
                timezone: getAccvalue(inputs, "timezoneUpdate"),
                type: getAccvalue(inputs, "typeUpdate"),
                settings: {
                    audio: getAccvalue(inputs, "audioUpdate"),
                    alternative_hosts: getAccvalue(
                        inputs,
                        "alternativeHostsUpdate"
                    ),
                    auto_recording: getAccvalue(inputs, "autoRecordingUpdate"),
                    host_video: getAccvalue(inputs, "hostVideoUpdate"),
                    join_before_host: getAccvalue(inputs, "joinBeforeHostUpdate"),
                    mute_upon_entry: getAccvalue(inputs, "mutingUponEntryUpdate"),
                    participant_video: getAccvalue(
                        inputs,
                        "participantVideoUpdate"
                    ),
                    watermark: getAccvalue(inputs, "watermarkUpdate"),
                    registration_type: getAccvalue(
                        inputs,
                        "registrationTypeUpdate"
                    ),
                },
            };
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "zoom",
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
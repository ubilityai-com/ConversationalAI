import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};

    if (inputs.type === "Team") {
        if (inputs.operation === "Create Team") {
            jsonToSend = {
                displayName: inputs.nameCreate,
                'template@odata.bind': "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
                description: getAccvalue(inputs, "descCreate")
            };
        }
        else if (inputs.operation === "Get Many Teams") {
            jsonToSend = {
                ...jsonToSend,
            }
        }
    }
    else if (inputs.type === "Channel") {
        if (inputs.operation === "Get Channel") {
            jsonToSend = {
                team_id: inputs.teamGetChannel,
                channel_id: inputs.channelGetChannel,
            };
        }
        else if (inputs.operation === "Get Many Channels") {
            jsonToSend = {
                ...jsonToSend,
                team_id: inputs.teamGetManyChannels
            }
        } else if (inputs.operation === "Create Channel") {
            jsonToSend = {
                team_id: inputs.team_id_CreateChannel,
                displayName: inputs.displayName_CreateChannel,
                description: getAccvalue(inputs, "descirption_CreateChannel"),
                membershipType: getAccvalue(inputs, "membershipType_CreateChannel")
            };
        }
    }
    else if (inputs.type === "Chat Message") {
        if (inputs.operation === "Send Message") {
            jsonToSend = {
                team_id: inputs.teamSendMessage,
                channel_id: inputs.channelSendMessage,
                body: {
                    content: inputs.messageCreate
                }
            };
            if (inputs.messageType === "html") {
                jsonToSend = {
                    team_id: inputs.teamSendMessage,
                    channel_id: inputs.channelSendMessage,
                    body: {
                        contentType: inputs.messageType,
                        content: inputs.messageCreate
                    }
                }
            }
        } else if (inputs.operation === "Get ChatMessages") {
            jsonToSend = {
                team_id: inputs.team_id_GetChatMessages,
                channel_id: inputs.channel_id_GetChatMessages,
                message_id: inputs.message_id_GetChatMessages,
            };
        } else if (inputs.operation === "Get Many ChatMessages") {
            jsonToSend = {
                ...jsonToSend,
                team_id: inputs.team_id_GetManyChatMessages,
                channel_id: inputs.channel_id_GetManyChatMessages,
            }
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "microsoft_teams",
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
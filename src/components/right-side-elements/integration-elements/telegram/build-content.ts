import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};

    if (inputs.type === "Chat") {
        if (inputs.operation === "Get Chat") {
            jsonToSend = {
                chat_id: inputs.chatId_getChat,
            };
        }
    }
    else if (inputs.type === "Message") {
        if (inputs.operation === "Send Message") {
            jsonToSend = {
                chat_id: inputs.chatId_sendMessage,
                text: inputs.text_sendMessage,
                disable_notification: getAccvalue(inputs, "is_DisableNotification_sendMessage"),
                protect_content: getAccvalue(inputs, "is_ProtectContent_sendMessage"),
            }
        }

        else if (inputs.operation === "Delete Message") {
            jsonToSend = {
                ...jsonToSend,
                chat_id: inputs.chatId_deleteMessage,
                message_id: inputs.messageId_deleteMessage,
            }
        }
    }

    else if (inputs.type === "File") {
        if (inputs.operation === "Get File") {
            jsonToSend = {
                ...jsonToSend,
                file_id: inputs.fileId_getFile,
            }
        }
        else if (inputs.operation === "Send File") {
            jsonToSend = {
                ...jsonToSend,
                chat_id: inputs.chatId_sendFile,
                document: inputs.fileContent_sendFile,
                disable_notification: getAccvalue(inputs, "is_DisableNotification_sendFile"),
                protect_content: getAccvalue(inputs, "is_ProtectContent_sendFile"),
            }
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "telegram_software",
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
import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};
    if (inputs.type === "SMS") {
        if (inputs.operation === "Send SMS") {
          jsonToSend = {
            ...jsonToSend,
            From: inputs.From,
            To: inputs.TO,
            Body: inputs.Message,
          };
        }
      } else if (inputs.type === "Call") {
        if (inputs.operation === "Make Call") {
          jsonToSend = {
            ...jsonToSend,
            From: inputs.From,
            To: inputs.TO,
            Url: inputs.URL,
          };
        }
      }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "twilio",
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
import { getAccvalue } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};

    if (inputs.type === "Custom") {
        if (inputs.operation === "Custom Query") {
            jsonToSend = {
                ...jsonToSend,
                query: inputs.query,
            }
        }
    }

    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "postgres",
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
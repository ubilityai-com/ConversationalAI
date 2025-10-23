import { getAccvalue,isJsonString } from "../../../../lib/automation-utils";
import { getOutputVariablesByNodeId } from "../../../../lib/utils/variable-utils";

export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const inputs = rightSideData.json;

    let jsonToSend = {};
    if (inputs.type === "HTTP Request Method") {
        if (inputs.operation === "Graphql Post") {
          jsonToSend = {
            ...jsonToSend,
            url: inputs.Url,
            query: inputs.query,
            variables: isJsonString(inputs.variables)
              ? JSON.parse(inputs.variables)
              : {},
          };
        }
      }
    const content = {
        type: "data",
        data: {
            content_json: jsonToSend,
            app: "GraphQL",
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
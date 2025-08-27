import { extractCreds, getNextNodeId, stringifyAndExtractVariables } from "../../../../lib/utils";


export default function getContent(selectedNode: any, params: any) {
    const rightSideData = selectedNode.data.rightSideData
    const model = rightSideData.extras.model
    const { edges, nodes } = params
    const arr = rightSideData.json.requiredInputs || []

    const content = {
        type: "data",
        data: {
            inputs: { query: "" },
            model: require("../../../properties/contents/model")[model.type](selectedNode),
            chainMemory: {
                "type": "ConversationBufferMemory"
            },
            cred: extractCreds(selectedNode?.data.rightSideData.extras),
            requiredInputs: arr.length !== 0 ? Object.fromEntries(arr.map(({ name, description }: any) => [name, description])) : undefined,
        }
    }

    return {
        cred: extractCreds(selectedNode?.data.rightSideData.extras),
        type: "LC_REACT_AGENT",
        content: content,
        saveUserInputAs: rightSideData.save ? rightSideData.variableName : null,
        next: getNextNodeId(selectedNode.id, edges, nodes, null),
        usedVariables: stringifyAndExtractVariables(content)
    };
}

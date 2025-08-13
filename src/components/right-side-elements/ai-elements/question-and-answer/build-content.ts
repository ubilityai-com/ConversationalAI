import { getAccvalue } from "../../../../lib/automation-utils";
import { extractCreds, getNextNodeId, stringifyAndExtractVariables } from "../../../../lib/utils";


export default function getContent(selectedNode: any, params: any) {
    const rightSideData = selectedNode.data.rightSideData
    const model = rightSideData.extras.model
    const embedding = rightSideData.extras.embedding
    const vectorStore = rightSideData.extras.vectorStore

    const { edges, nodes } = params
    console.log({ rightSideData });

    const content = {
        type: "data",
        data: {
            inputs: {
                "query": rightSideData.json.question,
                "prompt": getAccvalue(rightSideData.json, "prompt")
            },
            model: require("../../../properties/contents/model")[model.type](selectedNode),
            cred: extractCreds(selectedNode?.data.rightSideData.extras),
            embedding: require("../../../properties/contents/embedding")[embedding.type](selectedNode),
            vectorStore: require("../../../properties/contents/vector-store")[vectorStore.type](selectedNode)
        }
    }
    return {
        cred: extractCreds(selectedNode?.data.rightSideData.extras),
        type: "LC_RAG",
        content: content,
        saveUserInputAs: null,
        next: getNextNodeId(selectedNode.id, edges, nodes, null),
        usedVariables: stringifyAndExtractVariables(content)
    };
}
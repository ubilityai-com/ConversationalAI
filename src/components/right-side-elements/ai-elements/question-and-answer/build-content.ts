import { getAccvalue } from "../../../../lib/automation-utils";
import { extractCreds } from "../../../../lib/utils";


export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData
    const model = rightSideData.extras.model
    const embedding = rightSideData.extras.embedding
    const vectorStore = rightSideData.extras.vectorStore

    const content = {
        type: "data",
        data: {
            inputs: {
                "query": getAccvalue(rightSideData.json, "question") || "",
                "prompt": getAccvalue(rightSideData.json, "prompt") || ""
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
    };
}
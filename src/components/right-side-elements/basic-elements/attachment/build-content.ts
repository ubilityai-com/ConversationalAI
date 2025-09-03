import { getNextNodeId, stringifyAndExtractVariables } from "../../../../lib/utils";
import { RightSideData } from "./attachment";

export default function getContent(node: { id: string, data: { rightSideData: RightSideData } }, params: any) {
    const data = node.data.rightSideData
    const content = {
        type: "data",
        data: {
            message: data.method === "receive" ? data.message : undefined,
            file: data.method === "send" ? data.fileContent : undefined
        }
    }

    return {
        type: "Attachement",
        content: content,
        next: getNextNodeId(node.id, params.edges, params.nodes, null),
        saveUserInputAs: data.method === "receive" ? data.variableName : null,
        usedVariables: stringifyAndExtractVariables(content),
    };
}

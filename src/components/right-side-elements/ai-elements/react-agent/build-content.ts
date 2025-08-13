import { getAccvalue } from "../../../../lib/automation-utils";
import { extractCreds, getNextNodeId, stringifyAndExtractVariables } from "../../../../lib/utils";


export default function getContent(selectedNode: any, params: any) {
    const rightSideData = selectedNode.data.rightSideData
    const model = rightSideData.extras.model
    const memory = rightSideData.extras.memory
    const tool = rightSideData.extras.tool
    const { edges, nodes } = params
    const content = {
        type: "data",
        data: {
            inputs: { query: rightSideData.json.query, prompt: getAccvalue(rightSideData.json, "prompt") },
            model: require("../../../properties/contents/model")[model.type](selectedNode),
            chainMemory: require("../../../properties/contents/memory")[memory.type](selectedNode),
            cred: extractCreds(selectedNode?.data.rightSideData.extras),
            tools: tool.list.map((el: any) => {
                return require("../../../properties/contents/tool")[el.type](el.content)
            })
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

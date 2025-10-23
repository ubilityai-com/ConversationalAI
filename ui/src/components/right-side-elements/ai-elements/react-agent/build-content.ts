import { getAccvalue } from "../../../../lib/automation-utils";
import { extractCreds } from "../../../../lib/utils/utils";


export default function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData
    const model = rightSideData.extras.model
    const tool = rightSideData.extras.tool
    const toolConfigs = tool.list.length !== 0
        ? tool.list.map((el: any) => {
            return require("../../../properties/contents/tool")[el.type](el.content);
        })
        : [];

    const selectedTools = [
        ...new Set(
            tool.list
                .filter((t: any) => t.type === "McpTool" && t.content?.json?.selectedTools)
                .flatMap((t: any) => t.content.json.selectedTools.map((st: any) => st.value))
        )
    ];
    const content = {
        type: "data",
        data: {
            inputs: { query: getAccvalue(rightSideData.json, "query") ?? "", prompt: getAccvalue(rightSideData.json, "prompt") },
            model: require("../../../properties/contents/model")[model.type](selectedNode),
            cred: extractCreds(selectedNode?.data.rightSideData.extras),
            tools: toolConfigs.length > 0 || selectedTools.length > 0 ?
                {
                    ...(toolConfigs.length > 0 && { toolConfigs }),
                    ...(selectedTools.length > 0 && { selectedTools }),
                } : undefined
        }
    }

    return {
        cred: extractCreds(selectedNode?.data.rightSideData.extras),
        type: "LC_REACT_AGENT",
        content: content,
    };
}

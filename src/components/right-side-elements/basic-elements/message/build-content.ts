import { stringifyAndExtractVariables } from "../../../../lib/utils";
import { RightSideData } from "./message";

export default function getContent(node: {data:{rightSideData:RightSideData}}, params: any) {    
    const data=node.data.rightSideData
    
    const content = {
      type: "data",
      data: {
        text: data.botSays,
      },
    };
    return {
      type: "Message",
      content: content,
      // next: getNextNodeId(selectedNodeId, params.edges, params.nodes, null),
      saveUserInputAs: data.save ? data.variableName : null,
      usedVariables: stringifyAndExtractVariables(content),
    };
  }
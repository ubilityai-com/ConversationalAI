import { getNextNodeId, stringifyAndExtractVariables } from "../../../../lib/utils/utils";
import { RightSideData } from "./router";

export default function getContent(selectedNode: any, params: any) {
    const rightSideData: RightSideData = selectedNode.data.rightSideData
    const { edges, nodes } = params
    const content = {
      type: "data",
      data: {
        conditions: [
          { default: getNextNodeId(selectedNode.id, edges, nodes, "branch-default") },
          ...rightSideData.branches?.map((el) => ({
            operation: el.checkType,
            dataType: el.operatorType,
            firstOperator: el.firstOperator,
            secondOperator: el.secondOperator,
            next: getNextNodeId(selectedNode.id, edges, nodes, el.id),
          }))],
      },
    }
    return {
      type: "Router",
      content: content,
      next: getNextNodeId(selectedNode.id, edges, nodes, "branch-default"),
      saveUserInputAs: rightSideData.save ? rightSideData.variableName : null,
      usedVariables: stringifyAndExtractVariables(content)
    };
  }
  
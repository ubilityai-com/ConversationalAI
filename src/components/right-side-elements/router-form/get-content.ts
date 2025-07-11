import { Edge, Node } from "@xyflow/react";
import { getNextNodeId } from "../../../lib/utils";
import { RouterBranch, RouterDefaultBranch } from "../../nodes/router-node";

interface RightSideData {
    branches: RouterBranch[];
    defaultBranch: RouterDefaultBranch;
    save: boolean;
    variableName: string;
    loopFromSwitch: boolean;
    loopFromName: string;
}


export default function getContent(
    selectedNode: any,
    edges: Edge[],
    nodes: Node[]
): Record<string, unknown> {
    const rightSideData: RightSideData = selectedNode.data.rightSideData;
    return {
        content: {
            type: "data",
            data: {
                conditions: [
                    { default: getNextNodeId(selectedNode.id, edges, nodes, "branch-default") },
                    ...rightSideData.branches?.map((el) => ({
                        operation: el.checkType,
                        dataType: el.operatorType,
                        firstOperator: el.operatorType === "number" ? parseFloat(el.firstOperator) : el.firstOperator,
                        secondOperator: el.operatorType === "number" ? parseFloat(el.secondOperator) : el.secondOperator,
                        next: getNextNodeId(selectedNode.id, edges, nodes, el.id),
                    }))],
            },
        },
    };
}

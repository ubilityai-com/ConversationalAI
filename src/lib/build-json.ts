import { Edge, Node } from "@xyflow/react";
import { useFlowStore } from "../store/flow-store";
import { camelToDashCase, getNextNodeId } from "./utils";

interface Flow {
    credentials: any[];
    bot: Record<string, any>;
}

export function createFlowObject(): Flow {
    const { nodes, edges } = useFlowStore.getState() as {
        nodes: Node[];
        edges: Edge[];
    };

    let flow: Flow = {
        credentials: [],
        bot: {},
    };

    nodes.forEach((element: any) => {
        if (element.type === "Handler") {
            const { greet, cancel, start } = element.data.rightSideData;
            flow.bot.firstElementId = {
                next: getNextNodeId(element.id, edges, nodes, null),
                start: !start,
                greet,
                cancel,
            };
        } else {
            const result = require(`../components/right-side-elements/${camelToDashCase(element.type)}-form/${camelToDashCase(element.type)}-form`).getContent(
                element,
                { edges, nodes }
            );

            if (result.multiple) {
                result.data.forEach((item: { id: string; value: any }) => {
                    flow.bot[item.id] = item.value;
                });
            } else {
                flow.bot[element.id] = result;
            }
        }
    });

    return flow;
}

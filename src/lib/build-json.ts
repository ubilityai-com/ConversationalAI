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

    const flow: Flow = {
        credentials: [],
        bot: {},
    };

    nodes.forEach((element: Node & { data: any }) => {
        console.log({ element });

        if (element.type === "Handler") {
            const { greet, cancel, start } = element.data.rightSideData;
            flow.bot.firstElementId = {
                next: getNextNodeId(element.id, edges, nodes, null),
                start: !start,
                greet,
                cancel,
            };
        } else {

            const result = require(`../components/right-side-elements/${element.data.nodeType as string}-elements/${camelToDashCase(element.type as string)}-form/${camelToDashCase(element.type as string)}-form`).getContent(
                element,
                { edges, nodes }
            );

            // Collect `cred` if exists, then remove it
            if (result.cred) {
                if (Array.isArray(result.cred)) {
                    flow.credentials.push(...result.cred);
                } else {
                    flow.credentials.push(result.cred);
                }
                delete result.cred;
            }

            if (result.multiple) {
                result.data.forEach((item: { id: string; value: any }) => {
                    // Also check and collect `cred` from each item if present
                    if (item.value?.cred) {
                        if (Array.isArray(item.value.cred)) {
                            flow.credentials.push(...item.value.cred);
                        } else {
                            flow.credentials.push(item.value.cred);
                        }
                        delete item.value.cred;
                    }
                    flow.bot[item.id] = item.value;
                });
            } else {
                flow.bot[element.id] = result;
            }
        }
    });

    return flow;
}

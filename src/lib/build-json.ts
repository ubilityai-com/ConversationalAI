import { Node } from "@xyflow/react";
import { useFlowStore } from "../store/flow-store";
import { ConstantVariable } from "../store/variables-store";
import { camelToDashCase, getNextNodeId, stringifyAndExtractVariables } from "./utils";

interface Flow {
    credentials: any[];
    constant_variables: ConstantVariable
    bot: Record<string, any>;
}

export function createFlowObject(): Flow {
    const { nodes, edges, constantVariables } = useFlowStore.getState()

    const flow: Flow = {
        credentials: [],
        constant_variables: constantVariables,
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

            const selectedNodeModule = require(`../components/right-side-elements/${camelToDashCase(element.data.category as string)}-elements/${camelToDashCase(element.type as string)}/build-content.ts`).default
            const result = selectedNodeModule(element,
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
                if (result.type === "AppIntegration" || element.data.category === "automationTools") {
                    flow.bot[element.id] = {
                        ...result,
                        saveUserInputAs: null,
                        next: getNextNodeId(element.id, edges, nodes, null),
                        usedVariables: stringifyAndExtractVariables(result.content),
                    }
                } else
                    flow.bot[element.id] = result;
            }
        }
    });
    flow.credentials = [...new Set(flow.credentials)]
    return flow;
}

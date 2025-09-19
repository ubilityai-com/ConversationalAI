import { Node } from "@xyflow/react";
import { useFilesStore } from "../store/files-store";
import { useFlowStore } from "../store/flow-store";
import { ConstantVariable } from "../store/variables-store";
import { camelToDashCase, getNextNodeId, reverseObject, stringifyAndExtractVariables } from "./utils";
import { getOutputVariablesByNodeId } from "./variable-utils";
type State = {
    scenarios: [...string[], "Other"];
} & { [key: Exclude<string, "scenarios">]: string };
interface Flow {
    credentials: any[];
    constant_variables: ConstantVariable
    bot: Record<string, any>;
    state: State | null
}

export function createFlowObject(): Flow {
    const { nodes, edges, constantVariables, nodeStates } = useFlowStore.getState()
    const { files: filesList } = useFilesStore.getState()
    const files = filesList.reduce((acc: ConstantVariable, file) => {
        acc[file.file_name] = file.file_name;
        return acc;
    }, {});
    const state = Object.keys(nodeStates).length === 0 ?
        null
        : { scenarios: [...Object.values(nodeStates), "Other"], ...reverseObject(nodeStates) } as State
    const flow: Flow = {
        credentials: [],
        constant_variables: Object.assign({}, constantVariables, files),
        state,
        bot: {},
    };

    nodes.forEach((element: Node & { data: any }) => {

        if (element.type === "Handler") {
            const { greet, cancel, start, variableName, save } = element.data.rightSideData;
            flow.bot.firstElementId = {
                next: getNextNodeId(element.id, edges, nodes, null),
                start: !start,
                greet,
                cancel,
                saveUserInputAs: start && save ? variableName : null,
            };
        }
        else if (element.type === "StickyNote") {
            return
        }
        else {

            const selectedNodeModule = require(`../components/right-side-elements/${camelToDashCase(element.data.category as string)}-elements/${camelToDashCase(element.type as string)}/build-content.ts`).default
            const result = selectedNodeModule(element,
                { edges, nodes }
            );


            if (result.multiple) {
                const nodeCred = result.data[element.id]?.cred
                if (nodeCred) {
                    if (Array.isArray(nodeCred)) {
                        flow.credentials.push(...nodeCred);
                    } else {
                        flow.credentials.push(nodeCred);
                    }
                    delete result.data[element.id]?.cred;
                }
                Object.assign(flow.bot, result.data)
            } else {
                // Collect `cred` if exists, then remove it
                if (result.cred) {
                    if (Array.isArray(result.cred)) {
                        flow.credentials.push(...result.cred);
                    } else {
                        flow.credentials.push(result.cred);
                    }
                    delete result.cred;
                }
                if (element.data.category !== "basic") {
                    flow.bot[element.id] = {
                        ...result,
                        saveUserInputAs: null,
                        next: getNextNodeId(element.id, edges, nodes, null),
                        usedVariables: stringifyAndExtractVariables(result.content),
                    }
                    if (element.data.category === "ai")
                        flow.bot[element.id] = {
                            ...flow.bot[element.id],
                            saveOutputAs: getOutputVariablesByNodeId(element.id)
                        }
                } else
                    flow.bot[element.id] = result;
            }
        }
    });
    flow.credentials = [...new Set(flow.credentials)]
    return flow;
}

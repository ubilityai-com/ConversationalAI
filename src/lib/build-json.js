import { useFlowStore } from "../store/flow-store";
import { getNextNodeId, stringifyAndExtractVariables } from "./utils";

import getRouterContent from "../components/right-side-elements/router-form/get-content";
import getMessageContent from "../components/right-side-elements/message-form/get-content";
import getMultipleChoiceContent from "../components/right-side-elements/choice-prompt-form/get-content";

export function createFlowObject() {
    const { nodes, edges } = useFlowStore.getState();
    const endNode = nodes.find(el => el.type === "End")
    let flow = {
        credentials: [],
        bot: {},
    };

    const getContentMap = {
        Router: getRouterContent,
        Message: getMessageContent,
        ChoicePrompt: getMultipleChoiceContent
    };

    nodes.forEach((element) => {
        const getContent = getContentMap[element.type];
        let content = {};
        let saveUserInputAs;

        if (getContent) {
            // Only call getContent if it exists
            const result = getContent(element, edges, nodes);
            content = result.content;
            saveUserInputAs = result.saveUserInputAs;
        }

        if (element.type === "Handler") {
            const { greet, cancel, start } = element.data.rightSideData;
            flow.bot.firstElementId = {
                next: getNextNodeId(element.id, edges, nodes, null),
                start: !start,
                greet,
                cancel,
            };
        } else if (element.type === "Message") {
            flow.bot[element.id] = {
                type: "Message",
                content,
                saveUserInputAs,
                next: getNextNodeId(element.id, edges, nodes, null),
                usedVariables: stringifyAndExtractVariables(content),
            };
        } else if (element.type === "Router") {
            flow.bot[element.id] = {
                type: "Router",
                content,
                next: getNextNodeId(element.id, edges, nodes, "branch-default"),
            };

        }
        else if (element.type === "ChoicePrompt") {
            const { choices } = element.data.rightSideData
            flow.bot[element.id] = {
                type: "MultipleChoice",
                content,
                next: element.id + "-handler",
                saveUserInputAs,
                usedVariables: stringifyAndExtractVariables(content),
            };
            flow.bot[`${element.id}-handler`] = {
                type: "Handler",
                usedVariables: saveUserInputAs ? [saveUserInputAs] : [element.id + "-var"],
                saveUserInputAs: null,
                content: {
                    type: "data",
                    data: {
                        cases: {
                            other: getNextNodeId(element.id, edges, nodes, "choice-default"),
                            ...choices?.reduce((acc, elt) => {
                                acc[elt.label] = getNextNodeId(element.id, edges, nodes, elt.id);
                                return acc;
                            }, {})
                        }
                    }
                }
            }

        }
        else {
            console.warn(`No handling defined for type: ${element.type}`);
        }
    });
    console.log({ flow });

    return flow;
}

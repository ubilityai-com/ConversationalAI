import { getNextNodeId, stringifyAndExtractVariables } from "../../../../lib/utils";
import { RightSideData } from "./choice-prompt";

export default function getContent(selectedNode: any, params: any) {
    const rightSideData: RightSideData = selectedNode.data.rightSideData
    const { edges, nodes } = params
    const content = {
        type: "data",
        data: {
            choices: rightSideData.choices.map(el => el.label),
            message: rightSideData.botSays
        }
    }
    const saveUserInputAs = rightSideData.save ? rightSideData.variableName : selectedNode.id + "-var";
    const choicePromptObj = {
        type: "MultipleChoice",
        content: content,
        next: selectedNode.id + "-handler",
        saveUserInputAs,
        usedVariables: stringifyAndExtractVariables(content)
    };
    const { choices } = selectedNode.data.rightSideData
    const handlerCases = {
        Other: getNextNodeId(selectedNode.id, edges, nodes, "choice-default"),
        ...choices?.reduce((acc: Record<string, string | null>, elt: any) => {
            acc[elt.label] = getNextNodeId(selectedNode.id, edges, nodes, elt.id);
            return acc;
        }, {})
    };
    const handlerObj = {
        type: "Handler",
        usedVariables: [saveUserInputAs],
        saveUserInputAs: null,
        content: {
            type: "data",
            data: {
                cases: handlerCases
            }
        }
    };
    return {
        multiple: true,
        data: {
            [`${selectedNode.id}`]: choicePromptObj,
            [`${selectedNode.id}-handler`]: handlerObj
        }
    };
}
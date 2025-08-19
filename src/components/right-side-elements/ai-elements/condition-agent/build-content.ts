import { extractCreds, getNextNodeId, stringifyAndExtractVariables } from "../../../../lib/utils";

export default function getContent(selectedNode: any, params: any) {
    const rightSideData = selectedNode.data.rightSideData;
    const model = rightSideData.extras.model;

    const { edges, nodes } = params;
    const content = {
        type: "data",
        data: {
            inputs: {
                scenarios: rightSideData.scenarios.map((el: any) => el.label),
                input: rightSideData.input,
                instruction: rightSideData.instruction,
            },
            model: require("../../../properties/contents/model")[model.type](
                selectedNode
            ),
            params: { stream: false },
        },
        credentials: extractCreds(selectedNode?.data.rightSideData.extras),
    };
    // const saveUserInputAs = rightSideData.save ? rightSideData.variableName : selectedNode.id + "-var";
    const conditionAgentObj = {
        type: "LC_CONDITION_AGENT",
        content: content,
        next: selectedNode.id + "-handler",
        saveUserInputAs: null,
        usedVariables: stringifyAndExtractVariables(content),
        saveOutputAs: [{ name: selectedNode.id + "-var", path: ".output" }],
        cred: extractCreds(selectedNode?.data.rightSideData.extras),
    };
    const { scenarios } = selectedNode.data.rightSideData;
    const handlerCases = {
        Other: getNextNodeId(
            selectedNode.id,
            edges,
            nodes,
            "condition-agent-default"
        ),
        ...scenarios?.reduce((acc: Record<string, string | null>, elt: any) => {
            acc[elt.label] = getNextNodeId(selectedNode.id, edges, nodes, elt.id);
            return acc;
        }, {}),
    };
    const handlerObj = {
        type: "Handler",
        usedVariables: [selectedNode.id + "-var"],
        saveUserInputAs: null,
        content: {
            type: "data",
            data: {
                cases: handlerCases,
            },
        },
    };
    return {
        multiple: true,
        data: {
            [`${selectedNode.id}`]: conditionAgentObj,
            [`${selectedNode.id}-handler`]: handlerObj
        }
    };
}
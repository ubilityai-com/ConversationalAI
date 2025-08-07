import { Node, NodeProps } from "@xyflow/react";
import { useState } from "react";
import { QuestionAndAnswerJson } from "../../../../elements/ai-elements/QuestionAndAnswerJson";
import { useDebounceConfig } from "../../../../hooks/use-debounced-config";
import { extractCreds, getNextNodeId, stringifyAndExtractVariables } from "../../../../lib/utils";
import { useFlowStore } from "../../../../store/flow-store";
import { useRightDrawerStore } from "../../../../store/right-drawer-store";
import AutomationSimple from "../../../custom/automation-v4";
import { DynamicElementLoader } from "../../../properties/shared/DynamicElementLoader";
function isExtrasValid(extras: any, values: Record<string, boolean> = {}) {
    for (const key in extras) {
        const item = extras[key];

        if (!item.enabled) continue;

        const isRequired = !item.optional;

        if (!isRequired && !item.enabled) continue;

        if (item.multiple) {
            const list = item.list || [];
            if (isRequired && list.length === 0)
                return false
            for (const subItem of list) {
                const id = subItem.id;
                if (!values[id]) {
                    return false;
                }
            }
        } else {
            if (!values[key]) {
                return false;
            }
        }
    }

    return true;
}

interface LLMConfigProps extends Record<string, any> {
    label: string;
    description: string;
    defaults: Record<string, any>;
}
interface LlmFormProps {
    selectedNode: NodeProps<Node<LLMConfigProps>>;
    handleRightSideDataUpdate: (value: any) => void;
}
const getAccvalue = (finaleObj: any, name: string) => {
    if (name.includes(".")) {
        const properties = name.split(".");
        const firstPart = properties[0];
        const secondPart = properties[1];
        return finaleObj[firstPart]
            ? finaleObj[firstPart][secondPart]
                ? finaleObj[firstPart][secondPart] || undefined
                : undefined
            : undefined;
    } else
        return finaleObj[name] ? finaleObj[name][name] || undefined : undefined;
};

export function getContent(selectedNode: any, params: any) {
    const rightSideData = selectedNode.data.rightSideData
    const model = rightSideData.extras.model
    const embedding = rightSideData.extras.embedding
    const vectorStore = rightSideData.extras.vectorStore

    const { edges, nodes } = params
    console.log({ rightSideData });

    const content = {
        type: "data",
        data: {
            inputs: {
                "query": rightSideData.json.question,
                "prompt": getAccvalue(rightSideData.json,"prompt")
            },
            model: require("../../../properties/contents/model")[model.type](selectedNode),
            cred: extractCreds(selectedNode?.data.rightSideData.extras),
            embedding: require("../../../properties/contents/embedding")[embedding.type](selectedNode),
            vectorStore: require("../../../properties/contents/vector-store")[vectorStore.type](selectedNode)
        }
    }
    return {
        cred: extractCreds(selectedNode?.data.rightSideData.extras),
        type: "LC_RAG",
        content: content,
        saveUserInputAs: null,
        next: getNextNodeId(selectedNode.id, edges, nodes, null),
        usedVariables: stringifyAndExtractVariables(content)
    };
}

export default function ConversationalRetrievalQaChainForm({
    selectedNode,
    handleRightSideDataUpdate,
}: LlmFormProps) {
    const [schema, setSchema] = useState<any[]>(QuestionAndAnswerJson.defaults.json
    );
    const updateNodesValidationById = useFlowStore(state => state.updateNodesValidationById)


    const { localConfig, updateNestedConfig } =
        useDebounceConfig<LLMConfigProps["defaults"]>(
            selectedNode.data.rightSideData,
            {
                delay: 300,
                onSave: (savedConfig) => {
                    // Save label changes
                    const nodeValid = useRightDrawerStore.getState().automation.validation[selectedNode.id].json
                    const subNodesValidation = useFlowStore.getState().subNodesValidation
                    const subs = subNodesValidation[selectedNode.id]?.subs

                    updateNodesValidationById(selectedNode.id, nodeValid && isExtrasValid(savedConfig.extras, subs))
                    handleRightSideDataUpdate(savedConfig);
                },
            }
        );
    const extras = localConfig.extras || {}


    return (
        <div className="space-y-6">
            <AutomationSimple
                filledDataName="json"
                schema={schema}
                firstCall
                fieldValues={localConfig.json}
                setSchema={setSchema}
                flowZoneSelectedId={selectedNode.id}
                onFieldChange={(partialState, replace) => {
                    if (replace) updateNestedConfig(`${"json"}`, partialState);
                    else
                        updateNestedConfig(`${"json"}`, {
                            ...localConfig.json,
                            ...partialState,
                        });
                }}
            />
            {Object.keys(extras).map(key => (
                <DynamicElementLoader
                    key={key}
                    extrasKey={key}
                    extrasConfig={extras[key]}
                    localConfig={localConfig.extras[key]}
                    selectedNodeId={selectedNode.id}
                    updateNestedConfig={updateNestedConfig}
                />
            ))}
        </div>
    );
}

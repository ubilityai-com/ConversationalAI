import { Node, NodeProps } from "@xyflow/react";
import { useState } from "react";
import { ReactAgentJson } from "../../../elements/langchain-elements/ReactAgentJson";
import { useDebounceConfig } from "../../../hooks/use-debounced-config";
import { getNextNodeId, stringifyAndExtractVariables } from "../../../lib/utils";
import { useFlowStore } from "../../../store/flow-store";
import { useRightDrawerStore } from "../../../store/right-drawer-store";
import AutomationSimple from "../../custom/automation-v4";
import { SharedSection } from "../../properties/shared/shared-section";
import { SharedListSection } from "../../properties/shared/shared-section-list";

interface LLMConfigProps extends Record<string, any> {
    label: string;
    description: string;
    rightSideData: Record<string, any>;
}
interface LlmFormProps {
    selectedNode: NodeProps<Node<LLMConfigProps>>;
    handleRightSideDataUpdate: (value: any) => void;
}
function extractCreds(obj: any): string[] {
    const creds: string[] = [];

    for (const key in obj) {
        const item = obj[key];

        if (item.multiple) {
            if (Array.isArray(item.list)) {
                item.list.forEach((listItem: any) => {
                    const cred = listItem?.content?.json?.cred;
                    if (cred) {
                        creds.push(cred);
                    }
                });
            }
        } else {
            const cred = item?.content?.cred;
            if (cred) {
                creds.push(cred);
            }
        }
    }

    return creds;
}
export function getContent(selectedNode: any, params: any) {
    const rightSideData = selectedNode.data.rightSideData
    const model = rightSideData.extras.model
    const memory = rightSideData.extras.memory
    const tool = rightSideData.extras.tool
    const { edges, nodes } = params
    const content = {
        type: "data",
        data: {
            inputs: { query: rightSideData.json.query },
            model: require("../../properties/contents/model")[model.type](selectedNode),
            chainMemory: require("../../properties/contents/memory")[memory.type](selectedNode),
            cred: extractCreds(selectedNode?.data.rightSideData.extras),
            paramsTools: tool.list.map((el: any) => {
                return require("../../properties/contents/tool")[el.type](el.content)
            })
        }
    }
    return {
        cred: extractCreds(selectedNode?.data.rightSideData.extras),
        type: "LC_REACT_AGENT",
        content: content,
        saveUserInputAs: rightSideData.save ? rightSideData.variableName : null,
        next: getNextNodeId(selectedNode.id, edges, nodes, null),
        usedVariables: stringifyAndExtractVariables(content)
    };
}

export default function ReactAgentForm({
    selectedNode,
    handleRightSideDataUpdate,
}: LlmFormProps) {
    const [schema, setSchema] = useState<any[]>(ReactAgentJson.rightSideData.json
    );
    const updateNodesValidationById = useFlowStore(state => state.updateNodesValidationById)

    console.log({ selectedNode });

    const { localConfig, updateNestedConfig } =
        useDebounceConfig<LLMConfigProps["rightSideData"]>(
            selectedNode.data.rightSideData,
            {
                delay: 300,
                onSave: (savedConfig) => {
                    // Save label changes   
                    const nodeValid = useRightDrawerStore.getState().automation.validation[selectedNode.id].json
                    const subNodesValidation = useFlowStore.getState().subNodesValidation
                    const subsValid = subNodesValidation[selectedNode.id]?.valid
                    updateNodesValidationById(selectedNode.id, nodeValid && subsValid)
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
                fieldValues={localConfig.json}
                setSchema={setSchema}
                flowZoneSelectedId={selectedNode.id}
                onFieldChange={({ path, value }) => {
                    console.log({ path, value });
                    updateNestedConfig(`${"json"}.${path}`, value)

                }}
            />
            {Object.keys(extras).map((key) => {
                if (extras[key].list) return <SharedListSection
                    defaultType={extras[key].type}
                    description={extras[key].description}
                    elements={extras[key].elements}
                    title={extras[key].title}
                    variableName={key}
                    config={localConfig.extras[key]}
                    id={selectedNode.id}
                    onConfigUpdate={updateNestedConfig}
                />
                else return <SharedSection
                    defaultType={extras[key].type}
                    description={extras[key].description}
                    elements={extras[key].elements}
                    title={extras[key].title}
                    variableName={key}
                    config={localConfig.extras[key]}
                    id={selectedNode.id}
                    onConfigUpdate={updateNestedConfig}
                />
            })}
        </div>
    );
}

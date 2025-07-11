"use client";

import { Node, NodeProps } from "@xyflow/react";
import { useEffect, useState } from "react";
import { ReactAgentJson } from "../../../elements/langchain-elements/ReactAgentJson";
import ModelsElements from "../../../elements/model-elements";
import { ToolsElements } from "../../../elements/tools-elements";
import { useDebounceConfig } from "../../../hooks/use-debounced-config";
import { useFlowStore } from "../../../store/flow-store";
import { useRightDrawerStore } from "../../../store/right-drawer-store";
import AutomationSimple from "../../custom/automation-v4";
import { SharedSection } from "../../properties/shared/shared-section";
import { SharedListSection } from "../../properties/shared/shared-section-list";
import { MemoryElements } from "../../../elements/memory-elements";

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

        // skip if not enabled
        if (!item?.enabled) continue;

        if (item.multiple) {
            if (Array.isArray(item.list)) {
                item.list.forEach((listItem: any) => {
                    const cred = listItem?.content?.cred;
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
export function getContent(selectedNode: any) {
    const rightSideData = selectedNode.data.rightSideData
    const model = rightSideData.extras.model
    const memory = rightSideData.extras.memory
    const tool = rightSideData.extras.tool

    return {
        content: {
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
        },
        saveUserInputAs: rightSideData.save ? rightSideData.variableName : null
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

            <SharedSection
                config={localConfig.extras.model}
                defaultType="OpenAIChatModel"
                description="Select the model that fits your use case"
                elements={ModelsElements}
                id={selectedNode.id}
                title="LLM Model"
                variableName="model"
                onConfigUpdate={updateNestedConfig} />
            <SharedSection
                config={localConfig.extras.memory}
                defaultType="ConversationalBufferMemory"
                description="Select the memory that fits your use case"
                elements={MemoryElements}
                id={selectedNode.id}
                title="Memory"
                variableName="memory"
                onConfigUpdate={updateNestedConfig} />
            <SharedListSection
                defaultType="Calculator"
                description="Configure tools for the LLM agent to use"
                elements={ToolsElements}
                title="Tools"
                variableName="tool"
                config={localConfig.extras.tool}
                id={selectedNode.id}
                onConfigUpdate={updateNestedConfig}
            />

        </div>
    );
}

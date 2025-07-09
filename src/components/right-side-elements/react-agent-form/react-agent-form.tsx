"use client";

import { Node, NodeProps } from "@xyflow/react";
import { useState } from "react";
import { ReactAgentJson } from "../../../elements/langchain-elements/ReactAgentJson";
import ModelsElements from "../../../elements/model-elements";
import { ToolsElements } from "../../../elements/tools-elements";
import { useDebounceConfig } from "../../../hooks/use-debounced-config";
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

export default function ReactAgentForm({
    selectedNode,
    handleRightSideDataUpdate,
}: LlmFormProps) {
    const [schema, setSchema] = useState<any[]>(ReactAgentJson.rightSideData.json
    );
    const updateNodesValidationById = useFlowStore(state => state.updateNodesValidationById)


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

            <SharedListSection
                defaultType="CustomTool"
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

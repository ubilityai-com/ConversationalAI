"use client";

import { Node, NodeProps } from "@xyflow/react";
import { useState } from "react";
import { BasicLLMJson } from "../../../elements/langchain-elements/BasicLLMJson";
import ModelsElements from "../../../elements/model-elements";
import { useDebounceConfig } from "../../../hooks/use-debounced-config";
import AutomationSimple from "../../custom/automation-v4";
import { OutputParserSection } from "../../properties/shared/output-parser-section";
import { SharedSection } from "../../properties/shared/shared-section";

interface LLMConfigProps extends Record<string, any> {
  label: string;
  description: string;
  rightSideData: Record<string, any>;
}
interface LlmFormProps {
  selectedNode: NodeProps<Node<LLMConfigProps>>;
  handleRightSideDataUpdate: (value: any) => void;
}

export default function LlmForm({
  selectedNode,
  handleRightSideDataUpdate,
}: LlmFormProps) {
  const [schema, setSchema] = useState<any[]>(BasicLLMJson.defaults.json
  );
  const { localConfig, updateNestedConfig } =
    useDebounceConfig<LLMConfigProps["rightSideData"]>(
      selectedNode.data.rightSideData,
      {
        delay: 300,
        onSave: (savedConfig) => {
          // Save label changes
          console.log({ savedConfig });

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


      <OutputParserSection
        config={localConfig.extras.outputParser}
        onConfigUpdate={updateNestedConfig}
        id={selectedNode.id}
      />
      <SharedSection
        config={localConfig.extras.model}
        defaultType="OpenAIModel"
        description="Select the model that fits your use case"
        elements={ModelsElements}
        id={selectedNode.id}
        title="LLM Model"
        variableName="model"
        onConfigUpdate={updateNestedConfig} />

    </div>
  );
}

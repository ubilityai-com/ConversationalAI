"use client";

import { Node, NodeProps } from "@xyflow/react";
import { useDebounceConfig } from "../../../hooks/use-debounced-config";
import { OutputParserSection } from "../../properties/shared/output-parser-section";
import { useFlowStore } from "../../../store/flow-store";
import { useRightDrawerStore } from "../../../store/right-drawer-store";
import { ToolsSection } from "../../properties/shared/tools-section";

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
  const data = selectedNode.data;
  const s = useRightDrawerStore((state) => state);
  console.log({ s });

  const { localConfig, updateConfigField, updateNestedConfig } =
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
  const handleDynamicUpdate = (
    key: string,
    dynamicValue: string | undefined
  ) => {
    handleRightSideDataUpdate(dynamicValue);
  };
  console.log({ selectedNode, localConfig });

  return (
    <div className="space-y-6">
      <OutputParserSection
        config={localConfig}
        onConfigUpdate={updateNestedConfig}
        id={selectedNode.id}
      />
      <ToolsSection
        config={localConfig}
        onConfigUpdate={updateNestedConfig}
        id={selectedNode.id}
      />
    </div>
  );
}

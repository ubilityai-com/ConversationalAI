import { Node, NodeProps } from "@xyflow/react";
import { useState } from "react";
import { ConditionAgentJson } from "../../../elements/langchain-elements/ConditionAgentJson";
import { useDebounceConfig } from "../../../hooks/use-debounced-config";
import {
  extractCreds,
  getNextNodeId,
  stringifyAndExtractVariables,
} from "../../../lib/utils";
import { useFlowStore } from "../../../store/flow-store";
import { useRightDrawerStore } from "../../../store/right-drawer-store";
import AutomationSimple from "../../custom/automation-v4";
import { SharedSection } from "../../properties/shared/shared-section";
import { SharedListSection } from "../../properties/shared/shared-section-list";
import { objToReturnDynamicv2 } from "../../../lib/automation-utils";
import { Label } from "../../ui/label";
import { LoopFromForm } from "../../common/loop-from-end";
import { EditableField } from "../../custom/editable-field";
import { Switch } from "../../ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { ListChecks, Plus, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import ModelsElements from "../../../elements/model-elements";
import { ToolsElements } from "../../../elements/tools-elements";
import { MemoryElements } from "../../../elements/memory-elements";
import { DynamicElementLoader } from "../../properties/shared/DynamicElementLoader";

interface Scenario {
  id: string;
  label: string;
}
interface Choice {
  id: string;
  label: string;
}
interface RightSideData {
  extras: any;
  scenarios: Scenario[];
  instruction: string;
  input: string;
  save: boolean;
  variableName: string;
  loopFromSwitch: boolean;
  loopFromName: string;
}
interface LLMConfigProps extends Record<string, any> {
  label: string;
  description: string;
  rightSideData: RightSideData;
}

interface LlmFormProps {
  selectedNode: NodeProps<Node<LLMConfigProps>>;
  handleRightSideDataUpdate: (value: any) => void;
}

export function getContent(selectedNode: any, params: any) {
  const rightSideData = selectedNode.data.rightSideData;
  const model = rightSideData.extras.model;
  console.log({ rightSideData });

  const { edges, nodes } = params;
  const content = {
    type: "data",
    data: {
      inputs: {
        scenarios: rightSideData.scenarios.map((el: any) => el.label),
        input: rightSideData.input,
        instruction: rightSideData.instruction,
      },
      model: require("../../properties/contents/model")[model.type](
        selectedNode
      ),
      params: { stream: false },
    },
    credentials: extractCreds(selectedNode?.data.rightSideData.extras),
  };
  // const saveUserInputAs = rightSideData.save ? rightSideData.variableName : selectedNode.id + "-var";
  const conditionAgtentObj = {
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
    type: "MC_Handler",
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
    data: [
      { id: selectedNode.id, value: conditionAgtentObj },
      { id: `${selectedNode.id}-handler`, value: handlerObj },
    ],
  };
}
function checkIfAllRequiredDataIsFilled(data: RightSideData): boolean {
  if (!data) return false;

  if (!(data.input || "").trim()) {
    return false;
  }

  for (const item of data.scenarios) {
    if (!item.label || item.label.trim() === "") {
      return false;
    }
  }

  // Check variableName if save is true
  if (data.save && !data.variableName) {
    return false;
  }

  return true;
}
export default function ConditionAgentForm({
  selectedNode,
  handleRightSideDataUpdate,
}: LlmFormProps) {
  const updateNodesValidationById = useFlowStore(
    (state) => state.updateNodesValidationById
  );
  const updateVariable = useFlowStore((state) => state.updateVariable);
  const addVariable = useFlowStore((state) => state.addVariable);

  const { localConfig, updateNestedConfig } = useDebounceConfig<
    LLMConfigProps["rightSideData"]
  >(selectedNode.data.rightSideData, {
    delay: 300,
    onSave: (savedConfig) => {
      // Save label changes
      const subNodesValidation = useFlowStore.getState().subNodesValidation;
      const subsValid = subNodesValidation[selectedNode.id]?.valid;
      updateNodesValidationById(
        selectedNode.id,
        checkIfAllRequiredDataIsFilled(savedConfig) && subsValid
      );
      console.log({
        selectedNode,
        aa: checkIfAllRequiredDataIsFilled(savedConfig) && subsValid,
        subNodesValidation,
      });
      handleRightSideDataUpdate(savedConfig);
    },
  });

  const extras = localConfig.extras || {};
  const scenarios: Scenario[] = localConfig.scenarios ?? [];
  const save = localConfig.save ?? "";
  const variableName = localConfig.variableName ?? "";
  const instruction = localConfig.instruction ?? "";
  const input = localConfig.input ?? "";
  const loopFromName = localConfig.loopFromName ?? "";
  const loopFromSwitch = localConfig.loopFromSwitch ?? false;
  const addScenario = () => {
    const newScenario: Scenario = {
      id: `scenario-${Date.now()}`,
      label: `scenario ${scenarios.length + 1}`,
    };
    updateNestedConfig("scenarios", [...scenarios, newScenario]);
  };

  const updateScenario = (scenarioId: string, updates: Partial<Scenario>) => {
    const updatedScenarios = scenarios.map((c) =>
      c.id === scenarioId ? { ...c, ...updates } : c
    );
    updateNestedConfig("scenarios", updatedScenarios);
  };

  const removeScenario = (scenarioId: string) => {
    const updatedScenarios = scenarios.filter((c) => c.id !== scenarioId);
    updateNestedConfig("scenarios", updatedScenarios);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label
          htmlFor={`instruction`}
          className="block text-sm mb-2 font-normal"
        >
          Instructions
        </Label>
        <Textarea
          id={`instruction`}
          placeholder="instructions"
          value={instruction || ""}
          onChange={(e) => updateNestedConfig("instruction", e.target.value)}
          className="text-xs resize-none"
          rows={2}
        />
      </div>
      <div>
        <Label htmlFor={`input`} className="block text-sm mb-2 font-normal">
          Input
        </Label>
        <Textarea
          id={`input`}
          placeholder="Input"
          value={input || ""}
          onChange={(e) => updateNestedConfig("input", e.target.value)}
          className="text-xs resize-none"
          rows={2}
        />
      </div>

      {/* ── dynamic scenarios list ─────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <ListChecks className="w-4 h-4 mr-2" />
            Scenarios&nbsp;
            <span className="text-muted-foreground">({scenarios.length})</span>
          </CardTitle>
          <CardDescription>
            Add options users can select. Every Scenario gets its own output
            handle.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {scenarios.length === 0 && (
            <p className="text-xs text-gray-500">
              No scenarios yet. Click “Add Scenario.
            </p>
          )}

          {scenarios.map((scenario, idx) => (
            <Card key={scenario.id} className="border border-gray-200">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">
                    Scenario {idx + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    onClick={() => {
                      if (scenarios.length > 1) {
                        removeScenario(scenario.id);
                      }
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>

                <div>
                  <Label htmlFor={`label-${scenario.id}`} className="text-xs">
                    Label
                  </Label>
                  <Input
                    id={`label-${scenario.id}`}
                    value={scenario.label}
                    onChange={(e) =>
                      updateScenario(scenario.id, { label: e.target.value })
                    }
                    className="h-8 text-xs"
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={addScenario}
            className="h-8 w-full"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Scenario
          </Button>
        </CardContent>
      </Card>
      {Object.keys(extras).map((key) => (
        <DynamicElementLoader
          key={key}
          extrasKey={key}
          extrasConfig={extras[key]}
          localConfig={localConfig.extras[key]}
          selectedNodeId={selectedNode.id}
          updateNestedConfig={updateNestedConfig}
        />
      ))}
      <div className="flex items-center space-x-2 mx-2 mb-2">
        <Switch
          checked={save || false}
          onCheckedChange={(checked) => {
            updateNestedConfig("save", checked);
            if (checked)
              addVariable({
                origin: selectedNode.id,
                category: "dialogue",
                name: "",
                type: "string",
                value: "",
              });
          }}
          id="save-switch"
        />
        <Label htmlFor="save-switch" className="text-xs font-normal">
          Save user's reply in a variable
        </Label>
      </div>
      {save && (
        <>
          <Label className="block text-sm p-1 mb-1 font-normal">
            Variable Name
          </Label>
          <EditableField
            name="variableName"
            placeholder="Variable Name"
            value={variableName || ""}
            onChange={(newValue) => {
              updateVariable("dialogue", variableName, {
                category: "dialogue",
                name: newValue,
              });
              updateNestedConfig("variableName", newValue);
            }}
          />
        </>
      )}

      <Label className="block text-sm p-1 mb-1 font-normal">
        Enable the bot to handle user messages.
      </Label>

      <LoopFromForm
        loopFromSwitch={loopFromSwitch}
        loopFromName={loopFromName}
        handleChange={updateNestedConfig}
      />
    </div>
  );
}

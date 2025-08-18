import { Node, NodeProps } from "@xyflow/react";
import { ListChecks, Plus, Trash2 } from "lucide-react";
import { useDebounceConfig } from "../../../../hooks/use-debounced-config";
import { useFlowStore } from "../../../../store/flow-store";
import { NodeConfigProps } from "../../../../types/automation-types";
import { FieldWrapper } from "../../../custom/field-wrapper";
import { DynamicElementLoader } from "../../../properties/shared/DynamicElementLoader";
import { Button } from "../../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Textarea } from "../../../ui/textarea";

interface Scenario {
  id: string;
  label: string;
}
interface RightSideData {
  extras: any;
  scenarios: Scenario[];
  instruction: string;
  input: string;
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
  return true;
}
export default function ConditionAgentForm({ content, onContentUpdate, selectedNodeId, validate }: NodeConfigProps<RightSideData>) {
  const updateNodesValidationById = useFlowStore(
    (state) => state.updateNodesValidationById
  );
  const { localConfig, updateNestedConfig } = useDebounceConfig<
    LLMConfigProps["rightSideData"]
  >(content, {
    delay: 300,
    onSave: (savedConfig) => {
      // Save label changes
      const subNodesValidation = useFlowStore.getState().subNodesValidation;
      const subsValid = subNodesValidation[selectedNodeId]?.valid;
      validate(
        checkIfAllRequiredDataIsFilled(savedConfig) && subsValid
      );
      onContentUpdate(savedConfig);
    },
  });

  const extras = localConfig.extras || {};
  const scenarios: Scenario[] = localConfig.scenarios ?? [];
  const instruction = localConfig.instruction ?? "";
  const input = localConfig.input ?? "";
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
        <FieldWrapper
          field={{ type: "textfield", placeholder: "Instructions", multiline: true }}
          value={instruction || ""}
          onChange={(value) => updateNestedConfig("instruction", value)}
          variableName={"instruction"}
          className="text-xs resize-none"

        >
          <Textarea
            id={`instruction`}
            placeholder="Instructions"
            value={instruction || ""}
            onChange={(e) => updateNestedConfig("instruction", e.target.value)}
            className="text-xs resize-none"
            rows={2}
          />
        </FieldWrapper>
      </div>
      <div>
        <Label htmlFor={`input`} className="block text-sm mb-2 font-normal">
          Input
        </Label>
        <FieldWrapper
          field={{ type: "textfield", placeholder: "Input", multiline: true }}
          value={input || ""}
          onChange={(value) => updateNestedConfig("input", value)}
          variableName={"input"}
          className="text-xs resize-none"
        >
          <Textarea
            id={`input`}
            placeholder="Input"
            value={input || ""}
            onChange={(e) => updateNestedConfig("input", e.target.value)}
            className="text-xs resize-none"
            rows={2}
          />
        </FieldWrapper>
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
                  <FieldWrapper
                    field={{ type: "textfield", placeholder: "" }}
                    value={scenario.label}
                    onChange={(value) => updateScenario(scenario.id, { label: value })
                    }
                    variableName={`label-${scenario.id}`}
                    className="h-8 text-xs"
                  >
                    <Input
                      id={`label-${scenario.id}`}
                      value={scenario.label}
                      onChange={(e) =>
                        updateScenario(scenario.id, { label: e.target.value })
                      }
                      className="h-8 text-xs"
                    />
                  </FieldWrapper>
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
          selectedNodeId={selectedNodeId}
          updateNestedConfig={updateNestedConfig}
        />
      ))}
    </div>
  );
}

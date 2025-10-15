import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { VariableNameField } from "./variable-name-field";
import { useFlowStore } from "../../store/flow-store";

interface ToggleVariableFieldProps {
    checked: boolean;
    variableName: string;
    onVariableNameChange: (value: string) => void;
    updateNestedConfig: (key: string, value: any) => void;
    switchId: string;
    switchLabel: string;
    configKey: string;
    selectedNodeId: string;
}

export function ToggleVariableField({
    checked,
    variableName,
    onVariableNameChange,
    updateNestedConfig,
    switchId,
    switchLabel,
    configKey,
    selectedNodeId,
}: ToggleVariableFieldProps) {
    const deleteDialogueVariablesByNodeId = useFlowStore(
        (state) => state.deleteDialogueVariablesByNodeId
    );
    const updateDialogueVariable = useFlowStore(
        (state) => state.updateDialogueVariable
    );

    const handleToggle = (isChecked: boolean) => {
        if (!isChecked) {
            deleteDialogueVariablesByNodeId(selectedNodeId);
        } else {
            updateDialogueVariable(selectedNodeId, variableName);
        }
        updateNestedConfig(configKey, isChecked);
    };

    return (
        <div className="mx-2 mb-2">
            <div className="flex items-center space-x-2">
                <Switch checked={checked} onCheckedChange={handleToggle} id={switchId} />
                <Label htmlFor={switchId} className="text-xs font-normal">
                    {switchLabel}
                </Label>
            </div>

            {checked && (
                <VariableNameField
                    variableName={variableName}
                    onChange={onVariableNameChange}
                    label="Variable Name"
                />
            )}
        </div>
    );
}

import { useDebounceConfig } from "../../../../hooks/use-debounced-config"
import { NodeConfigProps } from "../../../../types/automation-types"
import { FieldWrapper } from "../../../custom/field-wrapper"
import { ToggleVariableField } from "../../../custom/ToggleVariableField"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Switch } from "../../../ui/switch"
interface Config {
  greet?: string;
  cancel?: string;
  start: boolean;
  save?: boolean;
  variableName?: string
}



function checkIfAllRequiredDataIsFilled(data: Config): boolean {
  if (!data) return false;

  if (data.save && !data.variableName) {
    return false;
  }

  return true;
}

export default function HandlerForm({ selectedNodeId, content, onContentUpdate }: NodeConfigProps<Config>) {


  const { localConfig, updateNestedConfig } = useDebounceConfig<Config>(
    content,
    {
      delay: 300,
      onSave: (savedConfig) => {
        // Save label changes
        const valid = checkIfAllRequiredDataIsFilled(savedConfig)
        onContentUpdate(savedConfig, valid)

      },
    },
  )

  return (
    <div className="space-y-4">

      <div>
        <Label className="block text-sm mb-2 font-normal">Greet</Label>
        <FieldWrapper
          field={{ type: "textfield", placeholder: "Welcome message" }}
          value={localConfig.greet || ""}
          onChange={(value) => updateNestedConfig("greet", value)}
          variableName={"greet"}
        >
          <Input
            name="greet"
            placeholder="Welcome message"
            value={localConfig.greet || ""}
            onChange={(event) => updateNestedConfig("greet", event.target.value)}
          />
        </FieldWrapper>
      </div>


      <div>
        <Label className="block text-sm mb-2 font-normal">Cancel</Label>
        <FieldWrapper
          field={{ type: "textfield", placeholder: "Message displayed when user cancels conversation" }}
          value={localConfig.cancel || ""}
          onChange={(value) => updateNestedConfig("cancel", value)}
          variableName={"cancel"}
        >
          <Input
            name="cancel"
            placeholder="Message displayed when user cancels conversation"
            value={localConfig.cancel || ""}
            onChange={(event) => updateNestedConfig("cancel", event.target.value)}
          />
        </FieldWrapper>
      </div>

      <div className="flex items-center space-x-2 mx-2 mb-2">
        <Switch
          checked={localConfig.start || false}
          onCheckedChange={(checked) => updateNestedConfig("start", checked)}
          id="start-switch"
        />
        <Label htmlFor="start-switch" className="text-xs font-normal">
          Let the user start the diaolg
        </Label>
      </div>
      <ToggleVariableField
        checked={localConfig.save || false}
        variableName={localConfig.variableName || ""}
        onVariableNameChange={(value) => updateNestedConfig("variableName", value)}
        updateNestedConfig={updateNestedConfig}
        switchId="save-switch"
        switchLabel="Save user's reply in a variable"
        configKey="save"
        selectedNodeId={selectedNodeId}
      />
    </div>
  )
}

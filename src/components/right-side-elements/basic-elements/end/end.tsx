import { useDebounceConfig } from "../../../../hooks/use-debounced-config"
import { removeHTMLTags } from "../../../../lib/utils"
import { useFlowStore } from "../../../../store/flow-store"
import { NodeConfigProps } from "../../../../types/automation-types"
import { FieldWrapper } from "../../../custom/field-wrapper"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"
import { Separator } from "../../../ui/separator"
import { Switch } from "../../../ui/switch"

export interface RightSideData {
  botSays: string,
  save: boolean;
  variableName: string;
  loopFromSwitch: boolean;
  loopFromName: string
}


function checkIfAllRequiredDataIsFilled(data: RightSideData): boolean {
  if (!data) return false;

  if (!removeHTMLTags(data.botSays || '').trim()) {
    return false;
  }

  return true;
}

export default function EndForm({
  content, selectedNodeId, onContentUpdate, validate,
}: NodeConfigProps<RightSideData>) {
  const endLoopFromNodesNames = useFlowStore(state => state.endLoopFromNodesNames)

  const { localConfig, updateNestedConfig } = useDebounceConfig<RightSideData>(
    content,
    {
      delay: 300,
      onSave: (savedConfig) => {
        // Save label changes
        validate(checkIfAllRequiredDataIsFilled(savedConfig))
        onContentUpdate(savedConfig)

      },
    },
  )
  const botSays = localConfig.botSays ?? ""
  const save = localConfig.save ?? ""
  const variableName = localConfig.variableName ?? ""
  const loopFromName = localConfig.loopFromName ?? ""
  const loopFromSwitch = localConfig.loopFromSwitch ?? false
  return (
    // Message and End Components
    <div className="mt-4">
      <Label className="block text-sm p-1 mb-1 font-normal">Bot Says</Label>
      <FieldWrapper
        field={{ type: "textfield", placeholder: "Message" }}
        value={botSays || ""}
        onChange={(value) => updateNestedConfig("botSays", value)}
        variableName={"botSays"}
      >
        <Input
          name="botSays"
          placeholder="Message"
          value={botSays || ""}
          onChange={(event) => updateNestedConfig("botSays", event.target.value)}
        />
      </FieldWrapper>
      <Separator orientation="horizontal" className="my-6" />
      <div className="flex items-center space-x-2 mx-2 mb-2">
        <Switch
          checked={loopFromSwitch || false}
          onCheckedChange={(checked) => {
            updateNestedConfig("loopFromSwitch", checked)
          }}
          id="loop-from-switch"
        />
        <Label htmlFor="loop-from-switch" className="text-xs font-normal">
          Loop from node.
        </Label>
      </div>
      {loopFromSwitch &&
        endLoopFromNodesNames[selectedNodeId] &&
        endLoopFromNodesNames[selectedNodeId] && (
          <>
            <Label className="block text-sm p-1 mb-1 font-normal">Loop from</Label>
            <Select
              name="loopFromName"
              value={loopFromName || "None"}
              onValueChange={(value) => {
                updateNestedConfig("loopFromName", value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a loop point" />
              </SelectTrigger>
              <SelectContent>
                {endLoopFromNodesNames[selectedNodeId].map((option: string, index: number) => (
                  <SelectItem key={`mi-${index}-${option}`} value={option} className="text-xs">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
    </div>
  )
}
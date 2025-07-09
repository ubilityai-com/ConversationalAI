import { Node, NodeProps } from "@xyflow/react"
import { useDebounceConfig } from "../../../hooks/use-debounced-config"
import { useFlowStore } from "../../../store/flow-store"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Switch } from "../../ui/switch"
interface RightSideData {
  greet?: string;
  cancel?: string;
  start: boolean;
}
interface HandlerConfigProps extends Record<string, unknown> {
  /* node.data passed from <PropertiesPanel /> */
  label: string
  description: string
  rightSideData: RightSideData
}
interface HandlerFormProps {
  selectedNode: NodeProps<Node<HandlerConfigProps>>
  handleRightSideDataUpdate: (
    value: any
  ) => void
}


function checkIfAllRequiredDataIsFilled(data: RightSideData): boolean {
  if (!data) return false;

  if (!data.greet || !data.cancel) {
    return false;
  }

  return true;
}

export default function HandlerForm({ selectedNode, handleRightSideDataUpdate }: HandlerFormProps) {

  const updateNodesValidationById = useFlowStore(state => state.updateNodesValidationById)

  const { localConfig, updateConfigField, updateNestedConfig } = useDebounceConfig<HandlerConfigProps["rightSideData"]>(
    selectedNode.data.rightSideData,
    {
      delay: 300,
      onSave: (savedConfig) => {
        // Save label changes
        updateNodesValidationById(selectedNode.id, checkIfAllRequiredDataIsFilled(savedConfig))
        handleRightSideDataUpdate(savedConfig)

      },
    },
  )

  return (
    <div className="space-y-4">

      <div>
        <Label className="block text-sm mb-2 font-normal">Greet</Label>
        <Input
          name="greet"
          placeholder="Welcome message"
          value={localConfig.greet || ""}
          onChange={(event) => updateNestedConfig("greet", event.target.value)}
        />
      </div>


      <div>
        <Label className="block text-sm mb-2 font-normal">Cancel</Label>
        <Input
          name="cancel"
          placeholder="Message displayed when user cancels conversation"
          value={localConfig.cancel || ""}
          onChange={(event) => updateNestedConfig("cancel", event.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2 mx-2 mb-2">
        <Switch
          checked={localConfig.start || false}
          onCheckedChange={(checked) => updateNestedConfig("start", checked)}
          id="start-switch"
        />
        <Label htmlFor="start-switch" className="text-xs font-normal">
          Let the use start the diaolg
        </Label>
      </div>

    </div>
  )
}

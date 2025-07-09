import { Node, NodeProps } from "@xyflow/react"
import { useDebounceConfig } from "../../../hooks/use-debounced-config"
import { useFlowStore } from "../../../store/flow-store"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Separator } from "../../ui/separator"
import { Switch } from "../../ui/switch"
import { removeHTMLTags } from "../../../lib/utils"

interface RightSideData {
  botSays: string,
  save: boolean;
  variableName: string;
  loopFromSwitch: boolean;
  loopFromName: string
}

interface EndConfigProps extends Record<string, unknown> {
  /* node.data passed from <PropertiesPanel /> */
  label: string
  description: string
  rightSideData: RightSideData
}

interface EndFormProps {
  selectedNode: NodeProps<Node<EndConfigProps>>
  handleRightSideDataUpdate: (
    value: any
  ) => void
}
function checkIfAllRequiredDataIsFilled(data: RightSideData): boolean {
  // if (!data) return false;

  // if (!removeHTMLTags(data.botSays || '').trim()) {
  //   return false;
  // }

  return true;
}

export default function EndForm({
  selectedNode,
  handleRightSideDataUpdate,
}: EndFormProps) {
  const endLoopFromNodesNames = useFlowStore(state => state.endLoopFromNodesNames)
  const updateNodesValidationById = useFlowStore(state => state.updateNodesValidationById)

  const { localConfig, updateConfigField, updateNestedConfig } = useDebounceConfig<EndConfigProps["rightSideData"]>(
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
  const botSays = localConfig.botSays ?? ""
  const save = localConfig.save ?? ""
  const variableName = localConfig.variableName ?? ""
  const loopFromName = localConfig.loopFromName ?? ""
  const loopFromSwitch = localConfig.loopFromSwitch ?? false
  return (
    // Message and End Components
    <div className="mt-4">
      {/* <Label className="block text-sm p-1 mb-1 font-normal">Bot Says</Label>
      <Input
        name="botSays"
        placeholder="Message"
        value={botSays || ""}
        onChange={(event) => updateNestedConfig("botSays", event.target.value)}
      />
      <Separator orientation="horizontal" className="my-6" /> */}
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
        endLoopFromNodesNames[selectedNode.id] &&
        endLoopFromNodesNames[selectedNode.id] && (
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
                {endLoopFromNodesNames[selectedNode.id].map((option: string, index: number) => (
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
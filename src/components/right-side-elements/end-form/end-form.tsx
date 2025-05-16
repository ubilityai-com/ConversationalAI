import { useFlowStore } from "../../../store/flow-store"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Separator } from "../../ui/separator"
import { Switch } from "../../ui/switch"
interface EndFormProps {
  clickedElement: any
  handleRightDrawerAnyFormChange: (
    event: any,
    index: number,
    innerIndex: number,
    entityIndex: number,
    isDynamicDataHandler: boolean,
  ) => void
}

export default function EndForm({
  clickedElement,
  handleRightDrawerAnyFormChange,
}: EndFormProps) {
  const endLoopFromNodesNames = useFlowStore(state => state.endLoopFromNodesNames)
  return (
    // Message and End Components
    <div className="mt-4">
      <Label className="block text-sm p-1 mb-1 font-normal">Bot Says</Label>
      <Input
        name="botSays"
        placeholder="Message"
        value={clickedElement.data.botSays || ""}
        onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
      />
      <Separator orientation="horizontal" className="my-6" />
      <div className="flex items-center space-x-2 mx-2 mb-2">
        <Switch
          checked={clickedElement.data.loopFromSwitch || false}
          onCheckedChange={(checked) => {
            const event = { target: { name: "loopFromSwitch", checked, type: "checkbox" } }
            handleRightDrawerAnyFormChange(event, -1, -1, -1, false)
          }}
          id="loop-from-switch"
        />
        <Label htmlFor="loop-from-switch" className="text-xs font-normal">
          Loop from node.
        </Label>
      </div>
      {clickedElement.data.loopFromSwitch &&
        endLoopFromNodesNames[clickedElement.id] &&
        endLoopFromNodesNames[clickedElement.id] && (
          <>
            <Label className="block text-sm p-1 mb-1 font-normal">Loop from</Label>
            <Select
              name="loopFromName"
              value={clickedElement.data.loopFromName || "None"}
              onValueChange={(value) => {
                const event = { target: { name: "loopFromName", value } }
                handleRightDrawerAnyFormChange(event, -1, -1, -1, false)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a loop point" />
              </SelectTrigger>
              <SelectContent>
                {endLoopFromNodesNames[clickedElement.id].map((option: string, index: number) => (
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
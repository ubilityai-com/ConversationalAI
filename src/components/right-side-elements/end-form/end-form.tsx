import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Separator } from "../../ui/separator"
import { Switch } from "../../ui/switch"

export default function EndForm(props: any, ClickedElement: any) {
    return (
      // Message and End Components
      <div className="mt-4">
        <Label className="block text-sm p-1 mb-1 font-normal">Bot Says</Label>
        <Input
          name="botSays"
          placeholder="Message"
          className="w-[93%] mx-2 mb-2 text-xs"
          value={ClickedElement.data.botSays || ""}
          onChange={(event) => props.handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
        />
        <Separator orientation="horizontal" className="my-6 mx-5" />
        <div className="flex items-center space-x-2 mx-2 mb-2">
          <Switch
            checked={ClickedElement.data.loopFromSwitch || false}
            onCheckedChange={(checked) => {
              const event = { target: { name: "loopFromSwitch", checked, type:"checkbox" } }
              props.handleRightDrawerAnyFormChange(event, -1, -1, -1, false)
            }}
            id="loop-from-switch"
          />
          <Label htmlFor="loop-from-switch" className="text-xs font-normal">
            Loop from node.
          </Label>
        </div>
        {ClickedElement.data.loopFromSwitch && 
          props.endLoopFromNodesNames[ClickedElement.id] && 
          props.endLoopFromNodesNames[ClickedElement.id] && (
          <>
            <Label className="block text-sm p-1 mb-1 font-normal">Loop from</Label>
            <Select
              name="loopFromName"
              value={ClickedElement.data.loopFromName || "None"}
              onValueChange={(value) => {
                const event = { target: { name: "loopFromName", value } }
                props.handleRightDrawerAnyFormChange(event, -1, -1, -1, false)
              }}
            >
              <SelectTrigger className="w-[93%] mx-2 mb-2 h-9 text-xs">
                <SelectValue placeholder="Select a loop point" />
              </SelectTrigger>
              <SelectContent>
                {props.endLoopFromNodesNames[ClickedElement.id].map((option: string, index: number) => (
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
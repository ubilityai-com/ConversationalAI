import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Switch } from "../ui/switch"

interface LoopFromFormProps {
    clickedElement: any
    handleRightDrawerAnyFormChange: (
      event: any,
      index: number,
      innerIndex: number,
      entityIndex: number,
      isDynamicDataHandler: boolean,
    ) => void
  }
  
  export function LoopFromForm({
    clickedElement,
    handleRightDrawerAnyFormChange,
  }: LoopFromFormProps) {
    return (
      <div>
        <Separator orientation="horizontal" className="my-6 mx-5" />
        <div className="flex items-center space-x-2 mx-2 mb-2">
          <Switch
            checked={clickedElement.data.loopFromSwitch || false}
            onCheckedChange={(checked) => {
              const event = { target: { name: "loopFromSwitch", checked, type:"checkbox" } }
              handleRightDrawerAnyFormChange(event, -1, -1, -1, false)
            }}
            id="loop-from-switch"
          />
          <Label htmlFor="loop-from-switch" className="text-xs font-normal">
            Replay from here when reach the end of conversation.
          </Label>
        </div>
        {clickedElement.data.loopFromSwitch && (
          <>
            <Label className="block text-sm p-1 mb-1 font-normal">Node Name</Label>
            <Input
              name="loopFromName"
              placeholder="Name this node"
              className="w-[93%] mx-2 mb-2 text-xs"
              value={clickedElement.data.loopFromName || ""}
              onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
            />
            <p className="text-xs text-muted-foreground ml-2 mb-2">Select this name in End Node</p>
          </>
        )}
      </div>
    )
  }
  
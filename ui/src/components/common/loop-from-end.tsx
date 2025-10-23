import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Switch } from "../ui/switch"

interface LoopFromFormProps {
  loopFromSwitch: boolean
  loopFromName: string
  handleChange: (
    name: string,
    value: any
  ) => void
}

export function LoopFromForm({
  loopFromName,
  loopFromSwitch,
  handleChange,
}: LoopFromFormProps) {
  return (
    <div>
      <Separator orientation="horizontal" className="my-6" />
      <div className="flex items-center space-x-2 mx-2 mb-2">
        <Switch
          checked={loopFromSwitch || false}
          onCheckedChange={(checked) => {
            handleChange("loopFromSwitch", checked)
          }}
          id="loop-from-switch"
        />
        <Label htmlFor="loop-from-switch" className="text-xs font-normal">
          Replay from here when reach the end of conversation.
        </Label>
      </div>
      {loopFromSwitch && (
        <>
          <Label className="block text-sm p-1 mb-1 font-normal">Node Name</Label>
          <Input
            name="loopFromName"
            placeholder="Name this node"
            value={loopFromName || ""}
            onChange={(event) => handleChange("loopFromName", event.target.value)}
          />
          <p className="text-xs text-muted-foreground ml-2 mb-2">Select this name in End Node</p>
        </>
      )}
    </div>
  )
}

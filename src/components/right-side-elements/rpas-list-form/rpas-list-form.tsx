import { LoopFromForm } from "../../common/loop-from-end"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Switch } from "../../ui/switch"

interface RPAListFormProps {
    clickedElement: any
    handleRightDrawerAnyFormChange: (
        event: any,
        index: number,
        innerIndex: number,
        entityIndex: number,
        isDynamicDataHandler: boolean,
    ) => void
}

export function RPAListForm({ clickedElement, handleRightDrawerAnyFormChange }: RPAListFormProps) {
    return (
        <div>
            <p className="text-sm p-1 mb-2 font-normal">{clickedElement.data.description}</p>

            <Label className="block text-sm p-1 mb-1 font-normal">Ticket List</Label>
            <Input
                name="ticketList"
                placeholder="Ticket List"
                className="w-[93%] mx-2 mb-2 text-xs"
                value={clickedElement.data.ticketList || ""}
                onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
            />
            <p className="text-xs text-muted-foreground ml-2 mb-4">Select an array from previous RPA result.</p>

            <div className="flex items-center space-x-2 mx-2 mb-4">
                <Switch
                    checked={clickedElement.data.save || false}
                    onCheckedChange={(checked) => {
                        const event = { target: { name: "save", checked } }
                        handleRightDrawerAnyFormChange(event, -1, -1, -1, false)
                    }}
                    id="save-switch"
                />
                <Label htmlFor="save-switch" className="text-xs font-normal">
                    Save user's reply in a variable
                </Label>
            </div>

            {clickedElement.data.save && (
                <>
                    <Label className="block text-sm p-1 mb-1 font-normal">Variable Name</Label>
                    <Input
                        name="variableName"
                        placeholder="Variable Name"
                        className="w-[93%] mx-2 mb-2 text-xs"
                        value={clickedElement.data.variableName || ""}
                        onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
                    />
                </>
            )}
            <LoopFromForm clickedElement={clickedElement} handleRightDrawerAnyFormChange={handleRightDrawerAnyFormChange} />
        </div>
    )
}

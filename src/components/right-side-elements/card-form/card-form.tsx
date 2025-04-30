import { LoopFromForm } from "../../common/loop-from-end"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"

interface CardFormProps {
    clickedElement: any
    handleRightDrawerAnyFormChange: (
        event: any,
        index: number,
        innerIndex: number,
        entityIndex: number,
        isDynamicDataHandler: boolean,
    ) => void
}

export function CardForm({ clickedElement, handleRightDrawerAnyFormChange }: CardFormProps) {
    return (
        <div className="space-y-4">
            <p className="text-sm p-1 mb-2 font-normal">{clickedElement.data.name}</p>

            {clickedElement.data.name === "RPA Result Card Display" && (
                <div>
                    <Label className="block text-sm p-1 mb-1 font-normal">Ticket Details</Label>
                    <Input
                        name="ticketDetails"
                        placeholder="Ticket Details"
                        className="w-[93%] mx-2 mb-2 text-xs"
                        value={clickedElement.data.ticketDetails || ""}
                        onChange={(event) => handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
                    />
                    <p className="text-xs text-muted-foreground ml-2 mb-4">Select an object from previous RPA result.</p>
                </div>
            )}

            {clickedElement.data.variables && clickedElement.data.variables.length > 0 && (
                <div>
                    <Label className="block text-sm p-1 mb-1 font-normal">Variables:</Label>
                    <div className="ml-4 space-y-1">
                        {clickedElement.data.variables.map((variable: string) => (
                            <p key={variable} className="text-xs font-normal">
                                - {variable}
                            </p>
                        ))}
                    </div>
                </div>
            )}
            <LoopFromForm clickedElement={clickedElement} handleRightDrawerAnyFormChange={handleRightDrawerAnyFormChange} />
        </div>
    )
}

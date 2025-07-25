import { useState } from "react"
import { createFlowObject } from "../../lib/create-flow-object"
import { useFlowStore } from "../../store/flow-store"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"


interface ConfigurationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateOutputVariableDialog({
    open,
    onOpenChange,
    // onSubmit,
}: ConfigurationDialogProps) {

    const { formDialogBotName, formDialogApplyValues, setFormDialogBotName, setFormDialogApplyValues } = useFlowStore();
    const [botName, setBotName] = useState(formDialogBotName)
    const handlePublish = () => {
        const flowObject = createFlowObject()
        console.log({ flowObject });


    }
    const handleChangeBotName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBotName(event.target.value)
    }
    const handleSaveOutputVariable = (value: string, variableName: string) => {
        if (variableName === "formDialogBotName") {
            setFormDialogBotName(value)
        } else if (variableName === "formDialogApplyValues") {
            setFormDialogApplyValues(value)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Create Output Variable</DialogTitle>
                    <DialogDescription>
                        The variable value will be taken from the output.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-6" onSubmit={handlePublish}>
                    <div className="space-y-2">
                        <Label>Configuration Name</Label>
                        <Input placeholder="My Configuration" value={botName} onChange={handleChangeBotName} />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

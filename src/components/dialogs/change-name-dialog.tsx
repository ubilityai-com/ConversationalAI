import { useState } from "react"
import { createFlowObject } from "../../lib/create-flow-object"
import { useFlowStore } from "../../store/flow-store"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"


interface ConfigurationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ChangeNameDialog({
    open,
    onOpenChange,
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
    const handleSaveFormDialogOnChange = (value: string, variableName: string) => {
        if (variableName === "formDialogBotName") {
            setFormDialogBotName(value)
        } else if (variableName === "formDialogApplyValues") {
            setFormDialogApplyValues(value)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogPortal>
                <DialogOverlay className="DialogOverlay" />
                <DialogContent className="DialogContent">
                    <DialogTitle className="DialogTitle">Edit profile</DialogTitle>
                    <DialogDescription className="DialogDescription">
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                    <Label
                        htmlFor="name"
                    >
                        Name
                    </Label>
                    <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                    />
                    <div
                        style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
                    >
                        <DialogClose asChild>
                            <Button className="Button green">Save changes</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}

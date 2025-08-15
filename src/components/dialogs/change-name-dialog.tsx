import { useState } from "react"
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

    const { selectedBot, updateBot } = useFlowStore();
    const [botName, setBotName] = useState(selectedBot?.name)

    const handleSaveFormDialog = () => {
        updateBot({
            name: botName
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogPortal>
                <DialogOverlay className="DialogOverlay" />
                <DialogContent className="DialogContent">
                    <DialogTitle className="DialogTitle">Edit name</DialogTitle>
                    <DialogDescription className="DialogDescription">
                        Make changes to your bot name here. Click save when you're done.
                    </DialogDescription>
                    <Label
                        htmlFor="name"
                    >
                        Name
                    </Label>
                    <Input
                        value={botName}
                        id="name"
                        defaultValue={botName}
                        onChange={(e) => setBotName(e.target.value)}
                    />
                    <div
                        style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
                    >
                        <DialogClose asChild>
                            <Button
                                onClick={handleSaveFormDialog}
                                className="Button green">Save changes</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}

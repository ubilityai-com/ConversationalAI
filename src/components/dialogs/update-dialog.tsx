import { createFlowObject } from "../../lib/build-json"
import { useFlowStore } from "../../store/flow-store"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"


interface ConfigurationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function UpdateDialog({
    open,
    onOpenChange,
}: ConfigurationDialogProps) {

    const { nodes, edges, nodesValidation, dialogueVariables, outputVariables, constantVariables, updateBot, selectedBot, nodeStates } = useFlowStore();

    const handleUpdate = () => {
        const data = createFlowObject()
        updateBot({
            name: selectedBot?.name,
            dialogue: data,
            ui_json: {
                nodes,
                edges,
                nodesValidation,
                constantVariables,
                outputVariables,
                dialogueVariables,
                nodeStates
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Configuration</DialogTitle>
                    <DialogDescription>
                        Update your Bot configuration.
                    </DialogDescription>
                </DialogHeader>


                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

import { Loader2, Save } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFlowStore } from "../../store/flow-store"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"


interface ConfigurationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}
const getRandomNumber = () => Math.round(Math.random() * 1000000)
export function SaveDialog({
    open,
    onOpenChange,
}: ConfigurationDialogProps) {

    const { nodes, edges, nodesValidation, outputVariables, constantVariables, dialogueVariables, saveBot, selectedBot } = useFlowStore();
    const [botName, setBotName] = useState(selectedBot?.name ?? `Bot ${getRandomNumber()}`)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const handleChangeBotName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBotName(event.target.value)
    }
    const handleSave = async () => {
        if (!botName.trim()) return

        setIsLoading(true)
        try {
            const savedBot = await saveBot({
                name: botName,
                dialogue: {},
                ui_json: {
                    nodes,
                    edges,
                    nodesValidation,
                    constantVariables,
                    outputVariables,
                    dialogueVariables
                }
            }
            )
            navigate(`/${savedBot.id}`)
            onOpenChange(false)
            setBotName("")
        } catch (error) {
            console.error("Save failed:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOpenChange = (newOpen: boolean) => {
        if (!isLoading) {
            onOpenChange(newOpen)
            if (!newOpen) {
                setBotName("")
            }
        }
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Save Configuration</DialogTitle>
                    <DialogDescription>
                        Enter a name for your Bot.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">

                    <Label>Bot Name</Label>
                    <Input placeholder="My Configuration" value={botName} onChange={handleChangeBotName} />

                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} type="submit"> {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </>
                    )}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

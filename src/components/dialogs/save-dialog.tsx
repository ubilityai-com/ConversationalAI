import { useState } from "react"
import { createFlowObject } from "../../lib/create-flow-object"
import { useFlowStore } from "../../store/flow-store"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"


interface ConfigurationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function PublishDialog({
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
    const handleSaveFormDialogOnChange = (value: string, variableName: string) => {
        if (variableName === "formDialogBotName") {
            setFormDialogBotName(value)
        } else if (variableName === "formDialogApplyValues") {
            setFormDialogApplyValues(value)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Save Configuration</DialogTitle>
                    <DialogDescription>
                        Enter a name for your configuration and select the environment to deploy to.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-6" onSubmit={handlePublish}>
                    <div className="space-y-2">

                        <Label>Configuration Name</Label>
                        <Input placeholder="My Configuration" value={botName} onChange={handleChangeBotName} />

                    </div>

                    <div className="space-y-3">
                        <Label>Environment</Label>
                        <div>
                            <RadioGroup
                                // onValueChange={field.onChange}
                                defaultValue={formDialogApplyValues}
                                className="flex flex-col space-y-1"
                            >
                                <div className="flex items-center space-x-3 space-y-0">
                                    <div>
                                        <RadioGroupItem value="Draft" />
                                    </div>
                                    <Label className="font-normal">
                                        Draft
                                        <span className="text-xs text-muted-foreground block">
                                            Save your configuration without deploying
                                        </span>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-3 space-y-0">
                                    <div>
                                        <RadioGroupItem value="Staging" />
                                    </div>
                                    <Label className="font-normal">
                                        Staging
                                        <span className="text-xs text-muted-foreground block">
                                            Deploy to the staging environment for testing
                                        </span>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-3 space-y-0">
                                    <div>
                                        <RadioGroupItem value="Production" />
                                    </div>
                                    <Label className="font-normal">
                                        Production
                                        <span className="text-xs text-muted-foreground block">
                                            Deploy to the production environment
                                        </span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
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

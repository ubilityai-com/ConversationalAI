import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { ScrollArea } from "../ui/scroll-area"


export interface ValidationWarning {
    id: string
    title: string
    description: string
    severity?: "low" | "medium" | "high"

}

interface ValidationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title?: string
    description?: string
    cancelButtonText?: string
    warnings: ValidationWarning[]
}

export function ValidationDialog({
    open,
    onOpenChange,
    title = "Configuration Warnings",
    description = "The following issues were found in your configuration:",
    cancelButtonText = "Go Back and Fix",
    warnings
}: ValidationDialogProps) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        {title}
                    </DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[50vh] pr-4">
                    <div className="space-y-4 py-2">
                        {warnings.map((warning) => (
                            <Alert
                                key={warning.id}
                                variant="destructive"
                                className={
                                    warning.severity === "high"
                                        ? "border-red-500 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-200"
                                        : warning.severity === "medium"
                                            ? "border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200"
                                            : "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-200"
                                }
                            >
                                <div className="flex gap-1">
                                    <AlertTriangle
                                        className={
                                            warning.severity === "high"
                                                ? "h-4 w-4 text-red-500"
                                                : warning.severity === "medium"
                                                    ? "h-4 w-4 text-amber-500"
                                                    : "h-4 w-4 text-blue-500"
                                        }
                                    />
                                    <AlertTitle className="font-medium">{warning.title}</AlertTitle>
                                </div>

                                <AlertDescription className="text-sm">{warning.description}</AlertDescription>
                            </Alert>
                        ))}
                    </div>
                </ScrollArea>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        {cancelButtonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

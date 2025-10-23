import { useState } from "react";
import { useFlowStore } from "../../store/root-store";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogTitle
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";

interface ConfigurationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ExpandedFieldDialog({
    open,
    onOpenChange,
}: ConfigurationDialogProps) {
    const { dialogProps } = useFlowStore();

    const [inputValue, setInputValue] = useState(dialogProps?.value || "");

    const handleSaveFormDialog = () => {
        dialogProps.onChange(inputValue)
        onOpenChange(false);
    };

    const handleCancel = () => {
        // Reset to original values
        setInputValue(dialogProps?.value || "");
        onOpenChange(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen) return;
            }}
            modal
        >
            <DialogPortal>
                <DialogOverlay className="DialogOverlay" />
                <DialogContent hidden className="DialogContent max-w-screen-md">
                    <DialogTitle className="DialogTitle">{dialogProps?.label}</DialogTitle>
                    <div className="space-y-4">
                        <Textarea
                            value={inputValue}
                            id="description"
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Add a detailed description..."
                            className="min-h-96"
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveFormDialog}>Save</Button>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}

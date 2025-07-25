import { useState } from "react";
import { doesVariableExist } from "../../lib/variable-utils";
import { useFlowStore } from "../../store/flow-store";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ConfigurationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateOutputVariableDialog({
  open,
  onOpenChange,
}: ConfigurationDialogProps) {
  const {
    constantVariables,
    outputVariables,
    dialogueVariables,
    addOutputVariable,
    clickedElement,
  } = useFlowStore();

  const [variableName, setVariableName] = useState("");
  const [error, setError] = useState("");

  const handleVariableNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVariableName(event.target.value);
    if (error) setError(""); // Clear error when user starts typing
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    if (!variableName.trim()) {
      setError("Variable name is required");
      return;
    }

    // Check if variable already exists
    if (
      doesVariableExist(
        variableName,
        constantVariables,
        outputVariables,
        dialogueVariables
      )
    ) {
      setError("Variable name already exists");
      return;
    }

    // Get the current node ID (assuming we're creating an output variable for the selected node)
    const nodeId = clickedElement?.id;
    if (!nodeId) {
      setError("No node selected");
      return;
    }

    // Create the output variable
    addOutputVariable(nodeId, variableName, "output"); // Using "output" as default path

    // Reset form and close dialog
    setVariableName("");
    setError("");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setVariableName("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Create Output Variable</DialogTitle>
          <DialogDescription>
            The variable value will be taken from the output.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-6" onSubmit={handleSave}>
          <div className="space-y-2">
            <Label htmlFor="variableName">Variable Name</Label>
            <Input
              id="variableName"
              placeholder="Enter variable name"
              value={variableName}
              onChange={handleVariableNameChange}
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

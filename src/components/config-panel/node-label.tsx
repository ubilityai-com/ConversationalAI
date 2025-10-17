import { Check, Edit2 } from "lucide-react";
import { useState } from "react";
import { generateUniqueName } from "../../lib/utils/flow-utils";
import { useFlowStore } from "../../store/root-store";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function NodeLabel() {
    const selectedNode = useFlowStore((state) => state.clickedElement);
    const reactFlowInstance = useFlowStore((state) => state.reactFlowInstance);
    const updateNodeData = reactFlowInstance?.updateNodeData;

    const [isEditing, setIsEditing] = useState(false);
    const [editLabel, setEditLabel] = useState(selectedNode?.data?.label ?? "");
    const [label, setLabel] = useState(selectedNode?.data?.label ?? "");

    const saveLabel = () => {
        const trimmed = editLabel.trim();
        if (trimmed && trimmed !== label && selectedNode && updateNodeData) {
            const newLabel = generateUniqueName(selectedNode.type, trimmed);
            updateNodeData(selectedNode.id, { label: newLabel });
            setLabel(newLabel);
        }
        setIsEditing(false);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditLabel(label);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") saveLabel();
        if (e.key === "Escape") cancelEdit();
    };

    return isEditing ? (
        <div className="flex items-center gap-2">
            <Input
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={saveLabel}
                className="h-6 text-sm px-2 min-w-0"
                autoFocus
            />
            <Button size="sm" variant="ghost" onClick={saveLabel} className="h-6 w-6 p-0">
                <Check className="w-3 h-3" />
            </Button>
        </div>
    ) : (
        <div className="flex items-center gap-2">
            <Badge
                variant="secondary"
                className="text-sm cursor-pointer hover:bg-gray-200 max-w-32 truncate"
                onClick={() => setIsEditing(true)}
            >
                <span className="overflow-hidden text-ellipsis whitespace-nowrap block">
                    {label}
                </span>{" "}
            </Badge>
            <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
            >
                <Edit2 className="w-3 h-3" />
            </Button>
        </div>
    );
}

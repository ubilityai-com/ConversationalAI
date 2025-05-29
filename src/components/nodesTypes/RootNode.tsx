import { useNodeId, useReactFlow } from "@xyflow/react";
import { Copy, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { useFlowStore } from "../../store/flow-store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
type TooltipWrapperProps = {
    children: React.ReactNode;
};

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({ children }) => {
    const id = useNodeId()
    const deleteNode = useFlowStore(state => state.deleteNode)
    const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

    const handleDeleteNode = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (id)
            deleteNode(id)
    }
    const handleDuplicate = () => {
        if (id)
            duplicateNode()
    }
    const duplicateNode = useCallback(() => {
        const node = getNode(id??"");
        if (node) {
            const position = {
                x: node.position.x + 50,
                y: node.position.y + 50,
            };

            addNodes({
                ...node,
                selected: false,
                dragging: false,
                id: `${node.id}-copy`,
                position,
            });
        }
    }, [id, getNode, addNodes]);
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side="top" align="center" className="bg-transparent p-0 shadow-none z-50"
                    sideOffset={4}>
                    <div className="flex gap-3  p-1 rounded shadow border border-border">
                        <button onClick={handleDuplicate} className="hover:text-blue-500">
                            <Copy size={16} />
                        </button>
                        <button onClick={handleDeleteNode} className="hover:text-red-500">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
};
export default TooltipWrapper
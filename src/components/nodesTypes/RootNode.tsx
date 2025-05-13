import { useNodeId } from "@xyflow/react";
import { Copy, Trash2 } from "lucide-react";
import { useFlowStore } from "../../store/flow-store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
type TooltipWrapperProps = {
    children: React.ReactNode;
};

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({ children }) => {
    const id = useNodeId()
    const deleteNode = useFlowStore(state => state.deleteNode)
    const handleDeleteNode = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (id)
            deleteNode(id)
    }

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side="top" align="center" className="bg-transparent p-0 shadow-none z-50"
                    sideOffset={4}>
                    <div className="flex gap-3 bg-white p-1 rounded shadow border border-gray-200">
                        <button className="hover:text-blue-500">
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
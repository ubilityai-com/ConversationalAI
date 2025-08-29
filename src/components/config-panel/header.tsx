import { Settings } from "lucide-react";
import { useFlowStore } from "../../store/flow-store";
import ActionButtons from "./action-buttons";
import NodeLabel from "./node-label";

export default function Header() {
    const selectedNode = useFlowStore((state) => state.clickedElement);

    return (
        <div className="sticky bg-white top-0 z-10 p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center min-w-0">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center truncate">
                    <Settings className="w-5 h-5 mr-2 flex-shrink-0" />
                    <NodeLabel />
                </h2>
            </div>
            <ActionButtons category={selectedNode.data.category} id={selectedNode.id} type={selectedNode.type} />
        </div>
    );
}

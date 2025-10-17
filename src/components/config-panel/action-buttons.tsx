import { Loader2, Trash2, X } from "lucide-react";
import { useFlowStore } from "../../store/root-store";
import { Button } from "../ui/button";

export default function ActionButtons({ id, category, type, cantTest }: { id: string, category: string, type: string, cantTest?: boolean }) {
  const deleteNode = useFlowStore((state) => state.deleteNode);
  const setClickedElement = useFlowStore((state) => state.setClickedElement);
  const selectedBot = useFlowStore((state) => state.selectedBot);
  const testNode = useFlowStore((state) => state.testNode);
  const setFormDialogStatus = useFlowStore((state) => state.setFormDialogStatus);
  const setIsFormDialogOpen = useFlowStore((state) => state.setIsFormDialogOpen);
  const isThisNodeRunning = useFlowStore((state) => state.runningNodeIds.has(id));
  const nodesValidation = useFlowStore((state) => state.nodesValidation);

  const canTest = cantTest ? false: (category === "ai" ||
    category === "integration" ||
    category === "automationTools");

  return (
    <div className="flex items-center space-x-2 flex-shrink-0">
      {canTest && (
        <Button
          size="sm"
          onClick={() => {
            if (!selectedBot) {
              setFormDialogStatus("save");
              setIsFormDialogOpen(true);
            } else testNode(id);
          }}
          disabled={isThisNodeRunning || !nodesValidation[id]}
          className="h-8 px-3 bg-green-50 text-green-600 hover:bg-green-100 disabled:text-gray-400 disabled:bg-gray-100 flex items-center gap-1"
        >
          {isThisNodeRunning && <Loader2 className="w-4 h-4 animate-spin" />}
          {isThisNodeRunning ? "Testing..." : "Test Node"}
        </Button>
      )}
      {type !== "Handler" && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => deleteNode(id)}
          className="text-red-500 hover:text-red-600 w-8 h-8 p-0"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setClickedElement(null)}
        className="w-8 h-8 p-0"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}

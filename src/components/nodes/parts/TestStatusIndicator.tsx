import React from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useFlowStore } from "../../../store/flow-store";

interface TestStatusIndicatorProps {
  id: string;
  className?: string;
}

export const TestStatusIndicator: React.FC<TestStatusIndicatorProps> = ({
  id,
  className,
}) => {
  const nodeResults = useFlowStore((state) => state.nodeResults);
  const runningNodeIds = useFlowStore((state) => state.runningNodeIds);

  const nodeResult = nodeResults[id];
  const isRunning = runningNodeIds.has(id);

  // Determine status
  let status: "success" | "error" | "running" | null = null;
  if (isRunning) {
    status = "running";
  } else if (nodeResult) {
    status = nodeResult.status;
  }

  if (!status) return null;

  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          icon: CheckCircle,
          containerClass: "bg-gradient-to-br from-emerald-400 to-green-500",
          iconColor: "text-white",
        };
      case "error":
        return {
          icon: XCircle,
          containerClass: "bg-gradient-to-br from-red-400 to-rose-500",
          iconColor: "text-white",
        };
      case "running":
        return {
          icon: Loader2,
          containerClass: "bg-gradient-to-br from-blue-400 to-blue-500",
          iconColor: "text-white animate-spin",
        };
      default:
        return null;
    }
  };

  const config = getStatusConfig();
  if (!config) return null;

  const { icon: Icon, containerClass, iconColor } = config;

  return (
    <div
      className={cn(
        "absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-lg",
        containerClass,
        className
      )}
    >
      <Icon className={cn("w-4 h-4", iconColor)} />
    </div>
  );
};

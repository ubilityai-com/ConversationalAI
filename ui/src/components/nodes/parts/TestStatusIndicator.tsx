import React from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { cn } from "../../../lib/utils/utils";
import { useFlowStore } from "../../../store/root-store";

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
  const testMessage = ""
  if (!status) return null;

  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          icon: CheckCircle,
          containerClass: "bg-gradient-to-br from-emerald-400 to-green-500",
          iconColor: "text-white",
          glowClass: "shadow-emerald-400/50",
          ringClass: "ring-emerald-300/30",
        };
      case "error":
        return {
          icon: XCircle,
          containerClass: "bg-gradient-to-br from-red-400 to-rose-500",
          iconColor: "text-white",
          glowClass: "shadow-red-400/50",
          ringClass: "ring-red-300/30",
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

  const { icon: Icon, containerClass, iconColor,ringClass,glowClass } = config;

  return (
    <div className={cn("absolute bottom-3 right-3 z-30", className)}>
    {/* Outer glow ring */}
    <div
      className={cn(
        "absolute inset-0 rounded-full ring-4 transition-all duration-500",
        ringClass
      )}
    />

    {/* Main container */}
    <div
      className={cn(
        "relative flex items-center justify-center w-6 h-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110",
        containerClass,
        glowClass
      )}
      title={testMessage || `Test ${status}`}
    >
      <Icon className={cn("w-4 h-4", iconColor)} />

      {/* error shake effect */}
      {status === "error" && (
        <div
          className="absolute inset-0 rounded-full bg-red-600/20 animate-ping"
          style={{ animationDuration: "2s", animationIterationCount: "2" }}
        />
      )}
    </div>
  </div>

  );
};

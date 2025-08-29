import React from "react";
import { useNodeRunningState } from "../hooks/useNodeRunningState";

interface RunningIndicatorProps {
  id: string;
  isStartNode?: boolean;
}

export const RunningIndicator = React.memo(
  ({ id, isStartNode = false }: RunningIndicatorProps) => {
    const { isRunning } = useNodeRunningState(id, isStartNode);

    if (!isRunning) return null;

    return (
      <div className="absolute top-2 left-2 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm">
        <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    );
  }
);

RunningIndicator.displayName = "RunningIndicator";

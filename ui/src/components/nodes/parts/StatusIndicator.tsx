import React, { useMemo } from "react";
import { getNodeStatus, getStatusColorClass, useNodeRunningState, useNodeValidation } from "../index";

interface StatusIndicatorProps {
  id: string;
  isStartNode?: boolean;
}

export const StatusIndicator = React.memo(
  ({ id, isStartNode = false }: StatusIndicatorProps) => {
    const isNodeValid = useNodeValidation(id);
    const { isRunning } = useNodeRunningState(id);

    const workflowRunning = false;
    const statusConfig = useMemo(
      () => ({
        status: getNodeStatus(isNodeValid, isRunning, workflowRunning),
        colorClass: getStatusColorClass(
          isNodeValid,
          isRunning,
          workflowRunning
        ),
      }),
      [isNodeValid, isRunning, workflowRunning]
    );

    return (
      <div className="flex items-center mt-3">
        <div
          className={`w-2 h-2 rounded-full mr-2 ${statusConfig.colorClass}`}
        />
        <span className="text-xs text-gray-500 font-medium">
          {statusConfig.status}
        </span>
      </div>
    );
  }
);

StatusIndicator.displayName = "StatusIndicator";

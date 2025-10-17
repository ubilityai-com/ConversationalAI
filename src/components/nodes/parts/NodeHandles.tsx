import { Position } from "@xyflow/react";
import React from "react";
import { cn } from "../../../lib/utils/utils";
import { NodeHandle } from "../../handles/handle";
import { NODE_TYPES } from "../index";

interface NodeHandlesProps {
  id: string;
  type: string;
  handles?: React.ReactNode;
}

export const NodeHandles = React.memo(
  ({ type, handles }: NodeHandlesProps) => {
    const isStartNode = type === NODE_TYPES.HANDLER;
    return (
      <>
        {/* Input handle - hide for start node */}
        {!isStartNode && (
          <NodeHandle
            id={null}
            type="target"
            position={Position.Left}
            className={cn(
              "w-4 h-4 bg-gray-400 border-2 border-white hover:bg-gray-500 transition-colors"
            )}
          />
        )}
        {/* Output handle */}
        {handles ??
          (
            <NodeHandle
              id={null}
              type="source"
              position={Position.Right}
              className={cn(
                "w-4 h-4 bg-gray-400 border-2 border-white hover:bg-gray-500 transition-colors"
              )}
            />
          )}
      </>
    );
  }
);

NodeHandles.displayName = "NodeHandles";

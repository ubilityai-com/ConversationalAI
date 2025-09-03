import React from "react";
import { Position } from "@xyflow/react";
import { NodeHandle } from "../../handles/handle";
import { cn } from "../../../lib/utils";
import { NODE_TYPES } from "../index";

interface NodeHandlesProps {
  id: string;
  type: string;
  handles?: React.ReactNode;
}

export const NodeHandles = React.memo(
  ({ id, type, handles }: NodeHandlesProps) => {
    const isStartNode = type === NODE_TYPES.HANDLER;
    const isEndNode = type === NODE_TYPES.END;

    return (
      <>
        {/* Input handle - hide for start node */}
        {!isStartNode && (
          <NodeHandle
            id={id ? id : null}
            type="target"
            position={Position.Left}
            className={cn(
              "w-4 h-4 bg-gray-400 border-2 border-white hover:bg-gray-500 transition-colors"
            )}
          />
        )}
        {/* Output handle */}
        {handles ??
          (!isEndNode && (
            <NodeHandle
              id={id ? id : null}
              type="source"
              position={Position.Right}
              className={cn(
                "w-4 h-4 bg-gray-400 border-2 border-white hover:bg-gray-500 transition-colors"
              )}
            />
          ))}
      </>
    );
  }
);

NodeHandles.displayName = "NodeHandles";

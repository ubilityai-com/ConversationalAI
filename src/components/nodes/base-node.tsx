import React from "react";
import { Node, NodeProps } from "@xyflow/react";
import { cn } from "../../lib/utils";
import { useNodeSelection } from "./hooks/useNodeState";
import { NodeErrorBoundary } from "./ErrorBoundary";
import { RunningIndicator } from "./parts/RunningIndicator";
import { StateIndicator } from "./parts/StateIndicator";
import { NodeIcon } from "./parts/NodeIcon";
import { StatusIndicator } from "./parts/StatusIndicator";
import { NodeHandles } from "./parts/NodeHandles";
import { NODE_TYPES } from "./constants";

export type BaseNodeData<T = Record<string, any>> = {
  label: string;
  description: string;
  category: string;
  rightSideData: T;
};

export type BaseNodeProps = NodeProps<Node<BaseNodeData>> & {
  icon: React.ComponentType<{ className?: string }> | null;
  color: string;
  backgroundColor: string;
  children?: React.ReactNode;
  header?: React.ReactNode;
  handles?: React.ReactNode;
  bodyWidth?: string;
};

// Main BaseNode Component
export const BaseNode = React.memo(
  ({
    id,
    icon: IconComponent,
    color,
    backgroundColor,
    children,
    header,
    handles,
    type,
    data,
    bodyWidth = "w-64",
  }: BaseNodeProps) => {
    const isSelected = useNodeSelection(id);
    const isStartNode = type === NODE_TYPES.HANDLER;

    return (
      <NodeErrorBoundary>
        <div className={`relative ${isSelected ? "z-20" : "z-10"}`}>
          <NodeHandles id={id} type={type} handles={handles} />

          {/* Node body */}
          <div
            className={cn(
              bodyWidth,
              "bg-white rounded-2xl shadow-lg border-2 transition-all duration-200 cursor-pointer",
              isSelected
                ? "border-blue-400 shadow-xl ring-4 ring-blue-100"
                : `${backgroundColor} hover:shadow-xl`
            )}
          >
            <div
              className={cn(
                "p-4 bg-white rounded-2xl relative",
                backgroundColor
              )}
            >
              <RunningIndicator id={id} isStartNode={isStartNode} />
              <StateIndicator id={id} />

              <div className="flex items-start space-x-4">
                <NodeIcon
                  IconComponent={IconComponent}
                  color={color}
                  type={type}
                />
                {header}
              </div>

              {/* Custom content */}
              {children}

              <StatusIndicator id={id} isStartNode={isStartNode} />
            </div>
          </div>
        </div>
      </NodeErrorBoundary>
    );
  }
);

BaseNode.displayName = "BaseNode";

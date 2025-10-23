import { Node, NodeProps } from "@xyflow/react";
import { Copy, Trash2 } from "lucide-react";
import React from "react";
import { NODE_TYPES, NodeErrorBoundary, NodeHandles, NodeIcon, StateIndicator, StatusIndicator, TestStatusIndicator, useNodeSelection } from "./index";
import { useFlowStore } from "../../store/root-store";

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
  category?: string
};

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
    category,
    data,
    bodyWidth = "w-64",
  }: BaseNodeProps) => {
    const isSelected = useNodeSelection(id);
    const isStartNode = type === NODE_TYPES.HANDLER;
    const deleteNode = useFlowStore((state) => state.deleteNode);
    const duplicateNode = useFlowStore((state) => state.duplicateNode);

    return (
      <NodeErrorBoundary>
        <div
          className={`relative group ${isSelected ? "z-20" : "z-10"}`}
        >
          {!isStartNode && <div className={`absolute -top-8 right-2 flex space-x-1 px-1.5 py-0.5 bg-white/90 backdrop-blur-sm rounded-md shadow-sm ${isSelected ? "opacity-100" : "opacity-0"} group-hover:opacity-100 transition-opacity duration-200`}>
            <button
              className="p-1 rounded-full hover:bg-gray-100 text-gray-600 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                duplicateNode(id)
              }}
              title="Duplicate"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              className="p-1 rounded-full hover:bg-red-100 text-red-500 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                deleteNode(id)
              }}
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>}
          <NodeHandles id={id} type={type} handles={handles} />

          <div
            className={`${bodyWidth
              } bg-white rounded-2xl shadow-lg border-2 transition-all duration-200 cursor-pointer ${isSelected
                ? "border-blue-400 shadow-xl ring-4 ring-blue-100"
                : `${backgroundColor} hover:shadow-xl`
              }`}
          >
            <div className={`p-4 bg-white rounded-2xl relative ${backgroundColor}`}>
              <StateIndicator id={id} />
              <TestStatusIndicator id={id} />

              <div className="flex items-start space-x-4">
                <NodeIcon IconComponent={IconComponent} color={color} type={type} category={category} />
                {header}
              </div>

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

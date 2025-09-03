"use client"
import { Node, Position, type NodeProps } from "@xyflow/react";
import { GitBranch } from "lucide-react";
import { NodeHandle } from "../handles/handle";
import { BaseNode } from "./index";
export interface RouterDefaultBranch {
  label: string
  description: string
}
export interface RouterBranch {
  id: string
  label: string
  description: string
  operatorType: "number" | "string"
  firstOperator: string
  secondOperator: string
  checkType:
  | "equal"
  | "not_equal"
  | "greater_than"
  | "less_than"
  | "greater_equal"
  | "less_equal"
  | "contains"
  | "not_contains"
}
export interface RouterConfig extends Record<string, unknown> {
  label: string
  description: string
  category: string
  rightSideData: {
    branches: RouterBranch[]
    defaultBranch: RouterDefaultBranch
    save: boolean;
    variableName: string;
    loopFromSwitch: boolean;
    loopFromName: string
  }
}
export function RouterNode(props: NodeProps<Node<RouterConfig>>) {
  const { data } = props

  const handles = (<></>)

  const content = (
    <div className="mt-4 space-y-2">
      {/* Conditional branches */}
      {(data.rightSideData.branches || []).map((branch: RouterBranch, index: number) => (
        <div key={index} className="text-xs bg-cyan-50 rounded-lg p-3">
          <div className="absolute right-0 mt-7">
            <NodeHandle
              variant="branch"
              key={`branch-${branch.id}`}
              type="source"
              position={Position.Right}
              id={branch.id}
              className="w-3 h-3 bg-cyan-400 border-2 border-white hover:bg-cyan-500 transition-colors"
            // style={{ top: `${150 + index * 100}px` }}
            />
          </div>

          {/* Branch Label Row */}
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2 flex-shrink-0"></div>
            <span className="font-medium text-cyan-700 truncate">{branch.label || `Branch ${index + 1}`}</span>
          </div>

          {/* Condition Row */}
          <div className="mb-2">
            <div className="text-gray-600 font-mono text-xs bg-white px-3 py-2 rounded border truncate w-full">
              {branch.firstOperator || "[first]"} {branch.checkType?.replace("_", " ") || "equals"}{" "}
              {branch.secondOperator || "[second]"}
            </div>
          </div>

          {/* Description Row */}
          {branch.description && <div className="text-gray-500 text-xs italic truncate">{branch.description}</div>}
        </div>
      ))}

      {/* Default Branch - Always visible */}
      <div className="text-xs bg-gray-50 rounded-lg p-3">
        <div className="absolute right-0 mt-4">
          <NodeHandle
            variant="branch"
            key={`branch-default`}
            type="source"
            position={Position.Right}
            id={`branch-default`}
            className="w-3 h-3 bg-cyan-400 border-2 border-white hover:bg-cyan-500 transition-colors"
          // style={{ top: `${150 + index * 100}px` }}
          />
        </div>
        {/* Default Branch Label Row */}
        <div className="flex items-center mb-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
          <span className="font-medium text-gray-600 truncate">
            {data.rightSideData.defaultBranch?.label || "Default Branch"}
          </span>
        </div>

        {/* Default Branch Description */}
        {data.rightSideData.defaultBranch?.description && (
          <div className="text-gray-500 text-xs italic truncate">{data.rightSideData.defaultBranch.description}</div>
        )}
      </div>
    </div>
  )

  return (
    <BaseNode
      {...props}
      icon={GitBranch}
      color="bg-cyan-500"
      backgroundColor="bg-white border-cyan-200"
      bodyWidth="w-80"
      handles={handles}
      header={
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900 truncate">
              {data.label}
            </h3>
          </div>

          <p className="text-sm text-gray-600 mt-1 leading-relaxed">{data.description}</p>
        </div>}
    >
      {content}

    </BaseNode>
  )
}

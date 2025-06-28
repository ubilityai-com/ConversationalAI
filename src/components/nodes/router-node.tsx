"use client"
import { Handle, Node, Position, type NodeProps } from "@xyflow/react";
import { GitBranch } from "lucide-react";
import { useState } from "react";
import { AgentPaletteDialog } from "../agent-palette-dialog";
import { BaseNode } from "./base-node";
import { NodeHandle } from "./node-handle";
import { cn } from "../../lib/utils";
export interface RouterDefaultBranch {
  name: string
  description: string
}
export interface RouterBranch {
  id: string
  name: string
  description: string
  operatorType: "value" | "variable" | "expression"
  firstOperator: string
  secondOperator: string
  checkType:
  | "equals"
  | "not_equals"
  | "greater_than"
  | "less_than"
  | "greater_equal"
  | "less_equal"
  | "contains"
  | "not_contains"
  | "starts_with"
  | "ends_with"
  | "regex"
  | "is_empty"
  | "is_not_empty"
}
export interface RouterConfig extends Record<string, unknown> {
  label: string
  description: string
  nodeType: string
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
  const [showPaletteDialog, setShowPaletteDialog] = useState(false)

  const handles = (
    <>
      {(data.rightSideData.branches || []).map((branch: any, index: number) => (
        <NodeHandle
          key={`branch-${index}`}
          type="source"
          position={Position.Right}
          id={`branch-${index}`}
          className="w-3 h-3 bg-cyan-400 border-2 border-white hover:bg-cyan-500 transition-colors"
          style={{ top: `${30 + index * 25}%` }}
        />
      ))}
      {/* Default branch handle */}
      <NodeHandle
        type="source"
        position={Position.Right}
        id="default"
        className="w-3 h-3 bg-gray-400 border-2 border-white hover:bg-gray-500 transition-colors"
        style={{ top: `${30 + ((data.rightSideData.branches || []).length) * 25}%` }}
      />
    </>
  )

  const content = (
    <div className="mt-4 space-y-2">
      {/* Conditional branches */}
      {(data.rightSideData.branches || []).map((branch: any, index: number) => (
        <div key={index} className="text-xs bg-cyan-50 rounded-lg p-3">
          {/* Branch Label Row */}
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2 flex-shrink-0"></div>
            <span className="font-medium text-cyan-700 truncate">{branch.name || `Branch ${index + 1}`}</span>
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
        {/* Default Branch Label Row */}
        <div className="flex items-center mb-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
          <span className="font-medium text-gray-600 truncate">
            {data.rightSideData.defaultBranch?.name || "Default Branch"}
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
      header={<div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {data.label}
          </h3>
        </div>

        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{data.description}</p>
      </div>}
    >
      <NodeHandle
        type="target"
        position={Position.Left}
        className={cn("w-4 h-4 bg-gray-400 border-2 border-white hover:bg-gray-500 transition-colors")}
      />
      {handles}
      {content}
      <AgentPaletteDialog
        open={showPaletteDialog}
        onOpenChange={setShowPaletteDialog}
      />
    </BaseNode>
  )
}

"use client"
import { Node, Position, type NodeProps } from "@xyflow/react";
import { CheckSquare, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { AgentPaletteDialog } from "../agent-palette-dialog";
import { Button } from "../ui/button";
import { BaseNode } from "./base-node";
import { NodeHandle } from "./node-handle";
interface Choice {
  id: string
  label: string
}

interface FormNodeData extends Record<string, unknown> {
  label: string
  description: string
  nodeType: string
  rightSideData: {
    choices?: Choice[],
    botSays: string,
    save: boolean;
    variableName: string;
    loopFromSwitch: boolean;
    loopFromName: string
  }

}

export function ChoiceNode(props: NodeProps<Node<FormNodeData>>) {
  const { data } = props
  console.log({ data });
  const [showPaletteDialog, setShowPaletteDialog] = useState(false)

  const handles = (
    <>
      {(data.rightSideData.choices || []).map((choice: any, index: number) => (
        <>
          {/* Simple Add Node Button with connecting line */}
          {data.nodeType !== "output" && data.nodeType !== "end" && (
            <div className="absolute  transform -translate-y-1/2 flex items-center justify-start" style={{ left: "100%", top: `${52 + index * 20}%` }}>
              {/* Animated connecting line - horizontal */}
              <div className="h-0.5 w-8 bg-gradient-to-r from-blue-400 to-transparent relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-pulse"></div>
              </div>
              <div className="flex items-center">
                <Button
                  size="sm"
                  className="w-10 h-10 p-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg border-2 border-white transition-all duration-300 hover:scale-110 hover:shadow-xl group relative overflow-hidden"
                  onClick={() => setShowPaletteDialog(true)}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Plus className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:rotate-90" />

                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 group-active:animate-ping"></div>
                </Button>
              </div>
            </div>
          )}
          <NodeHandle
            key={`choice-${choice.id}`}
            type="source"
            position={Position.Right}
            id={`choice-${choice.id}`}
            className="w-3 h-3 bg-pink-400 border-2 border-white hover:bg-pink-500 transition-colors"
          />
        </>
      ))}
    </>
  )

  const content =
    data.rightSideData.choices && data.rightSideData.choices.length > 0 ? (
      <div className="mt-4 space-y-2">
        {data.rightSideData.choices.map((choice: any, index: number) => (
          <div key={index} className="flex items-center text-xs bg-pink-50 rounded-lg p-3">
            <>
              {/* Simple Add Node Button with connecting line */}
              {data.nodeType !== "output" && data.nodeType !== "end" && (
                <div>
                  <div className="absolute  transform flex items-center justify-start" style={{ right: "-25%", top: `${130 + (index * 50)}px` }}>
                    {/* Animated connecting line - horizontal */}
                    <div className="h-0.5 w-8 bg-gradient-to-r from-blue-400 to-transparent relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-pulse"></div>
                    </div>
                    <div className="flex items-center">
                      <Button
                        size="sm"
                        className="w-10 h-10 p-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg border-2 border-white transition-all duration-300 hover:scale-110 hover:shadow-xl group relative overflow-hidden"
                        onClick={() => setShowPaletteDialog(true)}
                      >
                        {/* Animated background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Plus className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:rotate-90" />

                        {/* Ripple effect */}
                        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 group-active:animate-ping"></div>
                      </Button>
                    </div>
                  </div>
                  <NodeHandle
                    key={`choice-${choice.id}`}
                    type="source"
                    position={Position.Right}
                    id={`choice-${choice.id}`}
                    className="w-3 h-3 bg-pink-400 border-2 border-white hover:bg-pink-500 transition-colors"
                    style={{
                      top: `${130 + (index * 50)}px`,
                      right: "-6%",
                    }}
                  />
                </div>
              )}

            </>
            <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
            <span className="font-medium text-pink-700 mr-2 truncate">{choice.label}</span>
          </div>
        ))}
      </div>
    ) : null

  return (
    <BaseNode
      {...props}
      icon={CheckSquare}
      color="bg-pink-500"
      backgroundColor="bg-white border-pink-200"
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
      {/* Content */}

      {content}
      <AgentPaletteDialog
        open={showPaletteDialog}
        onOpenChange={setShowPaletteDialog}
      />
    </BaseNode >
  )
}

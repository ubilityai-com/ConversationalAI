import { Handle, Position, useStore, type Node, type NodeProps } from "@xyflow/react"
import { Play, Plus } from "lucide-react"
import { useState } from "react"
import { cn } from "../../lib/utils"
import { AgentPaletteDialog } from "../agent-palette-dialog"
import { Button } from "../ui/button"
import { BaseNode, type BaseNodeData } from "./base-node"
import { NodeHandle } from "./node-handle"

export function InputNode(props: NodeProps<Node<BaseNodeData>>) {
  const data = props.data
  const type = props.type
  const [isHovered, setIsHovered] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [showPaletteDialog, setShowPaletteDialog] = useState(false)
  const isConnected = useStore((state) =>
    state.edges.some(edge => edge.source === props.id)
  )
  return (
    <BaseNode icon={Play} color="bg-green-500" backgroundColor="bg-white border-green-200" {...props} header={<div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900 truncate">
          {data.label}
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">START</span>
        </h3>
      </div>

      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{data.description}</p>
    </div>} >
      {/* Simple Add Node Button with connecting line */}
      {data.nodeType !== "output" && data.nodeType !== "end" && !isConnected && (
        <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-start" style={{ left: "100%" }}>
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
      {/* <Handle
        type="source"
        position={Position.Right}
        className={cn("w-4 h-4 bg-gray-400 border-2 border-white hover:bg-gray-500 transition-colors")}
      /> */}
      <NodeHandle
        type="source"
        position={Position.Right}
        className={cn("w-4 h-4 bg-gray-400 border-2 border-white hover:bg-gray-500 transition-colors")}

      />
      {/* Content */}
      <AgentPaletteDialog
        open={showPaletteDialog}
        onOpenChange={setShowPaletteDialog}
      />
    </BaseNode>)
}


import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"
import { MessageSquare } from "lucide-react"
import { useState } from "react"
import { cn } from "../../lib/utils"
import { BaseNode, type BaseNodeData } from "./index"
import { NodeHandle } from "./node-handle"

export function EndNode(props: NodeProps<Node<BaseNodeData>>) {
  const data = props.data
  const type = props.type
  const [isHovered, setIsHovered] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  return (
    <BaseNode icon={MessageSquare} color="bg-red-500" backgroundColor="bg-white border-red-200" {...props} header={<div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900 truncate">
          {data.label}
        </h3>
      </div>

      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{data.description}</p>
    </div>} >
      <NodeHandle
        type="target"
        position={Position.Left}
        className={cn("w-4 h-4 bg-gray-400 border-2 border-white hover:bg-gray-500 transition-colors")}
      />
      {/* Content */}
    </BaseNode>)
}

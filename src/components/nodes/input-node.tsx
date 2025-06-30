import { type Node, type NodeProps } from "@xyflow/react"
import { Play } from "lucide-react"
import { BaseNode, type BaseNodeData } from "./base-node"

export function InputNode(props: NodeProps<Node<BaseNodeData>>) {
  const data = props.data
  return (
    <BaseNode icon={Play} color="bg-green-500" backgroundColor="bg-white border-green-200" {...props}
      header={<div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {data.label}
            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">START</span>
          </h3>
        </div>

        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{data.description}</p>
      </div>} >
    </BaseNode>)
}

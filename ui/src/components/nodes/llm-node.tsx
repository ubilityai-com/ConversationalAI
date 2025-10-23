
import { Node, NodeProps } from "@xyflow/react"
import { Bot } from "lucide-react"
import { BaseNode } from "./index"

export function LlmNode(props: NodeProps<Node<any>>) {
  const data = props.data
  return <BaseNode bodyWidth="w-80" {...props} icon={Bot} color={data.color} backgroundColor="bg-white border-purple-200" header={<div className="flex-1 min-w-0">
    <div className="flex items-center justify-between bg-">
      <h3 className="text-base w- font-semibold text-gray-900 truncate">
        {data.label}
      </h3>
    </div>
    <p className="text-sm text-gray-600 mt-1 leading-relaxed truncate">{data.description}</p>
  </div>} />
}

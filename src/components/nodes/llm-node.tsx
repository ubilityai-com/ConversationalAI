"use client"
import { Node, NodeProps } from "@xyflow/react"
import { Bot } from "lucide-react"
import { BaseNode } from "./base-node"

export function LlmNode(props: NodeProps<Node<any>>) {
  const data = props.data
  return <BaseNode {...props} icon={Bot} color="bg-purple-500" backgroundColor="bg-white border-purple-200" header={<div className="flex-1 min-w-0">
    <div className="flex items-center justify-between">
      <h3 className="text-base font-semibold text-gray-900 truncate">
        {data.label}
      </h3>
    </div>
    <p className="text-sm text-gray-600 mt-1 leading-relaxed truncate">{data.description}</p>
  </div>} />
}

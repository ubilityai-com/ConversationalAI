import { Node, NodeProps } from "@xyflow/react"
import { Bot } from "lucide-react"
import { BaseNode } from "./index"

export function IntegrationNode(props: NodeProps<Node<any>>) {
  const data = props.data
  const { label, description, color, category } = data

  return <BaseNode {...props} icon={null} color={color} category={category} backgroundColor="bg-white border-purple-200" header={<div className="flex-1 min-w-0">
    <div className="flex items-center justify-between">
      <h3 className="text-base font-semibold text-gray-900 truncate">
        {label}
      </h3>
    </div>
    <p className="text-sm text-gray-600 mt-1 leading-relaxed truncate">{description}</p>
  </div>} />
}

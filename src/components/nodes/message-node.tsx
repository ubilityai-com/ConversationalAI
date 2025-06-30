import { Node, NodeProps } from "@xyflow/react"
import { MessageCircle } from "lucide-react"
import { BaseNode } from "./base-node"
interface Data extends Record<string, unknown> {
  label: string
  description: string
  nodeType: string
  rightSideData: {
    botSays?: string;
    advanced?: boolean;
    regex?: boolean;
    errorMessage?: string;
    save?: boolean;
    variableName?: string;
  }
}
export function MessageNode(props: NodeProps<Node<Data>>) {
  const data = props.data
  return (
    <BaseNode {...props} icon={MessageCircle} color="bg-emerald-500" backgroundColor="bg-white border-emerald-200"
      header={<div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {data.label}
          </h3>
        </div>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed truncate">{data.rightSideData.botSays}</p>
      </div>} >

    </BaseNode>)
}

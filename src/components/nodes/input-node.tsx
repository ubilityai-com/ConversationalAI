import { type Node, type NodeProps } from "@xyflow/react"
import { Play } from "lucide-react"
import { BaseNode, type BaseNodeData } from "./base-node"

export function InputNode(props: NodeProps<Node<BaseNodeData>>) {
  const data = props.data
  return (
    <BaseNode icon={Play} color="bg-green-500" backgroundColor="bg-white border-green-200" {...props}
      header={
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 min-w-0">
              <span className="truncate min-w-0 flex-1">{data.label}</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full whitespace-nowrap">
                START
              </span>
            </h3>
          </div>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed whitespace-normal break-words line-clamp-2">
            {data.description}
          </p>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed whitespace-normal break-words line-clamp-2">
            {data.rightSideData.greet}
          </p>

        </div>
      } >
    </BaseNode>
  )
}

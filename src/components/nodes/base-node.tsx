import { Node, NodeProps, Position } from "@xyflow/react"
import React, { useState } from "react"
import { cn } from "../../lib/utils"
import { useFlowStore } from "../../store/flow-store"
import { NodeHandle } from "../handles/handle"

export type BaseNodeData<T = Record<string, any>> = {
  label: string
  description: string
  nodeType: string
  rightSideData: T
}

export type BaseNodeProps = NodeProps<Node<BaseNodeData>> & {
  icon: React.ComponentType<{ className?: string }>
  color: string
  backgroundColor: string
  children?: React.ReactNode
  header?: React.ReactNode
  handles?: React.ReactNode
  bodyWidth?: string
}

export function BaseNode({
  id,
  icon: IconComponent,
  color,
  backgroundColor,
  children,
  header,
  handles,
  type,
  data,
  bodyWidth = "w-64",
}: BaseNodeProps) {
  const [isRunning, setIsRunning] = useState(false)
  const clickedElement = useFlowStore(state => state.clickedElement)
  const nodesValidation = useFlowStore(state => state.nodesValidation)
  const workflowRunning = false
  const isSelected = clickedElement?.id === id
  const isStartNode = type === "Handler"
  const isEndNode = type === "End"
  const isNodeValid = nodesValidation[id]
  console.log({isNodeValid,type});
  



  // Simulate node execution during workflow run
  React.useEffect(() => {
    if (workflowRunning && !isRunning) {
      const delay = isStartNode ? 0 : Math.random() * 2000 + 500
      const timer = setTimeout(() => {
        setIsRunning(true)
        setTimeout(() => setIsRunning(false), 1000)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [workflowRunning, isRunning, isStartNode])

  return (
    <>
      <div
        className={`relative ${isSelected ? "z-20" : "z-10"}`}
      >
        {/* Input handle - hide for start node */}
        {!isStartNode && <NodeHandle
          type="target"
          position={Position.Left}
          className={cn("w-4 h-4 bg-gray-400 border-2 border-white hover:bg-gray-500 transition-colors")}


        />}
        {/* Output handle */}
        {handles ??
          (!isEndNode && <NodeHandle
            type="source"
            position={Position.Right}
            className={cn("w-4 h-4 bg-gray-400 border-2 border-white hover:bg-gray-500 transition-colors")}
          />)
        }


        {/* Node body */}
        <div
          className={`
            ${bodyWidth} bg-white rounded-2xl shadow-lg border-2 transition-all duration-200 cursor-pointer ${isSelected ? "border-blue-400 shadow-xl ring-4 ring-blue-100" : `${backgroundColor} hover:shadow-xl`
            }`}
        >
          <div className={`p-4 bg-white ${backgroundColor} rounded-2xl relative`}>
            {/* Running indicator */}
            {(isRunning || workflowRunning) && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm">
                <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            )}

            <div className="flex items-start space-x-4">
              {/* Icon circle */}
              <div
                className={`w-12 h-12 ${color} rounded-full flex items-center justify-center shadow-md flex-shrink-0`}
              >
                {type === "attache" ? (
                  <img src="/images/attache-logo.png" alt="Attache" className="w-7 h-7 object-contain" />
                ) : (
                  <IconComponent className="w-6 h-6 text-white" />
                )}
              </div>

              {header}
            </div>
            {/* Custom content */}
            {children}


            {/* Status indicator */}
            <div className="flex items-center mt-3">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${!isNodeValid?"bg-red-500":isRunning ? "bg-green-500 animate-pulse" : workflowRunning ? "bg-yellow-500" : "bg-gray-300"
                  }`}
              ></div>
              <span className="text-xs text-gray-500 font-medium">
                {!isNodeValid?"Missing config":isRunning ? "Running" : workflowRunning ? "Waiting" : "Ready"}
              </span>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

import { Node, NodeProps } from "@xyflow/react"
import { Plus } from "lucide-react"
import React, { useState } from "react"
import { useFlowStore } from "../../store/flow-store"
import { AgentPaletteDialog } from "../agent-palette-dialog"
import { Button } from "../ui/button"

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
  bodyWidth?: string
}

export function BaseNode({
  id,
  icon: IconComponent,
  color,
  backgroundColor,
  children,
  header,
  type,
  bodyWidth = "w-64"
}: BaseNodeProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [showPaletteDialog, setShowPaletteDialog] = useState(false)
  // const { deleteNode, selectNode, selectedNode, isRunning: workflowRunning, addNode,  } = useWorkflow()
  const edges = useFlowStore(state => state.edges)
  const clickedElement = useFlowStore(state => state.clickedElement)
  const workflowRunning = false
  const isSelected = clickedElement?.id === id
  const isStartNode = type === "handler"

  // Check if this node has any outgoing connections
  const hasOutgoingConnection = edges.some((connection) => connection.source === id)

  const handleDelete = (e: React.MouseEvent) => {
    // e.stopPropagation()
    // if (!isStartNode) {
    //   deleteNode(id)
    // }
  }

  const handleAddNode = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPaletteDialog(true)
  }

  const handleNodeSelection = (agentType: any) => {
    // const newPosition = {
    //   x: xPos,
    //   y: yPos + 150,
    // }

    // addNode({
    //   type: agentType.type,
    //   position: newPosition,
    //   data: {
    //     label: agentType.label,
    //     description: agentType.description,
    //     config: {},
    //   },
    // })

    // setShowPaletteDialog(false)
  }

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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

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
                className={`w-2 h-2 rounded-full mr-2 ${isRunning ? "bg-green-500 animate-pulse" : workflowRunning ? "bg-yellow-500" : "bg-gray-300"
                  }`}
              ></div>
              <span className="text-xs text-gray-500 font-medium">
                {isRunning ? "Running" : workflowRunning ? "Waiting" : "Ready"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Palette Dialog */}
      {/* <AgentPaletteDialog
        open={showPaletteDialog}
        onOpenChange={setShowPaletteDialog}
        onSelectAgent={handleNodeSelection}
      /> */}
    </>
  )
}

import { useCallback } from "react"
import type { ReactFlowInstance } from "@xyflow/react"
import { createNodeFromConnector, createEdge } from "../lib/utils/node-factory"
import { NODE_POSITION_OFFSET, CLICK_ELEMENT_DELAY } from "../lib/constants/connector-constants"
import type { ConnectorType } from "../types/connector-types"

interface UseNodeCreationProps {
  reactFlowInstance: ReactFlowInstance | null
  source: string
  sourceHandle: string
  addNodesValidation: (nodeId: string, isValid: boolean) => void
  setClickedElement: (element: any) => void
  setIsFormDialogOpen: (open: boolean) => void
}

export const useNodeCreation = ({
  reactFlowInstance,
  source,
  sourceHandle,
  addNodesValidation,
  setClickedElement,
  setIsFormDialogOpen,
}: UseNodeCreationProps) => {
  const addNodeToFlow = useCallback(
    (connector: ConnectorType, x: number, y: number) => {
      if (!reactFlowInstance) {
        return
      }

      try {
        const sourceNode = reactFlowInstance.getNode(source)

        const position = {
          x: (sourceNode?.position.x || 0) + NODE_POSITION_OFFSET,
          y: sourceNode?.position.y || 0,
        }

        const newElement = createNodeFromConnector(connector, position, connector.notTestable)

        reactFlowInstance.addNodes(newElement)

        if (connector.type !== "StickyNote") {
          const edge = createEdge(source, newElement.id, sourceHandle)
          reactFlowInstance.addEdges(edge)

          setClickedElement(null)
          setTimeout(() => {
            setClickedElement(newElement)
          }, CLICK_ELEMENT_DELAY)
        }

        addNodesValidation(newElement.id, connector.defaultValid ?? false)

        setIsFormDialogOpen(false)
      } catch (error) {
        console.error("Error creating node:", error)
      }
    },
    [reactFlowInstance, source, sourceHandle, addNodesValidation, setClickedElement, setIsFormDialogOpen],
  )

  return { addNodeToFlow }
}

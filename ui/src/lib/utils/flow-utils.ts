import type { Edge } from "@xyflow/react"
import { useFlowStore } from "../../store/root-store"
import type { Node } from "../../store/slices/flow-slice"

/**
 * Flow and graph navigation utility functions
 */

/**
 * Gets the next node ID in the flow based on edges
 */
export function getNextNodeId(nodeId: string, edges: Edge[], nodes: Node[], handleId?: string | null): string | null {
  const foundEdge = edges.find((edge) => edge.source === nodeId && (!handleId || edge.sourceHandle === handleId))

  if (!foundEdge) return null

  const nextNode = nodes.find((node) => node.id === foundEdge.target)

  return nextNode?.type === "End" ? null : foundEdge.target
}

/**
 * Gets all previous nodes in the flow using DFS
 */
export function getAllPreviousNodes(nodeId: string): string[] {
  const edges = useFlowStore.getState().reactFlowInstance?.getEdges() || []
  const visited = new Set<string>()
  const result: string[] = []

  function dfs(currentId: string) {
    if (visited.has(currentId)) return
    visited.add(currentId)

    const incomingEdges = edges.filter((edge) => edge.target === currentId)

    for (const edge of incomingEdges) {
      const sourceId = edge.source
      result.push(sourceId)
      dfs(sourceId)
    }
  }

  dfs(nodeId)

  return [...new Set(result)]
}

/**
 * Generates a unique name for a node based on existing nodes
 */
export function generateUniqueName(type: string, label?: string): string {
  const nodes = useFlowStore.getState().nodes
  const namesOfType = nodes.filter((n) => n.type === type).map((n) => n.data.label)
  const baseName = label ?? type

  if (!namesOfType.includes(baseName)) return baseName

  let counter = 1
  let candidate = `${baseName} ${counter}`

  while (namesOfType.includes(candidate)) {
    counter++
    candidate = `${baseName} ${counter}`
  }

  return candidate
}

/**
 * Checks if all nodes in the flow have their required connections
 */
export function handleFlowZoneCheckIfAllHandlesAreConnected(): boolean {
    const { nodes, edges } = useFlowStore.getState()
  
    let allAreConnected = true
  
    nodes.forEach((element) => {
      if (element.type === "Handler") {
        const isDefaultSource = edges.find((edge) => element.id === edge.source && edge.sourceHandle === "0")
  
        if (!isDefaultSource) {
          allAreConnected = false
        }
      } else if (element.type === "Message") {
        const isDefaultSource = edges.find((edge) => element.id === edge.source && edge.sourceHandle === "0")
  
        if (!isDefaultSource) {
          allAreConnected = false
        }
  
        const isTarget = edges.find((edge) => element.id === edge.target)
  
        if (!isTarget) {
          allAreConnected = false
        }
      } else if (element.type === "ChoicePrompt") {
        const isDefaultSource = edges.find((edge) => element.id === edge.source && edge.sourceHandle === "0")
  
        if (!isDefaultSource) {
          allAreConnected = false
        }
  
        const isTarget = edges.find((edge) => element.id === edge.target)
  
        if (!isTarget) {
          allAreConnected = false
        }
      }
    })
  
    return allAreConnected
  }
  
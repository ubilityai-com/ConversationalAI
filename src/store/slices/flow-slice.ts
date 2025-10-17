import {
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  getConnectedEdges,
  type Node as N,
  type ReactFlowInstance,
} from "@xyflow/react"
import { v4 } from "uuid"
import type { StateCreator } from "zustand"
import { generateUniqueName } from "../../lib/utils/flow-utils"
import { FlowStore } from "../root-store"

export type Node = Omit<N, 'type'> & {
  type: string;
};


export interface FlowSlice {
  // Flow instance
  reactFlowInstance: ReactFlowInstance | null
  setReactFlowInstance: (instance: ReactFlowInstance) => void

  // Clicked element
  clickedElement: any | null
  setClickedElement: (element: any | null) => void

  // Nodes and edges
  nodes: Node[]
  setNodes: (value: Node[] | ((prev: Node[]) => Node[])) => void
  applyNodeChangesFunc: (changes: any) => void

  edges: Edge[]
  setEdges: (value: Edge[] | ((prev: Edge[]) => Edge[])) => void
  applyEdgeChangesFunc: (changes: any) => void

  // Node operations
  deleteNode: (id: string) => void
  duplicateNode: (id: string) => void

  updateNodeRightSideData: (id: string, value: any) => void
  updateNodeRightSideDataNestedKey: (id: string, value: any) => void
}

export const createFlowSlice: StateCreator<FlowStore, [], [], FlowSlice> = (set, get) => ({
  // Flow instance
  reactFlowInstance: null,
  setReactFlowInstance: (instance) => set({ reactFlowInstance: instance }),

  // Clicked element
  clickedElement: null,
  setClickedElement: (element) => set({ clickedElement: element }),

  // Nodes and edges
  nodes: [],
  setNodes: (valueOrUpdater) =>
    set((state) => ({
      nodes: typeof valueOrUpdater === "function" ? valueOrUpdater(state.nodes) : valueOrUpdater,
    })),

  applyNodeChangesFunc: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),

  edges: [],
  setEdges: (valueOrUpdater) =>
    set((state) => ({
      edges: typeof valueOrUpdater === "function" ? valueOrUpdater(state.edges) : valueOrUpdater,
    })),

  applyEdgeChangesFunc: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  // Node operations
  deleteNode: (id) =>
    set((state) => {
      const nodes = state.nodes
      const edges = state.edges

      const removeNodeAndEdges = (id: string, nodes: Node[], edges: Edge[]) => {
        const connectedEdges = getConnectedEdges([{ id, data: {}, position: { x: 12, y: 121 } }], edges)
        const updatedNodes = nodes.filter((n) => n.id !== id)
        const updatedEdges = edges.filter((e) => !connectedEdges.some((ce) => ce.id === e.id))

        return { nodes: updatedNodes, edges: updatedEdges }
      }

      const { nodes: updatedNodes, edges: updatedEdges } = removeNodeAndEdges(id, nodes, edges)

      // Call other slice methods
      state.deleteNodesValidationById?.(id)
      state.deleteVariableByNodeId?.(id)
      state.removeNodeState?.(id)

      const newClickedElement = state.clickedElement?.id === id ? null : state.clickedElement

      return {
        nodes: updatedNodes,
        edges: updatedEdges,
        clickedElement: newClickedElement,
        isRightOpen: false,
      }
    }),

  duplicateNode: (id) =>
    set((state: any) => {
      const idToDuplicate = v4()
      let nodeToDuplicate = state.nodes.find((node: Node) => node.id === id)

      if (!nodeToDuplicate) return state

      nodeToDuplicate = {
        ...nodeToDuplicate,
        id: idToDuplicate,
        position: {
          x: nodeToDuplicate.position.x + 150,
          y: nodeToDuplicate.position.y + 150,
        },
        selected: false,
        data: {
          ...nodeToDuplicate.data,
          label: generateUniqueName(nodeToDuplicate.type),
        },
      }

      return {
        nodes: [...state.nodes, nodeToDuplicate],
        nodesValidation: {
          ...state.nodesValidation,
          [idToDuplicate]: state.nodesValidation?.[id],
        },
      }
    }),

  updateNodeRightSideData: (id, value) => {
    const { reactFlowInstance } = get()
    reactFlowInstance?.updateNodeData(id, value)
  },

  updateNodeRightSideDataNestedKey: (id, value) => {
    const state = get() as any
    const { nodes, reactFlowInstance } = state
    const elementsIndex = nodes.findIndex((element: Node) => element.id === id)

    if (elementsIndex === -1) return

    const newArray = [...nodes]
    let newRightSideData = { ...newArray[elementsIndex].data.rightSideData }
    newRightSideData = { ...newRightSideData, ...value }

    reactFlowInstance?.updateNodeData(id, newRightSideData)
  },
})

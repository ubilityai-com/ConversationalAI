import type { StateCreator } from "zustand"

interface ModelData {
  provider: string
  credential: string
  model: string
  credType: string
  url: string
  models: []
  apiVersion: string
}

export interface NodeStatesSlice {
  // Node states
  nodeStates: Record<string, string>
  setNodeStates: (nodeStates: Record<string, string>) => void
  addNodeState: (nodeId: string, description: string) => void
  updateNodeState: (nodeId: string, description: string) => void
  removeNodeState: (nodeId: string) => void
  clearNodeStates: () => void

  // Model data
  modelData: ModelData
  setModelData: (data: Partial<ModelData>) => void
}

export const createNodeStatesSlice: StateCreator<NodeStatesSlice> = (set) => ({
  // Node states
  nodeStates: {},
  setNodeStates: (nodeStates) => set({ nodeStates }),
  addNodeState: (nodeId, description) =>
    set((state) => ({
      nodeStates: { ...state.nodeStates, [nodeId]: description },
    })),
  updateNodeState: (nodeId, description) =>
    set((state) => ({
      nodeStates: { ...state.nodeStates, [nodeId]: description },
    })),
  removeNodeState: (nodeId) =>
    set((state) => {
      const { [nodeId]: _, ...rest } = state.nodeStates
      return { nodeStates: rest }
    }),
  clearNodeStates: () => set({ nodeStates: {} }),

  // Model data
  modelData: {
    provider: "",
    credential: "",
    model: "",
    credType: "",
    url: "",
    models: [],
    apiVersion: "v1",
  },
  setModelData: (data) =>
    set((state) => ({
      modelData: { ...state.modelData, ...data },
    })),
})

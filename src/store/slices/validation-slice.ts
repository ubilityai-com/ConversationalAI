import type { StateCreator } from "zustand"

export interface ValidationSlice {
  nodesValidation: { [key: string]: boolean }
  setNodesValidation: (nodesValidation: { [key: string]: boolean }) => void
  addNodesValidation: (nodeId: string, valid: boolean) => void
  deleteNodesValidationById: (nodeId: string) => void
  updateNodesValidationById: (nodeId: string, valid: boolean) => void
}

export const createValidationSlice: StateCreator<ValidationSlice> = (set) => ({
  nodesValidation: {},

  setNodesValidation: (nodesValidation) => set({ nodesValidation }),

  addNodesValidation: (nodeId, valid) =>
    set((state) => ({
      nodesValidation: { ...state.nodesValidation, [nodeId]: valid },
    })),

  deleteNodesValidationById: (nodeId) =>
    set((state) => {
      const { [nodeId]: _, ...rest } = state.nodesValidation
      return { nodesValidation: rest }
    }),

  updateNodesValidationById: (nodeId, valid) =>
    set((state) => ({
      nodesValidation: { ...state.nodesValidation, [nodeId]: valid },
    })),
})

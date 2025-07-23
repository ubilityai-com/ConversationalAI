import { create, StateCreator } from "zustand";

interface ConstantVariable {
  [key: string]: "string" | "number" | "boolean" | "object" | "array";
}

interface OutputVariables {
  [nodeId: string]: {
    [variableName: string]: string; // path
  };
}

interface DialogueVariables {
  [variableName: string]: string;
}

export interface VariablesSlice {
  constantVariables: ConstantVariable;
  outputVariables: OutputVariables;
  dialogueVariables: DialogueVariables;

  // Constant Variables
  addConstantVariable: (name: string, value: any) => void;
  updateConstantVariable: (name: string, value: any) => void;
  deleteConstantVariable: (name: string) => void;

  // Output Variables
  addOutputVariable: (
    nodeId: string,
    variableName: string,
    path: string
  ) => void;
  updateOutputVariable: (
    nodeId: string,
    variableName: string,
    path: string
  ) => void;
  deleteOutputVariable: (nodeId: string, variableName: string) => void;
  deleteOutputVariablesByNodeId: (nodeId: string) => void;

  // Dialogue Variables
  addDialogueVariable: (
    nodeId: string,
    variableName: string,
    value: any
  ) => void;
  updateDialogueVariable: (nodeId: string, variableName: string) => void;
  deleteDialogueVariable: (nodeId: string, variableName: string) => void;
  deleteDialogueVariablesByNodeId: (nodeId: string) => void;

  // New functions for setting and deleting entire variable sets
  setAllConstantVariables: (variables: ConstantVariable) => void;
  setAllOutputVariables: (variables: OutputVariables) => void;
  setAllDialogueVariables: (variables: DialogueVariables) => void;

  deleteAllConstantVariables: () => void;
  deleteAllOutputVariables: () => void;
  deleteAllDialogueVariables: () => void;

  clearAllVariables: () => void;
}

export const createVariablesSlice: StateCreator<VariablesSlice> = (set) => ({
  constantVariables: {},
  outputVariables: {},
  dialogueVariables: {},

  // Constant Variables
  addConstantVariable: (name, value) =>
    set((state) => ({
      constantVariables: { ...state.constantVariables, [name]: value },
    })),

  updateConstantVariable: (name, value) =>
    set((state) => ({
      constantVariables: { ...state.constantVariables, [name]: value },
    })),

  deleteConstantVariable: (name) =>
    set((state) => {
      const { [name]: _, ...rest } = state.constantVariables;
      return { constantVariables: rest };
    }),

  // Output Variables
  addOutputVariable: (nodeId, variableName, path) =>
    set((state) => ({
      outputVariables: {
        ...state.outputVariables,
        [nodeId]: { ...state.outputVariables[nodeId], [variableName]: path },
      },
    })),

  updateOutputVariable: (nodeId, variableName, path) =>
    set((state) => ({
      outputVariables: {
        ...state.outputVariables,
        [nodeId]: { ...state.outputVariables[nodeId], [variableName]: path },
      },
    })),

  deleteOutputVariable: (nodeId, variableName) =>
    set((state) => {
      const nodeVariables = state.outputVariables[nodeId];
      if (!nodeVariables) return state;
      const { [variableName]: _, ...rest } = nodeVariables;
      return {
        outputVariables: {
          ...state.outputVariables,
          [nodeId]: rest,
        },
      };
    }),

  deleteOutputVariablesByNodeId: (nodeId) =>
    set((state) => {
      const { [nodeId]: _, ...rest } = state.outputVariables;
      return { outputVariables: rest };
    }),

  // Dialogue Variables
  addDialogueVariable: (nodeId, variableName) =>
    set((state) => ({
      dialogueVariables: {
        ...state.dialogueVariables,
        [nodeId]: variableName,
      },
    })),

  updateDialogueVariable: (nodeId, variableName) =>
    set((state) => ({
      dialogueVariables: {
        ...state.dialogueVariables,
        [nodeId]: variableName,
      },
    })),

  deleteDialogueVariable: (nodeId) =>
    set((state) => {
      const nodeVariables = state.dialogueVariables;
      const newDialougueVariables = { ...nodeVariables };
      delete newDialougueVariables[nodeId];
      return {
        dialogueVariables: newDialougueVariables,
      };
    }),

  deleteDialogueVariablesByNodeId: (nodeId) =>
    set((state) => {
      const { [nodeId]: _, ...rest } = state.dialogueVariables;
      return { dialogueVariables: rest };
    }),
  setAllConstantVariables: (variables) => set({ constantVariables: variables }),
  setAllOutputVariables: (variables) => set({ outputVariables: variables }),
  setAllDialogueVariables: (variables) => set({ dialogueVariables: variables }),

  deleteAllConstantVariables: () => set({ constantVariables: {} }),
  deleteAllOutputVariables: () => set({ outputVariables: {} }),
  deleteAllDialogueVariables: () => set({ dialogueVariables: {} }),

  clearAllVariables: () =>
    set({
      constantVariables: {},
      outputVariables: {},
      dialogueVariables: {},
    }),
});

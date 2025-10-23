import { FlowStore, useFlowStore } from "../../../store/root-store";

export const useNodeState = (id: string) => {
  return useFlowStore((state: FlowStore) => state.nodeStates?.[id]);
};

export const useNodeValidation = (id: string) => {
  return useFlowStore((state: FlowStore) => state.nodesValidation?.[id]);
};

export const useNodeRunningState = (id: string) => {
  return useFlowStore((state: FlowStore) => ({
    isRunning: state.runningNodeIds.has(id) || false,
    // Add other workflow-related state here
  }));
};

export const useNodeSelection = (id: string) => {
  return useFlowStore((state: FlowStore) => state.clickedElement?.id === id);
};

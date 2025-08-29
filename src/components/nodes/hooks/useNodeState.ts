import { FlowState, useFlowStore } from "../../../store/flow-store";

export const useNodeState = (id: string) => {
  return useFlowStore((state: FlowState) => state.nodeStates?.[id]);
};

export const useNodeValidation = (id: string) => {
  return useFlowStore((state: FlowState) => state.nodesValidation?.[id]);
};

export const useWorkflowStatus = (id: string) => {
  return useFlowStore((state: FlowState) => ({
    isRunning: state.runningNodeIds.has(id) || false,
    // Add other workflow-related state here
  }));
};

export const useNodeSelection = (id: string) => {
  return useFlowStore((state: FlowState) => state.clickedElement?.id === id);
};

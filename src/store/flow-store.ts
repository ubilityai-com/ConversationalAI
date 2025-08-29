import {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  getConnectedEdges,
  Node,
  type ReactFlowInstance,
} from "@xyflow/react";
import axios from "axios";
import { v4 } from "uuid";
import { create } from "zustand";
import { camelToDashCase } from "../lib/utils";
import {
  replaceVariablesInObject,
  VariableReplacementError,
} from "../lib/variable-replacement";
import { ChatbotSlice, createChatbotSlice } from "./chatbot-store";
import { useFilesStore } from "./files-store";
import { createVariablesSlice, VariablesSlice } from "./variables-store";

type SubNodesValidation = {
  [parentId: string]: {
    valid: boolean;
    subs: { [subId: string]: boolean };
  };
};
export interface WorkflowVariable {
  id: string;
  origin: string;
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array";
  value: any;
  description?: string;
  category: VariableCategory;
  createdAt: Date;
  updatedAt: Date;
}

export type VariableCategory = "ai" | "dialogue" | "global";
type SlicesStates = VariablesSlice & ChatbotSlice;
export interface FlowState extends SlicesStates {
  fieldRefs: { [key: string]: HTMLElement | null };
  setFieldRef: (key: string, ref: HTMLElement | null) => void;

  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  blurTimeoutRef: NodeJS.Timeout | null;
  setBlurTimeoutRef: (timeout: NodeJS.Timeout | null) => void;
  variables: WorkflowVariable[];
  variablesPickerVisible: boolean;
  selectedOutputOrVariable: string | null;
  setSelectedOutputOrVariable: (name: string | null) => void;
  isPopoverInteracting: boolean;
  setIsPopoverInteracting: (open: boolean) => void;
  setVarPicker: (value: boolean) => void;
  varPickerProps: { allowedNodeIds: string[] } | null;
  setVarPickerProps: (props: { allowedNodeIds: string[] } | null) => void;

  // Flow instance
  reactFlowInstance: ReactFlowInstance | null;
  setReactFlowInstance: (instance: ReactFlowInstance) => void;

  // Theme
  theme: boolean;
  toggleTheme: () => void;

  // Elements
  droppedElement: any | null;
  setDroppedElement: (element: any | null) => void;

  clickedElement: any | null;
  setClickedElement: (element: any | null) => void;

  flowZoneSelectedManyElement: any[];
  setFlowZoneSelectedManyElement: (elements: any[]) => void;

  zoomAndMoveValues: { x: number; y: number; zoom: number };
  setZoomAndMoveValues: (values: {
    x: number;
    y: number;
    zoom: number;
  }) => void;

  // Nodes and edges
  nodes: any[];
  setNodes: (value: Node[] | ((prev: Node[]) => Node[])) => void;
  applyNodeChangesFunc: (changes: any) => void;

  edges: any[];
  setEdges: (value: Edge[] | ((prev: Edge[]) => Edge[])) => void;

  nodesValidation: { [key: string]: boolean };

  addNodesValidation: (nodeId: string, valid: boolean) => void;
  setNodesValidation: (nodesValidation: { [key: string]: boolean }) => void;
  deleteNodesValidationById: (nodeId: string) => void;
  updateNodesValidationById: (nodeId: string, valid: boolean) => void;

  subNodesValidation: SubNodesValidation;

  // Set the entire validation object
  setSubNodesValidation: (data: SubNodesValidation) => void;

  // Add or update a sub-node validation
  addSubNodeValidation: (
    parentId: string,
    subId: string,
    valid: boolean
  ) => void;

  // Delete all validation under a parent node
  deleteSubNodesValidationById: (parentId: string) => void;

  // Delete a specific sub-node only
  deleteSubNodeById: (parentId: string, subId: string) => void;

  // Update a sub-node validation
  updateSubNodeValidationById: (
    parentId: string,
    subId: string,
    valid: boolean
  ) => void;

  applyEdgeChangesFunc: (changes: any) => void;
  deleteNode: (id: string) => void;
  duplicateNode: (id: string) => void;

  // User and authentication
  userData: any;
  setUserData: (data: any) => void;

  authToken: string | boolean;
  setAuthToken: (token: string | boolean) => void;

  // Bot data
  updatingBot: any;
  setUpdatingBot: (bot: any) => void;

  isLoadingBot: boolean;
  setIsLoadingBot: (loading: boolean) => void;

  IDOnSelectionContextMenu: string;
  setIDOnSelectionContextMenu: (id: string) => void;

  flow: any;
  setFlow: (flow: any) => void;

  formDialogBotName: string;
  setFormDialogBotName: (name: string) => void;

  botType: string;
  setBotType: (type: string) => void;

  variablesNamesOfEachRPA: Record<string, string[]>;
  setVariablesNamesOfEachRPA: (variables: Record<string, string[]>) => void;

  endLoopFromNodesNames: Record<string, string[]>;
  setEndLoopFromNodesNames: (names: Record<string, string[]>) => void;

  // UI state
  isLeftOpen: boolean;
  setIsLeftOpen: (open: boolean) => void;

  isRightOpen: boolean;
  setIsRightOpen: (open: boolean) => void;

  isFormDialogOpen: boolean;
  setIsFormDialogOpen: (open: boolean) => void;

  dialogProps: Record<string, any>;
  setDialogProps: (props: Record<string, any>) => void;

  formDialogStatus: any;
  setFormDialogStatus: (status: any) => void;

  formDialogApplyValues: string;
  setFormDialogApplyValues: (values: string) => void;

  showSnackBarMessage:
  | {
    open: true;
    message: string | null;
    color:
    | "default"
    | "destructive"
    | "success"
    | "warning"
    | "info"
    | null;
    duration: number;
  }
  | {
    open: false;
  };
  setShowSnackBarMessage: (
    message:
      | {
        open: true;
        message: string;
        color: "default" | "destructive" | "success" | "warning" | "info";
        duration: number;
      }
      | {
        open: false;
      }
  ) => void;

  handleFlowZoneCheckIfAllHandlesAreConnected: () => boolean;

  checkIfWebUrlIsEmpty: () => boolean;

  // Data lists
  cards: any[];
  setCards: (cards: any[]) => void;

  rpasList: any[];
  setRpasList: (list: any[]) => void;

  intents: string[];
  setIntents: (intents: string[]) => void;

  entities: string[];
  setEntities: (entities: string[]) => void;

  // Constants
  error: string | null;
  runningNodeIds: Set<string>; // replace single runningNodeId with Set

  testNode: (id: string) => Promise<void>;
  addRunningNodeId: (id: string) => void;
  removeRunningNodeId: (id: string) => void;
  nodeResults: Record<string, any>;
  setNodeResult: (id: string, result: any) => void;
  resetData: () => void;

  nodeStates: Record<string, string>; // nodeId -> description
  setNodeStates: (nodeStates: Record<string, string>) => void;
  addNodeState: (nodeId: string, description: string) => void;
  updateNodeState: (nodeId: string, description: string) => void;
  removeNodeState: (nodeId: string) => void;
  clearNodeStates: () => void;
}
export const useFlowStore = create<FlowState>()((set, get, store) => ({
  ...createVariablesSlice(set, get, store),
  ...createChatbotSlice(set, get, store),
  runningNodeIds: new Set(),
  nodeResults: {},
  error: null,
  resetData: () => {
    const id = v4();
    const {
      setNodes,
      setEdges,
      setNodesValidation,
      addNodesValidation,

      setSelectedBot,
      clearAllVariables,
      clearNodeStates
    } = get();
    const { resetFilesState } = useFilesStore.getState()
    clearAllVariables()
    resetFilesState()
    clearNodeStates()

    setNodes([
      {
        id: id,
        type: "Handler",
        data: {
          category: "basic",
          color: "#68b04b",
          label: "Start Dialog",
          description: "Begin your Chatbot journey",
          icon: "PlayArrow",
          rightSideData: {
            greet: "",
            restart: "",
            thankYou: "",
            cancel: "",
            start: false,
            bye: "",
          },
        },
        position: { x: 400, y: 40 },
      },
    ]);
    setEdges([]);
    setNodesValidation({});
    addNodesValidation(id, false);
    setSelectedBot(null);
  },
  setNodeResult: (id, result) =>
    set((state) => ({
      nodeResults: {
        ...state.nodeResults,
        [id]: result,
      },
    })),
  addRunningNodeId: (id) =>
    set((state) => {
      const updated = new Set(state.runningNodeIds);
      updated.add(id);
      return { runningNodeIds: updated };
    }),

  removeRunningNodeId: (id) =>
    set((state) => {
      const updated = new Set(state.runningNodeIds);
      updated.delete(id);
      return { runningNodeIds: updated };
    }),
  // Update the testNode function in the flow store

  testNode: async (id) => {
    const {
      addRunningNodeId,
      removeRunningNodeId,
      nodes,
      edges,
      setNodeResult,
      selectedBot,
    } = get();
    set({ error: null });
    addRunningNodeId(id);

    try {
      const selectedNode = nodes.find((el) => el.id === id);

      // Apply variable replacement to rightSideData only
      const processedNode = {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          rightSideData: replaceVariablesInObject(
            selectedNode.data.rightSideData
          ),
        },
      };

      const selectedNodeModule =
        require(`../components/right-side-elements/${camelToDashCase(
          selectedNode.data.category as string
        )}-elements/${camelToDashCase(
          selectedNode.type as string
        )}/build-content.ts`).default;

      const { content, cred, type, multiple, data } = selectedNodeModule(
        processedNode,
        { edges, nodes }
      );

      let payload: any = {
        chatbot_id: selectedBot?.id,
      };

      if (selectedNode.data.category === "ai") {
        if (multiple) {
          const nodeData = data[selectedNode.id];
          const nodeCred = nodeData?.cred;
          const credentials = [...new Set(nodeCred)];
          payload = {
            ...payload,
            chain_type: nodeData.type,
            credentials,
            data: nodeData.content.data,
          };
        } else {
          const credentials = [...new Set(cred)];
          payload = {
            ...payload,
            chain_type: type,
            credentials,
            data: content.data,
          };
        }
      } else if (selectedNode.data.category === "automationTools") {
        payload = {
          ...payload,
          tool_type: type,
          data: content.data,
        };
      } else {
        payload = {
          ...payload,
          app_type: content.data.app,
          credential: cred,
          operation: content.data.operation,
          content_json: content.data.content_json,
        };
      }

      const res = await axios.post(
        process.env.REACT_APP_DNS_URL + `test_node`,
        payload
      );
      setNodeResult(id, res.data?.output);
      console.log("Run node response:", res.data);
      return res.data;
    } catch (error: any) {
      console.error(error);

      // Check if it's a variable replacement error using instanceof
      if (error instanceof VariableReplacementError) {
        setNodeResult(id, { error: error.message });
        set({ error: error.message });
        get().setShowSnackBarMessage({
          color: "destructive",
          duration: 5000, // Increased duration for multiple errors
          open: true,
          message: error.message,
        });
      } else {
        setNodeResult(
          id,
          error.response?.data || { error: "failed to run this node" }
        );
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          "Failed to run flow";

        set({ error: errorMessage });
        get().setShowSnackBarMessage({
          color: "destructive",
          duration: 1000,
          open: true,
          message: "Failed to test node output",
        });
      }
    } finally {
      removeRunningNodeId(id);
    }
  },
  fieldRefs: {},
  setFieldRef: (key, ref) =>
    set((state) => ({
      fieldRefs: {
        ...state.fieldRefs,
        [key]: ref,
      },
    })),

  blurTimeoutRef: null,
  setBlurTimeoutRef: (timeout) => set({ blurTimeoutRef: timeout }),
  focusedField: null,
  setFocusedField: (field) => set({ focusedField: field }),
  variables: [],
  variablesPickerVisible: false,
  selectedOutputOrVariable: null,
  setSelectedOutputOrVariable: (name) => {
    set({ selectedOutputOrVariable: name });
  },
  isPopoverInteracting: false,
  setIsPopoverInteracting: (open) => {
    set({ isPopoverInteracting: open });
  },
  setVarPicker: (value) => {
    set(() => ({ variablesPickerVisible: value }));
  },
  varPickerProps: null,
  setVarPickerProps: (props) => {
    set({ varPickerProps: props });
  },
  
  // Flow instance
  reactFlowInstance: null,
  setReactFlowInstance: (instance) => set({ reactFlowInstance: instance }),

  // Theme
  theme: localStorage.getItem("darkMode") === "true",
  toggleTheme: () => set((state) => ({ theme: !state.theme })),

  // Elements
  droppedElement: null,
  setDroppedElement: (element) => set({ droppedElement: element }),

  clickedElement: null,
  setClickedElement: (element) => {
    console.log({ element });

    set({ clickedElement: element });
  },

  flowZoneSelectedManyElement: [],
  setFlowZoneSelectedManyElement: (elements) =>
    set({ flowZoneSelectedManyElement: elements }),

  zoomAndMoveValues: { x: 0, y: 0, zoom: 1 },
  setZoomAndMoveValues: (values) => set({ zoomAndMoveValues: values }),

  // Nodes and edges
  nodes: [],
  setNodes: (valueOrUpdater) =>
    set((state) => ({
      nodes:
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(state.nodes)
          : valueOrUpdater,
    })),
  applyNodeChangesFunc: (changes) => {
    console.log({ changes });

    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },
  edges: [],
  setEdges: (valueOrUpdater) =>
    set((state) => ({
      edges:
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(state.edges)
          : valueOrUpdater,
    })),

  nodesValidation: {},
  setNodesValidation: (nodesValidation) => {
    set({
      nodesValidation,
    });
  },
  addNodesValidation: (nodeId, valid) => {
    set((state) => ({
      nodesValidation: { ...state.nodesValidation, [nodeId]: valid },
    }));
  },
  deleteNodesValidationById: (nodeId) => {
    set((state) => {
      const { [nodeId]: _, ...rest } = state.nodesValidation;
      return { nodesValidation: rest };
    });
  },
  updateNodesValidationById: (nodeId, valid) => {
    set((state) => ({
      nodesValidation: { ...state.nodesValidation, [nodeId]: valid },
    }));
  },
  subNodesValidation: {},

  setSubNodesValidation: (data) => set({ subNodesValidation: data }),

  addSubNodeValidation: (parentId, subId, valid) =>
    set((state) => {
      console.trace({ parentId });

      const existing = state.subNodesValidation[parentId] || {
        valid: true,
        subs: {},
      };
      const newSubs = { ...existing.subs, [subId]: valid };
      const parentValid = Object.values(newSubs).every(Boolean);
      return {
        subNodesValidation: {
          ...state.subNodesValidation,
          [parentId]: {
            valid: parentValid,
            subs: newSubs,
          },
        },
      };
    }),

  deleteSubNodesValidationById: (parentId) =>
    set((state) => {
      const updated = { ...state.subNodesValidation };
      delete updated[parentId];
      return { subNodesValidation: updated };
    }),

  deleteSubNodeById: (parentId, subId) =>
    set((state) => {
      const existing = state.subNodesValidation[parentId];
      if (!existing) return {};
      const newSubs = { ...existing.subs };
      delete newSubs[subId];
      const parentValid = Object.values(newSubs).every(Boolean);
      return {
        subNodesValidation: {
          ...state.subNodesValidation,
          [parentId]: {
            valid: parentValid,
            subs: newSubs,
          },
        },
      };
    }),

  updateSubNodeValidationById: (parentId, subId, valid) =>
    // same as addSubNodeValidation
    get().addSubNodeValidation(parentId, subId, valid),
  applyEdgeChangesFunc: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),
  deleteNode: (id) =>
    set((state) => {
      const nodes = state.nodes;
      const edges = state.edges;
      // Filter nodes
      const removeNodeAndEdges = (id: string, nodes: Node[], edges: Edge[]) => {
        const connectedEdges = getConnectedEdges(
          [{ id, data: {}, position: { x: 12, y: 121 } }],
          edges
        );
        const updatedNodes = nodes.filter((n) => n.id !== id);
        const updatedEdges = edges.filter(
          (e) => !connectedEdges.some((ce) => ce.id === e.id)
        );

        return { nodes: updatedNodes, edges: updatedEdges };
      };

      const { nodes: updatedNodes, edges: updatedEdges } = removeNodeAndEdges(
        id,
        nodes,
        edges
      );
      const deleteNodesValidationById = state.deleteNodesValidationById;
      deleteNodesValidationById(id);
      state.deleteVariableByNodeId(id);
      // Check clickedElement
      const newClickedElement =
        state.clickedElement?.id === id ? null : state.clickedElement;

      return {
        nodes: updatedNodes,
        edges: updatedEdges,
        clickedElement: newClickedElement,
        isRightOpen: false,
        mousePositionManySelectedElementMenu: { mouseX: null, mouseY: null },
      };
    }),
  duplicateNode: (id) => {
    set((state) => {
      let nodeToDuplicate = state.nodes.find((node) => node.id === id);
      console.log({ nodeToDuplicate });
      nodeToDuplicate = {
        ...nodeToDuplicate,
        id: v4(),
        position: {
          x: nodeToDuplicate.position.x + 150,
          y: nodeToDuplicate.position.y + 150,
        },
      };
      console.log({ nodeToDuplicate });

      const cloned = JSON.parse(JSON.stringify(nodeToDuplicate));
      console.log({ nodeToDuplicate });

      return { nodes: [...state.nodes, cloned] };
    });
  },
  // User and authentication
  userData: {},
  setUserData: (data) => set({ userData: data }),

  authToken: false,
  setAuthToken: (token) => set({ authToken: token }),

  // Bot data
  updatingBot: {},
  setUpdatingBot: (bot) => set({ updatingBot: bot }),

  isLoadingBot: false,
  setIsLoadingBot: (loading) => set({ isLoadingBot: loading }),

  IDOnSelectionContextMenu: "",
  setIDOnSelectionContextMenu: (id) => set({ IDOnSelectionContextMenu: id }),

  flow: {},
  setFlow: (flow) => set({ flow }),

  formDialogBotName: "Workflow",
  setFormDialogBotName: (name) => set({ formDialogBotName: name }),

  botType: "Web",
  setBotType: (type) => set({ botType: type }),

  variablesNamesOfEachRPA: {},
  setVariablesNamesOfEachRPA: (variables) =>
    set({ variablesNamesOfEachRPA: variables }),

  endLoopFromNodesNames: {},
  setEndLoopFromNodesNames: (names) => set({ endLoopFromNodesNames: names }),

  // UI state
  isLeftOpen: true,
  setIsLeftOpen: (open) => set({ isLeftOpen: open }),

  isRightOpen: false,
  setIsRightOpen: (open) => set({ isRightOpen: open }),

  isFormDialogOpen: false,
  setIsFormDialogOpen: (open) => set({ isFormDialogOpen: open }),

  dialogProps: {},
  setDialogProps: (props) => set({ dialogProps: props }),

  formDialogStatus: null,
  setFormDialogStatus: (status) => set({ formDialogStatus: status }),

  formDialogApplyValues: "Draft",
  setFormDialogApplyValues: (values) => set({ formDialogApplyValues: values }),

  showSnackBarMessage: {
    open: false,
    message: null,
    color: null,
    duration: 3000,
  },
  setShowSnackBarMessage: (message) => set({ showSnackBarMessage: message }),

  // Check if all handles are connected
  handleFlowZoneCheckIfAllHandlesAreConnected: () => {
    const { nodes, edges } = get();

    // Maps for quick lookup
    const incomingEdgesMap = new Map<string, Edge[]>();
    const outgoingEdgesMap = new Map<string, Edge[]>();

    edges.forEach((edge) => {
      if (!incomingEdgesMap.has(edge.target))
        incomingEdgesMap.set(edge.target, []);
      incomingEdgesMap.get(edge.target)!.push(edge);

      if (!outgoingEdgesMap.has(edge.source))
        outgoingEdgesMap.set(edge.source, []);
      outgoingEdgesMap.get(edge.source)!.push(edge);
    });

    // Node type configs
    const nodeTypeRules: Record<
      string,
      {
        requireIncoming: boolean;
        requireOutgoing: boolean;
        getRequiredHandles?: (node: any) => string[];
        defaultHandle?: string;
      }
    > = {
      Handler: { requireIncoming: false, requireOutgoing: true },
      End: { requireIncoming: true, requireOutgoing: false },
      ChoicePrompt: {
        requireIncoming: true,
        requireOutgoing: true,
        getRequiredHandles: (node) => [
          ...(node.data?.rightSideData?.choices ?? []).map((c: any) => c.id),
          "choice-default",
        ],
      },
      Router: {
        requireIncoming: true,
        requireOutgoing: true,
        getRequiredHandles: (node) => [
          ...(node.data?.rightSideData?.branches ?? []).map((b: any) => b.id),
          "branch-default",
        ],
      },
      ConditionAgent: {
        requireIncoming: true,
        requireOutgoing: true,
        getRequiredHandles: (node) => [
          ...(node.data?.rightSideData?.scenarios ?? []).map((s: any) => s.id),
          "condition-agent-default",
        ],
      },
    };

    for (const node of nodes) {
      const incoming = incomingEdgesMap.get(node.id) ?? [];
      const outgoing = outgoingEdgesMap.get(node.id) ?? [];
      const config = nodeTypeRules[node.type] ?? {
        requireIncoming: true,
        requireOutgoing: true,
      };

      if (config.requireIncoming && incoming.length === 0) {
        console.warn(
          `Node ${node.id} (${node.type}) is missing incoming connection.`
        );
        return false;
      }

      if (config.requireOutgoing && outgoing.length === 0) {
        console.warn(
          `Node ${node.id} (${node.type}) is missing outgoing connection.`
        );
        return false;
      }

      if (config.getRequiredHandles) {
        const required = new Set(config.getRequiredHandles(node));
        const connected = new Set(
          outgoing.map(
            (e) => e.sourceHandle ?? config.defaultHandle ?? "default"
          )
        );

        for (const handle of required) {
          if (!connected.has(handle)) {
            console.warn(
              `Node ${node.id} (${node.type}) is missing outgoing connection for handle: ${handle}`
            );
            return false;
          }
        }
      }
    }

    return true;
  },

  // Check if web URL is empty
  checkIfWebUrlIsEmpty: () => {
    const userData = get().userData;
    if (
      !userData.bot_configuration?.web_staging_url.trim() ||
      !userData.bot_configuration?.web_production_url.trim()
    ) {
      return false;
    } else return true;
  },
  // Data lists
  cards: [],
  setCards: (cards) => set({ cards }),

  rpasList: [],
  setRpasList: (list) => set({ rpasList: list }),

  intents: [],
  setIntents: (intents) => set({ intents }),

  entities: [],
  setEntities: (entities) => set({ entities }),

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
      const { [nodeId]: _, ...rest } = state.nodeStates;
      return { nodeStates: rest };
    }),

  clearNodeStates: () => set({ nodeStates: {} }),
}));

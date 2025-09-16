import { Edge, Node } from "@xyflow/react";
import { StateCreator } from "zustand";
import chatbotApis from "../api/chatbotApis";
import { createFlowObject } from "../lib/build-json";
import { FlowState, useFlowStore } from "./flow-store";
import {
  ConstantVariable,
  DialogueVariables,
  OutputVariables,
} from "./variables-store";

export interface BotItem {
  id: number;
  name: string;
  updated_date: string;
  status: "Active" | "Inactive";
}
export interface BotSchema extends BotItem {
  dialogue: Record<string, any>;
  ui_json: {
    nodes: Node[];
    edges: Edge[];
    nodesValidation: { [key: string]: boolean };
    constantVariables: ConstantVariable;
    outputVariables: OutputVariables;
    dialogueVariables: DialogueVariables;
    nodeStates: Record<string, string>;
  };
  token: string;
}

export interface ChatbotSlice {
  // Chatbot state
  selectedBot: BotSchema | null;
  setSelectedBot: (bot: BotSchema | null) => void;
  updateSelectedBot: (partial: Partial<BotSchema>) => void;

  botsList: BotItem[];
  setBotsList: (bots: BotItem[]) => void;

  isLoadingBot: boolean;
  setIsLoadingBot: (loading: boolean) => void;

  isLoadingBotList: boolean;
  setIsLoadingBotList: (loading: boolean) => void;

  isLoadingBotByID: boolean;
  setIsLoadingBotByID: (loading: boolean) => void;

  isLoadingActivate: boolean;
  setIsLoadingActivate: (loading: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;

  failedLoadingBot: boolean;
  setFailedLoadingBot: (error: boolean) => void;

  // Chatbot operations
  fetchBots: () => Promise<void>;
  getBotById: (id: string) => Promise<BotSchema>;
  saveBot: (
    data: Omit<BotSchema, "token" | "id" | "updated_date">
  ) => Promise<BotSchema>;
  updateBot: (data: Partial<BotSchema>) => Promise<void>;
  updateBotUiJson: () => Promise<boolean>;
  loadBot: (data: BotSchema) => Promise<void>;
  deleteBot: () => Promise<void>;
  activateBot: () => Promise<void>;
  deactivateBot: () => Promise<void>;
}

export const createChatbotSlice: StateCreator<
  FlowState,
  [],
  [],
  ChatbotSlice
> = (set, get) => ({
  // Initial state
  selectedBot: null,
  botsList: [],
  isLoadingBot: false,
  isLoadingBotByID: false,
  isLoadingBotList: false,
  isLoadingActivate: false,
  error: null,
  failedLoadingBot: false,

  // Setters
  setSelectedBot: (bot) => set({ selectedBot: bot }),
  updateSelectedBot: (partial) =>
    set((state) => ({
      selectedBot: state.selectedBot
        ? { ...state.selectedBot, ...partial }
        : state.selectedBot, // only update if exists
    })),
  setBotsList: (bots) => set({ botsList: bots }),
  setIsLoadingBot: (loading) => set({ isLoadingBot: loading }),
  setIsLoadingBotByID: (loading) => set({ isLoadingBotByID: loading }),
  setIsLoadingBotList: (loading) => set({ isLoadingBotList: loading }),

  setIsLoadingActivate: (loading) => set({ isLoadingActivate: loading }),
  setError: (error) => set({ error }),
  setFailedLoadingBot: (error) => set({ failedLoadingBot: error }),

  // API operations
  fetchBots: async () => {
    const { setIsLoadingBotList } = get();

    setIsLoadingBotList(true);
    try {
      const res = await chatbotApis.listChatbots();
      console.log("Fetched bots:", res.data);

      set({
        isLoadingBotList: false,
        botsList: res.data.sort((a: BotItem, b: BotItem) => {
          const dateA = Number.parseInt(a.updated_date) || 0;
          const dateB = Number.parseInt(b.updated_date) || 0;
          return dateB - dateA; // Latest first
        }),
      });
    } catch (error: any) {
      console.error("Error fetching bots:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch bots",
        isLoadingBotList: false,
      });
    }
  },
  getBotById: async (id) => {
    const { setIsLoadingBotByID, setFailedLoadingBot } = get();

    try {
      setIsLoadingBotByID(true);
      setFailedLoadingBot(false);
      const res = await chatbotApis.getChatbot(id);
      get().loadBot(res.data);
      get().setSelectedBot(res.data);
      const reactFlowInstance = useFlowStore.getState().reactFlowInstance;
      reactFlowInstance?.fitView();
      setIsLoadingBotByID(false);
      return res.data;
    } catch (error: any) {
      console.log({ error });
      const showSnackBar = useFlowStore.getState().setShowSnackBarMessage;
      setIsLoadingBotByID(false);
      setFailedLoadingBot(true);
      showSnackBar({
        open: true,
        message: error.message || "Failed to load Bot",
        color: "destructive",
        duration: 3000,
      });
      throw error;
    }
  },
  saveBot: async (data) => {
    set({ isLoadingBot: true, error: null });
    try {
      const { setSelectedBot, setShowSnackBarMessage } = get();
      const res = await chatbotApis.createChatbot(data);
      set({ isLoadingBot: false });

      // Show success message
      const showSnackBar = setShowSnackBarMessage;
      if (showSnackBar) {
        showSnackBar({
          open: true,
          message: res.data.message || "Bot Created successfully",
          color: "success",
          duration: 3000,
        });
      }

      // Refresh bots list after saving
      get().fetchBots();
      setSelectedBot(res.data);
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to Create bot";
      set({
        error: errorMessage,
        isLoadingBot: false,
      });

      // Show error message if setShowSnackBarMessage is available
      const showSnackBar = get().setShowSnackBarMessage;
      showSnackBar({
        open: true,
        message: "Failed to save Bot",
        color: "destructive",
        duration: 3000,
      });
      throw error;
    }
  },

  updateBot: async (data) => {
    const { selectedBot, fetchBots, updateSelectedBot } = get();
    if (!selectedBot) {
      throw new Error("No bot selected for update");
    }

    set({ isLoadingBot: true, error: null });
    try {
      const res = await chatbotApis.updateChatbot(selectedBot.id, data);
      set({ isLoadingBot: false });

      // Show success message if setShowSnackBarMessage is available
      const showSnackBar = (get() as any).setShowSnackBarMessage;
      if (showSnackBar) {
        showSnackBar({
          open: true,
          message: res.data.message || "Bot updated successfully",
          color: "success",
          duration: 3000,
        });
      }

      await fetchBots();
      updateSelectedBot(data);
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update bot";
      set({
        error: errorMessage,
        isLoadingBot: false,
      });

      // Show error message if setShowSnackBarMessage is available
      const showSnackBar = (get() as any).setShowSnackBarMessage;
      if (showSnackBar) {
        showSnackBar({
          open: true,
          message: "Failed to update Bot",
          color: "destructive",
          duration: 3000,
        });
      }

      throw error;
    }
  },
  updateBotUiJson: async () => {
    try {
      const {
        nodesValidation,
        nodes,
        edges,
        constantVariables,
        outputVariables,
        dialogueVariables,
        updateBot,
        setShowSnackBarMessage,
        nodeStates,
      } = get();
      await updateBot({
        ui_json: {
          constantVariables,
          dialogueVariables,
          edges,
          nodes,
          nodesValidation,
          outputVariables,
          nodeStates: nodeStates,
        },
      });
      return true;
    } catch (error) {
      const { setShowSnackBarMessage } = get();
      console.log({ error });
      setShowSnackBarMessage({
        open: true,
        message: "Failed to update Bot",
        color: "destructive",
        duration: 3000,
      });
      return false;
    }
  },
  loadBot: async (data) => {
    const { ui_json } = data;
    const {
      nodes,
      edges,
      nodesValidation,
      constantVariables,
      outputVariables,
      dialogueVariables,
      nodeStates,
    } = ui_json;
    set({ isLoadingBot: true, error: null });

    try {
      // These setters should be available from the main store
      const store = get();
      store.setNodes(nodes || []);
      store.setEdges(edges || []);
      store.setNodesValidation(nodesValidation || {});
      store.setAllConstantVariables(constantVariables ?? {});
      store.setAllOutputVariables(outputVariables ?? {});
      store.setAllDialogueVariables(dialogueVariables ?? {});
      store.setNodeStates(nodeStates || {});
      set({ isLoadingBot: false });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to load bot";
      set({
        error: errorMessage,
        isLoadingBot: false,
      });

      // Show error message if setShowSnackBarMessage is available
      const showSnackBar = (get() as any).setShowSnackBarMessage;
      if (showSnackBar) {
        showSnackBar({
          open: true,
          message: "Failed to load Bot",
          color: "destructive",
          duration: 3000,
        });
      }

      throw error;
    }
  },

  deleteBot: async () => {
    const { selectedBot, resetData, setShowSnackBarMessage } = get();
    if (!selectedBot) {
      throw new Error("No bot selected for deletion");
    }

    set({ isLoadingBot: true, error: null });
    try {
      const res = await chatbotApis.deleteChatbot(selectedBot.id);
      // Show success message if setShowSnackBarMessage is available
      const showSnackBar = setShowSnackBarMessage;
      if (showSnackBar) {
        showSnackBar({
          open: true,
          message: res.data.message || "Bot deleted successfully",
          color: "success",
          duration: 3000,
        });
      }
      resetData();
      set({ isLoadingBot: false, selectedBot: null });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete bot";
      set({
        error: errorMessage,
        isLoadingBot: false,
      });

      // Show error message if setShowSnackBarMessage is available
      const showSnackBar = setShowSnackBarMessage;
      if (showSnackBar) {
        showSnackBar({
          open: true,
          message: "Failed to delete Bot",
          color: "destructive",
          duration: 3000,
        });
      }

      throw error;
    }
  },

  activateBot: async () => {
    set({ isLoadingActivate: true, error: null });
    const {
      selectedBot,
      nodes,
      edges,
      nodesValidation,
      constantVariables,
      dialogueVariables,
      outputVariables,
      updateSelectedBot,
      setShowSnackBarMessage,
      nodeStates,
    } = get();
    try {
      const body = {
        name: selectedBot?.name,
        dialogue: createFlowObject(),
        ui_json: {
          nodes,
          edges,
          nodesValidation,
          constantVariables,
          outputVariables,
          dialogueVariables,
          nodeStates,
        },
      };
      const res = await chatbotApis.activateChatbot(selectedBot?.id!, body);
      set({ isLoadingActivate: false });
      updateSelectedBot({ status: "Active" });

      // Refresh bots list to update status
      get().fetchBots();

      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to activate bot";
      set({
        error: errorMessage,
        isLoadingActivate: false,
      });

      // Show error message if setShowSnackBarMessage is available
      setShowSnackBarMessage({
        open: true,
        message: "Failed to activate Bot",
        color: "destructive",
        duration: 3000,
      });

      // throw error;
    }
  },

  deactivateBot: async () => {
    const {
      fetchBots,
      setShowSnackBarMessage,
      selectedBot,
      updateSelectedBot,
    } = get();
    set({ isLoadingActivate: true, error: null });

    try {
      await chatbotApis.deactivateChatbot(selectedBot?.id!);
      set({ isLoadingActivate: false });
      updateSelectedBot({ status: "Inactive" });
      fetchBots();
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || error.message || "Unknown error",
        isLoadingActivate: false,
      });
      setShowSnackBarMessage({
        open: true,
        message: `Failed to deactivate Bot`,
        color: "destructive",
        duration: 3000,
      });
    }
  },
});

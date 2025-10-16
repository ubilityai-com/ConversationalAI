import { v4 } from "uuid"
import { create } from "zustand"
import { type ChatbotSlice, createChatbotSlice } from "./slices/chatbot-slice"
import { createUISlice, type UISlice } from "./slices/ui-slice"
import { createFlowSlice, type FlowSlice } from "./slices/flow-slice"
import { createValidationSlice, type ValidationSlice } from "./slices/validation-slice"
import { createNodeExecutionSlice, type NodeExecutionSlice } from "./slices/node-execution-slice"
import { createVariablePickerSlice, type VariablePickerSlice } from "./slices/variable-picker-slice"
import { createNodeStatesSlice, type NodeStatesSlice } from "./slices/node-states-slice"
import { createVariablesSlice, type VariablesSlice } from "./slices/variables-slice"
import { createCredentialsSlice, type CredentialsSlice } from "./slices/credentials-slice"
import { createFilesSlice, type FilesSlice } from "./slices/files-slice"
import { createApiSlice, type ApiSlice } from "./slices/api-slice"

export interface FlowStore
  extends UISlice,
    FlowSlice,
    ValidationSlice,
    NodeExecutionSlice,
    VariablePickerSlice,
    NodeStatesSlice,
    VariablesSlice,
    ChatbotSlice,
    CredentialsSlice,
    FilesSlice,
    ApiSlice {
  resetData: () => void
}

export const useFlowStore = create<FlowStore>()((set, get, store) => ({
  ...createUISlice(set, get, store),
  ...createFlowSlice(set, get, store),
  ...createValidationSlice(set, get, store),
  ...createNodeExecutionSlice(set, get, store),
  ...createVariablePickerSlice(set, get, store),
  ...createNodeStatesSlice(set, get, store),
  ...createVariablesSlice(set, get, store),
  ...createChatbotSlice(set, get, store),
  ...createCredentialsSlice(set, get, store),
  ...createFilesSlice(set, get, store),
  ...createApiSlice(set, get, store),

  resetData: () => {
    const id = v4()
    const {
      setNodes,
      setEdges,
      setNodesValidation,
      addNodesValidation,
      setSelectedBot,
      clearAllVariables,
      clearNodeStates,
      setModelData,
      resetFilesState,
      clearAllData,
    } = get()

    clearAllVariables()
    resetFilesState()
    clearNodeStates()
    clearAllData()

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
            cancel: "",
            start: false,
            save: false,
            variableName: "",
          },
        },
        position: { x: 400, y: 40 },
      },
    ])
    setEdges([])
    setNodesValidation({})
    addNodesValidation(id, true)
    setSelectedBot(null)
    setModelData({
      provider: "",
      credential: "",
      model: "",
      credType: "",
      url: "",
      models: [],
    })
  },
}))

export const useApiData = (componentId: string) => {
  return useFlowStore((state) => ({
    list: state.listsForEachNode[componentId] || [],
    isLoading: state.isLoadingList[componentId] || false,
    fetchStatus: state.fetchList[componentId] || false,
    notFetchingAsFirstTime: state.notFetchingListAsFirstTime[componentId],
  }))
}

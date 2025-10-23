import type { StateCreator } from "zustand"
import { camelToDashCase } from "../../lib/utils/utils"
import { replaceVariablesInObject, VariableReplacementError } from "../../lib/variable-replacement"
import chatbotApis from "../../api/chatbotApis"

export interface NodeExecutionSlice {
  error: string | null
  runningNodeIds: Set<string>
  nodeResults: Record<string, { status: "success" | "error" | "running"; output: any }>

  testNode: (id: string) => Promise<void>
  addRunningNodeId: (id: string) => void
  removeRunningNodeId: (id: string) => void
  setNodeResult: (id: string, status: "success" | "error" | "running", output: any) => void
}

export const createNodeExecutionSlice: StateCreator<NodeExecutionSlice> = (set, get) => ({
  error: null,
  runningNodeIds: new Set(),
  nodeResults: {},

  setNodeResult: (id, status, output) =>
    set((state) => ({
      nodeResults: {
        ...state.nodeResults,
        [id]: { status, output },
      },
    })),

  addRunningNodeId: (id) =>
    set((state) => {
      const updated = new Set(state.runningNodeIds)
      updated.add(id)
      return { runningNodeIds: updated }
    }),

  removeRunningNodeId: (id) =>
    set((state) => {
      const updated = new Set(state.runningNodeIds)
      updated.delete(id)
      return { runningNodeIds: updated }
    }),

  testNode: async (id) => {
    const state = get() as any
    const { addRunningNodeId, removeRunningNodeId, setNodeResult } = state

    const nodes = state.nodes
    const edges = state.edges
    const selectedBot = state.selectedBot

    set({ error: null })
    addRunningNodeId(id)
    setNodeResult(id, "running", null)

    try {
      const selectedNode = nodes.find((el: any) => el.id === id)

      const processedNode = {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          rightSideData: replaceVariablesInObject(selectedNode.data.rightSideData),
        },
      }

      const selectedNodeModule = require(
        `../../components/right-side-elements/${camelToDashCase(
          selectedNode.data.category as string,
        )}-elements/${camelToDashCase(selectedNode.type as string)}/build-content.ts`,
      ).default

      const { content, cred, type, multiple, data } = selectedNodeModule(processedNode, { edges, nodes })

      let payload: any = {
        chatbot_id: selectedBot?.id,
      }

      if (selectedNode.data.category === "ai") {
        if (multiple) {
          const nodeData = data[selectedNode.id]
          const nodeCred = nodeData?.cred
          const credentials = [...new Set(nodeCred)]
          payload = {
            ...payload,
            chain_type: nodeData.type,
            credentials,
            data: nodeData.content.data,
          }
        } else {
          const credentials = [...new Set(cred)]
          payload = {
            ...payload,
            chain_type: type,
            credentials,
            data: content.data,
          }
        }
      } else if (selectedNode.data.category === "automationTools") {
        payload = {
          ...payload,
          tool_type: type,
          data: content.data,
        }
      } else {
        payload = {
          ...payload,
          app_type: content.data.app,
          credential: cred,
          operation: content.data.operation,
          content_json: content.data.content_json,
        }
      }

      const res = await chatbotApis.testNode(payload)
      setNodeResult(id, "success", res.data?.output)
      console.log("Run node response:", res.data)
      return res.data
    } catch (error: any) {
      console.error(error)

      if (error instanceof VariableReplacementError) {
        setNodeResult(id, "error", { error: error.message })
        set({ error: error.message })
        state.setShowSnackBarMessage?.({
          color: "destructive",
          duration: 5000,
          open: true,
          message: error.message,
        })
      } else {
        setNodeResult(id, "error", error.response?.data || { error: "failed to run this node" })

        const errorMessage = error?.response?.data?.message || error.message || "Failed to run flow"

        set({ error: errorMessage })
        state.setShowSnackBarMessage?.({
          color: "destructive",
          duration: 1000,
          open: true,
          message: "Failed to test node output",
        })
      }
    } finally {
      removeRunningNodeId(id)
    }
  },
})

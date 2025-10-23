import type { StateCreator } from "zustand"
import { produce } from "immer"

export interface ApiSlice {
  // Lists for each node/component
  listsForEachNode: Record<string, any[]>
  setListAndDropDownList: ({ id, list }: { id: string; list: any[] }) => void

  // Loading states
  isLoadingList: Record<string, boolean>
  setIsLoadingList: ({ id, status }: { id: string; status: boolean }) => void

  // Fetch states
  notFetchingListAsFirstTime: Record<string, boolean>
  setNotFetchingListAsFirstTime: ({
    id,
    status,
  }: {
    id: string
    status: boolean
  }) => void

  fetchList: Record<string, boolean>
  setFetchList: ({ id, status }: { id: string; status: boolean }) => void

  // Clear data
  clearComponentData: (id: string) => void
  clearAllData: () => void
}

export const createApiSlice: StateCreator<ApiSlice> = (set) => ({
  // Lists for each node/component
  listsForEachNode: {},
  setListAndDropDownList: ({ id, list }) =>
    set(
      produce((state: ApiSlice) => {
        state.listsForEachNode[id] = list
      }),
    ),

  // Loading states
  isLoadingList: {},
  setIsLoadingList: ({ id, status }) =>
    set(
      produce((state: ApiSlice) => {
        state.isLoadingList[id] = status
      }),
    ),

  // Fetch states
  notFetchingListAsFirstTime: {},
  setNotFetchingListAsFirstTime: ({ id, status }) =>
    set(
      produce((state: ApiSlice) => {
        state.notFetchingListAsFirstTime[id] = status
      }),
    ),

  fetchList: {},
  setFetchList: ({ id, status }) =>
    set(
      produce((state: ApiSlice) => {
        state.fetchList[id] = status
      }),
    ),

  // Clear data for a specific component
  clearComponentData: (id) =>
    set(
      produce((state: ApiSlice) => {
        delete state.listsForEachNode[id]
        delete state.isLoadingList[id]
        delete state.notFetchingListAsFirstTime[id]
        delete state.fetchList[id]
      }),
    ),

  // Clear all data
  clearAllData: () =>
    set(
      produce((state: ApiSlice) => {
        state.listsForEachNode = {}
        state.isLoadingList = {}
        state.notFetchingListAsFirstTime = {}
        state.fetchList = {}
      }),
    ),
})

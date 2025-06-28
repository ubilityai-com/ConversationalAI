import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ApiState {
    // Lists for each node/component
    listsForEachNode: Record<string, any[]>;
    setListAndDropDownList: ({ id, list }: { id: string, list: any[] }) => void;

    // Loading states
    isLoadingList: Record<string, boolean>;
    setIsLoadingList: ({ id, status }: { id: string, status: boolean }) => void;

    // Fetch states
    notFetchingListAsFirstTime: Record<string, boolean>;
    setNotFetchingListAsFirstTime: ({ id, status }: { id: string, status: boolean }) => void;

    fetchList: Record<string, boolean>;
    setFetchList: ({ id, status }: { id: string, status: boolean }) => void;

    // Clear data for a specific component
    clearComponentData: (id: string) => void;

    // Clear all data
    clearAllData: () => void;
}

export const useApiStore = create<ApiState>()(
    immer((set) => ({
        // Lists for each node/component
        listsForEachNode: {},
        setListAndDropDownList: ({ id, list }) =>
            set((state) => {
                state.listsForEachNode[id] = list;
            }),

        // Loading states
        isLoadingList: {},
        setIsLoadingList: ({ id, status }) =>
            set((state) => {
                state.isLoadingList[id] = status;
            }),

        // Fetch states
        notFetchingListAsFirstTime: {},
        setNotFetchingListAsFirstTime: ({ id, status }) =>
            set((state) => {
                state.notFetchingListAsFirstTime[id] = status;
            }),

        fetchList: {},
        setFetchList: ({ id, status }) =>
            set((state) => {
                state.fetchList[id] = status;
            }),

        // Clear data for a specific component
        clearComponentData: (id) =>
            set((state) => {
                delete state.listsForEachNode[id];
                delete state.isLoadingList[id];
                delete state.notFetchingListAsFirstTime[id];
                delete state.fetchList[id];
            }),

        // Clear all data
        clearAllData: () =>
            set((state) => {
                state.listsForEachNode = {};
                state.isLoadingList = {};
                state.notFetchingListAsFirstTime = {};
                state.fetchList = {};
            }),
    }))
);
// Selectors for easier access
export const useApiData = (componentId: string) => {
    return useApiStore((state) => ({
        list: state.listsForEachNode[componentId] || [],
        isLoading: state.isLoadingList[componentId] || false,
        fetchStatus: state.fetchList[componentId] || false,
        notFetchingAsFirstTime: state.notFetchingListAsFirstTime[componentId],
    }))
}
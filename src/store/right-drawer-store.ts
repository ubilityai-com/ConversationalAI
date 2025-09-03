import { create } from "zustand"
import { immer } from 'zustand/middleware/immer'
import { useFlowStore } from "./flow-store"

// Update the interface to include handleSnackBarMessageOpen
interface RightDrawerStore {
    handleSnackBarMessageOpen: (message: string, color: "default" | "destructive" | "success" | "warning" | "info", duration: number) => void
    updateNodeRightSideData: (id: string, value: any) => void,
    updateNodeRightSideDataNestedKey: (id: string, value: any) => void,


}

export const useRightDrawerStore = create<RightDrawerStore>()(
    immer((set, get) => ({
        // Add the handleSnackBarMessageOpen function
        handleSnackBarMessageOpen: (message, color, duration) => {
            const { setShowSnackBarMessage } = useFlowStore.getState()
            setShowSnackBarMessage({ open: true, message, color, duration })
        },
        updateNodeRightSideData: (id, value) => {
            const { reactFlowInstance } = useFlowStore.getState()
            reactFlowInstance?.updateNodeData(id, value)

        },
        updateNodeRightSideDataNestedKey: (id, value) => {
            const { nodes } = useFlowStore.getState()
            const elementsIndex = nodes.findIndex((element) => element.id === id)

            if (elementsIndex === -1) return

            const newArray = [...nodes]
            let newRightSideData = { ...newArray[elementsIndex].data.rightSideData }

            newRightSideData = { ...newRightSideData, ...value }
            const { reactFlowInstance } = useFlowStore.getState()
            reactFlowInstance?.updateNodeData(id, newRightSideData)
        },
    })))

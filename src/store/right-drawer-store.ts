import { create } from "zustand"
import { immer } from 'zustand/middleware/immer'
import { useFlowStore } from "./flow-store"

// Update the interface to include handleSnackBarMessageOpen
interface RightDrawerStore {
    automation: { validation: Record<string, Record<string, boolean>>, filledData: Record<string, Record<string, Record<string, any>>> }
    setValidationByKey: (id: string, key: string, status: boolean) => void
    setNodeFilledDataByKey: (id: string, key: string, data: Record<string, any>) => void

    handleSnackBarMessageOpen: (message: string, color: "default" | "destructive" | "success" | "warning" | "info", duration: number) => void
    updateNodeRightSideData: (id: string, value: any) => void,
    updateNodeRightSideDataNestedKey: (id: string, value: any) => void,


}

export const useRightDrawerStore = create<RightDrawerStore>()(
    immer((set, get) => ({
        automation: { validation: {}, filledData: {} },
        setValidationByKey: (id, key, valid) =>
            set((state) => ({
                ...state,
                automation: {
                    ...state.automation,
                    validation: {
                        ...state.automation.validation,
                        [id]: {
                            ...state.automation.validation[id],
                            [key]: valid
                        }
                    }
                }
            })),
        setNodeFilledDataByKey: (id, key, data) => {
            console.log({ id, data, key });

            set((state) => ({
                ...state,
                automation: {
                    ...state.automation,
                    filledData: {
                        ...state.automation.filledData,
                        [id]: {
                            ...state.automation.filledData[id],
                            [key]: data
                        }
                    }
                }
            }))
        },

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

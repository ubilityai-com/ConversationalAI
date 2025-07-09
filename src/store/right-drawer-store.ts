import axios from "axios"
import type React from "react"
import { create } from "zustand"
import { immer } from 'zustand/middleware/immer'
import { useFlowStore } from "./flow-store"

// Update the interface to include handleSnackBarMessageOpen
interface RightDrawerStore {
    automation: { validation: Record<string, Record<string, boolean>>, filledData: Record<string, Record<string, Record<string, any>>> }
    setValidationByKey: (id: string, key: string, status: boolean) => void
    setNodeFilledDataByKey: (id: string, key: string, data: Record<string, any>) => void

    handleSnackBarMessageOpen: (message: string, color: "default" | "destructive" | "success" | "warning" | "info", duration: number) => void
    // Rest of the interface remains the same
    handleRightDrawerAddCounters: (event: React.MouseEvent | { preventDefault: () => void }, isHandler: boolean) => void
    handleRightDrawerAddInnerCounters: (
        event: React.MouseEvent | { preventDefault: () => void },
        index: number,
        innerIndex: number,
    ) => void
    handleRightDrawerAnyFormChange: (
        event: { target: { name: string, value: any } },
        id: string
    ) => void
    updateNodeRightSideData: (id: string, value: any) => void,
    updateNodeRightSideDataNestedKey: (id: string, value: any) => void,

    handleRightDrawerSubtractCounters: (
        event: React.MouseEvent | { preventDefault: () => void },
        index: number,
        isHandler: boolean,
    ) => void
    handleRightDrawerSubtractInnerCounters: (
        event: React.MouseEvent | { preventDefault: () => void },
        index: number,
        innerIndex: number,
        entityIndex: number,
    ) => void
    handleRightDrawerCheckIfRemovedConditionIsConnectedWhenSubtractCounters: (
        element: any,
        isHandler: boolean,
        indexToCheck: number,
    ) => boolean
    handleRightDrawerAdjustConnectionsWhenSubtractCounters: (
        newNodesToAdjust: any[],
        elementsId: string,
        startWithH: boolean,
        deletedIndex: number,
    ) => void
    handleSaveFormDialogCheckIfAllRequiredDataAreFilledForEachElement: () => boolean
    handleSaveFormDialogApplyClicked: (event: React.MouseEvent) => void

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

        // Now update the handleRightDrawerAnyFormChange function to handle the event.target properly
        handleRightDrawerAnyFormChange: (event, id) => {
            const { nodes, setNodes } = useFlowStore.getState()
            let { name, value } = event.target

            const elementsIndex = nodes.findIndex((element) => element.id === id)
            console.log({ elementsIndex, id });

            if (elementsIndex === -1) return

            const newArray = [...nodes]
            let newData = { ...newArray[elementsIndex].data }
            console.log({ newData });

            newData = { ...newData, [name]: value }
            newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }

            setNodes(newArray)
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

        // Update the handleRightDrawerSubtractCounters function to use the local handleSnackBarMessageOpen
        handleRightDrawerSubtractCounters: (event, index, isHandler) => {
            const { nodes, clickedElement } = useFlowStore.getState()
            const {
                handleRightDrawerAdjustConnectionsWhenSubtractCounters,
            } = get()

            const elementsIndex = nodes.findIndex((element) => element.id === clickedElement.id)

            if (elementsIndex === -1) return

            const newNodes = [...nodes]
            let newData = { ...newNodes[elementsIndex].data }
            const newFormData = [...newData.formData]
            newFormData.splice(index, 1)
            newData = { ...newData, formData: newFormData }

            newNodes[elementsIndex] = { ...newNodes[elementsIndex], data: newData }
            handleRightDrawerAdjustConnectionsWhenSubtractCounters(newNodes, newNodes[elementsIndex].id, false, index)
        },

        // Keep the rest of the functions as they are
        handleRightDrawerAddCounters: (event, isHandler) => {
            const { nodes, setNodes, clickedElement } = useFlowStore.getState()
            const elementsIndex = nodes.findIndex((element) => element.id === clickedElement.id)

            if (elementsIndex === -1) return

            const newArray = [...nodes]
            let newData = { ...newArray[elementsIndex].data }
            let newFormData = null

            if (newArray[elementsIndex].type === "ChoicePrompt") {
                newFormData = [...newData.formData]
                newFormData = newFormData.concat({ text: "" })
                newData = { ...newData, formData: newFormData }
            }
            newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }
            setNodes(newArray)
        },

        handleRightDrawerAddInnerCounters: (event, index, innerIndex) => {
            const { nodes, setNodes, clickedElement, entities } = useFlowStore.getState()
            const elementsIndex = nodes.findIndex((element) => element.id === clickedElement.id)

            if (elementsIndex === -1) return

            const newArray = [...nodes]
            let newData = { ...newArray[elementsIndex].data }
            const newDynamicDataHandler = [...newData.dynamicDataHandler]
            const newDynamicDataHandlerObject = { ...newDynamicDataHandler[index] }

            if (innerIndex === -1) {
                let newInnerDynamicDataHandler = [...newDynamicDataHandlerObject.innerDynamicDataHandler]
                newInnerDynamicDataHandler = newInnerDynamicDataHandler.concat({
                    choice: "Keyword",
                    value: "",
                    save: false,
                    variableName: "",
                })
                newDynamicDataHandler[index] = { innerDynamicDataHandler: newInnerDynamicDataHandler }
            } else {
                const newInnerDynamicDataHandler = [...newDynamicDataHandlerObject.innerDynamicDataHandler]
                const newInnerDynamicDataHandlerObject = { ...newInnerDynamicDataHandler[innerIndex] }
                let newInnerDynamicDataHandlerEntities = [...newInnerDynamicDataHandlerObject.entities]

                newInnerDynamicDataHandlerEntities = newInnerDynamicDataHandlerEntities.concat({
                    name: entities[0],
                    value: "",
                    any: false,
                })
                newInnerDynamicDataHandler[innerIndex] = {
                    ...newInnerDynamicDataHandler[innerIndex],
                    entities: newInnerDynamicDataHandlerEntities,
                }
                newDynamicDataHandler[index] = {
                    ...newDynamicDataHandler[index],
                    innerDynamicDataHandler: newInnerDynamicDataHandler,
                }
            }

            newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
            newArray[elementsIndex] = {
                ...newArray[elementsIndex],
                data: newData,
            }

            setNodes(newArray)
        },

        handleRightDrawerCheckIfRemovedConditionIsConnectedWhenSubtractCounters: (element, isHandler, indexToCheck) => {
            const { edges } = useFlowStore.getState()
            const getNext = (source: string, sourceHandle: string | null) => {
                let target = null
                edges.forEach((element) => {
                    if (element.source === source) {
                        if (sourceHandle === "-1") {
                            target = element.target
                        } else {
                            if (element.sourceHandle === sourceHandle) {
                                target = element.target
                            }
                        }
                    }
                })
                return target
            }

            let connected = false
            let sourceHandle = null
            let isSource = null

            if (!isHandler) {
                // formData in ListCard, ChoicePrompt and WebListCard
                sourceHandle = indexToCheck + 1 + ""
                isSource = getNext(element.id, sourceHandle)
            } else {
                // dynamicData in Handler, Message, DatePrompt, NumberPrompt, ListCard, ChoicePrompt and WebListCard
                if (
                    element.type === "Handler" ||
                    element.type === "Message" ||
                    element.type === "DatePrompt" ||
                    element.type === "NumberPrompt"
                ) {
                    sourceHandle = indexToCheck + 1 + ""
                } else {
                    // ListCard, ChoicePrompt and WebListCard
                    sourceHandle = "h-" + (indexToCheck + 1)
                }
                isSource = getNext(element.id, sourceHandle)
            }

            if (isSource) {
                connected = true
            }

            return connected
        },

        handleRightDrawerAdjustConnectionsWhenSubtractCounters: (newNodesToAdjust, elementsId, startWithH, deletedIndex) => {
            const { edges, setEdges, setNodes } = useFlowStore.getState()
            const edgesToModify = [...edges]

            edges.forEach((edge, index) => {
                if (edge.source === elementsId) {
                    const oldSourceHandleAsNumber = edge.sourceHandle
                    let newSourceHandle = null

                    if (startWithH && edge.sourceHandle.startsWith("h-")) {
                        // Choice Handler and List Card Handler
                        // here sourceHandle starts with 'h-'
                        let oldSourceHandleNumber = oldSourceHandleAsNumber.substring(2, oldSourceHandleAsNumber.length)
                        oldSourceHandleNumber = Number.parseInt(oldSourceHandleNumber)

                        if (oldSourceHandleNumber > deletedIndex + 1) {
                            newSourceHandle = "h-" + (oldSourceHandleNumber - 1)
                            edgesToModify[index] = { ...edgesToModify[index], sourceHandle: newSourceHandle }
                        }
                    }

                    if (!startWithH && !edge.sourceHandle.startsWith("h-")) {
                        // All Message Handler, Date Handler, Number Handler, Choice not Handler and List Card not Handler
                        // here sourceHandle doesn't start with 'h-' (only digit)
                        if (oldSourceHandleAsNumber > deletedIndex + 1) {
                            newSourceHandle = "" + (oldSourceHandleAsNumber - 1)
                            edgesToModify[index] = { ...edgesToModify[index], sourceHandle: newSourceHandle }
                        }
                    }
                }
            })

            setEdges(edgesToModify)
            setNodes(newNodesToAdjust)
        },

        handleRightDrawerSubtractInnerCounters: (event, index, innerIndex, entityIndex) => {
            const { nodes, setNodes, clickedElement } = useFlowStore.getState()
            const elementsIndex = nodes.findIndex((element) => element.id === clickedElement.id)

            if (elementsIndex === -1) return

            const newArray = [...nodes]
            let newData = { ...newArray[elementsIndex].data }
            const newDynamicDataHandler = [...newData.dynamicDataHandler]
            const newDynamicDataHandlerObject = { ...newDynamicDataHandler[index] }

            if (entityIndex < 0) {
                const newInnerDynamicDataHandler = [...newDynamicDataHandlerObject.innerDynamicDataHandler]
                newInnerDynamicDataHandler.splice(innerIndex, 1)
                newDynamicDataHandler[index] = {
                    innerDynamicDataHandler: newInnerDynamicDataHandler,
                }
            } else {
                const newInnerDynamicDataHandler = [...newDynamicDataHandlerObject.innerDynamicDataHandler]
                const newInnerDynamicDataHandlerObject = { ...newInnerDynamicDataHandler[innerIndex] }
                const newInnerDynamicDataHandlerEntities = [...newInnerDynamicDataHandlerObject.entities]

                newInnerDynamicDataHandlerEntities.splice(entityIndex, 1)
                newInnerDynamicDataHandler[innerIndex] = {
                    ...newInnerDynamicDataHandler[innerIndex],
                    entities: newInnerDynamicDataHandlerEntities,
                }
                newDynamicDataHandler[index] = {
                    ...newDynamicDataHandler[index],
                    innerDynamicDataHandler: newInnerDynamicDataHandler,
                }
            }

            newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
            newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }

            setNodes(newArray)
        },

        handleSaveFormDialogCheckIfAllRequiredDataAreFilledForEachElement: () => {
          

            return true
        },
        handleSaveFormDialogApplyClicked: (event) => {
            const {
                flow,
                formDialogBotName,
                nodes,
                edges,
                formDialogApplyValues,
                botType,
                updatingBot,
                setUpdatingBot,
                authToken,
                userData,
                setFlow,
                setIsFormDialogOpen,
            } = useFlowStore.getState()
            const handleSnackBarMessageOpen = get().handleSnackBarMessageOpen

            const DBBodyJsonAdd = {
                completeflow: flow,
                flow_name: formDialogBotName,
                ui: { ui: [...nodes, ...edges] },
                status: formDialogApplyValues,
                flow_type: botType,
            }

            const DBBodyJsonUpdate = {
                flow_id: updatingBot.id,
                completeflow: flow,
                old_flow_name: updatingBot.flow_name,
                new_flow_name: formDialogBotName,
                ui: { ui: [...nodes, ...edges] },
                status: formDialogApplyValues,
                flow_type: botType,
            }

            const addOrUpdateRoute = updatingBot ? "updateConfiguration" : "addConfiguration"
            const DBBodyJson = updatingBot ? DBBodyJsonUpdate : DBBodyJsonAdd

            axios
                .post(process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_URL + "configuration/" + addOrUpdateRoute, DBBodyJson, {
                    headers: { Authorization: "Bearer " + authToken },
                })
                .then((response) => {
                    handleSnackBarMessageOpen("Bot Configuration Saved Successfully", "success", 2000)
                    const updatedBot = { ...response.data }
                    setUpdatingBot(updatedBot)
                })
                .catch((error) => {
                    console.log("Save Or Update Bot Error", error)
                    handleSnackBarMessageOpen("Failed Saving Bot Configuration !", "destructive", 3000)
                })

            if (formDialogApplyValues === "Staging") {
                const body_json = {
                    bot: {
                        settings: {},
                        flow: flow,
                    },
                }

                axios
                    .post(`${userData.bot_configuration.web_staging_url}/api/bot`, body_json)
                    .then((res) => {
                        handleSnackBarMessageOpen("Bot Configuration Sent Successfully", "success", 2000)
                    })
                    .catch((res) => {
                        console.log("Error Data")
                        handleSnackBarMessageOpen("Sending Bot Configuration Was Not Successfully", "destructive", 3000)
                    })
            } else if (formDialogApplyValues === "Production") {
                const body_json = {
                    bot: {
                        settings: {},
                        flow: flow,
                    },
                }

                axios
                    .post(`${userData.bot_configuration.web_production_url}/api/bot`, body_json)
                    .then((res) => {
                        handleSnackBarMessageOpen("Bot Configuration Sent Successfully", "success", 2000)
                    })
                    .catch((res) => {
                        handleSnackBarMessageOpen("Sending Bot Configuration Was Not Successfully", "destructive", 3000)
                    })
            }

            setFlow({})
            setIsFormDialogOpen(false)
        },

    })))

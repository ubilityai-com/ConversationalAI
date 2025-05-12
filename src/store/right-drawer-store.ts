import axios from "axios"
import type React from "react"
import { create } from "zustand"
import { useFlowStore } from "./flow-store"

// Add a type for form events that can handle both value and checked properties
type FormEvent = {
    target: {
        name: string
        value?: any
        checked?: boolean
        type?: string
    }
    preventDefault: () => void
}

// Update the interface to include handleSnackBarMessageOpen
interface RightDrawerStore {
    handleSnackBarMessageOpen: (message: string, color: string, duration: number) => void
    // Rest of the interface remains the same
    handleRightDrawerAddCounters: (event: React.MouseEvent | { preventDefault: () => void }, isHandler: boolean) => void
    handleRightDrawerAddInnerCounters: (
        event: React.MouseEvent | { preventDefault: () => void },
        index: number,
        innerIndex: number,
    ) => void
    handleRightDrawerAnyFormChange: (
        event: FormEvent,
        index: number,
        innerIndex: number | string,
        entityIndex: number,
        isHandler: boolean,
    ) => void
    handleRightDrawerCheckIfAINLPIsChosenInBefore: (dynamicDataHandlerObj: any) => boolean
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
    handleRightDrawerUploadIconClicked: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleRightDrawerSetIconNameInItsNode: (realName: string, name: string, index: string | number) => void
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
}

export const useRightDrawerStore = create<RightDrawerStore>((set, get) => ({
    // Add the handleSnackBarMessageOpen function
    handleSnackBarMessageOpen: (message, color, duration) => {
        const { setShowSnackBarMessage } = useFlowStore.getState()
        setShowSnackBarMessage({ open: true, message, color, duration })
    },

    // Now update the handleRightDrawerAnyFormChange function to handle the event.target properly
    handleRightDrawerAnyFormChange: (event, index, innerIndex, entityIndex, isHandler) => {
        const { nodes, setNodes, clickedElement, variablesNamesOfEachRPA, intents, operations } = useFlowStore.getState()
        const { handleRightDrawerCheckIfRemovedConditionIsConnectedWhenSubtractCounters, handleSnackBarMessageOpen } = get()

        let { name, value, checked, type } = event.target
        const elementsIndex = nodes.findIndex((element) => element.id === clickedElement.id)

        if (elementsIndex === -1) return

        const newArray = [...nodes]
        let newData = { ...newArray[elementsIndex].data }

        if (type === "checkbox") {
            // Type is CheckBox or Switch
            value = checked
        } else {
            // Type is TextField or Select
            if (!Array.isArray(value)) {
                if (typeof value === "string" && !value.trim()) {
                    // Prevent user from typing only space
                    value = value.trim()
                }
            }
        }

        if (index === -1) {
            newData = { ...newData, [name]: value }
        } else {
            if (!isHandler) {
                if (nodes[elementsIndex].type === "RPA") {
                    const newRPAVariables = [...newData.rpaVariables]

                    if (innerIndex !== "asVariable") {
                        newRPAVariables[index] = { ...newRPAVariables[index], [innerIndex]: value }
                    } else {
                        if (variablesNamesOfEachRPA[newArray[elementsIndex].id]) {
                            newRPAVariables[index] = { ...newRPAVariables[index], [innerIndex]: value } // innerIndex is asVariable and value is true or false
                            if (value === true) {
                                newRPAVariables[index] = {
                                    ...newRPAVariables[index],
                                    [Object.keys(newRPAVariables[index])[0]]: variablesNamesOfEachRPA[nodes[elementsIndex].id][0],
                                } // When innerIndex (asVariable) which is true switch to dropdown and select first element of variablesNamesOfEachRPA as default value
                            } else {
                                newRPAVariables[index] = {
                                    ...newRPAVariables[index],
                                    [Object.keys(newRPAVariables[index])[0]]:
                                        nodes[elementsIndex].data.inputs[Object.keys(newRPAVariables[index])[0]],
                                } // When innerIndex (asVariable) which is false switch to text input reset its value
                            }
                        } else {
                            handleSnackBarMessageOpen("There is no existed variable related to this rpa !!", "#ce3a32", 2000)
                        }
                    }

                    newData = { ...newData, rpaVariables: newRPAVariables }
                } else {
                    if (
                        name === "urlSwitch" &&
                        value === true &&
                        handleRightDrawerCheckIfRemovedConditionIsConnectedWhenSubtractCounters(
                            newArray[elementsIndex],
                            false,
                            index,
                        )
                    ) {
                        handleSnackBarMessageOpen(
                            "This Choice is connected, Please remove connection so you can enable URL",
                            "#ce3a32",
                            2000,
                        )
                    } else {
                        const newFormData = [...newData.formData]
                        let newObject = { ...newFormData[index] }

                        newObject = { ...newObject, [name]: value }
                        newFormData[index] = newObject
                        newData = { ...newData, formData: newFormData }
                    }
                }
            } else {
                if (typeof innerIndex === "number" && innerIndex > -1) {
                    const newDynamicDataHandler = [...newData.dynamicDataHandler]
                    const newDynamicDataHandlerObject = { ...newDynamicDataHandler[index] }
                    const newInnerDynamicDataHandler = [...newDynamicDataHandlerObject.innerDynamicDataHandler]
                    let newInnerDynamicDataHandlerObject = { ...newInnerDynamicDataHandler[innerIndex] }

                    if (entityIndex > -1) {
                        const newEntities = [...newInnerDynamicDataHandlerObject.entities]
                        let newEntityObject = { ...newEntities[entityIndex] }

                        newEntityObject = { ...newEntityObject, [name]: value }
                        newEntities[entityIndex] = { ...newEntityObject }
                        newInnerDynamicDataHandlerObject = {
                            ...newInnerDynamicDataHandlerObject,
                            entities: newEntities,
                        }
                        newInnerDynamicDataHandler[innerIndex] = { ...newInnerDynamicDataHandlerObject }
                    } else {
                        // For Handler, Message, ListCard, ChoicePrompt and WebListCard
                        if (name === "choice" && value === "Keyword") {
                            // If Choice changed to Keyword
                            newInnerDynamicDataHandlerObject = { value: "", save: false, variableName: "" }
                        } else if (name === "choice" && value === "AI NLP") {
                            // If Choice changed to AI NLP
                            newInnerDynamicDataHandlerObject = { intent: intents[0], entities: [] }
                        } else if (name === "choice" && value === "Variable") {
                            // If Choice changed to Variable
                            newInnerDynamicDataHandlerObject = { value: "", operator: operations[0] }
                        }
                        newInnerDynamicDataHandlerObject = { ...newInnerDynamicDataHandlerObject, [name]: value }
                    }
                    newInnerDynamicDataHandler[innerIndex] = { ...newInnerDynamicDataHandlerObject }
                    newDynamicDataHandler[index] = {
                        ...newDynamicDataHandler[index],
                        innerDynamicDataHandler: newInnerDynamicDataHandler,
                    }
                    newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
                } else {
                    // For Date Prompt and Number Prompt
                    const newDynamicDataHandler = [...newData.dynamicDataHandler]
                    const newDynamicDataHandlerObject = { ...newDynamicDataHandler[index] }

                    newDynamicDataHandler[index] = { ...newDynamicDataHandlerObject, [name]: value }
                    newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
                }
            }
        }

        newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }
        console.log({newArray});
        
        setNodes(newArray)
    },

    // Update the handleRightDrawerSubtractCounters function to use the local handleSnackBarMessageOpen
    handleRightDrawerSubtractCounters: (event, index, isHandler) => {
        const { nodes, setNodes, clickedElement } = useFlowStore.getState()
        const {
            handleRightDrawerCheckIfRemovedConditionIsConnectedWhenSubtractCounters,
            handleRightDrawerAdjustConnectionsWhenSubtractCounters,
            handleSnackBarMessageOpen,
        } = get()

        const elementsIndex = nodes.findIndex((element) => element.id === clickedElement.id)

        if (elementsIndex === -1) return

        const newNodes = [...nodes]
        let newData = { ...newNodes[elementsIndex].data }

        if (
            handleRightDrawerCheckIfRemovedConditionIsConnectedWhenSubtractCounters(
                { ...newNodes[elementsIndex] },
                isHandler,
                index,
            )
        ) {
            let alertMessage = isHandler ? "Condition" : "Choice"
            alertMessage = alertMessage + " is connected !! To remove it, Please remove connection first."

            handleSnackBarMessageOpen(alertMessage, "#ce3a32", 2000)
        } else {
            let newDynamicDataHandler = null

            if (newNodes[elementsIndex].type === "Handler") {
                newDynamicDataHandler = [...newData.dynamicDataHandler]
                newDynamicDataHandler.splice(index, 1)
                newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }

                newNodes[elementsIndex] = { ...newNodes[elementsIndex], data: newData }
                handleRightDrawerAdjustConnectionsWhenSubtractCounters(newNodes, newNodes[elementsIndex].id, false, index)
            } else if (newNodes[elementsIndex].type === "Message") {
                newDynamicDataHandler = [...newData.dynamicDataHandler]
                newDynamicDataHandler.splice(index, 1)
                newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }

                newNodes[elementsIndex] = { ...newNodes[elementsIndex], data: newData }
                handleRightDrawerAdjustConnectionsWhenSubtractCounters(newNodes, newNodes[elementsIndex].id, false, index)
            } else if (newNodes[elementsIndex].type === "DatePrompt") {
                newDynamicDataHandler = [...newData.dynamicDataHandler]
                newDynamicDataHandler.splice(index, 1)
                newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }

                newNodes[elementsIndex] = { ...newNodes[elementsIndex], data: newData }
                handleRightDrawerAdjustConnectionsWhenSubtractCounters(newNodes, newNodes[elementsIndex].id, false, index)
            } else if (newNodes[elementsIndex].type === "NumberPrompt") {
                newDynamicDataHandler = [...newData.dynamicDataHandler]
                newDynamicDataHandler.splice(index, 1)
                newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }

                newNodes[elementsIndex] = { ...newNodes[elementsIndex], data: newData }
                handleRightDrawerAdjustConnectionsWhenSubtractCounters(newNodes, newNodes[elementsIndex].id, false, index)
            } else if (newNodes[elementsIndex].type === "ChoicePrompt") {
                if (!isHandler) {
                    const newFormData = [...newData.formData]
                    newFormData.splice(index, 1)
                    newData = { ...newData, formData: newFormData }

                    newNodes[elementsIndex] = { ...newNodes[elementsIndex], data: newData }
                    handleRightDrawerAdjustConnectionsWhenSubtractCounters(newNodes, newNodes[elementsIndex].id, false, index)
                } else {
                    newDynamicDataHandler = [...newData.dynamicDataHandler]
                    newDynamicDataHandler.splice(index, 1)
                    newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }

                    newNodes[elementsIndex] = { ...newNodes[elementsIndex], data: newData }
                    handleRightDrawerAdjustConnectionsWhenSubtractCounters(newNodes, newNodes[elementsIndex].id, true, index)
                }
            } else if (newNodes[elementsIndex].type === "WebListCard") {
                if (!isHandler) {
                    const newFormData = [...newData.formData]
                    newFormData.splice(index, 1)
                    newData = { ...newData, formData: newFormData }

                    newNodes[elementsIndex] = { ...newNodes[elementsIndex], data: newData }
                    handleRightDrawerAdjustConnectionsWhenSubtractCounters(newNodes, newNodes[elementsIndex].id, false, index)
                } else {
                    newDynamicDataHandler = [...newData.dynamicDataHandler]
                    newDynamicDataHandler.splice(index, 1)
                    newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }

                    newNodes[elementsIndex] = { ...newNodes[elementsIndex], data: newData }
                    handleRightDrawerAdjustConnectionsWhenSubtractCounters(newNodes, newNodes[elementsIndex].id, true, index)
                }
            } else if (newNodes[elementsIndex].type === "ListCard") {
                if (!isHandler) {
                    const newFormData = [...newData.formData]
                    newFormData.splice(index, 1)
                    newData = { ...newData, formData: newFormData }

                    newNodes[elementsIndex] = { ...newNodes[elementsIndex], data: newData }
                    handleRightDrawerAdjustConnectionsWhenSubtractCounters(newNodes, newNodes[elementsIndex].id, false, index)
                } else {
                    newDynamicDataHandler = [...newData.dynamicDataHandler]
                    newDynamicDataHandler.splice(index, 1)
                    newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }

                    newNodes[elementsIndex] = { ...newNodes[elementsIndex], data: newData }
                    handleRightDrawerAdjustConnectionsWhenSubtractCounters(newNodes, newNodes[elementsIndex].id, true, index)
                }
            }
        }
    },

    // Update the handleRightDrawerUploadIconClicked function to use the local handleSnackBarMessageOpen
    handleRightDrawerUploadIconClicked: (event) => {
        const { authToken, clickedElement } = useFlowStore.getState()
        const { handleRightDrawerSetIconNameInItsNode, handleSnackBarMessageOpen } = get()

        const index = event.target.name
        const file = event.target.files?.[0]

        if (file && file.name) {
            // Upload file to server
            const formData = new FormData()

            formData.append("file", file)
            formData.append("name", file.name)

            axios
                .post(process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_URL + "images/api/uploads", formData, {
                    headers: {
                        Authorization: "Bearer " + authToken,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    handleRightDrawerSetIconNameInItsNode(response.data.image_name, file.name, index)
                    handleSnackBarMessageOpen("Icon Uploaded", "#68b04b", 1500)
                })
                .catch((error) => {
                    const errorData =
                        error.response && error.response.data && error.response.data.err ? error.response.data.err : false
                    console.log("Upload Error errorData", error.response)

                    if (errorData && errorData.includes("already exists")) {
                        handleRightDrawerSetIconNameInItsNode(error.response.data.file_name, file.name, index)
                        handleSnackBarMessageOpen("Icon Already Exists", "#d4b72a", 1500)
                    } else if (errorData && errorData.includes("Size")) {
                        handleSnackBarMessageOpen("Failed Uploading Icon (Size greater than 20 MB)", "#ce3a32", 2000)
                    } else {
                        handleSnackBarMessageOpen("Failed Uploading Icon !!", "#ce3a32", 2000)
                    }
                })
        }
    },

    // Keep the rest of the functions as they are
    handleRightDrawerAddCounters: (event, isHandler) => {
        const { nodes, setNodes, clickedElement } = useFlowStore.getState()
        const elementsIndex = nodes.findIndex((element) => element.id === clickedElement.id)

        if (elementsIndex === -1) return

        const newArray = [...nodes]
        let newData = { ...newArray[elementsIndex].data }
        let newFormData = null
        let newDynamicDataHandler = null

        if (newArray[elementsIndex].type === "Handler") {
            newDynamicDataHandler = [...newData.dynamicDataHandler]
            newDynamicDataHandler = newDynamicDataHandler.concat({
                innerDynamicDataHandler: [{ choice: "Keyword", value: "", save: false, variableName: "" }],
            })
            newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
        } else if (newArray[elementsIndex].type === "Message") {
            newDynamicDataHandler = [...newData.dynamicDataHandler]
            newDynamicDataHandler = newDynamicDataHandler.concat({
                innerDynamicDataHandler: [{ choice: "Keyword", value: "", save: false, variableName: "" }],
            })
            newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
        } else if (newArray[elementsIndex].type === "DatePrompt") {
            newDynamicDataHandler = [...newData.dynamicDataHandler]
            const { operations } = useFlowStore.getState()
            newDynamicDataHandler = newDynamicDataHandler.concat({ value: "", operator: operations[0] })
            newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
        } else if (newArray[elementsIndex].type === "NumberPrompt") {
            newDynamicDataHandler = [...newData.dynamicDataHandler]
            const { operations } = useFlowStore.getState()
            newDynamicDataHandler = newDynamicDataHandler.concat({ value: "", operator: operations[0] })
            newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
        } else if (newArray[elementsIndex].type === "ChoicePrompt") {
            if (!isHandler) {
                newFormData = [...newData.formData]
                newFormData = newFormData.concat({ text: "" })
                newData = { ...newData, formData: newFormData }
            } else {
                newDynamicDataHandler = [...newData.dynamicDataHandler]
                newDynamicDataHandler = newDynamicDataHandler.concat({
                    innerDynamicDataHandler: [{ choice: "Keyword", value: "", save: false, variableName: "" }],
                })
                newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
            }
        } else if (newArray[elementsIndex].type === "WebListCard") {
            if (!isHandler) {
                newFormData = [...newData.formData]
                newFormData = newFormData.concat({ text: "" })
                newData = { ...newData, formData: newFormData }
            } else {
                newDynamicDataHandler = [...newData.dynamicDataHandler]
                newDynamicDataHandler = newDynamicDataHandler.concat({
                    innerDynamicDataHandler: [{ choice: "Keyword", value: "", save: false, variableName: "" }],
                })
                newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
            }
        } else if (newArray[elementsIndex].type === "ListCard") {
            if (!isHandler) {
                newFormData = [...newData.formData]
                newFormData = newFormData.concat({ text: "", urlSwitch: false, url: "" })
                newData = { ...newData, formData: newFormData }
            } else {
                newDynamicDataHandler = [...newData.dynamicDataHandler]
                newDynamicDataHandler = newDynamicDataHandler.concat({
                    innerDynamicDataHandler: [{ choice: "Keyword", value: "", save: false, variableName: "" }],
                })
                newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
            }
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

    handleRightDrawerCheckIfAINLPIsChosenInBefore: (dynamicDataHandlerObj) => {
        let ainlpNotChosenYet = true

        dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj: { choice: string }) => {
            if (innerDynamicDataHandlerObj.choice === "AI NLP") {
                ainlpNotChosenYet = false
            }
        })

        return ainlpNotChosenYet
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

    handleRightDrawerSetIconNameInItsNode: (realName, name, index) => {
        const { nodes, setNodes, clickedElement } = useFlowStore.getState()
        const elementsIndex = nodes.findIndex((element) => element.id === clickedElement.id)

        if (elementsIndex === -1) return

        const newArray = [...nodes]
        let newData = { ...newArray[elementsIndex].data }
        const newFormData = [...newData.formData]
        let newObject = { ...newFormData[index as number] }
        const fullURL = process.env.REACT_APP_UPLOAD_FILE_URL + "/img/" + realName

        newObject = { ...newObject, icon: fullURL, virtualIcon: name }
        newFormData[index as number] = newObject
        newData = { ...newData, formData: newFormData }
        newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }

        setNodes(newArray)
    },
}))

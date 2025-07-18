import { useNodesData } from "@xyflow/react"
import axios from "axios"
import { Loader2, RefreshCw } from "lucide-react"
import { useEffect, useRef } from "react"
import { cn } from "../../lib/utils"
import { useApiData, useApiStore } from "../../store/api-store"
import { useRightDrawerStore } from "../../store/right-drawer-store"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { SearchableSelect } from "./searchable-select"
import { useFlowStore } from "../../store/flow-store"


function isJsonObjectOrArray(input: string): boolean {
    try {
        const parsed = JSON.parse(input)
        if (typeof parsed === "object" && parsed !== null) {
            return true
        }
        return false
    } catch (e) {
        return false
    }
}

function stringifyStable(obj: any): string {
    return JSON.stringify(obj, Object.keys(obj).sort())
}

function getNestedPropertyValue(object: any, propertyString: string): any {
    const properties = propertyString.split(".")
    let value = object
    for (const property of properties) {
        if (value && typeof value === "object") {
            if (property.startsWith("[") && property.endsWith("]")) {
                const match = property.match(/\[(\d+)\]/)
                if (match) {
                    value = value[Number.parseInt(match[1])]
                }
            } else {
                value = isJsonObjectOrArray(value[property]) ? JSON.parse(value[property]) : value[property]
            }
        } else {
            value = undefined
            break
        }
    }
    return value
}

function getCompNameName({
    id,
    variableName,
    isCredential,
}: {
    id: string
    variableName: string
    isCredential: boolean
}): string {
    return `${!isCredential ? id + "-" + variableName : "credential"}`
}

function getList(list: any[], isCred: boolean, credType?: string, isMultiselect?: boolean): any[] {
    return isMultiselect
        ? list
        : isCred && credType && credType === "Custom"
            ? [{ label: "None", value: "None" }, ...list.filter((cred) => cred.type === credType)]
            : isCred && credType && credType !== "Custom"
                ? [
                    { label: "None", value: "None" },
                    ...list.filter((cred) => cred.type === credType),
                    { label: " + Create new credential", value: " + Create new credential", credType },
                ]
                : [{ label: "None", value: "None" }, ...list]
}

function isUsingVariable(value: string): boolean {
    return !!value && value.includes("{{") && value.includes("}}")
}

function checkIfVariableInDropDown(value: string, options: string[], isCred: boolean, isMulti: boolean): boolean {
    return options.includes(value)
}

let backup: Record<string, any> = {}

interface ApiCallerProps {
    flowZoneSelectedId?: string
    apiJson: any
    onChange: (args: { name: string | string[]; val: any }) => void
    inDynamic?: boolean
    disabled?: boolean
    helperSpan?: string
    value: string
}

export function ApiCaller({
    flowZoneSelectedId,
    apiJson,
    onChange,
    inDynamic,
    disabled,
    helperSpan,
    value
}: ApiCallerProps) {
    const { setListAndDropDownList, setIsLoadingList, setFetchList, setNotFetchingListAsFirstTime } = useApiStore()
    const flowZoneSelectedElement = useNodesData(flowZoneSelectedId || "")
    const compName = getCompNameName({
        id: flowZoneSelectedElement?.id || "",
        variableName: apiJson.variableName,
        isCredential: apiJson.hasOwnProperty("credential"),
    })

    const { list: ListsForThisNode, isLoading: isLoadingList, notFetchingAsFirstTime } = useApiData(compName)

    // Get finale object from flow store or other source
    const finaleObj = useRightDrawerStore(state => state.automation.filledData[flowZoneSelectedId || ""]?.["json"]) || {}
    backup = { ...backup, [compName]: { ...backup[compName], ["1"]: finaleObj } };

    const isUsingAi = apiJson.hasAI && value === "##AI##"
    const prevVariableRef = useRef(null)
    const controllerRef = useRef<AbortController>(null)

    const saveRightSide = (listChange?: boolean) => {

    }

    const didComponentUnmount = useRef(false)

    useEffect(() => {
        return () => {
            didComponentUnmount.current = true
            if (controllerRef.current) {
                controllerRef.current.abort()
            }
            backup = {
                ...backup,
                [compName]: { ...backup[compName], ["b"]: backup[compName]?.["1"] },
            }
        }
    }, [compName])

    useEffect(() => {
        setTimeout(() => {
            if (!isUsingAi && notFetchingAsFirstTime !== undefined && !apiJson.multiselect && !isLoadingList) {
                if (
                    !isUsingVariable(value) &&
                    value !== "None" &&
                    !ListsForThisNode.find((elt) => elt.value === value)
                ) {
                    if (inDynamic === undefined || inDynamic) {
                        onChange({
                            name: ["value"],
                            val: ["None"],
                        })
                    } else {
                        onChange({
                            name: "value",
                            val: "None",
                        })
                    }
                    saveRightSide()
                }
            }
        }, 100)
    }, [stringifyStable(ListsForThisNode), notFetchingAsFirstTime, isLoadingList])

    const callDynamicAPI = (config: any, res: any) => {
        controllerRef.current = new AbortController()

        setNotFetchingListAsFirstTime({ id: compName, status: true })
        setIsLoadingList({ id: compName, status: true })
        setFetchList({ id: compName, status: false })

        const IF_KEY_VALUE_IS_NOT_OBJECT_GET_VALUE = (array: any[]) => {
            let value = ""
            array.forEach((key) => {
                if (key.type === "static") {
                    value = `${value}${key.value}`
                }
                if (key.type === "redux") {
                    value = `${value}eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsIm5hbWUiOiJUZXN0aW5nIFVzZXIiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NDg3NjIzNzZ9.XB40BA-XoZJFGkK4TAbLbiHDWJ_czGWowMP9gzI0-K4`
                } else if (key.type === "dynamic") {
                    value = `${value}${finaleObj[key.value]}`
                }
            })
            return value
        }

        const getTheValueOfTheKey = (rawPayload: any[]) => {
            let newData: Record<string, any> = {}
            rawPayload.forEach((d) => {
                if (d.dependOn) {
                    if (d.dependOn === "redux") {
                        newData = {
                            ...newData,
                            [d.key]: getNestedPropertyValue(finaleObj, d.value),
                        }
                    } else if (d.isAutomation === false) {
                        newData = {
                            ...newData,
                            [d.key]: getNestedPropertyValue(flowZoneSelectedElement, `data.rightSideData.${d.dependOn}`),
                        }
                    } else if (Array.isArray(d.dependOn)) {
                        newData = {
                            ...newData,
                            [d.key]: IF_KEY_VALUE_IS_NOT_OBJECT_GET_VALUE(d.dependOn),
                        }
                    } else if (d.isAutomation === true && d.dependOn.includes(".")) {
                        newData = {
                            ...newData,
                            [d.key]: getNestedPropertyValue(finaleObj, d.dependOn),
                        }
                    } else {
                        newData = { ...newData, [d.key]: finaleObj[d.dependOn] }
                    }
                } else if (d.condition) {
                    if (d.fun && d.finaleObj) {
                        newData = {
                            ...newData,
                            [d.key]: d.fun(finaleObj[d.condition]) ? finaleObj[d.yes] : finaleObj[d.no],
                        }
                    }
                } else if (d.obj) {
                    newData = { ...newData, [d.key]: getTheValueOfTheKey(d.obj) }
                } else {
                    if (d.fun) {
                        newData = { ...newData, [d.key]: d.fun(finaleObj[d.dependOn]) }
                    }
                    newData = {
                        ...newData,
                        [d.key]: d.value,
                    }
                }
            })
            return newData
        }

        const FinalData = getTheValueOfTheKey(apiJson.config)
        const signal = controllerRef.current.signal

        axios({ ...FinalData, signal })
            .then((response) => {
                const arr = getNestedPropertyValue(response, res.path)
                const keyVar: Record<string, any> = {}
                let list: any[] = []

                if (Array.isArray(arr)) {
                    if (res.hasOwnProperty("keys")) {
                        list = arr.map((a) => {
                            Object.keys(res.keys).map((key) => {
                                keyVar[key] = ""
                                if (res.keys[key].hasOwnProperty("path")) {
                                    const nested = getNestedPropertyValue(a, res.keys[key].path)
                                    res.keys[key].fields.map((o: string) => {
                                        if (keyVar[key] === "") keyVar[key] = `${nested[o]}`
                                        else keyVar[key] = `${keyVar[key]} ${nested[o]}`
                                    })
                                } else if (res.keys[key].hasOwnProperty("allFields")) {
                                    keyVar[key] = a
                                } else {
                                    res.keys[key].fields.map((o: string) => {
                                        if (keyVar[key] === "") {
                                            if (a.hasOwnProperty(o)) {
                                                if (typeof a[o] === "string") {
                                                    keyVar[key] = `${a[o]}`
                                                } else keyVar[key] = stringifyStable(a[o])
                                            } else keyVar[key] = o
                                        } else {
                                            if (a.hasOwnProperty(o)) keyVar[key] = `${keyVar[key]}${a[o]}`
                                            else keyVar[key] = `${keyVar[key]}${o}`
                                        }
                                    })
                                }
                            })
                            return { ...keyVar }
                        })
                    } else {
                        list = arr.map((a) => {
                            return { option: a, value: a }
                        })
                    }

                    setListAndDropDownList({
                        id: compName,
                        list: list.map(e => ({ ...e, label: e.option })),
                    })
                }

                if (
                    !apiJson.multiselect &&
                    value !== "None" &&
                    !isUsingVariable(value) &&
                    !checkIfVariableInDropDown(
                        value,
                        list?.map((c) => c.value),
                        false,
                        false,
                    )
                ) {
                    onChange({
                        name: "value",
                        val: "None",
                    })
                }

                setIsLoadingList({
                    id: compName,
                    status: false,
                })
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log("Request was canceled:", error.message)
                    return
                }
                console.error("Error calling API:", error)

                setIsLoadingList({
                    id: compName,
                    status: false,
                })

                onChange({
                    name: ["value"],
                    val: [apiJson.multiselect ? [] : "None"],
                })

                setListAndDropDownList({
                    id: compName,
                    list: [],
                })
            })
    }

    // Validation logic for dependencies
    const validateDependencies = () => {
        let valid = false
        const validArr: boolean[] = []

        if (apiJson.hasOwnProperty("apiDependsOn") && apiJson.apiDependsOn.length > 0) {
            valid = true
            apiJson.apiDependsOn.map((elt: any) => {
                console.log({ elt, finaleObj, backup });

                if (elt.isAutomation === false) {
                    const valueInCompJson = getNestedPropertyValue(flowZoneSelectedElement, `data.rightSideData.${elt.name}`)
                    if (
                        valueInCompJson === "" ||
                        valueInCompJson === undefined ||
                        (typeof valueInCompJson === "object" && JSON.stringify(valueInCompJson) === "{}")
                    ) {
                        valid = false
                    }
                } else {
                    console.log("outttttttttttttt", finaleObj);

                    if (Object.keys(finaleObj).length > 0) {
                        console.log("innnnnnnnn");

                        if (
                            backup[compName]?.hasOwnProperty("b") &&
                            Object.keys(backup[compName]["b"]).length > 0 &&
                            typeof backup[compName]["b"][elt.name] !== undefined
                        ) {
                            if (backup[compName]["b"][elt.name] === getNestedPropertyValue(finaleObj, elt.name)) {
                                validArr.push(false)
                                backup = {
                                    ...backup,
                                    [compName]: { ["1"]: backup[compName]["1"] },
                                }
                            } else validArr.push(true)
                        }
                        if (validArr.length > 0 && validArr.every((e) => e === false)) {
                            valid = false
                        }
                        if (
                            elt.type === "dropdown" &&
                            (!getNestedPropertyValue(finaleObj, elt.name) ||
                                (getNestedPropertyValue(finaleObj, elt.name) &&
                                    typeof getNestedPropertyValue(finaleObj, elt.name) === "string" &&
                                    getNestedPropertyValue(finaleObj, elt.name).trim() === "None"))
                        ) {
                            if (elt.hasOwnProperty("value")) {
                                if (getNestedPropertyValue(finaleObj, elt.name) !== elt.value) {
                                    valid = false
                                }
                            } else valid = false
                        } else if (
                            elt.type === "textfield" &&
                            (!getNestedPropertyValue(finaleObj, elt.name) ||
                                getNestedPropertyValue(finaleObj, elt.name).trim() === "")
                        ) {
                            valid = false
                        }
                    } else valid = false
                }
            })
        } else valid = true

        return valid
    }

    // Effect for dependency changes
    useEffect(() => {
        const valid = validateDependencies()

        if (notFetchingAsFirstTime !== undefined && valid && (inDynamic === undefined || inDynamic) && !isUsingAi) {
            console.log("dep", !apiJson.hasOwnProperty("credential"))
            callDynamicAPI(apiJson.config, apiJson.res)
        }
    }, [
        ...apiJson.apiDependsOn.map((e: any) => {
            if (e.isAutomation === false) {
                return JSON.stringify(getNestedPropertyValue(flowZoneSelectedElement, `data.rightSideData.${e.name}`))
            } else {
                return JSON.stringify(getNestedPropertyValue(finaleObj, e.name))
            }
        }),
    ])
    console.log({ finaleObj });

    // Effect for initial load
    useEffect(() => {
        console.log({ notFetchingAsFirstTime });

        if (!notFetchingAsFirstTime) {
            const valid = validateDependencies()
            console.log({ valid });

            if (valid && !isUsingAi) {
                console.log("first", !apiJson.hasOwnProperty("credential"))
                callDynamicAPI(apiJson.config, apiJson.res)
            }
        }
    }, [
        value,
        notFetchingAsFirstTime,
        ...apiJson.apiDependsOn.map((e: any) => {
            if (e.isAutomation === false) {
                return getNestedPropertyValue(flowZoneSelectedElement, `data.rightSideData.${e.name}`)
            } else {
                return JSON.stringify(getNestedPropertyValue(finaleObj, e.name))
            }
        }),
    ])

    // Check if component should be disabled
    let isDisabled = false
    apiJson.apiDependsOn.forEach((elt: any) => {
        console.log({ flowZoneSelectedElement, elt });
        if (elt.isAutomation === false) {
            if (
                getNestedPropertyValue(flowZoneSelectedElement, `data.rightSideData.${elt.name}`) === "" ||
                getNestedPropertyValue(flowZoneSelectedElement, `data.rightSideData.${elt.name}`) === undefined
            ) {
                isDisabled = true
            }
        } else {
            if (Object.keys(finaleObj).length !== 0) {
                if (
                    elt.type === "dropdown" &&
                    (!getNestedPropertyValue(finaleObj, elt.name) ||
                        (getNestedPropertyValue(finaleObj, elt.name) &&
                            typeof getNestedPropertyValue(finaleObj, elt.name) === "string" &&
                            getNestedPropertyValue(finaleObj, elt.name).trim() === "None"))
                ) {
                    if (elt.hasOwnProperty("value")) {
                        if (getNestedPropertyValue(finaleObj, elt.name) !== elt.value) {
                            isDisabled = true
                        }
                    } else {
                        isDisabled = true
                    }
                } else if (
                    elt.type === "textfield" &&
                    (!getNestedPropertyValue(finaleObj, elt.name) || getNestedPropertyValue(finaleObj, elt.name).trim() === "")
                ) {
                    isDisabled = true
                }
            }
        }
    })

    if (isDisabled && isLoadingList === false) {
        if (!apiJson.multiselect && value !== "None") {
            onChange({
                name: "value",
                val: "None",
            })
        } else if (apiJson.multiselect && value.length > 0) {
            onChange({
                name: "value",
                val: [],
            })
        }
    }

    const disable = isLoadingList || isDisabled || disabled || isUsingAi
    const finalList = getList(ListsForThisNode, apiJson.credential, apiJson.credType, apiJson.multiselect)
    const setFormDialogStatus = useFlowStore(state => state.setFormDialogStatus)
    const setIsFormDialogOpen = useFlowStore(state => state.setIsFormDialogOpen)
    const setDialogProps = useFlowStore((state) => state.setDialogProps);

    const handleChange = (value: any) => {
        if (value === " + Create new credential") {
            setFormDialogStatus("createCred")
            setIsFormDialogOpen(true)
            setDialogProps({ credType: apiJson.credType, refetch: () => callDynamicAPI(apiJson.config, apiJson.res) })
        }
        else
            onChange({ name: "value", val: value })

    }

    const errorMessage =
        !isLoadingList && notFetchingAsFirstTime && finalList.length < (apiJson.multiselect ? 1 : 2) && !isDisabled
            ? "Make sure you have connection or you filled valid credentials"
            : null

    return (
        <div className="space-y-4">

            {apiJson.multiselect ? (
                <SearchableSelect
                    name={apiJson.variableName}
                    placeholder={apiJson.placeholder}
                    value={value}
                    onChange={handleChange}
                    options={finalList}
                    disabled={disable}
                    className="w-full"
                />
            ) : (
                <SearchableSelect
                    showRefresh
                    loading={isLoadingList}
                    onRefresh={() => callDynamicAPI(apiJson.config, apiJson.res)}
                    name={apiJson.variableName}
                    value={value}
                    onChange={handleChange}
                    options={finalList}
                    disabled={disable}
                    placeholder={apiJson.placeholder || `Select ${apiJson.label.toLowerCase()}`}
                    className="w-full"
                />
            )}

            {errorMessage && !isUsingVariable(value) && !isUsingAi && (
                <p className="text-xs text-destructive">{errorMessage}</p>
            )}

            {helperSpan && <p className="text-xs text-muted-foreground">{helperSpan}</p>}
        </div>
    )
}

export default ApiCaller

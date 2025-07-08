import axios, { AxiosRequestConfig } from "axios"
import { memo, useEffect } from "react"
import { isPlainObject } from "../../../../../lib/utils"
import { useApiData, useApiStore } from "../../../../../store/api-store"
import { SearchableSelect } from "../../../../custom/searchable-select"
import { Alert, AlertDescription } from "../../../../ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../ui/card"


interface TriggerData {
    name: string
    firstflowid: string
    id: string
    inputs: Record<string, any>
}

interface FlowOption {
    option: string
    value: string
    userId: string
    inputs: Record<string, any>
}

interface ApiResponse {
    triggers: TriggerData[]
}

interface RootState {
    authentication: {
        authToken: string
        userId: string
    }
    automationApi: {
        ListsForEachNode: {
            [key: string]: {
                isLoadingList?: boolean
                notFetchingListAsFirstTime?: boolean
                ListsForThisNode?: FlowOption[]
            }
        }
    }
}

interface ActiveFlowsProps {
    webhookActive: string
    flowZoneSelectedID: string
    variableName: string
    onContentUpdate: (key: string, value: any) => void;

}

const ActiveFlows: React.FC<ActiveFlowsProps> = ({
    webhookActive,
    flowZoneSelectedID,
    variableName,
    onContentUpdate

}) => {

    const authToken = ""
    const userId = ""
    const compName = flowZoneSelectedID + "-" + variableName
    const { list: ListsForThisNode, isLoading: isLoadingList, notFetchingAsFirstTime } = useApiData(compName)
    const { setListAndDropDownList, setIsLoadingList, setFetchList, setNotFetchingListAsFirstTime } = useApiStore()

    const getWebhookActiveList = (): void => {

        setNotFetchingListAsFirstTime({ id: compName, status: true })
        setIsLoadingList({ id: compName, status: true })
        setFetchList({ id: compName, status: false })

        const config: AxiosRequestConfig = {
            method: "get",
            url: process.env.REACT_APP_GET_ELEMENTS_URL + "get_active_triggers/WebhookTrigger",
            headers: {
                Authorization: "Bearer " + authToken,
            },
        }

        axios(config)
            .then((response: { data: ApiResponse }) => {
                const list: FlowOption[] = response.data.triggers.map((trig: TriggerData) => {
                    return {
                        option: trig.name,
                        value: trig.firstflowid,
                        userId: trig.id,
                        inputs: trig.inputs,
                    }
                })

                setListAndDropDownList({
                    id: compName,
                    list: list.map(e => ({ ...e, label: e.option })),
                })
                setIsLoadingList({ id: compName, status: false })


            })
            .catch((error: any) => {
                console.log("Webhook Active Triggers Error", error)
                setIsLoadingList({ id: compName, status: false })

                setListAndDropDownList({
                    id: compName,
                    list: [],
                })

            })
    }

    const onChange = (value: string | null): void => {
        onContentUpdate("webhookActive", value)

        if (value !== "None") {
            const flow = ListsForThisNode?.find((flow) => flow.value === value)

            if (flow) {
                onContentUpdate("webhookUrl", process.env.REACT_APP_GET_ELEMENTS_URL + "webhook?u_id=" + userId + "&file=" + flow.value)

                const inputs = flow.inputs
                onContentUpdate("inputs", inputs)

                const getKeys = (inputs: Record<string, any>): Record<string, any> => {
                    let inputsWithoutValue: Record<string, any> = {}
                    for (const key in inputs) {
                        console.log({ key })
                        if (isPlainObject(inputs[key])) {
                            inputsWithoutValue = {
                                ...inputsWithoutValue,
                                [key]: getKeys(inputs[key]),
                            }
                        } else {
                            inputsWithoutValue = { ...inputsWithoutValue, [key]: "" }
                        }
                    }
                    console.log({ inputsWithoutValue })
                    return inputsWithoutValue
                }

                if (JSON.stringify(inputs) !== "{}") {
                    onContentUpdate("inputsDescription", getKeys(inputs))

                } else {
                    onContentUpdate("inputsDescription", null)

                }
            }
        } else {
            onContentUpdate("inputsDescription", null)
        }
    }


    useEffect(() => {
        getWebhookActiveList()
    }, []) // eslint-disable-line

    console.log({ ListsForThisNode })

    return (
        <Card className="mt-2">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Webhook Active</CardTitle>

                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <SearchableSelect
                        name="webhook"
                        onChange={onChange}
                        options={(ListsForThisNode || [])}
                        placeholder="Select webhook"
                        value={webhookActive}
                        loading={isLoadingList}
                        onRefresh={() => getWebhookActiveList()}
                        showRefresh
                    />

                    {notFetchingAsFirstTime && !isLoadingList && ListsForThisNode?.length === 1 && (
                        <Alert>
                            <AlertDescription>
                                Please make sure you if there exist Active Flows for the email you signed in with
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default memo(ActiveFlows)

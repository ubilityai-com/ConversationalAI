import Cookies from "js-cookie"
import axios, { type AxiosRequestConfig } from "axios"
import { useFlowStore } from "../../../store/root-store"
import { OAuth2ServiceTypes } from "./OAuth2FlowServicesList"

// Type definitions
interface MyFunctions {
    formatDateWithMilliseconds: (expiryInSeconds: any) => string
    Buffer: (value: any) => string | undefined
}

interface GetFieldValueParams {
    path: string
    functionName?: string
    name: string
    apiRes: any
    isApiResJson: boolean
}

interface AutomateOAuth2Params {
    url: string
    payload?: Record<string, any>
    response_path?: string
    fieldsToAdd: string[]
    headers?: Record<string, string>
}

// Utility functions
function formatDateWithMilliseconds(expiryInSeconds: number): string {
    const now = new Date()
    const expirationDate = new Date(now.getTime() + expiryInSeconds * 1000)
    const year = expirationDate.getUTCFullYear()
    const month = String(expirationDate.getUTCMonth() + 1).padStart(2, "0")
    const day = String(expirationDate.getUTCDate()).padStart(2, "0")
    const hours = String(expirationDate.getUTCHours()).padStart(2, "0")
    const minutes = String(expirationDate.getUTCMinutes()).padStart(2, "0")
    const seconds = String(expirationDate.getUTCSeconds()).padStart(2, "0")
    const milliseconds = String(expirationDate.getUTCMilliseconds()).padStart(3, "0")
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`
    return formattedDate
}

function BufferValue(value: string): string | undefined {
    // return Buffer.from(value).toString("base64");
    return undefined
}

const myFunctions: MyFunctions = {
    formatDateWithMilliseconds: formatDateWithMilliseconds,
    Buffer: BufferValue,
}

function isSnakeCase(str: string): boolean {
    return /^[a-z_]+$/.test(str)
}

function snakeToCamel(str: string): string {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase())
}

function replaceValuesInString(inputString: string): string {
    const pattern = /\{\{([^{}]+)\}\}/g
    const result = inputString.replace(pattern, (match, captureGroup) => {
        const isCustomPath = captureGroup.includes("::")
        const valuePathList = captureGroup.split("::")

        if (isCustomPath) {
            if (valuePathList[1]?.trim() === "params") {
                const urlParams = new URLSearchParams(window.location.search)
                const code = urlParams.get(valuePathList[0]?.trim())
                return code || ""
            } else if (valuePathList[1]?.trim() === "zustand") {
                const store = useFlowStore.getState()
                return getResponseValues(store, valuePathList[0]?.trim() || "")
            }
        } else {
            return Cookies.get(captureGroup) || ""
        }
        return ""
    })
    return result
}

function replaceValues(inputObject: Record<string, any>): Record<string, any> {
    const result = { ...inputObject }

    for (const key in result) {
        if (result.hasOwnProperty(key)) {
            if (typeof result[key] === "object" && result[key] !== null) {
                result[key] = replaceValues(result[key])
            } else if (typeof result[key] === "string") {
                const pattern = /\{\{([^{}]+)\}\}/g
                const match = pattern.exec(result[key])
                if (match) {
                    const referenceKey = match[1]
                    const isCustomPath = referenceKey.includes("::")
                    const valuePathList = referenceKey.split("::")

                    if (isCustomPath) {
                        if (valuePathList[1]?.trim() === "params") {
                            const urlParams = new URLSearchParams(window.location.search)
                            const code = urlParams.get(valuePathList[0]?.trim())
                            result[key] = code || ""
                        }
                    } else {
                        result[key] = Cookies.get(referenceKey) || ""
                    }
                }
            }
        }
    }
    return result
}

const getResponseValues = (response: any, response_path: string): any => {
    const response_path_list = response_path.split(".")
    let res = response
    for (const key of response_path_list) {
        res = res?.[key]
    }
    return res
}

const reformatName = (name: string): string => {
    if (isSnakeCase(name)) return snakeToCamel(name)
    return name
}

function extractRespName(input: string): string | null {
    const regex = /\[(.*?)\]/
    const match = input.match(regex)
    return match ? match[1] : null
}

const getFieldValue = ({ path, functionName, name, apiRes, isApiResJson }: GetFieldValueParams): any => {
    console.log({ path, functionName, name, apiRes, isApiResJson })

    if (path.startsWith("response")) {
        let fieldName = name
        if (path.includes("[") && path.includes("]")) {
            fieldName = extractRespName(path) || name
        }

        const value = !isApiResJson ? apiRes : apiRes[fieldName]
        return functionName && myFunctions[functionName as keyof MyFunctions]
            ? myFunctions[functionName as keyof MyFunctions](value)
            : value
    } else if (path === "params") {
        const urlParams = new URLSearchParams(window.location.search)
        const paramValue = urlParams.get(name.trim())
        return functionName && myFunctions[functionName as keyof MyFunctions]
            ? myFunctions[functionName as keyof MyFunctions](paramValue || "")
            : paramValue
    }
    return null
}


export const automateOAuth2 = async ({
    url,
    payload,
    response_path,
    fieldsToAdd,
    headers,
}: AutomateOAuth2Params): Promise<void> => {
    const credType = Cookies.get("type")
    const cookieName = Cookies.get("name")
    const newPayload = payload ? replaceValues(payload) : undefined
    console.log({ newPayload })

    const newUrl = replaceValuesInString(url)
    let newHeaderKey = ""

    const config: AxiosRequestConfig = {
        method: "post",
        url: newUrl,
    }

    if (newPayload) {
        if (
            headers &&
            headers.hasOwnProperty("Content-Type") &&
            headers["Content-Type"] === "application/x-www-form-urlencoded"
        ) {
            config.data = new URLSearchParams(newPayload)
        } else {
            config.data = newPayload
        }
    }

    if (headers) {
        const updatedHeaders = { ...headers }

        if (headers.hasOwnProperty("Authorization") && headers.Authorization.includes("{{")) {
            newHeaderKey = replaceValuesInString(headers.Authorization)
            console.log({ newHeaderKey })

            if (newHeaderKey.includes("||")) {
                const valueToUseAndFunc = newHeaderKey.split("||")[1]
                const authorizationType = newHeaderKey.split("||")[0]
                const valueToUse = valueToUseAndFunc.split("=>")[0]
                const funcToUse = valueToUseAndFunc.split("=>")[1]
                console.log({ valueToUse })
                newHeaderKey = authorizationType + (myFunctions[funcToUse as keyof MyFunctions]?.(valueToUse) || "")
            }
            updatedHeaders["Authorization"] = newHeaderKey
            console.log({ newHeaderKey })
        }
        config.headers = updatedHeaders
    }

    console.log({ config })

    try {
        const response = await axios(config)
        let values: any

        if (response_path) {
            values = getResponseValues(response, response_path)
        } else {
            values = response.data
        }
        const credentialPayload = {
            type: credType || "",
            name: cookieName || "",
            data: fieldsToAdd.reduce((acc, field) => {
                const fieldInfo = field.split("::");

                let credentialName = "";
                let credentialValue: string = "";

                if (field.trim().includes("::")) {
                    if (fieldInfo[1]?.trim().includes("=>")) {
                        const fieldPathAndFunction = fieldInfo[1].trim().split("=>");
                        credentialName = reformatName(fieldInfo[0]);
                        credentialValue = getFieldValue({
                            name: fieldInfo[0],
                            apiRes: values,
                            functionName: fieldPathAndFunction[1],
                            path: fieldPathAndFunction[0],
                            isApiResJson: !!response_path,
                        });
                    } else {
                        credentialName = reformatName(fieldInfo[0]);
                        credentialValue = getFieldValue({
                            name: fieldInfo[0],
                            apiRes: values,
                            path: fieldInfo[1],
                            isApiResJson: !!response_path,
                        });
                    }
                } else if (field.toLowerCase() === "redirecturi") {
                    credentialName = field;
                    credentialValue = window.location.origin + window.location.pathname;
                } else {
                    credentialName = reformatName(field);
                    credentialValue = Cookies.get(field) || "";
                }

                // Skip if credential_name is "type" OR credential_value is empty after trim
                if (
                    credentialName.toLowerCase() !== "type" &&
                    credentialValue.trim() !== ""
                ) {
                    acc[credentialName] = credentialValue;
                }

                return acc;
            }, {} as Record<string, string>),

        }

        useFlowStore.getState().createCred(credentialPayload)
    } catch (error) {
        console.log("error", "Failed Creating Credential", "Please Make sure you filled correct Credentials")
    } finally {
        for (const key of fieldsToAdd) {
            Cookies.remove(key.trim().split("::")[0])
        }
        Cookies.remove("new_user")
        Cookies.remove("name")
        Cookies.remove("random_nb")
        Cookies.remove("type")

        if (typeof window !== "undefined") {
            window.history.replaceState({}, document.title, window.location.pathname)
        }
    }
}

export const StartOAuth2Flow = async (): Promise<void> => {
    const credType = Cookies.get("type")
    console.log({ credType })
    if (credType && credType.startsWith("Google")) {
        OAuth2ServiceTypes["Google"]();
    }
    else if (credType && OAuth2ServiceTypes.hasOwnProperty(credType)) {
        await OAuth2ServiceTypes[credType as keyof typeof OAuth2ServiceTypes]()
    } else {
        console.log("Error: cred type does not exist")
    }
}

export const OAuth2AuthenticationFlow = async (): Promise<void> => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")
    const cookieType = Cookies.get("type")

    if (code && cookieType) {
        await StartOAuth2Flow()
    } else if (Cookies.get("type") && !Cookies.get("continueProcess")) {
        setTimeout(() => {
            deleteAllCookiesExcept()
        }, 3000)
    }
}

export function deleteAllCookiesExcept(): void {
    const cookiesToKeep: Record<string, boolean> = {
        email: true,
        username: true,
        token: true,
        logedIn: true,
    }

    const allCookies = Cookies.get()

    for (const cookieName in allCookies) {
        if (Object.prototype.hasOwnProperty.call(allCookies, cookieName)) {
            if (!cookiesToKeep.hasOwnProperty(cookieName)) {
                Cookies.remove(cookieName)
            }
        }
    }
}
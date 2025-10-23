import Cookies from "js-cookie"
import { Copy, Eye, EyeOff, Plus, Settings, Shield, Zap } from "lucide-react"
import { Fragment, useEffect, useState } from "react"
import { useFlowStore } from "../../../store/root-store"
import type {
    AutoCompleteItem,
    CredentialField,
    CredentialInfo,
    CredentialModalProps
} from "../../../types/credentials-types"
import { CircularLoader } from "../../ui/CircularLoader"
import { Alert, AlertDescription } from "../../ui/alert"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Switch } from "../../ui/switch"
import { credsThatHaveConsentScreenList } from "./OAuth-signin-services"
import { CopyFields, CustomDynamicField, ServiceSelector } from "./credential-components"
import {
    containsOnlyLettersAndNumbers,
    credsThatNeedRedirects,
    serviceFields,
    setCredOnOneLevel,
} from "./credentialsData"



const credsWithImagesList = (serviceFields: CredentialInfo[]): AutoCompleteItem[] => {
    return serviceFields.map((opt) => ({
        title: opt.service,
        image: `/components-icons/${opt.service}.png`,
    }))
}


export function CreateCredentialDialog({
    open,
    onOpenChange,
    onSave,
    credType,
    refetch,
    credentialsList = [],
}: CredentialModalProps) {
    const defaultCred: CredentialInfo = serviceFields.find((cred) => cred.service === credType) || serviceFields[0]
    const [searchText, setSearchText] = useState("GoogleGmail")
    const [autoCompleteList, setAutoCompleteList] = useState<AutoCompleteItem[]>(credsWithImagesList(serviceFields))
    const [credInfo, setCredInfo] = useState<CredentialInfo>(defaultCred)
    const [error, setError] = useState<string | boolean>("")
    const [isLoadingApi, setIsLoadingApi] = useState(false)
    const [isCurrentCredOauth2, setIsCurrentCredOauth2] = useState(defaultCred?.defaultRedirectUri)
    const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})
    const { createCred, loading, success } = useFlowStore()

    useEffect(() => {
        resetCredInfo()
    }, [open])

    const resetCredInfo = () => {
        setCredInfo(defaultCred)
        setError("")
        setSearchText(defaultCred.service)
        setAutoCompleteList(credsWithImagesList(serviceFields))
        setIsCurrentCredOauth2(defaultCred?.defaultRedirectUri)
        setShowPassword({})
    }

    const updateCredentialValue = (
        credArray: CredentialField[],
        path: number[],
        value: any,
        optionKeys: string[] = [],
    ): CredentialField[] => {
        if (path.length === 0) return credArray

        const [currentIndex, ...remainingPath] = path

        return credArray.map((field, index) => {
            if (index !== currentIndex) return field

            // If this is the target field (no more path to traverse)
            if (remainingPath.length === 0) {
                return { ...field, Credential_value: value }
            }
            // Navigate deeper into options
            if (field.options && optionKeys.length > 0) {
                const [currentOptionKey, ...remainingOptionKeys] = optionKeys
                const optionValue = field.options[currentOptionKey]

                if (optionValue) {
                    return {
                        ...field,
                        options: {
                            ...field.options,
                            [currentOptionKey]: updateCredentialValue(optionValue, remainingPath, value, remainingOptionKeys),
                        },
                    }
                }
            }

            return field
        })
    }

    // Optimized recursive handleChange function
    const handleChange = (value: any, fieldIndex: number, level = 0, parentInfo?: any) => {
        setCredInfo((prev) => {
            let path: number[] = [fieldIndex]
            let optionKeys: string[] = []

            // Build path and option keys based on level and parentInfo
            if (level > 0 && parentInfo) {
                // Reconstruct the path from parentInfo
                path = []
                optionKeys = []

                // Add parent indices and option keys based on level
                for (let i = 0; i < level; i++) {
                    const parentIndex = parentInfo[`indexChild${i}`]
                    const optionKey = parentInfo[`child${i}`]

                    if (i === 0) {
                        path.push(parentIndex)
                    }

                    if (optionKey !== undefined) {
                        optionKeys.push(optionKey.toString())
                    }
                }

                // Add current field index
                path.push(fieldIndex)
            }

            return {
                ...prev,
                cred: updateCredentialValue(prev.cred, path, value, optionKeys),
            }
        })
    }

    const handleServiceChange = (serviceName: string) => {
        const newCred = serviceFields.find((s) => s.service === serviceName)
        if (newCred) {
            setCredInfo({
                ...newCred,
                Service_name: credInfo.Service_name,
            })
            setSearchText(serviceName)
            const currentCredType = newCred.cred.find((field) => field.credTypeConnection)
            const initialCredStatus = serviceName in credsThatNeedRedirects
            setIsCurrentCredOauth2(
                currentCredType ? currentCredType.Credential_value === "OAuth Application" : initialCredStatus,
            )
        }
    }

    const validateAndSave = async () => {
        let newCredInfo: CredentialInfo = { ...credInfo, cred: setCredOnOneLevel(credInfo.cred) }

        if (error) setError(false) // To satisfy TypeScript; replace with your real `error` state if needed

        let errorMsg: string | null = null

        if (newCredInfo.Service_name.trim().length > 0 && newCredInfo.service.trim().length > 0 && searchText.trim()) {
            newCredInfo.cred.forEach((c) => {
                if (c.custom) {
                    ; (c.Credential_value as { key: string; value: string }[]).some((item) => {
                        if (item.key.trim() === "" || item.value.trim() === "") {
                            errorMsg = "Please fill all the fields"
                            return true
                        }
                        return false
                    })
                }
                if (typeof c.Credential_value === "string" && c.Credential_value.trim().length < 3 && !c.optional) {
                    errorMsg = "Credential fields should be at least 3 characters."
                } else if (c.api && c.Credential_value === "") {
                    errorMsg = `Please choose a ${c.label}`
                }
            })

            if (errorMsg) {
                setError(errorMsg)
                return
            }

            const oAuth2Cred = newCredInfo.cred.find((c) => c.credTypeConnection)
            const currentCredConnectionTypeOauth = !!(
                oAuth2Cred &&
                (oAuth2Cred.Credential_value === "OAuth Application" || oAuth2Cred.Credential_value === "Default")
            )

            newCredInfo = {
                ...newCredInfo,
                cred: newCredInfo.cred.filter((f) => {
                    if (f.optional && (f.dropdown || f.radio)) {
                        return f.Credential_value !== ""
                    }
                    if (typeof f.Credential_value === "string") {
                        return f.Credential_value.trim().length > 0 || f.credTypeConnection
                    }
                    return true
                }),
            }

            const credNameAndFunctionForConsent = credsThatHaveConsentScreenList.find((c) => c.name === newCredInfo.service)
            const callConsentFunction = () => {
                setTimeout(() => credNameAndFunctionForConsent?.fn(), 100)
            }

            if (credentialsList.some((c) => c.name === newCredInfo.Service_name)) {
                setError("Credential name already exists.")
                return
            }

            if (!containsOnlyLettersAndNumbers(newCredInfo.Service_name)) {
                setError("The Name should only consist of letters and numbers, without any special characters or spaces.")
                return
            }

            if (newCredInfo.Service_name.length > 25) {
                setError("The credential name can have a maximum of 25 characters.")
                return
            }

            if (
                (!newCredInfo.CREATE && credNameAndFunctionForConsent && !credNameAndFunctionForConsent.condition) ||
                currentCredConnectionTypeOauth
            ) {
                if (credNameAndFunctionForConsent?.continueProcess) {
                    Cookies.set("continueProcess", newCredInfo.service)
                }
                newCredInfo.cred.forEach((c) => {
                    Cookies.set(c.Credential_name, String(c.Credential_value))
                })
                Cookies.set("type", newCredInfo.service)
                // Cookies.set("new_user", String(credentialsList.length === 0));
                Cookies.set("name", newCredInfo.Service_name)
                callConsentFunction()
            } else {
                const res = await createCred({
                    name: newCredInfo.Service_name,
                    type: newCredInfo.service,
                    data: newCredInfo.cred.reduce(
                        (acc, element) => {
                            if (element.Credential_name !== "type") {
                                acc[element.Credential_name] =
                                    typeof element.Credential_value === "string"
                                        ? element.Credential_value
                                        : String(element.Credential_value)
                            }
                            return acc
                        },
                        {} as Record<string, string>,
                    ),
                })
                if (res) {
                    refetch()
                    resetCredInfo()
                }
            }
        } else {
            setError("Please fill all the fields")
        }
    }

    const renderField = (field: CredentialField, index: number, level = 0, parentInfo?: any) => {
        if (field.hidden) return null

        const fieldId = `${field.Credential_name}-${index}-${level}`

        return (
            <Fragment key={fieldId}>
                {!field.custom && (
                    <div className="space-y-3">
                        <Label
                            htmlFor={fieldId}
                            className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                        >
                            {field.label}
                            {field.optional && (
                                <Badge
                                    variant="secondary"
                                    className="text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                >
                                    Optional
                                </Badge>
                            )}
                        </Label>
                        {field.hashed ? (
                            <div className="relative">
                                <Input
                                    id={fieldId}
                                    type={showPassword[fieldId] ? "text" : "password"}
                                    placeholder={field.placeholder || field.label}
                                    value={field.Credential_value || ""}
                                    onChange={(e: any) => handleChange(e.target.value, index, level, parentInfo)}
                                    disabled={field.disabled || field.readOnly}
                                    className="pr-12 h-11 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() =>
                                        setShowPassword((prev) => ({
                                            ...prev,
                                            [fieldId]: !prev[fieldId],
                                        }))
                                    }
                                >
                                    {showPassword[fieldId] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        ) : field.switch ? (
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-750 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center space-x-3">
                                    <Switch
                                        id={fieldId}
                                        checked={field.Credential_value || false}
                                        onCheckedChange={(checked: any) => handleChange(checked, index, level, parentInfo)}
                                        disabled={field.disabled}
                                    />
                                    <Label htmlFor={fieldId} className="text-sm font-medium">
                                        {field.Credential_value ? "Enabled" : "Disabled"}
                                    </Label>
                                </div>
                                <div
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${field.Credential_value
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                                        }`}
                                >
                                    {field.Credential_value ? "ON" : "OFF"}
                                </div>
                            </div>
                        ) : field.dropdown || field.api ? (
                            <div className="flex items-center space-x-3">
                                <Select
                                    value={field.Credential_value || ""}
                                    onValueChange={(value: any) => {
                                        if (field.credTypeConnection) {
                                            setIsCurrentCredOauth2(value === "OAuth Application")
                                        }
                                        handleChange(value, index, level, parentInfo)
                                    }}
                                    disabled={field.disabled}
                                >
                                    <SelectTrigger className="h-11 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500">
                                        <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.list?.map((option) => (
                                            <SelectItem key={option.value} value={option.value} className="py-2">
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {field.api && field.getList && (
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={field.getList}
                                        disabled={isLoadingApi}
                                        className="h-11 w-11 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/20 bg-transparent"
                                    >
                                        {isLoadingApi ? <CircularLoader size={16} thickness={2} /> : <Plus className="h-4 w-4" />}
                                    </Button>
                                )}
                            </div>
                        ) : field.radio ? (
                            <div className="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-750 rounded-lg border border-gray-200 dark:border-gray-700">
                                <RadioGroup
                                    className="flex flex-wrap gap-4"
                                    value={field.Credential_value || ""}
                                    onValueChange={(value: any) => {
                                        if (field.credTypeConnection) {
                                            setIsCurrentCredOauth2(value === "OAuth Application")
                                        }
                                        handleChange(value, index, level, parentInfo)
                                    }}
                                    disabled={field.disabled}
                                >
                                    {field.list?.map((option) => (
                                        <div
                                            key={option.value}
                                            className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <RadioGroupItem value={option.value} id={`${fieldId}-${option.value}`} />
                                            <Label htmlFor={`${fieldId}-${option.value}`} className="font-medium cursor-pointer">
                                                {option.label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        ) : (
                            <Input
                                id={fieldId}
                                type="text"
                                placeholder={field.placeholder || field.label}
                                value={field.Credential_value || ""}
                                onChange={(e: any) => handleChange(e.target.value, index, level, parentInfo)}
                                disabled={field.disabled || field.readOnly}
                                className="h-11 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                            />
                        )}
                    </div>
                )}
                {field.custom && (
                    <CustomDynamicField field={field} onChange={(value) => handleChange(value, index, level, parentInfo)} />
                )}
                {field.options && field.options[field.Credential_value?.toString()] && (
                    <div className="ml-6 space-y-4 border-l-2 border-blue-200 dark:border-blue-700 pl-6 bg-gradient-to-r from-blue-50/30 to-transparent dark:from-blue-900/10 rounded-r-lg py-4">
                        {field.options[field.Credential_value.toString()].map((subField, subIndex) =>
                            renderField(subField, subIndex, level + 1, {
                                ...parentInfo,
                                [`child${level}`]: field.Credential_value,
                                [`indexChild${level}`]: index,
                            }),
                        )}
                    </div>
                )}
            </Fragment>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col bg-white dark:bg-gray-900">
                <DialogHeader className="pb-6 border-b border-gray-200 dark:border-gray-700">
                    <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-300 to-blue-400 rounded-lg">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        Add New Credential
                    </DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto px-1"
                    style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#cbd5e1 transparent",
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    <div className="space-y-8 py-6">
                        {credInfo.description && (
                            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
                                <Zap className="h-4 w-4 text-blue-600" />
                                <AlertDescription
                                    className="text-blue-800 dark:text-blue-200"
                                    dangerouslySetInnerHTML={{ __html: credInfo.description }}
                                />
                            </Alert>
                        )}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Credential Name
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Enter a unique name for this credential"
                                    value={credInfo.Service_name}
                                    onChange={(e: any) => setCredInfo((prev) => ({ ...prev, Service_name: e.target.value }))}
                                    className="h-11 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Service Provider</Label>
                                <ServiceSelector
                                    disabled
                                    value={searchText}
                                    onChange={handleServiceChange}
                                    options={autoCompleteList}
                                />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    Configuration
                                </h3>
                                <div className="space-y-6">{credInfo.cred.map((field, index) => renderField(field, index))}</div>
                            </div>
                            {isCurrentCredOauth2 && credsThatNeedRedirects[credInfo.service] && (
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Copy className="h-5 w-5" />
                                        OAuth Configuration
                                    </h3>
                                    <div className="space-y-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                                        {credsThatNeedRedirects[credInfo.service].map((field, index) => (
                                            <CopyFields key={index} field={field} />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {error && (
                                <Alert
                                    variant="destructive"
                                    className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                                >
                                    <AlertDescription className="text-red-800 dark:text-red-200">{error}</AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooter className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-3 w-full justify-end">
                        <Button
                            disabled={loading}
                            onClick={validateAndSave}
                            className="flex-1 h-11 text-white font-medium"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <CircularLoader size={18} thickness={2} color={"white"} />
                                    Creating...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    Create Credential
                                </div>
                            )}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

"use client"

import type React from "react"
import { useState, useEffect, Fragment } from "react"
import { Copy, Eye, EyeOff, Plus, Trash2 } from "lucide-react"
import { Label } from "../../ui/label"
import { Alert, AlertDescription } from "../../ui/alert"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Card } from "../../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Badge } from "../../ui/badge"
import { Switch } from "../../ui/switch"
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog"
import { ClickUpSignIn, containsOnlyLettersAndNumbers, credsThatNeedRedirects, DropboxSignIn, FacebookSignIn, HubSpotSignIn, InstagramSignIn, JiraSignIn, LinkedInSignIn, MailChimpSignIn, MicrosoftSignIn, oauthSignIn, PipeDriveSignIn, QuickBooksSignIn, RedditSignIn, SalesForceSignIn, serviceFields, ServiceNowSignIn, setCredOnOneLevel, SlackSignIn, SnowflakeSignIn, XeroSignIn, XSignIn, ZendeskSignIn, ZohoSignIn, ZoomSignIn } from "./credentialsData"
import { AutoCompleteItem, CopyField, CredentialField, CredentialInfo, CredentialModalProps } from "../../../types/credentials-types"
import Cookies from "js-cookie"



// Mock data - replace with your actual service fields


const handleCopyClick = async (text: string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text)
        console.log("Copied to clipboard:", text)
    } catch (error) {
        console.error("Failed to copy:", error)
    }
}

const credsWithImagesList = (serviceFields: CredentialInfo[]): AutoCompleteItem[] => {
    return serviceFields.map((opt) => ({
        title: opt.service,
        image: `/components-icons/${opt.service}.png`,
    }))
}

// Components
const CopyFields: React.FC<{ field: CopyField }> = ({ field }) => {
    return (
        <div className="space-y-2">
            <Label>{field.label}</Label>
            <div className="flex items-center space-x-2">
                <Input
                    value={field.value}
                    readOnly
                    className="bg-muted cursor-pointer"
                    onClick={() => handleCopyClick(field.value)}
                />
                <Button variant="outline" size="icon" onClick={() => handleCopyClick(field.value)}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

const ConnectButton: React.FC<{ imgSrc?: string; onClick: () => void }> = ({ imgSrc, onClick }) => {
    return (
        <Button onClick={onClick} className="flex items-center space-x-2">
            {imgSrc && <img src={imgSrc || "/placeholder.svg"} alt="Service" className="w-5 h-5" />}
            <span>Connect</span>
        </Button>
    )
}

const CustomDynamicField: React.FC<{
    field: CredentialField
    onChange: (value: any) => void
}> = ({ field, onChange }) => {
    const [items, setItems] = useState<Array<{ key: string; value: string }>>(
        field.Credential_value || [{ key: "", value: "" }],
    )

    const addItem = () => {
        const newItems = [...items, { key: "", value: "" }]
        setItems(newItems)
        onChange(newItems)
    }

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index)
        setItems(newItems)
        onChange(newItems)
    }

    const updateItem = (index: number, field: "key" | "value", value: string) => {
        const newItems = [...items]
        newItems[index][field] = value
        setItems(newItems)
        onChange(newItems)
    }

    return (
        <div className="space-y-3">
            <Label>{field.label}</Label>
            {items.map((item, index) => (
                <Card key={index} className="p-3">
                    <div className="flex items-center space-x-2">
                        <Input
                            placeholder="Key"
                            value={item.key}
                            onChange={(e: any) => updateItem(index, "key", e.target.value)}
                            className="flex-1"
                        />
                        <Input
                            placeholder="Value"
                            value={item.value}
                            onChange={(e: any) => updateItem(index, "value", e.target.value)}
                            className="flex-1"
                        />
                        <Button variant="outline" size="icon" onClick={() => removeItem(index)} disabled={items.length === 1}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>
            ))}
            <Button variant="outline" onClick={addItem} className="w-full bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
            </Button>
        </div>
    )
}

const ServiceSelector: React.FC<{
    value: string
    onChange: (value: string) => void
    options: AutoCompleteItem[]
    disabled?: boolean
}> = ({ value, onChange, options, disabled }) => {

    return (
        <Select value={value} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger>
                <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.title} value={option.title}>
                        <div className="flex items-center space-x-2">
                            <img src={option.image || "/placeholder.svg"} alt={option.title} className="w-4 h-4" />
                            <span>{option.title}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

// Main Component
const defaultCred = serviceFields.find(cred => cred.service === "Google");
const credsThatHaveConsentScreenList = [
    { name: "Google", function: oauthSignIn },
    { name: "SalesForce", function: SalesForceSignIn },
    { name: "ZohoCRM", function: ZohoSignIn },
    { name: "Zoom", function: ZoomSignIn },
    { name: "HubSpot", function: HubSpotSignIn },
    { name: "Dropbox", function: DropboxSignIn },
    { name: "Microsoft", function: MicrosoftSignIn },
    { name: "Xero", function: XeroSignIn },
    { name: "PipeDrive", function: PipeDriveSignIn },
    { name: "QuickBooks", function: QuickBooksSignIn },
    { name: "Jira", function: JiraSignIn, condition: true },
    { name: "Facebook", function: FacebookSignIn, continueProcess: true },
    { name: "Instagram", function: InstagramSignIn },
    { name: "LinkedIn", function: LinkedInSignIn },
    { name: "X", function: XSignIn },
    { name: "ServiceNow", function: ServiceNowSignIn },
    { name: "Reddit", function: RedditSignIn },
    { name: "Zendesk", function: ZendeskSignIn, condition: true },
    { name: "ClickUp", function: ClickUpSignIn, condition: true },
    { name: "MailChimp", function: MailChimpSignIn, condition: true },
    { name: "Snowflake", function: SnowflakeSignIn },
    { name: "Slack", function: SlackSignIn, condition: true },
];
export function CreateCredentialDialog({
    open,
    onOpenChange,
    onSave,
    credentialsList = [],
    authToken,
}: CredentialModalProps) {
    const [searchText, setSearchText] = useState("Google")
    const [autoCompleteList, setAutoCompleteList] = useState<AutoCompleteItem[]>(credsWithImagesList(serviceFields))
    const [credInfo, setCredInfo] = useState<CredentialInfo>(serviceFields[0])
    const [error, setError] = useState<string | boolean>("")
    const [isLoadingApi, setIsLoadingApi] = useState(false)
    const [isCurrentCredOauth2, setIsCurrentCredOauth2] = useState(defaultCred?.defaultRedirectUri)
    const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})

    useEffect(() => {
        resetCredInfo()
    }, [open])

    const resetCredInfo = () => {
        const defaultCred = serviceFields[0]
        setCredInfo(defaultCred)
        setError("")
        setSearchText(defaultCred.service)
        setAutoCompleteList(credsWithImagesList(serviceFields))
        setIsCurrentCredOauth2(defaultCred?.defaultRedirectUri)
        setShowPassword({})
    }

    const handleChange = (value: any, fieldIndex: number, level = 0, parentInfo?: any) => {
        if (level === 0) {
            // Handle top-level fields
            setCredInfo((prev) => ({
                ...prev,
                cred: prev.cred.map((field, index) => (index === fieldIndex ? { ...field, Credential_value: value } : field)),
            }))
        } else if (level === 1) {
            // Handle first nested level (options)
            const { child0, indexChild0 } = parentInfo || {}
            setCredInfo((prev) => ({
                ...prev,
                cred: prev.cred.map((field, ind) => {
                    if (indexChild0 === ind && field.options && field.options[child0]) {
                        return {
                            ...field,
                            options: {
                                ...field.options,
                                [child0]: field.options[child0].map((subField, subIndex) => {
                                    if (subIndex === fieldIndex) {
                                        return { ...subField, Credential_value: value }
                                    }
                                    return subField
                                }),
                            },
                        }
                    }
                    return field
                }),
            }))
        } else if (level === 2) {
            // Handle second nested level (nested options)
            const { child0, child1, indexChild0, indexChild1 } = parentInfo || {}
            setCredInfo((prev) => ({
                ...prev,
                cred: prev.cred.map((field, ind) => {
                    if (indexChild0 === ind && field.options && field.options[child0]) {
                        return {
                            ...field,
                            options: {
                                ...field.options,
                                [child0]: field.options[child0].map((subField, subIndex) => {
                                    if (subIndex === indexChild1 && subField.options && subField.options[child1]) {
                                        return {
                                            ...subField,
                                            options: {
                                                ...subField.options,
                                                [child1]: subField.options[child1].map((deepField, deepIndex) => {
                                                    if (deepIndex === fieldIndex) {
                                                        return { ...deepField, Credential_value: value }
                                                    }
                                                    return deepField
                                                }),
                                            },
                                        }
                                    }
                                    return subField
                                }),
                            },
                        }
                    }
                    return field
                }),
            }))
        }
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

            setIsCurrentCredOauth2(currentCredType ? currentCredType.Credential_value === "OAuth Application" : initialCredStatus)
        }
    }

    const validateAndSave = () => {

        let newCredInfo: CredentialInfo = { ...credInfo, cred: setCredOnOneLevel(credInfo.cred) };
        console.log({ newCredInfo });

        if (error) setError(false); // To satisfy TypeScript; replace with your real `error` state if needed

        let errorMsg: string | null = null;

        if (
            newCredInfo.Service_name.trim().length > 0 &&
            newCredInfo.service.trim().length > 0 &&
            searchText.trim()
        ) {
            newCredInfo.cred.forEach((c) => {
                if (c.custom) {
                    (c.Credential_value as { key: string; value: string }[]).some(item => {
                        if (item.key.trim() === "" || item.value.trim() === "") {
                            errorMsg = "Please fill all the fields";
                            return true;
                        }
                        return false;
                    });
                }
                if (typeof c.Credential_value === "string" && c.Credential_value.trim().length < 3 && !c.optional) {
                    errorMsg = "Credential fields should be at least 3 characters.";
                } else if (c.api && c.Credential_value === "None") {
                    errorMsg = `Please choose a ${c.label}`;
                }
            });

            if (errorMsg) {
                setError(errorMsg);
                return;
            }

            const oAuth2Cred = newCredInfo.cred.find(c => c.credTypeConnection);
            const currentCredConnectionTypeOauth = !!(oAuth2Cred && (
                oAuth2Cred.Credential_value === "OAuth Application" ||
                oAuth2Cred.Credential_value === "Default"
            ));

            newCredInfo = {
                ...newCredInfo,
                cred: newCredInfo.cred.filter(f => {
                    if (f.optional && (f.dropdown || f.radio)) {
                        return f.Credential_value !== "None";
                    }
                    if (typeof f.Credential_value === "string") {
                        return f.Credential_value.trim().length > 0 || f.credTypeConnection;
                    }
                    return true;
                }),
            };

            const credNameAndFunctionForConsent = credsThatHaveConsentScreenList.find(c => c.name === newCredInfo.service);
            const callConsentFunction = () => {
                setTimeout(() => credNameAndFunctionForConsent?.function(), 100);
            };


            if (credentialsList.some(c => c.credName === newCredInfo.Service_name)) {
                setError("Credential name already exists.");
                return;
            }
            if (!containsOnlyLettersAndNumbers(newCredInfo.Service_name)) {
                setError("The Name should only consist of letters and numbers, without any special characters or spaces.");
                return;
            }
            if (newCredInfo.Service_name.length > 25) {
                setError("The credential name can have a maximum of 25 characters.");
                return;
            }
            if (!newCredInfo.CREATE && (credNameAndFunctionForConsent && !credNameAndFunctionForConsent.condition) || currentCredConnectionTypeOauth) {
                if (credNameAndFunctionForConsent?.continueProcess) {
                    Cookies.set("continueProcess", newCredInfo.service);
                }
                Cookies.set("type", newCredInfo.service);
                newCredInfo.cred.forEach(c => {
                    Cookies.set(c.Credential_name, String(c.Credential_value));
                });
                Cookies.set("new_user", String(credentialsList.length === 0));
                Cookies.set("name", newCredInfo.Service_name);
                callConsentFunction();
            } else {
                // dispatch(addCredential({
                //     username: Cookies.get("email") ?? "",
                //     new_user: credentialsList.length === 0,
                //     credType: newCredInfo.service,
                //     credInfo: {
                //         ...newCredInfo,
                //         cred: newCredInfo.cred.map(element => ({
                //             Credential_name: element.Credential_name,
                //             Credential_value: typeof element.Credential_value === "string"
                //                 ? element.Credential_value
                //                 : String(element.Credential_value),
                //         })),
                //     },
                // }));
                console.log({ credInfo });

                resetCredInfo();
            }

        } else {
            setError("Please fill all the fields");
        }
    };
    const renderField = (field: CredentialField, index: number, level = 0, parentInfo?: any) => {
        if (field.hidden) return null
        const fieldId = `${field.Credential_name}-${index}-${level}`

        return (
            <Fragment key={fieldId}>
                {!field.connectBtn && !field.custom && (
                    <div className="space-y-2">
                        <Label htmlFor={fieldId}>
                            {field.label}
                            {field.optional && (
                                <Badge variant="secondary" className="ml-2 text-xs">
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
                                    className="pr-10"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
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
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id={fieldId}
                                    checked={field.Credential_value || false}
                                    onCheckedChange={(checked: any) => handleChange(checked, index, level, parentInfo)}
                                    disabled={field.disabled}
                                />
                                <Label htmlFor={fieldId} className="text-sm text-muted-foreground">
                                    {field.Credential_value ? "Enabled" : "Disabled"}
                                </Label>
                            </div>
                        ) : field.dropdown || field.api ? (
                            <div className="flex items-center space-x-2">
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
                                    <SelectTrigger>
                                        <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.list?.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {field.api && field.getList && (
                                    <Button variant="outline" size="icon" onClick={field.getList} disabled={isLoadingApi}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ) : field.radio ? (
                            <RadioGroup
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
                                    <div key={option.value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option.value} id={`${fieldId}-${option.value}`} />
                                        <Label htmlFor={`${fieldId}-${option.value}`}>{option.label}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        ) : (
                            <Input
                                id={fieldId}
                                type="text"
                                placeholder={field.placeholder || field.label}
                                value={field.Credential_value || ""}
                                onChange={(e: any) => handleChange(e.target.value, index, level, parentInfo)}
                                disabled={field.disabled || field.readOnly}
                            />
                        )}
                    </div>
                )}

                {field.connectBtn && (
                    <div className="flex justify-center">
                        <ConnectButton imgSrc={field.imgSrc} onClick={validateAndSave} />
                    </div>
                )}

                {field.custom && (
                    <CustomDynamicField field={field} onChange={(value) => handleChange(value, index, level, parentInfo)} />
                )}

                {field.options && field.options[field.Credential_value?.toString()] && (
                    <div className="ml-4 space-y-4 border-l-2 border-muted pl-4">
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
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{"Add New"} Credential</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    {credInfo.description && (
                        <Alert>
                            <AlertDescription dangerouslySetInnerHTML={{ __html: credInfo.description }} />
                        </Alert>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="credName">Name</Label>
                        <Input
                            id="credName"
                            placeholder="Enter credential name"
                            value={credInfo.Service_name}
                            onChange={(e: any) => setCredInfo((prev) => ({ ...prev, Service_name: e.target.value }))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Service or app to connect to</Label>
                        <ServiceSelector value={searchText} onChange={handleServiceChange} options={autoCompleteList} />
                    </div>
                    <div className="space-y-4">{credInfo.cred.map((field, index) => renderField(field, index))}</div>
                    {isCurrentCredOauth2 && credsThatNeedRedirects[credInfo.service] && (
                        <div className="space-y-4">
                            {credsThatNeedRedirects[credInfo.service].map((field, index) => (
                                <CopyFields key={index} field={field} />
                            ))}
                        </div>
                    )}
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </div>
                <DialogFooter>
                    {/* <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button> */}
                    <Button onClick={validateAndSave}>{"Create"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

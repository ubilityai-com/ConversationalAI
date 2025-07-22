"use client"

import { AlertCircle, Code, Settings, Upload } from "lucide-react"
import { type Dispatch, Fragment, type SetStateAction, useEffect } from "react"
import { cn, objToReturnDynamic, validateArray } from "../../lib/utils"
import { useRightDrawerStore } from "../../store/right-drawer-store"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Separator } from "../ui/separator"
import { Textarea } from "../ui/textarea"
import ApiCaller from "./async-dropdown"
import DynamicFields from "./dynamic-fields-v4"
import { FieldWrapper } from "./field-wrapper"
import { SearchableSelect } from "./searchable-select"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import ReactQuillEditor from "./textFormatter"

// Validation functions
const validateNumberGreaterThanZero = (value: string) => {
    const number = Number.parseFloat(value)
    if (isNaN(number) || number < 1) {
        return "Number should be greater than zero"
    }
    return null
}

const validateRequiredWords = (value: string, requiredWords: string[]) => {
    for (const word of requiredWords) {
        if (!value.includes(word)) return `${word} is required`
    }
    return null
}

const validationConditionFunctions = {
    validateNumberGreaterThanZero,
    validateRequiredWords,
}


// Helper functions
const isJsonString = (str: string) => {
    try {
        JSON.parse(str)
        return true
    } catch (e) {
        return false
    }
}


const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, "")
    const bigint = Number.parseInt(hex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return { r, g, b }
}


interface AutomationSimpleProps {
    filledDataName?: string
    flowZoneSelectedId: string
    schema: any[]
    setSchema?: Dispatch<SetStateAction<any[]>>
    InDynamic?: boolean
    onChangeDynamicVariables?: (args: any) => void
    filledArray?: any[]
    indexForDynamic?: number
    disabled?: boolean
    config?: any
    // New prop for external values
    fieldValues?: Record<string, any>
    onFieldChange: ({ path, value }: { path: string, value: any }) => void
    path?: string
    [key: string]: any
}

export default function AutomationSimple({
    schema,
    setSchema,
    InDynamic = false,
    onChangeDynamicVariables,
    filledArray = [],
    indexForDynamic = 0,
    disabled = false,
    filledDataName,
    flowZoneSelectedId,
    config,
    fieldValues = {},
    onFieldChange,
    path = "",
    ...restProps
}: AutomationSimpleProps) {
    const setValidationByKey = useRightDrawerStore((state) => state.setValidationByKey)
    const setNodeFilledDataByKey = useRightDrawerStore((state) => state.setNodeFilledDataByKey)
    const updateNodeRightSideDataNestedKey = useRightDrawerStore((state) => state.updateNodeRightSideDataNestedKey)

    // Helper function to get field value from props or item
    const getFieldValue = (item: any, fieldName = "value") => {
        if (fieldValues && item.variableName && fieldValues.hasOwnProperty(item.variableName)) {
            return fieldValues[item.variableName]
        }
        return item[fieldName]
    }

    // Helper function to get dynamic field value
    const getDynamicFieldValue = (item: any) => {
        if (fieldValues && item.variableName && fieldValues.hasOwnProperty(item.variableName)) {
            return fieldValues[item.variableName]
        }
        return item.hasOwnProperty("json") ? item.json.fieldsArray : item.fieldsArray
    }

    useEffect(() => {
        if (!InDynamic) {
            // Initialize validation and final object
            console.log("Initializing automation  component")
            if (flowZoneSelectedId && filledDataName) {
                setValidationByKey(flowZoneSelectedId, filledDataName, validateArray(schema, fieldValues))
                setNodeFilledDataByKey(flowZoneSelectedId, filledDataName, objToReturnDynamic(schema))
            }
        }
    }, [InDynamic])

    const onChangeAutomationSimple = ({ newValue, variableName }: any) => {
        const newFieldsValue = { ...fieldValues, [variableName]: newValue }
        if (filledDataName)
            setValidationByKey(flowZoneSelectedId, filledDataName, validateArray(schema, newFieldsValue))
        onFieldChange?.({ path: variableName, value: newValue })
    }


    const renderField = (item: any, index: number) => {
        const commonProps = {
            disabled: item.disabled || disabled,
            required: item.required,
            name: item.variableName,
        }

        switch (item.type) {
            case "textfield":
                return (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            {item.label}
                            {item.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <FieldWrapper
                            field={item}
                            value={getFieldValue(item) || ""}
                            onChange={(newValue) => {
                                onChangeAutomationSimple({
                                    newValue: newValue,
                                    variableName: item.variableName,
                                })
                            }}
                            variableName={item.variableName}
                        >
                            {item.multiline ? (
                                <Textarea
                                    placeholder={item.placeholder}
                                    value={getFieldValue(item) || ""}
                                    onChange={(e) =>
                                        onChangeAutomationSimple({
                                            newValue: e.target.value,
                                            variableName: item.variableName,
                                        })
                                    }
                                    className={cn("min-h-[80px]", item.errorSpan && "border-red-500")}
                                    {...commonProps}
                                />
                            ) : (
                                <Input
                                    type={item.password ? "password" : item.numberField ? "number" : item.date ? "date" : "text"}
                                    placeholder={item.placeholder}
                                    value={getFieldValue(item) || ""}
                                    onChange={(e) =>
                                        onChangeAutomationSimple({
                                            newValue: e.target.value,
                                            variableName: item.variableName,
                                        })
                                    }
                                    maxLength={item.maxLength}
                                    className={cn(item.errorSpan && "border-red-500")}
                                    {...commonProps}
                                />
                            )}
                        </FieldWrapper>
                        {item.helperSpan && <p className="text-xs text-muted-foreground">{item.helperSpan}</p>}
                        {item.errorSpan && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {item.errorSpan}
                            </p>
                        )}
                    </div>
                )

            case "dropdown":
                return (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            {item.label}
                            {item.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <FieldWrapper
                            field={item}
                            value={getFieldValue(item) || ""}
                            onChange={(newValue) => {
                                onChangeAutomationSimple({
                                    newValue: newValue,
                                    variableName: item.variableName,
                                })
                            }}
                            variableName={item.variableName}
                        >
                            <SearchableSelect
                                options={
                                    item.list?.map((opt: any) => ({
                                        value: opt.value,
                                        label: opt.option,
                                    })) || []
                                }
                                value={getFieldValue(item) || ""}
                                onChange={(newValue) => {
                                    onChangeAutomationSimple({
                                        newValue: newValue,
                                        variableName: item.variableName,
                                    })
                                }}
                                placeholder={`Select ${item.label?.toLowerCase()}`}
                                className={cn(item.errorSpan && "border-red-500")}
                                {...commonProps}
                            />
                        </FieldWrapper>
                        {item.helperSpan && <p className="text-xs text-muted-foreground">{item.helperSpan}</p>}
                        {item.errorSpan && !item.value && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {item.errorSpan}
                            </p>
                        )}
                        {item.options &&
                            <Fragment >
                                {item.options.hasOwnProperty(getFieldValue(item)) && (
                                    <AutomationSimple
                                        flowZoneSelectedId={flowZoneSelectedId}
                                        schema={item.options[(getFieldValue(item) as string)]}
                                        fieldValues={fieldValues}
                                        onFieldChange={onFieldChange}
                                        path={path ? `${path}.${index}.${item.variableName}` : `${index}.${item.variableName}`}
                                    />
                                )}
                            </Fragment>
                        }
                    </div>
                )

            case "api":
                console.log({ item, fieldValues });

                return (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            {item.label}
                            {item.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <FieldWrapper
                            field={item}

                            value={getFieldValue(item) || ""}
                            variableName={item.variableName}
                            onChange={(newValue) => {
                                console.log({ newValue });

                                onChangeAutomationSimple({
                                    newValue: newValue,
                                    variableName: item.variableName,
                                })
                            }}
                        >
                            <ApiCaller
                                inDynamic={InDynamic ? (indexForDynamic === 0 ? true : false) : undefined}
                                disabled={disabled}
                                apiJson={item}
                                value={getFieldValue(item)}
                                onChange={({ val, name }) => {
                                    onChangeAutomationSimple({
                                        newValue: val,
                                        variableName: item.variableName,
                                    })
                                }}
                                flowZoneSelectedId={flowZoneSelectedId}
                                helperSpan={item.helperSpan}
                            />
                        </FieldWrapper>
                    </div>
                )

            case "checkbox":
                return (
                    <div className="flex items-center space-x-2">
                        <FieldWrapper
                            field={item}

                            variableName={item.variableName}
                            value={getFieldValue(item) || ""}
                            onChange={(newValue) => {
                                onChangeAutomationSimple({
                                    newValue: newValue,
                                    variableName: item.variableName,
                                })
                            }}
                        >
                            <Checkbox
                                id={`checkbox-${index}`}
                                checked={getFieldValue(item) || false}
                                onCheckedChange={(checked) =>
                                    onChangeAutomationSimple({

                                        newValue: checked,
                                        variableName: item.variableName,
                                    })
                                }
                                {...commonProps}
                            />
                            <Label htmlFor={`checkbox-${index}`} className="text-sm font-medium">
                                {item.label || item.innerLabel}
                                {item.required && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                        </FieldWrapper>
                    </div>
                )

            case "radiobutton":
                return (
                    <div className="space-y-3">
                        <Label className="text-sm font-medium">
                            {item.label}
                            {item.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <RadioGroup
                            value={getFieldValue(item) || ""}
                            onValueChange={(value) =>
                                onChangeAutomationSimple({
                                    newValue: value,
                                    variableName: item.variableName,
                                })
                            }
                            {...commonProps}
                        >
                            {item.list?.map((option: any, optIndex: number) => (
                                <div key={optIndex} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.value} id={`radio-${index}-${optIndex}`} />
                                    <Label htmlFor={`radio-${index}-${optIndex}`} className="text-sm">
                                        {option.option}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                )

            case "multiselect":
                const multiselectValue = getFieldValue(item) || []
                return (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            {item.label}
                            {item.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <div className="flex flex-wrap gap-2">

                            {multiselectValue?.map((val: string, valIndex: number) => (
                                <Badge key={valIndex} variant="secondary" className="text-xs">
                                    {val}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-4 w-4 p-0 ml-1"
                                        onClick={() => {
                                            const newValue = multiselectValue.filter((_: any, i: number) => i !== valIndex)
                                            onChangeAutomationSimple({

                                                newValue,
                                                variableName: item.variableName,
                                            })
                                        }}
                                    >
                                        ×
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                        <SearchableSelect
                            options={
                                item.list?.map((opt: any) => ({
                                    value: opt.value,
                                    label: opt.option,
                                })) || []
                            }
                            value=""
                            onChange={(value) => {
                                if (value && !multiselectValue?.includes(value)) {
                                    const newValue = [...(multiselectValue || []), value]
                                    onChangeAutomationSimple({
                                        newValue,
                                        variableName: item.variableName,
                                    })
                                }
                            }}
                            placeholder="Add option..."
                            {...commonProps}
                        />
                    </div>
                )

            case "color":
                return (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            {item.label}
                            {item.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="color"
                                value={getFieldValue(item) || "#000000"}
                                onChange={(e) =>
                                    onChangeAutomationSimple({
                                        newValue: e.target.value,
                                        variableName: item.variableName,
                                    })
                                }
                                className="w-12 h-10 p-1 border rounded"
                                {...commonProps}
                            />
                            <Input
                                type="text"
                                value={getFieldValue(item) || ""}
                                onChange={(e) =>
                                    onChangeAutomationSimple({

                                        newValue: e.target.value,
                                        variableName: item.variableName,
                                    })
                                }
                                placeholder="#000000"
                                className="flex-1"
                                {...commonProps}
                            />
                        </div>
                    </div>
                )

            case "file":
                return (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            {item.label}
                            {item.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-2">
                                <Button variant="outline" {...commonProps}>
                                    Choose File
                                </Button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">Upload a file</p>
                        </div>
                    </div>
                )

            case "dynamic":
                const dynamicValue = getDynamicFieldValue(item)
                return (
                    <div className="space-y-2">
                        <DynamicFields
                            json={
                                item.hasOwnProperty("json")
                                    ? {
                                        ...item.json,
                                        fieldsArray: dynamicValue,
                                    }
                                    : {
                                        ...item,
                                        fieldsArray: dynamicValue,
                                    }
                            }
                            onFieldChange={({ path, value }: any) => {

                                if (fieldValues && item.variableName) {

                                    // For external field values, directly update the fieldsArray
                                    onFieldChange({ path: `${path}`, value: value })
                                }
                            }}
                            filledArray={dynamicValue}
                            flowZoneSelectedId={flowZoneSelectedId}
                            path={`${path}.${item.variableName}`}
                            {...commonProps}
                        />
                    </div>
                )

            case "accordion":
                const dynamicValuee = getDynamicFieldValue(item)
                return (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger className="text-sm font-medium">{item.accTitle || item.title}</AccordionTrigger>
                            <AccordionContent>
                                <DynamicFields
                                    json={
                                        item.hasOwnProperty("json")
                                            ? {
                                                ...item.json,
                                            }
                                            : {
                                                ...item,
                                            }
                                    }
                                    onFieldChange={({ path, value }: any) => {

                                        if (fieldValues && item.variableName) {

                                            // For external field values, directly update the fieldsArray
                                            onFieldChange({ path: `${path}`, value: value })
                                        }
                                    }}
                                    filledArray={[dynamicValuee]}
                                    flowZoneSelectedId={flowZoneSelectedId}
                                    path={`${path}.${item.variableName}`}
                                    {...commonProps}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )

            case "editor":
                return (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            {item.label}
                            {item.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <div className="border rounded-md">
                            <div className="flex items-center justify-between p-2 border-b bg-muted">
                                <div className="flex items-center space-x-2">
                                    <Code className="h-4 w-4" />
                                    <span className="text-xs font-medium">{item.defaultLanguage || "text"}</span>
                                </div>
                                <Button variant="ghost" size="sm">
                                    <Settings className="h-4 w-4" />
                                </Button>
                            </div>
                            <Textarea
                                value={getFieldValue(item) || ""}
                                onChange={(e) =>
                                    onChangeAutomationSimple({
                                        newValue: e.target.value,
                                        variableName: item.variableName,
                                    })
                                }
                                className="min-h-[200px] border-0 resize-none focus-visible:ring-0"
                                placeholder="Enter your code here..."
                                {...commonProps}
                            />
                        </div>
                    </div>
                )

            case "row":
                return <></>
            case "textFormatter":
                return (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            {item.label}
                            {item.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <div className="custom-editor w-[93%] mb-2">
                            <ReactQuillEditor
                                item={item}
                                value={getFieldValue(item) || ""}
                                onChange={(value: any) => {
                                    onChangeAutomationSimple({
                                        newValue: value,
                                        variableName: item.variableName,
                                    })
                                }}
                            />

                        </div>
                        {item.helperSpan && <p className="text-xs text-muted-foreground">{item.helperSpan}</p>}
                        {item.errorSpan && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {item.errorSpan}
                            </p>
                        )}
                    </div>
                )

            default:
                return (
                    <div className="p-4 border border-dashed border-gray-300 rounded-lg">
                        <p className="text-sm text-gray-500">Unsupported field type: {item.type}</p>
                    </div>
                )
        }
    }

    return (
        <div className="space-y-2">
            {schema.map((item, index) => (
                <Fragment key={item.id || index}>
                    {item.title && item.type !== "dynamic" && !InDynamic && (
                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold bg-muted px-3 py-2 rounded-md">{item.title}</h3>
                            {item.topDivider && <Separator />}
                        </div>
                    )}

                    {item.subTitle && (
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium text-muted-foreground">{item.subTitle}</h4>
                        </div>
                    )}

                    {renderField(item, index)}
                </Fragment>
            ))}
        </div>
    )
}

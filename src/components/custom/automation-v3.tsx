"use client"

import { AlertCircle, Code, Settings, Upload } from "lucide-react"
import { type Dispatch, Fragment, type SetStateAction, useEffect } from "react"
import { setAutomationArray } from "../../lib/automation-utils"
import { cn, getValueOptions, insertArrayAtIndex, objToReturnDynamic } from "../../lib/utils"
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
import DynamicFields from "./dynamic-fields-v3"
import { SearchableSelect } from "./searchable-select"

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

// Validation functions for different field types
const validationFunctions = {
  dropdown: (item: any) => {
    if ((item.value === "None" && item.required) || (item.required && item.multiselect && item.value.length === 0)) {
      return false
    }
    return true
  },
  api: (item: any) => {
    if (
      ((item.value === "None" || item.value === "") && item.required) ||
      (item.required && item.multiselect && item.value.length === 0)
    ) {
      return false
    }
    return true
  },
  textfield: (item: any) => {
    if (item.required) {
      if (item.value.toString().trim()) {
        if (item.validation) {
          return !validationConditionFunctions[item.validation as keyof typeof validationConditionFunctions](
            item.value,
            item.requiredWords,
          )
        } else {
          return true
        }
      } else {
        return false
      }
    } else {
      if (item.value.toString().trim()) {
        if (item.validation) {
          return !validationConditionFunctions[item.validation as keyof typeof validationConditionFunctions](
            item.value,
            item.requiredWords,
          )
        } else {
          return true
        }
      } else {
        return true
      }
    }
  },
  textFormatter: (item: any) => {
    return !(!item.value.toString().trim() && item.required)
  },
  multiselect: (item: any) => {
    return !(item.value.length < 1 && item.required)
  },
  editor: (item: any) => {
    return (
      (item.value.length >= 1 && (item.defaultLanguage === "json" ? isJsonString(item.value) : true)) ||
      (item.value.length < 1 && !item.required)
    )
  },
  array: (item: any) => {
    return !(item.value.length < 1 && item.required)
  },
  json: (item: any) => {
    return !(Object.keys(item.value).length < 1 && item.required)
  },
  radiobutton: () => true,
  dynamic: (item: any) => {
    if (item.hasOwnProperty("json")) {
      if (
        item.json.required &&
        (item.json.minSize ? item.json.minSize > item.json.fieldsArray.length : item.json.fieldsArray.length < 1)
      ) {
        return false
      } else {
        return item.json.fieldsArray.every((field: any) => validateArray(field))
      }
    } else {
      if (item.fieldsArray === "##AI##") return true
      if (
        item.required &&
        (item.hasOwnProperty("minSize") ? item.minSize > item.fieldsArray.length : item.fieldsArray.length < 1)
      ) {
        return false
      } else {
        return item.fieldsArray.every((field: any) => validateArray(field))
      }
    }
  },
  accordion: (item: any) => {
    return item.fieldsArray.every((field: any) => {
      return field.every((f: any) => validationFunctions[f.type as keyof typeof validationFunctions](f))
    })
  },
  color: (item: any) => {
    return !(item.required && !item.value.trim())
  },
  file: (item: any) => {
    return !(item.required && !item.value?.file)
  },
  checkbox: () => true,
  outputJson: () => true,
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

export const validateArray = (apiRes: any[]) => {
  let valid = true
  apiRes.forEach((item) => {
    if (validationFunctions[item.type as keyof typeof validationFunctions]) {
      valid = validationFunctions[item.type as keyof typeof validationFunctions](item) && valid
    }
  })
  return valid
}

const hexToRgb = (hex: string) => {
  hex = hex.replace(/^#/, "")
  const bigint = Number.parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return { r, g, b }
}

// Transform functions for different field types
const transformFunctions = {
  dropdown: (item: any) => {
    if (item.value !== "None") {
      if (item.typeOfValue === "integer") {
        return {
          [item.variableName]: Number.parseInt(item.value) || item.value,
        }
      } else if (item.typeOfValue === "array") {
        return { [item.variableName]: [item.value] }
      } else {
        return { [item.variableName]: item.value }
      }
    }
    return {}
  },
  textfield: (item: any) => {
    if (item.value.toString().trim()) {
      if (item.typeOfValue === "integer") {
        return {
          [item.variableName]: Number.parseInt(item.value) || item.value,
        }
      } else if (item.typeOfValue === "float") {
        return { [item.variableName]: Number.parseFloat(item.value) }
      } else {
        return { [item.variableName]: item.value }
      }
    }
    return {}
  },
  dynamic: (item: any) => {
    return {
      [item.hasOwnProperty("json") ? item.json.variableName : item.variableName]: item.hasOwnProperty("json")
        ? item.json.fieldsArray.map((arr: any) => objToReturnDynamic(arr))
        : item.fieldsArray === "##AI##"
          ? item.fieldsArray
          : item.fieldsArray.map((arr: any) => objToReturnDynamic(arr)),
    }
  },
  api: (item: any) => {
    console.log({ item })

    if (item.value !== "None" && item.value !== "") {
      if (item.typeOfValue === "integer") {
        return { [item.variableName]: Number.parseInt(item.value) || item.value }
      } else if (item.typeOfValue === "array") {
        return { [item.variableName]: [item.value] }
      } else {
        return { [item.variableName]: item.value }
      }
    }
    return {}
  },
  checkbox: (item: any) => {
    return {
      [item.variableName]: item.typeOfValue === "string" ? item.value.toString() : item.value,
    }
  },
  color: (item: any) => {
    if (item.value.trim()) {
      return { [item.variableName]: hexToRgb(item.value) }
    }
    return {}
  },
  // Add other transform functions as needed
}

interface AutomationSimpleProps {
  filledDataName?: string
  flowZoneSelectedId: string
  AllJson?: any[]
  setAllJson?: (json: any[]) => void
  apiRes: any[]
  setApiRes?: Dispatch<SetStateAction<any[]>>
  onRemoveVariables?: (index: number) => void
  InDynamic?: boolean
  onChangeDynamicVariables?: (args: any) => void
  filledArray?: any[]
  indexForDynamic?: number
  disabled?: boolean
  config?: any
  // New prop for external values
  fieldValues?: Record<string, any>
  onFieldChange?: (variableName: string, value: any) => void
  [key: string]: any
}

export default function AutomationSimple({
  AllJson = [],
  setAllJson,
  apiRes,
  setApiRes,
  onRemoveVariables,
  InDynamic = false,
  onChangeDynamicVariables,
  filledArray = [],
  indexForDynamic = 0,
  disabled = false,
  filledDataName,
  flowZoneSelectedId,
  config,
  onUpdate,
  fieldValues = {},
  onFieldChange,
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
      console.log("Initializing automation simple component")
      if (flowZoneSelectedId && filledDataName) {
        setValidationByKey(flowZoneSelectedId, filledDataName, validateArray(apiRes))
        setNodeFilledDataByKey(flowZoneSelectedId, filledDataName, objToReturnDynamic(apiRes))
      }
    }
  }, [InDynamic])

  const onChangeAutomationSimple = ({ index, newValue, name, variableName }: any) => {
    console.log({ index, newValue, name, variableName, InDynamic })

    // If using external field values, call the external handler
    

    if (!InDynamic && setApiRes) {
      setApiRes((prev) => {
        const newApiRes = [...apiRes]
        console.log({ newApiRes })

        if (Array.isArray(name)) {
          name.forEach((n: string, i: number) => {
            newApiRes[index] = { ...newApiRes[index], [n]: newValue[i] }
          })
        } else {
          newApiRes[index] = {
            ...newApiRes[index],
            [name]: newValue,
          }
        }
        if (flowZoneSelectedId && filledDataName) {
          console.log({ newApiRes, oooo: objToReturnDynamic(newApiRes) })
          setValidationByKey(flowZoneSelectedId, filledDataName, validateArray(newApiRes))
          setNodeFilledDataByKey(flowZoneSelectedId, filledDataName, objToReturnDynamic(newApiRes))
        }
        console.log({ newApiRes })
        onUpdate?.(filledDataName, objToReturnDynamic(newApiRes))
        if (fieldValues && onFieldChange && variableName) {
          if (name === "value") {
            onFieldChange(variableName, newValue)
          } else if (name === "json" || name === "fieldsArray") {
            // For dynamic fields, handle the fieldsArray specifically
            if (name === "json" && newValue.fieldsArray !== undefined) {
              onFieldChange(variableName, newValue.fieldsArray)
            } else if (name === "fieldsArray") {
              onFieldChange(variableName, newValue)
            }
          }
        }
        return newApiRes
      })
    } else {
      const newApiRes = [...apiRes]
      if (Array.isArray(name)) {
        name.forEach((n: string, i: number) => {
          newApiRes[index] = { ...newApiRes[index], [n]: newValue[i] }
        })
      } else {
        newApiRes[index] = {
          ...newApiRes[index],
          [name]: newValue,
        }
      }
      console.log({ newApiRes })

      onChangeDynamicVariables?.({
        index: indexForDynamic,
        event: newApiRes,
        innerIndex: index,
        name: variableName,
        keyToChange: name,
      })
    }
  }

  const onChangeDropdown = ({ name, index, children, oldValue, newValue, variableName }: any) => {
    const newArray = setAutomationArray(getValueOptions(AllJson, [...children, newValue]), [...children, newValue])
    console.log({ newArray, name, index, children, oldValue, newValue, variableName, apiRes })

    let indexToInsertAt = -1
    let newApiRes: any[] = []
    apiRes.forEach((item, ind) => {
      if (item.hasOwnProperty("child") && item.child.length > 0 && item.child.find((e: string) => e === oldValue)) {
        if (indexToInsertAt === -1) indexToInsertAt = ind
      } else {
        newApiRes.push(item)
      }
    })
    console.log({ newApiRes })

    newApiRes = insertArrayAtIndex(newApiRes, index + 1, newArray)
    console.log({ newApiRes })

    newApiRes[index] = { ...newApiRes[index], value: newValue }

    // Handle external field values
    if (fieldValues && onFieldChange && variableName) {
      onFieldChange(variableName, newValue)
      
    }

    if (!InDynamic && flowZoneSelectedId && filledDataName && setApiRes) {
      setApiRes(newApiRes)
      alert(true)
      onUpdate?.(filledDataName, objToReturnDynamic(newApiRes))

      setValidationByKey(flowZoneSelectedId, filledDataName, validateArray(newApiRes))
      setNodeFilledDataByKey(flowZoneSelectedId, filledDataName, objToReturnDynamic(newApiRes))
    } else
      onChangeDynamicVariables?.({
        index: indexForDynamic,
        event: newApiRes,
        innerIndex: index,
        name: variableName,
        keyToChange: name,
      })
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
            {item.multiline ? (
              <Textarea
                placeholder={item.placeholder}
                value={getFieldValue(item) || ""}
                onChange={(e) =>
                  onChangeAutomationSimple({
                    name: "value",
                    index,
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
                    name: "value",
                    index,
                    newValue: e.target.value,
                    variableName: item.variableName,
                  })
                }
                maxLength={item.maxLength}
                className={cn(item.errorSpan && "border-red-500")}
                {...commonProps}
              />
            )}
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
            <SearchableSelect
              options={
                item.list?.map((opt: any) => ({
                  value: opt.value,
                  label: opt.option,
                })) || []
              }
              value={getFieldValue(item) || ""}
              onChange={(newValue) => {
                if (item.hasOwnProperty("noOpts"))
                  onChangeAutomationSimple({
                    name: "value",
                    index: index,
                    newValue: newValue,
                    variableName: item.variableName,
                  })
                else
                  onChangeDropdown({
                    name: "value",
                    index,
                    children: item.child,
                    oldValue: getFieldValue(item),
                    newValue: newValue,
                    variableName: item.variableName,
                  })
              }}
              placeholder={`Select ${item.label?.toLowerCase()}`}
              className={cn(item.errorSpan && "border-red-500")}
              {...commonProps}
            />
            {item.helperSpan && <p className="text-xs text-muted-foreground">{item.helperSpan}</p>}
            {item.errorSpan && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {item.errorSpan}
              </p>
            )}
          </div>
        )

      case "api":
        return (
          <ApiCaller
            inDynamic={InDynamic ? (indexForDynamic === 0 ? true : false) : undefined}
            disabled={disabled}
            apiJson={item}
            value={getFieldValue(item)}
            onChange={({ val, name }) => {
              onChangeAutomationSimple({
                name: name,
                index: index,
                newValue: val,
                variableName: item.variableName,
              })
            }}
            flowZoneSelectedId={flowZoneSelectedId}
            helperSpan={item.helperSpan}
          />
        )

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`checkbox-${index}`}
              checked={getFieldValue(item) || false}
              onCheckedChange={(checked) =>
                onChangeAutomationSimple({
                  name: "value",
                  index,
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
                  name: "value",
                  index,
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
                        name: "value",
                        index,
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
                    name: "value",
                    index,
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
                    name: "value",
                    index,
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
                    name: "value",
                    index,
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
              onChange={({ name, val }: any) => {
                if (fieldValues && onFieldChange && item.variableName) {
                  // For external field values, directly update the fieldsArray
                  onFieldChange(item.variableName, val)
                } else {
                  onChangeAutomationSimple({
                    name: item.hasOwnProperty("json") ? "json" : name,
                    index,
                    newValue: item.hasOwnProperty("json") ? { ...item.json, fieldsArray: val } : val,
                    variableName: item.variableName,
                  })
                }
              }}
              filledArray={dynamicValue}
              flowZoneSelectedId={flowZoneSelectedId}
              {...commonProps}
            />
          </div>
        )

      case "accordion":
        return (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="text-sm font-medium">{item.accTitle || item.title}</AccordionTrigger>
              <AccordionContent>
                <DynamicFields
                  json={{
                    ...item,
                    fieldsArray: getDynamicFieldValue(item),
                  }}
                  onChange={({ name, val }: any) => {
                    if (fieldValues && onFieldChange && item.variableName) {
                      onFieldChange(item.variableName, val)
                    } else {
                      onChangeAutomationSimple({
                        name,
                        index,
                        newValue: val,
                        variableName: item.variableName,
                      })
                    }
                  }}
                  filledArray={getDynamicFieldValue(item)}
                  title={item.variableName}
                  flowZoneSelectedId={flowZoneSelectedId}
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
                    name: "value",
                    index,
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
      {apiRes.map((item, index) => (
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

"use client"

import { TooltipContent } from "@radix-ui/react-tooltip"
import { AlertTriangle, ListChecks, Plus, Sparkles, Trash2 } from "lucide-react"
import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { setAutomationArrayV2 } from "../../lib/automation-utils"
import { type ApiResItem, cn } from "../../lib/utils"
import { AutomationItem } from "../../types/automation-types"
import { Alert, AlertDescription } from "../ui/alert"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import AutomationSimple from "./automation-v3"

interface DynamicInputFieldsProps {
  json: {
    type: string
    variableName: string
    title: string
    fieldsArray: ApiResItem[][] | string
    structure: ApiResItem[]
    required?: boolean
    minSize?: number
    errorSpan?: string
    hasAI?: boolean
    [key: string]: any
  }
  onChange: (args: { name: string; val: any }) => void
  disabled?: boolean
  flowZoneSelectedId: string
  // New props for external field values
  fieldValues?: Record<string, any>
  onFieldChange?: (variableName: string, value: any) => void
  [key: string]: any
}

// Mock function - replace with your actual implementation
const setAutomationArray = (fields: ApiResItem[]): ApiResItem[] => {
  return fields.map((field) => ({
    ...field,
    id: field.id || uuidv4(),
  }))
}

const UseAIIcon: React.FC<{
  isUsingVariable: boolean
  onClick: () => void
  rightSideInput?: boolean
  disabled?: boolean
}> = ({ isUsingVariable, onClick, disabled }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isUsingVariable ? "default" : "outline"}
          size="icon"
          className={cn(
            "h-8 w-8 ml-2",
            isUsingVariable
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "border-purple-300 text-purple-600 hover:bg-purple-50",
          )}
          onClick={onClick}
          disabled={disabled}
        >
          <Sparkles className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{isUsingVariable ? "Stop using AI" : "Use AI"}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const DynamicFieldsLabel: React.FC<{
  label: string
  tooltipTitle: string
  onClick: () => void
  rightSideInput?: boolean
  disabled?: boolean
}> = ({ label, tooltipTitle, onClick, disabled }) => (
  <div className="flex items-center justify-between mb-3">
    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</Label>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs bg-transparent"
            onClick={onClick}
            disabled={disabled}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltipTitle}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
)

const DynamicInputFields: React.FC<DynamicInputFieldsProps> = (props) => {
  const { json, onChange, disabled, flowZoneSelectedId, fieldValues, onFieldChange, filledArray } = props

  // Mock selector - replace with your actual Redux selector
  const selectedRPA = { status: "Inactive" } // useSelector((state) => state.updateRPA.selectedRPA)
  const isActive = selectedRPA?.status === "Active"

  const [remove, setRemove] = useState(false)

  console.log({ filledArray, json });

  // Get the current fieldsArray value from external state or internal state
  const getCurrentFieldsArray = () => {
    if (fieldValues && json.variableName && fieldValues.hasOwnProperty(json.variableName)) {
      return fieldValues[json.variableName]
    }
    return json.fieldsArray
  }

  const currentFieldsArray = getCurrentFieldsArray()

  const valueIsAIOrEmpty =
    currentFieldsArray &&
    typeof currentFieldsArray === "string" &&
    currentFieldsArray.trim() &&
    currentFieldsArray.startsWith("##AI##")

  const [isUsingAI, setIsUsingAI] = useState(valueIsAIOrEmpty)

  const updateFieldsArray = (newValue: any) => {
    if (fieldValues && onFieldChange && json.variableName) {
      // Use external field change handler
      onFieldChange(json.variableName, newValue)
    } else {
      // Use internal onChange handler
      onChange({
        name: "fieldsArray",
        val: newValue,
      })
    }
  }

  const onAddVariables = () => {
    if (typeof currentFieldsArray === "string") return

    const newElt = json.structure.map((field) => {
      if (field.type !== "dynamic") {
        return {
          ...field,
          variableName: `${field.variableName}`,
        }
      } else {
        return { ...field, id: uuidv4() }
      }
    })

    const currentArray = Array.isArray(currentFieldsArray) ? currentFieldsArray : []
    updateFieldsArray([...currentArray, setAutomationArray(newElt)])
  }

  const onRemoveVariables = (index: number) => {
    if (typeof currentFieldsArray === "string" || !Array.isArray(currentFieldsArray)) return

    const newVariables = currentFieldsArray.filter((_, i) => i !== index)
    updateFieldsArray(newVariables)
    setRemove((prev) => !prev)
  }

  const onChangeVariables = ({ index, event }: { index: number; event: any }) => {
    if (typeof currentFieldsArray === "string" || !Array.isArray(currentFieldsArray)) return

    const newFieldsArray = currentFieldsArray.map((field, ind) => {
      if (index === ind) {
        return event
      }
      return field
    })
    updateFieldsArray(newFieldsArray)
  }

  const onUseAIIconClick = () => {
    const newValue = isUsingAI ? [] : "##AI##"
    updateFieldsArray(newValue)
    setIsUsingAI(!isUsingAI)
  }

  const UseAIIconHTML = json.hasAI && (
    <UseAIIcon
      isUsingVariable={!!isUsingAI}
      onClick={onUseAIIconClick}
      rightSideInput={true}
      disabled={disabled || isActive}
    />
  )

  // AI Mode Display
  if (valueIsAIOrEmpty) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Label className="text-sm font-medium mb-2 block">
            {json.variableName}
            {json.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            placeholder="Pick a variable"
            value="The value will be taken from the query context"
            readOnly
            className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300"
          />
        </div>
        {UseAIIconHTML}
      </div>
    )
  }

  const fieldsArray = Array.isArray(currentFieldsArray) ? currentFieldsArray : []
  const hasRequiredError = json.required && fieldsArray.length === 0
  const hasRequiredSuccess = json.required && fieldsArray.length > 0
  console.log({ json, currentFieldsArray, fieldsArray })

  // Create field values for nested automation components
  const createNestedFieldValues = (fieldSetIndex: number) => {
    if (!fieldValues || !onFieldChange) return undefined

    const nestedValues: Record<string, any> = {}
    const fieldSet = fieldsArray[fieldSetIndex]

    if (Array.isArray(fieldSet)) {
      fieldSet.forEach((field) => {
        if (field.variableName && field.hasOwnProperty("value")) {
          nestedValues[field.variableName] = field.value
        }
      })
    }

    return nestedValues
  }

  const handleNestedFieldChange = (fieldSetIndex: number) => {
    return (variableName: string, value: any) => {
      if (typeof currentFieldsArray === "string" || !Array.isArray(currentFieldsArray)) return

      const newFieldsArray = currentFieldsArray.map((fieldSet, index) => {
        if (index === fieldSetIndex && Array.isArray(fieldSet)) {
          return fieldSet.map((field) => {
            if (field.variableName === variableName) {
              return { ...field, value }
            }
            return field
          })
        }
        return fieldSet
      })

      updateFieldsArray(newFieldsArray)
    }
  }

  return (
    <div className="space-y-4">
      <div className={cn("rounded-l-md")}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <ListChecks className="w-4 h-4 mr-2" />
              {json.title}&nbsp;
              <span className="text-muted-foreground">({fieldsArray.length})</span>
            </CardTitle>
            <CardDescription>Add options users can select. Every choice gets its own output handle.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {filledArray.length === 0 && (
              <p className="text-xs text-gray-500">
                No {json.title} yet. Click "Add {json.title}".
              </p>
            )}

            {filledArray.map((fieldSet: Record<string, any>, fieldSetInd: number) => (
              <Card key={fieldSetInd} className="border border-gray-200">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      {json.title} {fieldSetInd + 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      onClick={() => onRemoveVariables(fieldSetInd)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>

                  <div>
                    <AutomationSimple
                      disabled={disabled || isActive}
                      indexForDynamic={fieldSetInd}
                      AllJson={json.structure}
                      onChangeDynamicVariables={onChangeVariables}
                      InDynamic={true}
                      flowZoneSelectedId={flowZoneSelectedId}
                      onRemoveVariables={onRemoveVariables}
                      // fieldValues={createNestedFieldValues(fieldSetInd)}
                      onFieldChange={handleNestedFieldChange(fieldSetInd)}
                      fieldValues={fieldSet}



                      apiRes={setAutomationArrayV2((json.structure as AutomationItem[]), fieldSet)}

                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" size="sm" onClick={onAddVariables} className="h-8 w-full bg-transparent">
              <Plus className="w-3 h-3 mr-1" />
              Add {json.title}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Validation Error */}
      {json.minSize && json.minSize > fieldsArray.length && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {json.errorSpan || `Minimum ${json.minSize} ${json.title.toLowerCase()} required`}
          </AlertDescription>
        </Alert>
      )}

      {/* Required Field Error */}
      {hasRequiredError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            This field is required. Please add at least one {json.title.toLowerCase()}.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default React.memo(DynamicInputFields)

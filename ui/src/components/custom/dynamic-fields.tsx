import { TooltipContent } from "@radix-ui/react-tooltip"
import { AlertTriangle, ListChecks, Plus, Sparkles, Trash2 } from "lucide-react"
import React, { useState } from "react"
import { getAutomationListValues } from "../../lib/automation-utils"
import { cn } from "../../lib/utils/utils"
import { AutomationItem } from "../../types/automation-types"
import { Alert, AlertDescription } from "../ui/alert"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import AutomationSimple from "./automation"


interface DynamicInputFieldsProps {
  json: {
    type: string
    variableName: string
    title: string
    fieldsArray: AutomationItem[][] | string
    structure: AutomationItem[]
    description?: string
    required?: boolean
    minSize?: number
    errorSpan?: string
    hasAI?: boolean
  }
  disabled?: boolean
  filledDataName: string
  flowZoneSelectedId: string
  fieldValues?: Record<string, any>
  onFieldChange: (partialState: Record<string, any>, replace?: boolean) => void
  filledArray: AutomationItem[][] | string
}

const UseAIIcon: React.FC<{
  isUsingVariable: boolean
  onClick: () => void
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

const DynamicInputFields: React.FC<DynamicInputFieldsProps> = ({
  json,
  disabled,
  flowZoneSelectedId,
  fieldValues,
  onFieldChange,
  filledArray,
  filledDataName,
}) => {
  const selectedRPA = { status: "Inactive" }
  const isActive = selectedRPA?.status === "Active"

  const isAIMode = typeof filledArray === "string" && filledArray.trim() && filledArray.startsWith("##AI##")

  const [isUsingAI, setIsUsingAI] = useState(isAIMode)

  const fieldsArray = Array.isArray(filledArray) ? filledArray : []

  const updateFieldsArray = (newValue: any) => {
    if (onFieldChange && json.variableName) {
      onFieldChange({ [json.variableName]: newValue }, false)
    }
  }

  const onAddVariables = () => {
    if (typeof filledArray === "string") return
    const newElt = getAutomationListValues(json.structure)
    updateFieldsArray([...fieldsArray, newElt])
  }

  const onRemoveVariables = (index: number) => {
    const newVariables = fieldsArray.filter((_, i) => i !== index)
    updateFieldsArray(newVariables)
  }

  const onUseAIIconClick = () => {
    const newValue = isUsingAI ? [] : "##AI##"
    updateFieldsArray(newValue)
    setIsUsingAI(!isUsingAI)
  }

  const renderAIMode = () => (
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
      {json.hasAI && (
        <UseAIIcon isUsingVariable={!!isUsingAI} onClick={onUseAIIconClick} disabled={disabled || isActive} />
      )}
    </div>
  )

  const renderValidationErrors = () => (
    <>
      {json.minSize && json.minSize > fieldsArray.length && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {json.errorSpan || `Minimum ${json.minSize} ${json.title.toLowerCase()} required`}
          </AlertDescription>
        </Alert>
      )}

      {json.required && fieldsArray.length === 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            This field is required. Please add at least one {json.title.toLowerCase()}.
          </AlertDescription>
        </Alert>
      )}
    </>
  )

  const renderFieldSet = (fieldSet: Record<string, any>, fieldSetIndex: number) => {
    const isAccordion = json.type === "accordion"

    return (
      <Card key={fieldSetIndex} className={isAccordion ? "border-none" : "border border-gray-200"}>
        <CardContent className={isAccordion ? "p-0" : "p-4 space-y-3"}>
          {!isAccordion && (
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">
                {json.title} {fieldSetIndex + 1}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                onClick={() => onRemoveVariables(fieldSetIndex)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          )}

          <AutomationSimple
            filledDataName={filledDataName}
            disabled={disabled || isActive}
            indexForDynamic={fieldSetIndex}
            schema={isAccordion ? (json.fieldsArray[0] as AutomationItem[]) : json.structure}
            inDynamic={true}
            flowZoneSelectedId={flowZoneSelectedId}
            onFieldChange={(partialState: any, replace?: boolean) => {
              let newFilledData

              if (isAccordion) {
                newFilledData = replace ? partialState : { ...fieldSet, ...partialState }
              } else {
                newFilledData = fieldsArray.map((item: any, index: number) =>
                  index === fieldSetIndex ? (replace ? partialState : { ...item, ...partialState }) : item,
                )
              }

              onFieldChange({ [json.variableName]: newFilledData }, false)
            }}
            fieldValues={fieldSet}
          />
        </CardContent>
      </Card>
    )
  }

  // Early return for AI mode
  if (isAIMode) {
    return renderAIMode()
  }

  const isAccordion = json.type === "accordion"

  return (
    <div className="space-y-4">
      <div className="rounded-l-md">
        <Card className="border-none">
          {!isAccordion && (
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <ListChecks className="w-4 h-4 mr-2" />
                {json.title}&nbsp;
                <span className="text-muted-foreground">({fieldsArray.length})</span>
              </CardTitle>
              {json.description && <CardDescription>{json.description}</CardDescription>}
            </CardHeader>
          )}

          <CardContent className="p-0 space-y-4">
            {fieldsArray.length === 0 && (
              <p className="text-xs text-gray-500">
                No {json.title} yet. Click "Add {json.title}".
              </p>
            )}

            {fieldsArray.map((fieldSet, fieldSetIndex) => renderFieldSet(fieldSet, fieldSetIndex))}

            {!isAccordion && (
              <Button variant="outline" size="sm" onClick={onAddVariables} className="h-8 w-full bg-transparent">
                <Plus className="w-3 h-3 mr-1" />
                Add {json.title}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {renderValidationErrors()}
    </div>
  )
}

export default React.memo(DynamicInputFields)

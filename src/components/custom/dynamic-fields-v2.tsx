import { TooltipContent } from "@radix-ui/react-tooltip"
import { AlertTriangle, Plus, Sparkles } from "lucide-react"
import React, { Fragment, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { ApiResItem, cn } from "../../lib/utils"
import { Alert, AlertDescription } from "../ui/alert"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import AutomationSimple from "./automation-v2"
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
  flowZoneSelectedElement?: any
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
          <Button variant="outline" size="sm" className="h-8 px-3 text-xs" onClick={onClick} disabled={disabled}>
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
  const { json, onChange, disabled, flowZoneSelectedElement } = props

  // Mock selector - replace with your actual Redux selector
  const selectedRPA = { status: "Inactive" } // useSelector((state) => state.updateRPA.selectedRPA)
  const isActive = selectedRPA?.status === "Active"

  const [remove, setRemove] = useState(false)

  const valueIsAIOrEmpty =
    json.fieldsArray &&
    typeof json.fieldsArray === "string" &&
    json.fieldsArray.trim() &&
    json.fieldsArray.startsWith("##AI##")

  const [isUsingAI, setIsUsingAI] = useState(valueIsAIOrEmpty)

  const onAddVariables = () => {
    if (typeof json.fieldsArray === "string") return

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

    const currentArray = Array.isArray(json.fieldsArray) ? json.fieldsArray : []
    onChange({
      name: "fieldsArray",
      val: [...currentArray, setAutomationArray(newElt)],
    })
  }

  const onRemoveVariables = (index: number) => {
    if (typeof json.fieldsArray === "string" || !Array.isArray(json.fieldsArray)) return

    const newVariables = json.fieldsArray.filter((_, i) => i !== index)
    onChange({ name: "fieldsArray", val: newVariables })
    setRemove((prev) => !prev)
  }

  const onChangeVariables = ({ index, event }: { index: number; event: any }) => {
    if (typeof json.fieldsArray === "string" || !Array.isArray(json.fieldsArray)) return

    onChange({
      name: "fieldsArray",
      val: json.fieldsArray.map((field, ind) => {
        if (index === ind) {
          return event
        }
        return field
      }),
    })
  }

  const onUseAIIconClick = () => {
    const newValue = isUsingAI ? [] : "##AI##"
    onChange({
      name: "fieldsArray",
      val: newValue,
    })
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

  const fieldsArray = Array.isArray(json.fieldsArray) ? json.fieldsArray : []
  const hasRequiredError = json.required && fieldsArray.length === 0
  const hasRequiredSuccess = json.required && fieldsArray.length > 0

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "rounded-l-md",
          hasRequiredError && "border-l-4 border-red-500 pl-3",
          hasRequiredSuccess && "border-l-4 border-green-500 pl-3",
        )}
      >
        {json.type !== "accordion" && (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <DynamicFieldsLabel
                label={fieldsArray.length > 0 ? `${json.title} (${fieldsArray.length})` : `No ${json.title}`}
                tooltipTitle={`Add ${json.title}`}
                onClick={onAddVariables}
                rightSideInput={true}
                disabled={disabled}
              />
            </div>
            {UseAIIconHTML}
          </div>
        )}

        {/* Fields List */}
        {fieldsArray.length > 0 && (
          <div className="space-y-4">
            {fieldsArray.map((field, index) => (
              <Fragment key={`${index}-${remove}`}>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {json.title} {index + 1}
                    </Badge>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => onRemoveVariables(index)}
                      disabled={disabled || isActive}
                    >
                      Remove
                    </Button>
                  </div>

                  <AutomationSimple
                    disabled={disabled || isActive}
                    indexForDynamic={index}
                    apiRes={field as ApiResItem[]}
                    AllJson={json.structure}
                    onChangeDynamicVariables={onChangeVariables}
                    InDynamic={true}
                    flowZoneSelectedElement={flowZoneSelectedElement}
                    onRemoveVariables={onRemoveVariables}
                  />
                </div>

                {index < fieldsArray.length - 1 && <Separator className="my-4" />}
              </Fragment>
            ))}
          </div>
        )}

        {/* Empty State */}
        {fieldsArray.length === 0 && !hasRequiredError && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <div className="text-sm">No {json.title.toLowerCase()} added yet</div>
            <div className="text-xs mt-1">Click "Add" to create your first {json.title.toLowerCase()}</div>
          </div>
        )}
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

"use client"

import type React from "react"
import { useRef, useState } from "react"

import { ChevronLeft, ChevronRight, Search, Variable, X } from "lucide-react"
import { useFlowStore, VariableCategory } from "../store/flow-store"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Textarea } from "./ui/textarea"

interface VariablesPanelProps {
  isOpen: boolean
  isMinimized: boolean
  onClose: () => void
  onToggleMinimize: () => void
  right: number
}
export interface WorkflowVariable {
  id: string
  name: string
  type: "string" | "number" | "boolean" | "object" | "array"
  value: any
  description?: string
  category: VariableCategory
  createdAt: Date
  updatedAt: Date
}
export function VariablesPanel({
  isOpen,
  isMinimized,
  onClose,
  onToggleMinimize,
  right
}: VariablesPanelProps) {
  const variables = useFlowStore(state => state.variables)
  const [searchTerm, setSearchTerm] = useState("")
  const varPickerProps = useFlowStore(state => state.varPickerProps)
  const isPopoverInteracting = useFlowStore(state => state.isPopoverInteracting)
  const setIsPopoverInteracting = useFlowStore(state => state.setIsPopoverInteracting)
  const setVarPicker = useFlowStore(state => state.setVarPicker)
  const {
    fieldRefs,
    setFieldRef,
    blurTimeoutRef,
    setBlurTimeoutRef,
    focusedField,
    setSelectedOutputOrVariable
  } = useFlowStore()
  const onVariableSelect = (varName: string) => {
    console.log({ varPickerProps,varName });
    setSelectedOutputOrVariable(varName)
  }
  const filteredVariables = variables.filter(
    (variable) =>
      variable.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (variable.description && variable.description.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "string":
        return "bg-blue-100 text-blue-800"
      case "number":
        return "bg-green-100 text-green-800"
      case "boolean":
        return "bg-purple-100 text-purple-800"
      case "object":
        return "bg-orange-100 text-orange-800"
      case "array":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatValue = (value: any, type: string) => {
    if (type === "object" || type === "array") {
      return JSON.stringify(value).substring(0, 30) + "..."
    }
    return String(value).substring(0, 30)
  }
  console.log({ variables });


  const handlePopoverInteraction = (interacting: boolean) => {
    setIsPopoverInteracting(interacting)
    if (!interacting) {
      setTimeout(() => {
        if (
          !document.activeElement ||
          !fieldRefs[focusedField || ""]?.contains(document.activeElement)
        ) {
          setVarPicker(false)
        }
      }, 100)
    }
  }



  if (!isOpen) return null

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <div className="fixed top-2/4 -translate-y-1/2 w-0 h-0" style={{ right: `${right}px` }} />
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onMouseEnter={() => handlePopoverInteraction(true)}
        onFocusCapture={() => handlePopoverInteraction(true)}
        onBlurCapture={() => handlePopoverInteraction(false)}
        side="left" className="w-80 p-0 h-[calc(100vh-160px)]"
      >

        {isMinimized ? (
          <div className="flex flex-col items-center py-4 space-y-4">
            <Button variant="ghost" size="sm" onClick={onToggleMinimize} className="w-8 h-8 p-0">
              <ChevronRight className="w-4 h-4" />
            </Button>
            <div className="writing-mode-vertical text-sm text-gray-600 transform rotate-90 whitespace-nowrap">
              Variables
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <CardHeader className="pb-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Variable className="w-4 h-4" />
                  Variables
                </CardTitle>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" onClick={onToggleMinimize} className="w-8 h-8 p-0">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onClose} className="w-8 h-8 p-0">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search variables..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-8"
                />
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4">
              {filteredVariables.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  {variables.length === 0 ? (
                    <div>
                      <Variable className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">No variables defined</p>
                      <p className="text-xs text-gray-400 mt-1">Create variables to use them in your workflow</p>
                    </div>
                  ) : (
                    <div>
                      <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">No variables match your search</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredVariables.map((variable) => {
                    console.log({ variable });

                    return (
                      <div
                        key={variable.id}
                        className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors group"
                        role="button"
                        tabIndex={0}
                        onClick={() => onVariableSelect(`\${${variable.name}}`)}
                      >

                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm truncate">{variable.name}</span>
                          <Badge className={`text-xs flex-shrink-0 ml-2 ${getTypeColor(variable.type)}`}>
                            {variable.type}
                          </Badge>
                        </div>
                        {variable.description && (
                          <p className="text-xs text-gray-600 mb-1 line-clamp-2">{variable.description}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <code className="text-xs text-gray-500 bg-gray-100 px-1 rounded truncate flex-1">
                            {formatValue(variable.value, variable.type)}
                          </code>
                          <span className="text-xs text-gray-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            Click to insert
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </div>
        )}

      </PopoverContent>
    </Popover>
  )
}

// Global state for the variables panel
let globalVariablesPanelState = {
  isOpen: false,
  isMinimized: false,
  activeInputRef: null as HTMLInputElement | HTMLTextAreaElement | null,
}

const variablesPanelListeners = new Set<() => void>()

function updateVariablesPanelState(updates: Partial<typeof globalVariablesPanelState>) {
  globalVariablesPanelState = { ...globalVariablesPanelState, ...updates }
  variablesPanelListeners.forEach((listener) => listener())
}

export function useVariablesPanel() {
  const [state, setState] = useState(globalVariablesPanelState)



  const showPanel = (inputRef: HTMLInputElement | HTMLTextAreaElement) => {
    updateVariablesPanelState({ isOpen: true, activeInputRef: inputRef })
  }

  const hidePanel = () => {
    updateVariablesPanelState({ isOpen: false, activeInputRef: null })
  }

  const toggleMinimize = () => {
    updateVariablesPanelState({ isMinimized: !globalVariablesPanelState.isMinimized })
  }

  const insertVariable = (variableName: string) => {
    const inputRef = globalVariablesPanelState.activeInputRef
    if (!inputRef) return

    const cursorPosition = inputRef.selectionStart || 0
    const currentValue = inputRef.value || ""
    const beforeCursor = currentValue.substring(0, cursorPosition)
    const afterCursor = currentValue.substring(cursorPosition)
    const newValue = beforeCursor + `{{${variableName}}}` + afterCursor

    // Update the input value
    inputRef.value = newValue

    // Trigger change event
    const event = new Event("input", { bubbles: true })
    inputRef.dispatchEvent(event)

    // Set cursor position after the inserted variable
    setTimeout(() => {
      const newCursorPosition = cursorPosition + `{{${variableName}}}`.length
      inputRef.setSelectionRange(newCursorPosition, newCursorPosition)
      inputRef.focus()
    }, 0)
  }

  return {
    ...state,
    showPanel,
    hidePanel,
    toggleMinimize,
    insertVariable,
  }
}

interface InputWithVariablesProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputWithVariables({ value, onChange, ...props }: InputWithVariablesProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { showPanel } = useVariablesPanel()

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      showPanel(inputRef.current)
    }
    props.onFocus?.(e)
  }

  return <Input {...props} ref={inputRef} value={value} onChange={onChange} onFocus={handleFocus} />
}

interface TextareaWithVariablesProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function TextareaWithVariables({ value, onChange, ...props }: TextareaWithVariablesProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { showPanel } = useVariablesPanel()

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      showPanel(textareaRef.current)
    }
    props.onFocus?.(e)
  }

  return <Textarea {...props} ref={textareaRef} value={value} onChange={onChange} onFocus={handleFocus} />
}

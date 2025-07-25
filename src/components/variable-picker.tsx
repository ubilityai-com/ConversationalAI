"use client"

import type React from "react"
import { useRef, useState } from "react"

import { Braces, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, MessageSquare, Search, Variable, X } from "lucide-react"
import { useFlowStore, VariableCategory } from "../store/flow-store"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { CardContent, CardHeader, CardTitle } from "./ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { Textarea } from "./ui/textarea"


interface Variable {
  name: string;
  type: "constant" | "output" | "dialogue";
  value?: "string" | "number" | "boolean" | "object" | "array" | string;
  path?: string;
  nodeId?: string;
}



const typeConfig = {
  constant: {
    icon: Braces,
    label: "Constants",
    description: "Fixed values and configuration settings",
    badgeClass: "bg-constant-bg text-constant border-constant",
  },
  output: {
    icon: Variable,
    label: "Outputs",
    description: "Generated values and computation results",
    badgeClass: "bg-output-bg text-output border-output",
  },
  dialogue: {
    icon: MessageSquare,
    label: "Dialogue",
    description: "Conversation flow and user interaction data",
    badgeClass: "bg-dialogue-bg text-dialogue border-dialogue",
  },
};

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
let timeout: NodeJS.Timeout | string | number | undefined
export function VariablesPanel({
  isOpen,
  isMinimized,
  onClose,
  onToggleMinimize,
  right
}: VariablesPanelProps) {
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
    setSelectedOutputOrVariable, constantVariables, outputVariables, dialogueVariables
  } = useFlowStore()

  const onVariableSelect = (varName: string) => {
    console.log({ varPickerProps, varName });
    setSelectedOutputOrVariable(varName)
  }
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const allowedNodeIds = varPickerProps?.allowedNodeIds ?? [];

const allVariables: Variable[] = [
  // Include all constant variables
  ...Object.entries(constantVariables).map(([name, type]) => ({
    name,
    type: "constant" as const,
    value: type,
  })),

  // Include only output variables for allowed node IDs
  ...Object.entries(outputVariables)
    .filter(([nodeId]) => allowedNodeIds.includes(nodeId))
    .flatMap(([nodeId, variables]) =>
      Object.entries(variables).map(([name, path]) => ({
        name,
        type: "output" as const,
        path,
        nodeId,
      }))
    ),

  // Include only dialogue variables for allowed node IDs
  ...Object.entries(dialogueVariables)
    .filter(([nodeId]) => allowedNodeIds.includes(nodeId))
    .map(([nodeId, name]) => ({
      name,
      type: "dialogue" as const,
      path: nodeId,
    })),
];

  const groupedVariables = allVariables.reduce((acc, variable) => {
    if (!acc[variable.type]) {
      acc[variable.type] = [];
    }
    acc[variable.type].push(variable);
    return acc;
  }, {} as Record<string, Variable[]>);

  // Filter by search term first, then by type
  const searchFilteredVariables = Object.keys(groupedVariables).reduce((acc, type) => {
    const filteredVars = groupedVariables[type].filter(variable =>
      variable.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredVars.length > 0) {
      acc[type] = filteredVars;
    }
    return acc;
  }, {} as Record<string, Variable[]>);

  const filteredVariables = selectedType
    ? { [selectedType]: searchFilteredVariables[selectedType] || [] }
    : searchFilteredVariables;



  const handlePopoverInteraction = (interacting: boolean, event?: React.FocusEvent<HTMLElement>) => {
    setIsPopoverInteracting(interacting)
    clearTimeout(timeout)
    if (!interacting) {
      timeout = setTimeout(() => {
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
        onFocusCapture={(event) => handlePopoverInteraction(true, event)}
        onBlurCapture={(event) => handlePopoverInteraction(false, event)}
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

            <CardContent className="flex-1 p-4">
              {Object.keys(filteredVariables).length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  {allVariables.length === 0 ? (
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
                  <ScrollArea className="h-[calc(100vh-200px)]">
                    <div className="space-y-6">
                      {Object.entries(filteredVariables).map(([type, variables]) => {
                        const config = typeConfig[type as keyof typeof typeConfig];
                        const IconComponent = config.icon;

                        return (
                          <Collapsible
                            key={type}
                            open={openSections[type]}
                            onOpenChange={(open) => setOpenSections(prev => ({ ...prev, [type]: open }))}
                          >
                            <CollapsibleTrigger className="w-full group">
                              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                                <IconComponent className="h-5 w-5 text-muted-foreground" />
                                <h3 className="font-semibold text-lg">{config.label}</h3>
                                <Badge variant="secondary" className="ml-auto">
                                  {variables.length}
                                </Badge>
                                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                              </div>
                            </CollapsibleTrigger>

                            <CollapsibleContent className="space-y-3">
                              <p className="text-sm text-muted-foreground mb-3 px-2">
                                {config.description}
                              </p>

                              <div className="space-y-2">
                                {variables.map((variable, index) => (
                                  <div
                                    key={`${variable.name}-${index}`}
                                    className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer group"
                                    role="button"
                                    tabIndex={0}
                                    onClick={(event) => {
                                      event.preventDefault()
                                      onVariableSelect(`\${${variable.name}}`)
                                    }}
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          <code className="font-mono text-sm font-medium">
                                            {variable.name}
                                          </code>
                                          <Badge
                                            variant="outline"
                                            className={`text-xs ${config.badgeClass}`}
                                          >
                                            {type}
                                          </Badge>
                                        </div>

                                        {variable.value && (
                                          <div className="text-xs text-muted-foreground mb-1">
                                            <span className="font-medium">
                                              {variable.type === "constant" ? "Type: " : "Value: "}
                                            </span>
                                            <code className="bg-muted px-1 py-0.5 rounded">
                                              {variable.value}
                                            </code>
                                          </div>
                                        )}

                                        {variable.path && (
                                          <div className="text-xs text-muted-foreground mb-1">
                                            <span className="font-medium">Path: </span>
                                            <code className="bg-muted px-1 py-0.5 rounded">
                                              {variable.path}
                                            </code>
                                          </div>
                                        )}

                                        {variable.nodeId && (
                                          <div className="text-xs text-muted-foreground">
                                            <span className="font-medium">Node: </span>
                                            <code className="bg-muted px-1 py-0.5 rounded">
                                              {variable.nodeId}
                                            </code>
                                          </div>
                                        )}
                                      </div>

                                      {(variable.type === "output" || variable.type === "dialogue") && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            console.log(`Navigate to origin of ${variable.name} at ${variable.path}`);
                                            // Add navigation logic here
                                          }}
                                        >
                                          <ExternalLink className="h-3 w-3" />
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CollapsibleContent>

                            {Object.keys(filteredVariables).length > 1 && (
                              <Separator className="mt-4" />
                            )}
                          </Collapsible>
                        );
                      })}
                    </div>
                  </ScrollArea>
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

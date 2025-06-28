"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Switch } from "../../ui/switch"
import { Wrench, Plus, Trash2, PenToolIcon as ToolIcon } from "lucide-react"

interface Tool {
  id: string
  type: string
  name: string
  description: string
  enabled: boolean
}

interface ToolsSectionProps {
  config: any
  onConfigUpdate: (key: string, value: any) => void
}

// Available tool types
const availableTools = [
  { value: "web-search", label: "Web Search" },
  { value: "calculator", label: "Calculator" },
  { value: "code-interpreter", label: "Code Interpreter" },
  { value: "database", label: "Database Query" },
  { value: "file-reader", label: "File Reader" },
  { value: "image-generator", label: "Image Generator" },
  { value: "api-call", label: "API Call" },
  { value: "knowledge-base", label: "Knowledge Base" },
]

export function ToolsSection({ config, onConfigUpdate }: ToolsSectionProps) {
  const toolsEnabled = config.toolsEnabled === true
  const tools = config.tools || []

  // Tools management for LLM agent
  const addTool = () => {
    const currentTools = tools
    const newTool: Tool = {
      id: `tool-${Date.now()}`,
      type: "web-search", // Default tool type
      name: "New Tool",
      description: "",
      enabled: true,
    }
    onConfigUpdate("tools", [...currentTools, newTool])
  }

  const updateTool = (toolId: string, updates: Partial<Tool>) => {
    const currentTools = tools
    const updatedTools = currentTools.map((tool: Tool) => (tool.id === toolId ? { ...tool, ...updates } : tool))
    onConfigUpdate("tools", updatedTools)
  }

  const removeTool = (toolId: string) => {
    const currentTools = tools
    const updatedTools = currentTools.filter((tool: Tool) => tool.id !== toolId)
    onConfigUpdate("tools", updatedTools)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center">
            <Wrench className="w-4 h-4 mr-2" />
            Tools
          </CardTitle>
          <Switch
            checked={toolsEnabled}
            onCheckedChange={(checked) => onConfigUpdate("toolsEnabled", checked)}
            aria-label="Enable tools"
          />
        </div>
        <CardDescription>Configure tools for the LLM agent to use</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {toolsEnabled && (
          <>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Available Tools</Label>
              <Button variant="outline" size="sm" onClick={addTool} className="h-8">
                <Plus className="w-3 h-3 mr-1" />
                Add Tool
              </Button>
            </div>

            {tools.length === 0 ? (
              <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                <ToolIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No tools configured</p>
                <p className="text-xs text-gray-400 mt-1">Click "Add Tool" to give the LLM agent capabilities</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tools.map((tool: Tool) => (
                  <Card key={tool.id} className="border border-gray-200">
                    <CardContent className="p-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <ToolIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-xs font-medium text-gray-600">{tool.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={tool.enabled}
                            onCheckedChange={(checked) => updateTool(tool.id, { enabled: checked })}
                            aria-label={`Enable ${tool.name}`}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTool(tool.id)}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor={`tool-type-${tool.id}`} className="text-xs">
                          Tool Type
                        </Label>
                        <Select value={tool.type} onValueChange={(value) => updateTool(tool.id, { type: value })}>
                          <SelectTrigger id={`tool-type-${tool.id}`} className="h-8 text-xs">
                            <SelectValue placeholder="Select tool type" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableTools.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`tool-name-${tool.id}`} className="text-xs">
                          Name
                        </Label>
                        <Input
                          id={`tool-name-${tool.id}`}
                          placeholder="Tool name"
                          value={tool.name}
                          onChange={(e) => updateTool(tool.id, { name: e.target.value })}
                          className="h-8 text-xs"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`tool-description-${tool.id}`} className="text-xs">
                          Description
                        </Label>
                        <Textarea
                          id={`tool-description-${tool.id}`}
                          placeholder="Describe what this tool does and how the LLM should use it"
                          value={tool.description}
                          onChange={(e) => updateTool(tool.id, { description: e.target.value })}
                          rows={2}
                          className="text-xs"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {toolsEnabled && tools.length > 0 && (
          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p>
              <span className="font-medium">Note:</span> Tools give the LLM agent the ability to perform actions or
              retrieve information. Each tool should have a clear purpose and description.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

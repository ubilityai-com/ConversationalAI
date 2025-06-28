"use client"

import { Input } from "../../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { DynamicFieldWrapper } from "../../dynamic-field-wrapper"

interface ToolConfigProps {
  data: any
  onLabelUpdate: (label: string) => void
  onConfigUpdate: (key: string, value: any) => void
}

export function ToolConfig({ data, onLabelUpdate, onConfigUpdate }: ToolConfigProps) {
  const handleDynamicUpdate = (key: string, dynamicValue: string | undefined) => {
    onConfigUpdate(`${key}_dynamic`, dynamicValue)
  }

  return (
    <div className="space-y-4">
      <DynamicFieldWrapper
        label="Agent Name"
        value={data.label}
        dynamicValue={data.config.label_dynamic}
        onValueChange={onLabelUpdate}
        onDynamicValueChange={(dynamicValue) => handleDynamicUpdate("label", dynamicValue)}
        isDynamic={!!data.config.label_dynamic}
      >
        <Input value={data.label} onChange={(e) => onLabelUpdate(e.target.value)} />
      </DynamicFieldWrapper>

      <DynamicFieldWrapper
        label="Tool Type"
        value={data.config.toolType}
        dynamicValue={data.config.toolType_dynamic}
        onValueChange={(value) => onConfigUpdate("toolType", value)}
        onDynamicValueChange={(dynamicValue) => handleDynamicUpdate("toolType", dynamicValue)}
        isDynamic={!!data.config.toolType_dynamic}
      >
        <Select value={data.config.toolType || "api"} onValueChange={(value) => onConfigUpdate("toolType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select tool type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="api">API Call</SelectItem>
            <SelectItem value="database">Database Query</SelectItem>
            <SelectItem value="calculator">Calculator</SelectItem>
            <SelectItem value="websearch">Web Search</SelectItem>
          </SelectContent>
        </Select>
      </DynamicFieldWrapper>

      <DynamicFieldWrapper
        label="Endpoint/URL"
        value={data.config.endpoint}
        dynamicValue={data.config.endpoint_dynamic}
        onValueChange={(value) => onConfigUpdate("endpoint", value)}
        onDynamicValueChange={(dynamicValue) => handleDynamicUpdate("endpoint", dynamicValue)}
        isDynamic={!!data.config.endpoint_dynamic}
      >
        <Input
          placeholder="https://api.example.com/endpoint"
          value={data.config.endpoint || ""}
          onChange={(e) => onConfigUpdate("endpoint", e.target.value)}
        />
      </DynamicFieldWrapper>

      <DynamicFieldWrapper
        label="HTTP Method"
        value={data.config.method}
        dynamicValue={data.config.method_dynamic}
        onValueChange={(value) => onConfigUpdate("method", value)}
        onDynamicValueChange={(dynamicValue) => handleDynamicUpdate("method", dynamicValue)}
        isDynamic={!!data.config.method_dynamic}
      >
        <Select value={data.config.method || "GET"} onValueChange={(value) => onConfigUpdate("method", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>
      </DynamicFieldWrapper>
    </div>
  )
}

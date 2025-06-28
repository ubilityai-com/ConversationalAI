
"use client"

import { Input } from "../../ui/input"
import { Textarea } from "../../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { DynamicFieldWrapper } from "../../dynamic-field-wrapper"

interface MessageConfigProps {
  data: any
  onLabelUpdate: (label: string) => void
  onConfigUpdate: (key: string, value: any) => void
}

export function MessageConfig({ data, onLabelUpdate, onConfigUpdate }: MessageConfigProps) {
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
        label="Message Type"
        value={data.config.messageType}
        dynamicValue={data.config.messageType_dynamic}
        onValueChange={(value) => onConfigUpdate("messageType", value)}
        onDynamicValueChange={(dynamicValue) => handleDynamicUpdate("messageType", dynamicValue)}
        isDynamic={!!data.config.messageType_dynamic}
      >
        <Select
          value={data.config.messageType || "notification"}
          onValueChange={(value) => onConfigUpdate("messageType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select message type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="notification">Notification</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
            <SelectItem value="slack">Slack Message</SelectItem>
            <SelectItem value="discord">Discord Message</SelectItem>
            <SelectItem value="webhook">Webhook</SelectItem>
          </SelectContent>
        </Select>
      </DynamicFieldWrapper>

      <DynamicFieldWrapper
        label="Recipient"
        value={data.config.recipient}
        dynamicValue={data.config.recipient_dynamic}
        onValueChange={(value) => onConfigUpdate("recipient", value)}
        onDynamicValueChange={(dynamicValue) => handleDynamicUpdate("recipient", dynamicValue)}
        isDynamic={!!data.config.recipient_dynamic}
      >
        <Input
          placeholder="Enter recipient (phone, channel, webhook URL, etc.)"
          value={data.config.recipient || ""}
          onChange={(e) => onConfigUpdate("recipient", e.target.value)}
        />
      </DynamicFieldWrapper>

      <DynamicFieldWrapper
        label="Message Template"
        value={data.config.messageTemplate}
        dynamicValue={data.config.messageTemplate_dynamic}
        onValueChange={(value) => onConfigUpdate("messageTemplate", value)}
        onDynamicValueChange={(dynamicValue) => handleDynamicUpdate("messageTemplate", dynamicValue)}
        isDynamic={!!data.config.messageTemplate_dynamic}
      >
        <Textarea
          placeholder="Enter message template..."
          value={data.config.messageTemplate || ""}
          onChange={(e) => onConfigUpdate("messageTemplate", e.target.value)}
          rows={4}
        />
      </DynamicFieldWrapper>

      <DynamicFieldWrapper
        label="Priority"
        value={data.config.priority}
        dynamicValue={data.config.priority_dynamic}
        onValueChange={(value) => onConfigUpdate("priority", value)}
        onDynamicValueChange={(dynamicValue) => handleDynamicUpdate("priority", dynamicValue)}
        isDynamic={!!data.config.priority_dynamic}
      >
        <Select value={data.config.priority || "normal"} onValueChange={(value) => onConfigUpdate("priority", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </DynamicFieldWrapper>
    </div>
  )
}

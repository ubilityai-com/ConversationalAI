"use client"

import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"

interface AttacheConfigProps {
  data: any
  onLabelUpdate: (label: string) => void
  onConfigUpdate: (key: string, value: any) => void
}

export function AttacheConfig({ data, onLabelUpdate, onConfigUpdate }: AttacheConfigProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="agentName">Agent Name</Label>
        <Input id="agentName" value={data.label} onChange={(e) => onLabelUpdate(e.target.value)} />
      </div>

      <div>
        <Label htmlFor="service">Gmail Service</Label>
        <Select value={data.config.service || "email"} onValueChange={(value) => onConfigUpdate("service", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Gmail service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email Management</SelectItem>
            <SelectItem value="send">Send Email</SelectItem>
            <SelectItem value="receive">Receive Email</SelectItem>
            <SelectItem value="search">Search Emails</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="apiKey">API Key</Label>
        <Input
          id="apiKey"
          type="password"
          placeholder="Enter Gmail API key..."
          value={data.config.apiKey || ""}
          onChange={(e) => onConfigUpdate("apiKey", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="action">Action</Label>
        <Select value={data.config.action || "send"} onValueChange={(value) => onConfigUpdate("action", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="send">Send Email</SelectItem>
            <SelectItem value="receive">Receive Email</SelectItem>
            <SelectItem value="search">Search Emails</SelectItem>
            <SelectItem value="draft">Create Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="timeout">Timeout (seconds)</Label>
        <Input
          id="timeout"
          type="number"
          min="1"
          max="300"
          value={data.config.timeout || 30}
          onChange={(e) => onConfigUpdate("timeout", Number.parseInt(e.target.value))}
        />
      </div>
    </div>
  )
}

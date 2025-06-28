"use client"

import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"

interface DefaultConfigProps {
  data: any
  onLabelUpdate: (label: string) => void
  onDataUpdate: (updates: any) => void
}

export function DefaultConfig({ data, onLabelUpdate, onDataUpdate }: DefaultConfigProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="agentName">Agent Name</Label>
        <Input id="agentName" value={data.label} onChange={(e) => onLabelUpdate(e.target.value)} />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter agent description..."
          value={data.description}
          onChange={(e) => onDataUpdate({ description: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  )
}

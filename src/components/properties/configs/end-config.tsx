"use client"

import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"

interface EndConfigProps {
  data: any
  onLabelUpdate: (label: string) => void
  onConfigUpdate: (key: string, value: any) => void
}

export function EndConfig({ data, onLabelUpdate, onConfigUpdate }: EndConfigProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="agentName">Node Name</Label>
        <Input id="agentName" value={data.label} onChange={(e) => onLabelUpdate(e.target.value)} />
      </div>

      <div>
        <Label htmlFor="endMessage">End Message</Label>
        <Textarea
          id="endMessage"
          placeholder="Enter the message to display when the workflow ends..."
          value={data.config.endMessage || ""}
          onChange={(e) => onConfigUpdate("endMessage", e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="messageTitle">Message Title (Optional)</Label>
        <Input
          id="messageTitle"
          placeholder="e.g., Workflow Complete"
          value={data.config.messageTitle || ""}
          onChange={(e) => onConfigUpdate("messageTitle", e.target.value)}
        />
      </div>

      {/* Preview Card */}
      {(data.config.endMessage || data.config.messageTitle) && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-sm">Preview</CardTitle>
            <CardDescription>How the end message will appear</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              {data.config.messageTitle && (
                <h3 className="font-semibold text-green-800 mb-2">{data.config.messageTitle}</h3>
              )}
              {data.config.endMessage && <p className="text-green-700 text-sm">{data.config.endMessage}</p>}
              {!data.config.endMessage && !data.config.messageTitle && (
                <p className="text-gray-500 text-sm italic">Configure your end message above</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

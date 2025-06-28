"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Switch } from "../../ui/switch"
import { FileJson, Plus, Trash2 } from "lucide-react"

interface JsonField {
  id: string
  name: string
  value: string
  description: string
}

interface OutputParserSectionProps {
  config: any
  onConfigUpdate: (key: string, value: any) => void
}

export function OutputParserSection({ config, onConfigUpdate }: OutputParserSectionProps) {
  const outputParserEnabled = config.outputParserEnabled === true
  const outputParser = config.outputParser || "json"
  const jsonFields = config.jsonFields || []

  // JSON Fields management for LLM output parser
  const addJsonField = () => {
    const currentFields = jsonFields
    const newField: JsonField = {
      id: `field-${Date.now()}`,
      name: "",
      value: "",
      description: "",
    }
    onConfigUpdate("jsonFields", [...currentFields, newField])
  }

  const updateJsonField = (fieldId: string, updates: Partial<JsonField>) => {
    const currentFields = jsonFields
    const updatedFields = currentFields.map((field: JsonField) =>
      field.id === fieldId ? { ...field, ...updates } : field,
    )
    onConfigUpdate("jsonFields", updatedFields)
  }

  const removeJsonField = (fieldId: string) => {
    const currentFields = jsonFields
    const updatedFields = currentFields.filter((field: JsonField) => field.id !== fieldId)
    onConfigUpdate("jsonFields", updatedFields)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center">
            <FileJson className="w-4 h-4 mr-2" />
            Output Parser
          </CardTitle>
          <Switch
            checked={outputParserEnabled}
            onCheckedChange={(checked) => onConfigUpdate("outputParserEnabled", checked)}
            aria-label="Enable output parser"
          />
        </div>
        <CardDescription>Configure how the LLM output should be parsed</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {outputParserEnabled && (
          <>
            <div>
              <Label htmlFor="outputParser">Parser Type</Label>
              <Select value={outputParser} onValueChange={(value) => onConfigUpdate("outputParser", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select parser type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="comma">Comma Separated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {outputParser === "json" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">JSON Structure</Label>
                  <Button variant="outline" size="sm" onClick={addJsonField} className="h-8">
                    <Plus className="w-3 h-3 mr-1" />
                    Add Field
                  </Button>
                </div>

                {jsonFields.length === 0 ? (
                  <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                    <p className="text-sm">No JSON fields defined</p>
                    <p className="text-xs text-gray-400 mt-1">Click "Add Field" to define the JSON structure</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {jsonFields.map((field: JsonField, index: number) => (
                      <Card key={field.id} className="border border-gray-200">
                        <CardContent className="p-3 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-600">Field {index + 1}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeJsonField(field.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor={`name-${field.id}`} className="text-xs">
                                Name
                              </Label>
                              <Input
                                id={`name-${field.id}`}
                                placeholder="Field name"
                                value={field.name}
                                onChange={(e) => updateJsonField(field.id, { name: e.target.value })}
                                className="h-8 text-xs"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`value-${field.id}`} className="text-xs">
                                Value
                              </Label>
                              <Input
                                id={`value-${field.id}`}
                                placeholder="Default value"
                                value={field.value}
                                onChange={(e) => updateJsonField(field.id, { value: e.target.value })}
                                className="h-8 text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor={`description-${field.id}`} className="text-xs">
                              Description
                            </Label>
                            <Textarea
                              id={`description-${field.id}`}
                              placeholder="Field description"
                              value={field.description}
                              onChange={(e) => updateJsonField(field.id, { description: e.target.value })}
                              rows={2}
                              className="text-xs"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {jsonFields.length > 0 && (
                  <div>
                    <Label className="text-xs font-medium text-gray-600">JSON Preview</Label>
                    <Card className="mt-2">
                      <CardContent className="p-3">
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                          {JSON.stringify(
                            jsonFields.reduce((acc: any, field: JsonField) => {
                              if (field.name) {
                                acc[field.name] = field.value || `<${field.name}>`
                              }
                              return acc
                            }, {}),
                            null,
                            2,
                          )}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}

            {outputParser === "comma" && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="commaSeparator">Separator</Label>
                  <Input
                    id="commaSeparator"
                    placeholder="Enter separator (default: comma)"
                    value={config.commaSeparator || ","}
                    onChange={(e) => onConfigUpdate("commaSeparator", e.target.value)}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label htmlFor="commaFields">Expected Fields</Label>
                  <Textarea
                    id="commaFields"
                    placeholder="Enter field names separated by commas (e.g., name, age, email)"
                    value={config.commaFields || ""}
                    onChange={(e) => onConfigUpdate("commaFields", e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { FileJson } from "lucide-react"
import { useEffect, useState } from "react"
import { OutputParsersElements } from "../../../elements/output-parsers-elements"
import { setAutomationArray } from "../../../lib/automation-utils"
import { ApiResItem, objToReturnDynamic } from "../../../lib/utils"
import { AutomationItem } from "../../../types/automation-types"
import AutomationSimple from "../../custom/automation-v2"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Label } from "../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Switch } from "../../ui/switch"

interface JsonField {
  id: string
  name: string
  value: string
  description: string
}

interface OutputParserSectionProps {
  config: any
  onConfigUpdate: (key: string, value: any) => void,
  id: string
}

export function OutputParserSection({ config, onConfigUpdate, id }: OutputParserSectionProps) {
  const outputParserEnabled = config.outputParserEnabled === true
  const outputParser = config.outputParser || "StructuredOutputParser"
  const jsonFields = config.jsonFields || []
  const [json, setJson] = useState<AutomationItem[]>([])
  const [schema, setSchema] = useState<any>()



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
  console.log({ schema, config });
  useEffect(() => {
    if (outputParser) {
      console.log("mountttttttttttttt");
      
      const op = (OutputParsersElements.find(o => o.type === outputParser) as any)
      console.log({ op });
      const automationItems = setAutomationArray((op?.rightSideData?.json))
      setSchema(op)
      setJson(automationItems)
    }
  }, [])

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
            onCheckedChange={(checked) => {
              const op = (OutputParsersElements.find(o => o.type === "StructuredOutputParser") as any)
              console.log({ op });
              const automationItems = setAutomationArray((op?.rightSideData?.json))
              setSchema(op)
              setJson(setAutomationArray((op?.rightSideData?.json)))
              onConfigUpdate("outputParserData", objToReturnDynamic((automationItems) as ApiResItem[]))
              onConfigUpdate("outputParser", "StructuredOutputParser")
              onConfigUpdate("outputParserEnabled", checked)
            }}
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
              <Select value={outputParser} onValueChange={(value) => {
                const op = (OutputParsersElements.find(o => o.type === value) as any)
                setSchema(op)
                const automationItems = setAutomationArray((op?.rightSideData?.json))
                setJson(automationItems)
                onConfigUpdate("outputParser", value)
                onConfigUpdate("outputParserData", objToReturnDynamic((automationItems) as ApiResItem[]))
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select parser type" />
                </SelectTrigger>
                <SelectContent>
                  {OutputParsersElements.map(op => (<SelectItem value={op.type}>{op.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            {schema &&
              <AutomationSimple
                filledDataName="outputParser"
                flowZoneSelectedId={id}
                AllJson={schema?.rightSideData?.json}
                apiRes={json}
                config={config.outputParserData}
                setApiRes={setJson}
              />
            }

          </>
        )}
      </CardContent>
    </Card>
  )
}

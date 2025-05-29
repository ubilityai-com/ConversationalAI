import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { AlertCircle, Brain, Code2, Play, Save } from "lucide-react"
import { Badge } from "../../ui/badge"
import AutomationSimple from "../../custom/automation-v2"
import { Alert, AlertDescription } from "../../ui/alert"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Separator } from "../../ui/separator"


// Mock JSON structure - replace with your actual BasicLLMJson
const BasicLLMJson = {
  rightSideData: {
    json: [
      {
        type: "dropdown",
        variableName: "promptType",
        label: "Prompt Type",
        value: "Prompt",
        required: true,
        list: [
          { value: "Prompt", option: "Prompt" },
          { value: "chatPrompt", option: "Chat Prompt" },
        ],
      },
      {
        type: "textfield",
        variableName: "question",
        label: "Question",
        value: "",
        required: true,
        multiline: true,
        placeholder: "Enter your question here...",
      },
      {
        type: "textfield",
        variableName: "template",
        label: "Template",
        value: "",
        required: true,
        multiline: true,
        placeholder: "Enter your template with variables like {variable_name}...",
      },
    ],
  },
}

// Extract variables from template string
function extractWordsInBracesToObjects(inputString: string): Record<string, string> {
  // Update the regex to ignore ${...} by ensuring the match does not have $ before {
  const regex = /(?<!\$)\{([^}]+)\}/g
  const resultObject: Record<string, string> = {}
  let match

  while ((match = regex.exec(inputString)) !== null) {
    // Extract the word inside the braces
    const word = match[1]
    resultObject[word] = "" // Set the value to an empty string
  }

  return resultObject
}

interface BasicLlmProps {
  flowZoneSelectedElement: {
    id: string
    type: string
    data: {
      rightSideData: {
        json: any[]
        nodesCanConnectWith: string[]
        jsonOutput: any
        outputData: Record<string, string>
      }
      counter: number
    }
  }
}

export default function BasicLlmForm({ flowZoneSelectedElement }: BasicLlmProps) {
  // Mock Redux state - replace with actual Redux selectors
  const validate = true
  const finaleObj = {
    template: "",
    question: "",
    promptType: "Prompt",
    messages: [],
  }
  const isSaveClicked = false
  const authToken = "mock-token"

  const [json, setJson] = useState(flowZoneSelectedElement.data.rightSideData.json)
  const [nodesCanConnectWith] = useState(flowZoneSelectedElement.data.rightSideData.nodesCanConnectWith)
  const [outputData, setOutputData] = useState(flowZoneSelectedElement.data.rightSideData.outputData)
  const [isLoading, setIsLoading] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const jsonOutput = flowZoneSelectedElement.data.rightSideData.jsonOutput
  // Extract variables when template changes
  useEffect(() => {
    if (finaleObj.template) {
      const extractedVariables = extractWordsInBracesToObjects(finaleObj.template || "")
      setOutputData((prev) => {
        const obj: Record<string, string> = {}
        Object.keys(extractedVariables).forEach((elm) => {
          if (prev.hasOwnProperty(elm)) {
            obj[elm] = prev[elm]
          } else {
            obj[elm] = ""
          }
        })
        return obj
      })
      updateData()
    }
  }, [finaleObj.template])

  const updateData = () => {
    const rightSideData = {
      json,
      nodesCanConnectWith,
      jsonOutput: flowZoneSelectedElement.data.rightSideData.jsonOutput,
      outputData,
    }

    // Mock dispatch calls - replace with actual Redux dispatches
    console.log("Updating flow array data:", rightSideData)
    console.log("Updating validation status:", validateData())
  }

  const validateData = () => {
    if (validate) {
      let jsonToSend = {
        query: finaleObj.question,
        prompt: {
          promptType: finaleObj.promptType,
        },
      }

      if (finaleObj.promptType === "Prompt") {
        jsonToSend = {
          ...jsonToSend,
          prompt: {
            ...jsonToSend.prompt,
            // template: finaleObj.template,
            // inputVariables: Object.keys(outputData),
          },
          // promptInputs: outputData,
        }
      } else if (finaleObj.promptType === "chatPrompt") {
        jsonToSend = {
          ...jsonToSend,
          prompt: {
            ...jsonToSend.prompt,
            // template: finaleObj.template,
            // messages: finaleObj.messages,
          },
          query: finaleObj.question,
        }
      }

      const allFlowRunDataForThisNode = {
        [`LANGCHAIN_BASIC_LLM_CONTENT_JSON_${flowZoneSelectedElement.data.counter + 1}`]: jsonToSend,
        [`LANGCHAIN_BASIC_LLM_OUTPUT_${flowZoneSelectedElement.data.counter + 1}`]:
          flowZoneSelectedElement.type + flowZoneSelectedElement.data.counter,
      }

      return { nodeName: "LANGCHAIN_BASIC_LLM", allFlowRunDataForThisNode }
    }
    return null
  }

  const saveRightSide = async () => {
    setIsLoading(true)
    try {
      // Mock save operation
      await new Promise((resolve) => setTimeout(resolve, 1000))
      updateData()
      setLastSaved(new Date())
     
    } catch (error) {
     
    } finally {
      setIsLoading(false)
    }
  }

  const testConfiguration = async () => {
    setIsLoading(true)
    try {
      // Mock test operation
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
    } catch (error) {
     
    } finally {
      setIsLoading(false)
    }
  }

  const handleOutputDataChange = (key: string, value: string) => {
    setOutputData((prev) => ({
      ...prev,
      [key]: value,
    }))
    // Auto-save on change
    saveRightSide()
  }

  const variableCount = Object.keys(outputData).length
  const isValid = validateData() !== null

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Basic LLM Configuration</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              {lastSaved && (
                <Badge variant="outline" className="text-xs">
                  Saved {lastSaved.toLocaleTimeString()}
                </Badge>
              )}
              <Badge variant={isValid ? "default" : "destructive"} className="text-xs">
                {isValid ? "Valid" : "Invalid"}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">LLM Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <AutomationSimple
            AllJson={BasicLLMJson.rightSideData.json}
            apiRes={json}
            setApiRes={setJson}
            flowZoneSelectedElement={flowZoneSelectedElement}
          />
        </CardContent>
      </Card>

      {/* Template Variables */}
      {finaleObj.promptType === "Prompt" && variableCount > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Template Variables</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {variableCount} variable{variableCount !== 1 ? "s" : ""}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                These variables were automatically extracted from your template. Provide values for each variable.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4">
              {Object.keys(outputData).map((key, index) => (
                <div key={index} className="space-y-2">
                  <Label className="text-sm font-medium">
                    {key}
                    <Badge variant="outline" className="ml-2 text-xs">
                      {`{${key}}`}
                    </Badge>
                  </Label>
                  <Input
                    value={outputData[key]}
                    placeholder={`Enter the value for ${key}`}
                    onChange={(e) => handleOutputDataChange(key, e.target.value)}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Output Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Code2 className="h-4 w-4" />
            <CardTitle className="text-base">Output Preview</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4">
            <pre className="text-sm text-muted-foreground overflow-auto">{JSON.stringify(jsonOutput, null, 2)}</pre>
          </div>
        </CardContent>
      </Card>

   
    </div>
  )
}

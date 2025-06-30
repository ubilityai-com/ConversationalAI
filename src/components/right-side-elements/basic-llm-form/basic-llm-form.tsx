import { useNodesData } from "@xyflow/react"
import { AlertCircle, Brain, Code2 } from "lucide-react"
import { useEffect, useState } from "react"
import { BasicLLMJson } from "../../../elements/langchain-elements/BasicLLMJson"
import { useFlowStore } from "../../../store/flow-store"
import { useRightDrawerStore } from "../../../store/right-drawer-store"
import AutomationSimple from "../../custom/automation-v2"
import { Alert, AlertDescription } from "../../ui/alert"
import { Badge } from "../../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"




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
  selectedNode: {
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

export default function BasicLlmForm({ selectedNode }: BasicLlmProps) {
  // Mock Redux state - replace with actual Redux selectors
  const validate = true

  const isSaveClicked = false
  const authToken = "mock-token"
  const reactflowinstance = useFlowStore(state => state.reactFlowInstance)
  const [json, setJson] = useState(selectedNode.data.rightSideData.json)
  const [nodesCanConnectWith] = useState(selectedNode.data.rightSideData.nodesCanConnectWith)
  const [outputData, setOutputData] = useState(selectedNode.data.rightSideData.outputData)
  const [isLoading, setIsLoading] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const isNodeValid = useRightDrawerStore(state => state.automation.validation[selectedNode.id]?.["json"]) || false
  const filledData = useRightDrawerStore(state => state.automation.filledData[selectedNode.id]?.["json"]) || {}
  const states = useRightDrawerStore(state => state)

  const jsonOutput = selectedNode.data.rightSideData.jsonOutput
  const nodeData = useNodesData(selectedNode.id);
  const ss = useNodesData("")
  console.log({ ss, nodeData, json, isNodeValid, filledData,states });


  // Extract variables when template changes
  useEffect(() => {
    if (filledData.template) {
      const extractedVariables = extractWordsInBracesToObjects(filledData.template || "")
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
  }, [filledData.template])

  const updateData = () => {
    const rightSideData = {
      json,
      nodesCanConnectWith,
      jsonOutput: selectedNode.data.rightSideData.jsonOutput,
      outputData,
    }
    reactflowinstance?.updateNodeData(selectedNode.id, rightSideData)
    // Mock dispatch calls - replace with actual Redux dispatches
    console.log("Updating flow array data:", rightSideData, filledData)
    console.log("Updating validation status:", validateData())
  }

  const validateData = () => {
    if (validate) {
      let jsonToSend = {
        query: filledData.question,
        prompt: {
          promptType: filledData.promptType,
        },
      }

      if (filledData.promptType === "Prompt") {
        jsonToSend = {
          ...jsonToSend,
          prompt: {
            ...jsonToSend.prompt,
            // template: filledData.template,
            // inputVariables: Object.keys(outputData),
          },
          // promptInputs: outputData,
        }
      } else if (filledData.promptType === "chatPrompt") {
        jsonToSend = {
          ...jsonToSend,
          prompt: {
            ...jsonToSend.prompt,
            // template: filledData.template,
            // messages: filledData.messages,
          },
          query: filledData.question,
        }
      }

      const allFlowRunDataForThisNode = {
        [`LANGCHAIN_BASIC_LLM_CONTENT_JSON_${selectedNode.data.counter + 1}`]: jsonToSend,
        [`LANGCHAIN_BASIC_LLM_OUTPUT_${selectedNode.data.counter + 1}`]:
          selectedNode.type + selectedNode.data.counter,
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
            filledDataName="json"
            flowZoneSelectedId={selectedNode.id}
            flowZoneSelectedElement={selectedNode}
            AllJson={BasicLLMJson.defaults.json}
            apiRes={json}
            setApiRes={setJson}
            selectedNode={selectedNode}
          />
        </CardContent>
      </Card>

      {/* Template Variables */}
      {filledData.promptType === "Prompt" && variableCount > 0 && (
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

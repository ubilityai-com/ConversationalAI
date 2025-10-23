import { AlertCircle, Code2 } from "lucide-react"
import { useEffect, useImperativeHandle } from "react"
import { Alert, AlertDescription } from "../../../ui/alert"
import { Badge } from "../../../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"




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
  localConfig: Record<string, any>;
  updateNestedConfig: (path: string, value: any) => void;
  validator: any
}
export const validate = (selectedNode: any) => {
  console.log("validate", selectedNode);
  return true
}
export default function BasicLlm({ localConfig, updateNestedConfig, validator }: BasicLlmProps) {
  const filledData = localConfig.json
  const outputData = localConfig.outputData


  useEffect(() => {
    if (filledData.template) {
      const extractedVariables = extractWordsInBracesToObjects(filledData.template || "")
      updateNestedConfig("outputData", (() => {
        const obj: Record<string, string> = {}
        Object.keys(extractedVariables).forEach((elm) => {
          if (outputData.hasOwnProperty(elm)) {
            obj[elm] = outputData[elm]
          } else {
            obj[elm] = ""
          }
        })
        return obj
      })())
    }
  }, [filledData.template])
  useImperativeHandle(validator, () => {
    return (savedConfig: any) => {
      console.log({ savedConfig });
      return Object.keys(savedConfig.outputData).every(key => savedConfig.outputData[key].length !== 0)
    }
  }, []);


  const handleOutputDataChange = (key: string, value: string) => {
    updateNestedConfig("outputData", ({
      ...outputData,
      [key]: value,
    }))

  }
  const variableCount = Object.keys(outputData).length

  return (
    <div className="space-y-6">
      {/* Template Variables */}
      {filledData.promptType === "Prompt" && variableCount > 0 && (
        <>
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
                <pre className="text-sm text-muted-foreground overflow-auto">{JSON.stringify(outputData, null, 2)}</pre>
              </div>
            </CardContent>
          </Card>
        </>
      )}



    </div>
  )
}

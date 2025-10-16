import { useDebounceConfig } from "../../../../../hooks/use-debounced-config"
import { isPlainObject, validateArray } from "../../../../../lib/utils/utils"
import AutomationSimple from "../../../../custom/automation"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../ui/card"
import { Separator } from "../../../../ui/separator"
import ActiveFlows from "./active-flows"
import Variables from "./variables"


interface CustomToolProps {
  selectedNodeId: string
  content: any,
  schema: any[]
  onContentUpdate: (value: any) => void;
  validate: (value: any) => boolean;
  counter: number
  validators: any

}
const checkIfKeysValuesFilled = (inputs: Record<string, any>): boolean => {
  let valid = true
  for (const key in inputs) {
    if (isPlainObject(inputs[key])) {
      valid = checkIfKeysValuesFilled(inputs[key])
    } else {
      if (inputs[key] === "") {
        valid = false
        break
      }
    }
  }
  return valid
}

const CustomTool: React.FC<CustomToolProps> = ({ selectedNodeId, content, onContentUpdate, validate, schema, validators }) => {
  const { localConfig, updateConfig, updateNestedConfig } =
    useDebounceConfig<any>(
      content,
      {
        delay: 200,
        onSave: (savedConfig) => {
          // Save label changes
          console.log({ savedConfig });
          validate(validateData(savedConfig))
          onContentUpdate(savedConfig);
        },
      }
    );

  const inputsDescription = localConfig.inputsDescription
  const webhookActive = localConfig.webhookActive
  const json = localConfig.json

  function validateData(content: any) {
    const inputsDescription = content.inputsDescription
    const valid = validateArray(schema, content.json)
    return valid && inputsDescription !== null && !checkIfKeysValuesFilled(inputsDescription)
  };
  return (
    <div className="space-y-4">
      <AutomationSimple
        filledDataName="json"
        schema={schema}
        flowZoneSelectedId={selectedNodeId}
        onFieldChange={(partialState, replace) => {

          if (replace) updateNestedConfig("json", partialState, { replace });
          else
            updateNestedConfig("json", partialState);
        }}
        fieldValues={json}
        path="json"

      />

      <ActiveFlows
        webhookActive={webhookActive}
        onContentUpdate={updateNestedConfig}
        variableName={"webhookFlow"}
        flowZoneSelectedID={selectedNodeId}
      />

      {inputsDescription && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Inputs</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <Variables variables={inputsDescription} onVariablesUpdate={updateNestedConfig} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default CustomTool

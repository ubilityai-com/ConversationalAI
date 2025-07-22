import { useDebounceConfig } from "../../../../../hooks/use-debounced-config";
import { validateArray } from "../../../../../lib/utils";
import AutomationSimple from "../../../../custom/automation-v4";


interface SerpApiToolProps {
  selectedNodeId: string
  content: any,
  schema: any[]
  onContentUpdate: (value: any) => void;
  counter: number
  validate: (value: any) => void

}



const SerpApiTool: React.FC<SerpApiToolProps> = ({ selectedNodeId, content, onContentUpdate, schema, counter, validate }) => {
  const { localConfig, updateNestedConfig } =
    useDebounceConfig<any>(
      content,
      {
        delay: 300,
        onSave: (savedConfig) => {
          // Save label changes
          onContentUpdate(savedConfig);
          validate(validateArray(schema, savedConfig.json))

        },
      }
    );
  const json = localConfig.json


  return (
    <div className="space-y-4">
      <AutomationSimple
        schema={schema}
        flowZoneSelectedId={selectedNodeId}
        onFieldChange={({ path, value }) => {
          updateNestedConfig(`json.${path}`, value)
        }}
        filledDataName={`SerpApiTool_${counter}`}
        fieldValues={json}
        path="json"

      />
    </div>
  )
}

export default SerpApiTool

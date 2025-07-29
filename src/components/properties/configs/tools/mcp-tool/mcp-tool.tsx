import { useDebounceConfig } from "../../../../../hooks/use-debounced-config";
import { validateArray } from "../../../../../lib/utils";
import { useFlowStore } from "../../../../../store/flow-store";
import AutomationSimple from "../../../../custom/automation-v4";


interface McpToolProps {
    selectedNodeId: string
    content: any,
    schema: any[]
    onContentUpdate: (value: any) => void;
    counter: number,
    validate: (value: any) => void

}



const McpTool: React.FC<McpToolProps> = ({ selectedNodeId, content, onContentUpdate, schema, counter, validate }) => {

    const { localConfig, updateConfig } =
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
                onFieldChange={(partialState, replace) => {

                    if (replace) updateConfig(partialState);
                    else
                        updateConfig({
                            ...localConfig.json,
                            ...partialState,
                        });
                }}
                filledDataName={`McpTool_${counter}`}
                fieldValues={json}
                path="json"

            />
        </div>
    )
}

export default McpTool

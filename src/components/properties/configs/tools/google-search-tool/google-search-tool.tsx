import { useDebounceConfig } from "../../../../../hooks/use-debounced-config";
import { validateArray } from "../../../../../lib/utils";
import AutomationSimple from "../../../../custom/automation-v4";


interface GoogleSearchToolProps {
    selectedNodeId: string
    content: any,
    schema: any[]
    onContentUpdate: (value: any) => void;
    counter: number
    validate: (value: any) => void

}



const GoogleSearchTool: React.FC<GoogleSearchToolProps> = ({ selectedNodeId, content, onContentUpdate, schema, counter, validate }) => {
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
                filledDataName={`GoogleSearchTool_${counter}`}
                fieldValues={json}
                path="json"

            />
        </div>
    )
}

export default GoogleSearchTool

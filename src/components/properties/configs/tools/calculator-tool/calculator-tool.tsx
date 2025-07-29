import { useDebounceConfig } from "../../../../../hooks/use-debounced-config";
import AutomationSimple from "../../../../custom/automation-v4";


interface CalculatorProps {
    selectedNodeId: string
    content: any,
    schema: any[]
    onContentUpdate: (value: any) => void;
    counter: number

}



const CalculatorTool: React.FC<CalculatorProps> = ({ selectedNodeId, content, onContentUpdate, schema, counter }) => {
    const { localConfig, updateConfig } =
        useDebounceConfig<any>(
            content,
            {
                delay: 300,
                onSave: (savedConfig) => {
                    // Save label changes
                    console.log({ savedConfig });
                    onContentUpdate(savedConfig);
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
                            ...localConfig,
                            ...partialState,
                        });
                }}
                filledDataName={`Calculator_${counter}`}
                fieldValues={json}
                path="json"

            />
        </div>
    )
}

export default CalculatorTool

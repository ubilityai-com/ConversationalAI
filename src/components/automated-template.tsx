import { useRef } from "react";
import { useDebounceConfig } from "../hooks/use-debounced-config";
import {
    objToReturnDefaultValues,
    objToReturnValuesToSend,
} from "../lib/automation-utils";
import { validateArray } from "../lib/utils";
import { useFlowStore } from "../store/flow-store";
import { useRightDrawerStore } from "../store/right-drawer-store";
import {
    NodeConfigProps,
} from "../types/automation-types";
import AutomationSimple from "./custom/automation-v4";
import { DynamicElementLoader } from "./properties/shared/DynamicElementLoader";

function isExtrasValid(extras: any, values: Record<string, boolean> = {}) {
    for (const key in extras) {
        const item = extras[key];
        console.log({extras,key,values});
        


        const isRequired = !item.optional;

        if (!isRequired && !item.enabled) continue;

        if (item.multiple) {
            const list = item.list || [];
            if (isRequired && list.length === 0)
                return false
            for (const subItem of list) {
                const id = subItem.id;
                if (!values[id]) {
                    return false;
                }
            }
        } else {
            if (!values[key]) {
                return false;
            }
        }
    }

    return true;
}

export default function TemplateForm({
    schema,
    content,
    onContentUpdate,
    validate,
    selectedNodeId,
    ai,
    CustomComponent,
    contentPath
}: NodeConfigProps) {
    console.log({ schema });
    const setNodeFilledDataByKey = useRightDrawerStore(
        (state) => state.setNodeFilledDataByKey
    );
    const parentRef = useRef<{ [key: string]: any }>({})

    const { localConfig, updateNestedConfig } = useDebounceConfig<
        typeof content
    >(
        {
            ...content,
            json: objToReturnDefaultValues(schema, content.json),
        },
        {
            delay: 300,
            onSave: (savedConfig) => {
                setNodeFilledDataByKey(selectedNodeId, "json", savedConfig.json);
                let extrasValid = true;
                if (ai) {
                    const subNodesValidation = useFlowStore.getState().subNodesValidation;
                    const subs = subNodesValidation[selectedNodeId]?.subs;
                    extrasValid = isExtrasValid(savedConfig.extras, subs);
                }
                const nodeValid = validateArray(schema, savedConfig.json);
                let customValid = true
                if (CustomComponent) {
                    customValid = parentRef.current.custom(savedConfig)
                }
                console.log({ nodeValid, extrasValid, customValid });

                validate(nodeValid && extrasValid && customValid);
                onContentUpdate({
                    ...savedConfig,
                    json: objToReturnValuesToSend(schema, savedConfig.json),
                });
            },
        }
    );
    const extras = localConfig.extras || {};
    console.log({ localConfig, parentRef });
    const onValidate = () => { };
    return (
        <div className="space-y-6">
            <AutomationSimple
                filledDataName={contentPath ? `${contentPath}.json` : "json"}
                schema={schema}
                fieldValues={localConfig.json}
                flowZoneSelectedId={selectedNodeId}
                onFieldChange={(partialState, replace) => {
                    if (replace) updateNestedConfig(`${"json"}`, partialState);
                    else
                        updateNestedConfig(`${"json"}`, {
                            ...localConfig.json,
                            ...partialState,
                        });
                }}
            />

            {CustomComponent && (
                <CustomComponent
                    validator={(validator: any) => (parentRef.current["custom"] = validator)}
                    localConfig={localConfig}
                    updateNestedConfig={updateNestedConfig}
                    onValidate={onValidate}
                />
            )}
            {ai &&
                Object.keys(extras).map((key) => (
                    <DynamicElementLoader
                        validators={(validators: any) => (parentRef.current["validators"] = validators)}
                        key={key}
                        extrasKey={key}
                        extrasConfig={extras[key]}
                        localConfig={localConfig.extras[key]}
                        selectedNodeId={selectedNodeId}
                        updateNestedConfig={updateNestedConfig}
                    />
                ))}
        </div>
    );
}

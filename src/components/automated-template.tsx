import { useRef } from "react";
import { useDebounceConfig } from "../hooks/use-debounced-config";
import {
    objToReturnDefaultValues,
    objToReturnValuesToSend,
} from "../lib/automation-utils";
import { validateArray } from "../lib/utils";
import { useRightDrawerStore } from "../store/right-drawer-store";
import {
    NodeConfigProps,
} from "../types/automation-types";
import AutomationSimple from "./custom/automation-v4";
import { DynamicElementLoader } from "./properties/shared/DynamicElementLoader";
function areAllValid(items: { valid: boolean }[]): boolean {
    for (let i = 0; i < items.length; i++) {
        if (!items[i].valid) {
            return false; // stop immediately on first invalid
        }
    }
    return true;
}
export function isExtrasValid(extras: any) {
    for (const key in extras) {
        const item = extras[key];

        console.log({ extras, key });

        const isRequired = !item.optional;

        if (!isRequired && !item.enabled) continue;

        if (item.multiple) {
            const list = item.list || [];
            if (isRequired && list.length === 0)
                return false
            return areAllValid(list)
        } else {
            if (!item.valid) {
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
                let extrasValid = true;
                if (ai) {
                    extrasValid = isExtrasValid(savedConfig.extras);
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
                }, nodeValid && extrasValid && customValid);
            },
        }
    );
    const extras = localConfig.extras || {};
    const onValidate = () => { };
    return (
        <div className="space-y-6">
            <AutomationSimple
                filledDataName={contentPath ? `${contentPath}.json` : "json"}
                schema={schema}
                fieldValues={localConfig.json}
                flowZoneSelectedId={selectedNodeId}
                onFieldChange={(partialState, replace) => {
                    if (replace) updateNestedConfig(`${"json"}`, partialState, { replace });
                    else
                        updateNestedConfig(`${"json"}`, partialState,);
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

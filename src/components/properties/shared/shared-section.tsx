import { useRef, useState } from "react"
import { useDebounceConfig } from "../../../hooks/use-debounced-config"
import { objToReturnDynamicv2 } from "../../../lib/automation-utils"
import { validateArray } from "../../../lib/utils"
import { useFlowStore } from "../../../store/flow-store"
import { useRightDrawerStore } from "../../../store/right-drawer-store"
import AutomationSimple from "../../custom/automation-v4"
import { SearchableSelect } from "../../custom/searchable-select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Label } from "../../ui/label"
import { Switch } from "../../ui/switch"
interface SectionProps {
    config: any
    onConfigUpdate: (key: string, value: any, options?: { replace?: boolean }) => void
    id: string
    defaultType: string
    title: string
    variableName: string
    description: string
    elements: any[]
    validators: any
}
function getSchema(type: string, elements: any[]) {
    return elements.find((o) => o.type === type) as any
}
export function SharedSection({
    config,
    defaultType,
    onConfigUpdate,
    id,
    title,
    description,
    variableName,
    elements,
    validators
}: SectionProps) {
    const { localConfig, updateNestedConfig } =
        useDebounceConfig<any>(
            config.content,
            {
                delay: 300,
                onSave: (savedConfig) => {
                    // Save label changes   
                    onConfigUpdate(`extras.${variableName}`, { content: savedConfig, valid: validateArray(schema.current.rightSideData.json, savedConfig.json) });
                    console.log({ id, variableName, schema, savedConfig, valid: validateArray(schema.current.rightSideData.json, savedConfig.json) });
                },
            }
        );
    const enabled = config.enabled === true
    const type = config.type
    const optional = config.optional || false
    const content = localConfig || {}
    const json = content.json
    const schema = useRef(getSchema(type, elements));

    const [open, setOpen] = useState(!optional || enabled)

    const renderHeader = () => (
        <CardHeader className="pb-3 cursor-default">
            <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center">
                    {title}
                </CardTitle>
                {optional && (
                    <Switch
                        checked={enabled}
                        onCheckedChange={(checked) => {
                            onConfigUpdate(`extras.${variableName}.enabled`, checked);
                            if (checked) setOpen(true);
                            else setOpen(false);
                        }}
                        aria-label="Enable section"
                    />
                )}
            </div>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
    );

    return (
        <Card>
            <Accordion
                type="single"
                collapsible
                value={open ? "configuration" : ""}
                onValueChange={(val) => setOpen(val === "configuration")}
                className="w-full"
            >
                <AccordionItem value="configuration">
                    {optional ? (
                        renderHeader()
                    ) : (
                        <AccordionTrigger className="text-sm">
                            {renderHeader()}
                        </AccordionTrigger>
                    )}

                    <AccordionContent className="space-y-4">
                        <div className="space-y-2">

                            <Label htmlFor={variableName} className="text-sm font-medium">{title} Type</Label>
                            <SearchableSelect
                                name="type"
                                placeholder="Select a type"
                                value={type}
                                onChange={(value) => {
                                    const op = elements.find((o) => o.type === value) as any;
                                    const defaultValues = objToReturnDynamicv2(op.rightSideData.json);
                                    schema.current = op;
                                    onConfigUpdate(`extras.${variableName}.type`, value);
                                    console.log({ defaultValues });
                                    setTimeout(() => updateNestedConfig("json", defaultValues, { replace: true }), 1000);
                                }}
                                options={elements.map((el) => ({
                                    label: el.label,
                                    value: el.type,
                                }))}
                            />
                        </div>

                        {schema.current && (
                            <AutomationSimple
                                filledDataName={`extras.${variableName}.content.json`}
                                schema={schema.current?.rightSideData?.json}
                                flowZoneSelectedId={id}
                                AllJson={schema.current?.rightSideData?.json}
                                fieldValues={json}
                                firstCall={true}
                                onFieldChange={(partialState, replace) => {
                                    if (replace) updateNestedConfig("json", partialState, { replace });
                                    else updateNestedConfig("json", partialState);
                                }}
                            />
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    );
}

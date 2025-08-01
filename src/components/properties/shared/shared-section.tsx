import { FileJson } from "lucide-react"
import { useRef, useState } from "react"
import { useDebounceConfig } from "../../../hooks/use-debounced-config"
import { objToReturnDynamicv2 } from "../../../lib/automation-utils"
import { validateArray } from "../../../lib/utils"
import { useFlowStore } from "../../../store/flow-store"
import { useRightDrawerStore } from "../../../store/right-drawer-store"
import AutomationSimple from "../../custom/automation-v4"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Label } from "../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Switch } from "../../ui/switch"
import { SearchableSelect } from "../../custom/searchable-select"
interface SectionProps {
    config: any
    onConfigUpdate: (key: string, value: any) => void
    id: string
    defaultType: string
    title: string
    variableName: string
    description: string
    elements: any[]
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
}: SectionProps) {
    const setNodeFilledDataByKey = useRightDrawerStore((state) => state.setNodeFilledDataByKey)
    const setValidationByKey = useRightDrawerStore((state) => state.setValidationByKey)
    const { localConfig, updateConfig, } =
        useDebounceConfig<any>(
            config.content,
            {
                delay: 300,
                onSave: (savedConfig) => {
                    // Save label changes   
                    onConfigUpdate(`extras.${variableName}.content`, savedConfig);
                    updateSubNodeValidationById(id, variableName, validateArray(schema.current.rightSideData.json, savedConfig))
                    setNodeFilledDataByKey(id, variableName, savedConfig)
                },
            }
        );
    const enabled = config.enabled === true
    const type = config.type
    const optional = config.optional || false
    const content = localConfig || {}
    const add = useFlowStore((s) => s.addSubNodeValidation)
    const updateSubNodeValidationById = useFlowStore((s) => s.updateSubNodeValidationById)
    const del = useFlowStore((s) => s.deleteSubNodeById)
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
                        <div>
                            <Label htmlFor={variableName}>{title} Type</Label>
                            <SearchableSelect
                                name="type"
                                placeholder="Select a type"
                                value={type}
                                onChange={(value) => {
                                    const op = elements.find((o) => o.type === value) as any;
                                    const defaultValues = objToReturnDynamicv2(op.rightSideData.json);
                                    schema.current = op;
                                    onConfigUpdate(`extras.${variableName}.type`, value);
                                    setTimeout(() => updateConfig(defaultValues), 1000);
                                    add(id, variableName, validateArray(op.rightSideData.json, {}));
                                }}
                                options={elements.map((el) => ({
                                    label: el.label,
                                    value: el.type,
                                }))}
                            />
                        </div>

                        {schema.current && (
                            <AutomationSimple
                                filledDataName={`${variableName}`}
                                schema={schema.current?.rightSideData?.json}
                                flowZoneSelectedId={id}
                                AllJson={schema.current?.rightSideData?.json}
                                fieldValues={content}
                                firstCall={true}
                                onFieldChange={(partialState, replace) => {
                                    if (replace) updateConfig(partialState);
                                    else updateConfig({ ...content, ...partialState });
                                }}
                            />
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    );
}

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

    const { localConfig,updateConfig, updateNestedConfig } =
        useDebounceConfig<any>(
            config.content,
            {
                delay: 300,
                onSave: (savedConfig) => {
                    // Save label changes   
                    console.log({schema,savedConfig});
                    
                    console.log({ savedConfig, validateArray: validateArray(schema.current.rightSideData.json, savedConfig) });
                    onConfigUpdate(`extras.${variableName}.content`, savedConfig);
                    updateSubNodeValidationById(id, variableName, validateArray(schema.current.rightSideData.json, savedConfig))
                    setNodeFilledDataByKey(id, "model", savedConfig)



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
    console.log({ defaultType, type, localConfig, content });
    const schema = useRef(getSchema(type, elements));


    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center">
                        <FileJson className="w-4 h-4 mr-2" />
                        {title}
                    </CardTitle>
                    {optional && (
                        <Switch
                            checked={enabled}
                            onCheckedChange={(checked) => {
                                onConfigUpdate(`extras.${variableName}.enabled`, checked)
                            }}
                            aria-label="Enable output parser"
                        />
                    )}
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            {(!optional || optional && enabled) && (
                <CardContent className="pt-0">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="configuration">
                            <AccordionTrigger className="text-sm">Configuration</AccordionTrigger>
                            <AccordionContent className="space-y-4">
                                <div>
                                    <Label htmlFor={variableName}>{title} Type</Label>
                                    <Select
                                        value={type}
                                        onValueChange={(value) => {
                                            const op = elements.find((o) => o.type === value) as any
                                            const defaultValues = objToReturnDynamicv2((op.rightSideData.json))
                                            console.log({ defaultValues });

                                            schema.current=op
                                            onConfigUpdate(`extras.${variableName}.type`, value)
                                            setTimeout(() => {
                                                updateConfig(defaultValues)
                                            }, 1000);
                                            add(id, variableName, validateArray(op.rightSideData.json, {}))
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={"Select a type"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {elements.map((op) => (
                                                <SelectItem key={op.type} value={op.type}>
                                                    {op.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {schema.current && (
                                    <AutomationSimple
                                        filledDataName={`${variableName}`}
                                        schema={schema.current?.rightSideData?.json}
                                        flowZoneSelectedId={id}
                                        AllJson={schema.current?.rightSideData?.json}
                                        fieldValues={content}
                                        firstCall={true}
                                        onFieldChange={({ path, value }) => {
                                            console.log({ path, value });
                                            console.log({ path, value, content });

                                            updateNestedConfig(`${path}`, value)
                                        }}
                                    />
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            )}
        </Card>
    )
}

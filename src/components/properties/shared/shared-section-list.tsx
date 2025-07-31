import { FileJson, PenToolIcon, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { v4 } from "uuid"
import { keyBy, validateArray } from "../../../lib/utils"
import { useFlowStore } from "../../../store/flow-store"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"
import { Button } from "../../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Label } from "../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Switch } from "../../ui/switch"
import { SharedListItemSection } from "./shared-section-list-tem"
import { objToReturnDynamicv2 } from "../../../lib/automation-utils"
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

export function SharedListSection({
    config,
    onConfigUpdate,
    id,
    title,
    description,
    variableName,
    elements,
}: SectionProps) {
    console.log({ config })
    const enabled = config.enabled === true
    const optional = config.optional === true
    const list = config.list || []
    const [schemas] = useState<any>(keyBy(elements, "type"))
    const add = useFlowStore((s) => s.addSubNodeValidation)
    const del = useFlowStore((s) => s.deleteSubNodeById)
    const updateSubNodeValidationById = useFlowStore((s) => s.updateSubNodeValidationById)

    // For non-optional sections, always show content
    const shouldShowContent = optional ? enabled : true

    const addTool = () => {
        const currentTools = list

        const newToolId = v4()
        add(id, newToolId, false)
        onConfigUpdate(`extras.${variableName}.list`, [
            ...currentTools,
            { content: {}, type: "", id: newToolId },
        ])
    }

    const removeTool = (toolId: string) => {

        const currentTools = list;
        const updatedTools = currentTools.filter(
            (tool: any, index: number) => tool.id !== toolId
        );
        onConfigUpdate(`extras.${variableName}.list`, updatedTools);
        del(id, toolId)
    }

    const renderContent = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Available Tools</Label>
                <Button variant="outline" size="sm" onClick={addTool} className="h-8 bg-transparent">
                    <Plus className="w-3 h-3 mr-1" />
                    Add Tool
                </Button>
            </div>
            {list.length === 0 ? (
                <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                    <PenToolIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No list configured</p>
                    <p className="text-xs text-gray-400 mt-1">Click "Add Tool" to give the LLM agent capabilities</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {list.map((tool: any, toolIndex: number) => (
                        <Card key={tool.id} className="border border-gray-200">
                            <CardContent className="p-3 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <PenToolIcon className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeTool(tool.id)}
                                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor={`tool-type-${tool.id}`} className="text-xs">
                                        Tool Type
                                    </Label>
                                    <SearchableSelect
                                        name="type"
                                        placeholder="Select a type"
                                        value={tool.type}
                                        onChange={(value) => {
                                            const currentTools = list
                                            const selectedOption = elements.find((opt) => opt.type === value)
                                            const defaultValues = objToReturnDynamicv2((selectedOption.rightSideData.json))

                                            const updatedTools = currentTools.map((tool: any, index: number) =>
                                                toolIndex === index
                                                    ? {
                                                        id: tool.id,
                                                        type: value,
                                                        content: { json: defaultValues },
                                                    }
                                                    : tool,
                                            )
                                            console.log({ updatedTools })
                                            onConfigUpdate(`extras.${variableName}.list`, updatedTools)
                                            updateSubNodeValidationById(id, tool.id, selectedOption.defaultValid)

                                        }}
                                        options={elements.map((el) => ({
                                            label: el.label,
                                            value: el.type
                                        }))}
                                    />
                                    {/* <Select
                                        value={tool.type}
                                        onValueChange={(value) => {
                                            console.log({ value })
                                            const currentTools = list
                                            const selectedOption = elements.find((opt) => opt.type === value)
                                            const defaultValues = objToReturnDynamicv2((selectedOption.rightSideData.json))

                                            const updatedTools = currentTools.map((tool: any, index: number) =>
                                                toolIndex === index
                                                    ? {
                                                        id: tool.id,
                                                        type: value,
                                                        content: { json: defaultValues },
                                                    }
                                                    : tool,
                                            )
                                            console.log({ updatedTools })
                                            onConfigUpdate(`extras.${variableName}.list`, updatedTools)
                                            updateSubNodeValidationById(id, tool.id, selectedOption.defaultValid)

                                        }}
                                    >
                                        <SelectTrigger id={`tool-type-${tool.id}`} className="h-8 text-xs">
                                            <SelectValue placeholder="Select tool type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {elements.map((op) => (
                                                <SelectItem key={op.type} value={op.type}>
                                                    {op.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select> */}
                                </div>
                                {schemas && tool.type && (
                                    <SharedListItemSection
                                        key={toolIndex}
                                        content={tool.content}
                                        parentId={id}
                                        id={tool.id}
                                        onConfigUpdate={onConfigUpdate}
                                        path={`extras.${variableName}.list.${toolIndex}.content`}
                                        schema={schemas[tool.type].rightSideData.json}
                                        type={tool.type}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            {list.length > 0 && (
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <p>
                        <span className="font-medium">Note:</span> Tools give the LLM agent the ability to perform actions or
                        retrieve information. Each tool should have a clear purpose and description.
                    </p>
                </div>
            )}
        </div>
    )

    return (
        <Card>


            {
                // shouldShowContent &&
                (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="configuration">
                            <AccordionTrigger className="text-sm">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-sm flex items-center">
                                            <FileJson className="w-4 h-4 mr-2" />
                                            {title}
                                        </CardTitle>
                                        {/* {optional && (
                                            <Switch
                                                checked={enabled}
                                                onCheckedChange={(checked) => {
                                                    onConfigUpdate(`extras.${variableName}.type`, "")
                                                    onConfigUpdate(`extras.${variableName}.enabled`, checked)
                                                }}
                                                aria-label="Enable output parser"
                                            />
                                        )} */}
                                    </div>
                                    <CardDescription>{description}</CardDescription>
                                </CardHeader>
                            </AccordionTrigger>
                            <AccordionContent>{renderContent()}</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}
        </Card>
    )
}

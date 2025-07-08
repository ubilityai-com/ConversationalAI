import { FileJson, PenToolIcon, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { objToReturnDynamicv2 } from "../../../lib/automation-utils";
import { ApiResItem, keyBy } from "../../../lib/utils";
import { Button } from "../../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../ui/card";
import { Label } from "../../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { Switch } from "../../ui/switch";
import { SharedListItemSection } from "./shared-section-list-tem";

interface SectionProps {
    config: any;
    onConfigUpdate: (key: string, value: any) => void;
    id: string;
    defaultType: string;
    title: string
    variableName: string
    description: string
    elements: any[]
}

export function SharedListSection({
    config,
    defaultType,
    onConfigUpdate,
    id,
    title,
    description,
    variableName,
    elements
}: SectionProps) {
    console.log({ config });

    const enabled = config.enabled === true;
    const type = config.type || defaultType;
    const list = config.list || [];
    const [schemas, setSchemas] = useState<any>();
    const addTool = () => {
        const currentTools = list;
        const newTool = elements.find((o) => o.type === defaultType) as any;
        const newToolDefaultInputs = objToReturnDynamicv2(newTool?.rightSideData?.json as ApiResItem[]);
        console.log({ ss: { ...newTool.rightSideData, json: newToolDefaultInputs } });

        onConfigUpdate(`extras.${variableName}.list`, [
            ...currentTools,
            { content: { ...newTool.rightSideData, json: newToolDefaultInputs }, type: "CustomTool" },
        ]);
    };

    const removeTool = (indexToRemove: number) => {
        const currentTools = list;
        const updatedTools = currentTools.filter(
            (tool: any, index: number) => index !== indexToRemove
        );
        onConfigUpdate(`extras.${variableName}.list`, updatedTools);
    };

    useEffect(() => {
        setSchemas(keyBy(elements, "type"))
    }, [])

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center">
                        <FileJson className="w-4 h-4 mr-2" />
                        {title}
                    </CardTitle>
                    <Switch
                        checked={enabled}
                        onCheckedChange={(checked) => {
                            const op = elements.find(
                                (o) => o.type === defaultType
                            ) as any;
                            onConfigUpdate(`extras.${variableName}.type`, defaultType);
                            onConfigUpdate(`extras.${variableName}.enabled`, checked);
                        }}
                        aria-label="Enable output parser"
                    />
                </div>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">

                {enabled && (
                    <>
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Available Tools</Label>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={addTool}
                                className="h-8"
                            >
                                <Plus className="w-3 h-3 mr-1" />
                                Add Tool
                            </Button>
                        </div>
                        {list.length === 0 ? (
                            <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                                <PenToolIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                <p className="text-sm">No list configured</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Click "Add Tool" to give the LLM agent capabilities
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {list.map((tool: any, toolIndex: number) => (
                                    <Card key={toolIndex} className="border border-gray-200">
                                        <CardContent className="p-3 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <PenToolIcon className="w-4 h-4 text-gray-500" />

                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeTool(toolIndex)}
                                                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div>
                                                <Label
                                                    htmlFor={`tool-type-${tool.id}`}
                                                    className="text-xs"
                                                >
                                                    Tool Type
                                                </Label>
                                                <Select
                                                    value={tool.type}
                                                    onValueChange={(value) => {
                                                        console.log({ value });

                                                        const currentTools = list;
                                                        const updatedTools = currentTools.map(
                                                            (tool: any, index: number) =>
                                                                toolIndex === index
                                                                    ? {
                                                                        type: value,
                                                                        content: {},
                                                                    }
                                                                    : tool
                                                        );
                                                        console.log({ updatedTools });

                                                        onConfigUpdate(`extras.${variableName}.list`, updatedTools);
                                                    }}
                                                >
                                                    <SelectTrigger
                                                        id={`tool-type-${tool.id}`}
                                                        className="h-8 text-xs"
                                                    >
                                                        <SelectValue placeholder="Select tool type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {elements.map((op) => (
                                                            <SelectItem value={op.type}>
                                                                {op.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            {schemas && <SharedListItemSection
                                                key={toolIndex}
                                                content={tool.content}
                                                id={id}
                                                onConfigUpdate={onConfigUpdate}
                                                path={`extras.${variableName}.list.${toolIndex}.content`}
                                                schema={schemas[tool.type].rightSideData.json}
                                                type={tool.type}
                                                counter={toolIndex}
                                            />}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {enabled && list.length > 0 && (
                    <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                        <p>
                            <span className="font-medium">Note:</span> Tools give the LLM
                            agent the ability to perform actions or retrieve information. Each
                            tool should have a clear purpose and description.
                        </p>
                    </div>
                )}

            </CardContent>
        </Card>
    );
}

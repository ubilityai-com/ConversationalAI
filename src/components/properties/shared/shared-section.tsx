import { FileJson } from "lucide-react";
import { useState } from "react";
import { objToReturnDynamicv2 } from "../../../lib/automation-utils";
import { validateArray } from "../../../lib/utils";
import { useFlowStore } from "../../../store/flow-store";
import AutomationSimple from "../../custom/automation-v4";
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
import { defaultStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
function getSchema(type: string, elements: any[]) {
    return elements.find(
        (o) => o.type === type
    ) as any
}
export function SharedSection({
    config,
    defaultType,
    onConfigUpdate,
    id,
    title,
    description,
    variableName,
    elements
}: SectionProps) {

    const enabled = config.enabled === true;
    const type = config.type || defaultType;
    const content = config.content || [];
    const [schema, setSchema] = useState<any>(getSchema(type, elements));
    const add = useFlowStore((s) => s.addSubNodeValidation);
    const del = useFlowStore((s) => s.deleteSubNodeById);

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
                            const enabledOption = elements.find(
                                (o) => o.type === defaultType
                            ) as any;
                            if (!checked) del(id, variableName)
                            else add(id, variableName, enabledOption.defaultValid)
                            setSchema(enabledOption);
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
                        <div>
                            <Label htmlFor={variableName}>{title} Type</Label>
                            <Select
                                value={type}
                                onValueChange={(value) => {
                                    const op = elements.find(
                                        (o) => o.type === value
                                    ) as any;
                                    const defaultValues = objToReturnDynamicv2((op.rightSideData.json))
                                    console.log({defaultValues});
                                    
                                    setSchema(op);
                                    onConfigUpdate(`extras.${variableName}.type`, value);
                                    onConfigUpdate(`extras.${variableName}.content`, defaultValues);

                                    add(id, variableName, validateArray(op.rightSideData.json, {}))

                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={"Select a type"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {elements.map((op) => (
                                        <SelectItem value={op.type}>{op.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {schema && (
                            <AutomationSimple
                                filledDataName={`${variableName}`}
                                schema={schema?.rightSideData?.json}
                                setSchema={setSchema}
                                flowZoneSelectedId={id}
                                AllJson={schema?.rightSideData?.json}
                                fieldValues={content}
                                onFieldChange={({ path, value }) => {
                                    onConfigUpdate(`extras.${variableName}.content.${path}`, value)

                                }}
                            />
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}

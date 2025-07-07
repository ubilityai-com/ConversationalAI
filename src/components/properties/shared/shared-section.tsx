import { FileJson } from "lucide-react";
import { useEffect, useState } from "react";
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
    console.log({ config });

    const enabled = config.enabled === true;
    const type = config.type || defaultType;
    const content = config.content || [];
    const [schema, setSchema] = useState<any>();

    console.log({ schema, config, content, elements, type });
    useEffect(() => {
        if (type) {
            const op = elements.find(
                (o) => o.type === defaultType
            ) as any;
            setSchema(op);
        }
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
                            setSchema(op);
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
                                    setSchema(op);
                                    onConfigUpdate(`extras.${variableName}.type`, value);
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
                                filledDataName={`extras.${variableName}.content`}
                                schema={schema?.rightSideData?.json}
                                setSchema={setSchema}
                                flowZoneSelectedId={id}
                                AllJson={schema?.rightSideData?.json}
                                fieldValues={content}
                                onFieldChange={({ path, value }) => {
                                    console.log({ path, value });
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

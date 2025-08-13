"use client";

import { FileJson } from "lucide-react";
import { useEffect, useState } from "react";
import { setAutomationArray } from "../../../lib/automation-utils";
import { AutomationItem } from "../../../types/automation-types";
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
import OutputParserElements from "../../../elements/output-parser-elements";

interface JsonField {
  id: string;
  name: string;
  value: string;
  description: string;
}

interface OutputParserSectionProps {
  config: any;
  onConfigUpdate: (key: string, value: any) => void;
  id: string;
}

export function OutputParserSection({
  config,
  onConfigUpdate,
  id,
}: OutputParserSectionProps) {
  console.log({ config });

  const outputParserEnabled = config.enabled === true;
  const outputParser = config.type || "StructuredOutputParser";
  const outputParserData = config.content || [];
  const [json, setJson] = useState<AutomationItem[]>([]);
  const [schema, setSchema] = useState<any>();

  console.log({ schema, config, outputParserData, json });
  useEffect(() => {
    if (outputParser) {
      const op = OutputParserElements.find(
        (o) => o.type === "StructuredOutputParser"
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
            Output Parser
          </CardTitle>
          <Switch
            checked={outputParserEnabled}
            onCheckedChange={(checked) => {
              const op = OutputParserElements.find(
                (o) => o.type === "StructuredOutputParser"
              ) as any;
              setSchema(op);
              setJson(setAutomationArray(op?.rightSideData?.json));
              onConfigUpdate("extras.outputParser.type", "StructuredOutputParser");
              onConfigUpdate("extras.outputParser.enabled", checked);
            }}
            aria-label="Enable output parser"
          />
        </div>
        <CardDescription>
          Configure how the LLM output should be parsed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {outputParserEnabled && (
          <>
            <div>
              <Label htmlFor="outputParser">Parser Type</Label>
              <Select
                value={outputParser}
                onValueChange={(value) => {
                  const op = OutputParserElements.find(
                    (o) => o.type === value
                  ) as any;
                  setSchema(op);
                  const automationItems = setAutomationArray(
                    op?.rightSideData?.json
                  );
                  setJson(automationItems);
                  onConfigUpdate("extras.outputParser.type", value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select parser type" />
                </SelectTrigger>
                <SelectContent>
                  {OutputParserElements.map((op) => (
                    <SelectItem value={op.type}>{op.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {schema && (
              <AutomationSimple
                filledDataName="extras.outputParser.content"
                schema={schema?.rightSideData?.json}
                setSchema={setSchema}
                flowZoneSelectedId={id}
                AllJson={schema?.rightSideData?.json}
                fieldValues={outputParserData}
                onFieldChange={({ path, value }) => {
                  console.log({ path, value });
                  onConfigUpdate(`extras.outputParser.content.${path}`, value)

                }}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

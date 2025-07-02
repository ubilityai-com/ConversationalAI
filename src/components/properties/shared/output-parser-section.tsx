"use client";

import { FileJson } from "lucide-react";
import { useEffect, useState } from "react";
import { OutputParsersElements } from "../../../elements/output-parsers-elements";
import { setAutomationArray } from "../../../lib/automation-utils";
import { ApiResItem, objToReturnDynamic } from "../../../lib/utils";
import { AutomationItem } from "../../../types/automation-types";
import AutomationSimple from "../../custom/automation-v2";
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
  const outputParserEnabled = config.outputParserEnabled === true;
  const outputParser = config.outputParser || "StructuredOutputParser";
  const outputParserData = config.outputParserData || [];
  const [json, setJson] = useState<AutomationItem[]>([]);
  const [schema, setSchema] = useState<any>();

  console.log({ schema, config });
  useEffect(() => {
    if (outputParser) {
      console.log("mountttttttttttttt");

      const op = OutputParsersElements.find(
        (o) => o.type === outputParser
      ) as any;
      console.log({ op, config });
      setSchema(op);
    }
  }, []);

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
              const op = OutputParsersElements.find(
                (o) => o.type === "StructuredOutputParser"
              ) as any;
              console.log({ op });
              const automationItems = setAutomationArray(
                op?.rightSideData?.json
              );
              setSchema(op);
              setJson(setAutomationArray(op?.rightSideData?.json));
              onConfigUpdate("outputParserData", automationItems);
              onConfigUpdate("outputParser", "StructuredOutputParser");
              onConfigUpdate("outputParserEnabled", checked);
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
                  const op = OutputParsersElements.find(
                    (o) => o.type === value
                  ) as any;
                  setSchema(op);
                  const automationItems = setAutomationArray(
                    op?.rightSideData?.json
                  );
                  setJson(automationItems);
                  onConfigUpdate("outputParser", value);
                  onConfigUpdate("outputParserData", automationItems);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select parser type" />
                </SelectTrigger>
                <SelectContent>
                  {OutputParsersElements.map((op) => (
                    <SelectItem value={op.type}>{op.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {schema && (
              <AutomationSimple
                filledDataName="outputParserData"
                flowZoneSelectedId={id}
                AllJson={schema?.rightSideData?.json}
                apiRes={outputParserData}
                onUpdate={onConfigUpdate}
                config={config.outputParserData}
                setApiRes={setJson}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

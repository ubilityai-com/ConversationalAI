"use client";

import { Plus, PenToolIcon as ToolIcon, Trash2, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { ToolsElements } from "../../../elements/tools-elements";
import { setAutomationArray } from "../../../lib/automation-utils";
import { AutomationItem } from "../../../types/automation-types";
import AutomationSimple from "../../custom/automation-v2";
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
import { MemorySection } from "./memory-section";
import { OutputParserSection } from "./output-parser-section";

interface Tool {
  id: string;
  type: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface ToolsSectionProps {
  config: any;
  onConfigUpdate: (key: string, value: any) => void;
  id: string;
}

// Available tool types
const availableTools = [
  { value: "web-search", label: "Web Search" },
  { value: "calculator", label: "Calculator" },
  { value: "code-interpreter", label: "Code Interpreter" },
  { value: "database", label: "Database Query" },
  { value: "file-reader", label: "File Reader" },
  { value: "image-generator", label: "Image Generator" },
  { value: "api-call", label: "API Call" },
  { value: "knowledge-base", label: "Knowledge Base" },
];

export function ToolsSection({
  config,
  onConfigUpdate,
  id,
}: ToolsSectionProps) {
  const toolsEnabled = config.toolsEnabled === true;
  const tools = config.tools || [];
  const tool = config.tool || "Calculator";
  const [json, setJson] = useState<AutomationItem[]>([]);
  const [schema, setSchema] = useState<any>();

  console.log({ schema, config });
  useEffect(() => {
    if (tool) {
      console.log("mountttttttttttttt");

      const op = ToolsElements.find((o) => o.type === tool) as any;
      console.log({ op, config });
      setSchema(op);
    }
  }, []);

  // Tools management for LLM agent
  const addTool = () => {
    const currentTools = tools;
    const op = ToolsElements.find((o) => o.type === "Calculator") as any;
    console.log({ op });
    const newTool = setAutomationArray(op?.rightSideData?.json);

    onConfigUpdate("tools", [
      ...currentTools,
      { toolData: newTool, type: "Calculator" },
    ]);
  };

  const updateTool = (toolId: string, updates: Partial<Tool>) => {
    const currentTools = tools;
    const updatedTools = currentTools.map((tool: Tool) =>
      tool.id === toolId ? { ...tool, ...updates } : tool
    );

    onConfigUpdate("tools", updatedTools);
  };

  const removeTool = (indexToRemove: number) => {
    const currentTools = tools;
    const updatedTools = currentTools.filter(
      (tool: Tool, index: number) => index !== indexToRemove
    );
    onConfigUpdate("tools", updatedTools);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center">
            <Wrench className="w-4 h-4 mr-2" />
            Tools
          </CardTitle>
          <Switch
            checked={toolsEnabled}
            onCheckedChange={(checked) => {
              addTool();
              onConfigUpdate("toolsEnabled", checked);
            }}
            aria-label="Enable tools"
          />
        </div>
        <CardDescription>
          Configure tools for the LLM agent to use
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {toolsEnabled && (
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

            {tools.length === 0 ? (
              <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                <ToolIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No tools configured</p>
                <p className="text-xs text-gray-400 mt-1">
                  Click "Add Tool" to give the LLM agent capabilities
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {tools.map((tool: any, toolIndex: number) => (
                  <Card key={tool.id} className="border border-gray-200">
                    <CardContent className="p-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <ToolIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-xs font-medium text-gray-600">
                            {tool.name}
                          </span>
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
                            const op = ToolsElements.find(
                              (o) => o.type === value
                            ) as any;
                            const currentTools = tools;
                            const updatedTools = currentTools.map(
                              (tool: Tool, index: number) =>
                                toolIndex === index
                                  ? {
                                    type: value,
                                    toolData: setAutomationArray(
                                      op?.rightSideData?.json
                                    ),
                                  }
                                  : tool
                            );

                            onConfigUpdate("tools", updatedTools);
                          }}
                        >
                          <SelectTrigger
                            id={`tool-type-${tool.id}`}
                            className="h-8 text-xs"
                          >
                            <SelectValue placeholder="Select tool type" />
                          </SelectTrigger>
                          <SelectContent>
                            {ToolsElements.map((op) => (
                              <SelectItem value={op.type}>
                                {op.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <AutomationSimple
                        filledDataName={`tools.${toolIndex}.toolData`}
                        flowZoneSelectedId={id}
                        AllJson={
                          ToolsElements.find((o) => o.type === tool.type)
                            ?.rightSideData?.json
                        }
                        apiRes={tool?.toolData}
                        onUpdate={(key: string, value: any) => {
                          console.log({ key });
                          console.log("toooooooooooooooools ");

                          onConfigUpdate(key, value);
                        }}
                        config={config.tools[toolIndex].toolData}
                        setApiRes={setJson}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {toolsEnabled && tools.length > 0 && (
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

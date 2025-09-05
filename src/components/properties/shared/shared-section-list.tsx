import {
  AlertTriangle,
  FileJson,
  PenToolIcon,
  Plus,
  Trash2,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { v4 } from "uuid";
import { objToReturnDynamicv2 } from "../../../lib/automation-utils";
import { keyBy } from "../../../lib/utils";
import { SearchableSelect } from "../../custom/searchable-select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import { SharedListItemSection } from "./shared-section-list-tem";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

interface SectionProps {
  config: any;
  onConfigUpdate: (
    key: string,
    value: any,
    options?: { replace?: boolean }
  ) => void;
  id: string;
  defaultType: string;
  title: string;
  variableName: string;
  description: string;
  elements: any[];
  validators: any;
}

export function SharedListSection({
  config,
  onConfigUpdate,
  id,
  title,
  description,
  variableName,
  elements,
  validators,
}: SectionProps) {
  console.log({ config });

  const enabled = config.enabled === true;
  const optional = config.optional === true;
  const list = config.list || [];
  const [schemas] = useState<any>(keyBy(elements, "type"));

  const isListValid =
    list.length === 0 || list.every((item: any) => item.valid !== false);

  const addTool = () => {
    const currentTools = list;

    const newToolId = v4();
    onConfigUpdate(`extras.${variableName}.list`, [
      ...currentTools,
      { content: {}, type: "", id: newToolId, valid: false },
    ]);
  };

  const removeTool = (toolId: string) => {
    const currentTools = list;
    const updatedTools = currentTools.filter(
      (tool: any, index: number) => tool.id !== toolId
    );
    onConfigUpdate(`extras.${variableName}.list`, updatedTools);
  };

  const renderContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Available Tools</Label>
        <Button
          variant="outline"
          size="sm"
          onClick={addTool}
          className="h-8 bg-transparent"
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
          {list.map((tool: any, toolIndex: number) => {
            const hasItemError = !tool.valid;
            return (
              <Card
                key={tool.id}
                className={`border transition-colors duration-200 ${
                  hasItemError
                    ? "border-red-300 bg-red-50/30"
                    : "border-gray-200"
                }`}
              >
                <CardContent className="p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <PenToolIcon
                        className={`w-4 h-4 ${
                          hasItemError ? "text-red-500" : "text-gray-500"
                        }`}
                      />
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
                  <div className="space-y-2">
                    <Label
                      htmlFor={`tool-type-${tool.id}`}
                      className={`text-sm font-medium`}
                    >
                      {title} Type
                    </Label>

                    <SearchableSelect
                      name="type"
                      placeholder="Select a type"
                      value={tool.type}
                      onChange={(value) => {
                        const currentTools = list;
                        const selectedOption = elements.find(
                          (opt) => opt.type === value
                        );
                        const defaultValues = objToReturnDynamicv2(
                          selectedOption.rightSideData.json
                        );

                        const updatedTools = currentTools.map(
                          (tool: any, index: number) =>
                            toolIndex === index
                              ? {
                                  id: tool.id,
                                  type: value,
                                  content: { json: defaultValues },
                                  valid: selectedOption.defaultValid,
                                }
                              : tool
                        );
                        console.log({ updatedTools });
                        onConfigUpdate(
                          `extras.${variableName}.list`,
                          updatedTools
                        );
                      }}
                      options={elements.map((el) => ({
                        label: el.label,
                        value: el.type,
                      }))}
                    />
                  </div>
                  {schemas && tool.type && (
                    <SharedListItemSection
                      key={toolIndex}
                      validators={validators}
                      content={tool.content}
                      parentId={id}
                      id={tool.id}
                      onConfigUpdate={(path, value) => {
                        onConfigUpdate(path, value);
                      }}
                      path={`extras.${variableName}.list.${toolIndex}`}
                      schema={schemas[tool.type]}
                      type={tool.type}
                    />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      {list.length > 0 && (
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          <p>
            {" "}
            <span className="font-medium">Note:</span> Tools give the LLM agent
            the ability to perform actions or retrieve information. Each tool
            should have a clear purpose and description.
          </p>
        </div>
      )}
    </div>
  );

  const [open, setOpen] = useState(!optional || enabled);
  const shouldTrigger = true;

  return (
    <Card
      className={`transition-colors duration-200 ${
        !isListValid ? "border-red-300 bg-red-50/30" : ""
      }`}
    >
      <Accordion
        type="single"
        collapsible
        value={open ? "configuration" : ""}
        onValueChange={(val) => setOpen(val === "configuration")}
        className="w-full"
      >
        <AccordionItem value="configuration">
          {shouldTrigger ? (
            // Default behavior: AccordionTrigger wraps header
            <AccordionTrigger className="text-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle
                    className={`text-sm flex items-center ${
                      !isListValid ? "text-red-600" : ""
                    }`}
                  >
                    <FileJson
                      className={`w-4 h-4 mr-2 ${
                        !isListValid ? "text-red-500" : ""
                      }`}
                    />
                    {title}
                    {!isListValid && list.length > 0 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="ml-2 p-1 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-200 cursor-help group">
                              <AlertTriangle className="w-3 h-3 text-red-600 group-hover:text-red-700" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            className="z-[99999] max-w-[250px] p-3 text-sm bg-red-50 text-red-700 border border-red-200 shadow-xl rounded-lg"
                            side="top"
                            sideOffset={8}
                            avoidCollisions={true}
                            collisionPadding={16}
                          >
                            <div className="flex items-start space-x-2">
                              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium text-red-800">
                                  Validation Error
                                </p>
                                <p className="text-red-600 text-xs mt-1">
                                  Some items have missing required parameters
                                </p>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </CardTitle>
                </div>
                <CardDescription className={!isListValid ? "text-red-500" : ""}>
                  {description}
                </CardDescription>
              </CardHeader>
            </AccordionTrigger>
          ) : (
            // Custom: no icon, not clickable
            <CardHeader className="pb-3 cursor-default">
              <div className="flex items-center justify-between">
                <CardTitle
                  className={`text-sm flex items-center ${
                    !isListValid ? "text-red-600" : ""
                  }`}
                >
                  <FileJson
                    className={`w-4 h-4 mr-2 ${
                      !isListValid ? "text-red-500" : ""
                    }`}
                  />
                  {title}
                </CardTitle>
                <Switch
                  checked={enabled}
                  onCheckedChange={(checked) => {
                    onConfigUpdate(`extras.${variableName}.type`, "");
                    onConfigUpdate(`extras.${variableName}.enabled`, checked);
                    setOpen(checked);
                  }}
                  aria-label="Enable section"
                />
              </div>
              <CardDescription className={!isListValid ? "text-red-500" : ""}>
                {description}
              </CardDescription>
            </CardHeader>
          )}

          <AccordionContent>{renderContent()}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

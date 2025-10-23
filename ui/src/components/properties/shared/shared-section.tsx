import { AlertTriangle } from "lucide-react";
import { useRef, useState } from "react";
import { useDebounceConfig } from "../../../hooks/use-debounced-config";
import { getAutomationListValues } from "../../../lib/automation-utils";
import { validateArray } from "../../../lib/utils/utils";
import AutomationSimple from "../../custom/automation";
import { SearchableSelect } from "../../custom/searchable-select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
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

function getSchema(type: string, elements: any[]) {
  return elements.find((o) => o.type === type) as any;
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
  validators,
}: SectionProps) {
  const { localConfig, updateNestedConfig } = useDebounceConfig<any>(
    config.content,
    {
      delay: 300,
      onSave: (savedConfig) => {
        // Save label changes
        onConfigUpdate(`extras.${variableName}`, {
          content: savedConfig,
          valid: validateArray(
            schema.current.rightSideData.json,
            savedConfig.json
          ),
        });
      },
    }
  );

  const enabled = config.enabled === true;
  const type = config.type;
  const optional = config.optional || false;
  const content = localConfig || {};
  const json = content.json;
  const showError = !config.valid;
  const schema = useRef(getSchema(type, elements));

  const [open, setOpen] = useState(!optional || enabled);

  const renderHeader = () => (
    <CardHeader className="pb-3 cursor-default">
      <div className="flex items-center justify-between">
        <CardTitle
          className={`text-sm flex items-center ${
            showError ? "text-red-600" : ""
          }`}
        >
          {title}
          {showError && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="ml-2 p-1 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-200 cursor-help group">
                    <AlertTriangle className="w-3 h-3 text-red-600 group-hover:text-red-700" />
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  className="p-3 text-sm bg-red-50 text-red-700 border border-red-200 shadow-xl rounded-lg"
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
                        Configuration has missing or invalid required parameters
                      </p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
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
      <CardDescription className={showError ? "text-red-500" : ""}>
        {description}
      </CardDescription>
    </CardHeader>
  );

  return (
    <Card
      className={`${
        showError ? "border-red-300 bg-red-50/30" : ""
      } transition-colors duration-200`}
    >
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
            <div className="space-y-2">
              <Label htmlFor={variableName} className="text-sm font-medium">
                {title} Type
              </Label>
              <SearchableSelect
                name="type"
                placeholder="Select a type"
                value={type}
                onChange={(value) => {
                  const op = elements.find((o) => o.type === value) as any;
                  const defaultValues = getAutomationListValues(
                    op.rightSideData.json
                  );
                  schema.current = op;
                  onConfigUpdate(`extras.${variableName}.type`, value);
                  console.log({ defaultValues });
                  setTimeout(
                    () =>
                      updateNestedConfig("json", defaultValues, {
                        replace: true,
                      }),
                    1000
                  );
                }}
                options={elements.map((el) => ({
                  label: el.label,
                  value: el.type,
                }))}
              />
            </div>

            {schema.current && (
              <AutomationSimple
                filledDataName={`extras.${variableName}.content.json`}
                schema={schema.current?.rightSideData?.json}
                flowZoneSelectedId={id}
                fieldValues={json}
                onFieldChange={(partialState, replace) => {
                  updateNestedConfig("json", partialState, { replace });
                }}
              />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

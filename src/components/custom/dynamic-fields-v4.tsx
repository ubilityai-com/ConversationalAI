"use client";

import { TooltipContent } from "@radix-ui/react-tooltip";
import {
  AlertTriangle,
  ListChecks,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { objToReturnDynamicv2 } from "../../lib/automation-utils";
import { type ApiResItem, cn } from "../../lib/utils";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import AutomationSimple from "./automation-v4";

interface DynamicInputFieldsProps {
  json: {
    type: string;
    variableName: string;
    title: string;
    fieldsArray: ApiResItem[][] | string;
    structure: ApiResItem[];
    required?: boolean;
    minSize?: number;
    errorSpan?: string;
    hasAI?: boolean;
    [key: string]: any;
  };
  disabled?: boolean;
  filledDataName: string;
  flowZoneSelectedId: string;
  // New props for external field values
  fieldValues?: Record<string, any>;
  onFieldChange: (partialState: Record<string, any>, replace?: boolean) => void;
  [key: string]: any;
}
function updateByPathImmutable<T>(obj: T, path: string, value: any): T {
  const keys = path.split(".");

  const recursiveUpdate = (current: any, i: number): any => {
    const key = keys[i];
    const isIndex = /^\d+$/.test(key);
    const isLast = i === keys.length - 1;

    const currentVal = current ?? (isIndex ? [] : {});

    if (isLast) {
      if (Array.isArray(currentVal)) {
        const clone = [...currentVal];
        clone[Number(key)] = value;
        return clone;
      } else {
        return { ...currentVal, [key]: value };
      }
    }

    const nextVal = recursiveUpdate(currentVal[key], i + 1);

    if (Array.isArray(currentVal)) {
      const clone = [...currentVal];
      clone[Number(key)] = nextVal;
      return clone;
    } else {
      return { ...currentVal, [key]: nextVal };
    }
  };

  return recursiveUpdate(obj, 0);
}

const UseAIIcon: React.FC<{
  isUsingVariable: boolean;
  onClick: () => void;
  rightSideInput?: boolean;
  disabled?: boolean;
}> = ({ isUsingVariable, onClick, disabled }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isUsingVariable ? "default" : "outline"}
          size="icon"
          className={cn(
            "h-8 w-8 ml-2",
            isUsingVariable
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "border-purple-300 text-purple-600 hover:bg-purple-50"
          )}
          onClick={onClick}
          disabled={disabled}
        >
          <Sparkles className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isUsingVariable ? "Stop using AI" : "Use AI"}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const DynamicInputFields: React.FC<DynamicInputFieldsProps> = (props) => {
  const {
    json,
    disabled,
    flowZoneSelectedId,
    fieldValues,
    onFieldChange,
    filledArray,
    filledDataName,
  } = props;

  // Mock selector - replace with your actual Redux selector
  const selectedRPA = { status: "Inactive" }; // useSelector((state) => state.updateRPA.selectedRPA)
  const isActive = selectedRPA?.status === "Active";

  const [remove, setRemove] = useState(false);

  console.log({ filledArray, json });

  // Get the current fieldsArray value from external state or internal state
  const getCurrentFieldsArray = () => {
    return filledArray || [];
  };

  const currentFieldsArray = getCurrentFieldsArray();

  const valueIsAIOrEmpty =
    currentFieldsArray &&
    typeof currentFieldsArray === "string" &&
    currentFieldsArray.trim() &&
    currentFieldsArray.startsWith("##AI##");

  const [isUsingAI, setIsUsingAI] = useState(valueIsAIOrEmpty);

  const updateFieldsArray = (newValue: any, replace = false) => {
    console.log({ newValue });

    if (onFieldChange && json.variableName) {
      // Use external field change handler with new signature
      console.log({ json, newValue });

      onFieldChange({ [json.variableName]: newValue }, replace);
    }
  };

  const onAddVariables = () => {
    if (typeof currentFieldsArray === "string") return;

    const newElt = objToReturnDynamicv2(json.structure);
    console.log({ newElt });

    const newFlledArray = Array.isArray(filledArray) ? currentFieldsArray : [];
    updateFieldsArray([...newFlledArray, newElt]);
  };

  const onRemoveVariables = (index: number) => {
    const newVariables = currentFieldsArray.filter(
      (f: any, i: number) => i !== index
    );
    updateFieldsArray(newVariables);
    setRemove((prev) => !prev);
  };

  const onChangeVariables = ({
    index,
    event,
  }: {
    index: number;
    event: any;
  }) => {
    if (
      typeof currentFieldsArray === "string" ||
      !Array.isArray(currentFieldsArray)
    )
      return;

    const newFieldsArray = currentFieldsArray.map((field, ind) => {
      if (index === ind) {
        return event;
      }
      return field;
    });
    updateFieldsArray(newFieldsArray);
  };

  const onUseAIIconClick = () => {
    const newValue = isUsingAI ? [] : "##AI##";
    updateFieldsArray(newValue);
    setIsUsingAI(!isUsingAI);
  };

  const UseAIIconHTML = json.hasAI && (
    <UseAIIcon
      isUsingVariable={!!isUsingAI}
      onClick={onUseAIIconClick}
      rightSideInput={true}
      disabled={disabled || isActive}
    />
  );

  // AI Mode Display
  if (valueIsAIOrEmpty) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Label className="text-sm font-medium mb-2 block">
            {json.variableName}
            {json.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            placeholder="Pick a variable"
            value="The value will be taken from the query context"
            readOnly
            className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300"
          />
        </div>
        {UseAIIconHTML}
      </div>
    );
  }

  const fieldsArray = Array.isArray(currentFieldsArray)
    ? currentFieldsArray
    : [];
  const hasRequiredError = json.required && fieldsArray.length === 0;
  const hasRequiredSuccess = json.required && fieldsArray.length > 0;
  const isAccordion = json.type === "accordion";
  console.log({ json, currentFieldsArray, fieldsArray });

  return (
    <div className="space-y-4">
      <div className={cn("rounded-l-md")}>
        <Card className="border-none">
          {json.type !== "accordion" && (
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <ListChecks className="w-4 h-4 mr-2" />
                {json.title}&nbsp;
                <span className="text-muted-foreground">
                  ({fieldsArray.length})
                </span>
              </CardTitle>
              {/* <CardDescription>
                Add options users can select. Every choice gets its own output
                handle.
              </CardDescription> */}
            </CardHeader>
          )}

          <CardContent className="p-0 space-y-4">
            {filledArray.length === 0 && (
              <p className="text-xs text-gray-500">
                No {json.title} yet. Click "Add {json.title}".
              </p>
            )}

            {filledArray.map(
              (fieldSet: Record<string, any>, fieldSetInd: number) => (
                <Card key={fieldSetInd} className={isAccordion ? "border-none" : "border border-gray-200"}>
                  <CardContent className={isAccordion ? "p-0" : "p-4 space-y-3"}>
                    {json.type !== "accordion" && (
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {json.title} {fieldSetInd + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          onClick={() => onRemoveVariables(fieldSetInd)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}

                    <div>
                      <AutomationSimple
                        filledDataName={filledDataName}
                        disabled={disabled || isActive}
                        indexForDynamic={fieldSetInd}
                        schema={
                          json.type === "accordion"
                            ? (json.fieldsArray[0] as ApiResItem[])
                            : json.structure
                        }
                        InDynamic={true}
                        flowZoneSelectedId={flowZoneSelectedId}
                        onFieldChange={(
                          partialState: any,
                          replace?: boolean
                        ) => {
                          let newFilledData;

                          if (isAccordion) {
                            // For accordion, update the entire fieldSet with partialState
                            newFilledData = replace
                              ? partialState
                              : { ...fieldSet, ...partialState };
                          } else {
                            // For non-accordion, loop to index and update the item
                            newFilledData = filledArray.map(
                              (item: any, index: number) => {
                                if (index === fieldSetInd) {
                                  return replace
                                    ? partialState
                                    : { ...item, ...partialState };
                                }
                                return item;
                              }
                            );
                          }

                          console.log({
                            partialState,
                            replace,
                            fieldValues,
                            filledArray,
                            newFilledData,
                          });

                          onFieldChange(
                            {
                              [json.variableName]: newFilledData,
                            },
                            false
                          );
                        }}
                        fieldValues={fieldSet}
                      />
                    </div>
                  </CardContent>
                </Card>
              )
            )}

            {json.type !== "accordion" && (
              <Button
                variant="outline"
                size="sm"
                onClick={onAddVariables}
                className="h-8 w-full bg-transparent"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add {json.title}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Validation Error */}
      {json.minSize && json.minSize > fieldsArray.length && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {json.errorSpan ||
              `Minimum ${json.minSize} ${json.title.toLowerCase()} required`}
          </AlertDescription>
        </Alert>
      )}

      {/* Required Field Error */}
      {hasRequiredError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            This field is required. Please add at least one{" "}
            {json.title.toLowerCase()}.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default React.memo(DynamicInputFields);

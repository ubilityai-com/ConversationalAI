import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useFlowStore } from "../../store/flow-store";
import { Textarea } from "../ui/textarea";
import { Variable } from "lucide-react";
import { cn } from "../../lib/utils";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { getAllPreviousNodes } from "../../lib/utils";
import { useRightDrawerStore } from "../../store/right-drawer-store";
import { useReactFlow } from "@xyflow/react";

interface EditableFieldWrapperProps {
  children: React.ReactNode;
  value: string | number;
  onChange: (value: string) => void;
  className?: string;
  variableName: string;
  field: any;
  path?: string;
}

export function FieldWrapper({
  children,
  value,
  className = "",
  onChange,
  variableName,
  field,
  path,
}: EditableFieldWrapperProps) {
  const setVarPicker = useFlowStore((state) => state.setVarPicker);
  const setVarPickerProps = useFlowStore((state) => state.setVarPickerProps);
  const SelectedOutputOrVariable = useFlowStore(
    (state) => state.selectedOutputOrVariable
  );
  const setSelectedOutputOrVariable = useFlowStore(
    (state) => state.setSelectedOutputOrVariable
  );
  const clickedElement = useFlowStore((state) => state.clickedElement);
  const updateNodeData = useReactFlow().updateNodeData;

  // Get initial editing state from customizedInputs
  const getInitialEditingState = () => {
    const customizedInputs = clickedElement?.data?.customizedInputs;
    if (customizedInputs && customizedInputs.hasOwnProperty(variableName)) {
      return customizedInputs[variableName];
    }
    // Fallback to checking if value is a variable
    const regex = /\$\{[^}]+\}/;
    return regex.test(value.toString());
  };

  const [isEditing, setIsEditing] = useState(getInitialEditingState);
  const [editValue, setEditValue] = useState(String(value));
  console.log({ path, variableName });

  const {
    setIsPopoverInteracting,
    fieldRefs,
    setFieldRef,
    setFocusedField,
    blurTimeoutRef,
    setBlurTimeoutRef,
    focusedField,
  } = useFlowStore();

  const isPopoverInteracting = useFlowStore(
    (state) => state.isPopoverInteracting
  );
  const [inputNameOnContextMenu, setInputNameOnContextMenu] = useState<
    string | null
  >(null);
  console.log({ isPopoverInteracting, focusedField, blurTimeoutRef });

  let valueIsVariable =
    typeof value === "string" &&
    value.trim() &&
    value.startsWith("${") &&
    value.endsWith("}");

  const handleSave = () => {};

  const handleCancel = () => {
    setEditValue(String(value));
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleFieldFocus = (event: React.FocusEvent<HTMLElement>) => {
    console.log("focusssssssssss fieldwrapper", blurTimeoutRef);

    if (blurTimeoutRef) {
      clearTimeout(blurTimeoutRef);
      setBlurTimeoutRef(null);
    }
    setVarPicker(true);
    if (clickedElement)
      setVarPickerProps({
        allowedNodeIds: getAllPreviousNodes(clickedElement?.id),
      });
    setFieldRef(variableName, event.target);
    setFocusedField(variableName);
  };

  const handleFieldBlur = () => {
    console.log("focusssssssssss          blur");

    const timeout = setTimeout(() => {
      if (!isPopoverInteracting) {
        setVarPicker(false);
      }
    }, 100);
    setBlurTimeoutRef(timeout);
  };

  const handleVariableIconClick = () => {
    const newIsEditing = !isEditing;
    setIsEditing(newIsEditing);
    setInputNameOnContextMenu(variableName);
    setFocusedField(variableName);

    // Update node data customizedInputs
    if (clickedElement?.id) {
      updateNodeData(clickedElement.id, {
        customizedInputs: {
          ...clickedElement.data?.customizedInputs,
          [variableName]: newIsEditing,
        },
      });
    }
  };

  console.log({
    SelectedOutputOrVariable,
    inputNameOnContextMenu,
    focusedField,
  });
  useEffect(() => {
    return () => {
      console.log("unmountsssssssssssssssssssssss");
      setVarPicker(false);
      setIsPopoverInteracting(false);
    };
  }, []);
  useEffect(() => {
    if (SelectedOutputOrVariable) {
      if (focusedField === variableName) {
        // variableName is unique
        let newValue = SelectedOutputOrVariable.startsWith("$")
          ? value + SelectedOutputOrVariable
          : SelectedOutputOrVariable;
        console.log({ SelectedOutputOrVariable, newValue });

        onChange(newValue);

        setInputNameOnContextMenu(null);
      }
      setSelectedOutputOrVariable(null);
    }
  }, [SelectedOutputOrVariable]); //eslint-disable-line

  const variableButton = (
    <Button
      size="sm"
      variant="ghost"
      className={`h-8 w-8 p-0 text-cyan-700 hover:text-cyan-900 ${
        isEditing ? "bg-slate-200" : ""
      }`}
      aria-label="Set dynamic value"
      onClick={handleVariableIconClick}
    >
      <Variable className="h-4 w-4" />
    </Button>
  );

  const inputWithVariables = () => (
    <div className={`flex items-start gap-2 ${className}`}>
      <div className="flex-1">
        {field.multiline ? (
          <Textarea
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={(event) => handleFieldFocus(event)}
            onBlur={handleFieldBlur}
            onKeyDown={handleKeyDown}
            name={variableName}
            className={cn(className, field.errorSpan && "border-red-500")}
          />
        ) : (
          <Input
            type={
              field.password
                ? "password"
                : field.numberField
                ? "number"
                : field.date
                ? "date"
                : "text"
            }
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={(event) => handleFieldFocus(event)}
            onBlur={handleFieldBlur}
            onKeyDown={handleKeyDown}
            maxLength={field.maxLength}
            name={variableName}
            className={cn(className, field.errorSpan && "border-red-500")}
          />
        )}
      </div>
      {/* Show variable button next to input when no label */}
      {!field.label && field.type !== "textfield" && variableButton}
    </div>
  );

  const inputWithoutVariables = () => (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex-1">{children}</div>
      {/* Show variable button next to input when no label */}
      {!field.label && field.type !== "textfield" && variableButton}
    </div>
  );

  console.log({ field });

  return (
    <div className={`space-y-1 ${className}`}>
      {/* Only show label row if label exists */}
      {field.label && (
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {field.type !== "textfield" && variableButton}
        </div>
      )}
      <div className="flex-1">
        {valueIsVariable || isEditing || field.type === "textfield"
          ? inputWithVariables()
          : inputWithoutVariables()}
      </div>
    </div>
  );
}

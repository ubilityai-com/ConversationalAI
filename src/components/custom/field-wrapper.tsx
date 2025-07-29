import { useReactFlow } from "@xyflow/react";
import { Variable } from "lucide-react";
import { useEffect, useState } from "react";
import { cn, getAllPreviousNodes } from "../../lib/utils";
import { useFlowStore } from "../../store/flow-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface EditableFieldWrapperProps {
  children: React.ReactNode;
  value: string | number;
  onChange: (value: string) => void;
  className?: string;
  variableName: string;
  field: any;
  path?: string;
}
function hasTemplateVariable(str: string): boolean {
  return /\$\{[^}]+\}/.test(str);
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

  const getInitialEditingState = () => {
    return (
      typeof value === "string" && value.trim() && hasTemplateVariable(value)
    );
  };

  const [isEditing, setIsEditing] = useState(getInitialEditingState);
  const [editValue, setEditValue] = useState(String(value));

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
    if (!newIsEditing) {
      onChange(field?.value || undefined);
    }
    setInputNameOnContextMenu(variableName);
    setFocusedField(variableName);
  };

  useEffect(() => {
    return () => {
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
        {isEditing || field.type === "textfield"
          ? inputWithVariables()
          : inputWithoutVariables()}
      </div>
    </div>
  );
}

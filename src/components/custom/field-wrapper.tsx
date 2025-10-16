import { Expand, Variable } from "lucide-react";
import { useEffect, useState } from "react";
import { cn, getAllPreviousNodes } from "../../lib/utils/utils";
import { useFlowStore } from "../../store/root-store";
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
  inlineLabel?: boolean; // If true, label is shown next to input

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
  inlineLabel,
  path,
}: EditableFieldWrapperProps) {
  const setVarPicker = useFlowStore((state) => state.setVarPicker);
  const setVarPickerProps = useFlowStore((state) => state.setVarPickerProps);
  const clickedElement = useFlowStore((state) => state.clickedElement);
  const getInitialEditingState = () => {
    return (
      typeof value === "string" && value.trim() && hasTemplateVariable(value)
    );
  };
  const [isEditing, setIsEditing] = useState(getInitialEditingState);

  const {
    setIsPopoverInteracting,
    setFieldRef,
    setFocusedField,
    blurTimeoutRef,
    setBlurTimeoutRef,
    focusedField,
    setFormDialogStatus,
    setIsFormDialogOpen,
    setDialogProps
  } = useFlowStore();

  const isPopoverInteracting = useFlowStore(
    (state) => state.isPopoverInteracting
  );

  const handleSave = () => { };

  const handleCancel = () => {
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
        insertVariable: (text) => appendText(text, event.target as HTMLInputElement | HTMLTextAreaElement)
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
    setFocusedField(variableName);
  };
  const handleExpandIconClick = () => {
    setIsFormDialogOpen(true);
    setFormDialogStatus("ExpandedFieldDialog");
    setFocusedField(variableName)
    setDialogProps({ label: field.label, value, onChange: onChange })
  }

  useEffect(() => {
    return () => {
      setVarPicker(false);
      setIsPopoverInteracting(false);
    };
  }, []);

  const appendText = (text: string, ref: HTMLInputElement | HTMLTextAreaElement) => {
    onChange(`${ref?.value ?? ""}${text}`)
  }
  const variableButton = (
    <Button
      size="sm"
      variant="ghost"
      className={`h-8 w-8 p-0 text-cyan-700 hover:text-cyan-900 ${isEditing ? "bg-slate-200" : ""
        }`}
      aria-label="Set dynamic value"
      onClick={handleVariableIconClick}
    >
      <Variable className="h-4 w-4" />
    </Button>
  );
  const expandButton = (
    <Button
      size="sm"
      variant="ghost"
      className={`h-8 w-8 p-0 text-cyan-700 hover:text-cyan-900 absolute -top-8 right-0`}
      aria-label="Set dynamic value"
      onClick={handleExpandIconClick}
    >
      <Expand className="h-4 w-4" />
    </Button>
  );

  const inputWithVariables = () => (
    <div className={` relative flex items-start gap-2 ${className}`}>
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
      {field.isExpanded && expandButton}
      {!field.label && field.type !== "textfield" && variableButton}
    </div>
  );

  const inputWithoutVariables = () => (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex-1`}>{children}
        {inlineLabel && <Label className={`text-sm font-medium ml-2`}>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>}
      </div>
      {/* Show variable button next to input when no label */}
      {(!field.label || inlineLabel) && field.type !== "textfield" && variableButton}
    </div>
  );

  return (
    <div className={`space-y-1 ${className}`}>
      {/* Only show label row if label exists */}
      {(!inlineLabel || isEditing) && field.label && (
        <div className={`flex justify-between items-center`}>
          <Label className={`text-sm font-medium ${field.required && field.type !== "checkbox" && !value && `text-red-500`}`}>
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {field.type !== "textfield" && variableButton}
          {/* {field.isExpanded && expandButton} */}
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

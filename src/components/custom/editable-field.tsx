"use client";

import type React from "react";

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertTriangle } from "lucide-react";
import { useFlowStore } from "../../store/flow-store";
import { doesVariableExist } from "../../lib/variable-utils";

interface EditableAddressFieldProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  label?: string;
  name: string;
}

export function EditableField({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder = "Enter ...",
  label = "label",
  name,
}: EditableAddressFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { constantVariables, outputVariables, dialogueVariables } =
    useFlowStore();

  const handleEditClick = () => {
    setIsEditing(true);
    setTempValue(value);
    setError(null);
    // Focus the input after it becomes enabled
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSave = () => {
    // Check if the value exists as a variable name
    if (
      tempValue.trim() &&
      tempValue.trim() !== value &&
      doesVariableExist(
        tempValue.trim(),
        constantVariables,
        outputVariables,
        dialogueVariables
      )
    ) {
      setError(
        `Variable "${tempValue.trim()}" already exists. Please choose a different name.`
      );
      return;
    }

    onChange(tempValue);
    setIsEditing(false);
    setTempValue("");
    setError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempValue("");
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditing) {
      setTempValue(e.target.value);
      // Clear error when user starts typing
      if (error) {
        setError(null);
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          id={name}
          ref={inputRef}
          value={isEditing ? tempValue : value}
          onChange={handleInputChange}
          onFocus={isEditing ? onFocus : undefined}
          onBlur={isEditing ? onBlur : undefined}
          onKeyDown={isEditing ? handleKeyDown : undefined}
          placeholder={placeholder}
          disabled={!isEditing}
          className={`${!isEditing ? "bg-muted" : ""} ${
            error ? "border-red-500" : ""
          }`}
        />
        {!isEditing ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleEditClick}
            className="shrink-0 bg-transparent"
          >
            Edit
          </Button>
        ) : (
          <div className="flex gap-1 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={!!error}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

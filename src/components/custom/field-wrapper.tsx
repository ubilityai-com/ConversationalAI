"use client"

import { Variable } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"
import { cn, getAllPreviousNodes } from "../../lib/utils"
import { useFlowStore } from "../../store/flow-store"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

interface EditableFieldWrapperProps {
    children: React.ReactNode
    value: string | number
    onChange: (value: string) => void
    className?: string
    variableName: string
    field: any
}

export function FieldWrapper({
    children,
    value,
    className = "",
    onChange,
    variableName,
    field
}: EditableFieldWrapperProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(String(value))
    const setVarPicker = useFlowStore(state => state.setVarPicker)
    const setVarPickerProps = useFlowStore(state => state.setVarPickerProps)
    const SelectedOutputOrVariable = useFlowStore(state => state.selectedOutputOrVariable)
    const setSelectedOutputOrVariable = useFlowStore(state => state.setSelectedOutputOrVariable)
    const clickedElement = useFlowStore(state => state.clickedElement)

    const {
        setIsPopoverInteracting,
        fieldRefs,
        setFieldRef,
        setFocusedField,
        blurTimeoutRef,
        setBlurTimeoutRef,
        focusedField
    } = useFlowStore()

    const isPopoverInteracting = useFlowStore(state => state.isPopoverInteracting)
    const [inputNameOnContextMenu, setInputNameOnContextMenu] = useState<string | null>(null);
    console.log({ isPopoverInteracting, focusedField, blurTimeoutRef });

    useEffect(() => {
        const regex = /\$\{[^}]+\}/;
        const hasMatch = regex.test(value.toString());
        setIsEditing(hasMatch)
    }, [])

    let valueIsVariable =
        typeof value === "string" &&
        value.trim() &&
        value.startsWith("${") &&
        value.endsWith("}")

    const handleSave = () => {

    }

    const handleCancel = () => {
        setEditValue(String(value))
        setIsEditing(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave()
        } else if (e.key === "Escape") {
            handleCancel()
        }
    }


    const handleFieldFocus = (event: React.FocusEvent<HTMLElement>) => {
        console.log("focusssssssssss fieldwrapper", blurTimeoutRef);

        if (blurTimeoutRef) {
            clearTimeout(blurTimeoutRef)
            setBlurTimeoutRef(null)
        }
        setVarPicker(true)
        if (clickedElement)
            setVarPickerProps({ allowedNodeIds: getAllPreviousNodes(clickedElement?.id) })
        setFieldRef(variableName, event.target)
        setFocusedField(variableName)
    }

    const handleFieldBlur = () => {
        console.log("focusssssssssss          blur");

        const timeout = setTimeout(() => {
            if (!isPopoverInteracting) {
                setVarPicker(false)
            }
        }, 100)
        setBlurTimeoutRef(timeout)
    }

    console.log({ SelectedOutputOrVariable, inputNameOnContextMenu, focusedField });
    useEffect(() => {
        return () => {
            console.log("unmountsssssssssssssssssssssss");
            setVarPicker(false)
            setIsPopoverInteracting(false)

        }
    }, [])
    useEffect(() => {
        if (SelectedOutputOrVariable) {
            if (focusedField === variableName) {
                // variableName is unique
                let newValue = SelectedOutputOrVariable.startsWith("$") ?
                    value + SelectedOutputOrVariable : SelectedOutputOrVariable
                console.log({ SelectedOutputOrVariable, newValue });

                onChange(newValue);

                setInputNameOnContextMenu(null);
            }
            setSelectedOutputOrVariable(null);
        }
    }, [SelectedOutputOrVariable]); //eslint-disable-line
    const inputWithVariables = () =>
    (
        <div className={`flex items-start gap-2 ${className}`}>
            <div className="flex-1">
                {field.multiline ? (
                    <Textarea
                        placeholder={field.placeholder}
                        value={value}
                        onChange={(e) =>
                            onChange(e.target.value)
                        }
                        onFocus={(event) => handleFieldFocus(event)}
                        onBlur={handleFieldBlur}
                        onKeyDown={handleKeyDown}
                        name={variableName}
                        className={cn(className, field.errorSpan && "border-red-500")}
                    />
                ) : (
                    <Input
                        type={field.password ? "password" : field.numberField ? "number" : field.date ? "date" : "text"}
                        placeholder={field.placeholder}
                        value={value}
                        onChange={(e) =>
                            onChange(e.target.value)
                        }
                        onFocus={(event) => handleFieldFocus(event)}
                        onBlur={handleFieldBlur}
                        onKeyDown={handleKeyDown}
                        maxLength={field.maxLength}
                        name={variableName}
                        className={cn(className, field.errorSpan && "border-red-500")}
                    />
                )}
            </div>

        </div >
    )

    console.log({ field });

    return (
        <div className={`space-y-1 ${className}`}>
            <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {field.type !== "textfield" &&
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-cyan-700 hover:text-cyan-900"
                        aria-label="Set dynamic value"
                        onClick={() => {
                            setInputNameOnContextMenu(variableName)
                            setFocusedField(variableName)
                            setIsEditing(prev => !prev)
                        }}

                    >
                        <Variable className="h-4 w-4" />
                    </Button>
                }
            </div>
            <div className="flex-1">{valueIsVariable || isEditing || field.type === "textfield" ? inputWithVariables() : children}</div>

        </div>
    )
}

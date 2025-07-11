"use client"

import { Variable } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"
import { cn } from "../../lib/utils"
import { useFlowStore } from "../../store/flow-store"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
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


    const handleFieldFocus = (fieldName: string) => {
        if (blurTimeoutRef) {
            clearTimeout(blurTimeoutRef)
            setBlurTimeoutRef(null)
        }
        setVarPicker(true)
        setFocusedField(variableName)
    }

    const handleFieldBlur = () => {
        const timeout = setTimeout(() => {
            if (!isPopoverInteracting) {
                setVarPicker(false)
            }
        }, 100)
        setBlurTimeoutRef(timeout)
    }

    console.log({ SelectedOutputOrVariable, inputNameOnContextMenu, focusedField });

    useEffect(() => {
        if (SelectedOutputOrVariable) {
            if (focusedField === variableName) {
                // variableName is unique
                let newValue = SelectedOutputOrVariable.startsWith("$") ?
                    value + SelectedOutputOrVariable : SelectedOutputOrVariable
                console.log({ SelectedOutputOrVariable, newValue });

                onChange(newValue);

                setInputNameOnContextMenu(null);
                setFocusedField(null)
            }
            setSelectedOutputOrVariable(null);
        }
    }, [SelectedOutputOrVariable]); //eslint-disable-line
    if (valueIsVariable || isEditing || field.type === "textfield") {
        return (
            <div className={`flex items-start gap-2 ${className}`}>

                <div className="flex-1">
                    {field.multiline ? (
                        <Textarea
                            placeholder={field.placeholder}
                            value={value}
                            onChange={(e) =>
                                onChange(e.target.value)
                            }
                            onFocus={() => handleFieldFocus(variableName)}
                            onBlur={handleFieldBlur}
                            onKeyDown={handleKeyDown}
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
                            onFocus={() => handleFieldFocus(variableName)}
                            onBlur={handleFieldBlur}
                            onKeyDown={handleKeyDown}
                            maxLength={field.maxLength}
                            className={cn(className, field.errorSpan && "border-red-500")}
                        />
                    )}
                </div>
                {field.type !== "textfield" && < div className="flex gap-1">
                    <Button
                        size="sm"
                        variant="ghost"
                        className={`h-8 w-8 p-0 text-cyan-700 hover:text-cyan-900 ${isEditing && `bg-slate-200`}`}
                        aria-label="Set dynamic value"
                        onClick={() => {
                            setVarPicker(false)
                            setIsEditing(prev => !prev)
                        }
                        }
                    >
                        <Variable className="h-4 w-4" />
                    </Button>
                </div>}
            </div >
        )
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="flex-1">{children}</div>
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
        </div>
    )
}

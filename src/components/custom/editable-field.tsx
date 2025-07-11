"use client"

import type React from "react"


import { useRef, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface EditableAddressFieldProps {
    value: string
    onChange: (value: string) => void
    onFocus?: () => void
    onBlur?: () => void
    placeholder?: string
    label?: string
    name: string
}

export function EditableField({
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder = "Enter ...",
    label = "label",
    name
}: EditableAddressFieldProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [tempValue, setTempValue] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleEditClick = () => {
        setIsEditing(true)
        setTempValue(value)
        // Focus the input after it becomes enabled
        setTimeout(() => {
            inputRef.current?.focus()
        }, 0)
    }

    const handleSave = () => {
        onChange(tempValue)
        setIsEditing(false)
        setTempValue("")
    }

    const handleCancel = () => {
        setIsEditing(false)
        setTempValue("")
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave()
        } else if (e.key === "Escape") {
            handleCancel()
        }
    }

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <Input
                    id={name}
                    ref={inputRef}
                    value={isEditing ? tempValue : value}
                    onChange={(e) => {
                        if (isEditing) {
                            setTempValue(e.target.value)
                        }
                    }}
                    onFocus={isEditing ? onFocus : undefined}
                    onBlur={isEditing ? onBlur : undefined}
                    onKeyDown={isEditing ? handleKeyDown : undefined}
                    placeholder={placeholder}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
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
                        <Button type="button" variant="outline" size="sm" onClick={handleSave}>
                            Save
                        </Button>
                        <Button type="button" variant="ghost" size="sm" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

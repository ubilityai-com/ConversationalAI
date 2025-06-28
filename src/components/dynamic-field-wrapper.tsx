"use client"

import type React from "react"
import { Zap } from "lucide-react"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

interface DynamicFieldWrapperProps {
  label: string
  value: any
  dynamicValue?: string
  onValueChange: (value: any) => void
  onDynamicValueChange: (dynamicValue: string | undefined) => void
  isDynamic: boolean
  children: React.ReactNode
  placeholder?: string
}

export function DynamicFieldWrapper({
  label,
  value,
  dynamicValue,
  onValueChange,
  onDynamicValueChange,
  isDynamic,
  children,
  placeholder,
}: DynamicFieldWrapperProps) {
  const toggleDynamic = () => {
    if (isDynamic) {
      // Switch to static mode
      onDynamicValueChange(undefined)
    } else {
      // Switch to dynamic mode
      onDynamicValueChange(dynamicValue || "")
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center gap-2">
          {isDynamic && (
            <Badge variant="secondary" className="text-xs">
              Dynamic
            </Badge>
          )}
          <Button
            type="button"
            variant={isDynamic ? "default" : "outline"}
            size="sm"
            onClick={toggleDynamic}
            className="h-6 w-6 p-0"
          >
            <Zap className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {isDynamic ? (
        <div className="space-y-1">
          {/* <InputWithVariables
            value={dynamicValue || ""}
            onChange={(e) => onDynamicValueChange(e.target.value)}
            placeholder={placeholder || `Enter dynamic value for ${label.toLowerCase()}...`}
            className="font-mono text-sm"
          /> */}
          <p className="text-xs text-gray-500">Use variables like &#123;&#123;variableName&#125;&#125;</p>
        </div>
      ) : (
        children
      )}
    </div>
  )
}

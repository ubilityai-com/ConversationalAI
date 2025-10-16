

import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { ChevronDown } from "lucide-react"
import type { Variable } from "./types"
import { typeConfig } from "./config"
import { VariableItem } from "./variable-item"

interface VariableTypeSectionProps {
  type: string
  variables: Variable[]
  isOpen: boolean
  onToggle: (open: boolean) => void
  onVariableSelect: (varName: string) => void
  onNavigate?: (nodeId: string) => void
  showSeparator: boolean
}

export function VariableTypeSection({
  type,
  variables,
  isOpen,
  onToggle,
  onVariableSelect,
  onNavigate,
  showSeparator,
}: VariableTypeSectionProps) {
  const config = typeConfig[type as keyof typeof typeConfig]
  const IconComponent = config.icon

  return (
    <Collapsible key={type} open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger className="w-full group">
        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors">
          <IconComponent className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-lg">{config.label}</h3>
          <Badge variant="secondary" className="ml-auto">
            {variables.length}
          </Badge>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-3">
        <p className="text-sm text-muted-foreground mb-3 px-2">{config.description}</p>

        <div className="space-y-2">
          {variables.map((variable, index) => (
            <VariableItem
              key={`${variable.name}-${index}`}
              variable={variable}
              index={index}
              onSelect={onVariableSelect}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </CollapsibleContent>

      {showSeparator && <Separator className="mt-4" />}
    </Collapsible>
  )
}

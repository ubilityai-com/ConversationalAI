

import { Braces, ChevronDown, FolderTree } from "lucide-react"
import React from "react"
import { Badge } from "../ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Separator } from "../ui/separator"
import type { Variable } from "./types"
import { VariableItem } from "./variable-item"

interface VariableNodeSectionProps {
    nodeName: string
    variables: Variable[]
    isOpen: boolean
    onToggle: (open: boolean) => void
    onVariableSelect: (varName: string) => void
    onNavigate?: (nodeId: string) => void
    showSeparator: boolean
}
interface NodeIconProps {
    IconComponent: React.ComponentType<{ className?: string }> | null;
    type: string;
}
export const NodeIcon = React.memo(({ type }: NodeIconProps) => (
    <div
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0`}
    >
        (
        <img
            src={`/components-icons/${type}.png`}
            alt={`${type} icon`}
            className="w-7 h-7 object-contain"
        />
        )
    </div>
));
export function VariableNodeSection({
    nodeName,
    variables,
    isOpen,
    onToggle,
    onVariableSelect,
    onNavigate,
    showSeparator,
}: VariableNodeSectionProps) {
    const isNoNodeGroup = nodeName === "_no_node"
    const displayName = isNoNodeGroup ? "Global Variables" : nodeName
    const IconComponent = isNoNodeGroup ? Braces : FolderTree

    return (
        <Collapsible key={nodeName} open={isOpen} onOpenChange={onToggle}>
            <CollapsibleTrigger className="w-full group">
                <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                    {!isNoNodeGroup ? <img
                        src={`/components-icons/${"Slack"}.png`}
                        alt={`${"Slack"} icon`}
                        className="w-7 h-7 object-contain"
                    /> : <IconComponent className="h-5 w-5 text-muted-foreground" />}
                    <h3 className="font-semibold text-lg">{displayName}</h3>
                    <Badge variant="secondary" className="ml-auto">
                        {variables.length}
                    </Badge>
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-3">
                <p className="text-sm text-muted-foreground mb-3 px-2">
                    {isNoNodeGroup ? "Variables not associated with any specific node" : `Variables from the ${displayName} node`}
                </p>

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

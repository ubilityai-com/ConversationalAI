import { ExternalLink } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { typeConfig } from "./config"
import type { Variable } from "./types"

interface VariableItemProps {
    variable: Variable
    index: number
    onSelect: (varName: string) => void
    onNavigate?: (nodeId: string) => void
}

export function VariableItem({ variable, index, onSelect, onNavigate }: VariableItemProps) {
    const config = typeConfig[variable.type]

    return (
        <div
            key={`${variable.name}-${index}`}
            className="p-2.5 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer group"
            role="button"
            tabIndex={0}
            onClick={(event) => {
                event.preventDefault()
                onSelect(`\${${variable.name}}`)
            }}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 min-w-0">
                        <code className="font-mono text-sm font-medium truncate" title={variable.name}>
                            {variable.name}
                        </code>
                        <Badge variant="outline" className={`text-xs ${config.badgeClass}`}>
                            {variable.type}
                        </Badge>
                    </div>

                    {variable.type === "output" && variable.path && (
                        <div className="text-xs text-muted-foreground mb-1">
                            <span className="font-medium">Path: </span>
                            <code className="bg-muted px-1 py-0.5 rounded">{variable.path}</code>
                        </div>
                    )}

                    {variable.nodeId && (
                        <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Node: </span>
                            <code className="bg-muted px-1 py-0.5 rounded">{variable.nodeName}</code>
                        </div>
                    )}
                </div>

                {variable.type !== "constant" && variable.nodeId && onNavigate && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                        onClick={(e) => {
                            e.stopPropagation()
                            onNavigate(variable.nodeId!)
                        }}
                    >
                        <ExternalLink className="h-3 w-3" />
                    </Button>
                )}
            </div>
        </div>
    )
}

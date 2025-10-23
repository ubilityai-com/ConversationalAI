

import { ChevronUp, X } from "lucide-react"
import { Button } from "../ui/button"

interface MinimizedViewProps {
    onToggleMinimize: () => void
  }
  
  export function MinimizedView({ onToggleMinimize }: MinimizedViewProps) {
    return (
      <div className="flex items-center justify-between px-4 py-3 bg-background">
        <span className="text-sm font-medium text-foreground">Variables</span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onToggleMinimize} className="h-8 w-8 p-0" title="Expand">
            <ChevronUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }
  
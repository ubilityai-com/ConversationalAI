
import { Sparkles } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip"
import { cn } from "../../lib/utils/utils"

interface UseAIIconProps {
  isUsingAI: boolean
  onClick: () => void
  disabled?: boolean
}

/**
 * AI mode toggle button component
 */
export function UseAIIcon({ isUsingAI, onClick, disabled }: UseAIIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isUsingAI ? "default" : "outline"}
            size="icon"
            className={cn(
              "h-8 w-8 ml-2",
              isUsingAI
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "border-purple-300 text-purple-600 hover:bg-purple-50",
            )}
            onClick={onClick}
            disabled={disabled}
          >
            <Sparkles className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{isUsingAI ? "Stop using AI" : "Use AI"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

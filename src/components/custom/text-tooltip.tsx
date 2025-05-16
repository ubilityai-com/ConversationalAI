import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

const TextOnlyTooltip = ({
    children,
    title,
    placement = "left",
}: {
    children: React.ReactNode
    title: string
    placement?: "left" | "right" | "top" | "bottom"
}) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent side={placement} className="bg-gray-700 text-white text-xs">
                {title}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
)
export default TextOnlyTooltip
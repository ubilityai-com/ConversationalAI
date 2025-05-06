import { LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';


const SelectUtilButton = ({
  onClick,
  Icon,
  tooltipText,
}: {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  Icon: LucideIcon;
  tooltipText?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="opacity-50 shrink-0 h-6 w-6 rounded-xs"
            size={'icon'}
            onClick={onClick}
          >
            <Icon className="w-4 h-4"></Icon>
          </Button>
        </TooltipTrigger>
        {tooltipText && (
          <TooltipContent side="bottom">{tooltipText}</TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

SelectUtilButton.displayName = 'SelectUtilButton';
export { SelectUtilButton };

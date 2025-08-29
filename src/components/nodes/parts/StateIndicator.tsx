import { Goal } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip';
import { NODE_CONFIG } from '../constants';
import { useNodeState } from '../hooks/useNodeState';
import { truncateText } from '../utils/textUtils';

interface StateIndicatorProps {
  id: string;
}

export const StateIndicator = React.memo(({ id }: StateIndicatorProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const nodeState = useNodeState(id);

  const hasState = Boolean(nodeState);
  const stateDescription = nodeState ?? "";

  const isTruncated = useMemo(
    () => stateDescription.length > NODE_CONFIG.TRUNCATION_LENGTH,
    [stateDescription.length]
  );

  const displayText = useMemo(() => {
    const fallbackText = "This node has specific purpose and state information configured.";
    const text = stateDescription || fallbackText;

    if (showFullDescription || !isTruncated) {
      return text;
    }
    return truncateText(text);
  }, [stateDescription, showFullDescription, isTruncated]);

  const handleToggleDescription = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullDescription(prev => !prev);
  }, []);

  if (!hasState) return null;

  return (
    <TooltipProvider>
      <Tooltip onOpenChange={(open) => !open || setShowFullDescription(false)}>
        <TooltipTrigger asChild>
          <div className="absolute top-2 right-2 z-10">
            <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center shadow-md border-2 border-white hover:bg-purple-600 transition-colors cursor-help">
              <Goal className="w-3 h-3 text-white" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          className="max-w-sm bg-gray-900 text-white border-gray-700"
          sideOffset={8}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="space-y-2">
            <div className="font-medium text-sm">Node Purpose</div>
            <div className="text-xs leading-relaxed whitespace-pre-line">
              {displayText}
            </div>
            {isTruncated && (
              <div className="border-t border-gray-600 pt-2">
                <button
                  className="text-xs text-blue-300 font-medium hover:text-blue-200 transition-colors"
                  onClick={handleToggleDescription}
                >
                  {showFullDescription ? "Show less" : "Show more"}
                </button>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

StateIndicator.displayName = 'StateIndicator';

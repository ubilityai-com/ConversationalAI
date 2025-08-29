
import React from 'react';

interface NodeIconProps {
  IconComponent: React.ComponentType<{ className?: string }> | null;
  color: string;
  type: string;
}

export const NodeIcon = React.memo(({ IconComponent, color, type }: NodeIconProps) => (
  <div
    className={`w-12 h-12 ${color} rounded-full flex items-center justify-center shadow-md flex-shrink-0`}
  >
    {IconComponent ? (
      <IconComponent className="w-6 h-6 text-white" />
    ) : (
      <img
        src={`/components-icons/${type}.png`}
        alt={`${type} icon`}
        className="w-7 h-7 object-contain"
      />
    )}
  </div>
));

NodeIcon.displayName = 'NodeIcon';

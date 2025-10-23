import { lazy, Suspense } from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface DynamicIconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof LucideIcons;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const IconComponent = lazy(() => 
    import('lucide-react').then((module) => ({
      default: module[name] as LucideIcon
    }))
  );
  
  return (
    <Suspense fallback={<div>Loading icon...</div>}>
      <IconComponent {...props} />
    </Suspense>
  );
};

export default DynamicIcon;
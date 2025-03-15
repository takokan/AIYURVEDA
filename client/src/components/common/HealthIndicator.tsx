
import { cn } from '@/lib/utils';

type HealthIndicatorProps = {
  value: number; // 0-100
  label: string;
  description?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export function HealthIndicator({
  value,
  label,
  description,
  className,
  size = 'md',
}: HealthIndicatorProps) {
  // Determine color based on value
  const getColor = () => {
    if (value >= 80) return 'text-veda-green';
    if (value >= 60) return 'text-veda-teal';
    if (value >= 40) return 'text-veda-blue';
    if (value >= 20) return 'text-veda-yellow';
    return 'text-veda-red';
  };

  // Determine background color based on value
  const getBgColor = () => {
    if (value >= 80) return 'bg-veda-green';
    if (value >= 60) return 'bg-veda-teal';
    if (value >= 40) return 'bg-veda-blue';
    if (value >= 20) return 'bg-veda-yellow';
    return 'bg-veda-red';
  };

  // Size class
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-20 h-20 text-xs';
      case 'lg': return 'w-40 h-40 text-base';
      default: return 'w-28 h-28 text-sm';
    }
  };

  // Font size for value
  const getValueSize = () => {
    switch (size) {
      case 'sm': return 'text-xl';
      case 'lg': return 'text-4xl';
      default: return 'text-2xl';
    }
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div 
        className={cn(
          'relative rounded-full flex items-center justify-center mb-2',
          getSizeClass()
        )}
      >
        {/* Background track */}
        <div className="absolute inset-0 rounded-full bg-secondary"></div>
        
        {/* Progress track (with stroke-dasharray trick) */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%" 
            cy="50%" 
            r="45%" 
            fill="none"
            stroke="currentColor"
            strokeWidth="5%"
            strokeLinecap="round"
            className={cn(getColor(), 'transition-all duration-1000 ease-out')}
            style={{
              strokeDasharray: '100 100',
              strokeDashoffset: 100 - value
            }}
          />
        </svg>
        
        {/* Value display */}
        <div className="z-10 flex flex-col items-center justify-center">
          <span className={cn('font-semibold', getValueSize())}>{value}</span>
        </div>
      </div>
      
      <h4 className="font-medium mb-1">{label}</h4>
      {description && <p className="text-muted-foreground text-xs text-center">{description}</p>}
    </div>
  );
}

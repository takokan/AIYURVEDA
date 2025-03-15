
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  delta?: number;
  icon?: ReactNode;
  className?: string;
  colorScheme?: 'green' | 'yellow' | 'red' | 'blue' | 'default';
};

export function StatCard({
  title,
  value,
  delta,
  icon,
  className,
  colorScheme = 'default',
}: StatCardProps) {
  const getColorScheme = () => {
    switch (colorScheme) {
      case 'green':
        return 'border-veda-green/20 bg-veda-green/5';
      case 'yellow':
        return 'border-veda-yellow/20 bg-veda-yellow/5';
      case 'red':
        return 'border-veda-red/20 bg-veda-red/5';
      case 'blue':
        return 'border-veda-blue/20 bg-veda-blue/5';
      default:
        return 'border-border bg-card';
    }
  };

  const getDeltaColor = () => {
    if (!delta) return 'text-muted-foreground';
    return delta > 0 ? 'text-veda-green' : 'text-veda-red';
  };

  const getDeltaIcon = () => {
    if (!delta) return null;
    return delta > 0 ? '↑' : '↓';
  };

  return (
    <div
      className={cn(
        'rounded-2xl border p-6 transition-all duration-200 hover:shadow-md',
        getColorScheme(),
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h4 className="mt-2 font-semibold text-2xl">{value}</h4>
          
          {delta !== undefined && (
            <p className={cn('mt-1 text-sm flex items-center', getDeltaColor())}>
              <span>{getDeltaIcon()}</span>
              <span className="ml-1">{Math.abs(delta)}%</span>
              <span className="ml-1 text-muted-foreground">from last week</span>
            </p>
          )}
        </div>
        
        {icon && (
          <div className="rounded-full p-2 bg-secondary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

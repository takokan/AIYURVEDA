
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type DoshaBalanceProps = {
  vata: number;  // 0-100
  pitta: number; // 0-100
  kapha: number; // 0-100
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (values: { vata: number; pitta: number; kapha: number }) => void;
};

export function DoshaBalance({
  vata: initialVata,
  pitta: initialPitta,
  kapha: initialKapha,
  className,
  size = 'md',
  interactive = false,
  onChange,
}: DoshaBalanceProps) {
  const [vata, setVata] = useState(initialVata);
  const [pitta, setPitta] = useState(initialPitta);
  const [kapha, setKapha] = useState(initialKapha);
  const [animationComplete, setAnimationComplete] = useState(false);

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-48 h-48';
      case 'lg': return 'w-96 h-96';
      default: return 'w-64 h-64';
    }
  };

  useEffect(() => {
    setVata(initialVata);
    setPitta(initialPitta);
    setKapha(initialKapha);
  }, [initialVata, initialPitta, initialKapha]);

  useEffect(() => {
    // Animation timing
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Notify parent of changes if onChange is provided
    if (onChange && animationComplete) {
      onChange({ vata, pitta, kapha });
    }
  }, [vata, pitta, kapha, onChange, animationComplete]);

  // Calculate triangle coordinates
  const total = vata + pitta + kapha;
  const normalizedVata = vata / total;
  const normalizedPitta = pitta / total;
  const normalizedKapha = kapha / total;

  // Triangle vertices (equilateral triangle)
  const triangleSide = 200; // base size
  const height = triangleSide * Math.sqrt(3) / 2;
  
  // Positions for the triangle vertices
  const topVertex = { x: triangleSide / 2, y: 0 };
  const leftVertex = { x: 0, y: height };
  const rightVertex = { x: triangleSide, y: height };
  
  // Calculate indicator position
  const indicatorX = 
    leftVertex.x * normalizedVata +
    topVertex.x * normalizedPitta +
    rightVertex.x * normalizedKapha;
    
  const indicatorY = 
    leftVertex.y * normalizedVata +
    topVertex.y * normalizedPitta +
    rightVertex.y * normalizedKapha;

  // Handle interactive dragging
  const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
    if (!interactive) return;
    
    const svgElement = event.currentTarget as SVGSVGElement;
    const svgRect = svgElement.getBoundingClientRect();
    
    // Get mouse/touch position
    let clientX, clientY;
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    
    // Calculate relative position in SVG
    const x = clientX - svgRect.left;
    const y = clientY - svgRect.top;
    
    // Calculate barycentric coordinates
    const denominator = 
      (leftVertex.y - topVertex.y) * (rightVertex.x - topVertex.x) + 
      (topVertex.x - leftVertex.x) * (rightVertex.y - topVertex.y);
    
    const a = 
      ((y - topVertex.y) * (rightVertex.x - topVertex.x) + 
      (topVertex.x - x) * (rightVertex.y - topVertex.y)) / denominator;
    
    const b = 
      ((y - rightVertex.y) * (topVertex.x - leftVertex.x) + 
      (rightVertex.x - x) * (topVertex.y - leftVertex.y)) / -denominator;
    
    const c = 1 - a - b;
    
    // Clamp values to ensure they're valid
    const clampedA = Math.max(0, Math.min(1, a));
    const clampedB = Math.max(0, Math.min(1, b));
    const clampedC = Math.max(0, Math.min(1, 1 - clampedA - clampedB));
    
    // Normalize to ensure sum is 100
    const sum = clampedA + clampedB + clampedC;
    
    const newVata = Math.round((clampedA / sum) * 100);
    const newPitta = Math.round((clampedC / sum) * 100);
    const newKapha = Math.round((clampedB / sum) * 100);
    
    setVata(newVata);
    setPitta(newPitta);
    setKapha(newKapha);
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <svg 
        className={cn(
          getSizeClass(),
          interactive ? 'cursor-pointer' : '',
          'transition-all duration-500 ease-out'
        )}
        viewBox="0 0 200 200"
        onMouseMove={interactive ? handleDrag : undefined}
        onTouchMove={interactive ? handleDrag : undefined}
      >
        {/* Triangle */}
        <polygon 
          points={`${topVertex.x},${topVertex.y} ${leftVertex.x},${leftVertex.y} ${rightVertex.x},${rightVertex.y}`}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1"
        />
        
        {/* Element labels */}
        <text x={topVertex.x} y={topVertex.y - 10} textAnchor="middle" fill="currentColor" fontSize="14">
          Pitta (Fire)
        </text>
        <text x={leftVertex.x - 10} y={leftVertex.y} textAnchor="end" fill="currentColor" fontSize="14">
          Vata (Air)
        </text>
        <text x={rightVertex.x + 10} y={rightVertex.y} textAnchor="start" fill="currentColor" fontSize="14">
          Kapha (Earth)
        </text>
        
        {/* Indicator dot */}
        <circle 
          cx={indicatorX} 
          cy={indicatorY} 
          r="5"
          fill="currentColor"
          className={cn(
            'transition-all duration-1000 ease-out',
            animationComplete ? 'opacity-100' : 'opacity-0'
          )}
        />
        
        {/* Indicator lines */}
        <line 
          x1={topVertex.x} y1={topVertex.y} 
          x2={indicatorX} y2={indicatorY}
          stroke="#FF9800"
          strokeWidth="1"
          strokeDasharray="3,3"
          className={cn(
            'transition-all duration-1000 ease-out',
            animationComplete ? 'opacity-70' : 'opacity-0'
          )}
        />
        <line 
          x1={leftVertex.x} y1={leftVertex.y} 
          x2={indicatorX} y2={indicatorY}
          stroke="#2196F3"
          strokeWidth="1"
          strokeDasharray="3,3"
          className={cn(
            'transition-all duration-1000 ease-out',
            animationComplete ? 'opacity-70' : 'opacity-0'
          )}
        />
        <line 
          x1={rightVertex.x} y1={rightVertex.y} 
          x2={indicatorX} y2={indicatorY}
          stroke="#4CAF50"
          strokeWidth="1"
          strokeDasharray="3,3"
          className={cn(
            'transition-all duration-1000 ease-out',
            animationComplete ? 'opacity-70' : 'opacity-0'
          )}
        />
      </svg>
      
      <div className="flex justify-between w-full mt-4 text-sm">
        <div className="flex flex-col items-center">
          <span className="font-medium" style={{ color: '#2196F3' }}>Vata</span>
          <span>{vata}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium" style={{ color: '#FF9800' }}>Pitta</span>
          <span>{pitta}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium" style={{ color: '#4CAF50' }}>Kapha</span>
          <span>{kapha}%</span>
        </div>
      </div>
    </div>
  );
}


import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type PulseVisualizerProps = {
  data: number[];
  height?: number;
  width?: number;
  color?: string;
  className?: string;
  animate?: boolean;
};

export function PulseVisualizer({
  data,
  height = 100,
  width = 300,
  color = '#1A73E8',
  className,
  animate = true,
}: PulseVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = svgRef.current;
    // Clear existing path
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Normalize data between 0 and 1
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    const normalizedData = data.map(value => 
      range === 0 ? 0.5 : (value - minValue) / range
    );

    // Create path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Calculate points
    const points: [number, number][] = normalizedData.map((value, index) => [
      (index / (data.length - 1)) * width,
      (1 - value) * height,
    ]);
    
    // Create path command
    let d = `M ${points[0][0]},${points[0][1]}`;
    
    for (let i = 1; i < points.length; i++) {
      const xc = (points[i][0] + points[i-1][0]) / 2;
      const yc = (points[i][1] + points[i-1][1]) / 2;
      d += ` Q ${points[i-1][0]},${points[i-1][1]} ${xc},${yc}`;
    }
    
    // Last point
    const last = points[points.length - 1];
    d += ` L ${last[0]},${last[1]}`;
    
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    
    if (animate) {
      // Create animation
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.getBoundingClientRect(); // Trigger reflow
      path.style.transition = 'stroke-dashoffset 1s ease-in-out';
      path.style.strokeDashoffset = '0';
    }
    
    svg.appendChild(path);
    
    // Add a gradient
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'pulse-gradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '0%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', color);
    stop1.setAttribute('stop-opacity', '0.2');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', color);
    stop2.setAttribute('stop-opacity', '1');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // Add area below the line
    const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let areaD = d + ` L ${width},${height} L 0,${height} Z`;
    area.setAttribute('d', areaD);
    area.setAttribute('fill', 'url(#pulse-gradient)');
    area.setAttribute('fill-opacity', '0.2');
    
    // Insert area before line for proper layering
    svg.insertBefore(area, path);
    
  }, [data, height, width, color, animate]);

  return (
    <svg 
      ref={svgRef} 
      className={cn('overflow-visible', className)}
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    />
  );
}

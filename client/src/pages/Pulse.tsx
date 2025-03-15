
import { useEffect, useState } from 'react';
import { Activity, Heart, ThermometerSnowflake, Droplets, Flame, Wind, Leaf } from 'lucide-react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { StatCard } from '@/components/common/StatCard';
import { PulseVisualizer } from '@/components/common/PulseVisualizer';
import { DoshaBalance } from '@/components/common/DoshaBalance';
import { HealthIndicator } from '@/components/common/HealthIndicator';

const Pulse = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'day' | 'week' | 'month'>('day');
  
  // Generate random pulse data for visualization
  const generatePulseData = (length: number) => {
    return Array.from({ length }, () => Math.random() * 0.5 + 0.5);
  };
  
  const pulseData = {
    day: generatePulseData(100),
    week: generatePulseData(100),
    month: generatePulseData(100)
  };
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        <div className="container px-4 md:px-6 py-6 md:py-10">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">Pulse+ Dashboard</h1>
              <p className="text-muted-foreground">Real-time health monitoring and Ayurvedic analysis</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button
                onClick={() => setSelectedTimeframe('day')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  selectedTimeframe === 'day'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setSelectedTimeframe('week')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  selectedTimeframe === 'week'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setSelectedTimeframe('month')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  selectedTimeframe === 'month'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Month
              </button>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Heart Rate"
              value="72 BPM"
              delta={2}
              icon={<Heart className="h-4 w-4" />}
              colorScheme="green"
              className="animate-fade-in"
              
            />
            <StatCard
              title="Body Temperature"
              value="98.6°F"
              delta={-0.2}
              icon={<ThermometerSnowflake className="h-4 w-4" />}
              colorScheme="blue"
              className="animate-fade-in [animation-delay:100ms]"
            />
            <StatCard
              title="Hydration"
              value="92%"
              delta={5}
              icon={<Droplets className="h-4 w-4" />}
              colorScheme="blue"
              className="animate-fade-in [animation-delay:200ms]"
            />
            <StatCard
              title="Overall Wellness"
              value="89/100"
              delta={3}
              icon={<Activity className="h-4 w-4" />}
              colorScheme="green"
              className="animate-fade-in [animation-delay:300ms]"
            />
          </div>
          
          {/* Pulse Visualization */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 veda-card animate-fade-in [animation-delay:400ms]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium">Pulse Reading</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-veda-green">Optimal</span>
                  <div className="h-2 w-2 rounded-full bg-veda-green"></div>
                </div>
              </div>
              
              <div className="relative h-[300px] w-full">
                <PulseVisualizer 
                  data={pulseData[selectedTimeframe]} 
                  width={800} 
                  height={300}
                  color="#1A73E8"
                  className="w-full"
                />
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Pulse Rate</p>
                  <p className="font-medium">72 BPM</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Variability</p>
                  <p className="font-medium">67 ms</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Quality</p>
                  <p className="font-medium">Strong & Regular</p>
                </div>
              </div>
            </div>
            
            <div className="veda-card animate-fade-in [animation-delay:500ms]">
              <h2 className="mb-4 text-lg font-medium">Dosha Balance</h2>
              <DoshaBalance
                vata={30}
                pitta={40}
                kapha={30}
                size="lg"
                interactive
                className="mx-auto"
              />
            </div>
          </div>
          
          {/* Health Metrics */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="veda-card animate-fade-in [animation-delay:600ms]">
              <div className="mb-4 flex items-center space-x-2">
                <Wind className="h-5 w-5 text-veda-blue" />
                <h2 className="text-lg font-medium">Vata Health</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <HealthIndicator
                  value={85}
                  label="Movement"
                  description="Joint mobility and circulation"
                  size="sm"
                />
                <HealthIndicator
                  value={92}
                  label="Sleep"
                  description="Sleep quality and patterns"
                  size="sm"
                />
                <HealthIndicator
                  value={78}
                  label="Nervous System"
                  description="Mental clarity and calmness"
                  size="sm"
                />
                <HealthIndicator
                  value={88}
                  label="Energy"
                  description="Daily vitality levels"
                  size="sm"
                />
              </div>
            </div>
            
            <div className="veda-card animate-fade-in [animation-delay:700ms]">
              <div className="mb-4 flex items-center space-x-2">
                <Flame className="h-5 w-5 text-veda-orange" />
                <h2 className="text-lg font-medium">Pitta Health</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <HealthIndicator
                  value={90}
                  label="Digestion"
                  description="Digestive fire strength"
                  size="sm"
                />
                <HealthIndicator
                  value={85}
                  label="Metabolism"
                  description="Nutrient processing"
                  size="sm"
                />
                <HealthIndicator
                  value={95}
                  label="Vision"
                  description="Visual acuity"
                  size="sm"
                />
                <HealthIndicator
                  value={88}
                  label="Temperature"
                  description="Body heat regulation"
                  size="sm"
                />
              </div>
            </div>
            
            <div className="veda-card animate-fade-in [animation-delay:800ms]">
              <div className="mb-4 flex items-center space-x-2">
                <Leaf className="h-5 w-5 text-veda-green" />
                <h2 className="text-lg font-medium">Kapha Health</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <HealthIndicator
                  value={92}
                  label="Strength"
                  description="Physical endurance"
                  size="sm"
                />
                <HealthIndicator
                  value={88}
                  label="Immunity"
                  description="Defense mechanisms"
                  size="sm"
                />
                <HealthIndicator
                  value={95}
                  label="Stability"
                  description="Emotional balance"
                  size="sm"
                />
                <HealthIndicator
                  value={90}
                  label="Structure"
                  description="Body composition"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pulse;

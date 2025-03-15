
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Activity, Heart, Zap, Layers } from 'lucide-react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { PulseVisualizer } from '@/components/common/PulseVisualizer';

const Index = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  
  // Generate random pulse data for visualization
  const generatePulseData = (length: number) => {
    return Array.from({ length }, () => Math.random() * 0.5 + 0.5);
  };
  
  const pulseData = generatePulseData(100);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 
                    className={`text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none max-w-xl text-gradient transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                  >
                    Vital-Enhanced Digital Ayurveda
                  </h1>
                  <p 
                    className={`max-w-[600px] text-muted-foreground md:text-xl transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  >
                    Bridging ancient Ayurvedic wisdom with modern medical science through AI and real-time biometric data.
                  </p>
                </div>
                <div 
                  className={`flex flex-col gap-2 min-[400px]:flex-row transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <button 
                    onClick={() => navigate('/pulse')}
                    className="veda-button-primary flex items-center justify-center gap-2"
                  >
                    <span>Explore Dashboard</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => navigate('/harmony')}
                    className="veda-button-secondary"
                  >
                    View Products
                  </button>
                </div>
              </div>
              <div 
                className={`relative flex items-center justify-center transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              >
                <div className="relative h-[350px] w-full max-w-[500px] overflow-hidden rounded-2xl shadow-xl neo-glass p-6">
                  <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent opacity-40"></div>
                  <div className="h-full w-full">
                    <div className="mb-6">
                      <h3 className="font-medium">Realtime Pulse Reading</h3>
                      <p className="text-sm text-muted-foreground">Your vital signs show optimal balance</p>
                    </div>
                    <div className="flex items-center justify-center mt-8">
                      <PulseVisualizer 
                        data={pulseData} 
                        width={400} 
                        height={150} 
                        color="#1A73E8"
                      />
                    </div>
                    <div className="mt-8 flex justify-between text-sm">
                      <div>
                        <p className="text-muted-foreground">Heart Rate</p>
                        <p className="font-medium text-lg">72 BPM</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Variability</p>
                        <p className="font-medium text-lg">67 ms</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Regularity</p>
                        <p className="font-medium text-lg">98%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section 
          className={`py-16 md:py-24 transition-opacity duration-1000 delay-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="container px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gradient">Experience VEDA.ai</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Four interconnected modules for a complete wellness journey
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div 
                className="veda-card neo-glass group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate('/pulse')}
              >
                <div className="absolute top-0 right-0 p-2">
                  <Activity className="h-6 w-6 text-veda-green" />
                </div>
                <h3 className="font-medium text-lg mb-2">Pulse+</h3>
                <p className="text-muted-foreground">Advanced diagnostics dashboard with real-time biometric monitoring and Ayurvedic analysis.</p>
                <div className="mt-4 flex items-center text-sm text-primary">
                  <span>Explore Dashboard</span>
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div 
                className="veda-card neo-glass group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate('/cosmos')}
              >
                <div className="absolute top-0 right-0 p-2">
                  <Layers className="h-6 w-6 text-veda-blue" />
                </div>
                <h3 className="font-medium text-lg mb-2">Cosmos</h3>
                <p className="text-muted-foreground">Immersive 3D experience exploring your body's systems through Ayurvedic principles.</p>
                <div className="mt-4 flex items-center text-sm text-primary">
                  <span>Explore Body</span>
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div 
                className="veda-card neo-glass group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate('/harmony')}
              >
                <div className="absolute top-0 right-0 p-2">
                  <Heart className="h-6 w-6 text-veda-red" />
                </div>
                <h3 className="font-medium text-lg mb-2">Harmony</h3>
                <p className="text-muted-foreground">Personalized product recommendations and lifestyle guidance based on your unique constitution.</p>
                <div className="mt-4 flex items-center text-sm text-primary">
                  <span>View Products</span>
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div 
                className="veda-card neo-glass group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate('/sangha')}
              >
                <div className="absolute top-0 right-0 p-2">
                  <Zap className="h-6 w-6 text-veda-yellow" />
                </div>
                <h3 className="font-medium text-lg mb-2">Sangha</h3>
                <p className="text-muted-foreground">Connect with Ayurvedic practitioners, book consultations, and get expert guidance.</p>
                <div className="mt-4 flex items-center text-sm text-primary">
                  <span>Book Consultation</span>
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-veda-blue/5 to-veda-teal/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gradient">
                  Begin Your Wellness Journey Today
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Experience the perfect harmony of ancient wisdom and modern technology.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <button 
                  onClick={() => navigate('/pulse')}
                  className="veda-button-primary"
                >
                  Get Started
                </button>
                <button 
                  onClick={() => navigate('/sangha')}
                  className="veda-button-secondary"
                >
                  Talk to an Expert
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

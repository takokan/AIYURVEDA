
import { useState, useEffect } from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm dark:bg-black/80' : 'bg-transparent',
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gradient">VEDA.ai</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/pulse" className="text-sm font-medium hover:text-primary transition-colors">
              Pulse+
            </Link>
            <Link to="/dosha" className="text-sm font-medium hover:text-primary transition-colors">
              Cosmos
            </Link>
            <Link to="/harmony" className="text-sm font-medium hover:text-primary transition-colors">
              Harmony
            </Link>
            <Link to="/sangha" className="text-sm font-medium hover:text-primary transition-colors">
              Sangha
            </Link>
          </nav>
        </div>

        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <Link to="/profile" className="p-2 rounded-full hover:bg-secondary transition-colors">
            <User className="w-5 h-5" />
          </Link>
          <button 
            className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-black p-4 shadow-lg animate-slide-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/pulse" 
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pulse+
            </Link>
            <Link 
              to="/cosmos" 
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cosmos
            </Link>
            <Link 
              to="/harmony" 
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Harmony
            </Link>
            <Link 
              to="/sangha" 
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sangha
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

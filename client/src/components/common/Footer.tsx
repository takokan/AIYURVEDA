
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold text-gradient">VEDA.ai</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Vital-Enhanced Digital Ayurveda: Bridging ancient wisdom with modern technology for holistic wellness.
            </p>
          </div>
          
          <div>
            <h6 className="font-medium mb-4">Explore</h6>
            <ul className="space-y-3">
              <li>
                <Link to="/pulse" className="text-sm hover:text-primary transition-colors">
                  Pulse+ Dashboard
                </Link>
              </li>
              <li>
                <Link to="/cosmos" className="text-sm hover:text-primary transition-colors">
                  Cosmos Experience
                </Link>
              </li>
              <li>
                <Link to="/harmony" className="text-sm hover:text-primary transition-colors">
                  Harmony Store
                </Link>
              </li>
              <li>
                <Link to="/sangha" className="text-sm hover:text-primary transition-colors">
                  Sangha Consultation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-medium mb-4">Resources</h6>
            <ul className="space-y-3">
              <li>
                <Link to="/learn" className="text-sm hover:text-primary transition-colors">
                  Learn Ayurveda
                </Link>
              </li>
              <li>
                <Link to="/research" className="text-sm hover:text-primary transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-medium mb-4">Company</h6>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-sm hover:text-primary transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} VEDA.ai. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Instagram
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

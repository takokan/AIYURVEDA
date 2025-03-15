
import { Calendar, Video, MessageSquare, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type PractitionerCardProps = {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  rating: number;
  experience: string;
  nextAvailable?: string;
  languages?: string[];
  className?: string;
};

export function PractitionerCard({
  id,
  name,
  title,
  specialty,
  image,
  rating,
  experience,
  nextAvailable,
  languages,
  className,
}: PractitionerCardProps) {
  return (
    <div
      className={cn(
        'veda-card group overflow-hidden',
        className
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="w-full md:w-1/4">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
        
        <div className="w-full md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="font-medium text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground">{title} • {specialty}</p>
              
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-4 w-4',
                        i < Math.floor(rating) ? 'fill-veda-yellow text-veda-yellow' : 'fill-none text-muted-foreground'
                      )}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
                </div>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{experience} experience</span>
              </div>
              
              {languages && languages.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {languages.map(language => (
                    <span 
                      key={language} 
                      className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {nextAvailable && (
              <div className="mt-4 md:mt-0 md:ml-4 md:text-right">
                <span className="block text-sm text-muted-foreground">Next Available</span>
                <span className="block font-medium">{nextAvailable}</span>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Link 
              to={`/sangha/book/${id}`}
              className="veda-button-primary flex items-center"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book
            </Link>
            <Link 
              to={`/sangha/video/${id}`}
              className="veda-button-secondary flex items-center"
            >
              <Video className="mr-2 h-4 w-4" />
              Video Call
            </Link>
            <Link 
              to={`/sangha/chat/${id}`}
              className="veda-button-ghost flex items-center"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

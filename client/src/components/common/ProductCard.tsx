
import { useState } from 'react';
import { ShoppingCart, Heart, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  doshaFit?: {
    vata?: number;
    pitta?: number;
    kapha?: number;
  };
  benefits?: string[];
  ingredients?: string[];
  className?: string;
};

export function ProductCard({
  id,
  name,
  description,
  price,
  image,
  doshaFit,
  benefits,
  ingredients,
  className,
}: ProductCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const addToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Added to cart:', id);
    // Add actual cart functionality here
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg',
        className
      )}
    >
      <div 
        className="relative aspect-square overflow-hidden"
        onClick={toggleDetails}
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dosha fit indicators */}
        {doshaFit && (
          <div className="absolute bottom-4 left-4 flex space-x-1">
            {doshaFit.vata !== undefined && (
              <span 
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium',
                  doshaFit.vata > 70 ? 'bg-veda-blue text-white' : 'bg-veda-blue/20 text-veda-blue'
                )}
                title={`Vata: ${doshaFit.vata}% compatible`}
              >
                V
              </span>
            )}
            {doshaFit.pitta !== undefined && (
              <span 
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium',
                  doshaFit.pitta > 70 ? 'bg-veda-orange text-white' : 'bg-veda-orange/20 text-veda-orange'
                )}
                title={`Pitta: ${doshaFit.pitta}% compatible`}
              >
                P
              </span>
            )}
            {doshaFit.kapha !== undefined && (
              <span 
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium',
                  doshaFit.kapha > 70 ? 'bg-veda-green text-white' : 'bg-veda-green/20 text-veda-green'
                )}
                title={`Kapha: ${doshaFit.kapha}% compatible`}
              >
                K
              </span>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="absolute right-4 top-4 flex flex-col space-y-2">
          <button
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white',
              isWishlisted ? 'text-veda-red' : 'text-gray-600'
            )}
            onClick={toggleWishlist}
          >
            <Heart className={cn('h-4 w-4', isWishlisted ? 'fill-veda-red' : '')} />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white text-gray-600"
            onClick={toggleDetails}
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium">{name}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold">${price.toFixed(2)}</span>
          <button
            className="veda-button-primary p-2"
            onClick={addToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Expanded details panel */}
      {showDetails && (
        <div 
          className="absolute inset-0 flex flex-col overflow-auto bg-white/95 dark:bg-black/95 backdrop-blur-sm p-6 animate-fade-in"
          onClick={() => setShowDetails(false)}
        >
          <h3 className="font-medium mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          
          {benefits && benefits.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Benefits</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}
          
          {ingredients && ingredients.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Key Ingredients</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
          
          {doshaFit && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Dosha Compatibility</h4>
              <div className="flex items-center space-x-4 text-sm">
                {doshaFit.vata !== undefined && (
                  <div className="flex items-center">
                    <span className="w-16">Vata:</span>
                    <div className="ml-2 h-2 w-24 rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-veda-blue"
                        style={{ width: `${doshaFit.vata}%` }}
                      />
                    </div>
                  </div>
                )}
                {doshaFit.pitta !== undefined && (
                  <div className="flex items-center">
                    <span className="w-16">Pitta:</span>
                    <div className="ml-2 h-2 w-24 rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-veda-orange"
                        style={{ width: `${doshaFit.pitta}%` }}
                      />
                    </div>
                  </div>
                )}
                {doshaFit.kapha !== undefined && (
                  <div className="flex items-center">
                    <span className="w-16">Kapha:</span>
                    <div className="ml-2 h-2 w-24 rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-veda-green"
                        style={{ width: `${doshaFit.kapha}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">${price.toFixed(2)}</span>
              <button
                className="veda-button-primary"
                onClick={addToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

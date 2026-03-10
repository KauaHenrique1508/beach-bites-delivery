import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';
import type { Restaurant } from '@/types';

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="block group">
      <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
        <div className="relative h-40 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-sunset fill-sunset" />
            <span className="text-xs font-semibold text-foreground">{restaurant.rating}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-display font-semibold text-foreground text-lg">{restaurant.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-medium text-ocean bg-ocean/10 px-2 py-0.5 rounded-full">{restaurant.cuisine}</span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs">{restaurant.deliveryTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;

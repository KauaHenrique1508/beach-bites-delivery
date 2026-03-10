import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Star } from 'lucide-react';
import { restaurants, menuItems } from '@/data/mockData';
import MenuItemCard from '@/components/MenuItemCard';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

const RestaurantMenu = () => {
  const { id } = useParams();
  const restaurant = restaurants.find(r => r.id === id);
  const items = menuItems.filter(m => m.restaurantId === id);
  const { itemCount, total } = useCart();

  if (!restaurant) {
    return <div className="p-8 text-center text-muted-foreground">Restaurant not found</div>;
  }

  const categories = [...new Set(items.map(i => i.category))];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header image */}
      <div className="relative h-44">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <Link to="/" className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm rounded-full p-2">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </Link>
        <div className="absolute bottom-4 left-4">
          <h1 className="font-display font-bold text-xl text-primary-foreground">{restaurant.name}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-primary-foreground/80 text-xs">
              <Star className="h-3.5 w-3.5 fill-sunset text-sunset" /> {restaurant.rating}
            </span>
            <span className="flex items-center gap-1 text-primary-foreground/80 text-xs">
              <Clock className="h-3.5 w-3.5" /> {restaurant.deliveryTime}
            </span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-4 py-4 space-y-6">
        {categories.map(cat => (
          <div key={cat}>
            <h2 className="font-display font-semibold text-foreground mb-3">{cat}</h2>
            <div className="space-y-3">
              {items.filter(i => i.category === cat).map(item => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating cart bar */}
      {itemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border p-4 z-50">
          <Link to="/cart">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-coral-light h-12 rounded-xl font-display font-semibold">
              View Cart ({itemCount}) · R$ {total.toFixed(2)}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;

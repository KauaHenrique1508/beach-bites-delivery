import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { MenuItem } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const MenuItemCard = ({ item }: { item: MenuItem }) => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="flex gap-3 bg-card rounded-xl p-3 shadow-sm">
      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-semibold text-foreground text-sm">{item.name}</h4>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-primary text-sm">R$ {item.price.toFixed(2)}</span>
          <Button size="sm" onClick={handleAdd} className="h-8 w-8 p-0 rounded-full bg-primary hover:bg-coral-light text-primary-foreground">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;

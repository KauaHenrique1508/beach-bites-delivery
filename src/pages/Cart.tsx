import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const Cart = () => {
  const { items, total, updateQuantity, removeItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <p className="text-6xl mb-4">🏖️</p>
        <h2 className="font-display font-bold text-xl text-foreground">Your cart is empty</h2>
        <p className="text-muted-foreground text-sm mt-2">Add some delicious beach food!</p>
        <Link to="/">
          <Button className="mt-6 bg-primary text-primary-foreground hover:bg-coral-light">Browse Restaurants</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-display font-bold text-xl text-foreground">Your Cart</h1>
        </div>

        <div className="space-y-3">
          {items.map(({ menuItem, quantity }) => (
            <div key={menuItem.id} className="bg-card rounded-xl p-3 flex gap-3 shadow-sm">
              <img src={menuItem.image} alt={menuItem.name} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-semibold text-sm text-foreground">{menuItem.name}</h4>
                <p className="text-primary font-bold text-sm mt-1">R$ {(menuItem.price * quantity).toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => updateQuantity(menuItem.id, quantity - 1)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-semibold w-6 text-center text-foreground">{quantity}</span>
                  <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => updateQuantity(menuItem.id, quantity + 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 ml-auto text-destructive" onClick={() => removeItem(menuItem.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-4 mt-6 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="font-display font-semibold text-foreground">Total</span>
            <span className="font-display font-bold text-xl text-primary">R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border p-4 z-50">
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-coral-light h-12 rounded-xl font-display font-semibold"
          onClick={() => navigate(isAuthenticated ? '/checkout' : '/login?redirect=/checkout')}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;

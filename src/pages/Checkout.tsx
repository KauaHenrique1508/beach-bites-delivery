import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import BeachLocationInput from '@/components/BeachLocationInput';
import type { BeachLocation } from '@/types';
import { toast } from 'sonner';

const Checkout = () => {
  const { items, total, placeOrder } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [location, setLocation] = useState<BeachLocation | null>(null);

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  const handleOrder = () => {
    if (!location) {
      toast.error('Please set your beach location first!');
      return;
    }
    const order = placeOrder(location, user?.name || 'Guest');
    toast.success('Order placed! 🎉');
    navigate(`/orders`);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-display font-bold text-xl text-foreground">Checkout</h1>
        </div>

        {/* Order summary */}
        <div className="bg-card rounded-xl p-4 shadow-sm mb-6">
          <h3 className="font-display font-semibold text-foreground mb-3">Order Summary</h3>
          {items.map(({ menuItem, quantity }) => (
            <div key={menuItem.id} className="flex justify-between text-sm py-1.5 border-b border-border last:border-0">
              <span className="text-foreground">{quantity}x {menuItem.name}</span>
              <span className="text-muted-foreground">R$ {(menuItem.price * quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-foreground mt-3 pt-2 border-t border-border">
            <span>Total</span>
            <span className="text-primary">R$ {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Beach location */}
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <BeachLocationInput onLocationSet={setLocation} location={location} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border p-4 z-50">
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-coral-light h-12 rounded-xl font-display font-semibold"
          onClick={handleOrder}
          disabled={!location}
        >
          Place Order · R$ {total.toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;

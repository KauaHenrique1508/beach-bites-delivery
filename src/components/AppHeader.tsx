import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, UtensilsCrossed, LogOut, Waves } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const AppHeader = () => {
  const { itemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Waves className="h-6 w-6 text-ocean" />
          <span className="font-display font-bold text-lg text-foreground">BeachBite</span>
        </Link>

        <div className="flex items-center gap-2">
          {isAuthenticated && user?.role === 'restaurant' && (
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="text-muted-foreground">
              <UtensilsCrossed className="h-4 w-4" />
            </Button>
          )}

          {isAuthenticated && (
            <Button variant="ghost" size="sm" onClick={() => navigate('/orders')} className="text-muted-foreground">
              Orders
            </Button>
          )}

          <Link to="/cart" className="relative p-2">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="text-muted-foreground">
              <User className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

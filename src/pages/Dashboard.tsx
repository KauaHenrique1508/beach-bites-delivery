import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import type { OrderStatus } from '@/types';

const Dashboard = () => {
  const { orders, updateOrderStatus } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <ChefHat className="h-5 w-5 text-primary" />
          <h1 className="font-display font-bold text-xl text-foreground">Restaurant Dashboard</h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🍽️</p>
            <p className="text-muted-foreground">No incoming orders</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-card rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-semibold text-foreground">Order #{order.id.slice(-4)}</span>
                  <OrderStatusBadge status={order.status} />
                </div>

                <p className="text-xs text-muted-foreground mb-2">Customer: {order.customerName}</p>

                <div className="space-y-1 text-sm text-foreground bg-secondary/50 rounded-lg p-3 mb-3">
                  {order.items.map(({ menuItem, quantity }) => (
                    <div key={menuItem.id} className="flex justify-between">
                      <span>{quantity}x {menuItem.name}</span>
                      <span className="text-muted-foreground">R$ {(menuItem.price * quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-border mt-2 pt-2 font-bold flex justify-between">
                    <span>Total</span>
                    <span className="text-primary">R$ {order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-start gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <span>{order.location.type === 'text' ? order.location.description : `GPS: ${order.location.coordinates?.lat.toFixed(4)}, ${order.location.coordinates?.lng.toFixed(4)}`}</span>
                </div>

                <Select value={order.status} onValueChange={(val) => updateOrderStatus(order.id, val as OrderStatus)}>
                  <SelectTrigger className="bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="delivering">Delivering</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

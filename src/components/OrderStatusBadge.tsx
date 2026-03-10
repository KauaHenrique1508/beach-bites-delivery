import type { OrderStatus } from '@/types';

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-sunset/15 text-sunset' },
  preparing: { label: 'Preparing', className: 'bg-ocean/15 text-ocean' },
  delivering: { label: 'On the way', className: 'bg-primary/15 text-primary' },
  delivered: { label: 'Delivered', className: 'bg-tropical/15 text-tropical' },
};

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  );
};

export default OrderStatusBadge;

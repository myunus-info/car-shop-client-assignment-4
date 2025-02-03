import React from 'react';
import { Card, Steps } from 'antd';
import { Clock, CreditCard, Truck, CheckCircle, XCircle, Package } from 'lucide-react';

export type OrderStatus = 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';

interface OrderStatusProgressProps {
  currentStatus: OrderStatus;
}

const OrderStatusProgress: React.FC<OrderStatusProgressProps> = ({ currentStatus }) => {
  const statuses: OrderStatus[] = ['Pending', 'Paid', 'Shipped', 'Completed'];

  const currentStep = statuses.indexOf(currentStatus);

  return (
    <div style={{ maxWidth: '800px', margin: '24px auto' }}>
      <Card title="Order Status">
        <Steps
          current={currentStatus === 'Cancelled' ? -1 : currentStep}
          status={currentStatus === 'Cancelled' ? 'error' : 'process'}
          items={
            currentStatus === 'Cancelled'
              ? [
                  {
                    title: 'Order Placed',
                    icon: <Package size={24} />,
                  },
                  {
                    title: 'Cancelled',
                    status: 'error',
                    icon: <XCircle size={24} color="red" />,
                  },
                ]
              : [
                  {
                    title: 'Pending',
                    icon: <Clock size={24} />,
                  },
                  {
                    title: 'Paid',
                    icon: <CreditCard size={24} />,
                  },
                  {
                    title: 'Shipped',
                    icon: <Truck size={24} />,
                  },
                  {
                    title: 'Completed',
                    icon: <CheckCircle size={24} />,
                  },
                ]
          }
        />
      </Card>
    </div>
  );
};

export default OrderStatusProgress;

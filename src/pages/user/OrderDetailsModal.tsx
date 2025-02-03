import { Card, Tag, Space, Descriptions, Badge, Button, Modal } from 'antd';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import OrderStatusProgress, { OrderStatus } from './OrderStatus';
import { useState } from 'react';

export interface Transaction {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export interface Product {
  product: string;
  quantity: number;
  _id: string;
}

export interface Order {
  transaction: Transaction;
  _id: string;
  user: string;
  products: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const OrderDetailsModal = ({ data }: { data: Order }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button type="primary" icon={<Eye size={16} />} onClick={() => handleViewDetails()}>
        View Details
      </Button>
      <Modal
        title="Order Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <OrderStatusProgress currentStatus={data?.status as OrderStatus} />
          <Card title="Customer Information">
            <Descriptions column={1}>
              <Descriptions.Item label="User ID">{data?.user}</Descriptions.Item>
              <Descriptions.Item label="Order Date">
                {format(new Date(data?.createdAt), 'PPpp')}
              </Descriptions.Item>
              <Descriptions.Item label="Last Updated">
                {format(new Date(data?.updatedAt), 'PPpp')}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Order Summary">
            <Descriptions column={1}>
              <Descriptions.Item label="Total Price">
                ${data?.totalPrice.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Badge
                  status={data?.status === 'Pending' ? 'processing' : 'success'}
                  text={data?.status}
                />
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Products">
            <Space direction="vertical">
              {data?.products.map((product, index) => (
                <div key={index}>
                  <Tag color="blue">Product ID: {product?.product}</Tag>
                  <Tag color="green">Quantity: {product?.quantity}</Tag>
                </div>
              ))}
            </Space>
          </Card>

          <Card title="Transaction Details">
            <Descriptions column={1}>
              <Descriptions.Item label="Transaction ID">{data?.transaction?.id}</Descriptions.Item>
              <Descriptions.Item label="Payment Method">
                {data?.transaction?.method}
              </Descriptions.Item>
              <Descriptions.Item label="Transaction Date">
                {data?.transaction?.date_time}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={data?.transaction?.bank_status === 'Success' ? 'green' : 'red'}>
                  {data?.transaction?.bank_status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Space>
      </Modal>
    </>
  );
};

export default OrderDetailsModal;

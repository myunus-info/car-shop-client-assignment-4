import { Table, Card, Typography, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';
import { useGetAllOrdersQuery } from '../../../store/features/order/orderApi';
import UpdateOrderStatusModal from './UpdateOrderStatusModal';

const { Title } = Typography;

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

const ManageOrders: React.FC = () => {
  const { data: orderData, isFetching } = useGetAllOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const tableData = orderData?.data?.map((item: Order) => ({
    key: item._id,
    _id: item._id,
    orderId: item.transaction.id,
    orderDate: item.createdAt,
    totalPrice: item.totalPrice,
    status: item.status,
    products: item.products,
    transaction: item.transaction,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    user: item.user,
  }));

  const columns: ColumnsType<Order> = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: date => format(new Date(date), 'PPpp'),
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: price => `$${price.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Badge
          status={
            status === 'Pending' ? 'processing' : status === 'Cancelled' ? 'error' : 'success'
          }
          text={status}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'x',
      width: 120,
      render: item => {
        return <UpdateOrderStatusModal order={item} />;
      },
    },
  ];

  return (
    <Card className="m-6">
      <Title level={3} className="mb-6">
        Update Orders
      </Title>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: 'sorter-icon' }}
        pagination={false}
      />
    </Card>
  );
};

export default ManageOrders;

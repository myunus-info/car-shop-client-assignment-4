/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Layout,
  Typography,
  Table,
  Button,
  InputNumber,
  Row,
  Col,
  Card,
  Space,
  Divider,
} from 'antd';
import { DeleteOutlined, ShoppingOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AppFooter from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  clearCart,
  removeFromCart,
  selectCartState,
  updateQuantity,
} from '../../../store/features/cart/cartSlice';
import { ICartItem, TResponse } from '../../../types';
import { useCreateOrderMutation } from '../../../store/features/order/orderApi';
import { useEffect } from 'react';

const { Title } = Typography;
const { Content } = Layout;

const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const { items: cartItems, totalPrice } = useAppSelector(selectCartState);
  const [placeOrder, { data, isLoading, isSuccess, isError, error }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ productId: id, quantity }));
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
    toast.success('Item removed from cart');
  };

  const handleCheckout = async () => {
    const products = cartItems.map(({ product, quantity }) => ({ product, quantity }));
    (await placeOrder({ products, totalPrice })) as TResponse<any>;
  };

  const toastId = 'id-123';
  useEffect(() => {
    if (isLoading) {
      toast.loading('Proceeding to checkout', { id: toastId });
    } else if (isSuccess && data?.success) {
      toast.success(data?.message, { id: toastId, duration: 2000 });
      window.location.href = data.data;
      dispatch(clearCart());
    } else if (isError) {
      toast.error((error as any)?.data?.message || 'Failed to place order', { id: toastId });
      if ((error as any)?.status === 401) navigate('/login');
    }
  }, [isSuccess, data, isLoading, isError, error, dispatch, navigate]);

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ICartItem) => (
        <Space>
          <img
            src={record.imageUrl}
            alt={text}
            style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4 }}
          />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toLocaleString()}`,
    },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (record: ICartItem) => (
        <Space>
          <Button
            icon={<MinusOutlined />}
            onClick={() => handleUpdateQuantity(record.product, Math.max(record.quantity - 1, 1))}
            disabled={record.quantity <= 1}
          />
          <InputNumber
            min={1}
            value={record.quantity}
            onChange={value => handleUpdateQuantity(record.product, value || 1)}
            style={{ width: 60 }}
            controls={false}
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() =>
              handleUpdateQuantity(record.product, Math.min(record.quantity + 1, record.stock))
            }
            disabled={record.quantity === record.stock}
          />
        </Space>
      ),
    },
    {
      title: 'Subtotal',
      key: 'subtotal',
      render: (record: ICartItem) => `$${(record.price * record.quantity).toLocaleString()}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: ICartItem) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveFromCart(record.product)}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: '50px 50px', minHeight: '50vh' }}>
        <Row justify="center">
          <Col xs={24} sm={24} md={20} lg={16}>
            <Title level={2}>Shopping Cart</Title>
            <Card>
              <Table columns={columns} dataSource={cartItems} pagination={false} rowKey="id" />

              <Divider />

              <Row justify="end" gutter={[16, 16]}>
                <Col>
                  <Space direction="vertical" align="end">
                    <Typography.Title level={3}>
                      Total: ${totalPrice.toLocaleString()}
                    </Typography.Title>
                    <Space>
                      <Button
                        type="default"
                        icon={<ShoppingOutlined />}
                        onClick={() => navigate('/products')}
                      >
                        Continue Shopping
                      </Button>
                      <Button
                        type="primary"
                        size="large"
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                      >
                        Proceed to Checkout
                      </Button>
                    </Space>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default ShoppingCart;

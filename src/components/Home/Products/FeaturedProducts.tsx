import { Card, Button, Row, Col, Typography } from 'antd';
import { ArrowRightOutlined, ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useGetAllProductsQuery } from '../../../store/features/admin/manageProducts.api';
import { useState } from 'react';

const { Title } = Typography;

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { data: cars } = useGetAllProductsQuery(undefined);
  console.log(cars);
  const [page] = useState(1);
  const { data: productsData } = useGetAllProductsQuery([
    { name: 'limit', value: 6 },
    { name: 'page', value: page },
    { name: 'sortBy', value: 'asc' },
  ]);

  const handleAddToCart = (productId: number) => {
    console.log(`Added product ${productId} to cart`);
    // TODO: Implement cart functionality
  };

  const handleViewDetails = (productId: number) => {
    console.log(`Viewing details for product ${productId}`);
    // TODO: Navigate to product details page
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Title level={2}>Featured Cars</Title>
      </div>

      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        {productsData?.data?.map(product => (
          <Col xs={24} sm={12} md={8} key={product._id}>
            <Card
              hoverable
              cover={
                <img
                  alt={product.title}
                  src={product.imageUrl}
                  style={{ height: 200, objectFit: 'cover' }}
                />
              }
              style={{ height: '100%' }}
              actions={[
                <Button icon={<EyeOutlined />} onClick={() => navigate(`/products/${product._id}`)}>
                  View Details
                </Button>,
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </Button>,
              ]}
            >
              <Card.Meta
                title={product.title}
                description={<Typography.Text strong>{product.price}</Typography.Text>}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ textAlign: 'center' }}>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/products')}
          icon={<ArrowRightOutlined />}
        >
          View All Cars
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProducts;

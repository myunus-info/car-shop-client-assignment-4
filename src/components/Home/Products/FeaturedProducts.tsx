import { Card, Button, Row, Col, Typography } from 'antd';
import { ArrowRightOutlined, ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useGetAllProductsQuery } from '../../../store/features/admin/manageProducts.api';
import { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { addToCart } from '../../../store/features/cart/cartSlice';
import { IProduct } from '../../../types';

const { Title } = Typography;

const FeaturedProducts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [page] = useState(1);
  const { data: productsData } = useGetAllProductsQuery([
    { name: 'limit', value: 6 },
    { name: 'page', value: page },
  ]);

  const handleAddToCart = (product: IProduct) => {
    dispatch(
      addToCart({
        product: product?._id,
        quantity: 1,
        price: product?.price,
        name: product?.model,
        imageUrl: product?.imageUrl,
        stock: product?.quantity,
      })
    );
  };

  return (
    <div
      id="products"
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px', marginTop: '1rem' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Title level={2}>Featured Cars</Title>
      </div>

      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        {productsData?.data?.map((product: IProduct) => (
          <Col xs={24} sm={12} md={8} key={product._id}>
            <Card
              hoverable
              cover={
                <img
                  alt={product.brand}
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
                  onClick={() => handleAddToCart(product)}
                  disabled={!product?.inStock}
                >
                  {product?.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>,
              ]}
            >
              <Card.Meta
                title={product.model}
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

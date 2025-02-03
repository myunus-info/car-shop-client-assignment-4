import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import AppFooter from '../Footer/Footer';
import { useGetSingleProductQuery } from '../../../store/features/admin/manageProducts.api';

import { Layout, Typography, Row, Col, Card, Button, Descriptions, Image, Space } from 'antd';
import { ShoppingCartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../store/hooks';
import { addToCart } from '../../../store/features/cart/cartSlice';
import Spinner from '../../Shared/Spinner';

const { Content } = Layout;
const { Title } = Typography;

const ProductDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { data: productData, isLoading } = useGetSingleProductQuery(productId);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: productData?.data?._id,
        quantity: 1,
        price: productData?.data?.price,
        name: productData?.data?.model,
        imageUrl: productData?.data?.imageUrl,
        stock: productData?.data?.quantity,
      })
    );
  };

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <Spinner />
      ) : (
        <Layout>
          <Content style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
              style={{ marginBottom: 24 }}
            >
              Back
            </Button>

            <Row gutter={[32, 32]}>
              <Col xs={24} md={12}>
                <Image
                  src={productData?.data?.imageUrl}
                  alt={`${productData?.data?.brand} ${productData?.data?.model}`}
                  style={{ width: '100%', borderRadius: 8 }}
                />
              </Col>

              <Col xs={24} md={12}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div>
                    <Title level={2}>
                      {productData?.data?.brand} {productData?.data?.model}
                    </Title>
                    <Title level={3}>${productData?.data?.price.toLocaleString()}</Title>
                  </div>

                  <Card>
                    <Descriptions column={1}>
                      <Descriptions.Item label="Brand">
                        {productData?.data?.brand}
                      </Descriptions.Item>
                      <Descriptions.Item label="Model">
                        {productData?.data?.model}
                      </Descriptions.Item>
                      <Descriptions.Item label="Year">{productData?.data?.year}</Descriptions.Item>
                      <Descriptions.Item label="Category">
                        {productData?.data?.category}
                      </Descriptions.Item>
                      <Descriptions.Item label="Stock Status">
                        {productData?.data?.inStock ? 'In Stock' : 'Out of Stock'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Quantity Available">
                        {productData?.data?.quantity}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>

                  <Card title="Description">
                    <p>{productData?.data?.description}</p>
                  </Card>

                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    disabled={!productData?.data?.inStock}
                    block
                  >
                    {productData?.data?.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </Space>
              </Col>
            </Row>
          </Content>
        </Layout>
      )}

      <AppFooter />
    </div>
  );
};

export default ProductDetails;

import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Descriptions,
  Image,
  Space,
  Button,
  Modal,
} from 'antd';
import { useState } from 'react';
import { IProduct } from '../../../types';

const { Content } = Layout;
const { Title } = Typography;

interface ViewProductDetailsModalProps {
  product: IProduct;
}

const ProductDetailsModal = ({ product }: ViewProductDetailsModalProps) => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpenModal} color="primary" variant="filled" size="small">
        View
      </Button>
      <Modal open={open} onCancel={handleCloseModal} width={900} footer={null}>
        <Layout>
          <Content style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
            <Row gutter={[32, 32]}>
              <Col xs={24} md={12}>
                <Image
                  src={product?.imageUrl}
                  alt={`${product?.brand} ${product?.model}`}
                  style={{ width: '100%', borderRadius: 8 }}
                />
              </Col>

              <Col xs={24} md={12}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div>
                    <Title level={2}>
                      {product?.brand} {product?.model}
                    </Title>
                    <Title level={3}>${product?.price.toLocaleString()}</Title>
                  </div>

                  <Card>
                    <Descriptions column={1}>
                      <Descriptions.Item label="Brand">{product?.brand}</Descriptions.Item>
                      <Descriptions.Item label="Model">{product?.model}</Descriptions.Item>
                      <Descriptions.Item label="Year">{product?.year}</Descriptions.Item>
                      <Descriptions.Item label="Category">{product?.category}</Descriptions.Item>
                      <Descriptions.Item label="Stock Status">
                        {product?.inStock ? 'In Stock' : 'Out of Stock'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Quantity Available">
                        {product?.quantity}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>

                  <Card title="Description">
                    <p>{product?.description}</p>
                  </Card>
                </Space>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Modal>
    </>
  );
};

export default ProductDetailsModal;

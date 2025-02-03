import { Layout, Typography, Row, Col, Card, Space, Divider } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import Navbar from '../Navbar/Navbar';
import AppFooter from '../Footer/Footer';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const About = () => {
  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: '50px 50px', maxWidth: 1200, margin: '0 auto' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Company Introduction */}
          <div>
            <Title level={2}>About Our Company</Title>
            <Paragraph style={{ fontSize: '16px' }}>
              Welcome to our online store! We are dedicated to providing high-quality products and
              exceptional customer service. Our journey began with a simple idea: to create a
              seamless shopping experience that brings joy to our customers.
            </Paragraph>
          </div>

          <Divider />

          {/* Mission and Values */}
          <div>
            <Title level={3}>Our Mission</Title>
            <Paragraph style={{ fontSize: '16px' }}>
              To deliver exceptional value through innovative products while maintaining the highest
              standards of customer satisfaction and environmental responsibility.
            </Paragraph>
          </div>

          {/* Team Section */}
          <div>
            <Title level={3}>Our Team</Title>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} md={8}>
                <Card>
                  <Title level={4}>John Doe</Title>
                  <Text type="secondary">CEO & Founder</Text>
                  <Paragraph style={{ marginTop: '10px' }}>
                    With over 15 years of experience in retail and e-commerce.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card>
                  <Title level={4}>Jane Smith</Title>
                  <Text type="secondary">Head of Operations</Text>
                  <Paragraph style={{ marginTop: '10px' }}>
                    Expertise in supply chain management and customer relations.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card>
                  <Title level={4}>Mike Johnson</Title>
                  <Text type="secondary">Product Manager</Text>
                  <Paragraph style={{ marginTop: '10px' }}>
                    Passionate about creating innovative product solutions.
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>

          <Divider />

          {/* Contact Information */}
          <div>
            <Title level={3}>Contact Us</Title>
            <Space direction="vertical" size="middle">
              <Space>
                <EnvironmentOutlined />
                <Text>123 Business Street, Tech City, TC 12345</Text>
              </Space>
              <Space>
                <PhoneOutlined />
                <Text>+1 (555) 123-4567</Text>
              </Space>
              <Space>
                <MailOutlined />
                <Text>contact@ourcompany.com</Text>
              </Space>
            </Space>
          </div>
        </Space>
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default About;

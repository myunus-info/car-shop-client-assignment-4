/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, Card, Row, Col, Typography, Space, Layout } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import Navbar from '../Navbar/Navbar';
import AppFooter from '../Footer/Footer';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Content } = Layout;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form submitted:', values);
    form.resetFields();
  };

  return (
    <>
      <Navbar />
      <Layout style={{ minHeight: '70vh', background: '#f5f5f5', padding: '2rem' }}>
        <Content>
          <Row justify="center">
            <Col xs={24} lg={16}>
              <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Contact Us
              </Title>

              <Row gutter={[32, 32]}>
                <Col xs={24} md={12}>
                  <Card style={{ height: '100%' }}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                      <Title level={4}>Get in Touch</Title>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Space>
                          <PhoneOutlined style={{ color: '#1890ff' }} />
                          <Paragraph style={{ margin: 0 }}>+1 (555) 123-4567</Paragraph>
                        </Space>
                        <Space>
                          <MailOutlined style={{ color: '#1890ff' }} />
                          <Paragraph style={{ margin: 0 }}>support@example.com</Paragraph>
                        </Space>
                        <Space>
                          <EnvironmentOutlined style={{ color: '#1890ff' }} />
                          <Paragraph style={{ margin: 0 }}>
                            123 Business Street, Suite 100
                            <br />
                            New York, NY 10001
                          </Paragraph>
                        </Space>
                        <Space>
                          <GlobalOutlined style={{ color: '#1890ff' }} />
                          <Paragraph style={{ margin: 0 }}>
                            Monday - Friday: 9:00 AM - 6:00 PM
                          </Paragraph>
                        </Space>
                      </Space>
                    </Space>
                  </Card>
                </Col>

                <Col xs={24} md={12}>
                  <Card style={{ height: '100%' }}>
                    <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
                      <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                      >
                        <Input placeholder="Your name" />
                      </Form.Item>

                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: 'Please enter your email' },
                          { type: 'email', message: 'Please enter a valid email' },
                        ]}
                      >
                        <Input placeholder="Your email" />
                      </Form.Item>

                      <Form.Item
                        name="subject"
                        label="Subject"
                        rules={[{ required: true, message: 'Please enter a subject' }]}
                      >
                        <Input placeholder="Subject" />
                      </Form.Item>

                      <Form.Item
                        name="message"
                        label="Message"
                        rules={[{ required: true, message: 'Please enter your message' }]}
                      >
                        <TextArea rows={4} placeholder="Your message" />
                      </Form.Item>

                      <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                          Send Message
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
      <AppFooter />
    </>
  );
};

export default Contact;

import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const AppFooter = () => {
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Products', href: '/products' },
      { name: 'Testimonials', href: '/testimonials' },
      { name: 'Contact', href: '/contact' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Support', href: '#' },
      { name: 'Returns & Exchanges', href: '#' },
      { name: 'Shipping Information', href: '#' },
    ],
    social: [
      { name: 'Facebook', icon: Facebook, href: '#' },
      { name: 'Instagram', icon: Instagram, href: '#' },
      { name: 'Twitter', icon: Twitter, href: '#' },
      { name: 'YouTube', icon: Youtube, href: '#' },
    ],
  };

  return (
    <Footer style={{ background: '#1A1F2C', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row>
          {/* Company Info */}
          <Col xs={24} lg={10}>
            <Title level={3} style={{ color: 'white', marginBottom: '24px' }}>
              TechVision
            </Title>
            <Paragraph style={{ color: 'rgba(255, 255, 255, 0.65)', marginBottom: '24px' }}>
              Making technology accessible and enjoyable for everyone. Quality products for a
              connected world. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </Paragraph>
            <Space direction="vertical" size="small">
              <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>123 Innovation Drive</Text>
              <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Silicon Valley, CA 94025</Text>
              <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>United States</Text>
              <Text style={{ color: 'rgba(255, 255, 255, 0.65)', marginTop: '16px' }}>
                Phone: +1 (555) 123-4567
              </Text>
              <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                Email: contact@techvision.com
              </Text>
            </Space>
          </Col>

          {/* Navigation Links */}
          <Col xs={24} sm={8} lg={4}>
            <Title level={4} style={{ color: 'white', marginBottom: '16px' }}>
              Navigation
            </Title>
            <Space direction="vertical" size="small">
              {navigation.main.map(item => (
                <Link
                  key={item.name}
                  to={item.href}
                  style={{ color: 'rgba(255, 255, 255, 0.65)', transition: 'color 0.3s' }}
                >
                  {item.name}
                </Link>
              ))}
            </Space>
          </Col>

          {/* Company Links */}
          <Col xs={24} sm={8} lg={4}>
            <Title level={4} style={{ color: 'white', marginBottom: '16px' }}>
              Company
            </Title>
            <Space direction="vertical" size="small">
              {navigation.company.map(item => (
                <Link
                  key={item.name}
                  to={item.href}
                  style={{ color: 'rgba(255, 255, 255, 0.65)', transition: 'color 0.3s' }}
                >
                  {item.name}
                </Link>
              ))}
            </Space>
          </Col>

          {/* Support Links */}
          <Col xs={24} sm={8} lg={6}>
            <Title level={4} style={{ color: 'white', marginBottom: '16px' }}>
              Support
            </Title>
            <Space direction="vertical" size="small">
              {navigation.support.map(item => (
                <Link
                  key={item.name}
                  to={item.href}
                  style={{ color: 'rgba(255, 255, 255, 0.65)', transition: 'color 0.3s' }}
                >
                  {item.name}
                </Link>
              ))}
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.15)', margin: '32px 0' }} />

        {/* Social Links */}
        <Row justify="center" style={{ marginBottom: '24px' }}>
          <Space size="large">
            {navigation.social.map(item => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '20px' }}
                  aria-label={item.name}
                >
                  <IconComponent />
                </Link>
              );
            })}
          </Space>
        </Row>

        {/* Copyright */}
        <Row justify="center">
          <Text style={{ color: 'rgba(255, 255, 255, 0.45)' }}>
            © {new Date().getFullYear()} TechVision. All rights reserved.
          </Text>
        </Row>
      </div>
    </Footer>
  );
};

export default AppFooter;

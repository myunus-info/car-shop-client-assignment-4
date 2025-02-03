import { Typography, Card, Row, Col, Avatar, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const testimonials = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Business Executive',
    rating: 5,
    comment:
      'The Porsche 911 I purchased exceeded all my expectations. The service was impeccable, and the car is a dream to drive.',
    avatar:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Tech Entrepreneur',
    rating: 5,
    comment:
      'Outstanding experience from start to finish. The team helped me find the perfect luxury vehicle that suits my lifestyle.',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Car Enthusiast',
    rating: 5,
    comment:
      'Their collection of luxury cars is unmatched. The Lexus LC 500 I got is absolutely stunning. Highly recommend!',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 4,
    name: 'Emma Davis',
    role: 'Real Estate Agent',
    rating: 5,
    comment:
      'Professional service and amazing selection of vehicles. They made my car buying experience smooth and enjoyable.',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

const Testimonials = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px', marginBottom: '1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={2}>What Our Clients Say</Title>
        <Text type="secondary" style={{ fontSize: '16px' }}>
          Discover why our customers love our luxury car collection and service
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {testimonials.map(testimonial => (
          <Col xs={24} sm={24} md={12} lg={12} xl={12} key={testimonial.id}>
            <Card style={{ height: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <Avatar src={testimonial.avatar} size={64} icon={<UserOutlined />} />
                  <div style={{ marginLeft: '16px' }}>
                    <Text strong style={{ fontSize: '16px', display: 'block' }}>
                      {testimonial.name}
                    </Text>
                    <Text type="secondary">{testimonial.role}</Text>
                  </div>
                </div>

                <Rate disabled defaultValue={testimonial.rating} style={{ marginBottom: '16px' }} />

                <Text
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    flex: 1,
                    fontStyle: 'italic',
                  }}
                >
                  "{testimonial.comment}"
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Testimonials;

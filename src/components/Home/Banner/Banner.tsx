import React from 'react';
import { Button, Typography } from 'antd';
import { ChevronRight, Car } from 'lucide-react';

const { Title, Paragraph } = Typography;

const Banner: React.FC = () => {
  return (
    <div
      style={{
        background:
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: 600 }}>
          <Title
            style={{
              color: '#fff',
              fontSize: '3.5rem',
              marginBottom: '1rem',
              lineHeight: 1.2,
            }}
          >
            Drive Your Dreams
          </Title>
          <Paragraph
            style={{
              color: '#fff',
              fontSize: '1.25rem',
              marginBottom: '2rem',
              opacity: 0.9,
            }}
          >
            Experience luxury and performance with our premium selection of vehicles. From classic
            elegance to modern innovation, find your perfect match.
          </Paragraph>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button
              href="#products"
              type="primary"
              size="large"
              style={{
                height: '48px',
                padding: '0 32px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                background: '#1677ff',
                textDecoration: 'none',
              }}
              icon={<Car style={{ marginRight: 8 }} />}
            >
              Explore Our Fleet
            </Button>
            <Button
              href="#products"
              size="large"
              style={{
                height: '48px',
                padding: '0 32px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                background: '#fff',
                borderColor: '#fff',
                color: '#333',
              }}
              icon={<ChevronRight style={{ marginRight: 8 }} />}
            >
              Book a Test Drive
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

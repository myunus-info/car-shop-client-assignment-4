/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button, Typography, Card, Layout, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import GenericForm from '../../components/form/GenericForm';
import CustomInput from '../../components/form/CustomInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthValidations } from '../../schemas/auth.schema';
import { useSignupMutation } from '../../store/features/auth/authApi';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { TResponse } from '../../types';

const { Title } = Typography;
const { Content } = Layout;

const Signup = () => {
  const navigate = useNavigate();
  const [signup, { data: signupData, isLoading, isSuccess, isError, error }] = useSignupMutation();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    (await signup(data)) as TResponse<any>;
  };

  const toastId = 'id-123';
  useEffect(() => {
    if (isLoading) {
      toast.loading('Signing up...', { id: toastId });
    } else if (isSuccess && signupData?.success) {
      toast.success(signupData?.message, { id: toastId, duration: 3000 });
      navigate('/login');
    } else if (isError) {
      toast.error((error as any)?.data?.message || 'Failed to sign up!', { id: toastId });
    }
  }, [isSuccess, signupData, navigate, isLoading, isError, error]);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Col xs={22} sm={16} md={12} lg={8} xl={6}>
            <Card>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={2}>Create an Account</Title>
                <Typography.Text type="secondary">
                  Join us today and explore our amazing products
                </Typography.Text>
              </div>

              <GenericForm
                onSubmit={onSubmit}
                resolver={zodResolver(AuthValidations.signUpValidationSchema)}
                isSuccess={isSuccess}
              >
                <CustomInput
                  type="text"
                  name="name"
                  label="Name"
                  prefix={<UserOutlined style={{ paddingRight: '.5rem' }} />}
                />
                <CustomInput
                  type="email"
                  name="email"
                  label="Email"
                  prefix={<MailOutlined style={{ paddingRight: '.5rem' }} />}
                />
                <CustomInput
                  type="password"
                  name="password"
                  label="Password"
                  prefix={<LockOutlined style={{ paddingRight: '.5rem' }} />}
                />

                <Form.Item>
                  <Button disabled={isLoading} type="primary" htmlType="submit" size="large" block>
                    Sign up
                  </Button>
                </Form.Item>

                <div style={{ textAlign: 'center' }}>
                  <Typography.Text type="secondary">
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#1890ff' }}>
                      Log in
                    </Link>
                  </Typography.Text>
                </div>
              </GenericForm>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Signup;

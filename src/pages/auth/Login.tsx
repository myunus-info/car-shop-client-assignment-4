/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button, Typography, Card, Layout, Row, Col } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import GenericForm from '../../components/form/GenericForm';
import CustomInput from '../../components/form/CustomInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthValidations } from '../../schemas/auth.schema';
import { useLoginMutation } from '../../store/features/auth/authApi';
import { TResponse } from '../../types';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { verifyToken } from '../../utils/verifyToken';
import { setUser, TUser } from '../../store/features/auth/authSlice';
import { useDispatch } from 'react-redux';

const { Title } = Typography;
const { Content } = Layout;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { data: loginData, isLoading, isSuccess, isError, error }] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    (await login(data)) as TResponse<any>;
  };

  const toastId = 'id-123';
  useEffect(() => {
    if (isLoading) {
      toast.loading('Logging in...', { id: toastId });
    } else if (isSuccess && loginData?.success) {
      const token = loginData?.data.accessToken;
      const user = verifyToken(token) as TUser;
      dispatch(setUser({ user, token }));
      toast.success(loginData?.message, { id: toastId, duration: 3000 });
      navigate(`/${user.role}/dashboard`);
    } else if (isError) {
      toast.error((error as any)?.data?.message || 'Failed to log in', { id: toastId });
    }
  }, [isSuccess, loginData, navigate, isLoading, isError, error, dispatch]);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Col xs={22} sm={16} md={12} lg={8} xl={6}>
            <Card>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={2}>Login</Title>
                <Typography.Text type="secondary">
                  Join us today and explore our amazing products
                </Typography.Text>
              </div>

              <GenericForm
                onSubmit={onSubmit}
                resolver={zodResolver(AuthValidations.loginValidationSchema)}
                isSuccess={isSuccess}
              >
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
                  <Button type="primary" htmlType="submit" size="large" block>
                    Login
                  </Button>
                </Form.Item>

                <div style={{ textAlign: 'center' }}>
                  <Typography.Text type="secondary">
                    Create an account?{' '}
                    <Link to="/signup" style={{ color: '#1890ff' }}>
                      Sign up
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

export default Login;

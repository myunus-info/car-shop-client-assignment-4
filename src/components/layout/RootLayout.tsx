import { Button, Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/features/auth/authSlice';
import { toast } from 'sonner';

const { Header, Content } = Layout;

const RootLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out', { duration: 2000 });
  };
  // style={{ padding: 0, background: colorBgContainer }}

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div>
            <Button size="small" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 'calc(100vh - 8.125rem)',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;

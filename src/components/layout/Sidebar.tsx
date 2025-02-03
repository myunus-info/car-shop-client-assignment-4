import { Layout, Menu } from 'antd';
import { sidebarNavsGenerator } from '../../utils/sidebarNavsGenerator';
import { adminPaths } from '../../routes/admin.routes';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentToken, TUser } from '../../store/features/auth/authSlice';
import { userRole } from './layout.constant';
import { verifyToken } from '../../utils/verifyToken';
import { userPaths } from '../../routes/user.routes';

const { Sider } = Layout;

const Sidebar = () => {
  const token = useAppSelector(selectCurrentToken);
  let user;
  if (token) user = verifyToken(token);

  let sidebarItems;

  switch ((user as TUser)?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarNavsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.USER:
      sidebarItems = sidebarNavsGenerator(userPaths, userRole.USER);
      break;
    default:
      break;
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0" width={225}>
      <div
        style={{
          color: 'white',
          height: '4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h1>Car Shop</h1>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={sidebarItems} />
    </Sider>
  );
};

export default Sidebar;

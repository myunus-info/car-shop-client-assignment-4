import Orders from '../pages/user/Orders';
import UpdatePassword from '../pages/user/UpdatePassword';
import UserDashboard from '../pages/user/UserDashboard';
import UserProfile from '../pages/user/UserProfile';

export const userPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <UserDashboard />,
  },
  {
    name: 'Manage Profile',
    children: [
      {
        name: 'Profile',
        path: 'profile',
        element: <UserProfile />,
      },
      {
        name: 'Update Password',
        path: 'update-password',
        element: <UpdatePassword />,
      },
    ],
  },
  {
    name: 'Orders',
    path: 'orders',
    element: <Orders />,
  },
  {
    path: 'orders/:orderId',
    element: <h1>Single Product</h1>,
  },
];

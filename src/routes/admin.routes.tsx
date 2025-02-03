import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageOrders from '../pages/admin/manageOrders/ManageOrders';
import AddProduct from '../pages/admin/manageProducts/AddProduct';
import ManageProducts from '../pages/admin/manageProducts/ManageProducts';
import UsersTable from '../pages/admin/manageUsers/UsersTable';

export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'User Management',
    children: [
      {
        name: 'Deactivate Account',
        path: 'deactivate-account',
        element: <UsersTable />,
      },
    ],
  },
  {
    name: 'Product Management',
    children: [
      {
        name: 'Add Product',
        path: 'add-product',
        element: <AddProduct />,
      },
      {
        name: 'Manage Products',
        path: 'manage-products',
        element: <ManageProducts />,
      },
      {
        path: 'products/:productId',
        element: <h1>Single Product</h1>,
      },
    ],
  },
  {
    name: 'Order Management',
    children: [
      {
        name: 'Orders',
        path: 'orders',
        element: <ManageOrders />,
      },
      {
        path: 'orders/:orderId',
        element: <h1>Single Order</h1>,
      },
    ],
  },
];

import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

import { adminPaths } from './admin.routes';
import { userPaths } from './user.routes';
import Homepage from '../components/Home/Homepage';
import { routesGenerator } from '../utils/routesGenerator';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ShoppingCart from '../components/Home/Cart/ShoppingCart';
import About from '../components/Home/About/About';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import AllProducts from '../components/Home/Products/AllProducts';
import ProductDetails from '../components/Home/Products/ProductDetails';
import VerifyOrder from '../pages/user/VerifyOrder';
// import ProductDetails from '../pages/Homepage/Products/ProductDetails';
// import Signup from '../pages/Signup';
// import Login from '../pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/products',
    element: <AllProducts />,
  },
  {
    path: '/products/:productId',
    element: <ProductDetails />,
  },
  {
    path: '/orders/verify',
    element: <VerifyOrder />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute role="admin">
        <App />,
      </ProtectedRoute>
    ),
    children: routesGenerator(adminPaths),
  },
  {
    path: '/user',
    element: (
      <ProtectedRoute role="user">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(userPaths),
  },
  {
    path: '/about',
    element: <About />,
  },
  // {
  //   path: '/products/:productId',
  //   element: <ProductDetails />,
  // },
  {
    path: '/cart',
    element: <ShoppingCart />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

export default router;

import { logout, selectCurrentToken, TUser } from '../../store/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../utils/verifyToken';
import { TProtectedRoute } from '../../types';

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);

  if (!token) return <Navigate to="/login" replace />;

  const user = verifyToken(token);

  if (role && role !== (user as TUser)?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

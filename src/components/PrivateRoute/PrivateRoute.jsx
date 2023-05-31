import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../../redux/user/userSelectors';

export const PrivateRoute = ({ component }) => {
  const isAuth = useSelector(isAuthenticated);
  return isAuth ? component : <Navigate to={'/login'} />;
};


import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../redux/user/userSelectors';

export const PrivateRoute = ({ component }) => {
  const isAuth = useSelector(getIsAuthenticated);
  return isAuth ? component : <Navigate to={'/login'} />;
};


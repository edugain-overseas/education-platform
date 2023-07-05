import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../redux/user/userSelectors';

export const PublicRoute = ({ component }) => {
  const isAuth = useSelector(getIsAuthenticated);
  return isAuth ? <Navigate to={'/'} /> : component;
};


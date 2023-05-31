import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../../redux/user/userSelectors';

export const PublicRoute = ({ component }) => {
  const isAuth = useSelector(isAuthenticated);
  return isAuth ? <Navigate to={'/'} /> : component;
};


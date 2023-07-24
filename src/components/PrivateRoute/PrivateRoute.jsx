import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../../redux/user/userSelectors';

export const PrivateRoute = ({ component }) => {
  const token = useSelector(getToken);
  return token ? component : <Navigate to={'/login'} />;
};


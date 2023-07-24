import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../../redux/user/userSelectors';

export const PublicRoute = ({ component }) => {
  const token = useSelector(getToken);
  return token ? <Navigate to={'/'} /> : component;
};


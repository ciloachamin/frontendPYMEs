import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = () => {
  const { token } = useAuth(); // Usa `token` para verificar la autenticación

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si hay token, renderiza el componente solicitado
  return <Outlet />;
};

export default PrivateRoute;
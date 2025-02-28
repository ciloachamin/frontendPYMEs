import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

// Función para decodificar el token JWT
const decodeToken = (token: string) => {
  try {
    const payload = token.split('.')[1]; // Obtiene el payload del token
    const decodedPayload = atob(payload); // Decodifica Base64
    return JSON.parse(decodedPayload); // Convierte a objeto
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

const useAuth = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const navigate = useNavigate();

  // Decodifica el token al inicio para obtener el usuario
  if (token && !user) {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      setUser({ id: decodedToken.id, email: decodedToken.email });
    }
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login({ email, password });
      console.log("Respuesta completa:", response);

      if (response && response.access_token) {
        localStorage.setItem('token', response.access_token);
        setToken(response.access_token);

        // Decodifica el token para obtener el usuario
        const decodedToken = decodeToken(response.access_token);
        if (decodedToken) {
          setUser({ id: decodedToken.id, email: decodedToken.email });
        }

        navigate('/dashboard'); // Redirige al Dashboard
      } else {
        throw new Error('Formato de respuesta incorrecto');
      }
    } catch (error) {
      console.error("Error en handleLogin:", error);
      alert("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login'); // Redirige al Login
  };

  return { token, user, handleLogin, handleLogout };
};

export default useAuth;
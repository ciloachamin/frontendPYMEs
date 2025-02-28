import api from './api';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string; // Asume que el backend devuelve un JWT
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    throw new Error('Error al iniciar sesión');
  }
};

interface RegisterData {
    nombre_completo: string;
    email: string;
    telefono: string;
    password: string;
    id_empresa: number;
  }
  
  export const registerUser = async (data: RegisterData) => {
    try {
      const response = await api.post('/usuarios', data);
      return response.data;
    } catch (error) {
      throw new Error('Error al registrar usuario');
    }
  };
  
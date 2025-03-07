import api from './api';

export interface LoginData {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  access_token: string;
}
export interface RegisterData {
  nombre_completo: string;
  email: string;
  telefono: string;
  password: string;
  id_empresa: number;
}


export interface Response {
  data: string;
}
export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    throw new Error(`Error al iniciar sesión ${error}`);
  }
};

  export const registerUser = async (data: RegisterData) => {
    try {
      const response = await api.post('/usuarios', data);
      return response.data;
    } catch (error) {
      throw new Error(`Error al registrar usuario ${error}`);
    }
  };
  
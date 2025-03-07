import api from './api';

export interface User {
  id_usuario?: number;
  nombre_completo: string;
  email: string;
  telefono: string;
  password: string;
  roles: {
    nombre: string;
  }[];
  id_empresa: number;
}

export const getUsers = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener los usuarios ${error}`);
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener el usuario ${error}`);
  }
};

export const createUser = async (user: User) => {
  try {
    console.log(user);
    
    const response = await api.post('/usuarios', user);
    return response.data;
  } catch (error) {
    console.log(error);
    
    throw new Error(`Error al crear el usuario ${error}`);
  }
};

export const updateUser = async (id: number, user: Partial<User>) => {
  try {
    const response = await api.put(`/usuarios/${id}`, user);
    return response.data;
  } catch (error) {
    throw new Error(`Error al actualizar el usuario ${error}`);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al eliminar el usuario ${error}`);
  }
};
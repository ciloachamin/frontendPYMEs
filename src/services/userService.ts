import api from './api';

interface User {
  id?: number;
  nombre_completo: string;
  email: string;
  telefono: string;
  password: string;
  id_empresa: number;
}

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los usuarios');
  }
};

// Obtener un usuario por ID
export const getUserById = async (id: number) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el usuario');
  }
};

// Crear un nuevo usuario
export const createUser = async (user: User) => {
  try {
    console.log(user);
    
    const response = await api.post('/usuarios', user);
    return response.data;
  } catch (error) {
    console.log(error);
    
    throw new Error('Error al crear el usuario');
  }
};

// Actualizar un usuario existente
export const updateUser = async (id: number, user: Partial<User>) => {
  try {
    const response = await api.put(`/usuarios/${id}`, user);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el usuario');
  }
};

// Eliminar un usuario
export const deleteUser = async (id: number) => {
  try {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el usuario');
  }
};
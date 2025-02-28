import api from './api';

interface Roles {
  id?: number;
  nombre: string;
  descripcion: string;
}

// Obtener todos los usuarios
export const getRoles = async () => {
  try {
    const response = await api.get('/roles');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los roles');
  }
};

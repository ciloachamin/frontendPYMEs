import api from './api';

export interface Rol {
  id_role?: number;
  nombre: string;
  descripcion: string;
}

export const getRoles = async () => {
  try {
    const response = await api.get('/roles');
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener los roles ${error}`);
  }
};

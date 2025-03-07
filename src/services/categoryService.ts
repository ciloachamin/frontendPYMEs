
import api from './api';
export interface Category {
  id_categoria: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
}
export const getCategories = async () => {
  try {
    const response = await api.get('/categorias');
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener las categorías ${error}`);
  }
};

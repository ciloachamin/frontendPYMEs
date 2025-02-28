import api from './api';

interface Movement {
  id_inventario: number;
  id_producto: number;
  tipo_movimiento: 'entrada' | 'salida';
  cantidad: number;
  motivo: string;
  costo_unitario?: number;
  ubicacion?: string;
}

// Obtener todos los movimientos
export const getMovements = async () => {
  try {
    const response = await api.get('/movimientos');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los movimientos');
  }
};

// Obtener movimientos filtrados
export const getFilteredMovements = async (filters: {
  startDate?: string;
  endDate?: string;
  tipo_movimiento?: string;
}) => {
  try {
    console.log(filters);
    
    const response = await api.get('/movimientos/filter', { params: filters });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los movimientos filtrados');
  }
};

// Crear un nuevo movimiento
export const createMovement = async (movement: Movement) => {
  try {
    const response = await api.post('/movimientos', movement);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el movimiento');
  }
};

// Eliminar un movimiento
export const deleteMovement = async (id: number) => {
  try {
    const response = await api.delete(`/movimientos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el movimiento');
  }
};
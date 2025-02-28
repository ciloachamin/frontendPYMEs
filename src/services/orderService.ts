import api from './api';

interface Order {
  id_empresa: number;
  fecha_entrega: string;
  estado: string;
  detalles: {
    id_producto: number;
    cantidad: number;
    precio_unitario: number;
  }[];
}

// Obtener todos los pedidos
export const getOrders = async () => {
  try {
    const response = await api.get('/pedidos');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los pedidos');
  }
};

// Obtener un pedido por ID
export const getOrderById = async (id: number) => {
  try {
    const response = await api.get(`/pedidos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el pedido');
  }
};

// Crear un nuevo pedido
export const createOrder = async (order: Order) => {
  try {
    const response = await api.post('/pedidos', order);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el pedido');
  }
};

// Actualizar un pedido existente
export const updateOrder = async (id: number, order: Partial<Order>) => {
  try {
    const response = await api.put(`/pedidos/${id}`, order);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el pedido');
  }
};

// Eliminar un pedido
export const deleteOrder = async (id: number) => {
  try {
    const response = await api.delete(`/pedidos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el pedido');
  }
};
import api from './api';
import { Company } from './companyService';

export interface OrderDetail {
  id_producto?: number | null;
  cantidad?: number | null;
  precio_unitario?: number | null;
}

export interface Order {
  id_pedido?: number
  empresa: Company;
  fecha_solicitud: string;
  fecha_entrega: string;
  estado: string;
  detalles: OrderDetail[];
  id_empresa: number | null;
}
export const getOrders = async () => {
  try {
    const response = await api.get('/pedidos');
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener los pedidos ${error}`);
  }
};

export const getOrderById = async (id: number) => {
  try {
    const response = await api.get(`/pedidos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener el pedido ${error}`);
  }
};

export const createOrder = async (order: Order) => {
  try {
    const response = await api.post('/pedidos', order);
    return response.data;
  } catch (error) {
    throw new Error(`Error al crear el pedido ${error}`);
  }
};

export const updateOrder = async (id: number, order: Partial<Order>) => {
  try {
    const response = await api.put(`/pedidos/${id}`, order);
    return response.data;
  } catch (error) {
    throw new Error(`Error al actualizar el pedido ${error}`);
  }
};

export const deleteOrder = async (id: number) => {
  try {
    const response = await api.delete(`/pedidos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al eliminar el pedido ${error}`);
  }
};
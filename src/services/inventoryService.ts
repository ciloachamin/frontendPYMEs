import api from './api';
import { Company } from './companyService';

export interface ProductStock {
  id_producto: number;
  nombre: string;
  stock_minimo: number;
  stock_maximo: number;
  cantidad: number;
  codigo_barras: string;
  descripcion: string;
  precio_compra: string;
  precio_venta: string;
  stock_actual: string;
  fecha_creacion: string;
  ultima_actualizacion: string;
}

export interface Inventory {
  id_inventario: number;
  empresa: Company;
  productos_stock: ProductStock[];
}
export const getInventory = async (inventoryId: number): Promise<Inventory> => {
  try {
    const response = await api.get(`/inventarios/${inventoryId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener el inventario ${error}`);
  }
};

export const updateStock = async (
  inventoryId: number,
  productId: number,
  cantidad: number
): Promise<void> => {
  try {
    await api.post(`/inventarios/${inventoryId}/producto/${productId}`, { cantidad });
  } catch (error) {
    throw new Error(`Error al actualizar el stock ${error}`);
  }
};

export const getAlerts = async (inventoryId: number): Promise<Inventory[]> => {
  try {
    const response = await api.get(`/inventarios/${inventoryId}/alertas`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener las alertas ${error}`);
  }
};

export const createInventory = async (idEmpresa: number): Promise<Inventory> => {
  try {
    const response = await api.post('/inventarios', { id_empresa: idEmpresa });
    return response.data;
  } catch (error) {
    throw new Error(`Error al crear el inventario ${error}`);
  }
};

export const updateInventory = async (
  inventoryId: number,
  idEmpresa: number
): Promise<Inventory> => {
  try {
    const response = await api.put(`/inventarios/${inventoryId}`, { id_empresa: idEmpresa });
    return response.data;
  } catch (error) {
    throw new Error(`Error al actualizar el inventario ${error}`);
  }
};
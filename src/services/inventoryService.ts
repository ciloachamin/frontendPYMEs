import api from './api';

// Obtener el inventario de una empresa
export const getInventory = async (inventoryId: number) => {
  try {
    const response = await api.get(`/inventarios/${inventoryId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el inventario');
  }
};

// Agregar o retirar stock de un producto
export const updateStock = async (inventoryId: number, productId: number, cantidad: number) => {
  try {
    const response = await api.post(`/inventarios/${inventoryId}/producto/${productId}`, { cantidad });
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el stock');
  }
};

// Obtener alertas de stock bajo
export const getAlerts = async (inventoryId: number) => {
  try {
    const response = await api.get(`/inventarios/${inventoryId}/alertas`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las alertas');
  }
};

// Crear un nuevo inventario
export const createInventory = async (idEmpresa: number) => {
  try {
    const response = await api.post('/inventarios', { id_empresa: idEmpresa });
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el inventario');
  }
};

// Actualizar un inventario existente
export const updateInventory = async (inventoryId: number, idEmpresa: number) => {
  try {
    const response = await api.put(`/inventarios/${inventoryId}`, { id_empresa: idEmpresa });
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el inventario');
  }
};
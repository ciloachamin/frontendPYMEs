// src/services/supplierService.ts
import api from './api';

export const getSuppliers = async () => {
  try {
    const response = await api.get('/proveedores');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los proveedores');
  }
};
import api from './api';

interface Supplier {
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion: string;
}

// Obtener todos los proveedores
export const getSuppliers = async () => {
  try {
    const response = await api.get('/proveedores');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los proveedores');
  }
};

// Obtener un proveedor por ID
export const getSupplierById = async (id: number) => {
  try {
    const response = await api.get(`/proveedores/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el proveedor');
  }
};

// Crear un nuevo proveedor
export const createSupplier = async (supplier: Supplier) => {
  try {
    const response = await api.post('/proveedores', supplier);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el proveedor');
  }
};

// Actualizar un proveedor existente
export const updateSupplier = async (id: number, supplier: Partial<Supplier>) => {
  try {
    const response = await api.put(`/proveedores/${id}`, supplier);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el proveedor');
  }
};

// Eliminar un proveedor
export const deleteSupplier = async (id: number) => {
  try {
    const response = await api.delete(`/proveedores/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el proveedor');
  }
};
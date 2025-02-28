// src/services/productService.ts

import api from './api';

interface Product {
  id_producto?: number;
  codigo_barras: string;
  nombre: string;
  descripcion: string;
  id_categoria: number;
  precio_compra: number;
  precio_venta: number;
  stock_minimo: number;
  stock_maximo: number;
  stock_actual: number;
  id_empresa: number;
  id_proveedor: number;
}


interface ProductFilters {
  categoriaId?: number;
  empresaId?: number;
  minPrecio?: number;
  maxPrecio?: number;
  limit?: number;
  offset?: number;
}

export const getProducts = async (filters: ProductFilters) => {
  try {
    const response = await api.get('/productos', { params: filters });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los productos');
  }
};

export const getProductsNotFilter = async () => {
    try {
      const response = await api.get('/productos');
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  };
  


// Obtener un producto por ID
export const getProductById = async (id: number) => {
  try {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el producto');
  }
};

// Crear un nuevo producto
export const createProduct = async (product: Omit<Product, 'id_producto'>) => {
  try {
    const response = await api.post('/productos', product);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el producto');
  }
};

// Actualizar un producto existente
export const updateProduct = async (id: number, product: Partial<Product>) => {
  try {
    const response = await api.put(`/productos/${id}`, product);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el producto');
  }
};

// Eliminar un producto
export const deleteProduct = async (id: number) => {
  try {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el producto');
  }
};
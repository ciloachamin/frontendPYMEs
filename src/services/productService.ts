import api from './api';
export interface Product {
  id_producto?: number;
  codigo_barras: string;
  nombre: string;
  descripcion: string;
  id_categoria: number | null;
  precio_compra: number | null;
  precio_venta: number | null;
  stock_minimo: number | null;
  stock_maximo: number | null;
  stock_actual: number;
  id_empresa: number;
  id_proveedor: number;
}
export interface ProductFilters {
  categoriaId?: number | null;
  empresaId?: number | null;
  minPrecio?: number | null;
  maxPrecio?: number | null;
  limit?: number | null;
  offset?: number | null;
}

export const getProducts = async (filters: ProductFilters) => {
  try {
    const response = await api.get('/productos', { params: filters });
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener los productos ${error}`);
  }
};

export const getProductsNotFilter = async () => {
    try {
      const response = await api.get('/productos');
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener los productos ${error}`);
    }
  };
  
export const getProductById = async (id: number) => {
  try {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener el producto ${error}`);
  }
};

export const createProduct = async (product: Omit<Product, 'id_producto'>) => {
  try {
    const response = await api.post('/productos', product);
    return response.data;
  } catch (error) {
    throw new Error(`Error al crear el producto ${error}`);
  }
};

export const updateProduct = async (id: number, product: Partial<Product>) => {
  try {
    const response = await api.put(`/productos/${id}`, product);
    return response.data;
  } catch (error) {
    throw new Error(`Error al actualizar el producto ${error}`);
  }
};
export const deleteProduct = async (id: number) => {
  try {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al eliminar el producto ${error}`);
  }
};
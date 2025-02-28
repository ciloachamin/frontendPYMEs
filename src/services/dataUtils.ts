import { getOrders } from './orderService'; // Asegúrate de que la ruta sea correcta
import { getProductsNotFilter } from './productService';
interface PreparedOrderData {
  labels: string[];
  data: number[];
}

interface OrderDetail {
    id_producto: number;
    cantidad: number;
    precio_unitario: number;
  }
  
  export interface Order {
    id_empresa: number;
    fecha_entrega: string;
    estado: string;
    detalles: OrderDetail[];
  }
  

export async function prepareOrderData(): Promise<PreparedOrderData> {
  try {
    const orders: Order[] = await getOrders();
    const ordersByDate: { [key: string]: number } = orders.reduce((acc, order) => {
      const date = order.fecha_entrega.split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});

    const labels = Object.keys(ordersByDate).sort();
    const data = labels.map((date) => ordersByDate[date]);

    return { labels, data };
  } catch (error) {
    console.error('Error al preparar los datos de las órdenes:', error);
    return { labels: [], data: [] };
  }
}



// Función para preparar datos de productos por categoría
export async function prepareProductsByCategoryData() {
    try {
      const products = await getProductsNotFilter();
      const productsByCategory: { [key: string]: number } = products.reduce(
        (acc: { [key: string]: number }, product: any) => {
          const categoryName = product.categoria.nombre; // Ajusta según la estructura de tu respuesta
          if (!acc[categoryName]) {
            acc[categoryName] = 0;
          }
          acc[categoryName]++;
          return acc;
        },
        {}
      );
  
      const labels = Object.keys(productsByCategory);
      const data = labels.map((category) => productsByCategory[category]);
  
      return { labels, data };
    } catch (error) {
      console.error('Error al preparar los datos de productos por categoría:', error);
      return { labels: [], data: [] };
    }
  }
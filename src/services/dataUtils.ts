import { getOrders, Order } from './orderService';
import { getProductsNotFilter } from './productService';
interface PreparedOrderData {
  labels: string[];
  data: number[];
}
  
  export async function prepareOrderData(): Promise<PreparedOrderData> {
    try {
      const orders: Order[] = await getOrders();
      const ordersByDate: { [key: string]: number } = orders.reduce((acc: { [key: string]: number }, order) => {
        const date = order.fecha_entrega.split('T')[0];
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      }, {} as { [key: string]: number }); // Define el tipo del acumulador
  
      const labels = Object.keys(ordersByDate).sort();
      const data = labels.map((date) => ordersByDate[date]);
  
      return { labels, data };
    } catch (error) {
      console.error('Error al preparar los datos de las órdenes:', error);
      return { labels: [], data: [] };
    }
  }

  interface Product {
    categoria: {
      nombre: string;
    };
  }
  export async function prepareProductsByCategoryData() {
    try {
      const products = await getProductsNotFilter();
      const productsByCategory: { [key: string]: number } = products.reduce(
        (acc: { [key: string]: number }, product: Product) => {
          const categoryName = product.categoria.nombre;
          if (!acc[categoryName]) {
            acc[categoryName] = 0;
          }
          acc[categoryName]++;
          return acc;
        },
        {} as { [key: string]: number }
      );
  
      const labels = Object.keys(productsByCategory);
      const data = labels.map((category) => productsByCategory[category]);
  
      return { labels, data };
    } catch (error) {
      console.error('Error al preparar los datos de productos por categoría:', error);
      return { labels: [], data: [] };
    }
  }
import { getOrders } from './orderService'; // Asegúrate de que la ruta sea correcta

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
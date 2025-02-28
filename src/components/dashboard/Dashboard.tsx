import React, { useState, useEffect } from 'react';
import { getOrders } from '../../services/orderService';
import { getProductsNotFilter } from '../../services/productService';
import { getMovements } from '../../services/movementService';
import OrdersChart from '../reports/OrdersChart';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Skeleton } from 'primereact/skeleton';
import { Badge } from 'primereact/badge';
import { Chart } from 'primereact/chart';
import InventoryLevels from '../reports/InventoryLevels';

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalMovements, setTotalMovements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inventoryData, setInventoryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await getOrders();
        setTotalOrders(orders.length);

        const products = await getProductsNotFilter();
        setTotalProducts(products.total);

        const inventory = await getProductsNotFilter();
        console.log(inventory);

        setInventoryData(inventory);

        const movements = await getMovements();
        setTotalMovements(movements.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Iconos personalizados para cada tarjeta
  const cardIcons = {
    orders: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    products: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    movements: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    )
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card className="border-0 shadow-md rounded-lg transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center">
        <div className={`rounded-full p-3 mr-4 bg-${color}-50`}>
          {icon}
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-medium text-gray-500">{title}</h2>
          {loading ? (
            <Skeleton width="5rem" height="2rem" />
          ) : (
            <p className="text-3xl font-semibold mt-1 text-gray-800">{value}</p>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total de Pedidos"
            value={totalOrders}
            icon={cardIcons.orders}
            color="indigo"
          />

          <StatCard
            title="Total de Productos"
            value={totalProducts}
            icon={cardIcons.products}
            color="emerald"
          />

          <StatCard
            title="Total de Movimientos"
            value={totalMovements}
            icon={cardIcons.movements}
            color="amber"
          />
        </div>

        <Divider />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="shadow-md border-0 p-0">
            <div className="p-4">
              <h2 className="text-xl font-medium text-gray-700 mb-4">Análisis de Pedidos</h2>
              {loading ? (
                <Skeleton width="100%" height="320px" />
              ) : (
                <OrdersChart />
              )}
            </div>
          </Card>

          <Card className="shadow-md border-0 p-0">
            <div className="p-4">
              <h2 className="text-xl font-medium text-gray-700 mb-4">Resumen de Actividad</h2>
              {loading ? (
                <Skeleton width="100%" height="320px" />
              ) : (
                <div className="h-80 flex items-center justify-center text-gray-400">
                  Panel de actividades recientes

                </div>
              )}
            </div>
          </Card>
          {inventoryData && <InventoryLevels data={inventoryData.data} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
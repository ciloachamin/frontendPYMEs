import React, { useEffect, useState } from 'react';
import { getAlerts } from '../../services/inventoryService';
import { useParams } from 'react-router-dom';

const Alerts = () => {
  const { inventoryId } = useParams();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getAlerts(Number(inventoryId));
        setAlerts(data.productos_stock);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlerts();
  }, [inventoryId]);

  return (
    <div>
      <h2>Alertas de Stock Bajo</h2>
      <ul>
        {alerts.map((product) => (
          <li key={product.id_producto}>
            {product.nombre} - Stock actual: {product.cantidad} (Mínimo: {product.stock_minimo})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
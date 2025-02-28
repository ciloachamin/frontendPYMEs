// src/context/AlertsContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAlerts } from '../services/inventoryService';

const AlertsContext = createContext({
  alerts: [],
  fetchAlerts: () => {},
});

export const useAlerts = () => useContext(AlertsContext);

export const AlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    try {
      const data = await getAlerts(1); // Cambia el ID del inventario según tu lógica
      setAlerts(data.productos_stock);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60000); // Actualiza cada minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <AlertsContext.Provider value={{ alerts, fetchAlerts }}>
      {children}
    </AlertsContext.Provider>
  );
};
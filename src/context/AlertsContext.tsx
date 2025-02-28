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
      setAlerts((prevAlerts) => {
        // Solo actualiza si hay cambios en las alertas
        if (JSON.stringify(prevAlerts) !== JSON.stringify(data.productos_stock)) {
          return data.productos_stock;
        }
        return prevAlerts;
      });
    } catch (error) {
      console.error('Error al obtener alertas:', error);
    }
  };

  useEffect(() => {
    fetchAlerts(); // Cargar alertas al inicio
    const interval = setInterval(fetchAlerts, 60000); // Consultar cada 60 segundos
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <AlertsContext.Provider value={{ alerts, fetchAlerts }}>
      {children}
    </AlertsContext.Provider>
  );
};
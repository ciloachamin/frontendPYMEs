import { createContext, useState, useContext, useEffect } from 'react';
import { getAlerts } from '../services/inventoryService';
import { Inventory, ProductStock } from '../services/inventoryService'; // Importa las interfaces

interface AlertsContextType {
  alerts: ProductStock[];
  fetchAlerts: () => void;
}

const AlertsContext = createContext<AlertsContextType>({
  alerts: [],
  fetchAlerts: () => {},
});

export const useAlerts = () => useContext(AlertsContext);

export const AlertsProvider = ({ children }: { children: React.ReactNode }) => {
  const [alerts, setAlerts] = useState<ProductStock[]>([]);

  const fetchAlerts = async () => {
    try {
      const data: Inventory[] = await getAlerts(1);
      const allProductsStock = data.flatMap((inventory) => inventory.productos_stock);

      setAlerts((prevAlerts) => {
        if (JSON.stringify(prevAlerts) !== JSON.stringify(allProductsStock)) {
          return allProductsStock;
        }
        return prevAlerts;
      });
    } catch (error) {
      console.error('Error al obtener alertas:', error);
    }
  };
  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <AlertsContext.Provider value={{ alerts, fetchAlerts }}>
      {children}
    </AlertsContext.Provider>
  );
};
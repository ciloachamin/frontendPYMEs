import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getInventory } from '../../services/inventoryService';
import { useParams } from 'react-router-dom';

const InventoryTable = () => {
  const { inventoryId } = useParams();
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getInventory(Number(inventoryId));
        setInventory(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInventory();
  }, [inventoryId]);

  if (!inventory) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Inventario de {inventory.empresa.nombre}</h2>
      <DataTable value={inventory.productos_stock}>
        <Column field="nombre" header="Producto" />
        <Column field="cantidad" header="Stock Actual" />
        <Column field="stock_minimo" header="Stock Mínimo" />
        <Column field="stock_maximo" header="Stock Máximo" />
      </DataTable>
    </div>
  );
};

export default InventoryTable;
import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import InventoryTable from '../components/inventory/InventoryTable';
import InventoryUpdate from '../components/inventory/InventoryUpdate';
import Alerts from '../components/inventory/Alerts';

const InventoryPage = () => {
  return (
    <div>
      <h1>Gestión de Inventarios</h1>
      <TabView>
        <TabPanel header="Inventario">
          <InventoryTable />
        </TabPanel>
        <TabPanel header="Actualizar Stock">
          <InventoryUpdate />
        </TabPanel>
        <TabPanel header="Alertas">
          <Alerts />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default InventoryPage;
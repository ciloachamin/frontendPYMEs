import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import InventoryTable from '../components/inventory/InventoryTable';
import InventoryUpdate from '../components/inventory/InventoryUpdate';
import Alerts from '../components/inventory/Alerts';
import { Button } from 'primereact/button';

const InventoryPage = () => {
    return (

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center   pb-4">
                <h1 className="text-3xl font-medium text-gray-800">Gestión de Inventarios</h1>
                {/* <Button
        label="Nuevo usuario"
        icon="pi pi-user-plus"
        onClick={() => navigate('/users/create')}
        style={{ background: '#3B82F6', borderColor: '#3B82F6' }}
      /> */}
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <InventoryTable />
            </div>
        </div>

    );
};

export default InventoryPage;
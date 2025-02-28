import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import MovementHistory from '../components/movements/MovementHistory';
import MovementForm from '../components/movements/MovementForm';
const MovementsPage = () => {
    const [filteredMovements, setFilteredMovements] = useState([]);

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-2xl font-light text-gray-800 mb-6">Gestión de Movimientos</h1>

            <TabView className="shadow-sm">
                <TabPanel header="Historial" leftIcon="pi pi-history mr-2">
                    <div className="">
                        <MovementForm />

                    </div>
                </TabPanel>
                <TabPanel header="Registrar Movimiento" leftIcon="pi pi-plus mr-2">
                    <div className="">
                        <MovementHistory movements={filteredMovements} />
                    </div>
                </TabPanel>
            </TabView>
        </div>
    );
};
export default MovementsPage;
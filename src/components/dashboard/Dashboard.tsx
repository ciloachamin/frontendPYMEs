import React from 'react';

const Dashboard = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Bienvenido al Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">Resumen de Ventas</h2>
                    <p className="text-gray-600">$10,000</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">Usuarios Activos</h2>
                    <p className="text-gray-600">150</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">Productos en Stock</h2>
                    <p className="text-gray-600">500</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
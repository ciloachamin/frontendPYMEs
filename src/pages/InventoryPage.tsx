import InventoryTable from '../components/inventory/InventoryTable';

const InventoryPage = () => {
    return (

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center   pb-4">
                <h1 className="text-3xl font-medium text-gray-800">Gestión de Inventarios</h1>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <InventoryTable />
            </div>
        </div>

    );
};

export default InventoryPage;
import SupplierList from '../components/orders/SupplierList';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
const SuppliersPage = () => {
    const navigate = useNavigate();
    return (

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center   pb-4">
                <h1 className="text-3xl font-medium text-gray-800">Gestión de Proveedores</h1>
                <Button
                    label="Nuevo Proveedor"
                    icon="pi pi-user-plus"
                    onClick={() => navigate('/suppliers/create')}
                    style={{ background: '#3B82F6', borderColor: '#3B82F6' }}
                />
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <SupplierList />
            </div>
        </div>

    );
};

export default SuppliersPage;
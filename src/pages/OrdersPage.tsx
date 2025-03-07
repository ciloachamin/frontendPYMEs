import OrderList from '../components/orders/OrderList';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center   pb-4">
                <h1 className="text-3xl font-medium text-gray-800">Lista de Pedidos</h1>
                <Button
                    label="Nuevo pedido"
                    icon="pi pi-user-plus"
                    onClick={() => navigate('/orders/create')}
                    style={{ background: '#3B82F6', borderColor: '#3B82F6' }}
                />
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <OrderList />
            </div>
        </div>
    );
};

export default OrdersPage;
import ProductList from '../components/products/ProductList';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

const ProductsPage = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center   pb-4">
                <h1 className="text-3xl font-medium text-gray-800">Gestión de Productos</h1>
                <Button
                    label="Nuevo producto"
                    icon="pi pi-user-plus"
                    onClick={() => navigate('/products/create')}
                    style={{ background: '#3B82F6', borderColor: '#3B82F6' }}
                />
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <ProductList />
            </div>
        </div>
    );
};

export default ProductsPage;
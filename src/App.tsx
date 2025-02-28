import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './components/auth/LoginForm';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import UserForm from './components/users/UserForm';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import ProductForm from './components/products/ProductForm';
import InventoryPage from './pages/InventoryPage';
import InventoryUpdate from './components/inventory/InventoryUpdate';
import { AlertsProvider } from './context/AlertsContext';
import MovementsPage from './pages/MovementsPage';
import OrdersPage from './pages/OrdersPage';
import OrderForm from './components/orders/OrderForm';
import SuppliersPage from './pages/SuppliersPage';
import SupplierForm from './components/orders/SupplierForm';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AlertsProvider>
        <Router>
          <Routes>
            {/* Ruta pública */}
            {/* Ruta pública para login y ruta raíz */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Navigate replace to="/login" />} />

            {/* Rutas protegidas */}
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                {/* Ruta del dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Rutas de usuarios */}
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/create" element={<UserForm />} />
                <Route path="/users/edit/:id" element={<UserForm />} />
                {/* Rutas de productos */}
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/create" element={<ProductForm />} />
                <Route path="/products/edit/:id" element={<ProductForm />} />

                {/* Rutas de inventario */}
                <Route path="/inventory/:inventoryId" element={<InventoryPage />} />
                <Route path="/inventory/:inventoryId/actualizar/:productId" element={<InventoryUpdate />} />
                {/* Rutas de movimientos */}
                <Route path="/movement-inventory" element={<MovementsPage />} />
                {/* Rutas de ordenes */}
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/create" element={<OrderForm />} />
                <Route path="/orders/edit/:id" element={<OrderForm />} />
                {/* Rutas de Proveedores */}
                <Route path="/suppliers" element={<SuppliersPage />} />
                <Route path="/suppliers/create" element={<SupplierForm />} />
                <Route path="/suppliers/edit/:id" element={<SupplierForm />} />

              </Route>
            </Route>
          </Routes>
        </Router>
      </AlertsProvider>
    </QueryClientProvider>
  );
};

export default App;
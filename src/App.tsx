import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
       <AlertsProvider>
      <Router>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<LoginForm />} />

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

             {/* Rutas de invntario */}
              <Route path="/inventory/:inventoryId" element={<InventoryPage />} />
              <Route path="/inventory/:inventoryId/actualizar/:productId" element={<InventoryUpdate />} />


            </Route>
          </Route>
        </Routes>
      </Router>
      </AlertsProvider>
    </QueryClientProvider>
  );
};

export default App;
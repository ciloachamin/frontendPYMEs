import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import useAuth from '../../hooks/useAuth';
import { useAlerts } from '../../context/AlertsContext';

const Navbar = ({ setVisible, visible }) => {
  const { user, handleLogout } = useAuth();
  const { alerts } = useAlerts(); // Obtener las alertas del contexto
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const alertsMenuRef = useRef(null);

  const userMenuItems = [
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      command: () => navigate('/profile'),
    },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      command: () => navigate('/settings'),
    },
    {
      separator: true,
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => handleLogout(),
    },
  ];

  console.log('alerts 2', alerts);
  
  const alertsMenuItems = alerts.map((product) => ({
    label: `${product.nombre} - Stock: ${product.stock_actual} (Mínimo: ${product.stock_minimo})`,
    icon: 'pi pi-exclamation-triangle',
    command: () => navigate(`/inventory/1`), // Redirige al inventario
  }));

  const start = (
    <div className="flex items-center space-x-4">
      <Button
        icon="pi pi-bars"
        onClick={() => setVisible(!visible)}
        className="p-button-text p-button-rounded p-button-plain"
        aria-label="Toggle Menu"
      />
      <Link to="/dashboard" className="flex items-center space-x-2">
        <img
          src="src/assets/logo_pymes.png"
          alt="Logo"
          className="w-3"
          onError={(e) => {
            e.currentTarget.src = 'src/assets/logo_pymes.png';
          }}
        />
      </Link>
    </div>
  );

  const end = (
    <div className="flex items-center space-x-4">
      {/* Botón de alertas */}
      <Button
        icon="pi pi-bell"
        className="p-button-rounded p-button-text"
        onClick={(e) => alertsMenuRef.current.toggle(e)}
        aria-label="Alertas"
      >
        {alerts.length > 0 && (
          <Badge value={alerts.length} severity="danger" className="mr-2"></Badge>
        )}
      </Button>
      <Menu
        model={alertsMenuItems}
        popup
        ref={alertsMenuRef}
        className="w-64"
      />

      {/* Avatar y menú de usuario */}
      <div className="items-center space-x-2">
        <span className="text-sm font-medium text-gray-700 hidden md:inline mx-2">
          {user?.email || 'usuario@ejemplo.com'}
        </span>
        <Avatar
          icon="pi pi-user"
          shape="circle"
          className="cursor-pointer border-blue-200 hover:border-blue-400 transition-all"
          onClick={(e) => {
            menuRef.current.toggle(e);
            e.stopPropagation();
          }}
        />
        <Menu
          model={userMenuItems}
          popup
          ref={menuRef}
          className="shadow-lg"
        />
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 shadow-md bg-white">
      <Menubar start={start} end={end} className="border-none px-4" />
    </header>
  );
};

export default Navbar;
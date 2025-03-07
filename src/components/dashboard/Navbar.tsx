import { useRef } from 'react';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem'; // Importar MenuItem para tipar los elementos del menú

// Definir la interfaz para las props
interface SidebarMenuProps {
  visible: boolean; // `visible` es un booleano
  setVisible: (visible: boolean) => void; // `setVisible` es una función que recibe un booleano
}

const Navbar = ({ visible, setVisible }: SidebarMenuProps) => {
  const menuRef = useRef<Menu>(null); // Referencia para el menú

  // Elementos del menú
  const menuItems: MenuItem[] = [
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      command: () => {
        // Acción al hacer clic en "Perfil"
        console.log('Perfil seleccionado');
      },
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => {
        // Acción al hacer clic en "Cerrar sesión"
        console.log('Cerrar sesión seleccionado');
      },
    },
  ];

  return (
    <div className="navbar">
      {/* Botón para mostrar/ocultar el menú lateral */}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'Ocultar menú' : 'Mostrar menú'}
      </button>

      {/* Avatar con menú desplegable */}
      <Avatar
        icon="pi pi-user"
        shape="circle"
        className="cursor-pointer border-blue-200 hover:border-blue-400 transition-all"
        onClick={(e) => {
          menuRef.current?.toggle(e); // Usar optional chaining para evitar errores
          e.stopPropagation();
        }}
      />

      {/* Menú desplegable */}
      <Menu
        ref={menuRef}
        model={menuItems}
        popup
        className="w-48"
      />
    </div>
  );
};

export default Navbar;
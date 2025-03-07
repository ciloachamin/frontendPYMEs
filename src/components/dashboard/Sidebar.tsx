
import { Sidebar } from 'primereact/sidebar';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';

// Definir la interfaz para las props
interface SidebarMenuProps {
    visible: boolean; // `visible` es un booleano
    setVisible: (visible: boolean) => void; // `setVisible` es una función que recibe un booleano
  }
  
  const SidebarMenu = ({ visible, setVisible }: SidebarMenuProps) => {
    const navigate = useNavigate();
    
    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            command: () => {
                navigate('/dashboard');
                setVisible(false);
            }
        },
        {
            label: 'Usuarios',
            icon: 'pi pi-fw pi-users',
            command: () => {
                navigate('/users');
                setVisible(false);
            }
        },
        {
            label: 'Productos',
            icon: 'pi pi-fw pi-shopping-cart',
            command: () => {
                navigate('/products');
                setVisible(false);
            }
        },
        {
            label: 'Inventario',
            icon: 'pi pi-fw pi-users',
            command: () => {
                navigate('/inventory/1');
                setVisible(false);
            }
        },
        {
            label: 'Movimientos de Inventario',
            icon: 'pi pi-fw pi-users',
            command: () => {
                navigate('/movement-inventory');
                setVisible(false);
            }
        },
        {
            label: 'Ordenes',
            icon: 'pi pi-fw pi-users',
            command: () => {
                navigate('/orders');
                setVisible(false);
            }
        },
        {
            label: 'Proveedores',
            icon: 'pi pi-fw pi-users',
            command: () => {
                navigate('/suppliers');
                setVisible(false);
            }
        },
    ];

    return (
        <Sidebar visible={visible} onHide={() => setVisible(false)} className="p-0 w-64">
            <div className="p-4 bg-indigo-700 ">
                <div className="flex items-center gap-2">
                    <i className="pi pi-user text-xl"></i>
                    <div>
                        <h3 className="font-semibold">Usuario</h3>
                        <p className="text-xs">usuario@ejemplo.com</p>
                    </div>
                </div>
            </div>
            
            <div className="p-2">
                <Menu model={items} className="w-full border-none" />
            </div>
        </Sidebar>
    );
};

export default SidebarMenu;
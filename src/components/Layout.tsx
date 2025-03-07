import Navbar from './dashboard/Navbar';
import SidebarMenu from './dashboard/Sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [visible, setVisible] = useState(false);
    
    return (
        <div className=" bg-gray-100">
            <Navbar setVisible={setVisible} visible={visible} />
            
            <SidebarMenu visible={visible} setVisible={setVisible} />
            
            <main className="flex-1 p-4 md:p-6">
                <Outlet />
            </main>

            <footer className="bg-white p-4 border-t border-gray-200 text-center text-gray-600 text-sm">
                <p>© 2025 Mi Aplicación. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Layout;
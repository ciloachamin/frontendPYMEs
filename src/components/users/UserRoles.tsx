import { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { getRoles } from '../../services/rolesService';

const UserRoles = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        // Mapea la data al formato que requiere el Dropdown:
        const options = data.map((role: any) => ({
          label: role.nombre,
          value: role.nombre.toLowerCase(), // o puedes usar role.id_rol si prefieres trabajar con IDs
        }));
        setRoles(options);
      } catch (error) {
        console.error('Error al obtener roles:', error);
      }
    };
    fetchRoles();
  }, []);

  return (
    <Dropdown
      value={value}
      options={roles}
      onChange={(e) => onChange(e.value)}
      placeholder="Selecciona un rol"
    />
  );
};

export default UserRoles;

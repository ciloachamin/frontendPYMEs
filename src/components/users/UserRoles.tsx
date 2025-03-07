import { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { getRoles, Rol } from '../../services/rolesService';

const UserRoles = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        const options = data.map((role: Rol) => ({
          label: role.nombre,
          value: role.nombre.toLowerCase(),
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

import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { getUsers, deleteUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      console.log("data User", data);

      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      console.log('Eliminando usuario con id:', id);
      await deleteUser(id);
      fetchUsers(); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error(error);
    }
  };

  const actionBodyTemplate = (rowData: any) => {
    console.log("rowData", rowData);

    return (
      <div>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => navigate(`/users/edit/${rowData.id_usuario}`)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => handleDelete(rowData.id_usuario)}
        />
      </div>
    );
  };

  return (
    <div>
      <DataTable value={users} paginator rows={10}>
        <Column field="nombre_completo" header="Nombre Completo" />
        <Column field="email" header="Email" />
        <Column field="empresa.nombre" header="Empresa" />
        <Column
          field={(row) => row.roles && row.roles[0] && row.roles[0].nombre ? row.roles[0].nombre : "No definido"}
          header="Rol"
        />
        <Column field="telefono" header="Teléfono" />
        <Column body={actionBodyTemplate} header="Acciones" />
      </DataTable>
    </div>
  );
};

export default UserList;
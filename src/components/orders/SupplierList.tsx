import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { getSuppliers, deleteSupplier } from '../../services/supplierService';
import { useNavigate } from 'react-router-dom';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(id);
      fetchSuppliers(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error(error);
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success"
          onClick={() => navigate(`/suppliers/edit/${rowData.id_proveedor}`)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => handleDelete(rowData.id_proveedor)}
        />
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <DataTable value={suppliers} responsiveLayout="scroll">
        <Column field="id_proveedor" header="ID" />
        <Column field="nombre" header="Nombre" />
        <Column field="contacto" header="Contacto" />
        <Column field="telefono" header="Teléfono" />
        <Column field="email" header="Email" />
        <Column field="direccion" header="Dirección" />
        <Column body={actionBodyTemplate} header="Acciones" />
      </DataTable>
    </div>
  );
};

export default SupplierList;

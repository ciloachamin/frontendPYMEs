import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { getOrders, deleteOrder } from '../../services/orderService';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      fetchOrders(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error(error);
    }
  };

  // Función para formatear la fecha y hora
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Templates para las columnas de fecha
  const fechaSolicitudBodyTemplate = (rowData) => {
    return formatDate(rowData.fecha_solicitud);
  };

  const fechaEntregaBodyTemplate = (rowData) => {
    return formatDate(rowData.fecha_entrega);
  };

  // Template para la columna de acciones
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success"
          onClick={() => navigate(`/orders/edit/${rowData.id_pedido}`)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => handleDelete(rowData.id_pedido)}
        />
      </div>
    );
  };

  console.log("orders", orders);
  

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <DataTable value={orders} responsiveLayout="scroll">
        <Column field="id_pedido" header="ID" />
        <Column field="empresa.nombre" header="Empresa" />
        <Column header="Fecha de Solicitud" body={fechaSolicitudBodyTemplate} />
        <Column header="Fecha de Entrega" body={fechaEntregaBodyTemplate} />
        <Column field="estado" header="Estado" />
        <Column body={actionBodyTemplate} header="Acciones" />
      </DataTable>
    </div>
  );
};

export default OrderList;

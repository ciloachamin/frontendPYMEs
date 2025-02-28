import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { createOrder, updateOrder, getOrderById } from '../../services/orderService';
import { getCompanies } from '../../services/companyService';
import { getProducts } from '../../services/productService';
import { useNavigate, useParams } from 'react-router-dom';

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    id_empresa: null,
    fecha_entrega: '',
    estado: 'pendiente',
    detalles: [],
    empresa:{id_empresa:null}
  });

  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);

  // Carga empresas y productos
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await getCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error('Error al obtener las empresas:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const productsData = await getProducts({});
        // Ajusta según la estructura de la respuesta
        setProducts(productsData.data || productsData);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchCompanies();
    fetchProducts();
  }, []);

  // Si se pasa un ID, se carga el pedido para edición
  useEffect(() => {
    if (id) {
      fetchOrder();
    }
  }, [id]);

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(Number(id));
      setOrder(data);
    } catch (error) {
      console.error('Error al obtener el pedido:', error);
    }
  };

  // Manejo de cambios en los detalles del pedido
  const handleDetailChange = (index, field, value) => {
    const nuevosDetalles = [...order.detalles];
    nuevosDetalles[index] = { ...nuevosDetalles[index], [field]: value };
    setOrder({ ...order, detalles: nuevosDetalles });
  };

  const addDetail = () => {
    setOrder({
      ...order,
      detalles: [
        ...order.detalles,
        { id_producto: null, cantidad: 0, precio_unitario: 0 },
      ],
    });
  };

  const removeDetail = (index) => {
    const nuevosDetalles = order.detalles.filter((_, i) => i !== index);
    setOrder({ ...order, detalles: nuevosDetalles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateOrder(Number(id), order);
      } else {
        await createOrder(order);
      }
      navigate('/orders');
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-xl shadow-lg rounded-xl bg-white">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            {id ? 'Editar Pedido' : 'Crear Pedido'}
          </h2>
          <Divider className="my-4" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Datos Generales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Empresa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Empresa:
              </label>
              <Dropdown
                value={order.empresa.id_empresa}
                options={companies.map((company) => ({
                  label: company.nombre,
                  value: company.id_empresa,
                }))}
                onChange={(e) => setOrder({ ...order, id_empresa: e.value })}
                filter
                filterPlaceholder="Buscar empresa..."
                placeholder="Selecciona una empresa"
                className="w-full p-inputtext-sm rounded-lg p-2"
                required
              />
            </div>

            {/* Fecha de Entrega */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Entrega:
              </label>
              <Calendar
                value={order.fecha_entrega ? new Date(order.fecha_entrega) : null}
                onChange={(e) => {
                  const date = e.value;
                  setOrder({
                    ...order,
                    fecha_entrega: date ? date.toISOString() : '',
                  });
                }}
                dateFormat="yy-mm-dd"
                className="w-full p-inputtext-sm rounded-lg p-2"
                required
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado:
              </label>
              <Dropdown
                value={order.estado}
                options={[
                  { label: 'Pendiente', value: 'pendiente' },
                  { label: 'Entregado', value: 'entregado' },
                ]}
                onChange={(e) => setOrder({ ...order, estado: e.value })}
                className="w-full p-inputtext-sm rounded-lg p-2"
                required
              />
            </div>
          </div>

          {/* Detalles del Pedido */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Detalles del Pedido
            </h3>
            {order.detalles.map((detalle, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-4">
                {/* Producto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Producto:
                  </label>
                  <Dropdown
                    value={detalle.producto.id_producto}
                    options={products.map((prod) => ({
                      label: prod.nombre,
                      value: prod.id_producto,
                    }))}
                    onChange={(e) =>
                      handleDetailChange(index, 'id_producto', e.value)
                    }
                    filter
                    filterPlaceholder="Buscar producto..."
                    placeholder="Selecciona un producto"
                    className="w-full p-inputtext-sm rounded-lg p-2"
                    required
                  />
                </div>
                {/* Cantidad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad:
                  </label>
                  <InputNumber
                    value={detalle.cantidad}
                    onValueChange={(e) =>
                      handleDetailChange(index, 'cantidad', e.value)
                    }
                    className="w-full p-inputtext-sm rounded-lg p-2"
                    required
                  />
                </div>
                {/* Precio Unitario */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio Unitario:
                  </label>
                  <InputNumber
                    value={detalle.precio_unitario}
                    onValueChange={(e) =>
                      handleDetailChange(index, 'precio_unitario', e.value)
                    }
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    className="w-full p-inputtext-sm rounded-lg p-2"
                    required
                  />
                </div>
                {/* Botón para eliminar detalle */}
                <div className="flex justify-end">
                  <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger"
                    onClick={() => removeDetail(index)}
                  />
                </div>
              </div>
            ))}
            <Button
              label="Agregar Detalle"
              icon="pi pi-plus"
              className="p-button-outlined"
              onClick={addDetail}
            />
          </div>

          <div className="pt-4 flex justify-between">
            <Button
              type="submit"
              label={id ? 'Actualizar Pedido' : 'Crear Pedido'}
              icon={id ? "pi pi-refresh" : "pi pi-plus"}
              className="w-1/2 p-3 font-medium rounded-lg text-center transition-colors duration-200 mr-2"
              style={{ background: '#3B82F6', borderColor: '#3B82F6' }}
            />
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => window.history.back()}
              className="w-1/2 p-3 font-medium rounded-lg text-center transition-colors duration-200 bg-gray-200 text-gray-700"
              style={{ background: '#3B82F6', borderColor: '#3B82F6' }}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default OrderForm;

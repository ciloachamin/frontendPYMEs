import { useState, useEffect, FormEvent } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { createOrder, updateOrder, getOrderById } from '../../services/orderService';
import { Company, getCompanies } from '../../services/companyService';
import { getProducts, Product } from '../../services/productService';
import { useNavigate, useParams } from 'react-router-dom';

// Definir la interfaz para los detalles del pedido
interface OrderDetail {
  id_producto: number | null;
  cantidad: number;
  precio_unitario: number;
}

// Definir la interfaz para el pedido
interface Order {
  id_pedido?: number; // Hacer id_pedido opcional
  empresa: Company; // Usar la interfaz Company completa
  fecha_solicitud: string; // Hacer fecha_solicitud opcional
  fecha_entrega: string;
  estado: string;
  detalles: OrderDetail[];
  id_empresa: number | null;
}

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order>({
    id_empresa: null,
    id_pedido: 1,
    empresa: {
      id_empresa: 1,
      nombre: '', // Añadir propiedades obligatorias de Company
      ruc: '',
      direccion: '',
      telefono: '',
      email_contacto: '',
      sector: '',
      fecha_creacion: '',
      estado: { type: 'Buffer', data: [1] }, // Ajustar según la estructura real
    },
    fecha_solicitud: '',
    fecha_entrega: '',
    estado: 'pendiente',
    detalles: [],
  });

  const [companies, setCompanies] = useState<Company[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

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
  const handleDetailChange = (index: number, field: keyof OrderDetail, value: unknown) => {
    const nuevosDetalles = [...order.detalles];
    nuevosDetalles[index] = { ...nuevosDetalles[index], [field]: value };
    setOrder({ ...order, detalles: nuevosDetalles });
  };

  const addDetail = () => {
    setOrder({
      ...order,
      fecha_entrega: '',
      fecha_solicitud: 'dd',
      detalles: [
        ...order.detalles,
        { id_producto: null, cantidad: 0, precio_unitario: 0 },
      ],
    });
  };

  const removeDetail = (index: number) => {
    const nuevosDetalles = order.detalles.filter((_, i) => i !== index);
    setOrder({ ...order, detalles: nuevosDetalles });
  };

  const handleSubmit = async (e: FormEvent) => {
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
                onChange={(e) =>
                  setOrder({ ...order, empresa: { ...order.empresa, id_empresa: e.value } })
                }
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
                  const date = e.value as Date | null;
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
                    value={detalle.id_producto}
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
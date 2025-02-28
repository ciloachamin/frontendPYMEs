import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputText';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { createMovement } from '../../services/movementService';
import { getProducts } from '../../services/productService';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

const MovementForm = () => {
  const [movement, setMovement] = useState({
    id_inventario: 1, // Ajusta según tu lógica
    id_producto: 1,   // Ajusta según tu lógica
    tipo_movimiento: 'entrada',
    cantidad: 0,
    motivo: '',
    costo_unitario: 0,
    ubicacion: '',
  });

  const [filters] = useState({
    categoriaId: null,
    empresaId: null,
    minPrecio: null,
    maxPrecio: null,
    limit: null,
    offset: null,
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(filters);
        setProducts(data.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMovement(movement);
      alert('Movimiento registrado correctamente');
    } catch (error) {
      console.error('Error al registrar el movimiento:', error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-xl shadow-lg rounded-xl bg-white">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Registrar Movimiento
          </h2>
          <Divider className="my-4" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Movimiento:
              </label>
              <Dropdown
                value={movement.tipo_movimiento}
                options={[
                  { label: 'Entrada', value: 'entrada' },
                  { label: 'Salida', value: 'salida' },
                ]}
                onChange={(e) => setMovement({ ...movement, tipo_movimiento: e.value })}
                className="w-full p-inputtext-sm rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Producto:
              </label>
              <Dropdown
                value={movement.id_producto}
                options={products.map((prod) => ({
                  label: prod.nombre,
                  value: prod.id_producto,
                }))}
                onChange={(e) => setMovement({ ...movement, id_producto: e.value })}
                className="w-full p-inputtext-sm rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad:
              </label>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-sort-numeric-up px-3" />
                <InputNumber
                  value={movement.cantidad}
                  onValueChange={(e) => setMovement({ ...movement, cantidad: e.value })}
                  className="w-full p-3 px-6 rounded-lg"
                />
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Motivo:
              </label>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-comment px-3" />
                <InputText
                  value={movement.motivo}
                  onChange={(e) => setMovement({ ...movement, motivo: e.target.value })}
                  className="w-full p-3 px-6 rounded-lg"
                />
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Costo Unitario:
              </label>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-money-bill px-3" />
                <InputNumber
                  value={movement.costo_unitario}
                  onValueChange={(e) => setMovement({ ...movement, costo_unitario: e.value })}
                  className="w-full p-3 px-6 rounded-lg"
                />
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación:
              </label>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-map-marker px-3" />
                <InputText
                  value={movement.ubicacion}
                  onChange={(e) => setMovement({ ...movement, ubicacion: e.target.value })}
                  className="w-full p-3 px-6 rounded-lg"
                />
              </span>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <Button
              type="submit"
              label="Registrar Movimiento"
              className="w-full p-3 font-medium rounded-lg text-center transition-colors duration-200"
              style={{ background: '#3B82F6', borderColor: '#3B82F6' }}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default MovementForm;
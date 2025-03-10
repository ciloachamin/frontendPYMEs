import { useState, useEffect, FormEvent } from 'react';
import { InputText } from 'primereact/inputText';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { createMovement, Movement } from '../../services/movementService'; // Importa el tipo Movement
import { getProducts } from '../../services/productService';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

// Definir la interfaz para el producto
interface Product {
  id_producto: number;
  nombre: string;
}

const MovementForm = () => {
  // Estado para el movimiento
  const [movement, setMovement] = useState<Movement>({
    id_inventario: 1,
    id_producto: 1,
    tipo_movimiento: 'entrada', // Asegúrate de que sea 'entrada' o 'salida'
    cantidad: 0,
    motivo: '',
    costo_unitario: 0,
    ubicacion: '',
  });

  // Estado para los productos
  const [products, setProducts] = useState<Product[]>([]);

  // Cargar productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts({}); // Pasa un objeto vacío si no necesitas filtros
        setProducts(data.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async (e: FormEvent) => {
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
                onChange={(e) =>
                  setMovement({ ...movement, tipo_movimiento: e.value as 'entrada' | 'salida' })
                }
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
                onChange={(e) =>
                  setMovement({ ...movement, id_producto: e.value as number })
                }
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
                  onValueChange={(e) =>
                    setMovement({ ...movement, cantidad: e.value || 0 })
                  }
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
                  onChange={(e) =>
                    setMovement({ ...movement, motivo: e.target.value })
                  }
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
                  onValueChange={(e) =>
                    setMovement({ ...movement, costo_unitario: e.value || 0 })
                  }
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
                  onChange={(e) =>
                    setMovement({ ...movement, ubicacion: e.target.value })
                  }
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
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { getMovements, getFilteredMovements } from '../../services/movementService';

// Definir la interfaz para los movimientos
interface Movement {
  id_movimiento: number;
  producto: {
    nombre: string;
  };
  tipo_movimiento: string;
  cantidad: number;
  fecha_movimiento: string;
  motivo: string;
  costo_unitario: number;
  ubicacion: string;
}

const MovementHistory = () => {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [filters, setFilters] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
    tipo_movimiento: '',
  });

  useEffect(() => {
    fetchMovements();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchMovements = async () => {
    try {
      let data;
      if (filters.startDate || filters.endDate || filters.tipo_movimiento) {
        // Aplicar filtros si hay alguno seleccionado
        const formattedFilters = {
          startDate: filters.startDate ? filters.startDate.toISOString().split('T')[0] : null,
          endDate: filters.endDate ? filters.endDate.toISOString().split('T')[0] : null,
          tipo_movimiento: filters.tipo_movimiento,
        };
        data = await getFilteredMovements(formattedFilters);
      } else {
        // Obtener todos los movimientos si no hay filtros
        data = await getMovements();
      }
      setMovements(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (key: string, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      tipo_movimiento: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Card className="shadow-sm border-0 mb-2">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-light text-gray-700">Filtros</h3>
            <Button
              icon="pi pi-filter-slash"
              className="p-button-text p-button-sm"
              onClick={clearFilters}
              tooltip="Limpiar filtros"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label>Fecha Inicio:</label>
              <Calendar
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.value)}
                dateFormat="yy-mm-dd"
                className="w-full p-inputtext-sm"
                showIcon
              />
            </div>

            <div>
              <label>Fecha Fin:</label>
              <Calendar
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.value)}
                dateFormat="yy-mm-dd"
                className="w-full p-inputtext-sm"
                showIcon
              />
            </div>

            <div>
              <label>Tipo de Movimiento:</label>
              <Dropdown
                value={filters.tipo_movimiento}
                options={[
                  { label: 'Entrada', value: 'entrada' },
                  { label: 'Salida', value: 'salida' },
                ]}
                onChange={(e) => handleFilterChange('tipo_movimiento', e.value)}
                placeholder="Seleccione un tipo"
                className="w-full p-inputtext-sm"
                showClear
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="shadow-sm border-0">
        <DataTable
          value={movements}
          paginator
          rows={10}
          emptyMessage="No se encontraron movimientos"
          className="p-datatable-sm"
          responsiveLayout="scroll"
          stripedRows
          showGridlines={false}
          rowHover
        >
          <Column field="id_movimiento" header="ID" sortable />
          <Column field="producto.nombre" header="Producto" sortable />
          <Column field="tipo_movimiento" header="Tipo" sortable />
          <Column field="cantidad" header="Cantidad" sortable />
          <Column field="fecha_movimiento" header="Fecha" sortable />
          <Column field="motivo" header="Motivo" />
          <Column field="costo_unitario" header="Costo Unitario" />
          <Column field="ubicacion" header="Ubicación" />
        </DataTable>
      </Card>
    </div>
  );
};

export default MovementHistory;
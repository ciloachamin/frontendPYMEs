import { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { getFilteredMovements } from '../../services/movementService';

interface Filters {
  startDate: Date | null;
  endDate: Date | null;
  tipo_movimiento: string;
}

interface MovementFilterProps {
  onFilter: (data: Filters) => void; 
}

const MovementFilter = ({ onFilter }: MovementFilterProps) => {
  const [filters, setFilters] = useState<Filters>({
    startDate: null,
    endDate: null,
    tipo_movimiento: '',
  });

  const handleFilter = async () => {
    try {
      // Convertir las fechas a formato ISO 8601 (YYYY-MM-DD)
      const formattedFilters = {
        startDate: filters.startDate ? filters.startDate.toISOString().split('T')[0] : null,
        endDate: filters.endDate ? filters.endDate.toISOString().split('T')[0] : null,
        tipo_movimiento: filters.tipo_movimiento,
      };

      const data = await getFilteredMovements(formattedFilters);
      console.log("data", data);

      onFilter(data);
    } catch (error) {
      console.error('Error al filtrar movimientos:', error);
    }
  };

  return (
    <div>
      <h2>Filtrar Movimientos</h2>
      <div>
        <label>Fecha Inicio:</label>
        <Calendar
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.value as Date | null })}
          dateFormat="yy-mm-dd" // Formato de fecha en el calendario
        />
      </div>
      <div>
        <label>Fecha Fin:</label>
        <Calendar
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.value as Date | null })}
          dateFormat="yy-mm-dd" // Formato de fecha en el calendario
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
          onChange={(e) => setFilters({ ...filters, tipo_movimiento: e.value })}
        />
      </div>
      <Button label="Filtrar" onClick={handleFilter} />
    </div>
  );
};

export default MovementFilter;
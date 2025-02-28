import React, { useState } from 'react';
import { InputText } from 'primereact/inputText';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { createMovement } from '../../services/movementService';

const MovementForm = () => {
  const [movement, setMovement] = useState({
    id_inventario: 1, // Cambia según tu lógica
    id_producto: 1, // Cambia según tu lógica
    tipo_movimiento: 'entrada',
    cantidad: 0,
    motivo: '',
    costo_unitario: 0,
    ubicacion: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMovement(movement);
      alert('Movimiento registrado correctamente');
    } catch (error) {
      console.error('Error al registrar el movimiento:', error);
    }
  };

  return (
    <div>
      <h2>Registrar Movimiento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo de Movimiento:</label>
          <Dropdown
            value={movement.tipo_movimiento}
            options={[
              { label: 'Entrada', value: 'entrada' },
              { label: 'Salida', value: 'salida' },
            ]}
            onChange={(e) => setMovement({ ...movement, tipo_movimiento: e.value })}
          />
        </div>
        <div>
          <label>Cantidad:</label>
          <InputNumber
            value={movement.cantidad}
            onValueChange={(e) => setMovement({ ...movement, cantidad: e.value })}
          />
        </div>
        <div>
          <label>Motivo:</label>
          <InputText
            value={movement.motivo}
            onChange={(e) => setMovement({ ...movement, motivo: e.target.value })}
          />
        </div>
        <div>
          <label>Costo Unitario:</label>
          <InputNumber
            value={movement.costo_unitario}
            onValueChange={(e) => setMovement({ ...movement, costo_unitario: e.value })}
          />
        </div>
        <div>
          <label>Ubicación:</label>
          <InputText
            value={movement.ubicacion}
            onChange={(e) => setMovement({ ...movement, ubicacion: e.target.value })}
          />
        </div>
        <Button type="submit" label="Registrar Movimiento" />
      </form>
    </div>
  );
};

export default MovementForm;
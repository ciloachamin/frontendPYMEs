import React, { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { updateStock } from '../../services/inventoryService';
import { useParams } from 'react-router-dom';

const InventoryUpdate = () => {
  const { inventoryId, productId } = useParams();
  const [cantidad, setCantidad] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateStock(Number(inventoryId), Number(productId), cantidad);
      alert('Stock actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el stock:', error);
    }
  };

  return (
    <div>
      <h2>Actualizar Stock</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cantidad:</label>
          <InputNumber
            value={cantidad}
            onValueChange={(e) => setCantidad(Number(e.value))}
            required
          />
        </div>
        <Button type="submit" label="Actualizar Stock" />
      </form>
    </div>
  );
};

export default InventoryUpdate;
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { getInventory, Inventory, updateStock } from '../../services/inventoryService';
import { useParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { useAlerts } from '../../context/AlertsContext';

const InventoryTable = () => {
    const { inventoryId } = useParams();
    const [inventory, setInventory] = useState<Inventory>();
    const [updatingStock, setUpdatingStock] = useState<{ [key: number]: number }>({});
    const toast = useRef<Toast>(null);
    const { fetchAlerts } = useAlerts();

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const data = await getInventory(Number(inventoryId));
                setInventory(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchInventory();
    }, [inventoryId]);

    const handleUpdateStock = async (productId: number) => {
        const cantidad = updatingStock[productId];
        if (cantidad === undefined || cantidad === null) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Ingrese una cantidad válida',
            });
            return;
        }

        try {

            console.log("inventoryId", inventoryId);
            console.log("productId", productId);
            console.log("cantidad", cantidad);
            await updateStock(Number(inventoryId), productId, cantidad);
            // Actualizar el inventario después de la actualización
            const updatedInventory = await getInventory(Number(inventoryId));
            setInventory(updatedInventory);
            setUpdatingStock({ ...updatingStock, [productId]: 0 }); // Resetear el campo
            toast.current?.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Stock actualizado correctamente',
            });
            // Actualizar las alertas
            fetchAlerts();



        } catch (error) {
            console.error('Error al actualizar el stock:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo actualizar el stock',
            });
        }
    };

    if (!inventory) return <div>Cargando...</div>;

    return (
        <div>
            <Toast ref={toast} />
            <DataTable value={inventory.productos_stock}>
                <Column field="nombre" header="Producto" />
                <Column field="cantidad" header="Stock Actual" />
                <Column field="stock_minimo" header="Stock Mínimo" />
                <Column field="stock_maximo" header="Stock Máximo" />
                <Column
                    header="Actualizar Stock"
                    body={(rowData) => (
                        <div className="flex gap-2">
                            <InputNumber
                                value={updatingStock[rowData.id_producto] || 0}
                                onValueChange={(e) =>
                                    setUpdatingStock({ ...updatingStock, [rowData.id_producto]: Number(e.value) })
                                }
                                mode="decimal"
                                min={-1000} // Permite retirar stock con valores negativos
                                max={1000}
                                placeholder="Cantidad"
                            />
                            <Button
                                label="Actualizar"
                                icon="pi pi-check"
                                className="p-button-success"
                                onClick={() => handleUpdateStock(rowData.id_producto)}
                            />
                        </div>
                    )}
                />
            </DataTable>
        </div>
    );
};

export default InventoryTable;
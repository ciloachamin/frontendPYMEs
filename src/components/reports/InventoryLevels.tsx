import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Chart } from 'primereact/chart';
import { ProgressBar } from 'primereact/progressbar';

interface Product {
    id_producto: number;
    codigo_barras: string;
    nombre: string;
    descripcion: string;
    categoria: {
        id_categoria: number;
        nombre: string;
        descripcion: string;
        fecha_creacion: string;
    };
    precio_compra: string;
    precio_venta: string;
    stock_minimo: number;
    stock_maximo: number;
    stock_actual: number;
    empresa: {
        id_empresa: number;
        nombre: string;
        ruc: string;
        direccion: string;
        telefono: string;
        email_contacto: string;
        sector: string;
        fecha_creacion: string;
        estado: {
            type: string;
            data: number[];
        };
    };
    proveedor: {
        id_proveedor: number;
        nombre: string;
        contacto: string;
        telefono: string;
        email: string;
        direccion: string;
        fecha_creacion: string;
    };
    fecha_creacion: string;
    ultima_actualizacion: string;
}

interface InventoryLevelsProps {
    data: Product[];
}

const InventoryLevels: React.FC<InventoryLevelsProps> = ({ data }) => {
    const columns = [
        { field: 'nombre', header: 'Nombre' },
    ];

    const chartData = {
        labels: data.map(item => item.nombre),
        datasets: [
            {
                label: 'Stock Actual',
                data: data.map(item => item.stock_actual),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Stock Mínimo',
                data: data.map(item => item.stock_minimo),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Barra de progreso para el nivel de stock
    const stockProgressTemplate = (rowData: Product) => {
        const percentage = Math.min(
            Math.max(
                ((rowData.stock_actual - rowData.stock_minimo) /
                    (rowData.stock_maximo - rowData.stock_minimo)) *
                    100,
                0
            ),
            100
        );

        // Determinar color según el nivel de stock
        let color = '';
        if (percentage <= 25) {
            color = 'red'; // Bajo nivel de stock
        } else if (percentage >= 75) {
            color = 'green'; // Alto nivel de stock
        } else {
            color = 'orange'; // Nivel medio de stock
        }

        // Estilo personalizado para la barra de progreso
        const customStyle = {
            height: '20px',
            borderRadius: '4px',
        };

        // Template personalizado para mostrar el valor numérico
        const valueTemplate = (value: number) => {
            return (
                <div className="flex justify-between items-center px-2">
                    <span>{value.toFixed(1)}%</span>
                    {/* <span className="text-xs">
                        {rowData.stock_actual} / {rowData.stock_maximo}
                    </span> */}
                </div>
            );
        };

        return (
            <div className="w-full">
                <ProgressBar 
                    value={percentage} 
                    showValue={true} 
                    color={color} 
                    style={customStyle}
                    displayValueTemplate={valueTemplate}
                    className="shadow-sm"
                />
            </div>
        );
    };

    // Indicador de estado de stock
    const stockStatusTemplate = (rowData: Product) => {
        let status = '';
        let colorClass = '';

        if (rowData.stock_actual <= rowData.stock_minimo) {
            status = 'Bajo';
            colorClass = 'bg-red-100 text-red-800 border-red-200';
        } else if (rowData.stock_actual >= rowData.stock_maximo) {
            status = 'Exceso';
            colorClass = 'bg-green-100 text-green-800 border-green-200';
        } else {
            status = 'Normal';
            colorClass = 'bg-blue-100 text-blue-800 border-blue-200';
        }

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

            <div className="mb-6">
                <DataTable 
                    value={data} 
                    responsiveLayout="scroll"
                    rowHover
                    paginator 
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    className="shadow-sm rounded-lg"
                >
                    {columns.map(col => (
                        <Column
                            key={col.field}
                            field={col.field}
                            header={col.header}
                            sortable
                        />
                    ))}
                    {/* Columna para el estado */}
                    <Column
                        header="Estado"
                        body={stockStatusTemplate}
                        style={{ width: '8rem' }}
                    />
                    {/* Columna para la barra de progreso */}
                    <Column
                        header="Nivel de Stock"
                        body={stockProgressTemplate}
                        style={{ width: '15rem' }}
                    />
                </DataTable>
            </div>
            <div className="shadow-sm p-4 rounded-lg bg-white w-1/2">
                <h3 className="text-lg font-semibold mb-4">Gráfica de Niveles de Inventario</h3>
                <Chart type="bar" data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default InventoryLevels;
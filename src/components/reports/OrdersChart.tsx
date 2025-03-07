import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { prepareOrderData } from '../../services/dataUtils';

interface ChartData {
  labels: string[];
  data: number[];
}

function OrdersChart() {
  const [chartData, setChartData] = useState<ChartData>({ labels: [], data: [] });

  useEffect(() => {
    async function fetchData() {
      const data = await prepareOrderData();
      setChartData(data);
    }
    fetchData();
  }, []);

  const basicData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Órdenes por Fecha',
        data: chartData.data,
        fill: false,
        borderColor: '#42A5F5',
      },
    ],
  };

  const basicOptions = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'YYYY-MM-DD',
            displayFormats: {
              day: 'YYYY-MM-DD',
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="card">
      <Chart type="line" data={basicData} options={basicOptions} />
    </div>
  );
}

export default OrdersChart;
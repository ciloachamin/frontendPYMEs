import { useAlerts } from "../../context/AlertsContext";

const AlertsComponent = () => {
  const { alerts, fetchAlerts } = useAlerts();

  return (
    <div>
      <h2>Alertas de Stock</h2>
      <ul>
        {alerts.map((alert) => (
          <li key={alert.id_producto}>
            {alert.nombre} - Stock actual: {alert.stock_actual} (Mínimo: {alert.stock_minimo})
          </li>
        ))}
      </ul>
      <button onClick={fetchAlerts}>Actualizar Alertas</button>
    </div>
  );
};

export default AlertsComponent;
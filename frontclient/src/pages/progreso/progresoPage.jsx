import React, { useState, useEffect } from 'react';
import { LineChart } from "../../components/GraCharts.jsx";
import { useAuth } from "../../context/authcontext";
import { ProgressBar, Alert, Card, Container, Row, Col, Dropdown } from 'react-bootstrap';
import axios from '../../api/axios';

function ProgresoPage() {
  const { user } = useAuth();
  const [monthlyProgress, setMonthlyProgress] = useState(new Array(12).fill(0)); // Datos para la gráfica
  const [period, setPeriod] = useState('monthly'); // Período seleccionado
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [alert, setAlert] = useState(null); // Mensajes de error o advertencias
  const [progressComparison, setProgressComparison] = useState(''); // Comparación de progreso con objetivos

  // Función principal para cargar datos de progreso
  useEffect(() => {
    if (user?.id) {
      fetchData(); // Cargar estadísticas y comparación al cambiar `user` o `period`
    } else {
      console.error("El ID del usuario no está definido.");
    }
  }, [user, period]);

  // Función para cargar estadísticas y comparación
  const fetchData = async () => {
    setLoading(true);
    setAlert(null);

    try {
      await Promise.all([fetchUserStats(), fetchProgressComparison()]);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setAlert("Error al cargar datos del progreso.");
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener estadísticas de progreso
  const fetchUserStats = async () => {
    try {
      const response = await axios.get(`/stats/${user.id}/${period}`);
      console.log("Estadísticas de usuario:", response.data);

      // Procesar datos para la gráfica
      const stats = response.data;
      const processedData = new Array(12).fill(0); // Inicializar con ceros
      stats.forEach((item) => {
        if (item._id?.month) {
          processedData[item._id.month - 1] = item.total; // Ajustar índices (0-11)
        }
      });

      setMonthlyProgress(processedData);
    } catch (error) {
      console.error("Error al obtener estadísticas:", error);
      setAlert("Error al cargar estadísticas.");
    }
  };

  // Función para comparar progreso con los objetivos
  const fetchProgressComparison = async () => {
    try {
      const response = await axios.get(`/compare-progress/${user.id}`);
      console.log("Comparación de progreso:", response.data);

      setProgressComparison(response.data.message || "No se encontraron objetivos.");
    } catch (error) {
      console.error("Error al comparar el progreso:", error);
      setAlert("Error al comparar el progreso con los objetivos.");
    }
  };

  return (
    <section>
      <Card>
        <Container fluid className="progreso-page-container">
          {alert && <Alert variant="warning">{alert}</Alert>}
          <h2>Progreso Mensual</h2>

          {/* Selector de período */}
          <Dropdown onSelect={(e) => setPeriod(e)}>
            <Dropdown.Toggle variant="secondary">Seleccionar Período</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="weekly">Semanal</Dropdown.Item>
              <Dropdown.Item eventKey="monthly">Mensual</Dropdown.Item>
              <Dropdown.Item eventKey="yearly">Anual</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Gráfica de progreso */}
          {loading ? (
            <p>Cargando datos...</p>
          ) : monthlyProgress.some(value => value > 0) ? (
            <LineChart data={monthlyProgress} />
          ) : (
            <p>No hay datos disponibles para el progreso mensual.</p>
          )}

          <h3 className="mt-4">Comparación de Progreso con Objetivos</h3>
          <Alert variant="info">{progressComparison}</Alert>
        </Container>
      </Card>
    </section>
  );
}

export default ProgresoPage;

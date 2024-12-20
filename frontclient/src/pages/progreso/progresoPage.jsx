import React, { useState, useEffect } from 'react';
import { LineChart } from "../../components/GraCharts.jsx";
import { useAuth } from "../../context/authcontext";
import { getUserStatsRequest, compareProgressRequest } from '../../api/progreso';
import { ProgressBar, Alert, Card, Container, Row, Col, Dropdown } from 'react-bootstrap';
import '../../css/progresoPage.css';

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
      const response = await getUserStatsRequest(user.id, period); // Llamada ajustada
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

  const fetchProgressComparison = async () => {
    try {
      const response = await compareProgressRequest(user.id); // Llamada ajustada
      setProgressComparison(response.data.message || "No se encontraron objetivos.");
    } catch (error) {
      console.error("Error al comparar el progreso:", error);
      setAlert("Error al comparar el progreso con los objetivos.");
    }
  };

  return (
    <section className='seccion'>
      <Container fluid className="progreso-page-container">
        {alert && <Alert variant="warning">{alert}</Alert>}
        <h2 className='text-black'>Progreso Mensual</h2>

        {/* Selector de período */}
        <Dropdown onSelect={(e) => setPeriod(e)}>
          <Dropdown.Toggle variant="secondary" className='text-black'>Seleccionar Período</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="weekly">Semanal</Dropdown.Item>
            <Dropdown.Item eventKey="monthly">Mensual</Dropdown.Item>
            <Dropdown.Item eventKey="yearly">Anual</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Gráfica de progreso */}
        {loading ? (
          <p className='text-black'>Cargando datos...</p>
        ) : monthlyProgress.some(value => value > 0) ? (
          <LineChart data={monthlyProgress} />
        ) : (
          <p className='text-black'>No hay datos disponibles para el progreso mensual.</p>
        )}

        <h3 className="mt-4 text-black">Comparación de Progreso con Objetivos</h3>
        <Alert variant="info">{progressComparison}</Alert>
      </Container>
    </section>
  );
}

export default ProgresoPage;

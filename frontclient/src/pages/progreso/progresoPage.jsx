import React, { useState, useEffect } from 'react';
import { LineChart } from "../../components/GraCharts.jsx";
import { useAuth } from "../../context/authcontext";
import { ProgressBar, Alert, Card, Container, Row, Col, Dropdown } from 'react-bootstrap';
import axios from '../../api/axios';

function ProgresoPage() {
  const { user } = useAuth();
  const [monthlyProgress, setMonthlyProgress] = useState(new Array(12).fill(0));
  const [period, setPeriod] = useState('monthly');
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [progressComparison, setProgressComparison] = useState('');

  useEffect(() => {
    if (user?.id) {
      console.log("User ID:", user.id); // Verificar que user.id existe
      fetchUserStats();
      fetchProgressComparison();
    } else {
      console.log("User ID is undefined");
    }
  }, [user, period]);

  const fetchUserStats = async () => {
    if (!user.id) return; // Evitar hacer la solicitud si user.id es undefined
    setLoading(true);
    try {
      const response = await axios.get(`/stats/${user.id}/${period}`);
      console.log("User Stats Response:", response.data); // Verificar la respuesta
      const stats = response.data;

      const processedData = new Array(12).fill(0);
      stats.forEach((item) => {
        if (item._id.month !== undefined) processedData[item._id.month - 1] = item.total;
      });
      setMonthlyProgress(processedData);
      setAlert(null);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      setAlert("Error al cargar estadísticas");
    } finally {
      setLoading(false);
    }
  };

  const fetchProgressComparison = async () => {
    if (!user.id) return; // Evitar hacer la solicitud si user.id es undefined
    try {
      const response = await axios.get(`/compare-progress/${user.id}`);
      console.log("Progress Comparison Response:", response.data); // Verificar la respuesta
      setProgressComparison(response.data.message);
    } catch (error) {
      console.error("Error fetching progress comparison:", error);
      setAlert("Error al comparar el progreso con los objetivos.");
    }
  };

  return (
    <Container fluid className="progreso-page-container">
      {alert && <Alert variant="warning">{alert}</Alert>}
      <h2>Progreso Mensual</h2>

      <Dropdown onSelect={(e) => setPeriod(e)}>
        <Dropdown.Toggle variant="secondary">Seleccionar Período</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="weekly">Semanal</Dropdown.Item>
          <Dropdown.Item eventKey="monthly">Mensual</Dropdown.Item>
          <Dropdown.Item eventKey="yearly">Anual</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {monthlyProgress.some(value => value > 0) ? (
        <LineChart data={monthlyProgress} />
      ) : (
        <p>No hay datos disponibles para el progreso mensual.</p>
      )}

      <h3 className="mt-4">Comparación de Progreso con Objetivos</h3>
      <Alert variant="info">{progressComparison}</Alert>
    </Container>
  );
}

export default ProgresoPage;

import React, { useState, useEffect } from 'react';
import { LineChart } from "../../components/GraCharts.jsx";
import { useAuth } from "../../context/authcontext";
import { ProgressBar, Alert, Card, Container, Row, Col } from 'react-bootstrap';
import axios from '../../api/axios';
import '../../css/progresoPage.css';

function ProgresoPage() {
  const { user } = useAuth();
  const [dailyProgress, setDailyProgress] = useState(Array(6).fill({ completed: false, exerciseCount: 0 }));
  const [weeklyProgress, setWeeklyProgress] = useState([]);
  const [monthlyProgress, setMonthlyProgress] = useState(new Array(12).fill(0));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      setLoading(true);

      try {
        // Llamada a la API para obtener las rutinas del usuario
        const response = await axios.get(`/rutinas?userId=${user.id}`);
        const routines = response.data;

        // Variables locales para actualizar los progresos diarios, semanales y mensuales
        const dailyProgress = Array(6).fill({ completed: false, exerciseCount: 0 });
        const weeklyProgress = [];
        const monthlyProgress = new Array(12).fill(0);

        // Recorrer las rutinas y acumular datos en las variables locales
        routines.forEach((routine) => {
          const date = new Date(routine.fecha);
          const dayIndex = date.getDay() - 1; // -1 para que el índice sea de 0 a 5 (lunes a sábado)
          const month = date.getMonth(); // Obtener el mes de la rutina
          const isComplete = routine.estado === "completada";
          const exerciseCount = routine.ejercicios ? routine.ejercicios.length : 0;

          // Progreso diario
          if (dayIndex >= 0 && dayIndex <= 5) {
            dailyProgress[dayIndex] = {
              completed: isComplete,
              exerciseCount: dailyProgress[dayIndex].exerciseCount + exerciseCount,
            };
          }

          // Progreso semanal
          const week = Math.floor(date.getDate() / 7);
          if (!weeklyProgress[week]) {
            weeklyProgress[week] = Array(6).fill({ completed: false, exerciseCount: 0 });
          }
          if (!weeklyProgress[week][dayIndex]) {
            weeklyProgress[week][dayIndex] = { completed: false, exerciseCount: 0 };
          }
          weeklyProgress[week][dayIndex] = {
            completed: isComplete,
            exerciseCount: weeklyProgress[week][dayIndex].exerciseCount + exerciseCount,
          };

          // Progreso mensual (solo acumular si la rutina está completa)
          if (isComplete) {
            monthlyProgress[month] += exerciseCount;
          }
        });

        // Actualizar los estados con los datos calculados
        setDailyProgress(dailyProgress);
        setWeeklyProgress(weeklyProgress);
        setMonthlyProgress(monthlyProgress);
        setError(null);

        // Generar una alerta si falta completar algún día de la semana
        const incompleteDays = dailyProgress.filter(day => !day.completed).length;
        if (incompleteDays > 0) {
          setAlert(`¡Atención! Te faltan ${incompleteDays} días de completar en la semana.`);
        } else {
          setAlert("¡Excelente! Has completado todas las rutinas de la semana.");
        }

      } catch (error) {
        setError("Error al obtener las rutinas");
        console.error("Error al obtener las rutinas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    console.log("Monthly Progress Data:", monthlyProgress); // Verifica que monthlyProgress se esté actualizando
  }, [monthlyProgress]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container fluid className="progreso-page-container">
      {alert && <Alert variant={alert.includes("¡Excelente!") ? "success" : "warning"}>{alert}</Alert>}

      <h2>Progreso Diario</h2>
      <Row className="daily-progress">
        {dailyProgress.map((day, index) => (
          <Col key={index} md={2}>
            <Card className={`day-card ${day.completed ? 'completed' : 'incomplete'}`}>
              <Card.Body>
                <Card.Title>{["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][index]}</Card.Title>
                <ProgressBar now={day.completed ? 100 : (day.exerciseCount / 10) * 100} label={`${day.exerciseCount} ejercicios`} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="mt-4">Progreso Semanal</h2>
      <div className="weekly-progress">
        {weeklyProgress.map((week, weekIndex) => (
          <Card key={weekIndex} className="week-card mb-3">
            <Card.Body>
              <Card.Title>Semana {weekIndex + 1}</Card.Title>
              <Row>
                {week.map((day, dayIndex) => (
                  <Col key={dayIndex} md={2} className="text-center">
                    <span>{["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"][dayIndex]}</span>
                    <ProgressBar now={day.completed ? 100 : (day.exerciseCount / 10) * 100} variant={day.completed ? "success" : "danger"} />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>

      <h2 className="mt-4">Progreso Mensual</h2>
      {monthlyProgress.some(value => value > 0) ? (
        <LineChart data={monthlyProgress} />
      ) : (
        <p>No hay datos disponibles para el progreso mensual.</p>
      )}
    </Container>
  );
}

export default ProgresoPage;

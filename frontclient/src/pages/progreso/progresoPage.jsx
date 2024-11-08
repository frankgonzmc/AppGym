import React, { useState, useEffect } from 'react';
import { LineChart } from "../../components/GraCharts.jsx";
import { useAuth } from "../../context/authcontext";
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
        const response = await axios.get(`/rutinas?userId=${user.id}`);
        console.log(response.data);
        const routines = response.data;

        const dailyProgress = Array(6).fill({ completed: false, exerciseCount: 0 });
        const weeklyProgress = [];
        const monthlyProgress = new Array(12).fill(0);

        routines.forEach((routine) => {
          const dayIndex = new Date(routine.fecha).getDay() - 1; // 0=Lunes
          const month = new Date(routine.fecha).getMonth();
          const isComplete = routine.estado === "completada";

          // Asegúrate de que 'ejercicios' está definido antes de acceder a su 'length'
          const exerciseCount = routine.ejercicios ? routine.ejercicios.length : 0;

          // Progreso diario
          if (dayIndex >= 0 && dayIndex <= 5) {
            dailyProgress[dayIndex] = {
              completed: isComplete,
              exerciseCount: dailyProgress[dayIndex].exerciseCount + exerciseCount,
            };
          }

          // Progreso semanal
          const week = Math.floor(new Date(routine.fecha).getDate() / 7);

          // Inicializa la semana si no está definida
          if (!weeklyProgress[week]) {
            weeklyProgress[week] = Array(6).fill({ completed: false, exerciseCount: 0 });
          }

          // Asegúrate de que el día de la semana esté definido en 'weeklyProgress'
          if (!weeklyProgress[week][dayIndex]) {
            weeklyProgress[week][dayIndex] = { completed: false, exerciseCount: 0 };
          }

          weeklyProgress[week][dayIndex] = {
            completed: isComplete,
            exerciseCount: weeklyProgress[week][dayIndex].exerciseCount + exerciseCount,
          };

          // Progreso mensual
          if (isComplete) {
            monthlyProgress[month] += exerciseCount;
          }
        });

        setDailyProgress(dailyProgress);
        setWeeklyProgress(weeklyProgress);
        setMonthlyProgress(monthlyProgress);
        setError(null);

        // Generar alerta si falta completar alguna rutina diaria
        const incompleteDays = dailyProgress.filter(day => !day.completed).length;
        if (incompleteDays > 0) {
          setAlert(`¡Atención! Te faltan ${incompleteDays} días de completar en la semana.`);
        } else {
          setAlert(null);
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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="progreso-page-container">
      {alert && <div className="alert alert-warning">{alert}</div>}

      <h2>Progreso de Rutinas Diarias</h2>
      <div className="daily-progress">
        {dailyProgress.map((day, index) => (
          <div key={index} className={`day ${day.completed ? 'completed' : 'incomplete'}`}>
            <h3>{["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][index]}</h3>
            <p>Ejercicios completados: {day.exerciseCount}</p>
            <p>Estado: {day.completed ? "Completado" : "Incompleto"}</p>
          </div>
        ))}
      </div>

      <h2>Progreso Semanal</h2>
      <div className="weekly-progress">
        {weeklyProgress.map((week, weekIndex) => (
          <div key={weekIndex} className="week">
            <h3>Semana {weekIndex + 1}</h3>
            {week.map((day, dayIndex) => (
              <p key={dayIndex}>
                {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][dayIndex]}:
                {day.completed ? " Completado" : " Incompleto"} - Ejercicios: {day.exerciseCount}
              </p>
            ))}
          </div>
        ))}
      </div>

      <h2>Progreso Mensual</h2>
      <LineChart data={monthlyProgress} />
    </div>
  );
}

export default ProgresoPage;

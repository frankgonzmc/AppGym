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

  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) return;
      setLoading(true);
      try {
        const response = await axios.get(`/rutinas/${user._id}`);
        const routines = response.data;

        const dailyProgress = Array(6).fill({ completed: false, exerciseCount: 0 });
        const weeklyProgress = [];
        const monthlyProgress = new Array(12).fill(0);

        routines.forEach((routine) => {
          const dayIndex = new Date(routine.fecha).getDay() - 1;
          const month = new Date(routine.fecha).getMonth();
          const isComplete = routine.estado === "completada";
          const exerciseCount = routine.ejercicios.length;

          if (dayIndex >= 0 && dayIndex <= 5) {
            dailyProgress[dayIndex] = {
              completed: isComplete,
              exerciseCount: dailyProgress[dayIndex].exerciseCount + exerciseCount
            };
          }

          const week = Math.floor(new Date(routine.fecha).getDate() / 7);
          if (!weeklyProgress[week]) weeklyProgress[week] = Array(6).fill({ completed: false, exerciseCount: 0 });
          weeklyProgress[week][dayIndex] = {
            completed: isComplete,
            exerciseCount: weeklyProgress[week][dayIndex].exerciseCount + exerciseCount
          };

          if (isComplete) {
            monthlyProgress[month] += exerciseCount;
          }
        });

        setDailyProgress(dailyProgress);
        setWeeklyProgress(weeklyProgress);
        setMonthlyProgress(monthlyProgress);
        setError(null);
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

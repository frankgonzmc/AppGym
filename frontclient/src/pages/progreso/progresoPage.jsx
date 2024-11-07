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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llama a tu API para obtener las rutinas y ejercicios del usuario autenticado
        const response = await axios.get(`/rutinas/${user.id}`);
        const routines = response.data;

        // Inicializa los arreglos de progreso diario, semanal y mensual
        const dailyProgress = Array(6).fill({ completed: false, exerciseCount: 0 });
        const weeklyProgress = [];
        const monthlyProgress = new Array(12).fill(0);

        routines.forEach((routine) => {
          const dayIndex = new Date(routine.fecha).getDay() - 1; // Lunes es 0, Domingo no cuenta
          const month = new Date(routine.fecha).getMonth(); // Obtener el mes (0=enero, 11=diciembre)
          const isComplete = routine.estado === "completada";
          const exerciseCount = routine.ejercicios.length;

          // Lógica para el progreso diario
          if (dayIndex >= 0 && dayIndex <= 5) {
            dailyProgress[dayIndex] = {
              completed: isComplete,
              exerciseCount: dailyProgress[dayIndex].exerciseCount + exerciseCount
            };
          }

          // Lógica para el progreso semanal
          const week = Math.floor(new Date(routine.fecha).getDate() / 7);
          if (!weeklyProgress[week]) weeklyProgress[week] = Array(6).fill({ completed: false, exerciseCount: 0 });
          weeklyProgress[week][dayIndex] = {
            completed: isComplete,
            exerciseCount: weeklyProgress[week][dayIndex].exerciseCount + exerciseCount
          };

          // Lógica para el progreso mensual
          if (isComplete) {
            monthlyProgress[month] += exerciseCount;
          }
        });

        setDailyProgress(dailyProgress);
        setWeeklyProgress(weeklyProgress);
        setMonthlyProgress(monthlyProgress);

        // Alerta si algún día no está completo
        dailyProgress.forEach((day, index) => {
          if (!day.completed) {
            alert(`Falta completar la rutina del día ${["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][index]}`);
          }
        });

      } catch (error) {
        console.error("Error al obtener las rutinas:", error);
      }
    };

    fetchData();
  }, [user]);

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

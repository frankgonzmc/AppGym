import React, { useState, useEffect } from 'react';
import { LineChart } from "../../components/GraCharts.js";
import { useAuth } from "../../context/authcontext";
import axios from '../../api/axios'
import '../../css/progresoPage.css';

function ProgresoPage() {
  const { user } = useAuth();
  const [monthlyExerciseData, setMonthlyExerciseData] = useState(new Array(12).fill(0));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llama a tu API para obtener los ejercicios del usuario autenticado
        const response = await axios.get(`/ejercicios/${user.id}`);
        const exercises = response.data;

        // Procesa los datos para sumar ejercicios por cada mes
        const exerciseCountByMonth = new Array(12).fill(0);
        exercises.forEach((exercise) => {
          const month = new Date(exercise.fecha).getMonth(); // Obtener el mes (0=enero, 11=diciembre)
          exerciseCountByMonth[month] += 1; // Sumar el ejercicio al mes correspondiente
        });

        setMonthlyExerciseData(exerciseCountByMonth);
      } catch (error) {
        console.error("Error al obtener los ejercicios:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="progreso-page-container">
      <h2>Progreso de Rutinas</h2>
      <LineChart data={monthlyExerciseData} />
    </div>
  );
}

export default ProgresoPage;

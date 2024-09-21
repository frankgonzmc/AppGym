import React, { useEffect, useState } from 'react';
import { useRutinas } from '../context/rutinascontext';
import { getEjerciciosRequest } from '../api/ejercicio'; // Asumiendo que tienes esta función

const RutinaForm = () => {
  const { createRutina } = useRutinas();
  const [ejercicios, setEjercicios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nivel, setNivel] = useState('');
  const [selectedEjercicios, setSelectedEjercicios] = useState([]);
  const [series, setSeries] = useState(1);
  const [repeticiones, setRepeticiones] = useState(10);
  const [duracion, setDuracion] = useState(60);

  // Obtener los ejercicios disponibles
  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const res = await getEjerciciosRequest();
        setEjercicios(res.data);
      } catch (error) {
        console.error('Error al obtener ejercicios:', error);
      }
    };
    fetchEjercicios();
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear la rutina
    const nuevaRutina = {
      nombre,
      descripcion,
      nivel,
      user: user._id // Reemplaza con el ID del usuario actual
    };

    // Crear la rutina y obtener su ID
    const rutinaCreada = await createRutina(nuevaRutina);

    // Agregar los detalles de la rutina
    if (rutinaCreada) {
      for (const ejercicioId of selectedEjercicios) {
        const detalleRutina = {
          rutina: rutinaCreada._id,
          ejercicio: ejercicioId,
          orden: selectedEjercicios.indexOf(ejercicioId) + 1,
          series,
          repeticiones,
          duracion
        };

        // Aquí deberías hacer una llamada a tu API para guardar el detalle
        await createDetalleRutina(detalleRutina); // Implementa esta función en tu API
      }
    }

    // Reiniciar el formulario
    setNombre('');
    setDescripcion('');
    setNivel('');
    setSelectedEjercicios([]);
    setSeries(1);
    setRepeticiones(10);
    setDuracion(60);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de la Rutina"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nivel"
        value={nivel}
        onChange={(e) => setNivel(e.target.value)}
        required
      />

      <h3>Selecciona Ejercicios</h3>
      {ejercicios.map((ejercicio) => (
        <div key={ejercicio._id}>
          <input
            type="checkbox"
            value={ejercicio._id}
            checked={selectedEjercicios.includes(ejercicio._id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedEjercicios([...selectedEjercicios, ejercicio._id]);
              } else {
                setSelectedEjercicios(selectedEjercicios.filter(id => id !== ejercicio._id));
              }
            }}
          />
          {ejercicio.nombre}
        </div>
      ))}

      <input
        type="number"
        placeholder="Series"
        value={series}
        onChange={(e) => setSeries(Number(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Repeticiones"
        value={repeticiones}
        onChange={(e) => setRepeticiones(Number(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Duración (segundos)"
        value={duracion}
        onChange={(e) => setDuracion(Number(e.target.value))}
        required
      />

      <button type="submit">Crear Rutina</button>
    </form>
  );
};

export default RutinaForm;
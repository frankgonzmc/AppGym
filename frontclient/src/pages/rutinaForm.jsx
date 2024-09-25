import React, { useEffect, useState } from 'react';
import { useRutinas } from '../context/rutinascontext';
import { getEjerciciosRequest } from '../api/ejercicio';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaRutina = {
      nombre,
      descripcion,
      nivel,
      user: user._id
    };

    const rutinaCreada = await createRutina(nuevaRutina);

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

        await createDetalleRutina(detalleRutina); // Usa el nuevo contexto aquí
      }
    }

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
      <h3 className='text-center text-black'>Crea tu Rutina</h3>

      <input
        type="text"
        className='w-full bg-zinc-700 text-while px-4 py-2 rounded-md my-2'
        placeholder="Nombre de la Rutina"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <textarea
        placeholder="Descripción"
        className='w-full bg-zinc-700 text-while px-4 py-2 rounded-md my-2'
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />

      <input
        type="text"
        className='w-full bg-zinc-700 text-while px-4 py-2 rounded-md my-2'
        placeholder="Nivel"
        value={nivel}
        onChange={(e) => setNivel(e.target.value)}
        required
      />

      <h3>Selecciona Ejercicios</h3>
      {ejercicios.map((ejercicio) => (
        <div className="ejercicio-item" key={ejercicio._id}>
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
          <label>{ejercicio.nombre}</label>
        </div>
      ))}

      <input
        type="number"
        className='w-full bg-zinc-700 text-while px-4 py-2 rounded-md my-2'
        placeholder="Series"
        value={series}
        onChange={(e) => setSeries(Number(e.target.value))}
        required
      />
      <input
        type="number"
        className='w-full bg-zinc-700 text-while px-4 py-2 rounded-md my-2'
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

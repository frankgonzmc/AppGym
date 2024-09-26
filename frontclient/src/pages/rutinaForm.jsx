import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useRutinas } from '../context/rutinascontext';
import { useProgreso } from '../context/progresocontext'; // Asegúrate de importar el contexto de progreso
import { getEjerciciosRequest } from '../api/ejercicio';
import { useAuth } from '../context/authcontext';
import { useDetallesRutina } from '../context/detallerutinaContext';

const RutinaForm = () => {
  const { createRutina } = useRutinas();
  const { createProgreso } = useProgreso(); // Usa el contexto para crear progreso
  const { createDetalleRutina } = useDetallesRutina();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ejercicios, setEjercicios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nivel, setNivel] = useState('');
  const [selectedEjercicios, setSelectedEjercicios] = useState([]);
  const [series, setSeries] = useState(10);
  const [repeticiones, setRepeticiones] = useState(4);
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

  const onSubmit = handleSubmit = async (e) => {
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

        await createDetalleRutina(detalleRutina); // Crear detalle de rutina

        // Crear progreso asociado
        await createProgreso({
          user: user._id,
          rutina: rutinaCreada._id,
          fecha: new Date(),
          estado: 'En Progreso' // Estado inicial
        });
      }
    }

    // Resetear estados
    setNombre('');
    setDescripcion('');
    setNivel('');
    setSelectedEjercicios([]);
    setSeries(1);
    setRepeticiones(10);
    setDuracion(60);
    navigate('/rutinas'); // Redireccionar a la lista de rutinas
  };

  return (
    <div className="flex justify-center text-black items-center p-10">
      <form onSubmit={onSubmit}>
        <h3 className='text-center text-black'>Crea tu Rutina</h3>

        <input
          type="text"
          className='w-full bg-zinc-700 text-black px-4 py-2 rounded-md my-2'
          placeholder="Nombre de la Rutina"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <textarea
          placeholder="Descripción"
          className='w-full bg-zinc-700 text-black px-4 py-2 rounded-md my-2'
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <input
          type="text"
          className='w-full bg-zinc-700 text-black px-4 py-2 rounded-md my-2'
          placeholder="Nivel"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          required
        />

        <h3>Selecciona Ejercicios</h3>
        {ejercicios.map((ejercicio) => (
          <div className="ejercicio-item text-black" key={ejercicio._id}>
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
          className='w-full bg-zinc-700 text-black px-4 py-2 rounded-md my-2'
          placeholder="Series"
          value={series}
          onChange={(e) => setSeries(Number(e.target.value))}
          required
        />
        <input
          type="number"
          className='w-full bg-zinc-700 text-black px-4 py-2 rounded-md my-2'
          placeholder="Repeticiones"
          value={repeticiones}
          onChange={(e) => setRepeticiones(Number(e.target.value))}
          required
        />
        <input
          type="number"
          className='w-full bg-zinc-700 text-black px-4 py-2 rounded-md my-2'
          placeholder="Duración (segundos)"
          value={duracion}
          onChange={(e) => setDuracion(Number(e.target.value))}
          required
        />

        <button value="container4-button1" className="registerbtn text-center items-center rounded-md my-2" type="submit">Crear Rutina</button>
      </form>
    </div>
  );
};

export default RutinaForm;

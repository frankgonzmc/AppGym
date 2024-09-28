import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useRutinas } from '../context/rutinascontext';
import { useProgreso } from '../context/progresocontext'; // Asegúrate de importar el contexto de progreso
import { getEjerciciosRequest } from '../api/ejercicio';
import { useAuth } from '../context/authcontext';
import { useDetallesRutina } from '../context/detallerutinacontext';

const RutinaForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createRutina } = useRutinas();
  const { createProgreso } = useProgreso(); // Usa el contexto para crear progreso
  const { createDetalleRutina } = useDetallesRutina();
  const [ejercicios, setEjercicios] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

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

  const onSubmit = handleSubmit((data) => {

    if (params.id) {
      //updateRutina(params.id, data)
    } else {
      try {

        console.log(data);

      } catch (error) {
        console.log(error);
      }
    }

    navigate('/rutinas')
  })

  /*
  
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nivel, setNivel] = useState('');
  const [selectedEjercicios, setSelectedEjercicios] = useState([]);
  const [series, setSeries] = useState(10);
  const [repeticiones, setRepeticiones] = useState(4);
  const [duracion, setDuracion] = useState(60);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

          const detalleResponse = await createDetalleRutina(detalleRutina);
          console.log('DetalleRutina creado:', detalleResponse);

          const progresoResponse = await createProgreso({
            user: user._id,
            rutina: rutinaCreada._id,
            fecha: new Date(),
            estado: 'En Progreso'
          });
          console.log('Progreso creado:', progresoResponse);
        }
      }

      // Resetear estados
      setNombre('');
      setDescripcion('');
      setNivel('');
      setSelectedEjercicios([]);
      setSeries(10);
      setRepeticiones(4);
      setDuracion(60);
      navigate('/rutinas'); // Redireccionar a la lista de rutinas
    } catch (error) {
      console.log(error);
    }
  };
*/
  return (
    <div className="flex justify-center text-white items-center p-10">
      <form onSubmit={onSubmit}>
        <h3 className='text-center text-white'>Crea tu Rutina</h3>

        <input
          type="text"
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          placeholder="Nombre de la rutina" {...register('nombre')}
          required
        />

        <textarea
          type="textarea"
          placeholder="Descripción" {...register('descripcion')}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          required
        />

        <input
          type="text"
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          placeholder="Nivel" {...register('nivel')}
          required
        />

        <h3>Selecciona Ejercicios</h3>
        {ejercicios.map((ejercicio) => (
          <div className="ejercicio-item text-white" key={ejercicio._id}>
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
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          placeholder="Series" {...register('series')}
          required
        />
        <input
          type="number"
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          placeholder="Repeticiones" {...register('repeticiones')}
          required
        />
        <input
          type="number"
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          placeholder="Duración (segundos)" {...register('series')}
          required
        />

        <button value="container4-button1" className="registerbtn text-white text-center items-center rounded-md my-2" type="submit">Crear Rutina</button>
      </form>
    </div>
  );
};

export default RutinaForm;

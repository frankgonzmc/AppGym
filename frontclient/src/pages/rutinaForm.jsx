import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom'
import { useRutinas } from '../context/rutinascontext';
import { useProgreso } from '../context/progresocontext'; // Asegúrate de importar el contexto de progreso
import { getEjerciciosRequest } from '../api/ejercicio';
import { useAuth } from '../context/authcontext';
import { useDetallesRutina } from '../context/detallerutinacontext';

const RutinaForm = () => {
  const { register, handleSubmit, setValue } = useForm();

  const { createRutina, getRutina } = useRutinas();
  const { createProgreso } = useProgreso(); // Usa el contexto para crear progreso
  const { createDetalleRutina } = useDetallesRutina();
  const { user } = useAuth();

  const navigate = useNavigate();
  const params = useParams();

  const [selectedEjercicios, setSelectedEjercicios] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    const loadRutina = async () => {
      if (params.id) {
        const rutina = await getRutina(params.id);
        if (rutina) {
          setValue('nombre', rutina.nombre);
          setValue('descripcion', rutina.descripcion);
          setSelectedEjercicios(rutina.detalles.map(detalle => detalle.ejercicio));
        }
      }
    };
    loadRutina();
  }, [params.id, setValue]);

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

  const onSubmit = handleSubmit(async (data) => {

    if (params.id) {
      //updateRutina(params.id, data)
      console.log(params.id, data)
    } else {
      try {
        // Crear la rutina
        const rutinaData = {
          ...data,
          user: user._id,
        };

        const rutinaCreada = await createRutina(rutinaData);

        // Asegúrate de que rutinaCreada no es undefined
        if (!rutinaCreada || !rutinaCreada._id) {
          throw new Error('Rutina no creada correctamente');
        }

        // Crear detalles de rutina utilizando el ID de la rutina recién creada
        for (const ejercicioId of selectedEjercicios) {
          const detalleRutina = {
            rutina: rutinaCreada._id, // Asegúrate de que este ID existe
            ejercicio: ejercicioId,
            // Aquí puedes agregar series, repeticiones, etc.
          };
          await createDetalleRutina(detalleRutina); // Asegúrate de que esta función esté definida y manejando bien la creación
        }

        // Crear progreso para la rutina
        const progresoData = {
          user: user._id,
          rutina: rutinaCreada._id,
          fecha: new Date(),
          estado: 'En Progreso',
        };
        const progresocreado = await createProgreso(progresoData);
        console.log('Progreso creado:', progresocreado);

        // Crear historial para la rutina
        const historialData = {
          user: user._id,
          rutina: rutinaCreada._id,
          fecha: new Date(),
          estado: 'En Progreso',
        };
        const historialCreado = await createProgreso(progresoData);
        console.log('Historial creado:', historialCreado);

      } catch (error) {
        console.log(error);
      }
    }

    navigate('/rutinas')
  })
  return (
    <div className="flex justify-center items-center p-35">
      <div className='bg-zinc-800 max-w-md w-full p-15 rounded-md'>
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

          <h3 className='text-white'>Selecciona Ejercicios</h3>
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
              <label className='text-white'>{ejercicio.nombre}</label>
            </div>
          ))}

          <button value="container4-button1" className="registerbtn text-white text-center items-center rounded-md my-2" type="submit">Crear Rutina</button>
        </form>
      </div>
    </div>
  );
};

export default RutinaForm;



/*
 
const [nombre, setNombre] = useState('');
const [descripcion, setDescripcion] = useState('');
const [nivel, setNivel] = useState('');
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


useEffect(() => {
  async function loadEjercicio() {
    if (params.id) {
      const ejercicio = await getEjercicio(params.id);
      console.log(ejercicio)
      setValue('codigo', ejercicio.codigo);
      setValue('nombre', ejercicio.nombre);
      setValue('descripcion', ejercicio.descripcion);
      setValue('nivel', ejercicio.duracion);
      setValue('categoria', ejercicio.categoria);
      setValue('series', ejercicio.descripcion);
      setValue('duracion', ejercicio.duracion);
      setValue('descanso', ejercicio.categoria);
      setValue('repeticiones', ejercicio.descripcion);
      setValue('estado', ejercicio.duracion);
    }
  }
  loadEjercicio();
}, [])



*/
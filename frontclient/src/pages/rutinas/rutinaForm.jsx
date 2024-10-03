import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom'
import { useRutinas } from '../../context/rutinascontext';
import { useProgreso } from '../../context/progresocontext'; // Asegúrate de importar el contexto de progreso
import { getEjerciciosRequest } from '../../api/ejercicio';
import { useAuth } from '../../context/authcontext';
import { useDetallesRutina } from '../../context/detallerutinacontext';
import { useHistorial } from '../../context/historialcontext'; // Asegúrate de importar el contexto de historial
import { Card } from '../../components/ui';

const RutinaForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createRutina, getRutina, updateRutina } = useRutinas();
  const { createProgreso } = useProgreso(); // Usa el contexto para crear progreso
  const { createHistorial } = useHistorial();
  const { createDetalleRutina } = useDetallesRutina();
  const { user } = useAuth();

  const navigate = useNavigate();
  const params = useParams();

  const [selectedEjercicios, setSelectedEjercicios] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);

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

  useEffect(() => {
    async function loadRutina() {
      if (params.id) {
        const data = await getRutina(params.id);
        console.log(data); // Revisa la estructura

        if (data && data.rutina) {
          setValue('nombre', data.rutina.nombre);
          setValue('descripcion', data.rutina.descripcion);
          setSelectedEjercicios(data.detalles.map(detalle => detalle.ejercicio._id));
          console.log("Valores establecidos:", data.rutina.nombre, data.rutina.descripcion);
        }
      }
    }
    loadRutina();
  }, [params.id, setValue]);


  const onSubmit = handleSubmit(async (data) => {
    const { nombre, descripcion } = data;

    if (!nombre || !descripcion || selectedEjercicios.length === 0) {
      console.error("Faltan datos requeridos");
      return;
    }

    try {
      if (params.id) {
        await updateRutina(params.id, { ...data, ejercicios: selectedEjercicios });
        navigate('/rutinas');
      } else {
        const nuevaRutina = { user: user._id, nombre, descripcion };
        const rutinaCreada = await createRutina(nuevaRutina);

        const detallesRutina = selectedEjercicios.map(ejercicioId => ({
          rutina: rutinaCreada._id,
          ejercicio: ejercicioId,
          fecha: new Date(),
        }));

        await Promise.all(detallesRutina.map(detalle => createDetalleRutina(detalle)));

        const progresoData = {
          user: user._id,
          rutina: rutinaCreada._id,
          fecha: new Date(),
          estado: 'En Progreso'
        };

        await createProgreso(progresoData);

        const historialData = {
          user: user._id,
          rutina: rutinaCreada._id,
          fecha: new Date(),
        };

        await createHistorial(historialData);

        navigate('/rutinas');
      }
    } catch (error) {
      console.error("Error al actualizar o crear la rutina:", error);
      // Mostrar un mensaje al usuario aquí, si es necesario
    }
  });

  const handleCheckboxChange = (ejercicioId) => {
    if (selectedEjercicios.includes(ejercicioId)) {
      setSelectedEjercicios(selectedEjercicios.filter(id => id !== ejercicioId));
    } else {
      setSelectedEjercicios([...selectedEjercicios, ejercicioId]);
    }
  };


  return (
    <Card>
      <div className="flex justify-center items-center p-5">
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
                  onChange={() => handleCheckboxChange(ejercicio._id)}
                />
                <label className='text-white'>{ejercicio.nombre}</label>
              </div>
            ))}

            <button className="btn btn-primary rounded-md my-2" type="submit">Crear Rutina</button>
          </form>
        </div>
      </div>
    </Card>
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
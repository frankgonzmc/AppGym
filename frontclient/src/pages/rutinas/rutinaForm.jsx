import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom'
import { useRutinas } from '../../context/rutinascontext';
import { useProgreso } from '../../context/progresocontext'; // Asegúrate de importar el contexto de progreso
import { getEjerciciosRequest } from '../../api/ejercicio';
import { useAuth } from '../../context/authcontext';
import { useDetallesRutina } from '../../context/detallerutinacontext';
import { Card } from '../../components/ui';

const RutinaForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createRutina, getRutina, updateRutina } = useRutinas();
  const { createProgreso } = useProgreso(); // Usa el contexto para crear progreso
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

        if (data && data.rutina) {
          setValue('nombre', data.rutina.nombre);
          setValue('descripcion', data.rutina.descripcion);
          setSelectedEjercicios(data.detalles.map(detalle => detalle.ejercicio._id));
        }
      }
    }
    loadRutina();
  }, [params.id, setValue]);


  const onSubmit = handleSubmit(async (data) => {
    const { nombre, descripcion, totalEjercicios } = data;

    if (!nombre || !descripcion || selectedEjercicios.length === 0) {
      console.error("Faltan datos requeridos");
      return;
    }

    try {
      if (params.id) {

        await updateRutina(params.id, { ...data, ejercicios: selectedEjercicios });
        console.log(params.id, { ...data, ejercicios: selectedEjercicios });
        navigate('/rutinas');

      } else {
        const nuevaRutina = {
          user: user._id,
          nombre,
          descripcion,
          totalEjercicios: selectedEjercicios.length,// Enviar los ejercicios seleccionados
        };

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

            <button className="btn btn-primary rounded-md my-2" type="submit">Guardar Rutina</button>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default RutinaForm;

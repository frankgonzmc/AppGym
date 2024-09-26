import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEjercicios } from '../context/ejercicioscontext';
import { useEffect } from 'react';
import { useAuth } from "../context/authcontext";

function ejercicioForm() {

  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { createEjercicio, getEjercicio, updateEjercicio } = useEjercicios(); // Obtener la función para crear un ejercicio
  const params = useParams();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function loadEjercicio() {
      if (params.id) {
        const ejercicio = await getEjercicio(params.id);
        console.log(ejercicio)
        setValue('codigo', ejercicio.codigo);
        setValue('nombre', ejercicio.nombre);
        setValue('descripcion', ejercicio.descripcion);
        setValue('duracion', ejercicio.duracion);
        setValue('categoria', ejercicio.categoria);
      }
    }
    loadEjercicio();
  }, [])

  useEffect(() => {
    if (isAuthenticated) navigate('/login')
  }, [isAuthenticated])

  const onSubmit = handleSubmit((data) => {

    if (params.id) {
      updateEjercicio(params.id, data)
    } else {
      createEjercicio(data);
    }


    navigate('/ejercicios')
  })

  return (
    <div className='bg-zinc-800 max-w-md w-full p-15 rounded-md'>
      <form onSubmit={onSubmit}>

        <input type="text" placeholder="Codigo" {...register('codigo')} className='w-full bg-zinc-700 text-while px-4 py-2 rounded-md my-2' autoFocus />
        <input type="text" placeholder="Nombre del ejercicio" {...register('nombre')} className='w-full bg-zinc-700 text-while px-4 py-2 rounded-md my-2' />

        <textarea rows="3" placeholder="Descripción del ejercicio" {...register('descripcion')} className='w-full bg-zinc-700 text-while px-4 py-2 rounded-md my-2'></textarea>

        <input type="number" placeholder="Duración" {...register('duracion')} className='w-full bg-zinc-700 text-while px-4 py-2 rounded-md my-2' />

        <select {...register('categoria')} className='w-full bg-zinc-700 text-while px-4 py-2 rounded-md my-2'>
          <option value="">Seleccione una categoría</option>
          <option value="Fuerza">Fuerza</option>
          <option value="Cardio">Cardio</option>
          <option value="Postura">Postura</option>
          <option value="Salud">Salud</option>
        </select>

        <button>
          Guarda Ejercicio
        </button>
      </form>
    </div>
  )
}

export default ejercicioForm
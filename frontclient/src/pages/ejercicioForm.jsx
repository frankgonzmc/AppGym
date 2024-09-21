import { useForm } from 'react-hook-from'
import { useEjercicios } from '../context/ejercicioscontext';

function ejercicioForm() {

  const { register, handleSubmit } = useForm();

  const { createEjercicio } = useEjercicios(); // Obtener la función para crear un ejercicio

  const onSubmit = handleSubmit((data) => {
    createEjercicio(data);
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
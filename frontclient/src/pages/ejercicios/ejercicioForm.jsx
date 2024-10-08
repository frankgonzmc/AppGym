import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEjercicios } from '../../context/ejercicioscontext';
import { Card } from "../../components/ui";
import { useEffect } from 'react';

function ejercicioForm() {

  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { createEjercicio, getEjercicio, updateEjercicio } = useEjercicios(); // Obtener la función para crear un ejercicio
  const params = useParams();
  const estado = "En Progreso"

  useEffect(() => {
    async function loadEjercicio() {
      if (params.id) {
        const ejercicio = await getEjercicio(params.id);
        console.log(ejercicio)
        setValue('codigo', ejercicio.codigo);
        setValue('nombre', ejercicio.nombre);
        setValue('descripcion', ejercicio.descripcion);
        setValue('nivel', ejercicio.nivel);
        setValue('series', ejercicio.series);
        setValue('repeticiones', ejercicio.repeticiones);
        setValue('descanso', ejercicio.descanso);
        setValue('duracion', ejercicio.duracion);
        setValue('categoria', ejercicio.categoria);
      }
    }
    loadEjercicio();
  }, [])

  const onSubmit = handleSubmit((data) => {

    if (params.id) {
      updateEjercicio(params.id, data)
    } else {
      createEjercicio(data);
    }


    navigate('/ejercicios')
  })

  return (
    <Card>
      <form onSubmit={onSubmit}></form>
      <div className='bg-zinc-800 max-w-md w-full p-15 rounded-md'>
        <form onSubmit={onSubmit}>

          <input type="text" placeholder="Codigo" {...register('codigo')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' autoFocus />
          <input type="text" placeholder="Nombre del ejercicio" {...register('nombre')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />

          <textarea rows="3" placeholder="Descripción del ejercicio" {...register('descripcion')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'></textarea>

          <input type="text" placeholder="Nivel" {...register('nivel')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />

          <input type="number" placeholder="Series" {...register('series')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />

          <input type="number" placeholder="Duración" {...register('duracion')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />

          <input type="number" placeholder="Descanso" {...register('descanso')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />

          <input type="number" placeholder="Repeticiones" {...register('repeticiones')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />

          <input type="hidden" {...register('estado')} value={estado} />

          <select {...register('categoria')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
            <option value="">Seleccione una categoría</option>
            <option value="Fuerza">Fuerza</option>
            <option value="Cardio">Cardio</option>
            <option value="Postura">Postura</option>
            <option value="Salud">Salud</option>
          </select>

          <button className="btn btn-primary rounded-md my-2" type="submit">Guardar Ejercicio</button>
        </form>
      </div>
    </Card>
  )
}

export default ejercicioForm
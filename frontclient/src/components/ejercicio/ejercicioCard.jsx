import { useEjercicios } from "../../context/ejercicioscontext";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/authcontext";
import { Button, ButtonLink, Card } from "../ui";

export function EjercicioCard({ ejercicio }) {
  const { user } = useAuth();
  const { deleteEjercicio } = useEjercicios();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const fetchExercises = async () => {
    try {
      const response = await axios.get(`/api/ejercicios/${user.nivel}`);
      setExercises(response.data);
    } catch (error) {
      console.error("Error al obtener los ejercicios", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (user?.nivel) {
      fetchExercises();
    }
  }, [user]);

  useEffect(() => {
    if (exercises.length > 0) {
      const interval = setInterval(() => {
        setCurrentExerciseIndex((prevIndex) => (prevIndex + 1) % exercises.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [exercises]);

  if (exercises.length === 0) {
    return <p>No hay ejercicios disponibles para tu nivel.</p>;
  }

  const currentExercise = exercises[currentExerciseIndex];
  const isRecommended = ejercicio.nivel === user.nivel;

  return (
    <Card className={isRecommended ? "bg-green-200" : ""}>
      <header className="flex justify-between items-center">
        <h1 className="text-2xl text-slate-300 font-bold text-center">{ejercicio.nombre}</h1>
        {isRecommended && (
          <span className="text-white bg-green-500 px-2 py-1 rounded-lg text-sm">
            Recomendado
          </span>
        )}
      </header>
      <hr className="text-slate-300" />
      <p className="text-slate-300">Descripción: {ejercicio.descripcion}</p>
      <p className="text-slate-300">Nivel: {ejercicio.nivel}</p>
      <p className="text-slate-300">Categoria: {ejercicio.categoria}</p>
      <hr className="text-slate-300" />
      <p className="text-slate-300">Series: {ejercicio.series}</p>
      <p className="text-slate-300">Repeticiones: {ejercicio.repeticiones}</p>
      <p className="text-slate-300">Duración: {ejercicio.duracion} segundos</p>
      <p className="text-slate-300">Descanso: {ejercicio.descanso} segundos</p>
      {ejercicio.imagen && (
        <img src={ejercicio.imagen} alt={ejercicio.nombre} className="w-full h-auto" />
      )}
      <p className="text-slate-300">
        {ejercicio.date &&
          new Date(ejercicio.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
      <footer>
        <div className="flex gap-x-2 items-center">
          <button className="btn btn-primary" onClick={() => deleteEjercicio(ejercicio._id)}>Delete</button>
          <button className="btn btn-primary" onClick={() => navigate(`/ejercicio/${ejercicio._id}`)}>Editar Ejercicio</button>
        </div>
      </footer>
    </Card>
  );
}
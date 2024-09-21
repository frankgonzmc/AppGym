import { useEffect } from "react";
import { useEjercicios } from "../context/ejercicioscontext";
import { EjercicioCard } from "../components/ejercicio/ejercicioCard";
import { ImFileEmpty } from "react-icons/im";

export function EjercicioPage() {
  const { ejercicio, getEjercicio } = useEjercicios();

  useEffect(() => {
    getEjercicio();
  }, []);

  return (
    <>
      {ejercicio.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No hay ejercicios por el momento, agrega uno...
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {ejercicio.map((ejercicio) => (
          <EjercicioCard ejercicio={ejercicio} key={ejercicio._id} />
        ))}
      </div>
    </>
  );
}

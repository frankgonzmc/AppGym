import { useEffect } from "react";
import { useEjercicios } from "../../context/ejercicioscontext";
import { EjercicioCard } from "../../components/ejercicio/ejercicioCard";
import { ImFileEmpty } from "react-icons/im";
import { Link } from "react-router-dom";

export default function EjercicioPage() {
  const { ejercicios, getEjercicios } = useEjercicios();

  useEffect(() => {
    getEjercicios();
  }, []);

  return (
    <>
      {!ejercicios || ejercicios.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No hay ejercicios por el momento, agrega uno...
            </h1>
            <p className="flex gap-x-2 justify-between">
              <Link to="/add-ejercicios"> CREAR EJERCICIOS </Link>
            </p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {ejercicios && ejercicios.map((ejercicio) => (
          <EjercicioCard ejercicio={ejercicio} key={ejercicio._id} />
        ))}
      </div>
    </>
  );
}

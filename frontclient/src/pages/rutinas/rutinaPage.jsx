import { useEffect } from "react";
import { useRutinas } from "../../context/rutinascontext";
import { RutinaCard } from "../../components/rutina/rutinaCard";
import { ImFileEmpty } from "react-icons/im";
import { Link } from "react-router-dom";
import { useProgreso } from "../../context/progresocontext"; // Importamos el contexto de progreso

export default function RutinaPage() {
  const { rutinas, getRutinas } = useRutinas();
  const { getProgreso } = useProgreso(); // Obtenemos las funciones de progreso

  useEffect(() => {
    getRutinas();
  }, []);

  // Obtén el progreso de cada rutina
  useEffect(() => {
    if (rutinas.length > 0) {
      rutinas.forEach((rutina) => {
        getProgreso(rutina._id); // Sincroniza el progreso de cada rutina
      });
    }
  }, [rutinas]);

  return (
    <>
      {!rutinas || rutinas.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No hay Rutinas por el momento, agrega una...
            </h1>
            <p className="flex gap-x-2 justify-between">
              <Link to="/add-rutinas"> CREAR RUTINA</Link>
            </p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {rutinas && rutinas.map((rutina) => (
          <RutinaCard rutina={rutina} key={rutina._id} />
        ))}
      </div>
    </>
  );
}

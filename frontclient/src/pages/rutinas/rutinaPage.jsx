import { useEffect } from "react";
import { useRutinas } from "../../context/rutinascontext";
import { useProgreso } from "../../context/progresocontext"; // Importar el contexto de progreso
import { RutinaCard } from "../../components/rutina/rutinaCard";
import { ImFileEmpty } from "react-icons/im";
import { Link } from "react-router-dom";

export default function RutinaPage() {
  const { rutinas, getRutinas } = useRutinas();
  const { getProgreso } = useProgreso(); // Obtener la función getProgreso del contexto

  useEffect(() => {
    const fetchRutinas = async () => {
      await getRutinas();
      rutinas.forEach(rutina => {
        getProgreso(rutina._id); // Obtener progreso para cada rutina
      });
    };

    fetchRutinas();
  }, [getRutinas, rutinas, getProgreso]); // Agregar dependencias al efecto

  return (
    <>
      {!rutinas || rutinas.length === 0 ? ( // Cambiar && por ?
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
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {rutinas.map((rutina) => (
            <RutinaCard rutina={rutina} key={rutina._id} />
          ))}
        </div>
      )}
    </>
  );
}

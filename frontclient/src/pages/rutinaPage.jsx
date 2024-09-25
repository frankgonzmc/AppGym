import { useEffect } from "react";
import { useRutinas } from "../context/rutinascontext";
import { RutinaCard } from "../components/rutina/rutinaCard";
import { ImFileEmpty } from "react-icons/im";

export default function RutinaPage() {
  const { rutinas, getRutinas } = useRutinas();

  useEffect(() => {
    getRutinas();
  }, []);

  return (
    <>
      {!rutinas || rutinas.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No hay Rutinas por el momento, agrega uno...
            </h1>

            <p>
              <Link to="/add-rutinas"></Link>
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

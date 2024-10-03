import React, { useState, useEffect } from 'react';
import '../../css/progresoPage.css';

function ProgresoPage() {
  const [rutinas, setRutinas] = useState([]);

  // Simular llamada a la API para obtener rutinas y ejercicios del usuario
  useEffect(() => {
    const fetchData = async () => {
      // Aquí iría la llamada real a la API usando fetch o axios
      const data = [
        
      ];
      setRutinas(data);
    };

    fetchData();
  }, []);

  return (
    <div className="progreso-page-container">
      <h2>Progreso de Rutinas</h2>
      {rutinas.map((rutina, index) => (
        <div key={index} className="rutina-container">
          <h3>{rutina.rutina}</h3>
          {rutina.ejercicios.map((ejercicio, i) => (
            <div key={i} className="progress-bar-container">
              <span className="progress-label">
                {ejercicio.nombre} (de {rutina.rutina})
              </span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${ejercicio.progreso}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ProgresoPage;

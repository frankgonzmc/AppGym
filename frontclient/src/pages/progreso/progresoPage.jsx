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
      
      
    </div>
  );
}

export default ProgresoPage;

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Asegúrate de importar los estilos de la librería
import '../css/calendarPage.css'; // Tu propio archivo CSS para personalizar el calendario

function CalendarPage() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="calendar-page-container">
      <h2 className="calendar-title">Calendario de Rutinas</h2>
      <Calendar
        onChange={setValue}
        value={value}
        className="calendar-component"
      />
      <div className="calendar-selected-date">
        Fecha seleccionada: {value.toDateString()}
      </div>
    </div>
  );
}

export default CalendarPage;

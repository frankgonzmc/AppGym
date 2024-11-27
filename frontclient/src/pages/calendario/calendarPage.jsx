import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/calendarPage.css'; // Tu propio archivo CSS para personalizar el calendario

function CalendarPage() {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState({}); // Para almacenar eventos por fecha

  const handleDateChange = (newDate) => {
    setValue(newDate);
    // Puedes manejar la lógica para mostrar notas/eventos aquí si lo deseas
  };

  const handleAddEvent = () => {
    const eventNote = prompt("Escribe una nota para la fecha seleccionada:");
    if (eventNote) {
      const dateKey = value.toDateString();
      setEvents(prevEvents => ({
        ...prevEvents,
        [dateKey]: [...(prevEvents[dateKey] || []), eventNote]
      }));
    }
  };

  return (
    <section>
      <div className="calendar-page-container">
        <h2 className="calendar-title">Calendario de Rutinas</h2>
        <Calendar
          onChange={handleDateChange}
          value={value}
          className="calendar-component"
        />
        <div className="calendar-selected-date">
          Fecha seleccionada: {value.toDateString()}
        </div>
        <button className="btn btn-primary mt-3" onClick={handleAddEvent}>
          Agregar Nota
        </button>
        <div className="event-list mt-3">
          {events[value.toDateString()] && events[value.toDateString()].length > 0 ? (
            <ul>
              {events[value.toDateString()].map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          ) : (
            <p>No hay notas para esta fecha.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CalendarPage;

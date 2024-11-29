import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/calendarPage.css';

function CalendarPage() {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [newNote, setNewNote] = useState('');

  const handleDateChange = (newDate) => {
    setValue(newDate);
  };

  const handleAddEvent = () => {
    const dateKey = value.toDateString();
    if (newNote.trim()) {
      setEvents((prevEvents) => ({
        ...prevEvents,
        [dateKey]: [...(prevEvents[dateKey] || []), newNote.trim()],
      }));
      setNewNote('');
      setShowInput(false);
    }
  };

  return (
    <section className="seccion">
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
        <button
          className="btn btn-primary mt-3"
          onClick={() => setShowInput(true)}
        >
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

        {showInput && (
          <div className="input-container">
            <input
              type="text"
              className="form-control"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Escribe tu nota..."
            />
            <button className="btn btn-success mt-2" onClick={handleAddEvent}>
              Guardar
            </button>
            <button
              className="btn btn-danger mt-2"
              onClick={() => setShowInput(false)}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CalendarPage;

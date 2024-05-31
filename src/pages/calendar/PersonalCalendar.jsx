import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import '../../styles.css';

function PersonalCalendar() {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Lógica para obtener eventos de la base de datos y establecerlos en el estado de eventos
        fetchEventsFromDatabase();
    }, []);

    const fetchEventsFromDatabase = async () => {
        try {
            const response = await axios.get('ruta/hacia/tus/eventos');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    return (
        <div className='home-page-main-format'>
            <Calendar
                onChange={setDate}
                value={date}
                tileContent={({ date, view }) => {
                    // Lógica para mostrar contenido en las celdas del calendario
                    const formattedDate = date.toLocaleDateString(); // Utilizar la función de JavaScript para formatear la fecha
                    const eventsForDate = events.filter(event => event.date === formattedDate);
                    return (
                        <div>
                            {eventsForDate.map(event => (
                                <div key={event.id}>{event.title}</div>
                            ))}
                        </div>
                    );
                }}
            />
        </div>
    );
}

export default PersonalCalendar;
import React, { useState, useEffect } from 'react';
import '../../styles.css';

function TrainingSession() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [routine, setRoutine] = useState('');

    // Obtener el día actual
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const today = new Date().getDay();
    const todayName = daysOfWeek[today];

    useEffect(() => {
        if (selectedDay === null) {
            // Aquí deberías obtener la rutina del día actual
            const todayRoutine = `Rutina del ${todayName}`; // reemplaza esto con la lógica real para obtener la rutina del día actual
            setRoutine(todayRoutine);
        } else {
            // Aquí deberías obtener la rutina del día seleccionado
            const selectedDayRoutine = `Rutina del ${selectedDay}`; // reemplaza esto con la lógica real para obtener la rutina del día seleccionado
            setRoutine(selectedDayRoutine);
        }
    }, [selectedDay, todayName]);

    const handleDaySelection = (event) => {
        setSelectedDay(event.target.value);
    };

    return (
        <div className='home-page-main-format'>
            <h1 className='main-page-header'>Elige tu rutina de entrenamiento</h1>
            <div>
                <button onClick={() => setSelectedDay(null)}>Rutina del {todayName}</button>
                <select onChange={handleDaySelection} value={selectedDay || ''}>
                    <option value="" disabled>Selecciona otro día</option>
                    {daysOfWeek
                        .filter(day => day !== todayName)
                        .map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                </select>
            </div>
            <div className='main-page-header'>
                <h2>{routine}</h2>
            </div>
        </div>
    );
}

export default TrainingSession;

import React, { useState, useEffect } from 'react';
import '../../styles.css';

function TrainingSession() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [routine, setRoutine] = useState('');

    useEffect(() => {
        if (selectedDay === null) {
            // Aquí deberías obtener la rutina del día actual
            const todayRoutine = "Rutina del día actual"; // reemplaza esto con la lógica real para obtener la rutina del día actual
            setRoutine(todayRoutine);
        } else {
            // Aquí deberías obtener la rutina del día seleccionado
            const selectedDayRoutine = `Rutina del día ${selectedDay}`; // reemplaza esto con la lógica real para obtener la rutina del día seleccionado
            setRoutine(selectedDayRoutine);
        }
    }, [selectedDay]);

    const handleDaySelection = (event) => {
        setSelectedDay(event.target.value);
    };

    return (
        <div className='home-page-main-format'>
            <h1 className='main-page-header'>Elige el dia de tu rutina de entrenamiento</h1>
            <div>
                <button onClick={() => setSelectedDay(null)}>Rutina del día actual</button>
                <select onChange={handleDaySelection} value={selectedDay || ''}>
                    <option value="" disabled>Selecciona otro día</option>
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sábado">Sábado</option>
                    <option value="Domingo">Domingo</option>
                </select>
            </div>
            <div>
                <h2>{routine}</h2>
            </div>
        </div>
    );
}

export default TrainingSession;

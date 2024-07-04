import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles.css';

function RoutinesListed() {
    const [routines, setRoutines] = useState([]);
    const [routineToDelete, setRoutineToDelete] = useState(null);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            axios.get('http://localhost:8081/routine', { params: { userId: userId } }) // Pasa el userId como parámetro de consulta
                .then(res => {
                    const routinesData = res.data;
                    setRoutines(routinesData);
                })
                .catch(err => console.log(err));
        } else {
            console.error('UserId is not available in localStorage');
        }
    }, [userId]);

    const confirmDelete = (id) => {
        setRoutineToDelete(id);
    };

    const deleteRoutine = async (routineId) => {
        try {
            const API_URL = `http://localhost:8081/routine/${routineId}`;
            const res = await axios.delete(API_URL);

            if (res.status === 200) {
                console.log('Routine deleted successfully');
                setRoutines(routines.filter((routine) => routine.routineId !== routineId));
                setRoutineToDelete(null);
            } else {
                console.log('Error deleting routine');
            }
        } catch (error) {
            console.error('Error deleting routine:', error);
        }
    };

    const cancelDelete = () => {
        setRoutineToDelete(null);
    };

    return (
        <div className='main-format-create-plan'>
            <Link to='/home' id='backButton'>Back</Link>

            <h2 className='main-page-header'>My routines</h2>
            {routines.map((routine) => (
                <div className='prompt' key={routine.routineId}>
                    <h3 id='top-text'>Name: {routine.name}</h3>
                    <p id='top-text'>Id: {routine.routineId}</p>
                    <p id='top-text'>Day: {routine.day}</p>
                    <p id='top-text'>Type: {routine.type}</p>

                    <button id='defaultButton' onClick={() => confirmDelete(routine.routineId)}>
                        Delete routine
                    </button>
                    <Link to={`/addexercise/${routine.routineId}`} id='defaultButton'>Add exercises</Link>

                    {routine.routineId === routineToDelete && (
                        <div>
                            <p id='top-text'>¿Are you sure?</p>
                            <button id='colouredButton' onClick={cancelDelete}>No</button>
                            <button id='defaultButton' onClick={() => deleteRoutine(routine.routineId)}>Yes</button>
                        </div>
                    )}
                </div>
            ))}
            <Link to='/createroutine' id='defaultButton'>Create New Routine</Link>
        </div>
    );
}

export default RoutinesListed;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles.css';

function PlansListed() {
    const [routines, setRoutines] = useState([]);
    const [routineToDelete, setRoutineToDelete] = useState(null);
    const [showEditDropdown, setShowEditDropdown] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        axios.get('http://localhost:8081/routine')
            .then(res => {
                const routinesData = res.data;
                setRoutines(routinesData);
            })
            .catch(err => console.log(err));
    }, []);

    const confirmDelete = (id) => {
        setRoutineToDelete(id);
    };

    const deletePlan = async (routineId) => {
        try {
            const API_URL = `http://localhost:8081/routine/${routineId}`;
            const res = await axios.delete(API_URL);

            if (res.status === 200){
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

    const toggleEditDropdown = () => {
        setShowEditDropdown(!showEditDropdown);
    };

    const handleDaySelect = (day) => {
        setSelectedDay(day);
        setShowEditDropdown(false);
    };

    return (
        <div className='main-format-create-plan'>
            <Link to='/home' id='backButton'>Back</Link>

            <h2 className='main-page-header'>My routines</h2>
            {routines.map((routine) => (
                console.log(routine),
                    <div className='prompt' key={routine.routineId}>
                        <h3 id='top-text'>{routine.name}</h3>
                        <p id='top-text'>{routine.type}</p>
                        <p id='top-text'>{routine.description}</p>

                        <button id='defaultButton' onClick={toggleEditDropdown}>
                            {showEditDropdown ? 'Close Edit' : 'Edit Routine'}
                        </button>

                        {showEditDropdown && (
                            <div className='dropdown'>
                                <p id='top-text'>Select a day:</p>
                                {daysOfWeek.map((day) => (
                                    <Link key={day} to={`/plans/${routine.routineId}/schedule/${day}`}>
                                        <button className='dropdownButton' onClick={() => handleDaySelect(day)}>
                                            {day}
                                        </button>
                                    </Link>
                                ))}
                            </div>
                        )}

                        <button id='defaultButton' onClick={() => confirmDelete(routine.routineId)}>
                            Delete routine
                        </button>

                        {routine.routineId === routineToDelete && (
                            <div>
                                <p id='top-text'>¿Are you sure?</p>
                                <button id='colouredButton' onClick={cancelDelete}>No</button>
                                <button id='defaultButton' onClick={() => deletePlan(routine.routineId)}>Yes</button>
                            </div>
                        )}
                    </div>
            ))}
            <Link to='/createroutine' id='defaultButton'>Create New Routine</Link>
        </div>
    );
}

export default PlansListed;
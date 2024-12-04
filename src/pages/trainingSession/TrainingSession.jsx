import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCheck, FaPlus, FaMinus } from 'react-icons/fa';
import './TrainingSession.css';
import BackButton from "../../components/backButton/BackButton";

function TrainingSession() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [routine, setRoutine] = useState('');
    const [activePlans, setActivePlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [routineExercises, setRoutineExercises] = useState([]);
    const [exerciseStatus, setExerciseStatus] = useState({});

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    const todayName = daysOfWeek[today];
    const userId = localStorage.getItem('userId');

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    useEffect(() => {
        const fetchPlans = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:8081/plan/${userId}`, {
                        params: { userId }
                    });
                    const plans = response.data;
                    const currentDate = getCurrentDate();
                    const activePlans = plans.filter(plan => {
                        return currentDate >= plan.startDate && currentDate <= plan.endDate;
                    });

                    setActivePlans(activePlans);

                    if (activePlans.length === 1) {
                        setSelectedPlan(activePlans[0].planId);
                    }
                } catch (error) {
                    console.error('Error fetching plans:', error);
                }
            } else {
                console.error('UserId is not available in localStorage');
            }
        };

        fetchPlans();
    }, [userId]);

    const fetchRoutineExercises = async (routineId) => {
        try {
            const response = await axios.get(`http://localhost:8081/routineexercise/${routineId}`);
            const exercises = response.data;

            if (Array.isArray(exercises)) {
                const exercisesWithId = exercises.map((exercise, index) => ({ id: index + 1, ...exercise }));
                setRoutineExercises(exercisesWithId);

                const initialExerciseStatus = exercises.reduce((acc, exercise, index) => {
                    acc[index + 1] = { setsCompleted: 0 };
                    return acc;
                }, {});
                setExerciseStatus(initialExerciseStatus);
            } else {
                console.error('Invalid exercises data:', exercises);
                setRoutineExercises([]);
                setExerciseStatus({});
            }
        } catch (error) {
            console.error('Error fetching routine exercises:', error);
            setRoutineExercises([]);
            setExerciseStatus({});
        }
    };

    useEffect(() => {
        const fetchRoutine = async () => {
            if (selectedPlan !== null && selectedDay !== null) {
                try {
                    const response = await axios.get(`http://localhost:8081/routine/${selectedDay}`, {
                        params: { planId: selectedPlan }
                    });
                    const routineId = response.data.routineId;

                    if (routineId) {
                        fetchRoutineExercises(routineId);
                        setRoutine(`${selectedDay} routine:`);
                    } else {
                        setRoutineExercises([]);
                        setRoutine(`There is no routine for this day: ${selectedDay}`);
                    }
                } catch (error) {
                    console.error('Error fetching routine and exercises:', error);
                    setRoutineExercises([]);
                    setRoutine('Error fetching routine and exercises');
                }
            } else if (selectedPlan !== null) {
                const todayRoutine = `${selectedDay} routine for the plan: ${selectedPlan}`;
                setRoutine(todayRoutine);
                setSelectedDay(todayName);
            }
        };

        fetchRoutine();
    }, [selectedDay, selectedPlan, todayName]);

    const handleDaySelection = async (event) => {
        const selectedDay = event.target.value;
        setSelectedDay(selectedDay);
    };

    const handlePlanSelection = (event) => {
        setSelectedPlan(event.target.value);
    };

    const incrementSetCompletion = (exerciseId) => {
        setExerciseStatus(prevState => {
            const updatedState = { ...prevState };
            const currentSetsCompleted = updatedState[exerciseId]?.setsCompleted || 0; // Asegurarse de que no sea undefined

            // Obtén el número total de sets para el ejercicio
            const totalSets = routineExercises.find(exercise => exercise.id === exerciseId)?.sets || 0;

            // Solo incrementar si no hemos alcanzado el número de sets
            if (currentSetsCompleted < totalSets) {
                updatedState[exerciseId] = { setsCompleted: currentSetsCompleted + 1 };
            }

            return updatedState;
        });
    };

    const decrementSetCompletion = (exerciseId) => {
        setExerciseStatus(prevState => {
            const updatedState = { ...prevState };
            const currentSetsCompleted = updatedState[exerciseId]?.setsCompleted || 0;

            if (currentSetsCompleted > 0) {
                updatedState[exerciseId] = { setsCompleted: currentSetsCompleted - 1 };
            }

            return updatedState;
        });
    };

    // Paginación de filas
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 5;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedExercises = routineExercises.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    return (
        <div className='main-page p'>
            <Link to='/home' id='backButton'><BackButton /></Link>

            <div className="prompt">
                <h2 className='main-page-header'>Select your training plan!</h2>
            </div>

            <div className="prompt">
                {activePlans.length >= 1 && (
                    <div className="prompt">
                        <h2 className='main-page-header'>Select an active plan:</h2>
                        <select id='signupForms' onChange={handlePlanSelection} value={selectedPlan || ''}>
                            <option value="" disabled>Selecciona un plan</option>
                            {activePlans.map(plan => (
                                <option key={plan.planId} value={plan.planId}>{plan.name}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="prompt">
                {selectedPlan && (
                    <div>
                        <button id="defaultSmallButton" onClick={() => setSelectedDay(todayName)}>{todayName} routine</button>
                        <select id='signupForms' onChange={handleDaySelection} value={selectedDay || ''}>
                            <option value="" disabled>Selecciona otro día</option>
                            {daysOfWeek
                                .filter(day => day !== todayName)
                                .map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                        </select>
                    </div>
                )}
            </div>

            <div className='main-page-header'>
                <h2>{routine}</h2>

                {routineExercises.length > 0 ? (
                    <>
                        <h3>Exercises:</h3>
                        <div className="responsive-table">
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Sets</th>
                                    <th>Reps</th>
                                    <th>Weight</th>
                                    <th>Duration</th>
                                    <th>Sets counter</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginatedExercises.map((exercise) => (
                                    <tr key={exercise.id}>
                                        <td>{exercise.name}</td>
                                        <td>{exercise.sets}</td>
                                        <td>{exercise.reps}</td>
                                        <td>{exercise.weight}</td>
                                        <td>{exercise.duration}</td>
                                        <td>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <FaMinus onClick={() => decrementSetCompletion(exercise.id)}/>
                                                <span style={{margin: '0 5px'}}>
                                            {exerciseStatus[exercise.id]?.setsCompleted || 0}
                                        </span>
                                                <FaPlus onClick={() => incrementSetCompletion(exercise.id)}/>
                                                {exerciseStatus[exercise.id]?.setsCompleted >= exercise.sets && (
                                                    <FaCheck style={{marginLeft: '10px'}}/>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <div className="pagination">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                                    Prev
                                </button>
                                <span>{currentPage + 1}</span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={(currentPage + 1) * rowsPerPage >= routineExercises.length}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                ) : selectedDay && routineExercises.length === 0 && !routine.includes('no routine') ? (
                    <p>There is no exercises for this day, add one!</p>
                ) : null}
            </div>

        </div>
    );
}

export default TrainingSession;

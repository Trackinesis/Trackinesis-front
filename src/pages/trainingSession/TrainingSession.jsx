import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { FaCheck, FaPlus, FaMinus } from 'react-icons/fa';
import './TrainingSession.css';

function TrainingSession() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [routine, setRoutine] = useState('');
    const [activePlans, setActivePlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [routineExercises, setRoutineExercises] = useState([]); // Initialize as an empty array
    const [exerciseStatus, setExerciseStatus] = useState({}); // State to track completion status of each exercise

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
                        setRoutine(`Rutina del ${selectedDay} para el Plan ${selectedPlan}`);
                    } else {
                        setRoutineExercises([]);
                        setRoutine(`No hay rutina para el día ${selectedDay}`);
                    }
                } catch (error) {
                    console.error('Error fetching routine and exercises:', error);
                    setRoutineExercises([]);
                    setRoutine('Error fetching routine and exercises');
                }
            } else if (selectedPlan !== null) {
                const todayRoutine = `Rutina del ${todayName} para el Plan ${selectedPlan}`;
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
            updatedState[exerciseId].setsCompleted += 1;
            return updatedState;
        });
    };

    const decrementSetCompletion = (exerciseId) => {
        setExerciseStatus(prevState => {
            const updatedState = { ...prevState };
            const currentSetsCompleted = updatedState[exerciseId].setsCompleted;
            const totalSets = routineExercises.find(exercise => exercise.id === exerciseId)?.sets || 0;

            if (currentSetsCompleted > 0) {
                updatedState[exerciseId].setsCompleted -= 1;
            }

            return updatedState;
        });
    };

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 150 },
        { field: 'sets', headerName: 'Sets', width: 100 },
        { field: 'reps', headerName: 'Reps', width: 100 },
        { field: 'weight', headerName: 'Peso', width: 100 },
        { field: 'duration', headerName: 'Duración', width: 150 },
        {
            field: 'counter',
            headerName: 'Contador de Sets',
            width: 180,
            renderCell: (params) => {
                const exerciseId = params.id;
                const totalSets = params.row.sets;
                const setsCompletedCount = exerciseStatus[exerciseId]?.setsCompleted || 0;

                const isSetCompleted = setsCompletedCount >= totalSets;
                const incrementIcon = <FaPlus onClick={() => incrementSetCompletion(exerciseId)} />;
                const decrementIcon = <FaMinus onClick={() => decrementSetCompletion(exerciseId)} />;

                const handleClickIncrement = () => {
                    if (!isSetCompleted) {
                        incrementSetCompletion(exerciseId);
                    }
                };

                const handleClickDecrement = () => {
                    if (setsCompletedCount > 0) {
                        decrementSetCompletion(exerciseId);
                    }
                };

                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {setsCompletedCount > 0 && decrementIcon}
                        <span style={{ margin: '0 5px' }}>{setsCompletedCount}</span>
                        {incrementIcon}
                        {isSetCompleted && <FaCheck style={{ marginLeft: '10px' }} />}
                    </div>
                );
            },
        },
    ];

    return (
        <div className='home-page-main-format'>
            <Link to='/home' id='backButton'>Back</Link>
            <h1 className='main-page-header'>Elige tu plan de entrenamiento</h1>
            {activePlans.length >= 1 && (
                <div>
                    <h2 className='main-page-header'>Selecciona un plan activo:</h2>
                    <select onChange={handlePlanSelection} value={selectedPlan || ''}>
                        <option value="" disabled>Selecciona un plan</option>
                        {activePlans.map(plan => (
                            <option key={plan.planId} value={plan.planId}>{plan.name}</option>
                        ))}
                    </select>
                </div>
            )}
            {selectedPlan && (
                <div>
                    <button onClick={() => setSelectedDay(todayName)}>Rutina de {todayName}</button>
                    <select onChange={handleDaySelection} value={selectedDay || ''}>
                        <option value="" disabled>Selecciona otro día</option>
                        {daysOfWeek
                            .filter(day => day !== todayName)
                            .map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                    </select>
                </div>
            )}
            <div className='main-page-header'>
                <h2>{routine}</h2>
                <h3>Ejercicios de la rutina:</h3>
                {routineExercises.length > 0 ? (
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={routineExercises}
                            columns={columns}
                            sx={{
                                '& .MuiDataGrid-root': {
                                    color: '#000',
                                    backgroundColor: '#fff',
                                },
                                '& .MuiDataGrid-cell': {
                                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                },
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#f5f5f5',
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    backgroundColor: '#f5f5f5',
                                },
                            }}
                        />
                    </div>
                ) : (
                    <p>No hay ejercicios para esta rutina.</p>
                )}
            </div>
        </div>
    );
}

export default TrainingSession;
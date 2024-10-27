import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import BackButton from "../../components/backButton/BackButton"; // Importar componentes de DataTable de Material-UI
import './routinesListed.css'

function RoutinesListed() {
    const [routines, setRoutines] = useState([]);
    const [routineToDelete, setRoutineToDelete] = useState(null);
    const [routineExercises, setRoutineExercises] = useState([]);
    const [showEditDropdown, setShowEditDropdown] = useState(false);
    const [selectedRoutine, setSelectedRoutine] = useState(null);
    const [editingExercise, setEditingExercise] = useState(null);
    const currentUserId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get(`http://localhost:8081/routine/get/${currentUserId}`)
            .then(res => {
                const routinesData = res.data;
                setRoutines(routinesData);
            })
            .catch(err => console.log(err));
    }, []);

    const confirmDelete = (id) => {
        setRoutineToDelete(id);
    };

    const deleteExercise = async (routineExerciseId) => {
        try {
            const API_URL = `http://localhost:8081/routineexercise/${routineExerciseId}`;
            const res = await axios.delete(API_URL);

            if (res.status === 200) {
                console.log('Exercise deleted successfully');
                setRoutineExercises(routineExercises.filter((exercise) => exercise.id !== routineExerciseId));
            } else {
                console.log('Error deleting exercise');
            }
        } catch (error) {
            console.error('Error deleting exercise:', error);
        }
    };

    const fetchRoutineExercises = async (routineId) => {
        try {
            const response = await axios.get(`http://localhost:8081/routineexercise/${routineId}`);
            const exercises = response.data;

            if (Array.isArray(exercises)) {
                const exercisesWithId = exercises.map((exercise) => ({ id: exercise.routineExerciseId, ...exercise }));
                setRoutineExercises(exercisesWithId);
            } else {
                console.error('Invalid exercises data:', exercises);
                setRoutineExercises([]);
            }
        } catch (error) {
            console.error('Error fetching routine exercises:', error);
            setRoutineExercises([]);
        }
    };

    const startEdit = (exercise) => {
        setEditingExercise({ ...exercise });
    };

    const saveEditedExercise = async () => {
        if (!editingExercise) return;

        try {
            const { id, ...exerciseData } = editingExercise;
            const API_URL = `http://localhost:8081/routineexercise/${id}`;
            const res = await axios.post(API_URL, exerciseData);

            if (res.status === 200) {
                console.log('Exercise updated successfully');
                const updatedExercises = routineExercises.map(exercise =>
                    exercise.id === id ? { ...exercise, ...exerciseData } : exercise
                );
                setRoutineExercises(updatedExercises);
                setEditingExercise(null);
            } else {
                console.log('Error updating exercise');
            }
        } catch (error) {
            console.error('Error updating exercise:', error);
        }
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

    const handleEditRoutine = (routineId) => {
        setSelectedRoutine(routineId);
        setShowEditDropdown(true);
        fetchRoutineExercises(routineId);
    };

    const cancelDelete = () => {
        setRoutineToDelete(null);
    };

    const toggleEditDropdown = () => {
        setShowEditDropdown(!showEditDropdown);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingExercise(prevExercise => ({
            ...prevExercise,
            [name]: value
        }));
    };

    return (
        <div className='main-format-create-plan p'>
            <Link to='/home' id='backButton'><BackButton/></Link>

            <h2 className='main-page-header' id='top-text'>Mis rutinas</h2>
            {routines.map((routine) => (
                <div className='routine-card' key={routine.routineId}>
                    <h3 className='routine-name' id='top-text'>Nombre: {routine.name}</h3>
                    <p className='routine-day' id='top-text'>Día: {routine.day}</p>
                    <p className='routine-type' id='top-text'>Tipo: {routine.type}</p>

                    <button id='defaultButton' onClick={() => confirmDelete(routine.routineId)}>
                            Delete routine
                    </button>
                    {routine.routineId === routineToDelete && (
                        <div className='delete-confirmation'>
                            <p>¿Estás seguro?</p>
                            <button className='cancel-button' onClick={cancelDelete}>No</button>
                            <button className='confirm-button' onClick={() => deleteRoutine(routine.routineId)}>Sí
                            </button>
                        </div>

                    )}
                    <Link key={routine.routineId} to={`/addexercise/${routine.routineId}`} id='defaultButton'
                          className='create-button'>Add exercises</Link>
                    <button className='edit-button' id='defaultButton' onClick={() => handleEditRoutine(routine.routineId)}>
                        Modificar rutina
                    </button>

                    {showEditDropdown && routine.routineId === selectedRoutine && (
                        <div className='exercise-grid'>
                            <h3>Ejercicios de la rutina:</h3>
                            <TableContainer component={Paper} className='table-container'>
                                <Table aria-label="Ejercicios">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Sets</TableCell>
                                            <TableCell>Reps</TableCell>
                                            <TableCell>Peso</TableCell>
                                            <TableCell>Duración</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {routineExercises.map((exercise) => (
                                            <TableRow key={exercise.id}>
                                                <TableCell>
                                                    {editingExercise && editingExercise.id === exercise.id ? (
                                                        <TextField
                                                            name="name"
                                                            value={editingExercise.name}
                                                            onChange={handleInputChange}
                                                        />
                                                    ) : (
                                                        exercise.name
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {editingExercise && editingExercise.id === exercise.id ? (
                                                        <TextField
                                                            name="sets"
                                                            type="number"
                                                            value={editingExercise.sets}
                                                            onChange={handleInputChange}
                                                        />
                                                    ) : (
                                                        exercise.sets
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {editingExercise && editingExercise.id === exercise.id ? (
                                                        <TextField
                                                            name="reps"
                                                            type="number"
                                                            value={editingExercise.reps}
                                                            onChange={handleInputChange}
                                                        />
                                                    ) : (
                                                        exercise.reps
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {editingExercise && editingExercise.id === exercise.id ? (
                                                        <TextField
                                                            name="weight"
                                                            type="number"
                                                            value={editingExercise.weight}
                                                            onChange={handleInputChange}
                                                        />
                                                    ) : (
                                                        exercise.weight
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {editingExercise && editingExercise.id === exercise.id ? (
                                                        <TextField
                                                            name="duration"
                                                            type="number"
                                                            value={editingExercise.duration}
                                                            onChange={handleInputChange}
                                                        />
                                                    ) : (
                                                        exercise.duration
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {editingExercise && editingExercise.id === exercise.id ? (
                                                        <FaCheck
                                                            className='edit-icon'
                                                            onClick={saveEditedExercise}
                                                        />
                                                    ) : (
                                                        <FaEdit
                                                            className='edit-icon'
                                                            onClick={() => startEdit(exercise)}
                                                        />
                                                    )}
                                                    <FaTrashAlt
                                                        className='delete-icon'
                                                        onClick={() => deleteExercise(exercise.id)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )}
                </div>
            ))}
            <Link to='/createroutine' id='defaultButton' className='create-button'>Crear Nueva Rutina</Link>
        </div>
    );
}

export default RoutinesListed;

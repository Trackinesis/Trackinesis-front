import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

function RoutinesListed() {
    const [routines, setRoutines] = useState([]);
    const [routineToDelete, setRoutineToDelete] = useState(null);
    const [showEditDropdown, setShowEditDropdown] = useState(false);
    const [selectedRoutine, setSelectedRoutine] = useState(null);
    const [editingExercise, setEditingExercise] = useState(null);
    const currentUserId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get(`http://localhost:8081/routine/get/${currentUserId}`)
            .then(res => setRoutines(res.data))
            .catch(err => console.log(err));
    }, []);

    const confirmDelete = (id) => setRoutineToDelete(id);

    const deleteExercise = async (routineExerciseId) => {
        try {
            const API_URL = `http://localhost:8081/routineexercise/${routineExerciseId}`;
            const res = await axios.delete(API_URL);
            if (res.status === 200) {
                // Optionally refresh the exercises here or remove from state
            }
        } catch (error) {
            console.error('Error deleting exercise:', error);
        }
    };

    const fetchRoutineExercises = async (routineId) => {
        try {
            const response = await axios.get(`http://localhost:8081/routineexercise/${routineId}`);
            return response.data.map(exercise => ({ id: exercise.routineExerciseId, ...exercise }));
        } catch (error) {
            console.error('Error fetching routine exercises:', error);
            return []; // Return an empty array on error
        }
    };

    const startEdit = (exercise) => setEditingExercise({ ...exercise });

    const saveEditedExercise = async () => {
        if (!editingExercise) return;
        try {
            const { id, ...exerciseData } = editingExercise;
            const res = await axios.post(`http://localhost:8081/routineexercise/${id}`, exerciseData);
            if (res.status === 200) {
                // Optionally refresh exercises
                setEditingExercise(null);
            }
        } catch (error) {
            console.error('Error updating exercise:', error);
        }
    };

    const deleteRoutine = async (routineId) => {
        try {
            const res = await axios.delete(`http://localhost:8081/routine/${routineId}`);
            if (res.status === 200) {
                setRoutines(routines.filter((routine) => routine.routineId !== routineId));
                setRoutineToDelete(null);
            }
        } catch (error) {
            console.error('Error deleting routine:', error);
        }
    };

    const handleEditRoutine = (routineId) => {
        setSelectedRoutine(routineId);
        setShowEditDropdown(true);
    };

    const cancelDelete = () => setRoutineToDelete(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingExercise(prevExercise => ({
            ...prevExercise,
            [name]: value
        }));
    };

    const exportToPDF = async () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('My Routines', 14, 22);

        for (const routine of routines) {
            // Add routine details
            doc.setFontSize(14);
            doc.text(`Routine: ${routine.name} (Day: ${routine.day}, Type: ${routine.type})`, 14, doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 30);

            // Fetch exercises for the current routine
            const routineExercises = await fetchRoutineExercises(routine.routineId);

            // Add exercises for the current routine
            const exerciseTableData = routineExercises.map(exercise => [
                exercise.name,
                exercise.sets,
                exercise.reps,
                exercise.weight,
                exercise.duration
            ]);

            doc.autoTable({
                head: [['Name', 'Sets', 'Reps', 'Weight', 'Duration']],
                body: exerciseTableData,
                startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 40,
            });
        }

        doc.save('routines_with_exercises.pdf');
    };

    return (
        <div className='main-format-create-plan'>
            <Link to='/home' id='backButton'>Back</Link>
            <h2 className='main-page-header' id='top-text'>Mis rutinas</h2>

            <button id='exportButton' onClick={exportToPDF}>Export to PDF</button>

            {routines.map(routine => (
                <div className='routine-card' key={routine.routineId}>
                    <h3 className='routine-name' id='top-text'>Nombre: {routine.name}</h3>
                    <p className='routine-day' id='top-text'>Día: {routine.day}</p>
                    <p className='routine-type' id='top-text'>Tipo: {routine.type}</p>

                    {routine.routineId === routineToDelete && (
                        <div className='delete-confirmation'>
                            <p>¿Estás seguro?</p>
                            <button className='cancel-button' onClick={cancelDelete}>No</button>
                            <button className='confirm-button' onClick={() => deleteRoutine(routine.routineId)}>Sí</button>
                        </div>
                    )}

                    {showEditDropdown && routine.routineId === selectedRoutine && (
                        <div className='exercise-grid'>
                            <h3>Ejercicios de la rutina:</h3>
                            <TableContainer component={Paper}>
                                <Table aria-label="Ejercicios">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nombre</TableCell><TableCell>Sets</TableCell><TableCell>Reps</TableCell>
                                            <TableCell>Peso</TableCell><TableCell>Duración</TableCell><TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* Optionally, manage exercises for the selected routine here */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )}

                    <button id='defaultButton' onClick={() => confirmDelete(routine.routineId)}>Delete routine</button>
                    <Link to={`/addexercise/${routine.routineId}`} id='defaultButton' className='create-button'>Add exercises</Link>
                    <button className='edit-button' id='defaultButton' onClick={() => handleEditRoutine(routine.routineId)}>Modificar rutina</button>
                </div>
            ))}

            <Link to='/createroutine' id='defaultButton' className='create-button'>Crear Nueva Rutina</Link>
        </div>
    );
}

export default RoutinesListed;

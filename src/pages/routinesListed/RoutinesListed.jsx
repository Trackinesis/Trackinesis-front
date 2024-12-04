import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Checkbox,
    FormControlLabel,
    Grid
} from '@mui/material';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import BackButton from "../../components/backButton/BackButton";
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";

function RoutinesListed() {
    const [routines, setRoutines] = useState([]);
    const [routineToDelete, setRoutineToDelete] = useState(null);
    const [routineExercises, setRoutineExercises] = useState([]);
    const [showEditDropdown, setShowEditDropdown] = useState(false);
    const [selectedRoutine, setSelectedRoutine] = useState(null);
    const [editingExercise, setEditingExercise] = useState(null);
    const [selectedRoutines, setSelectedRoutines] = useState([]); // Este es el estado que manejará las rutinas seleccionadas
    const currentUserId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get(`http://localhost:8081/routine/get/${currentUserId}`)
            .then(res => setRoutines(res.data))
            .catch(err => console.log(err));
    }, []);

    const confirmDelete = (id) => setRoutineToDelete(id);

    const cancelDelete = () => setRoutineToDelete(null);

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
        if (showEditDropdown && selectedRoutine === routineId) {
            setShowEditDropdown(false);
            setSelectedRoutine(null);
        } else {
            setSelectedRoutine(routineId);
            setShowEditDropdown(true);
            fetchRoutineExercises(routineId);
        }
    };

    const handleCheckboxChange = (routineId) => {
        setSelectedRoutines(prevSelectedRoutines =>
            prevSelectedRoutines.includes(routineId)
                ? prevSelectedRoutines.filter(id => id !== routineId)
                : [...prevSelectedRoutines, routineId]
        );
    };

    const fetchRoutineExercises = async (routineId) => {
        try {
            const response = await axios.get(`http://localhost:8081/routineexercise/${routineId}`);
            const exercises = response.data;

            if (Array.isArray(exercises)) {
                setRoutineExercises(exercises.map((exercise) => ({ id: exercise.routineExerciseId, ...exercise })));
            } else {
                console.error('Invalid exercises data:', exercises);
                setRoutineExercises([]);
            }
        } catch (error) {
            console.error('Error fetching routine exercises:', error);
            setRoutineExercises([]);
        }
    };

    const startEdit = (exercise) => setEditingExercise({ ...exercise });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingExercise(prevExercise => ({ ...prevExercise, [name]: value }));
    };

    const saveEditedExercise = async () => {
        if (!editingExercise) return;

        try {
            const { id, ...exerciseData } = editingExercise;
            const res = await axios.post(`http://localhost:8081/routineexercise/${id}`, exerciseData);

            if (res.status === 200) {
                setRoutineExercises(routineExercises.map(exercise =>
                    exercise.id === id ? { ...exercise, ...exerciseData } : exercise
                ));
                setEditingExercise(null);
            }
        } catch (error) {
            console.error('Error updating exercise:', error);
        }
    };

    const deleteExercise = async (routineExerciseId) => {
        try {
            const res = await axios.delete(`http://localhost:8081/routineexercise/${routineExerciseId}`);
            if (res.status === 200) {
                setRoutineExercises(routineExercises.filter((exercise) => exercise.id !== routineExerciseId));
            }
        } catch (error) {
            console.error('Error deleting exercise:', error);
        }
    };

    const exportToPDF = async () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Mis Rutinas', 14, 22);

        const selectedRoutinesData = routines.filter(routine => selectedRoutines.includes(routine.routineId));
        if (selectedRoutinesData.length === 0) {
            alert("No selected routines to export.");
            return;
        }

        for (const routine of selectedRoutinesData) {
            doc.setFontSize(14);
            doc.text(`Routine: ${routine.name} (Day: ${routine.day}, Type: ${routine.type})`, 14, doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 30);

            try {
                const response = await axios.get(`http://localhost:8081/routineexercise/${routine.routineId}`);
                const exercises = response.data;

                if (Array.isArray(exercises)) {
                    const exerciseTableData = exercises.map(exercise => [
                        exercise.name, exercise.sets, exercise.reps, exercise.weight, exercise.duration
                    ]);

                    doc.autoTable({
                        head: [['Nombre', 'Sets', 'Reps', 'Peso', 'Duración']],
                        body: exerciseTableData,
                        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 40,
                    });
                }
            } catch (error) {
                console.error('Error al obtener los ejercicios de la rutina:', error);
            }
        }

        doc.save('Routines_with_exercises.pdf');
    };

    return (
        <div className='main-format-create-plan'>
            <Link to='/home' id='backButton'><BackButton /></Link>

            <h2 className='main-page-header'>My routines</h2>

            <div className="create-button-container">
                <Link to='/createroutine' id='createRoutineButton' className='create-button'>Create new routine</Link>
            </div>

            {routines.map((routine) => (
                <div className='routine-card' key={routine.routineId}>
                    <h3 className='routine-name'>Routine name: {routine.name}</h3>
                    <p className='routine-id'>Id: {routine.routineId}</p>
                    <p className='routine-day'>Day: {routine.day}</p>
                    <p className='routine-type'>Type: {routine.type}</p>

                    <Link to={`/addexercise/${routine.routineId}`} id="defaultButton">Add exercises</Link>

                    <button id='colouredButton' onClick={() => confirmDelete(routine.routineId)}>Delete routine</button>

                    {routine.routineId === routineToDelete && (
                        <div className='delete-confirmation'>
                            <p className='confirmation-text'>¿Are you sure?</p>
                            <div className='confirmation-buttons'>
                                <button className='cancel-button' onClick={cancelDelete}>No</button>
                                <button className='delete-button' onClick={() => deleteRoutine(routine.routineId)}>Yes
                                </button>
                            </div>
                        </div>
                    )}

                    <button id='colouredButton' onClick={() => handleEditRoutine(routine.routineId)}>Edit routine</button>

                    {/* Checkbox para seleccionar la rutina individualmente */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedRoutines.includes(routine.routineId)}
                                onChange={() => handleCheckboxChange(routine.routineId)}
                            />
                        }
                        label="Select this routine to export"
                    />

                    {showEditDropdown && routine.routineId === selectedRoutine && (
                        <TableContainer component={Paper} className="table-container">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Sets</TableCell>
                                                <TableCell>Reps</TableCell>
                                                <TableCell>Weight</TableCell>
                                                <TableCell>Time</TableCell>
                                                <TableCell>Actions</TableCell>
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
                                                                value={editingExercise.duration}
                                                                onChange={handleInputChange}
                                                            />
                                                        ) : (
                                                            exercise.duration
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {editingExercise && editingExercise.id === exercise.id ? (
                                                            <button onClick={saveEditedExercise}>Save</button>
                                                        ) : (
                                                            <>
                                                                <button onClick={() => startEdit(exercise)}>Edit</button>
                                                                <button onClick={() => deleteExercise(exercise.id)}>Delete</button>
                                                            </>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </TableContainer>
                    )}
                </div>
            ))}

            <div className="checkbox-container">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={routines.length === selectedRoutines.length}
                            onChange={(e) => setSelectedRoutines(e.target.checked ? routines.map(r => r.routineId) : [])}
                        />
                    }
                    label="Select all routines"
                />
                <div className="export-card">
                    <button id='export-button' onClick={exportToPDF}>Export to PDF</button>
                </div>
            </div>

            <FooterNavigation />
        </div>
    );
}

export default RoutinesListed;

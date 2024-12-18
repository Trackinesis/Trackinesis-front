import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './AddExercise.css';
import '../../styles.css';
import BackButton from "../../components/backButton/BackButton";

function AddExercise() {
    const navigate = useNavigate();
    const { routineId } = useParams();
    const [errors, setErrors] = useState({});
    const [valuesExercise, setValuesExercise] = useState({
        name: '',
        sets: '',
        reps: '',
        weight: '',
        duration: '',
        routineId: routineId, // Establece el routineId aquí
    });
    const [exerciseOptions, setExerciseOptions] = useState([]);
    const [selectedExerciseImage, setSelectedExerciseImage] = useState(null); // Para manejar la imagen del ejercicio seleccionado

    useEffect(() => {
        axios.get('http://localhost:8081/exercise')
            .then(res => {
                const exercises = res.data;
                setExerciseOptions(exercises);
            })
            .catch(err => console.log(err));
    }, []);

    const handleInput = (event) => {
        setValuesExercise(prev => {
            const newValues = { ...prev, [event.target.name]: event.target.value };
            if (event.target.name === 'name') {
                // Buscar el ejercicio seleccionado y obtener su imagen
                const selectedExercise = exerciseOptions.find(exercise => exercise.name === newValues.name);
                setSelectedExerciseImage(selectedExercise ? selectedExercise.image : null); // Establecer la imagen si existe
            }
            return newValues;
        });
    };

    const handleSubmitAddExercise = (event) => {
        event.preventDefault();
        const selectedExercise = exerciseOptions.find(exercise => exercise.name === valuesExercise.name);
        const exerciseId = selectedExercise ? selectedExercise.exerciseId : null;

        if (exerciseId) {
            const routineExerciseData = {
                routineId: valuesExercise.routineId,
                exerciseId: exerciseId,
                name: valuesExercise.name,
                sets: valuesExercise.sets || null,
                reps: valuesExercise.reps || null,
                weight: valuesExercise.weight || null,
                duration: valuesExercise.duration || null
            };

            axios.post('http://localhost:8081/routineExercise', routineExerciseData)
                .then(res => {
                    navigate('/routineslisted');
                })
                .catch(err => console.log(err));
        } else {
            console.error('Exercise not found');
        }
    };

    return (
        <div className='main-page p'>
            <Link to='/routineslisted' id='backButton'><BackButton/></Link>
            <h2 className='main-page-header h2'>Add exercises</h2>

            <form action="" onSubmit={handleSubmitAddExercise}>
                <div className='mb-3'>
                    <label id='top-text' htmlFor="exercise name"><strong>Exercise name:</strong></label>
                    <select name="name" onChange={handleInput} id='formsInput'>
                        <option disabled selected value="">Select Exercise</option>
                        {exerciseOptions.map((exercise, index) => (
                            <option key={index} value={exercise.name}>{exercise.name}</option>
                        ))}
                    </select>
                    {errors.name && <span className='text-danger'> {errors.name}</span>}
                </div>

                <Link to='/createexercise' id='defaultButton' type='submit'>Create exercise</Link>

                {selectedExerciseImage && (
                    <div className="exercise-image-preview">
                        <h3>Exercise Image:</h3>
                        <img src={`data:image/jpeg;base64,${selectedExerciseImage}`} alt="Exercise" style={{ maxWidth: '100px', marginTop: '10px' }} />
                    </div>
                )}

                <h7 className='main-page-header p'>Add exercise with sets and repetitions (only)</h7>

                <div className='prompt'>
                    <label id='top-text' htmlFor="sets"><strong>Number of sets:</strong></label>
                    <input id='formsInput' type="text" placeholder='Enter number of sets' name='sets' onChange={handleInput} />
                </div>

                <div className='prompt'>
                    <label id='top-text' htmlFor="reps"><strong>Number of repetitions:</strong></label>
                    <input id='formsInput' type="text" placeholder='Enter number of reps' name='reps' onChange={handleInput} />
                </div>

                <div className='prompt'>
                    <label id='top-text' htmlFor="weight"><strong>Weight (kg):</strong></label>
                    <input id='formsInput' type="text" placeholder='Enter weight' name='weight' onChange={handleInput} />
                </div>

                <h7 className='main-page-header p'>Add exercise with time (only)</h7>

                <div className='prompt'>
                    <label id='top-text' htmlFor="duration"><strong>Duration (seconds):</strong></label>
                    <input id='formsInput' type="text" placeholder='Enter duration' name='duration' onChange={handleInput} />
                </div>

                <div className='prompt'>
                    <button type="submit" id='colouredButton' onClick={handleSubmitAddExercise}>Save exercise</button>
                </div>
            </form>
        </div>
    );
}

export default AddExercise;

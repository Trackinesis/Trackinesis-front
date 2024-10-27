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

    useEffect(() => {
        axios.get('http://localhost:8081/exercise')
            .then(res => {
                const exercises = res.data;
                setExerciseOptions(exercises);
            })
            .catch(err => console.log(err));
    }, []);

    const handleInput = (event) => {
        setValuesExercise(prev => ({ ...prev, [event.target.name]: event.target.value }));
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
                sets: valuesExercise.sets,
                reps: valuesExercise.reps,
                weight: valuesExercise.weight,
                duration: valuesExercise.duration
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

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='main-page p'>
            <button onClick={handleGoBack} id="backButton"><BackButton/></button>
            <h2 className='main-page-header h2'>Add exercise</h2>

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

                <h7 className='main-page-header p'>Add exercise with sets and repetitions (only)</h7>

                <div className='prompt'>
                    <label id='top-text' htmlFor="sets"><strong>Number of sets:</strong></label>
                    <input id='formsInput' type="text" placeholder='Enter number of sets' name='sets' onChange={handleInput}/>
                </div>

                <div className='prompt'>
                    <label id='top-text' htmlFor="reps"><strong>Number of repetitions:</strong></label>
                    <input id='formsInput' type="text" placeholder='Enter number of reps' name='reps' onChange={handleInput}/>
                </div>

                <div className='prompt'>
                    <label id='top-text' htmlFor="weight"><strong>Weight (kg):</strong></label>
                    <input id='formsInput' type="text" placeholder='Enter weight' name='weight' onChange={handleInput}/>
                </div>

                <h7 className='main-page-header p'>Add exercise with time (only)</h7>

                <div className='prompt'>
                    <label id='top-text' htmlFor="duration"><strong>Duration (seconds):</strong></label>
                    <input id='formsInput' type="text" placeholder='Enter duration' name='duration' onChange={handleInput}/>
                </div>

                <div className='prompt'>
                    <button type="submit" id='colouredButton' onClick={handleSubmitAddExercise}>Save exercise</button>
                </div>
            </form>
        </div>
    );
}

export default AddExercise;

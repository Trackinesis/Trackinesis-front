import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddExercise.css'
import '../../styles.css'

function AddExercise() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [valuesExercise, setValuesExercise] = useState({
        name: '',
        sets: '',
        reps: '',
        weight: '',
        duration: '',
        // routineId: routine.routineId,
        exerciseId: '',
    });
    const [exerciseOptions, setExerciseOptions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/exercise')
            .then(res => {
                const exercises = res.data.map(exercise => exercise.name);
                setExerciseOptions(exercises);
            })
            .catch(err => console.log(err));
    }, []);

    const handleInput = (event) => {
        setValuesExercise(prev => ({ ...prev, [event.target.name]: event.target.value }))
    };

    const handleSubmitAddExercise = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/routineExercise', valuesExercise)
            .then(res => {
                navigate('/home');
            })
            .catch(err => console.log(err));
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='main-page'>
            <button onClick={handleGoBack} id="backButton"> Back</button>
            <h2 id='topTitle'>Add exercise</h2>

            <form action="" onSubmit={handleSubmitAddExercise}>
                <div className='mb-3'>
                    <label id='top-text' htmlFor="exercise name"><strong>Exercise name:</strong></label>
                    <select name="name" onChange={handleInput} id='formsInput'>
                        <option disabled selected value="">Select Exercise</option>
                        {exerciseOptions.map((exercise, index) => (
                            <option key={index} value={exercise}>{exercise}</option>
                        ))}
                    </select>
                    {errors.name && <span className='text-danger'> {errors.name}</span>}
                </div>

                <Link to='/createexercise' id='defaultButton' type='submit'>Create exercise</Link>

                <h7 id='topTitle'>Add exercise with sets and repetitions (only)</h7>

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

                <h7 id='topTitle'>Add exercise with time (only)</h7>

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

// <div className='prompt'>
//                     <button
//                         className={`exercise-type-button ${exerciseType === 'sets' ? 'active' : ''}`}
//                         onClick={() => handleExerciseTypeChange('sets')}
//                         type="button"
//                     >
//                         Sets & Reps
//                     </button>
//                     <button
//                         className={`exercise-type-button ${exerciseType === 'time' ? 'active' : ''}`}
//                         onClick={() => handleExerciseTypeChange('time')}
//                         type="button"
//                     >
//                         Time
//                     </button>
//                 </div>
//
//                 {exerciseType === 'sets' && (
//                     <div className='prompt'>
//                         <label id='top-text' htmlFor="exercise sets"><strong>Number of sets:</strong></label>
//                         <input name="sets" id='formsInput' type="number" placeholder='Enter number of sets:' onChange={handleInput}/>
//
//                         <label id='top-text' htmlFor="exercise reps"><strong>Number of reps:</strong></label>
//                         <input name="reps" id='formsInput' type="number" placeholder='Enter number of reps:' onChange={handleInput}/>
//
//                         <label id='top-text' htmlFor="exercise weight"><strong>Weight:</strong></label>
//                         <input name="weight" id='formsInput' type="number" placeholder='Enter weight:' onChange={handleInput}/>
//                     </div>
//                 )}
//
//                 {exerciseType === 'time' && (
//                     <div className='prompt'>
//                         <label id='top-text' htmlFor="exercise time"><strong>Duration:</strong></label>
//                         <input name="duration" id='formsInput' type="number" placeholder='Enter duration:' onChange={handleInput}/>
//                     </div>
//                 )}
// const handleExerciseTypeChange = (type) => {
//         setExerciseType(type);
//         setValuesExercise({
//             name: '',
//             sets: '',
//             reps: '',
//             weight: '',
//             duration: '',
//         });
//     };
// const [selectedExercise, setSelectedExercise] = useState('');
//     const [exerciseType, setExerciseType] = useState(null);
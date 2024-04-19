import React, {useState} from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Validation from './cneValidation';
import axios from 'axios';
import './CreateNewExercise.css'
import '../../styles.css'

const excersiceType = [
    {value: 'sets', label: 'Exercise with Sets' },
    {value: 'time', label: 'Exercise with Time' },
];

function CreateNewExercise(){

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [valuesExercise, setValues] = useState({
        exerciseName: '',
        exerciseDescription: '',
        exerciseSets: '',
        exerciseReps: '',
        exerciseWeight: '',
        exerciseTime: '',
    })
    const handleSubmitNewExercise = (event) => {
        event.preventDefault();
        setErrors(Validation(valuesExercise, excersiceType));
        if (errors.name === "" && errors.description === "" && errors.sets === "" && errors.reps === "" && errors.weight === "" && errors.time === "") {
            axios.post('http://localhost:8081/addExercise', valuesExercise)
            .then(res => {
                navigate('/createroutine');
            })
            .catch(err => console.log(err));
        }
    }

    const [exerciseType, setExerciseType] = useState(null);
    const handleExerciseTypeChange = (value) => {
        setExerciseType(exerciseType === value ? null : value);
    }

    return (
        <div className='main-page'>
            <h2 id='topTitle'>Create New Exercise</h2>
            
            <form action="" onSubmit={handleSubmitNewExercise}>

                <div className='prompt'>
                    <label id='top-text' htmlFor="exercise name"><strong>Exercise name:</strong></label>
                    <input id='formsInput' type="exercise name" placeholder='Enter exercise name:' name='exercise name' />
                </div>
    
                <div className='prompt'>
                    <label id='top-text' htmlFor="exercise description"><strong>Exercise description (optional):</strong></label>
                    <input id='formsInput' type="exercise description" placeholder='Enter exercise description (optional):' name='exercise description' />
                </div>
    
                <OptionsForExercise selectedExercise={exerciseType} handleExerciseClick={handleExerciseTypeChange} />
    
                <div className='prompt'>
                    <button id='createExerciste' onClick={handleSubmitNewExercise}>Create exercise</button>
                </div>
            </form>
        </div>
    );
}


function OptionsForExercise({selectedExercise, handleExerciseClick}) {
    const exerciseOptions = ['Exercise with sets', 'Exercise with time'];
    return (
        <div className='options-container'>
            {exerciseOptions.map((option, index) => (
                <button
                    key={index}
                    className={selectedExercise === option ? 'selected-exercise' : ''}
                    onClick={() => handleExerciseClick(option)}
                >
                    {option}
                </button>
            ))}
            {selectedExercise === 'Exercise with sets' && (
                <>
                    <div className='prompt'>
                        <label id='top-text' htmlFor="exercise sets"><strong>Number of sets:</strong></label>
                        <input id='formsInput' type="exercise sets" placeholder='Enter number of sets:' name='exercise sets' />
                    </div>
                    <div className='prompt'>
                        <label id='top-text' htmlFor="exercise reps"><strong>Number of reps:</strong></label>
                        <input id='formsInput' type="exercise reps" placeholder='Enter number of reps:' name='exercise reps' />
                    </div>
                    <div className='prompt'>
                        <label id='top-text' htmlFor="exercise weight"><strong>Weight:</strong></label>
                        <input id='formsInput' type="exercise weight" placeholder='Enter weight:' name='exercise weight' />
                    </div>
                </>
            )}
            
            {selectedExercise === 'Exercise with time' && (
                <>
                    <div className='prompt'>
                        <label id='top-text' htmlFor="exercise time"><strong>Duration:</strong></label>
                        <input id='formsInput' type="exercise time" placeholder='Enter duration:' name='exercise time' />
                    </div>
                </>
            )}
        </div>
    );
}
export default CreateNewExercise
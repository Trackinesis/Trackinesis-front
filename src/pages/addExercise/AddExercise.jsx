import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './AddExerciseValidation';
import axios from 'axios';
import './AddExercise.css'
import '../../styles.css'

const exerciseType = [
    { value: 'sets', label: 'Exercise with Sets' },
    { value: 'time', label: 'Exercise with Time' },
];

function AddExercise() {

    const [exerciseType, setExerciseType] = useState(null);
    const handleExerciseTypeChange = (value) => {
        setExerciseType(exerciseType === value ? null : value);
    }

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [valuesExercise, setValues] = useState({
        name: '',
        type: '',
        description: '',
        time: '',
    })

    const handleSubmitNewExercise = (event) => {
        event.preventDefault();
        setErrors(Validation(valuesExercise, exerciseType));
        if (errors.name === "" && errors.type === "" && errors.description === "") {
            axios.post('http://localhost:8081/addexercise', valuesExercise)
                .then(res => {
                    navigate('/createroutine');
                })
                .catch(err => console.log(err));
        }
    }

    const handleTypeInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }




    return (
        <div className='main-page'>
            <Link to="/routine" className="backButton"> Back</Link>

            <h2 id='topTitle'>Create new exercise</h2>

            <form action="" onSubmit={handleSubmitNewExercise}>

                <div className='prompt'>
                    <label id='top-text' htmlFor="exercise name"><strong>Exercise name:</strong></label>
                    <input id='formsInput' onChange={handleTypeInput} type="text" placeholder='Enter exercise name:' name='name' />
                    {errors.name && <span className='text-danger'> {errors.name}</span>}
                </div>

                <div className='prompt'>
                    <label id='top-text' htmlFor="exercise type"><strong>Exercise type:</strong></label>
                    <select name="type" onChange={handleTypeInput} className='form-control rounded-0'>
                        <option disabled selected value="">Select Type</option>
                        <option value="hypetrophy">Hypetrophy</option>
                        <option value="strength">Strength</option>
                        <option value="endurance">Endurance</option>
                    </select>
                    {errors.type && <span className='text-danger'> {errors.type}</span>}
                </div>

                <div className='prompt'>
                    <label id='top-text' htmlFor="exercise description"><strong>Exercise description (optional):</strong></label>
                    <input id='formsInput' onChange={handleTypeInput} type="text" placeholder='Enter exercise description (optional):' name='description' />
                    {errors.description && <span className='text-danger'> {errors.description}</span>}
                </div>

                <OptionsForExercise selectedExercise={exerciseType} handleExerciseClick={handleExerciseTypeChange} valuesExercise={valuesExercise} handleTypeInput={handleTypeInput} />

                <div className='prompt'>
                    <button id='createExercise' onClick={handleSubmitNewExercise}>Create exercise</button>
                </div>
            </form>
        </div>
    );
}

export default AddExercise;



function OptionsForExercise({selectedExercise, handleExerciseClick, valuesExercise, handleTypeInput}) {
    const exerciseOptions = ['Exercise with sets', 'Exercise with time'];
    const convertSecondsToMinutes = (seconds) => {
        const totalSeconds = parseInt(seconds);
        if (!isNaN(totalSeconds)) {
            const minutes = Math.floor(totalSeconds / 60);
            const remainingSeconds = totalSeconds % 60;
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }
        return '';
    }

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
                        <input id='formsInput' type="exercise sets" placeholder='Enter number of sets:'
                               name='exercise sets'/>
                    </div>
                    <div className='prompt'>
                        <label id='top-text' htmlFor="exercise reps"><strong>Number of reps:</strong></label>
                        <input id='formsInput' type="exercise reps" placeholder='Enter number of reps:'
                               name='exercise reps'/>
                    </div>
                    <div className='prompt'>
                        <label id='top-text' htmlFor="exercise weight"><strong>Weight:</strong></label>
                        <input id='formsInput' type="exercise weight" placeholder='Enter weight:'
                               name='exercise weight'/>
                    </div>
                </>
            )}

            {selectedExercise === 'Exercise with time' && (
                <>
                    <div className='prompt'>
                        <label id='top-text' htmlFor="exercise time"><strong>Duration:</strong>
                            <span>{convertSecondsToMinutes(valuesExercise.time)}</span>
                        </label>
                        <input id='formsInput' type="number" placeholder='Enter duration:'
                               name='time' value={valuesExercise.time} onChange={handleTypeInput} />
                    </div>
                </>
            )}
        </div>
    );
}
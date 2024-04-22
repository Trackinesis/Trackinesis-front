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
        type: '',
        description: '',
        time: '',
    });
    const [exerciseOptions, setExerciseOptions] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState('');

    const [exerciseType, setExerciseType] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/exercise')
            .then(res => {
                const exercises = res.data.map(exercise => exercise.name);
                setExerciseOptions(exercises);
            })
            .catch(err => console.log(err));
    }, []);

    const handleExerciseTypeChange = (value) => {
        setExerciseType(exerciseType === value ? null : value);
    }
    const handleTypeInput = (event) => {
        setValuesExercise(prev => ({ ...prev, [event.target.name]: event.target.value}))
    }

    const handleSubmitNewExercise = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/exercise', valuesExercise)
            .then(res => {
                navigate('/routine');
            })
            .catch(err => console.log(err));
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='main-page'>
            <button onClick={handleGoBack} className="backButton"> Back</button>
            <h2 id='topTitle'>Add exercise</h2>
            <form action="" onSubmit={handleSubmitNewExercise}>
                <div className='mb-3'>
                    <label id='top-text' htmlFor="exercise name"><strong>Exercise name:</strong></label>
                    <select name="name" onChange={handleTypeInput} id='formsInput'>
                        <option disabled selected value="">Select Exercise</option>
                        {exerciseOptions.map((exercise, index) => (
                            <option key={index} value={exercise}>{exercise}</option>
                        ))}
                    </select>
                    {errors.name && <span className='text-danger'> {errors.name}</span>}
                    <OptionsForExercise selectedExercise={exerciseType} handleExerciseClick={handleExerciseTypeChange} valuesExercise={valuesExercise} handleTypeInput={handleTypeInput} />
                </div>
                <div className='prompt'>
                    <button id='createExercise' type="submit">Create exercise</button>
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
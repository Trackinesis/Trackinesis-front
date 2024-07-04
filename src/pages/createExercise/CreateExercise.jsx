import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './CreateExercise.css'
import '../../styles.css'

function CreateExercise() {
    const navigate = useNavigate();
    const location = useLocation();
    const routineId = location.state?.routineId || '';

    const [errors, setErrors] = useState('');
    const [valuesExercise, setValuesExercise] = useState({
        name: '',
        type: '',
        description: ''
    });

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSubmitNewExercise = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/exercise', valuesExercise)
            .then(res => {
                navigate('/addexercise/' + routineId); // Navigate back to AddExercise with routineId
            })
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    };

    const handleInput = (event) => {
        setValuesExercise(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    return (
        <div className='main-page'>
            <button onClick={handleGoBack} id="backButton"> Back</button>
            <h2 id='topTitle'>Create new exercise</h2>
            <form onSubmit={handleSubmitNewExercise}>

                <div className='prompt'>
                    <label id='top-text' htmlFor="name"><strong>Exercise name:</strong></label>
                    <input id='formsInput' type="text" placeholder='Enter Exercise name:'
                           name='name' onChange={handleInput} />
                </div>
                <div className='prompt'>
                    <label id='top-text' htmlFor="type"><strong>Exercise type:</strong></label>
                    <select name="type" onChange={handleInput} className='form-control rounded-0'>
                        <option disabled selected value="">Select Type</option>
                        <option value="hypertrophy">Hypertrophy</option>
                        <option value="strength">Strength</option>
                        <option value="endurance">Endurance</option>
                    </select>
                    {errors.type && <span className='text-danger'> {errors.type}</span>}
                </div>
                <div className='prompt'>
                    <label id='top-text' htmlFor="description"><strong>Description:</strong></label>
                    <input id='formsInput' type="text" placeholder='Enter Exercise description:'
                           name='description' onChange={handleInput} />
                </div>
                <button onClick={handleGoBack} id='colouredButton' type='submit'>Save</button>
            </form>
        </div>
    );
}

export default CreateExercise;

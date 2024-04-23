import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateExercise.css'
import '../../styles.css'

function CreateExercise() {

    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };
    const handleSubmitNewExercise = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/exercise', valuesExercise)
            .then(res => {
                navigate('/addexercise');
            })
            .catch(err => console.log(err));
    }
    const [valuesExercise, setValuesExercise] = useState({
        name: '',
        type: '',
        description: ''
    });
    const handleInput = (event) => {
        setValuesExercise(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    return (
        <div className='main-page'>
            <button onClick={handleGoBack} id="backButton"> Back</button>
            <h2 id='topTitle'>Create new exercise</h2>
            <form action="" onSubmit={handleSubmitNewExercise}>

                <div className='prompt'>
                    <label id='top-text' htmlFor="exercise name"><strong>Exercise name:</strong></label>
                    <input id='formsInput' type="exercise name" placeholder='Enter Exercise name:'
                           name='name' onChange={handleInput}/>
                </div>
                <div className='prompt'>
                    <label id='top-text' htmlFor="exercise type"><strong>Exercise type:</strong></label>
                    <select name="type" onChange={handleInput} className='form-control rounded-0'>
                        <option disabled selected value="">Select Type</option>
                        <option value="hypetrophy">Hypertrophy</option>
                        <option value="strength">Strength</option>
                        <option value="endurance">Endurance</option>
                    </select>
                    {errors.type && <span className='text-danger'> {errors.type}</span>}
                </div>
                <div className='prompt'>
                    <label id='top-text' htmlFor="exercise description"><strong>Description:</strong></label>
                    <input id='formsInput' type="exercise description" placeholder='Enter Exercise description:'
                           name='description' onChange={handleInput}/>
                </div>
                <button id='colouredButton' type='submit' onClick={handleSubmitNewExercise}>Save</button>
            </form>
        </div>
    );
}
export default CreateExercise;
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
    //const [errors, setErrors] = useState({});
    const [valuesExercise, setValues] = useState({
        name: '',
        type: '',
        description: '',
    })
    const handleSubmitNewExercise = (event) => {
        event.preventDefault();
        //setErrors(Validation(valuesExercise, excersiceType));
        //if (errors.name === "" && errors.description === "" && errors.sets === "" && errors.reps === "" && errors.weight === "" && errors.time === "") {
            axios.post('http://localhost:8081/addexercise', valuesExercise)
            .then(res => {
                navigate('/createroutine');
            })
            .catch(err => console.log(err));
        //}
    }

    const handleTypeInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }


    return (
        <div className='main-page'>
            <Link to="/createroutine" className="backButton"> Back</Link>

            <h2 id='topTitle'>Create New Exercise</h2>
            
            <form action="" onSubmit={handleSubmitNewExercise}>

                <div className='prompt'>
                    <label id='top-text' htmlFor="exercise name"><strong>Exercise name:</strong></label>
                    <input id='formsInput' onChange={handleTypeInput} type="text" placeholder='Enter exercise name:' name='name' />
                </div>

                <div className='prompt'>
                    <label htmlFor="exercise type"><strong>Exercise type:</strong></label>
                    <select name="type" onChange={handleTypeInput} className='form-control rounded-0'>
                        <option disabled selected value="">Select Type</option>
                        <option value="hypetrophy">Hypetrophy</option>
                        <option value="strength">Strength</option>
                        <option value="endurance">Endurance</option>
                    </select>
                </div>

                <div className='prompt'>
                    <label id='top-text' htmlFor="exercise description"><strong>Exercise description (optional):</strong></label>
                    <input id='formsInput' onChange={handleTypeInput} type="text" placeholder='Enter exercise description (optional):' name='description' />
                </div>

                <div className='prompt'>
                    <button id='createExercise' onClick={handleSubmitNewExercise}>Create exercise</button>
                </div>
            </form>
        </div>
    );
}



export default CreateNewExercise
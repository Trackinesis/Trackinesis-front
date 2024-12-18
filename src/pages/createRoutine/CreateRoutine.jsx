import {Link, useNavigate} from "react-router-dom";
import React, { useState } from "react";
import Validation from "./RoutineValidation";
import axios from "axios";
import BackButton from "../../components/backButton/BackButton";
import './createRoutine.css';

const routineType = [
    { value: 'sets', label: 'Exercise with Sets' },
    { value: 'time', label: 'Exercise with Time' },
];

function CreateRoutine() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [valuesRoutine, setValues] = useState({
        name: '',
        day: '',
        type: '',
        description: '',
        state: '',
    });

    const userId = localStorage.getItem('userId');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitNewRoutine = (event) => {
        event.preventDefault();
        setErrors(Validation(valuesRoutine, routineType));
        if (Object.values(errors).every(error => error === "")) {
            const routineData = { ...valuesRoutine, userId };
            axios.post('http://localhost:8081/routine', routineData)
                .then(res => {
                    navigate('/addexercise');
                })
                .catch(err => console.log(err));
        }
    };

    const handleSaveRoutine = (event) => {
        event.preventDefault();
        setErrors(Validation(valuesRoutine, routineType));
        if (Object.values(errors).every(error => error === "")) {
            const routineData = { ...valuesRoutine, userId };
            axios.post('http://localhost:8081/createroutine', routineData)
                .then(res => {
                    navigate('/routineslisted');
                })
                .catch(err => console.log(err));
        }
    };

    const handleDayChange = (event) => {
        const selectedDay = event.target.value;
        setValues((prev) => ({ ...prev, day: selectedDay }));
    };

    const handleTypeInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className='main-page p'>
            <Link to="/routineslisted" id='backButton'> <BackButton/> </Link>
            <h2 className='main-page-header'>Create a new routine!</h2>

            <form onSubmit={handleSubmitNewRoutine}>
                <div className='prompt'>
                    <label htmlFor="routineName" id='top-text'><strong>Routine name:</strong></label>
                    <input id='signupForms' onChange={handleTypeInput} type="text" placeholder='Enter routine name' name='name' />
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                </div>

                <div className='prompt'>
                    <label htmlFor="exerciseType" id='top-text'><strong>Routine type:</strong></label>
                    <select name="type" onChange={handleTypeInput} id='signupForms'>
                        <option disabled selected value="">Select Type</option>
                        <option value="hypertrophy">Hypertrophy</option>
                        <option value="strength">Strength</option>
                        <option value="endurance">Endurance</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.type && <span className='text-danger'>{errors.type}</span>}
                </div>

                <div className="prompt">
                    <label htmlFor="day" id="top-text"><strong>Select day:</strong></label>
                    <select name="day" onChange={handleDayChange} id='signupForms'>
                        <option disabled selected value="">Select Day</option>
                        {daysOfWeek.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>

                <div className='prompt'>
                    <label htmlFor="routineDescription" id='top-text'><strong>Routine description
                        (optional):</strong></label>
                    <input id='signupForms' onChange={handleTypeInput} type="text"
                           placeholder='Enter routine description' name='description'/>
                    {errors.description && <span className='text-danger'>{errors.description}</span>}
                </div>

                <div className='prompt'>
                    <label htmlFor="routineState" id='top-text'><strong>Visualization</strong></label>
                    <select name='state' onChange={handleTypeInput} id='signupForms'>
                        <option disabled selected value="">Select visualization</option>
                        <option value="public">Public</option>
                        <option value="friends">Friends</option>
                        <option value="private">Private</option>
                    </select>
                </div>

                <div className='prompt'>
                    <button onClick={handleSaveRoutine} id='colouredButton'>Save Routine</button>
                </div>

            </form>
        </div>
    );
}

export default CreateRoutine;

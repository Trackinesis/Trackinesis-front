import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Validation from ".//RoutineValidation";
import axios from "axios";

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
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitNewRoutine = (event) => {
        event.preventDefault();
        setErrors(Validation(valuesRoutine, routineType));
        if (Object.values(errors).every(error => error === "")) {
            axios.post('http://localhost:8081/routine', valuesRoutine)
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
            axios.post('http://localhost:8081/createroutine', valuesRoutine)
                .then(res => {
                    navigate('/home');
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

    const handleGoBack = () => {
        navigate(-1);
    };

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className='main-page'>
            <button onClick={handleGoBack} id="backButton">Back</button>

            <h2 id='topTitle'>Create new routine</h2>

            <form onSubmit={handleSubmitNewRoutine}>
                <div className='prompt'>
                    <label htmlFor="routineName" id='top-text'><strong>Routine name:</strong></label>
                    <input onChange={handleTypeInput} type="text" placeholder='Enter routine name' name='name' />
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                </div>

                <div className='prompt'>
                    <label htmlFor="exerciseType" id='top-text'><strong>Routine type:</strong></label>
                    <select name="type" onChange={handleTypeInput} className='form-control rounded-0'>
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
                    <select name="day" onChange={handleDayChange} className="form-control rounded-0">
                        <option disabled selected value="">Select Day</option>
                        {daysOfWeek.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>

                <div className='prompt'>
                    <label htmlFor="exerciseDescription" id='top-text'><strong>Routine description (optional):</strong></label>
                    <input onChange={handleTypeInput} type="text" placeholder='Enter routine description (optional):' name='description' />
                    {errors.description && <span className='text-danger'>{errors.description}</span>}
                </div>

                <div className='prompt'>
                    <button onClick={handleSaveRoutine} id='colouredButton'>Save Routine</button>
                </div>

            </form>
        </div>
    );
}

export default CreateRoutine;

//<div className='prompt'>
//                     <button onClick={() => console.log('Rest day button clicked')} id='defaultButton'>Rest day</button>
//
//                     <button onClick={handleSubmitNewRoutine} id='defaultButton'>Add exercise</button>
//
//                     <button onClick={() => navigate('/addsport')} id='defaultButton'>Add Sport</button>
//                 </div>
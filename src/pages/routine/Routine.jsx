import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import Validation from "../routine/RoutineValidation";
import axios from "axios";

const routineType = [
    {value: 'sets', label: 'Exercise with Sets' },
    {value: 'time', label: 'Exercise with Time' },
];

function Routine() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [valuesRoutine, setValues] = useState({
        name: '',
        type: '',
        description: '',
    })
    const handleSubmitNewRoutine = (event) => {
        event.preventDefault();
        setErrors(Validation(valuesRoutine, routineType));
        if (errors.name === "" && errors.type === "" && errors.description === "") {
            axios.post('http://localhost:8081/addroutine', valuesRoutine)
                .then(res => {
                    navigate('/addexercise');
                })
                .catch(err => console.log(err));
        }
    }

    const handleSaveRoutine = (event) => {
        event.preventDefault();
        setErrors(Validation(valuesRoutine, routineType));
        if (errors.name === "" && errors.type === "" && errors.description === "") {
            axios.post('http://localhost:8081/addroutine', valuesRoutine)
                .then(res => {
                    navigate('/createplan');
                })
                .catch(err => console.log(err));
        }
    }

    const handleTypeInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }


    return (
        <div className='main-page'>
            <Link to="/createplan" className="backButton">Back</Link>

            <h2 id='topTitle'>Create new routine</h2>

            <form action="" onSubmit={handleSubmitNewRoutine}>

                <div className='prompt'>
                    <label id='top-text' htmlFor="exercise name"><strong>Routine name:</strong></label>
                    <input id='formsInput' onChange={handleTypeInput} type="text" placeholder='Enter routine name:' name='name' />
                    {errors.name && <span className='text-danger'> {errors.name}</span>}
                </div>

                <div className='prompt'>
                    <label id='top-text' htmlFor="exercise type"><strong>Routine type:</strong></label>
                    <select name="type" onChange={handleTypeInput} className='form-control rounded-0'>
                        <option disabled selected value="">Select Type</option>
                        <option value="hypetrophy">Hypetrophy</option>
                        <option value="strength">Strength</option>
                        <option value="endurance">Endurance</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.type && <span className='text-danger'> {errors.type}</span>}
                </div>

                <div className='prompt'>
                    <label id='top-text' htmlFor="exercise description"><strong>Routine description (optional):</strong></label>
                    <input id='formsInput' onChange={handleTypeInput} type="text" placeholder='Enter routine description (optional):' name='description' />
                    {errors.description && <span className='text-danger'> {errors.description}</span>}
                </div>

                <div className='prompt'>
                    <button id='defaultButton' onClick={handleSubmitNewRoutine}>Add exercise</button>
                    <button id='colouredButton' onClick={handleSaveRoutine}>Save Routine</button>
                </div>
            </form>
        </div>
    );
}

export default Routine
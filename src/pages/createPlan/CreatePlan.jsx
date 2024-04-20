import React, {useState} from 'react';
import { format } from 'date-fns';
import './CreatePlan.css'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";



function CreatePlan() {
    const navigate = useNavigate();
    const handleAddRoutine = () => {
        console.log('Add Routine');
        navigate('/routine');
    };

    const handleSavePlan = () => {
        console.log('Save Plan');
        navigate('/home');
    }

    const handleGoBack = () => {
        navigate(-1);
    };


    return (
        <div className='main-format-create-plan'>
            <button onClick={handleGoBack} className="backButton"> Back</button>
            <h2 id='topTitle'>Create new Plan</h2>

            <div className='prompt'>
                <label id='top-text' htmlFor="plan name"><strong>Plan name:</strong></label>
                <input id='formsInput' type="plan name" placeholder='Enter Plan name:' name='plan name'/>
            </div>

            <div className='prompt'>
                <label id='top-text' htmlFor="plan description"><strong>Description:</strong></label>
                <input id='formsInput' type="plan description" placeholder='Enter Plan description:'
                       name='plan description'/>
            </div>

            <div className='prompt'>
                <label id='top-text' htmlFor="plan objective"><strong>Plan Objective (optional):</strong></label>
                <input id='formsInput' type="plan objective" placeholder='Enter Plan objective (optional):'
                       name='plan objective'/>
            </div>

            <StartDateInput/>

            <button type='submit' id='defaultButton' onClick={handleAddRoutine}>Add Routine</button>
            <button type='submit' id='colouredButton' onClick={handleSavePlan}>Save Plan</button>

        </div>
    );
}


const StartDateInput = () => {
    const [startDate, setStartDate] = useState('');

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const newValue = inputValue.replace(/[^0-9]/g, '');

        let formattedValue = '';
        for (let i = 0; i < newValue.length; i++) {
            if (i !== 0 && i%2 === 0) {
                formattedValue += '-';
            }
            formattedValue += newValue[i];
        }
        setStartDate(formattedValue.substring(0, 8));
    };

    return (
        <div className="start-date-input">
            <label htmlFor="startDate" id='top-text'><strong>Fecha de Inicio:</strong></label>
            <input
                placeholder='dd/mm/yy'
                type="text"
                id='formsInput'
                value={startDate}
                onChange={handleInputChange}
                pattern="[0-9/]{10}" // Allow slashes in the pattern
            />

            <div className='weeks'>
                <label id='top-text' htmlFor="weeks"><strong>Number of weeks:</strong></label>
                <input id='formsInput' type="number" placeholder='Enter number of weeks:' name='weeks'/>
            </div>

        </div>
    );
};


export default CreatePlan;

import React, {useState} from 'react';
import { format } from 'date-fns';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import './CreatePlan.css'
import '../../styles.css'
import Validation from "../routine/RoutineValidation";

function CreatePlan() {
    const navigate = useNavigate();
    const [valuesPlan, setValues] = useState({
        name: '',
        description: '',
        objective: '',
        startDate: '',
        endDate: ''
    });
    const handleAddRoutine = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/plan', valuesPlan)
            .then(res => {
                navigate('/routine');
            })
            .catch(err => console.log(err));

        console.log('Add Routine');
        navigate('/routine');
    };
    const handleRoutineAddInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleSavePlan = () => {
        console.log('Save Plan');
        navigate('/home');
    }

    const handleGoBack = () => {
        navigate(-1);
    };


    return (
        <div className='main-format-create-plan'>
            <button onClick={handleGoBack} id="backButton"> Back</button>
            <h2 className='main-page-header'>Create new Plan</h2>

            <div className='prompt'>
                <label id='top-text' htmlFor="plan name"><strong>Plan name:</strong></label>
                <input id='formsInput' type="plan name" placeholder='Enter Plan name:'
                       name='name' onChange={handleRoutineAddInput}/>
            </div>

            <div className='prompt'>
                <label id='top-text' htmlFor="plan description"><strong>Description:</strong></label>
                <input id='formsInput' type="plan description" placeholder='Enter Plan description:'
                       name='description' onChange={handleRoutineAddInput}/>
            </div>

            <div className='prompt'>
                <label id='top-text' htmlFor="plan objective"><strong>Plan Objective (optional):</strong></label>
                <input id='formsInput' type="plan objective" placeholder='Enter Plan objective (optional):'
                       name='objective' onChange={handleRoutineAddInput}/>
            </div>

            <StartDateInput/>

            <button type='submit' id='defaultButton' onClick={handleAddRoutine}>Add Routine</button>
            <button type='submit' id='colouredButton' onClick={handleSavePlan}>Save Plan</button>
        </div>
    );
}

const StartDateInput = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleInputChangeStart = (event) => {
        const inputValue2 = event.target.value;
        const newValue = inputValue2.replace(/[^0-9]/g, '');

        let formattedValue = '';
        for (let i = 0; i < newValue.length; i++) {
            if (i !== 0 && i%2 === 0) {
                formattedValue += '-';
            }
            formattedValue += newValue[i];
        }
        setStartDate(formattedValue.substring(0, 8));
    };

    const handleInputChangeEnd = (event) => {
        //TODO validator para q no nos linchen
        const inputValue = event.target.value;
        const newValue = inputValue.replace(/[^0-9]/g, '');

        let formattedValue = '';
        for (let i = 0; i < newValue.length; i++) {
            if (i !== 0 && i%2 === 0) {
                formattedValue += '-';
            }
            formattedValue += newValue[i];
        }
        setEndDate(formattedValue.substring(0, 8));
    };


    return (
        <div className="start-date-input">
            <label htmlFor="startDate" id='top-text'><strong>Start:</strong></label>
            <input
                placeholder='dd/mm/yy'
                type="text"
                id='formsInput'
                value={startDate}
                onChange={handleInputChangeStart}
                pattern="[0-9/]{10}" // Allow slashes in the pattern
            />

            <label htmlFor="endDate" id='top-text'><strong>End Date:</strong></label>
            <input
                placeholder='dd/mm/yy'
                type="text"
                id='formsInput'
                value={endDate}
                onChange={handleInputChangeEnd}
                pattern="[0-9/]{10}" // Allow slashes in the pattern
            />

            {/*<div className='weeks'>*/}
            {/*    <label id='top-text' htmlFor="weeks"><strong>Number of weeks:</strong></label>*/}
            {/*    <input id='formsInput' type="number" placeholder='Enter number of weeks:' name='weeks'/>*/}
            {/*</div>*/}

        </div>
    );
};

export default CreatePlan;

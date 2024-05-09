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
    const handleAddPlan = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/plan', valuesPlan)
            .then(res => {
                console.log('Plan added successfully', res.data);
                navigate('/home');
            })
            .catch(err => console.log(err));

        console.log('Add plan');
        navigate('/routine');
    };
    const handlePlanAddInput = (event) => {
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
        <div className='main-page'>
            <button onClick={handleGoBack} id="backButton"> Back</button>
            <h2 className='main-page-header'>Create new Plan</h2>
            <form action="" onSubmit={handleAddPlan}>
                <div className='prompt'>
                    <label id='top-text' htmlFor="plan name"><strong>Plan name:</strong></label>
                    <input id='formsInput' type="plan name" placeholder='Enter Plan name:'
                           name='name' onChange={handlePlanAddInput}/>
                </div>

                <div className='prompt'>
                    <label id='top-text' htmlFor="plan description"><strong>Description:</strong></label>
                    <input id='formsInput' type="plan description" placeholder='Enter Plan description:'
                           name='description' onChange={handlePlanAddInput}/>
                </div>

                <div className='prompt'>
                    <label id='top-text' htmlFor="plan objective"><strong>Plan Objective (optional):</strong></label>
                    <input id='formsInput' type="plan objective" placeholder='Enter Plan objective (optional):'
                           name='objective' onChange={handlePlanAddInput}/>
                </div>

                <div className="start-date-input">
                    <label htmlFor="startDate" id='top-text'><strong>Start date:</strong></label>
                    <input type='date'/>

                    <label htmlFor="endDate" id='top-text'><strong>End date:</strong></label>
                    <input type='date'/>
                    <> <p> </p></>
                </div>

                <button type="submit" id='colouredButton' onClick={handleAddPlan}>Save Plan</button>
            </form>
        </div>
    );
};

export default CreatePlan;

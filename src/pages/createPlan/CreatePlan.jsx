import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import './CreatePlan.css'
import '../../styles.css'
import BackButton from "../../components/backButton/BackButton";

function CreatePlan() {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [valuesPlan, setValues] = useState({
        name: '',
        description: '',
        objective: '',
        startDate: '',
        endDate: '',
        userId: userId
    });
  
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/plan?userId=${userId}`).then(response => {
            setPlans(response.data);
        }).catch(error => {
            console.error('Error fetching plans:', error);
        });
    }, []);

    const handleAddPlan = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/plan', valuesPlan)
            .then(res => {
                console.log('Plan added successfully', res.data);
                navigate('/planslisted');
            })
            .catch(err => console.log(err));

        console.log('Add plan');
        navigate('/createroutine');
    };
    const handlePlanAddInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleSavePlan = () => {
        console.log('Save Plan');
        navigate('/home');
    }


    return (
        <div className='main-page p'>
            <Link to='/planslisted' id='backButton'><BackButton /></Link>
            <h2 className='main-page-header'>Create new plan</h2>
            <form action="" onSubmit={handleAddPlan}>
                <div className='prompt'>
                    <label id='top-text' htmlFor="plan name"><strong>Plan name:</strong></label>
                    <input id='signupForms' type="plan name" placeholder='Enter Plan name:'
                           name='name' onChange={handlePlanAddInput}/>
                </div>

                <div className='prompt'>
                    <label id='top-text' htmlFor="plan description"><strong>Description:</strong></label>
                    <input id='signupForms' type="plan description" placeholder='Enter Plan description:'
                           name='description' onChange={handlePlanAddInput}/>
                </div>

                <div className='prompt'>
                    <label id='top-text' htmlFor="plan objective"><strong>Plan Objective (optional):</strong></label>
                    <input id='signupForms' type="plan objective" placeholder='Enter Plan objective (optional):'
                           name='objective' onChange={handlePlanAddInput}/>
                </div>

                <div className="prompt">
                    <label id='top-text' htmlFor="startDate"><strong>Start date:</strong></label>
                    <input id="signupForms" type='date' name='startDate' onChange={handlePlanAddInput}/>
                </div>

                <div className="prompt">
                    <label htmlFor="endDate" id='top-text'><strong>End date:</strong></label>
                    <input id="signupForms" type='date' name='endDate' onChange={handlePlanAddInput}/>
                    <> <p></p></>
                </div>

                <button type="submit" id='defaultButton' onClick={handleAddPlan}>Save Plan</button>
            </form>
        </div>
    );
}

export default CreatePlan;

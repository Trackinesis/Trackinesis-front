import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PlansListed.css';
import '../../styles.css';

function PlansListed() {
    const [plans, setPlans] = useState([]);
    const [planToDelete, setPlanToDelete] = useState(null);
    const [showEditDropdown, setShowEditDropdown] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        axios.get('http://localhost:8081/plan')
            .then(res => {
                const plansData = res.data;
                setPlans(plansData);
            })
            .catch(err => console.log(err));
    }, []);

    const confirmDelete = (id) => {
        setPlanToDelete(id);
    };

    const deletePlan = async (planId) => {
        try {
            const API_URL = `http://localhost:8081/plan/${planId}`;
            const res = await axios.delete(API_URL);

            if (res.status === 200){
                console.log('Plan deleted successfully');
                setPlans(plans.filter((plan) => plan.planId !== planId));
                setPlanToDelete(null);
            } else {
                console.log('Error deleting plan');
            }
        } catch (error) {
            console.error('Error deleting plan:', error);
        }
    };

    const cancelDelete = () => {
        setPlanToDelete(null);
    };

    const toggleEditDropdown = () => {
        setShowEditDropdown(!showEditDropdown);
    };

    const handleDaySelect = (day) => {
        setSelectedDay(day);
        setShowEditDropdown(false); // Ocultar el dropdown después de seleccionar un día
    };

    return (
        <div className='main-format-create-plan'>
            <Link to='/home' id='backButton'>Back</Link>

            <h2 className='main-page-header'>My plans</h2>
            {plans.map((plan) => (
                console.log(plan),
                <div className='prompt' key={plan.planId}>
                    <h3 id='top-text'>{plan.name}</h3>
                    <p id='top-text'>{plan.description}</p>

                    <button id='defaultButton' onClick={toggleEditDropdown}>
                        {showEditDropdown ? 'Close Edit' : 'Edit Plan'}
                    </button>

                    {showEditDropdown && (
                        <div className='dropdown'>
                            <p id='top-text'>Select a day:</p>
                            {daysOfWeek.map((day) => (
                                <Link key={day} to={`/plans/${plan.planId}/schedule/${day}`}>
                                    <button className='dropdownButton' onClick={() => handleDaySelect(day)}>
                                        {day}
                                    </button>
                                </Link>
                            ))}
                        </div>
                    )}

                    <button id='defaultButton' onClick={() => confirmDelete(plan.planId)}>
                        Delete plan
                    </button>

                    {plan.planId === planToDelete && (
                        <div>
                            <p id='top-text'>¿Are you sure?</p>
                            <button id='colouredButton' onClick={cancelDelete}>No</button>
                            <button id='defaultButton' onClick={() => deletePlan(plan.planId)}>Yes</button>
                        </div>
                    )}
                </div>
            ))}
            <Link to='/createplan' id='defaultButton'>Create New Plan</Link>
        </div>
    );
}

export default PlansListed;
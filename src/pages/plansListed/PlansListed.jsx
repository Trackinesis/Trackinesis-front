import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PlansListed.css';
import '../../styles.css';
import BackButton from "../../components/backButton/BackButton";
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";

function PlansListed() {
    const [plans, setPlans] = useState([]);
    const [planToDelete, setPlanToDelete] = useState(null);
    const [showEditDropdown, setShowEditDropdown] = useState(false);
    const [routines, setRoutines] = useState([]);
    const [selectedRoutine, setSelectedRoutine] = useState(null);
    const [selectedDay, setSelectedDay] = useState('');
    const [editingPlanId, setEditingPlanId] = useState(null);
    const currentUserId = localStorage.getItem('userId');

    const userId = localStorage.getItem('userId');

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8081/plan/${userId}`, { params: { userId: userId } })
                .then(res => {
                    const plansData = res.data;
                    setPlans(plansData);
                })
                .catch(err => console.log(err));
        } else {
            console.error('UserId is not available in localStorage');
        }
    }, [userId]);

    useEffect(() => {
        axios.get(`http://localhost:8081/routine/get/${currentUserId}`)
            .then(res => {
                const routinesData = res.data;
                setRoutines(routinesData);
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

            if (res.status === 200) {
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

    const toggleEditDropdown = (planId) => {
        setShowEditDropdown(!showEditDropdown);
        setEditingPlanId(planId);
    };

    const handleRoutineSelect = (routineId) => {
        setSelectedRoutine(routineId);
    };

    const addRoutineToPlan = async (planId, routineId) => {
        try {
            const API_URL = `http://localhost:8081/planroutine`;
            const res = await axios.post(API_URL, { planId, routineId });

            if (res.status === 200) {
                console.log('Routine added to plan successfully');
                setSelectedRoutine(null);
                setSelectedDay('');
            } else {
                console.log('Error adding routine to plan');
            }
        } catch (error) {
            console.error('Error adding routine to plan:', error);
        }
    };

    return (
        <div className='main-format-create-plan'>
            <Link to='/home' id='backButton'><BackButton/></Link>

            <h2 className='main-page-header'>My plans</h2>

            <div className="create-button-container">
                <Link to='/createplan' id='createRoutineButton' className='create-button'>Create New Plan</Link>
            </div>

            {plans.map((plan) => (
                <div className='routine-card' key={plan.planId}>
                    <h3 id='top-text'>Plan name: {plan.name}</h3>
                    <p id='top-text'>Description: {plan.description}</p>

                    <button id='defaultButton' onClick={() => toggleEditDropdown(plan.planId)}>
                        {showEditDropdown && editingPlanId === plan.planId ? 'Close Edit' : 'Edit Plan'}
                    </button>

                    {showEditDropdown && editingPlanId === plan.planId && (
                        <div className="custom-select-container">
                            <select
                                className="custom-select"
                                value={selectedRoutine || ""}
                                onChange={(e) => {
                                    const selectedRoutineId = e.target.value;
                                    const selectedRoutineDay = routines.find(routine => routine.routineId === selectedRoutineId)?.day || '';
                                    handleRoutineSelect(selectedRoutineId, selectedRoutineDay);
                                }}
                            >
                                <option value="">Select a routine</option>
                                {routines.map((routine) => (
                                    <option key={routine.routineId} value={routine.routineId}>
                                        {routine.name} ({routine.day})
                                    </option>
                                ))}
                            </select>
                            <button
                                id="defaultButton"
                                className="custom-button"
                                onClick={() => addRoutineToPlan(plan.planId, selectedRoutine, selectedDay)}
                                disabled={!selectedRoutine}
                            >
                                Add Routine to Plan
                            </button>
                        </div>
                    )}

                    <button id='defaultButton' onClick={() => confirmDelete(plan.planId)}>
                        Delete plan
                    </button>

                    {plan.planId === planToDelete && (
                        <div className='delete-confirmation'>
                            <p className='confirmation-text'>Are you sure?</p>
                            <div className='confirmation-buttons'>
                                <button className='cancel-button' onClick={cancelDelete}>No</button>
                                <button className='delete-button' onClick={() => deletePlan(plan.planId)}>Yes</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <FooterNavigation/>
        </div>
    );
}

export default PlansListed;

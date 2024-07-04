import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PlansListed.css';
import '../../styles.css';

function PlansListed() {
    const [plans, setPlans] = useState([]);
    const [planToDelete, setPlanToDelete] = useState(null);
    const [showEditDropdown, setShowEditDropdown] = useState(false);
    const [routines, setRoutines] = useState([]);
    const [selectedRoutine, setSelectedRoutine] = useState(null);
    const [editingPlanId, setEditingPlanId] = useState(null); // State to track which plan is being edited

    useEffect(() => {
        axios.get('http://localhost:8081/plan')
            .then(res => {
                const plansData = res.data;
                setPlans(plansData);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8081/routine')
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

    const toggleEditDropdown = (planId) => {
        setShowEditDropdown(!showEditDropdown);
        setEditingPlanId(planId); // Set the plan being edited
    };

    const handleRoutineSelect = (routineId) => {
        setSelectedRoutine(routineId);
    }

    const addRoutineToPlan = async (planId, routineId) => {
        try {
            const API_URL = `http://localhost:8081/planroutine`;
            const res = await axios.post(API_URL, { planId, routineId });

            if (res.status === 200) {
                console.log('Routine added to plan successfully');
                setSelectedRoutine(null);
            } else {
                console.log('Error adding routine to plan');
            }
        } catch (error) {
            console.error('Error adding routine to plan:', error);
        }
    };

    return (
        <div className='main-format-create-plan'>
            <Link to='/home' id='backButton'>Back</Link>

            <h2 className='main-page-header'>My plans</h2>
            {plans.map((plan) => (
                <div className='prompt' key={plan.planId}>
                    <h3 id='top-text'>Plan name: {plan.name}</h3>
                    <p id='top-text'>Description: {plan.description}</p>

                    <button id='defaultButton' onClick={() => toggleEditDropdown(plan.planId)}>
                        {showEditDropdown && editingPlanId === plan.planId ? 'Close Edit' : 'Edit Plan'}
                    </button>

                    {showEditDropdown && editingPlanId === plan.planId && (
                        <div>
                            <select value={selectedRoutine || ""} onChange={(e) => handleRoutineSelect(e.target.value)}>
                                <option value="">Selecciona una rutina</option>
                                {routines.map((routine) => (
                                    <option key={routine.routineId} value={routine.routineId}>
                                        {routine.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                id='defaultButton'
                                onClick={() => addRoutineToPlan(plan.planId, selectedRoutine)}
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

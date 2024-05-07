// with back end:
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
        // Función para cargar los planes desde el backend al montar el componente
        axios.get('http://localhost:8081/plan')
            .then(res => {
                const plans = res.data.map(plan => plan.name);
                setPlans(plans);
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
                setPlans(plans.filter((plan) => plan.id !== planToDelete)); // Actualizar la lista de planes localmente
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
            <h2 id='topTitle'>My plans</h2>
            {plans.map((plan) => (
                <div className='prompt' key={plan.id}>
                    <h3 id='top-text'>{plan.name}</h3>
                    <p id='top-text'>{plan.description}</p>

                    <button id='colouredButton' onClick={toggleEditDropdown}>
                        {showEditDropdown ? 'Close Edit' : 'Edit Plan'}
                    </button>

                    {plan.id === planToDelete && (
                        <div>
                            <p>¿Are you sure?</p>
                            <button id='colouredButton' onClick={deletePlan}>Yes</button>
                            <button id='colouredButton' onClick={cancelDelete}>No</button>
                        </div>
                    )}

                    {showEditDropdown && (
                        <div className='dropdown'>
                            <p>Select a day:</p>
                            {daysOfWeek.map((day) => (
                                <Link key={day} to={`/plans/${plan.id}/schedule/${day}`}>
                                    <button className='dropdownButton' onClick={() => handleDaySelect(day)}>
                                        {day}
                                    </button>
                                </Link>
                            ))}
                        </div>
                    )}

                    <button id='colouredButton' onClick={() => confirmDelete(plan.id)}>
                        Delete plan
                    </button>
                </div>
            ))}
        </div>
    );
}

export default PlansListed;
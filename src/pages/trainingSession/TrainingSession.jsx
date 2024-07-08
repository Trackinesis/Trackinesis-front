import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles.css';

function TrainingSession() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [routine, setRoutine] = useState('');
    const [activePlans, setActivePlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const userId = localStorage.getItem('userId');

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    const todayName = daysOfWeek[today];

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    useEffect(() => {
        const fetchPlans = async () => {
            if (userId) {
                try {
                    const response = await axios.get('http://localhost:8081/plan', {
                        params: { userId }
                    });
                    const plans = response.data;

                    console.log('Fetched plans:', plans);

                    const currentDate = getCurrentDate();
                    const activePlans = plans.filter(plan => {
                        return currentDate >= plan.startDate && currentDate <= plan.endDate;
                    });

                    console.log('Active plans:', activePlans);

                    setActivePlans(activePlans);

                    if (activePlans.length === 1) {
                        setSelectedPlan(activePlans[0].id);
                    }
                } catch (error) {
                    console.error('Error fetching plans:', error);
                }
            } else {
                console.error('UserId is not available in localStorage');
            }
        };

        fetchPlans();
    }, [userId]);

    useEffect(() => {
        const fetchRoutine = async () => {
            if (selectedPlan !== null && selectedDay !== null) {
                try {
                    const response = await axios.get('http://localhost:8081/planRoutine', {
                        params: {
                            planId: selectedPlan,
                            day: selectedDay
                        }
                    });
                    const routineData = response.data;
                    console.log('Fetched routine:', routineData);

                    if (routineData.length > 0 && routineData[0].Routine) {
                        setRoutine(routineData[0].Routine.description);
                    } else {
                        setRoutine('No hay rutina para este día.');
                    }
                } catch (error) {
                    console.error('Error fetching routine:', error);
                    setRoutine('Error fetching routine');
                }
            } else if (selectedPlan !== null) {
                const todayRoutine = `Rutina del ${todayName} para el Plan ${selectedPlan.name}`;
                setRoutine(todayRoutine);
            }
        };

        fetchRoutine();
    }, [selectedDay, selectedPlan, todayName]);


    const handleDaySelection = (event) => {
        setSelectedDay(event.target.value);
    };

    const handlePlanSelection = (event) => {
        setSelectedPlan(event.target.value);
    };

    return (
        <div className='home-page-main-format'>
            <h1 className='main-page-header'>Elige tu plan de entrenamiento</h1>
            {activePlans.length > 1 && (
                <div>
                    <h2 className='main-page-header'>Selecciona un plan activo:</h2>
                    <select onChange={handlePlanSelection} value={selectedPlan || ''}>
                        <option value="" disabled>Selecciona un plan</option>
                        {activePlans.map(plan => (
                            <option key={plan.planId} value={plan.planId}>{plan.name}</option>
                        ))}
                    </select>
                </div>
            )}
            {selectedPlan && (
                <div>
                    <button onClick={() => setSelectedDay(null)}>Routine of {todayName}</button>
                    <select onChange={handleDaySelection} value={selectedDay || ''}>
                        <option value="" disabled>Select another day</option>
                        {daysOfWeek
                            .filter(day => day !== todayName)
                            .map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                    </select>
                </div>
            )}
            <div className='main-page-header'>
                <h2>{typeof routine === 'string' ? routine : 'Cargando rutina...'}</h2>
            </div>
        </div>
    );
}


export default TrainingSession;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PlansListed.css';
import '../../styles.css';

function PlansListed() {
    const [plans, setPlans] = useState([
        { id: 1, name: 'Plan 1', description: 'Descripción del Plan 1' },
        { id: 2, name: 'Plan 2', description: 'Descripción del Plan 2' },
        { id: 3, name: 'Plan 3', description: 'Descripción del Plan 3' },
    ]);

    const [planToDelete, setPlanToDelete] = useState(null);
    const [showEditDropdown, setShowEditDropdown] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const confirmDelete = (id) => {
        setPlanToDelete(id);
    };

    const deletePlan = () => {
        setPlans(plans.filter((plan) => plan.id !== planToDelete));
        setPlanToDelete(null);
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

                    {/* Botón "Edit Plan" arriba del botón "Delete Plan" */}
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

                    {/* Mostrar dropdown de días de la semana si showEditDropdown es verdadero */}
                    {showEditDropdown && (
                        <div className='dropdown'>
                            <p id='top-text'>Select a day:</p>
                            {daysOfWeek.map((day) => (
                                <Link key={day} to={`/plans/${plan.id}/schedule/${day}`}>
                                    <button className='dropdownButton' onClick={() => handleDaySelect(day)}>
                                        {day}
                                    </button>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Botón "Delete Plan" */}
                    <button id='colouredButton' onClick={() => confirmDelete(plan.id)}>
                        Delete plan
                    </button>
                </div>
            ))}
        </div>
    );
}

export default PlansListed;

// with back end:
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './PlansListed.css';
// import '../../styles.css';
//
// function PlansListed() {
//     const [plans, setPlans] = useState([]);
//     const [planToDelete, setPlanToDelete] = useState(null);
//     const [showEditDropdown, setShowEditDropdown] = useState(false);
//     const [selectedDay, setSelectedDay] = useState('');
//     const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//
//     useEffect(() => {
//         // Función para cargar los planes desde el backend al montar el componente
//         async function fetchPlans() {
//             try {
//                 const response = await axios.get('/api/plans'); // Endpoint de la API para obtener los planes
//                 setPlans(response.data); // Guardar los planes en el estado local
//             } catch (error) {
//                 console.error('Error fetching plans:', error);
//             }
//         }
//
//         fetchPlans(); // Llamar a la función para cargar los planes al montar el componente
//     }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente
//
//     const confirmDelete = (id) => {
//         setPlanToDelete(id);
//     };
//
//     const deletePlan = async () => {
//         try {
//             await axios.delete(`/api/plans/${planToDelete}`); // Endpoint de la API para eliminar un plan
//             setPlans(plans.filter((plan) => plan.id !== planToDelete)); // Actualizar la lista de planes localmente
//             setPlanToDelete(null);
//         } catch (error) {
//             console.error('Error deleting plan:', error);
//         }
//     };
//
//     const cancelDelete = () => {
//         setPlanToDelete(null);
//     };
//
//     const toggleEditDropdown = () => {
//         setShowEditDropdown(!showEditDropdown);
//     };
//
//     const handleDaySelect = (day) => {
//         setSelectedDay(day);
//         setShowEditDropdown(false); // Ocultar el dropdown después de seleccionar un día
//     };
//
//     return (
//         <div className='main-format-create-plan'>
//             <h2 id='topTitle'>My plans</h2>
//             {plans.map((plan) => (
//                 <div className='prompt' key={plan.id}>
//                     <h3 id='top-text'>{plan.name}</h3>
//                     <p id='top-text'>{plan.description}</p>
//
//                     <button id='colouredButton' onClick={toggleEditDropdown}>
//                         {showEditDropdown ? 'Close Edit' : 'Edit Plan'}
//                     </button>
//
//                     {plan.id === planToDelete && (
//                         <div>
//                             <p>¿Are you sure?</p>
//                             <button id='colouredButton' onClick={deletePlan}>Yes</button>
//                             <button id='colouredButton' onClick={cancelDelete}>No</button>
//                         </div>
//                     )}
//
//                     {showEditDropdown && (
//                         <div className='dropdown'>
//                             <p>Select a day:</p>
//                             {daysOfWeek.map((day) => (
//                                 <Link key={day} to={`/plans/${plan.id}/schedule/${day}`}>
//                                     <button className='dropdownButton' onClick={() => handleDaySelect(day)}>
//                                         {day}
//                                     </button>
//                                 </Link>
//                             ))}
//                         </div>
//                     )}
//
//                     <button id='colouredButton' onClick={() => confirmDelete(plan.id)}>
//                         Delete plan
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// }
//
// export default PlansListed;
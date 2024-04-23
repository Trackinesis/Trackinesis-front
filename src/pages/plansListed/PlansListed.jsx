import React, { useState } from 'react'
import { Link, /*useNavigate*/ } from 'react-router-dom'
//import axios from 'axios';
import './PlansListed.css';
import '../../styles.css'

function PlansListed() {
    // Supongamos que tienes una lista de planes cargados por el usuario
    const [plans, setPlans] = useState([
        // aca se cargan desde la base de datos
        { id: 1, name: 'Plan 1', description: 'Descripción del Plan 1' },
        { id: 2, name: 'Plan 2', description: 'Descripción del Plan 2' },
        { id: 3, name: 'Plan 3', description: 'Descripción del Plan 3' },
    ]);


    // Estado para almacenar el ID del plan que se desea eliminar
    const [planToDelete, setPlanToDelete] = useState(null);

    // Función para marcar el plan a eliminar
    const confirmDelete = (id) => {
        setPlanToDelete(id);
    };

    // Función para eliminar el plan marcado
    const deletePlan = () => {
        setPlans(plans.filter(plan => plan.id !== planToDelete));
        setPlanToDelete(null); // Limpiar el estado después de eliminar
    };

    // Función para cancelar la eliminación
    const cancelDelete = () => {
        setPlanToDelete(null);
    };

    // Función para modificar un plan por su ID (en este ejemplo solo console.log)
    const modifyPlan = (id) => {
        console.log(`Modificar plan con ID ${id}`);
    };

    return (
        <div className='main-format-create-plan'>
            <h2 id='topTitle'>My plans</h2>
            {plans.map(plan => (
                <div className='prompt'  key={plan.id}>

                    <h3 id='top-text'>{plan.name}</h3>

                    <p id='top-text'>{plan.description}</p>


                    <button id='colouredButton' onClick={() => confirmDelete(plan.id)}>Delete plan</button>
                    <button id='colouredButton' onClick={() => modifyPlan(plan.id)}>Edit Plan</button>

                    {plan.id === planToDelete && (
                        <div>
                            <p>¿Are you sure ?</p>

                            <button id='colouredButton' onClick={deletePlan}>Yes</button>

                            <button id='colouredButton' onClick={cancelDelete}>No</button>
                        </div>
                    )}

                </div>
            ))}
        </div>
    );
}

export default PlansListed;
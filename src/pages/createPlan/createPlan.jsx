import React, {useState} from 'react';
import './createPlan.css'
import {Link} from "react-router-dom";

function CreatePlan() {

    const [valuesCreatePlan, setValues] = useState({
        planName: '',
        planType: '',

    });

    const [selectedDay, setSelectedDay] = useState(null);

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const handleDayClick = (day) => {
        setSelectedDay(selectedDay === day ? null :day);
    };

    return (
        <div className='main-format-create-plan'>
            <h2 id='topTitle'>Create new Training Plan</h2>

            <div className='prompt'>
                <label id='top-text' htmlFor="plan name"><strong>Plan name:</strong></label>
                <input id='formsInput' type="plan name" placeholder='Enter Plan name:' name='plan name' />
            </div>

            <div className='prompt'>
                <label id='top-text' htmlFor="plan type"><strong>Plan type:</strong></label>
                <input id='formsInput' type="plan type" placeholder='Enter Plan type:' name='plan type' />
            </div>

            <div className='prompt'>
                <label id='top-text' htmlFor="plan by code"><strong>Enter Plan by code:</strong></label>
                <input id='formsInput' type="plan by code" placeholder='Enter Plan code:' name='plan by code' />
            </div>

            <div className='prompt'>
                <label id='top-text' htmlFor="plan objective"><strong>Plan Objective (optional):</strong></label>
                <input id='formsInput' type="plan objective" placeholder='Enter Plan objective (optional):' name='plan objective' />
            </div>

            {/* Botones de los días de la semana */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: 'auto' }}>
                {daysOfWeek.map((day, index) => (
                    <div key={index}>
                        <button onClick={() => handleDayClick(day)}>
                            {day}
                        </button>
                        {selectedDay === day && (
                            <div>
                                {/* Campos adicionales para el día seleccionado */}
                                <div className='prompt'>
                                    <button id='restDayButton' disabled>Add rest day</button>
                                </div>

                                <div className='prompt'>
                                    <label id='top-text' htmlFor="create exercise"><strong>Create new exercise:</strong></label>
                                    <input id='formsInput' type="text" placeholder='Enter new exercise name:' name='create exercise' />
                                </div>

                                <div className='prompt'>
                                    <label id='top-text' htmlFor="existent exercise"><strong>Add an existent excercise:</strong></label>
                                    <input id='formsInput' type="text" placeholder='Add an existent excercise:' name='existent exercise' />
                                </div>

                                <div className='prompt'>
                                    <label id='top-text' htmlFor="default exercise"><strong>Add default excercise:</strong></label>
                                    <input id='formsInput' type="text" placeholder='Select default excercise:' name='default exercise' />
                                </div>

                                <div className='prompt'>
                                    <label id='top-text' htmlFor="add sport"><strong>Create new exercise:</strong></label>
                                    <input id='formsInput' type="text" placeholder='Add sport:' name='Add sport' />
                                </div>

                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button type='submit'  id='colouredButton' >Create plan</button>
        </div>
    );
}

export default CreatePlan;

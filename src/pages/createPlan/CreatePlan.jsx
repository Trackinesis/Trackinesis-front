import React, {useState} from 'react';
import './CreatePlan.css'
import {Link, NavLink} from "react-router-dom";

function CreatePlan() {

    const [valuesCreatePlan, setValues] = useState({
        planName: '',
        planType: '',
    });

    const [selectedDay, setSelectedDay] = useState(null);

    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

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
            <div className='days-container'>
                {daysOfWeek.map((day, index) => (
                    <button
                        key={index}
                        className={selectedDay === day ? 'selected-day' : ''}
                        onClick={() => handleDayClick(day)}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {selectedDay && (
                <div className='selected-day-options'>
                    <div className='prompt'>
                        <button id='restDayButton'>Add rest day</button>
                    </div>

                    <div className='prompt'id='createNewExercise'>
                        <Link to='/createnewexercise'>
                            <button id='newExcerciseButton'>Create new excercise</button>
                        </Link>
                    </div>

                    <div className='prompt'>
                        <Link to='/addexistentexcercise'>
                            <button id='existentExcercise'>Add an existent excercise</button>
                        </Link>
                    </div>

                    <div className='prompt'>
                        <button id='addDefaultExcercise'>Add default excercise</button>
                    </div>

                    <div className='prompt'>
                        <button id='addSport'>Add sport</button>
                    </div>
                </div>
            )}

            <button type='submit' id='colouredButton'>Create plan</button>
        </div>
    );
}

export default CreatePlan;

import React, {useState} from 'react';
import './CreatePlan.css'
import {Link, NavLink} from "react-router-dom";

function CreateRoutine() {

    const [valuesCreateRoutine, setValues] = useState({
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
            <h2 id='topTitle'>Create new Routine</h2>

            <div className='prompt'>
                <label id='top-text' htmlFor="routine name"><strong>Routine name:</strong></label>
                <input id='formsInput' type="routine name" placeholder='Enter Routine name:' name='routine name' />
            </div>

            <div className='prompt'>
                <label id='top-text' htmlFor="routine type"><strong>Routine type:</strong></label>
                <input id='formsInput' type="routine type" placeholder='Enter Routine type:' name='routine type' />
            </div>

            <div className='prompt'>
                <label id='top-text' htmlFor="routine by code"><strong>Enter Routine by code:</strong></label>
                <input id='formsInput' type="routine by code" placeholder='Enter Routine code:' name='routine by code' />
            </div>

            <div className='prompt'>
                <label id='top-text' htmlFor="routine objective"><strong>Routine Objective (optional):</strong></label>
                <input id='formsInput' type="routine objective" placeholder='Enter Routine objective (optional):' name='routine objective' />
            </div>

            {/* Botones de los días de la semana */}
            <WeekdayButtons selectedDay={selectedDay} handleDayClick={handleDayClick} />

            <button type='submit' id='colouredButton'>Create plan</button>
        </div>
    );
}

function WeekdayButtons({selectedDay, handleDayClick}) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (
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
                        <Link to='/addexistingtexcercise'>
                            <button id='existingExcercise'>Add an existing excercise</button>
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
        </div>
    );
}

export default CreateRoutine;

import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import './CreateNewExercise.css'
import '../../styles.css'

function CreateNewExercise(){

    return (
        <div className='main-page'>
            <h2 id='topTitle'>Create New Exercise</h2>

            <div className='prompt'>
                <label id='top-text' htmlFor="exercise name"><strong>Exercise name:</strong></label>
                <input id='formsInput' type="exercise name" placeholder='Enter exercise name:' name='exercise name' />
            </div>

            <div className='prompt'>
                <label id='top-text' htmlFor="exercise description"><strong>Exercise description (optional):</strong></label>
                <input id='formsInput' type="exercise description" placeholder='Enter exercise description (optional):' name='exercise description' />
            </div>

            <div className='prompt'>
                <Link to='/SetsAndRepetitionsEx'>
                    <button id='exWithSetsAndReps'>Exercise with sets and repetitions (only)</button>
                </Link>
            </div>

            <div className='prompt'>
                <Link to='/TimeEx'>
                    <button id='exWithTime'>Exercise with time (only)</button>
                </Link>
            </div>

            <div className='prompt'>
                <button id='createExerciste'>Create exercise</button>
            </div>

        </div>

    );

}

export default CreateNewExercise;
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles.css'
import './createNewExcercise.css'

function createNewExercise(props){
    const { planName } = props.location.state;

    return (
        <div className='create-new-exercise'>
            <h2>Create New Exercise</h2>
            <p>Plan name: {planName}</p>
                <div className='prompt'>
                    <label id='top-text' htmlFor="exercise name"><strong>Exercise name:</strong></label>
                    <input id='formsInput' type="exercise name" placeholder='Enter exercise name:' name='plan name' />
                </div>
        </div>
    );

}

import React, {useState} from 'react';
import './createPlan.css'
import {Link} from "react-router-dom";

function CreatePlan() {

    const [valuesCreatePlan, setValues] = useState({
        planName: '',
        planType: '',

    })



    return (
        <div className='main-format-create-plan'>
            <h1 id='topTitle'>Create new Training Plan</h1>

            <input id='input-style' type='text' placeholder='Enter Plan Name:'/>

            <input id='input-style' type='text' placeholder='Enter Plan Type:'/>

            <input id='input-style' type='text' placeholder='Enter Plan by Code:'/>

            <input id='input-style' type='text' placeholder='Enter Plan Objective (optional):'/>


        </div>
    );
}

export default CreatePlan;
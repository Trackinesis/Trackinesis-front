import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../styles.css'

function ShareRoutine(){

    const navigate = useNavigate();
    const [routine, setRoutine] = useState(null);
    const [routineId, setRoutineId] = useState('');


    const handleInputChange = (event) => {
        setRoutineId(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:8081/routine/${routineId}`)
            .then(res => {
                console.log(res)
                const routineData = res.data;
                setRoutine(routineData);
            })
            .catch(err => console.log(err));
    };

    const handleSearch2 = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/routine')
            .then(res => {
                console.log(res)
                const routineData = res.data;
                setRoutine(routineData);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='home-page-main-format'>
            <Link to='/social' id='backButton'>Back</Link>
            <h1 className='main-page-header'>Copy Routine</h1>

            <div className='prompt'>
                <label htmlFor="routineId" id='top-text'><strong>Enter id to copy:</strong></label>
                <input
                    type="integer"
                    placeholder='Enter routine id'
                    name='routineId'
                    value={routineId}
                    onChange={handleInputChange}
                />
            </div>

            <button onClick={handleSearch} id='defaultButton'>Search</button>


            {routine && (
                <div>
                    <h2 id='top-text'>{routine.name}</h2>
                    <p id='top-text'>{routine.description}</p>
                    <button onClick={handleSearch2} id='defaultButton'>Copy</button>
                </div>
            )}
        </div>
    );
}

export default ShareRoutine;

//<button onClick={handleRoutineToCopy} id='defaultButton'>Copy</button>
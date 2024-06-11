import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../styles.css'

function ShareRoutine(){

    const navigate = useNavigate();
    const [routine, setRoutine] = useState(null);
    const [routineId, setRoutineId] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);


    const handleInputChange = (event) => {
        setRoutineId(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setErrorMessage(null)
        axios.get(`http://localhost:8081/routine/${routineId}`)
            .then(res => {
                console.log(res)
                const routineData = res.data;
                if (routineData.state === 'private') {
                    setErrorMessage('This routine is private')
                }
                if (routineData.state === 'public') {
                    setRoutine(routineData);
                    setErrorMessage(null);
                }
            })
            .catch(err => {
                console.error(err);
                setErrorMessage('Error retrieving routine');
            });
    };

    const handleInputChange2 = (event) => {
        setRoutineId(event.target.value);
    };

    const handleSearch2 = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/createroutine', routine)
            .then(res => {
                console.log(res)
                navigate('/home')
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

            {errorMessage && (
                <div className='error-message'>
                    {errorMessage}
                </div>
            )}

            {routine && (
                <div>
                    <h2 id='top-text'>{routine.name}</h2>
                    <p id='top-text'>{routine.description}</p>
                    <button onChange={handleInputChange2} onClick={handleSearch2} id='defaultButton'>Copy</button>
                </div>
            )}
        </div>
    );
}

export default ShareRoutine;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles.css';
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";
import BackButton from "../../components/backButton/BackButton";

function ShareRoutine() {
    const navigate = useNavigate();
    const [routine, setRoutine] = useState(null);
    const [routineId, setRoutineId] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const userId = localStorage.getItem('userId');

    const handleInputChange = (event) => {
        setRoutineId(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        setErrorMessage(null);
        console.log(`Searching for routine with ID: ${routineId}`);

        try {
            const res = await axios.get(`http://localhost:8081/routine/find/${routineId}`);
            console.log("this is the routineData:", res.data);
            const routineData = res.data;

            if (routineData.state === 'private') {
                setErrorMessage('This routine is private');
            } else if (routineData.state === 'public') {
                setRoutine(routineData);
                setErrorMessage(null);
            } else if (routineData.state === 'friends') {
                try {
                    const friendsRes = await axios.get(`http://localhost:8081/friend/${userId}`);
                    console.log("this is the friendData:", friendsRes.data);
                    const friends = friendsRes.data;
                    let isFriend = false;

                    for (let i = 0; i < friends.length; i++) {
                        if (friends[i].followedId === routineData.userId) {
                            isFriend = true;
                            break;
                        }
                    }

                    if (isFriend) {
                        setRoutine(routineData);
                        setErrorMessage(null);
                    } else {
                        setErrorMessage('This routine is only visible to friends');
                    }
                } catch (err) {
                    console.error(err);
                    setErrorMessage('Error retrieving friends');
                }
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('Error retrieving routine');
        }
    };

    const handleSearch2 = (event) => {
        event.preventDefault();
        const newRoutine = { ...routine, userId: userId };
        delete newRoutine.id;
        axios.post('http://localhost:8081/createroutine', newRoutine)
            .then(res => {
                console.log(res);
                navigate('/home');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='home-page-main-format p'>
            <Link to='/social' id='backButton'><BackButton/></Link>
            <h1 className='main-page-header'>Copy Routine</h1>

            <div className='prompt'>
                <label htmlFor="routineId" id='top-text'><strong>Enter id to copy:</strong></label>
                <input
                    type="number"
                    placeholder='Enter routine id'
                    id='routineId'
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
                    <button onClick={handleSearch2} id='defaultButton'>Copy</button>
                </div>
            )}
            <FooterNavigation/>
        </div>
    );
}

export default ShareRoutine;
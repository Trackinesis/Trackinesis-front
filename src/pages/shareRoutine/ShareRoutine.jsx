import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles.css';
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";
import BackButton from "../../components/backButton/BackButton";

function ShareRoutine() {
    const navigate = useNavigate();
    const [routines, setRoutines] = useState([]); // Store multiple routines
    const [searchTerm, setSearchTerm] = useState(''); // Search input
    const [searchType, setSearchType] = useState('id'); // Search type (ID, name, creator ID)
    const [errorMessage, setErrorMessage] = useState(null); // Error handling
    const userId = localStorage.getItem('userId');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Update search term
    };

    const handleSelectChange = (event) => {
        setSearchType(event.target.value); // Update search type
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        setErrorMessage(null);
        setRoutines([]); // Clear previous search results

        if (!searchTerm.trim()) {
            setErrorMessage('Please enter a search value');
            return;
        }

        console.log(`Searching for routines by ${searchType}: ${searchTerm}`);
        let foundValidRoutine = false; // Flag to track if a valid routine is found
        try {
            let res;
            if (searchType === 'id') {
                res = await axios.get(`http://localhost:8081/routine/find/${searchTerm}`);
                const routineData = res.data;
                foundValidRoutine = handleRoutineVisibility(routineData);
            } else if (searchType === 'name') {
                res = await axios.get(`http://localhost:8081/routine/findByName/${searchTerm}`);
                res.data.forEach(routineData => {
                    foundValidRoutine = handleRoutineVisibility(routineData) || foundValidRoutine;
                });
            } else if (searchType === 'creatorId') {
                res = await axios.get(`http://localhost:8081/routine/findByCreator/${searchTerm}`);
                res.data.forEach(routineData => {
                    foundValidRoutine = handleRoutineVisibility(routineData) || foundValidRoutine;
                });
            }

            if (!foundValidRoutine) {
                setErrorMessage('No visible routines found'); // Show error if no routine is valid
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('Error retrieving routines');
        }
    };

    const handleRoutineVisibility = async (routineData) => {
        if (routineData.state === 'private') {
            return false;
        } else if (routineData.state === 'public') {
            setRoutines(prevRoutines => [...prevRoutines, routineData]);
            return true;
        } else if (routineData.state === 'friends') {
            try {
                const friendsRes = await axios.get(`http://localhost:8081/friend/${userId}`);
                const friends = friendsRes.data;
                const isFriend = friends.some(friend => friend.followedId === routineData.userId);

                if (isFriend) {
                    setRoutines(prevRoutines => [...prevRoutines, routineData]);
                    return true; // Valid routine found
                } else {
                    return false; // Routine not visible to the user
                }
            } catch (err) {
                console.error(err);
                setErrorMessage('Error retrieving friends');
                return false;
            }
        }
        return false;
    };

    const handleSearch2 = (event, routine) => {
        event.preventDefault();
        const newRoutine = { ...routine, userId: userId };
        delete newRoutine.id; // Remove ID for copying
        axios.post('http://localhost:8081/createroutine', newRoutine)
            .then(res => {
                console.log(res);
                navigate('/home'); // Navigate back to home
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='main-format-create-plan p'>
            <Link to='/social' id='backButton'><BackButton /></Link>
            <h1 className='main-page-header'>Search routines!</h1>

            <form action="" onSubmit={handleSearch}>
                <div className='prompt'>
                    <label htmlFor="searchTerm" id='top-text'><strong>Enter search value:</strong></label>
                    <input
                        id='formsInput'
                        type="text"
                        placeholder='Enter ID, name, or creator ID'
                        name='searchTerm'
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor="searchType" id='top-text'><strong>Select search parameter:</strong></label>
                    <select id='formsInput' value={searchType} onChange={handleSelectChange}>
                        <option value="id">By routine ID</option>
                        <option value="name">By Name</option>
                        <option value="creatorId">By creator ID</option>
                    </select>
                </div>

                <button onClick={handleSearch} id='defaultButton'>Search</button>
            </form>

            {errorMessage && (
                <div className='error-message'>
                    {errorMessage}
                </div>
            )}

            {routines.length > 0 && (
                <div className="routine-card">
                    <h2>Routines found!</h2>
                    {routines.map(routine => (
                        <div key={routine.id}>
                            <h3 id='top-text'>{routine.name}</h3>
                            <p id='top-text'>Description: {routine.description}</p>
                            <p id='top-text'>Day: {routine.day}</p>
                            <p id='top-text'>Type: {routine.type}</p>
                            <button onClick={(e) => handleSearch2(e, routine)} id='defaultButton'>Copy</button>
                        </div>
                    ))}
                </div>
            )}

            <FooterNavigation />
        </div>
    );
}

export default ShareRoutine;

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


        if (!searchTerm.trim()) {
            setErrorMessage('Please enter a search value');
            return;
        }

        console.log(`Searching for routines by ${searchType}: ${searchTerm}`);

        try {
            let res;
            if (searchType === 'id') {
                res = await axios.get(`http://localhost:8081/routine/find/${searchTerm}`);
                setRoutines([res.data]); // Store the found routine in an array
            } else if (searchType === 'name') {
                res = await axios.get(`http://localhost:8081/routine/findByName/${searchTerm}`);
                setRoutines(res.data); // Store all found routines
            } else if (searchType === 'creatorId') {
                res = await axios.get(`http://localhost:8081/routine/findByCreator/${searchTerm}`);
                setRoutines(res.data); // Store all found routines
            }
            if (!res || res.data.length === 0) {
                setErrorMessage('No routines found'); // Handle no results
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('No routines found');
        }
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
            <Link to='/social' id='backButton'><BackButton/></Link>
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
                    <h2>Routine found!</h2>
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

            <FooterNavigation/>
        </div>
    );
}

export default ShareRoutine;

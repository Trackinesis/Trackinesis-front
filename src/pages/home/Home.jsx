import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import '../../styles.css'

function Home({ userId }) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/home')
            .then(response => {
                setUserName(localStorage.getItem('username'));
            })
            .catch(error => {
                console.error('Error fetching username:', error);
            });
    }, []);

    function getDayName(date = new Date()) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = date.getDay();
        return days[day];
    }

    const today = new Date();
    const dayName = getDayName(today);


    console.log('User name:', userName);

    return (
        <div className='home-page-main-format'>
            <h2>Hi {userName}</h2>
            <h3>Today is {dayName}</h3>

            <Link to='/createplan' id='defaultButton'>Create New Plan</Link>
            <Link to='/userpage' id='defaultButton'>User Page </Link>
        </div>
    );
}

export default Home;
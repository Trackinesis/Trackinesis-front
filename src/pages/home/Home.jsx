import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import '../../styles.css'

function Home({ userId }) {
    const [name, setUserName] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/home')
            .then(response => {
                setUserName(localStorage.getItem('name'));
            })
            .catch(error => {
                console.error('Error fetching name:', error);
            });
    }, []);

    function getDayName(date = new Date()) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = date.getDay();
        return days[day];
    }
    const today = new Date();
    const dayName = getDayName(today);

    //console.log('User name:', userName);

    return (
        <div className='home-page-main-format'>
            <h2 className='main-page-header'>Hi {name}</h2>
            <h3 className='main-page-header'>Today is {dayName}</h3>

            {<h4 id='defaultButton'>Start exercise</h4>}
            <Link to='/planslisted' id='defaultButton'>My plans</Link>
            <Link to='/routineslisted' id='defaultButton'>My routines</Link>
            <Link to='/userpage' id='defaultButton'>User Page</Link>
            <Link to='/social' id='defaultButton'>Social</Link>
            <Link to='/calendar' id='defaultButton'>Calendar</Link>
        </div>
    );
}

export default Home;
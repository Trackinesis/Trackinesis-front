import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

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

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    console.log('User name:', userName);

    return (
        <div className='bg-white p-3 rounded w-100'>
            <h2>Hi {userName}</h2>
            <h3>Today is {dayName}</h3>

            <div className="container">
                <button className="menu-button" onClick={toggleMenu}>
                    =
                </button>
                <div className={`side-panel ${isOpen ? 'open' : ''}`}>
                    <ul>
                        <li>Calendar</li>
                        <li>Progress</li>
                        <li>Leaderboard</li>
                    </ul>
                </div>
            </div>

            <Link to='/userpage' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>User Page </Link>
        </div>
    );
}

export default Home;
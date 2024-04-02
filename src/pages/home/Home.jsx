import React, { useState } from 'react'
import { Link, /*useNavigate*/ } from 'react-router-dom'
//import axios from 'axios';
import './Home.css';

function Home() {


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

    return (
            <div className='bg-white p-3 rounded w-100'>
                <h2>Hi getName()</h2>
                <h3>Today is {dayName}</h3>

                <div className="container">
                    <button className="menu-button" onClick={toggleMenu}>
                        =
                    </button>
                    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
                        <ul>
                            <li>Calendario</li>
                            <li>Seguimiento</li>
                            <li>Leaderboard</li>
                        </ul>
                    </div>
                </div>

                <Link to='/userpage' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>User Page </Link>
            </div>
    )
}

export default Home;
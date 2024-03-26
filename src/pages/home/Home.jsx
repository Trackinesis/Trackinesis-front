import React, { /*useState*/ } from 'react'
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

    return (
        <div className='main-page-format'>
            <div className='bg-white p-3 rounded w-100'>
                <h2>Hi getName()</h2>
                <h3>Today is {dayName}</h3>
                <Link to='/userpage' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>User Page </Link>
            </div>
        </div>
    )
}

export default Home;
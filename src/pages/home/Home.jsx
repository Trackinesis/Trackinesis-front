import React, { useState } from 'react'
import { Link, /*useNavigate*/ } from 'react-router-dom'
//import axios from 'axios';
import './Home.css';
import '../../styles.css'

function Home() {


    function getDayName(date = new Date()) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = date.getDay();
        return days[day];
    }
    
    const today = new Date();
    const dayName = getDayName(today);


    return (
            <div className='home-page-main-format'>
                <h1 id='topGreeter'>Hi getName()</h1>
                <h3 id='topGreeter'>Today is {dayName}</h3>

                <Link to='/createroutine' id='defaultButton'>Create New Routine</Link>
                <Link to='/userpage' id='defaultButton'>User Page </Link>
            </div>
    )
}

export default Home;
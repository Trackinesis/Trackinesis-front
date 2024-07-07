import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import '../../styles.css'

function Home() {
    const [name, setName] = useState(null);

useEffect(() => {
  const fetchName = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      const response = await axios.get(`http://localhost:8081/home/${userId}`);
      const fetchedName = response.data.name;

      setName(fetchedName);
    } catch (error) {
      console.error('Error fetching name:', error);
    }
  };

  fetchName();
}, []);

    function getDayName(date = new Date()) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = date.getDay();
        return days[day];
    }
    const today = new Date();
    const dayName = getDayName(today);

    return (
        <div className='home-page-main-format'>
            <h2 className='main-page-header'>Hi {name}</h2>
            <h3 className='main-page-header'>Today is {dayName}</h3>

            <Link  to='/trainingsession' id='defaultButton'>Start exercise</Link>
            <Link to='/planslisted' id='defaultButton'>My plans</Link>
            <Link to='/routineslisted' id='defaultButton'>My routines</Link>
            <Link to='/userpage' id='defaultButton'>User Page</Link>
            <Link to='/social' id='defaultButton'>Social</Link>
            <Link to='/personalcalendar' id='defaultButton'>Calendar</Link>
        </div>
    );
}

export default Home;
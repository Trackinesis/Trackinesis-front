import { FaRegCalendarAlt, FaUserCircle } from "react-icons/fa"; // Importa ambos íconos
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import '../../styles.css'
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";

function Home() {
    const [name, setName] = useState(null);
    const navigate = useNavigate();

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
        <div className='home-page-main-format p'>
            <FaUserCircle
                onClick={() => navigate('/userpage')}
                className='user-icon'
            />
            <FaRegCalendarAlt
                onClick={() => navigate('/personalcalendar')}
                className='calendar-icon'
            />

            <h2 className='main-page-header h2'>Hi {name}</h2>
            <h3 className='main-page-header h2'>Today is {dayName}</h3>

            <Link to='/trainingsession' id='defaultButton' className='p'>
                Start Exercise
            </Link>

            <FooterNavigation />
        </div>
    );
}

export default Home;

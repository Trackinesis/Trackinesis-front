import {FaRegCalendarAlt, FaRunning, FaUserCircle} from "react-icons/fa"; // Importa ambos íconos
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
//import '../../styles.css'
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";
import card1 from "../../assets/icons/card_1.jpg"
import card2 from "../../assets/icons/card_2.jpg"
import card3 from "../../assets/icons/card_3.jpg"
import card4 from "../../assets/icons/card_4.jpg"
import card6 from "../../assets/icons/card_6.jpg"
import card7 from "../../assets/icons/card_7.jpg"


function Home() {
    const [name, setName] = useState(null);
    const navigate = useNavigate();

    const imagesUrls = [
        card1,
        card2,
        card3,
        card4,
        card6,
        card7
    ]

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
            <FaUserCircle
                onClick={() => navigate('/userpage')}
                className='user-icon'
            />
            <FaRegCalendarAlt
                onClick={() => navigate('/personalcalendar')}
                className='calendar-icon'
            />

            <div className="top-content">
                <h2 className='main-page-header'>Hi {name}</h2>
                <h3 className='main-page-header'>Today is {dayName}</h3>
            </div>

            <Link to='/trainingsession' id='start-exercise-button' className='start-exercise-button'>
                <div className="icon-Container">
                    <FaRunning className="running-icon"/>
                </div>
                <div className="text">Start Exercise</div>
            </Link>

            <FooterNavigation/>
        </div>
    );
}

export default Home;

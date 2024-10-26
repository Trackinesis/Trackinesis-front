import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import '../../styles.css'
import DefaultButton from "../../components/button/DefaultButton";
import { FaUserCircle } from "react-icons/fa";
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";

function Home() {
    const [name, setName] = useState(null);
    const navigate = useNavigate();  // For programmatic navigation

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
            {/* Positioning the icon in the top-right corner */}
            <FaUserCircle
                onClick={() => navigate('/userpage')}
                style={{
                    fontSize: "3rem",
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    cursor: "pointer"
                }}
            />

            <h2 className='main-page-header'>Hi {name}</h2>
            <h3 className='main-page-header'>Today is {dayName}</h3>

            <Link to='/trainingsession' id='defaultButton'>
                Start Exercise
            </Link>
            <Link to='/personalcalendar' id='defaultButton'>Calendar</Link>

            <FooterNavigation/>
        </div>
    );
}

export default Home;

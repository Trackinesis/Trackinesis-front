import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import '../../styles.css';
import './BackCalendar.css';
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/backButton/BackButton";
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";

function PersonalCalendar() {
    const [plans, setPlans] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        axios.get(`http://localhost:8081/plan/${userId}`, {
            params: { userId }
        })
            .then(res => {
                const plansData = res.data.map(plan => ({
                    id: plan.id,
                    title: plan.name,
                    start: plan.startDate,
                    end: plan.endDate,
                    description: plan.description,
                    backgroundColor: plan.color || '#28356E', // Default background color
                    borderColor: '#000', // Border color
                    textColor: '#fff', // Text color
                }));
                setPlans(plansData);
            })
            .catch(err => console.log(err));
    }, [userId]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleEventClick = (clickInfo) => {
        alert(`Plan: ${clickInfo.event.title}\nDescripción: ${clickInfo.event.extendedProps.description}`);
    };

    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
        <div className='home-page-main-format p'>
            <button onClick={handleGoBack} id="backButton"><BackButton /></button>
            <h2 className='main-page-header h2'>Calendar</h2>
            <div className="calendar-container">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={plans}
                    eventClick={handleEventClick}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    height="auto"
                    dayHeaderContent={({ date }) => {
                        const dayDate = new Date(date); // Convert to Date object
                        return (
                            <span style={{fontWeight: 'bold'}}>
                                {dayNames[dayDate.getDay()]} {/* Show abbreviated day name */}
                            </span>
                        )
                    }}
                    dayDidMount={(info) => {
                        if (info.date.getDay() === 0) { // If it's Sunday
                            info.el.style.backgroundColor = '#FFEB3B'; // Change background to yellow
                        }
                    }}
                />
            </div>
            <FooterNavigation />
        </div>
    );
}

export default PersonalCalendar;

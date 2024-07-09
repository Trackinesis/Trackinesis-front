import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import '../../styles.css';
import './BackCalendar.css';
import {Link, useNavigate} from "react-router-dom";

function PersonalCalendar() {
    const [date, setDate] = useState(new Date());
    const [plans, setPlans] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId")

    useEffect(() => {
        axios.get(`http://localhost:8081/plan/${userId}`, {
            params: { userId }
        })
            .then(res => {
                const plansData = res.data;
                setPlans(plansData);
            })
            .catch(err => console.log(err));
    }, []);

    const isDateInRange = (dateToCheck, startDate, endDate) => {
        return dateToCheck >= new Date(startDate) && dateToCheck <= new Date(endDate);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='home-page-main-format'>

            <button onClick={handleGoBack} id="BackButtonPersonalCalendar"> Back</button>

            <Calendar
                onChange={setDate}
                value={date}
                tileContent={({ date, view }) => {
                    const eventsForDate = plans.filter(plan => isDateInRange(date, plan.startDate, plan.endDate));
                    return (
                        <div>
                            {eventsForDate.map(event => (
                                <div key={event.id}>
                                    <p>{event.name}</p>
                                </div>
                            ))}
                        </div>
                    );
                }}
            />
            {plans.map((plan, index) => (
                <div key={index}>
                    <h3 id='top-text'>Plan name: {plan.name}</h3>
                    <p id='top-text'>Description: {plan.description}</p>
                </div>
            ))}
        </div>
    );
}

export default PersonalCalendar;
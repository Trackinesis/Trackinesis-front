import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import '../../styles.css';

function PersonalCalendar() {
    const [date, setDate] = useState(new Date());
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/plan')
            .then(res => {
                const plansData = res.data;
                setPlans(plansData);
            })
            .catch(err => console.log(err));
    }, []);

    const isDateInRange = (dateToCheck, startDate, endDate) => {
        return dateToCheck >= new Date(startDate) && dateToCheck <= new Date(endDate);
    };

    return (
        <div className='home-page-main-format'>
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
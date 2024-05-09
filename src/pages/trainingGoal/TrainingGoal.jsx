import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import '../../styles.css';

function TrainingGoal() {
    const navigate = useNavigate();
    const [goals, setGoals] = useState([]);

    const loadGoals = async () => {
        const result = await axios.get('http://localhost:8081/goal');
        setGoals(result.data);
    };

    const handlePause = async (id) => {
        const updatedData = goals.map((item) => item.id === id? {...item, state: 'Paused'} : item);
        setGoals(updatedData);
        await axios.put(`http://localhost:8081/goal/${id}`, {state: 'Paused'})
    };
    const handleResume = async (id) => {
        const updatedData = goals.map((item) => item.id === id? {...item, state: 'Active'} : item);
        setGoals(updatedData);
        await axios.put(`http://localhost:8081/goal/${id}`, {state: 'Active'})
    }

    useEffect(() => {
        loadGoals();
    }, []);

    const handleGoBack = () => {
        navigate(-1);
    };

    const columns = [
        { name: 'Goal', selector: 'id', sortable: true },
        { name: 'Objective', selector: 'objective', sortable: true },
        { name: 'State', selector: 'state',
            cell: row => (
                <>
                    <button onClick={() => handlePause(row.id)}>Pause</button>
                    <button onClick={() => handleResume(row.id)}>Resume</button>
                </>
            ),
        },
    ];

    return (
        <div className='main-page'>
            <button onClick={handleGoBack} id="backButton"> Back</button>
            <h2 id='topTitle'>Training Goals</h2>

            <DataTable
                title="Goals"
                columns={columns}
                data={goals}
            />
        </div>
    );
}

export default TrainingGoal;
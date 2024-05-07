import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles.css';

function TrainingGoal() {
    const navigate = useNavigate();
    const [goals, setGoals] = useState([]);
    const [currentGoal, setCurrentGoal] = useState({});

    useEffect(() => {
        // Fetch goals from the server when the component mounts
        axios.get('/api/goals').then(response => {
            setGoals(response.data);
        });
    }, []);

    const handleInputChange = (event) => {
        setCurrentGoal({
            ...currentGoal,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Send a request to the server to save the goal
        // If the goal already exists, update it; otherwise, create a new one
        if (currentGoal.id) {
            axios.put(`/api/goals/${currentGoal.id}`, currentGoal).then(response => {
                // Update the goal in the state
                setGoals(goals.map(goal => goal.id === currentGoal.id ? response.data : goal));
                setCurrentGoal({});
            });
        } else {
            axios.post('/api/goals', currentGoal).then(response => {
                // Add the new goal to the state
                setGoals([...goals, response.data]);
                setCurrentGoal({});
            });
        }
    };

    const handleEdit = (goal) => {
        setCurrentGoal(goal);
    };

    const handleDelete = (id) => {
        // Send a request to the server to delete the goal
        axios.delete(`/api/goals/${id}`).then(() => {
            // Remove the goal from the state
            setGoals(goals.filter(goal => goal.id !== id));
        });
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='main-page'>
            <button onClick={handleGoBack} id="backButton"> Back</button>
            <h2 id='topTitle'>Training Goals</h2>
            <form onSubmit={handleSubmit}>
                <input name="weightGoal" value={currentGoal.weightGoal || ''} onChange={handleInputChange} placeholder="Weight Goal" />
                <input name="volumeLifted" value={currentGoal.volumeLifted || ''} onChange={handleInputChange} placeholder="Volume Lifted" />
                <button type="submit">Save Goal</button>
            </form>
            <table>
                {goals.map(goal => (
                    <tr key={goal.id}>
                        <td>{goal.weightGoal}</td>
                        <td>{goal.volumeLifted}</td>
                        <td>
                            <button onClick={() => handleEdit(goal)}>Edit</button>
                            <button onClick={() => handleDelete(goal.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default TrainingGoal;
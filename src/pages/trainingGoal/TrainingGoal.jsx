import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import '../../styles.css';

function TrainingGoal() {
    const navigate = useNavigate();
    const [goals, setGoals] = useState([]);
    const [columns, setColumns] = useState([]);
    const [newGoal, setNewGoal] = useState({
        name: '',
        description: '',
        status: true
    });

    useEffect(() => {
        axios.get('http://localhost:8081/goals')
            .then(res => {
                const goalsData = res.data;
                setGoals(goalsData);

                const columns = Object.keys(goalsData[0] || {}).map((key) => ({
                    name: key.charAt(0).toUpperCase() + key.slice(1),
                    selector: key
                }));

                columns.concat({
                    name: 'Edit Goal',
                    selector: 'editGoal'
                });

                setColumns(columns);

        })
            .catch(err => console.log(err));
    }, []);

    const handleCreateGoal = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/goal', newGoal)
            .then(res => {
                console.log('Plan added successfully', res.data);
                navigate('/traininggoal')
            })
            .catch(err => console.log(err));
    };

    const handleInputChange = (event) => {
        setNewGoal({ ...newGoal, [event.target.name]: event.target.value });
    };


    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='main-page'>
            <button onClick={handleGoBack} id="backButton"> Back</button>
            <h2 id='topTitle'>Training Goals</h2>

            <DataTable
                columns={columns}
                data={goals}

            />

            <form action="" onSubmit={handleCreateGoal}>
                <div className='prompt'>
                    <label id='top-text' htmlFor='goalName'>Goal Name </label>
                    <input type="text" name="name" placeholder="Goal Name" onChange={handleInputChange}/>

                    <label id='top-text' htmlFor= 'goalDescription'> Description</label>
                    <input type="text" name="description" placeholder="Goal Description" onChange={handleInputChange}/>

                    <button type="submit" onClick={handleCreateGoal}>Create Goal</button>
                </div>

            </form>


        </div>
    );
}

export default TrainingGoal;
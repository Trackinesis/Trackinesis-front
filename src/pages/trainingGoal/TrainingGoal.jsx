import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FaPause, FaPlay, FaTrash } from "react-icons/fa";
import axios from 'axios';
import '../../styles.css';
import BackButton from "../../components/backButton/BackButton";
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";

function TrainingGoal() {
  const navigate = useNavigate();
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [goalOptions, setGoalOptions] = useState([]);
  const userId = localStorage.getItem("userId")
  const [newGoal, setNewGoal] = useState({
    name: '',
    description: '',
    status: true
  });

  const columns = [
    {
      name: 'Goal Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status ? 'Active' : 'Inactive',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div>
          <button id='defaultSmallButton' onClick={() => handlePause(row.goalId)}><FaPause /></button>
          <button id='defaultSmallButton' onClick={() => handlePlay(row.goalId)}><FaPlay /></button>
          <button id='defaultDeleteSmallButton' onClick={() => confirmDelete(row.goalId)}><FaTrash /></button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  useEffect(() => {
    axios.get('http://localhost:8081/goal')
      .then(res => {
        const goals = res.data.map(goal => ({
          goalId: goal.goalId,
          name: goal.name,
          description: goal.description,
          status: goal.status
        }));
        setGoalOptions(goals);
      })
      .catch(err => console.log(err));
  }, []);

  const handleCreateGoal = (event) => {
    event.preventDefault();
    const goalData = { ...newGoal, userId };
    axios.post('http://localhost:8081/goal', goalData)
      .then(res => {
        console.log('Training goal added successfully', res.data);
        setGoalOptions([...goalOptions, res.data]);
        setNewGoal({ name: '', description: '', status: true });
      })
      .catch(err => console.log(err));
  };

  const handleInputChange = (event) => {
    setNewGoal({ ...newGoal, [event.target.name]: event.target.value });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePause = async (goalId) => {
    try {
      const goalToUpdate = goalOptions.find((goal) => goal.goalId === goalId);
      if (!goalToUpdate) {
        console.error('Goal not found:', goalId);
        return;
      }

      const updatedGoal = {
        ...goalToUpdate,
        status: false
      };

      const API_URL = `http://localhost:8081/goal/${goalId}`;
      const res = await axios.post(API_URL, updatedGoal);

      if (res.status === 200) {
        console.log('Goal updated successfully');
        setGoalOptions(goalOptions.map((goal) =>
          goal.goalId === goalId ? updatedGoal : goal
        ));
      } else {
        console.error('Error updating goal:', res.data);
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const handlePlay = async (goalId) => {
    try {
        const goalToUpdate = goalOptions.find((goal) => goal.goalId === goalId);
        if (!goalToUpdate) {
          console.error('Goal not found:', goalId);
          return;
        }

        const updatedGoal = {
          ...goalToUpdate,
          status: true
        };

        const API_URL = `http://localhost:8081/goal/${goalId}`;
        const res = await axios.post(API_URL, updatedGoal);

        if (res.status === 200) {
          console.log('Goal updated successfully');
          setGoalOptions(goalOptions.map((goal) =>
            goal.goalId === goalId ? updatedGoal : goal
          ));
        } else {
          console.error('Error updating goal:', res.data);
        }
      } catch (error) {
        console.error('Error updating goal:', error);
      }
    }

  const deleteGoal = async (goalId) => {
    try {
      const API_URL = `http://localhost:8081/goal/${goalId}`;
      const res = await axios.delete(API_URL);

      if (res.status === 200) {
        console.log('Goal deleted successfully');
        setGoalOptions(goalOptions.filter((goal) => goal.goalId !== goalId));
        setGoalToDelete(null);
      } else {
        console.log('Error deleting goal');
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const confirmDelete = (goalId) => {
    setGoalToDelete(goalId);
  };

  const cancelDelete = () => {
    setGoalToDelete(null);
  };

    return (
        <div className='main-page p'>
            <Link to="/userpage" id='backButton'> <BackButton/> </Link>

            <h2 className='main-page-header' id="top-text">Training Goals</h2>


            <DataTable
                columns={columns}
                data={goalOptions}
            />

            {goalToDelete && (
                <div className='delete-confirmation'>
                    <p className='confirmation-text'>¿Are you sure?</p>
                    <div className='confirmation-buttons'>
                        <button className='cancel-button' onClick={cancelDelete}>No</button>
                        <button className='delete-button' onClick={() => deleteGoal(goalToDelete)}>Yes</button>
                    </div>
                </div>
            )}

            <form onSubmit={handleCreateGoal}>
                <div className='prompt'>
                    <label id='top-text' htmlFor='goalName'>Goal Name </label>
                    <input
                        id='signupForms'
                        type="text"
                        name="name"
                        placeholder="Goal Name"
                        value={newGoal.name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='prompt'>
                    <label id='top-text' htmlFor='goalDescription'> Description</label>
                    <input
                        id='signupForms'
                        type="text"
                        name="description"
                        placeholder="Goal Description"
                        value={newGoal.description}
                        onChange={handleInputChange}
                    />
                </div>

                <button id='defaultButton' type="submit">Create Goal</button>
            </form>

            <FooterNavigation/>
        </div>
    );
}

export default TrainingGoal;
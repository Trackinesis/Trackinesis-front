import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FaArrowUp } from "react-icons/fa";
import axios from 'axios';
import '../../styles.css';

function MyPersonalRecords() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState({ maxBench: '', maxSquat: '', maxDeadLift: '', weight: 0 });
  const [userHistory, setUserHistory] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const columns = [
    {
      name: 'Bench Press',
      selector: row => row.maxBench,
      sortable: true,
    },
    {
      name: 'Squat',
      selector: row => row.maxSquat,
      sortable: true,
    },
    {
      name: 'DeadLift',
      selector: row => row.maxDeadLift,
      sortable: true,
    },
  ];

  useEffect(() => {
    fetchData();
  }, [userId]);
  
  const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/signupsteptwo/${userId}`, {
          params: userId
        });
        const user = res.data;
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    if (!isNaN(value)) {
      setUser({ ...user, [name]: parseInt(value) });
    } else {
      setUser({ ...user, [name]: value });
    }

  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleToggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  const handleUpdateFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const updatedUser = {
        maxBench: user.maxBench,
        maxSquat: user.maxSquat,
        maxDeadLift: user.maxDeadLift,
        strengthRatio: user.weight > 0 ? (user.maxBench + user.maxSquat + user.maxDeadLift) / user.weight : 0,
        userId: userId
      };
  
      const API_URL = `http://localhost:8081/signupsteptwo/${userId}`;
      const res = await axios.post(API_URL, updatedUser);

      if (res.status === 200) {
        console.log('User max updated successfully');
        setUser({ maxBench: '', maxSquat: '', maxDeadLift: '', weight: 0 });
        fetchUserHistory();
        setShowUpdateForm(false);

      } else {
        console.error('Error updating user max:', res.data);
      }
    } catch (error) {
      console.error('Error submitting update form:', error);
    }
  };

  return (
    <div className='main-page'>
      <button onClick={handleGoBack} id="backButton"> Back </button>
      <h2 className='main-page-header'>My Personal Records</h2>

      <DataTable
        columns={columns}
        data={userHistory}
      />

      <button onClick={handleToggleUpdateForm}>
        <FaArrowUp /> {showUpdateForm ? 'Close Update Form' : 'Update Personal Records'}
      </button>

      {showUpdateForm && (
        <form onSubmit={handleUpdateFormSubmit}>
          <div className='prompt'>
            <label htmlFor='maxBench'>Bench Press Max </label>
            <input
              value={user.maxBench}
              onChange={handleInputChange}
              type="number"
              id="top-text"
              name="maxBench"
              placeholder="Enter your max"
            />

            <label htmlFor='maxSquat'> Squat Max</label>
            <input
              value={user.maxSquat}
              onChange={handleInputChange}
              type="number"
              id="top-text"
              name="maxSquat"
              placeholder="Enter your max"
            />

            <label htmlFor='maxDeadLift'> DeadLift Max</label>
            <input
              value={user.maxDeadLift}
              onChange={handleInputChange}
              type="number"
              id="top-text"
              name="maxDeadLift"
              placeholder="Enter your max"
            />

            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
    );
}

export default MyPersonalRecords;
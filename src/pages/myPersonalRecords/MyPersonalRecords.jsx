import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FaArrowUp } from "react-icons/fa";
import axios from 'axios';
import '../../styles.css';

function MyPersonalRecords() {
  const navigate = useNavigate();
  const [recordOptions, setRecordOptions] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const userId = localStorage.getItem('userId');
  const [newRecord, setNewRecord] = useState({
    maxBench: '',
    maxSquat: '',
    maxDeadlift: ''
  });

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
      name: 'Deadlift',
      selector: row => row.maxDeadlift,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div>
          <button onClick={() => setSelectedUserId(row.userId)}><FaArrowUp /></button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  useEffect(() => {
    axios.get(`http://localhost:8081/signupsteptwo/${userId}`)
      .then(res => {
        const users = res.data.elements(user => ({
          maxBench: user.maxBench,
          maxSquat: user.maxSquat,
          maxDeadlift: user.maxDeadlift
        }));
        setRecordOptions(users);
      })
      .catch(err => console.log(err));
  }, []);

  const handleInputChange = (event) => {
    setNewRecord({ ...newRecord, [event.target.name]: event.target.value });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleUpdateFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedUserId) {
      console.error('No user selected for update');
      return;
    }
    const newMaxBench = event.target.elements.maxBench.value;
    const newMaxSquat = event.target.elements.maxSquat.value;
    const newMaxDeadlift = event.target.elements.maxDeadlift.value;

    // Validate user input (optional)

    const updatedUser = {
      maxBench: newMaxBench,
      maxSquat: newMaxSquat,
      maxDeadlift: newMaxDeadlift,
    };

    const API_URL = `http://localhost:8081/signupsteptwo/${selectedUserId}`;
    const res = await axios.post(API_URL, updatedUser);

    if (res.status === 200) { 
      console.log('User max updated successfully');
      const updatedRecords = recordOptions.map(user =>
        user.userId === selectedUserId ? { ...user, ...updatedUser } : user
      );
      setRecordOptions(updatedRecords);
      setSelectedUserId(null); // Clear selected friend after update
    } else {
      console.error('Error updating user max:', res.data);
    }
  };
  


    return (
        <div className='main-page'>
            <button onClick={handleGoBack} id="backButton"> Back</button>
            <h2 id='topTitle'>My Personal Records</h2>

            <DataTable
                columns={columns}
                data={recordOptions}
            />
            {selectedUserId && (
            <form onSubmit={handleUpdateFormSubmit}>
                <div className='prompt'>
                    <label htmlFor='maxBench'>Bench Press Max </label>
                    <input value={newRecord.maxBench} onChange={handleInputChange} type="number" id="top-text" name="maxBench" placeholder="Enter your max" />

                    <label htmlFor='maxSquat'> Squat Max</label>
                    <input value={newRecord.maxSquat} onChange={handleInputChange} type="number" id="top-text" name="maxSquat" placeholder="Enter your max" />

                    <label htmlFor='maxDeadlift'> Deadlift Max</label>
                    <input value={newRecord.maxDeadlift} onChange={handleInputChange} type="number" id="top-text" name="maxDeadlift" placeholder="Enter your max" />

                    <button type="submit">Submit</button>
                </div>
            </form>
        )}
        </div>
    );
}

export default MyPersonalRecords;
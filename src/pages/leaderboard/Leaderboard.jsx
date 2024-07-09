import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';

function Leaderboard() {

  const navigate = useNavigate();
  const [friendOptions, setFriendOptions] = useState([]);
  

  const columns = [
    {
      name: 'Rank',
      selector: row => row.rank,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Strenght ratio',
      selector: row => row.strenghtRatio,
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginResponse = await axios.get('http://localhost:8081/login');
        const userResponse = await axios.get('http://localhost:8081/signupsteptwo');

        const logins = loginResponse.data;
        const users = userResponse.data;

        const combinedData = users.map((user) => {
          const matchingLogin = logins.find((login) => login.userId === user.userId);
          return {
            ...user,
            name: matchingLogin?.name || 'N/A',
            rank: 0,
          };
        });

        combinedData.sort((a, b) => b.strenghtRatio - a.strenghtRatio);

        let rank = 1;
        combinedData.forEach((user) => {
          user.rank = rank++;
        });

        setFriendOptions(combinedData);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchData();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='main-page'>
      <button onClick={handleGoBack} id="backButton"> Back</button>
      <h2 id='topTitle'>Leaderboard</h2>

      <DataTable
        columns={columns}
        data={friendOptions}
      />
    </div>
  );
}

export default Leaderboard;

import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import BackButton from "../../components/backButton/BackButton";
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";

function Leaderboard() {

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
      selector: row => row.strengthRatio,
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

        combinedData.sort((a, b) => b.strengthRatio - a.strengthRatio);

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

  return (
    <div className='main-format-create-plan p'>
      <Link to='/social' id='backButton'><BackButton /></Link>
      <h2 className='main-page-header' id='top-text'>Leaderboard 🏅</h2>

      <DataTable
        columns={columns}
        data={friendOptions}
      />

      <FooterNavigation/>
    </div>
  );
}

export default Leaderboard;

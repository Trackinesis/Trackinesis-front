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
        selector: row => row.name,
        sortable: true,
      },
      {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
      }
    ];
  
    useEffect(() => {
        axios.get('http://localhost:8081/friend')
          .then(res => {
            const friends = res.data.map(friend => ({
              friendId: friend.friendId,
              name: friend.name,
            }));
      
            // Sort friends based on score (assuming 'score' exists)
            friends.sort((a, b) => b.score - a.score);
      
            // Add rank during sorting
            let rank = 1;
            friends.forEach(friend => {
              friend.rank = rank++;
            });
      
            setFriendOptions(friends);
          })
          .catch(err => console.log(err));
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
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FaTrash } from "react-icons/fa";
import axios from 'axios';
import '../../styles.css'

function Friends() {

    const navigate = useNavigate();
    const [friendOptions, setFriendOptions] = useState([]);
    const [friendToDelete, setFriendToDelete] = useState(null);
    const currentUserId = localStorage.getItem('userId');

    const columns = [
        {
          name: 'Name',
          selector: row => row.name,
          sortable: true,
        },
        {
          name: 'Actions',
          cell: row => (
            <div>
              <button onClick={() => confirmDelete(row.friendId)}><FaTrash /></button>
            </div>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        }
    ];

    useEffect(() => {
        axios.get(`http://localhost:8081/friend/${currentUserId}`)
          .then(res => {
              const friends = res.data.map(friend => ({
                  friendId: friend.userFriendId, // Assuming userFriendId is the correct identifier for friendId
                  name: friend.followedName // Use followedName if it's the correct attribute for friend's name
              }));
              setFriendOptions(friends);
          })
          .catch(err => console.log(err));
    }, []);

    const handleGoBack = () => {
        navigate(-1);
    };

    const deleteFriend = async (friendId) => {
        try {
          const API_URL = `http://localhost:8081/friend/${friendId}`;
          const res = await axios.delete(API_URL);
    
          if (res.status === 200) {
            console.log('Friend deleted successfully');
            setFriendOptions(friendOptions.filter((friend) => friend.friendId !== friendId));
            setFriendToDelete(null);
          } else {
            console.log('Error deleting friend');
          }
        } catch (error) {
          console.error('Error deleting friend:', error);
        }
      };
    
      const confirmDelete = (friendId) => {
        setFriendToDelete(friendId);
      };
    
      const cancelDelete = () => {
        setFriendToDelete(null);
      };
    
    return (
        <div className='home-page-main-format'>
            <button onClick={handleGoBack} id="backButton"> Back</button>
            <h1 className='main-page-header'>Friends</h1>

            <DataTable
                columns={columns}
                data={friendOptions}
            />
            {friendToDelete && (
                <div>
                    <p id='top-text'>¿Are you sure?</p>
                    <button id='defaultButton' onClick={() => deleteFriend(friendToDelete)}>Yes</button>
                    <button id='colouredButton' onClick={cancelDelete}>No</button>
                </div>
            )}
        </div>
        
    );
}

export default Friends;
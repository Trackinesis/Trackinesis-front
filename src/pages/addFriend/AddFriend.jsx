import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles.css';
import BackButton from "../../components/backButton/BackButton";

function AddFriend() {
    const navigate = useNavigate();
    const [valuesFriend, setValuesFriend] = useState({
        name: '',
        userId: ''
    });
    const [allUsersList, setAllUsersList] = useState([]);
    const currentUserId = localStorage.getItem("userId");

    useEffect(() => {
        axios.get('http://localhost:8081/login')
            .then(res => {
                const users = res.data.map(user => ({
                    userId: user.userId,
                    name: user.name
                }));
                setAllUsersList(users);
            })
            .catch(err => console.error('Error fetching users:', err));
    }, []);

    const handleInput = (event) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedUserId = event.target.options[selectedIndex].value;
        const selectedUserName = event.target.options[selectedIndex].text;

        if (selectedUserId && selectedUserName) {
            setValuesFriend({
                userId: selectedUserId,
                name: selectedUserName
            });
        } else {
            setValuesFriend({
                name: '',
                userId: ''
            });
        }
    };

    const handleSubmitAddFriend = (event) => {
        event.preventDefault();

        if (!valuesFriend.userId || !currentUserId) {
            console.error("Both current user and selected friend must be defined.");
            return;
        }

        axios.post(`http://localhost:8081/friend/${currentUserId}`, {
            friendId: valuesFriend.userId,
            followedName: valuesFriend.name
        })
            .then(res => {
                console.log('Friend added successfully:', res.data);
                navigate('/social');
            })
            .catch(err => {
                console.error('Error adding friend:', err);
            });
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='home-page-main-format p'>
            <button onClick={handleGoBack} id="backButton"><BackButton /></button>
            <h1 className='main-page-header'>Add Friend</h1>

            <form onSubmit={handleSubmitAddFriend}>
                <label id='top-text' htmlFor="friend"><strong>Search friend:</strong></label>
                <select name="friend" onChange={handleInput} id='formsInput' defaultValue="">
                    <option disabled value="">Introduce name</option>
                    {allUsersList.map((friend) => (
                        <option key={friend.userId} value={friend.userId}>{friend.name}</option>
                    ))}
                </select>

                <div className='prompt'>
                    <button type="submit" id='colouredButton'>Add Friend</button>
                </div>
            </form>
        </div>
    );
}

export default AddFriend;


// GORDO NOTAS -> esta mandando el payload vacio, donde se hace "setValues" (en handleInputChange o donde sea) no esta
// complenado con los datos de usuario seleccionado
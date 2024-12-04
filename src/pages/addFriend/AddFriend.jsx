import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles.css';
import BackButton from "../../components/backButton/BackButton";
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";

function AddFriend() {
    const navigate = useNavigate();
    const [valuesFriend, setValuesFriend] = useState({
        name: '',
        userId: ''
    });
    const [allUsersList, setAllUsersList] = useState([]);
    const currentUserId = localStorage.getItem("userId");

    useEffect(() => {
        console.log('currentUserId from localStorage:', currentUserId);
        axios.get('http://localhost:8081/login')
            .then(res => {
                console.log('Data fetched from backend:', res.data);
                const users = res.data
                    .filter(user => user.userId.toString() !== currentUserId.toString())
                    .map(user => ({
                        userId: user.userId,
                        name: user.name
                    }));
                console.log('Filtered users:', users);
                setAllUsersList(users);
            })
            .catch(err => console.error('Error fetching users:', err));
    }, [currentUserId]);



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

    return (
        <div className='main-format-create-plan p'>
            <Link to='/social' id='backButton'><BackButton /></Link>
            <h1 className='main-page-header' id='top-text'>Add Friend</h1>

            <form onSubmit={handleSubmitAddFriend}>
                <div className='mb-3'>
                    <label id='top-text' htmlFor="friend"><strong>Search friend:</strong></label>
                    <select name="friend" onChange={handleInput} id='formsInput' defaultValue="">
                        <option disabled value="">Introduce name</option>
                        {allUsersList.map((friend) => (
                            <option key={friend.userId} value={friend.userId}>{friend.name}</option>
                        ))}
                    </select>
                </div>

                    <div className='prompt'>
                        <button type="submit" id='defaultButton'>Add Friend</button>
                    </div>
            </form>
            <FooterNavigation/>
        </div>
    );
}

export default AddFriend;


// GORDO NOTAS -> esta mandando el payload vacio, donde se hace "setValues" (en handleInputChange o donde sea) no esta
// complenado con los datos de usuario seleccionado
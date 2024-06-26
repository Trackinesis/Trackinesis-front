import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './UserPage.css';
import '../../styles.css';

function UserPage() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const [user, setUser] = useState({
        userId: '',
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleUpdatePassword = async () => {
        if (user.password === "" || currentPassword === "") {
            console.log("Password field is empty");
            return;
        }
        try {
            const API_URL = `http://localhost:8081/updatePassword`;
            const res = await axios.post(API_URL, {currentPassword: currentPassword, newPassword: user.password}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                console.log('User updated successfully');
                //setUser(prevState => ({...prevState, password: ''}));
                setCurrentPassword('');
            }
        } catch (err) {
            console.log('Error updating user', err);
        }
    };

    const handleSubmitDelete = async () => {
        try {
            const API_URL = `http://localhost:8081/signup/${userId}`;
            const res = await axios.delete(API_URL);
          
            if (res.status === 200) {
            console.log('User deleted successfully');
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            navigate('/');
            } else {
            console.log('Error deleting user');
            }
        } catch (error) {
            console.log('Error deleting user', error);
        }
    };

    const handleDeleteAccount = () => {
        setShowDeleteConfirmation(true);
    };
    const confirmDeleteAccount = async () => {
        try {
            await handleSubmitDelete();
            setShowDeleteConfirmation(false);
        } catch (error) {
            console.log('Error deleting user', error);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className='main-page'>
            <button onClick={handleGoBack} id='backButton'> Back </button>
            <h2 className='main-page-header'> Edit User Profile </h2>
            <form>
                <div className="prompt">
                    <label id='top-text' htmlFor="currentPassword"> Current Password:</label>
                    <input id='formsInput' type="password" onChange={handleChange} placeholder='Type current password'/>
                    
                    <label id='top-text' htmlFor="password"> Password:</label>
                    <input id='formsInput' name='password' type="password" onChange={handleChange} placeholder='Type new password'/>
                </div>

                <button id='saveButton' type="submit" onClick={handleUpdatePassword}>Save Changes</button>

                <button id="deleteAccountButton" type='button' onClick={handleDeleteAccount}> Delete My Account </button>
            </form>

            <button onClick={handleLogOut} id='logoutButton'>Logout</button>
            {showDeleteConfirmation && (
                <div>
                    <p id='confirmationText'>Are you sure you want to delete your account?</p>
                    <button id='yesButton' onClick={handleSubmitDelete}>Yes</button>
                    <button id='noButton' onClick={() => setShowDeleteConfirmation(false)}>No</button>
                </div>
            )}
        </div>

    );
}

export default UserPage

import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './UserPage.css';
import '../../styles.css'

function UserPage() {
    const token = localStorage.getItem('token');
    // get al back usando el token y q devuelva el userId

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        id: '',
    });

    const navigate = useNavigate();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmitUpdate = async (event) => {
        event.preventDefault();
        console.log();

    };

    const handleSubmitDelete = async (userId) => {
        try {
            const API_URL = `http://localhost:8081/user/${userId}`;
            const res = await axios.delete(API_URL);

            if (res.status === 200) {
                console.log('User deleted successfully');
                navigate('/');

            } else {
                console.log('Error updating user');
            }
        } catch (error) {
            console.log('Error updating user', error);
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
                    <label id='top-text' htmlFor="name"> Name:</label>
                    <input id='formsInput' type="text" onChange={handleChange} placeholder='Choose new username'/>
                    
                    <label id='top-text' htmlFor="password"> Password:</label>
                    <input id='formsInput' name='password' type="password" onChange={handleChange} placeholder='Type new password'/>
                </div>

                <button id='saveButton' type="submit" onClick={handleSubmitUpdate}>Save Changes</button>

                <button id="deleteAccountButton" type='button' onClick={handleDeleteAccount}> Delete My Account </button>
            </form>

            <button onClick={handleLogOut} id='logoutButton'>Logout</button>
            {showDeleteConfirmation && (
                <div>
                    <p id='confirmationText'>Are you sure you want to delete your account?</p>
                    <button id='yesButton' onClick={confirmDeleteAccount}>Yes</button>
                    <button id='noButton' onClick={() => setShowDeleteConfirmation(false)}>No</button>
                </div>
            )}
        </div>

    );
}

export default UserPage

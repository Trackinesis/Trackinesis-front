import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserPage.css';
import '../../styles.css';
import BackButton from "../../components/backButton/BackButton";
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";

function UserPage() {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const [user, setUser] = useState({
        userId: '',
        name: '',
        email: '',
        password: '',
    });

    const handleInput =(event) => {
        setUser(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleUpdatePassword = async (event) => {
        event.preventDefault();

        axios.post(`http://localhost:8081/updatePassword/${userId}`, user)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error updating password:', error);
            });
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
        localStorage.removeItem("userId");
        navigate("/");
    };

    return (
        <div className='main-page p'>
            <button onClick={handleGoBack} id='backButton'><BackButton/></button>
            <h2 className='main-page-header' id="top-text"> Edit User Profile </h2>
            <form>
                <div className="prompt">
                    <label id='top-text' htmlFor="currentPassword"> Current Password:</label>
                    <input id='signupForms' type="password" placeholder='Type current password'/>

                    <label id='top-text' htmlFor="password"> Password:</label>
                    <input id='signupForms' name='password' type="password" onChange={handleInput} placeholder='Type new password'/>
                </div>

                <button id='defaultButton' type="submit" onClick={handleUpdatePassword}>Save Changes</button>

                <Link to='/traininggoal' id='defaultButton'>My goals</Link>

                <Link to='/historicaltracking' id='defaultButton'>Historical tracking</Link>

                <button onClick={handleLogOut} id='defaultButton'>Logout</button>

                <button id="deleteAccountButton" type='button' onClick={handleDeleteAccount}> Delete My Account </button>
            </form>
            {showDeleteConfirmation && (
                <div className='delete-confirmation'>
                    <p className='confirmation-text'>Do you really want to delete your account? 😢</p>
                    <div className='confirmation-buttons'>
                        <button className='cancel-button' onClick={() => setShowDeleteConfirmation(false)}>No</button>
                        <button className='delete-button' onClick={confirmDeleteAccount}>Yes</button>
                    </div>
                </div>
            )}
            <FooterNavigation/>
        </div>
    );
}

export default UserPage;

import React, {useState} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserPage.css';
import '../../styles.css'

function UserPage() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        id: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = user.id

        try {
            const API_URL = `http://localhost:8081/user/${userId}`
            const res = await axios.delete(API_URL);

            if (res.status === 200) {
                console.log('User deleted successfully');
            } else {
                console.log('Error deleting user');
            }
        } catch (error) {
            console.log('Error deleting user', error);
        }
    };

    return (
        <div className='main-page'>

            <Link to="/home" id='backButton'> Back</Link>

            <h2 className='main-page-header'> Edit User Profile</h2>

            <form onSubmit={handleSubmit}>

                <div className="prompt">
                    <label id='top-text' htmlFor="name">
                        Name:
                    </label>
                    <input
                        id='formsInput'
                        type="text"
                        onChange={handleChange}
                        placeholder='Choose new username'
                    />
                </div>

                <div className="prompt">
                    <label id='top-text' htmlFor="email">
                        Email:
                    </label>
                    <input
                        id='formsInput'
                        type="email"
                        onChange={handleChange}
                        placeholder='Type new email'
                    />
                </div>

                <div className="prompt">
                    <label id='top-text' htmlFor="password"> Password:</label>
                    <input
                        id='formsInput'
                        type="password"
                        onChange={handleChange}
                        placeholder='Type new password'
                    />
                </div>

                <button id='saveButton' type="submit">Save Changes</button>

                <button id="deleteAccountButton" type='submit'> Delete My Account </button>
            </form>
        </div>

    );
}

export default UserPage

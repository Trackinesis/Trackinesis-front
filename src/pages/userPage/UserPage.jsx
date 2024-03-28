import React, {useState} from "react";
import './UserPage.css';

function UserPage() {

    const [user, setUser] = useState({
        name: 'Hugh Jass',
        email: 'hugh.jass@example.com',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        /* Aca deberia esta la llamada a bd para guardar el usuario*/
    };


    return (
        <div className="main-page-format">
            <div className='bg-white p-3 rounded w-100'>
                <h2> Edit User Profile</h2>
                <form onSubmit={handleSubmit} className="formsPosition">
                    <div className="form-group">
                        <label htmlFor="name" className="text-black">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="form-control bg-white"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="text-black">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="form-control bg-white"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="text-black">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className="form-control bg-white"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 align-content-center">
                        Save Changes
                    </button>
                    
                    <button type='submit'  id="deleteAccountButton" > Delete My Account </button>
                </form>
            </div>
        </div>
    );
}

export default UserPage

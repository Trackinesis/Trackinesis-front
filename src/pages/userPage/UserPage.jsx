import React from "react";
import './UserPage.css';
import {Link} from "react-router-dom";



function UserPage() {


    

    return (
        <div className='main-page-format'>
            <div className='bg-white p-4 rounded w-25'>
                <Link to="/home" className='btn btn-default border w-20 bg-light rounded-0 text-decoration-none'>Home</Link>
                <div>
                    <h2 className="name-container"> getUserName()</h2>
                </div>

                <div>
                    <button type='submit'  id="deleteAccountButton" className='btn btn-carefull w-100 rounded-0'> Delete My Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserPage
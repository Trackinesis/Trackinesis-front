import React from "react";
import './UserPage.css';



function UserPage() {


    

    return (
        <div className='main-page-format'>
            <div className='bg-white p-4 rounded w-25'>
                <h2>User Page</h2>
                <div className="bottom-right-button-container">
                    <button type='submit'  id="deleteAccountButton" className='btn btn-success w-100 rounded-0'> Delete My Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserPage
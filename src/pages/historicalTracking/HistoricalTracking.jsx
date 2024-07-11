import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../styles.css'

function HistoricalTracking() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };


    return (
        <div className='home-page-main-format'>
            <button onClick={handleGoBack} id="backButton"> Back</button>
            <h1 className='main-page-header'>Historical Tracking</h1>

            <Link to='/statistics' id='defaultButton'>See my progress</Link>

            <Link to='/mypersonalrecords' id='defaultButton'>My personal records</Link>
        </div>
    );
}

export default HistoricalTracking;
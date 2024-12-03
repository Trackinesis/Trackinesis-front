import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../styles.css'
import BackButton from "../../components/backButton/BackButton";
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";

function HistoricalTracking() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };


    return (
        <div className='historical-tracking-bg'>
            <Link to="/userpage" id='backButton'> <BackButton/> </Link>
            <h1 className='historical-tracking-header'>Historical Tracking</h1>

            <Link to='/statistics' id='defaultButton'>See my progress</Link>
            <Link to='/mypersonalrecords' id='defaultButton'>My personal records</Link>

            <FooterNavigation/>
        </div>
    );
}

export default HistoricalTracking;
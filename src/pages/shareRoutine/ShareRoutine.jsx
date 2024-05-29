import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles.css'

function shareRoutine(){
    return (
        <div className='home-page-main-format'>
            <Link to='/social' id='backButton'>Back</Link>
            <h1 className='main-page-header'>Share Routine</h1>
            <h2 className='main-page-header'>Coming soon!</h2>
        </div>
    );
}

export default shareRoutine;
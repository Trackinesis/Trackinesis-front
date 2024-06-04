import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles.css'

function HistoricalTracking() {
  return (
    <div className='home-page-main-format'>
      <Link to='/home' id='backButton'>Back</Link>
      <h1 className='main-page-header'>Historical Tracking</h1>

        <Link to='/addfriend' id='defaultButton'>See my progress</Link>

        <Link to='/mypersonalrecords' id='defaultButton'>My personal records</Link>
    </div>
  );
}

export default HistoricalTracking;
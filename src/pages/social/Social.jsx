import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles.css'

function Social() {
  return (
    <div className='home-page-main-format'>
      <Link to='/home' id='backButton'>Back</Link>
      <h1 className='main-page-header'>Social</h1>

        <Link to='/addfriend' id='defaultButton'>Add friend</Link>

        <Link to='/shareroutine' id='defaultButton'>Copy routine</Link>

        <Link to='/friends' id='defaultButton'>My friends</Link>
        <Link to='/leaderboard' id='defaultButton'> Leaderboard</Link>
    </div>
  );
}

export default Social;
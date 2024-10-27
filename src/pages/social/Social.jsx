import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles.css'
import BackButton from "../../components/backButton/BackButton";
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";

function Social() {
  return (
    <div className='home-page-main-format p'>
      <Link to='/home' id='backButton'><BackButton/></Link>
      <h1 className='main-page-header'>Social</h1>

        <Link to='/addfriend' id='defaultButton'>Add friend</Link>

        <Link to='/shareroutine' id='defaultButton'>Copy routine</Link>

        <Link to='/friends' id='defaultButton'>My friends</Link>

        <Link to='/leaderboard' id='defaultButton'>Leaderboard</Link>

        <FooterNavigation/>
    </div>
  );
}

export default Social;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles.css'

function addFriend() {
  return (
    <div className='home-page-main-format'>
        <Link to='/social' id='backButton'>Back</Link>

      <h1 className='main-page-header'>Add Friend</h1>

    </div>
  );
}

export default addFriend;
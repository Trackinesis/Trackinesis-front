import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles.css'

function AddFriend() {

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [valuesFriend, setValuesFriend] = useState({
    name: '',
  });
  const [friendOptions, setFriendOptions] = useState([]);
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    axios.get('http://localhost:8081/login')
        .then(res => {
            const users = res.data.map(user => user.name);
            setFriendOptions(users);
        })
        .catch(err => console.log(err));
}, []);

const handleInput = (event) => {
  setValuesFriend(prev => ({ ...prev, [event.target.name]: event.target.value }))
};

const handleSubmitAddFriend = (event) => {
  event.preventDefault();
  axios.post(`http://localhost:8081/friend/${userId}`, valuesFriend)
      .then(res => {
          navigate('/home');
      })
      .catch(err => console.log(err));
};

const handleGoBack = () => {
  navigate(-1);
};

  return (
    <div className='home-page-main-format'>
        <button onClick={handleGoBack} id="backButton"> Back</button>
    
      <h1 className='main-page-header'>Add Friend</h1>

      <form action="" onSubmit={handleSubmitAddFriend}>
        <label id='top-text' htmlFor="exercise name"><strong>Search friend:</strong></label>
          <select name="name" onChange={handleInput} id='formsInput'>
            <option disabled selected value="">Introduce name</option>
              {friendOptions.map((friend, index) => (
                <option key={index} value={friend}>{friend}</option>
              ))}
          </select>

          <div className='prompt'>
              <button type="submit" id='colouredButton' onClick={handleSubmitAddFriend}>Add Friend</button>
          </div>
        </form>
    </div>
  );
}

export default AddFriend;
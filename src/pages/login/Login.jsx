import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import './Login.css';
import '../../styles.css';
import logo from '../../assets/icons/Trackinesis.png'

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(null);

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (errors.email === '' && errors.password === '') {
      try {
        const res = await axios.post('http://localhost:8081/login', values);

        if (res.data.message === 'Fail') {
          alert('No record existed');
        } else if (res.data.message === 'Success') {
          const token = res.data.token;
          localStorage.setItem('token', token);
          navigate('/home');
          fetchUserId(token);
        } else {
          console.error('Unexpected response:', res.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const fetchUserId = async (token) => {
    try {
      const response = await axios.get(`http://localhost:8081/token/${token}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const userId = response.data.userId;
  
      if (userId) {
        localStorage.removeItem('userId');
        localStorage.setItem('userId', userId);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserId(token);
    }
  }, []);

  return (
      <div className='login-page p'>

        <img src={logo} alt="Logo" className="logo"/>
        <h2 className='main-page-header h2'>Log In</h2>

        <form>
          <div className='prompt p'>
            <label id='top-text'>
              <strong>Email</strong>
            </label>
            <input
                id='emailInput'
                type="email"
                placeholder='Enter your email'
                name='email'
                onChange={handleInput}
            />
            {errors.email && <span className='text-danger'> {errors.email}</span>}
          </div>

          <div className='prompt p'>
            <label id='top-text'>
              <strong>Password</strong>
            </label>
            <input
                id='passwordInput'
                type="password"
                placeholder='Enter password'
                name='password'
                onChange={handleInput}
            />
            {errors.password && <span className='text-danger'> {errors.password}</span>}
          </div>

          <button type='submit' onClick={handleSubmit} id='defaultButton' className='p'>
            Log in
          </button>

          <Link to="/signup" id='defaultButton' className='p'>
            Create Account
          </Link>
        </form>
      </div>
  );
}

export default Login;
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';
import axios from 'axios';
import './Login.css';
import '../../styles.css'


function Login() {
        const [values, setValues] = useState({
            email: '',
            password: ''
        })
        const navigate = useNavigate()
        const [errors, setErrors] = useState({});

        const handleInput =(event) => {
            setValues(prev => ({...prev, [event.target.name]: event.target.value}))
        }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/login', values)
                .then(res => {
                    console.log(res.data);
                    if (res.data === "Fail") {
                        alert("No record existed");
                    }
                    else {
                        navigate('/home');
                    }
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className='main-page'>
            <h2 className='main-page-header'>Log-In</h2>

            <form action="" onSubmit={handleSubmit}>

                <div id='email-prompt' className='prompt'>
                    <label id='top-text' htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email' onChange={handleInput} className='form-control rounded 0'/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>

                <div id='pass-prompt' className='prompt'>
                    <label id='top-text' htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password' onChange={handleInput} className='form-control rounded 0'/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>

                <button type='submit'  id='colouredButton' >Log in</button>

                <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>

            </form>
        </div>
    )
}

export default Login
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
            <h2 className='main-page-header'>Log In</h2>

            <form action="" onSubmit={handleSubmit}>

                <div className='prompt'>
                    <label id='top-text' htmlFor="email"><strong>Email</strong></label>
                    <input id='formsInput' type="email" placeholder='Enter Email' name='email' onChange={handleInput} />
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>

                <div className='prompt'>
                    <label id='top-text' htmlFor="password"><strong>Password</strong></label>
                    <input id='formsInput' type="password" placeholder='Enter Password' name='password' onChange={handleInput} />
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>

                <button type='submit'  id='colouredButton' >Log in</button>

                <Link to="/signup" id='defaultButton'>Create Account</Link>
            </form>
        </div>
    )
}

export default Login
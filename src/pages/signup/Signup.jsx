import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import './Signup.css';

function Signup() {

    const [valuesStepOne, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput =(event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(valuesStepOne));
        if (errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/signup', valuesStepOne)
                .then(res => {
                    navigate('/signupsteptwo');
                })
                .catch(err => console.log(err));
        }
    };

    return (
            <div className='signupPage'>
                <Link to="/" className='backButton'>Back</Link>
                <h2>Sign-Up</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>First Name</strong></label>
                        <input type="text" placeholder='Enter First Name' name='name'
                            onChange={handleInput} className='form-control rounded 0'/>
                        {errors.name && <span className='text-danger'> {errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Last Name</strong></label>
                        <input type="text" placeholder='Enter Last Name' name='name' 
                            onChange={handleInput} className='form-control rounded 0'/>
                        {errors.name && <span className='text-danger'> {errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' 
                            onChange={handleInput} className='form-control rounded 0'/>
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password' 
                            onChange={handleInput} className='form-control rounded 0'/>
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Repeat Password</strong></label>
                        <input type="password" placeholder='Re Enter Password' name='password' 
                            onChange={handleInput} className='form-control rounded 0'/>
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>
                    <button type='submit' onClick={handleSubmit} className='btn btn-success w-100 rounded-0'>Next</button>
                </form>
            </div>
    )
}

export default Signup
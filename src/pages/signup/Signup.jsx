import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import './Signup.css';
import '../../styles.css'

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
                    localStorage.setItem('userId', res.data.id);
                    navigate('/signupsteptwo');
                })
                .catch(err => console.log(err));
        }
    };

    return (
            <div className='main-page'>

                <Link to="/" id='backButton'>Back</Link>

                <h2 className='main-page-header'>Sign Up</h2>

                <form action="" onSubmit={handleSubmit}>

                    <div className='prompt'>
                        <label id='top-text' htmlFor="name"><strong>First Name</strong></label>
                        <input id='formsInput' type="text" placeholder='Enter First Name' name='name' onChange={handleInput} />
                        {errors.name && <span className='text-danger'> {errors.name}</span>}
                    </div>

                    <div className='prompt'>
                        <label id='top-text' htmlFor="name"><strong>Last Name</strong></label>
                        <input id='formsInput' type="text" placeholder='Enter Last Name' name='name' onChange={handleInput} />
                        {errors.name && <span className='text-danger'> {errors.name}</span>}
                    </div>

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

                    <div className='prompt'>
                        <label id='top-text' htmlFor="password"><strong>Repeat Password</strong></label>
                        <input id='formsInput' type="password" placeholder='Re Enter Password' name='password' onChange={handleInput}/>
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>

                    <button id='colouredButton' type='submit' onClick={handleSubmit}>Next</button>
                </form>
            </div>
    )
}

export default Signup
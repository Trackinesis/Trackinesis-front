import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import './Signup.css';
import '../../styles.css'
import BackButton from "../../components/backButton/BackButton";

function Signup() {

    const [valuesStepOne, setValues] = useState({
        name: '',
        surname: '',
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
        if (errors.name === "" && errors.email === "" && errors.password === "" && errors.surname === "" ) {
            axios.post('http://localhost:8081/signup', valuesStepOne)
                .then(res => {
                    localStorage.setItem('userId', res.data.id);
                    navigate('/signupsteptwo');
                })
                .catch(err => console.log(err));
        }
    };

    return (
            <div className='main-page p'>

                <Link to="/" id='backButton'> <BackButton/> </Link>

                <h2 className='main-page-header h2'>Sign Up</h2>

                <form action="" onSubmit={handleSubmit} className='p'>

                    <div className='prompt'>
                        <label id='top-text' htmlFor="name"><strong>First Name</strong></label>
                        <input id='signupForms' type="text" placeholder='Enter first name' name='name' onChange={handleInput} />
                        {errors.name && <span className='text-danger'> {errors.name}</span>}
                    </div>

                    <div className='prompt'>
                        <label id='top-text' htmlFor="surname"><strong>Last Name</strong></label>
                        <input id='signupForms' type="text" placeholder='Enter last name' name='surname' onChange={handleInput} />
                        {errors.surname && <span className='text-danger'> {errors.surname}</span>}
                    </div>

                    <div className='prompt'>
                        <label id='top-text' htmlFor="email"><strong>Email</strong></label>
                        <input id='signupForms' type="email" placeholder='Enter email' name='email' onChange={handleInput} />
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>

                    <div className='prompt'>
                        <label id='top-text' htmlFor="password"><strong>Password</strong></label>
                        <input id='signupForms' type="password" placeholder='Enter password' name='password' onChange={handleInput} />
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>

                    <div className='prompt'>
                        <label id='top-text' htmlFor="password"><strong>Repeat Password</strong></label>
                        <input id='signupForms' type="password" placeholder='Repeat password' name='password' onChange={handleInput}/>
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>

                    <button id='defaultButton' type='submit' onClick={handleSubmit}>Next step!</button>
                </form>
            </div>
    )
}

export default Signup
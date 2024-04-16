import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupStepTwoValidation';
import axios from 'axios';

function SignupStepTwo() {

    const [valuesStepTwo, setValues] = useState({
        age: '',
        weight: '',
        height: '',
        gender: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput =(event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(valuesStepTwo));
        const userId = localStorage.getItem('userId');
        if (errors.age === "" && errors.weight === "" && errors.height === "" && errors.gender === "" && userId) {
            axios.post('http://localhost:8081/signupsteptwo', {...valuesStepTwo, userId})
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className='signupPage'>
            <Link to="/signup" className="backButton"> Back</Link>
            <h2>Sign-Up</h2>
            <form action="" onSubmit={handleSubmit}>
            <div className='mb-3'>
                    <label htmlFor="age"><strong>Age</strong></label>
                    <input type="number" placeholder='Enter Age' name='age'
                        onChange={handleInput} className='form-control rounded 0' />
                    {errors.age && <span className='text-danger'> {errors.age}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="weight"><strong>Weight</strong></label>
                    <input type="number" placeholder='Enter Weight (kg)' name='weight'
                        onChange={handleInput} className='form-control rounded 0' />
                    {errors.weight && <span className='text-danger'> {errors.weight}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="height"><strong>Height</strong></label>
                    <input type="number" placeholder='Enter Height (cm)' name='height'
                        onChange={handleInput} className='form-control rounded 0' />
                    {errors.height && <span className='text-danger'> {errors.height}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="gender"><strong>Gender</strong></label>
                    <select name="gender" onChange={handleInput} className='form-control rounded-0'>
                        <option disabled selected value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <span className='text-danger'> {errors.gender}</span>}
                </div>
                <p>By clicking here you agree with our terms of service.</p>
                <button type='submit' onClick={handleSubmit} className='btn btn-success w-100 rounded-0'>Join the Club!</button>
            </form>
        </div>
    )
}

export default SignupStepTwo
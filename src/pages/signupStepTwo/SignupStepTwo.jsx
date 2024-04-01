import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupStepTwoValidation';
import axios from 'axios';

function SignupStepTwo() {
    const [valuesStepTwo, setValues] = useState({
        age: '',
        weight: '',
        height: '',
        gender: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(valuesStepTwo);
        setErrors(validationErrors);

        if(errors.age === "" && errors.weight === "" && errors.height === "" && errors.gender === "") {
            axios.post('http://localhost:8081/signupsteptwo', valuesStepTwo)
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-4 rounded w-100'>
                <Link to="/signup" className='btn btn-default border w-20 bg-light rounded-0 text-decoration-none'>Back</Link>
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="age"><strong>Age</strong></label>
                        <input type="number" placeholder='Enter Age' name='age' value={valuesStepTwo.age}
                               onChange={handleInput} className='form-control rounded 0' />
                        {errors.age && <span className='text-danger'> {errors.age}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="weight"><strong>Weight</strong></label>
                        <input type="number" placeholder='Enter Weight (kg)' name='weight' value={valuesStepTwo.weight}
                               onChange={handleInput} className='form-control rounded 0' />
                        {errors.weight && <span className='text-danger'> {errors.weight}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="height"><strong>Height</strong></label>
                        <input type="number" placeholder='Enter Height (cm)' name='height' value={valuesStepTwo.height}
                               onChange={handleInput} className='form-control rounded 0' />
                        {errors.height && <span className='text-danger'> {errors.height}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="gender"><strong>Gender</strong></label>
                        <select name="gender" value={valuesStepTwo.gender} onChange={handleInput} className='form-control rounded-0'>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <span className='text-danger'> {errors.gender}</span>}
                    </div>
                    <p>By clicking here you agree with our terms of service.</p>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Join the Club!</button>
                </form>
            </div>
        </div>
    );
}

export default SignupStepTwo;
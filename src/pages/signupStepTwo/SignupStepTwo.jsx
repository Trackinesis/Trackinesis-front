import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import Validation from './SignupStepTwoValidation';
import axios from 'axios';
import '../../styles.css'
//import './SignupStepTwo.css'

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
        <div className='main-page p'>
            <h2 className='main-page-header'>Sign-Up</h2>

            <form action="" onSubmit={handleSubmit}>

                <div className='prompt'>
                    <label id='top-text' htmlFor="age"><strong>Age</strong></label>
                    <input type="number" placeholder='Enter Age' name='age'
                           onChange={handleInput} id='signupForms'/>
                    {errors.age && <span className='text-danger'> {errors.age}</span>}
                </div>
                <div className='prompt'>
                    <label id='top-text' htmlFor="weight"><strong>Weight</strong></label>
                    <input type="number" placeholder='Enter Weight (kg)' name='weight'
                           onChange={handleInput} id='signupForms'/>
                    {errors.weight && <span className='text-danger'> {errors.weight}</span>}
                </div>
                <div className='prompt'>
                    <label id='top-text' htmlFor="height"><strong>Height</strong></label>
                    <input type="number" placeholder='Enter Height (cm)' name='height'
                           onChange={handleInput} id='signupForms'/>
                    {errors.height && <span className='text-danger'> {errors.height}</span>}
                </div>

                <div className='mb-3'>
                    <label id='top-text' htmlFor="gender"><strong>Gender</strong></label>
                    <select name="gender" onChange={handleInput} id='signupForms'>
                        <option disabled selected value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <span className='text-danger'> {errors.gender}</span>}
                </div>
                <p>By clicking here you agree with our terms of service.</p>
                <button type='submit' onClick={handleSubmit} id='defaultButton'>Join the
                    Club!
                </button>
            </form>
        </div>
    )
}

export default SignupStepTwo
import React, {useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import './SetsAndRepetitionsEx.css'
import '../../styles.css'
import Validation from "../signupStepTwo/SignupStepTwoValidation";
import axios from "axios";
import SetsAndRepetitionsExValidation from "./SetsAndRepetitionsExValidation";

function SetsAndRepetitionsEx(){

    const [valuesSetsAndRepetitionsEx, setValues] = useState({
        sets: '',
        repetitions: '',
        weight: '',
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput =(event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleSubmit =(event) => {
        event.preventDefault();
        setErrors(SetsAndRepetitionsExValidation(SetsAndRepetitionsEx));
        if (errors.sets === "" && errors.repetitions === "" && errors.weight === "") {
            axios.post('http://localhost:8081/¿?', SetsAndRepetitionsEx)   // TODO ¿? = falta la URL para el post
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className='main-page'>
            <h2 id='topTitle'>Add new exercise with sets and repetitions</h2>

            <form action="" onSubmit={handleSubmit}>

            <div className='prompt'>
                <label id='top-text' htmlFor="quantity of sets"><strong>Quantity of sets:</strong></label>
                <input id='formsInput' type="number" min='0' placeholder='Quantity of sets:' name='sets'
                       onChange={handleInput} className='form-control rounded 0'/>
                {errors.sets && <span className='text-danger'> {errors.sets}</span>}

            </div>

            <div className='prompt'>
                <label id='top-text' htmlFor="quantity of repetitions"><strong>Quantity of repetitions:</strong></label>
                <input id='formsInput' type="quantity of repetitions" placeholder='Quantity of repetitions:' name='quantity of repetitions' />
            </div>

            <div className='prompt'>
                <label id='top-text' htmlFor="weight"><strong>Weight (including bar):</strong></label>
                <input id='formsInput' type="weight" placeholder='Weight (including bar):' name='weight' />
            </div>

            </form>
        </div>

    );

}

export default SetsAndRepetitionsEx;
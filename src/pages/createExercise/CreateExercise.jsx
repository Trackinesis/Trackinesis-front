import React, { useState } from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import axios from 'axios';
import './CreateExercise.css';
import '../../styles.css';
import BackButton from "../../components/backButton/BackButton";

function CreateExercise() {
    const navigate = useNavigate();
    const location = useLocation();
    const routineId = location.state?.routineId || '';

    const [errors, setErrors] = useState('');
    const [valuesExercise, setValuesExercise] = useState({
        name: '',
        type: '',
        description: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSubmitNewExercise = async (event) => {
        event.preventDefault();

        if (!valuesExercise.name || !valuesExercise.type || !valuesExercise.description) {
            setErrors('Please fill in all fields');
            return;
        }

        const formData = new FormData();
        formData.append('name', valuesExercise.name);
        formData.append('type', valuesExercise.type);
        formData.append('description', valuesExercise.description);
        if (valuesExercise.image) {
            formData.append('file', valuesExercise.image); // Add the image file to form data
        }

        try {
            const response = await axios.post('http://localhost:8081/exercise', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure the content type is for file uploads
                },
            });
            navigate('/routineslisted');
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data?.message || 'An error occurred while creating the exercise.');
        }
    };

    const handleInput = (event) => {
        setValuesExercise(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setValuesExercise(prev => ({ ...prev, image: file })); // Save the file object
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result); // Set image preview for display
        };
        if (file) {
            reader.readAsDataURL(file); // Convert the image file to base64 for preview
        }
    };

    return (
        <div className='main-page p'>
            <button onClick={handleGoBack} id='backButton'>
                <BackButton/>
            </button>


            <h2 className='main-page-header'>Create a new exercise!</h2>


            <form onSubmit={handleSubmitNewExercise}>
                <div className='prompt'>
                    <label id='top-text' htmlFor="name"><strong>Exercise name:</strong></label>
                    <input id='signupForms' type="text" placeholder='Enter Exercise name:'
                           name='name' onChange={handleInput} />
                </div>
                <div className='prompt'>
                    <label id='top-text' htmlFor="type"><strong>Exercise type:</strong></label>
                    <select name="type" onChange={handleInput} id='signupForms'>
                        <option disabled selected value="">Select Type</option>
                        <option value="hypertrophy">Hypertrophy</option>
                        <option value="strength">Strength</option>
                        <option value="endurance">Endurance</option>
                    </select>
                    {errors.type && <span className='text-danger'> {errors.type}</span>}
                </div>
                <div className='prompt'>
                    <label id='top-text' htmlFor="description"><strong>Description:</strong></label>
                    <input id='signupForms' type="text" placeholder='Enter Exercise description:'
                           name='description' onChange={handleInput} />
                </div>
                <div className='prompt'>
                    <label id='top-text' htmlFor="image"><strong>Upload Image:</strong></label>
                    <input id='signupForms' type="file" accept="image/*" name='image' onChange={handleFileChange} />
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ marginTop: '10px', maxWidth: '100px' }} />}
                </div>
                {errors && <div className="text-danger">{errors}</div>}
                <button id='colouredButton' type='submit'>Save</button>
            </form>
        </div>
    );
}

export default CreateExercise;

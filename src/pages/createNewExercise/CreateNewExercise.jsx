import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import './CreateNewExercise.css'
import '../../styles.css'

const excersiceType = [
{value: 'sets', label: 'Exercise with Sets' },
{value: 'time', label: 'Exercise with Time' },
];

function CreateNewExercise(){
    const [exerciseType, setExerciseType] = useState(null);

    const handleExerciseTypeChange = (value) => {
        setExerciseType(value);
    }

    return (
        <div className='main-page'>
            <h2 id='topTitle'>Create New Exercise</h2>

            <div className='prompt'>
                <label id='top-text' htmlFor="exercise name"><strong>Exercise name:</strong></label>
                <input id='formsInput' type="exercise name" placeholder='Enter exercise name:' name='exercise name' />
            </div>

            <div className='prompt'>
                <label id='top-text' htmlFor="exercise description"><strong>Exercise description (optional):</strong></label>
                <input id='formsInput' type="exercise description" placeholder='Enter exercise description (optional):' name='exercise description' />
            </div>

            <DropdownButton
                placeholder='Select exercise type'
                options={excersiceType}
                onChange={handleExerciseTypeChange}
            />

            {/*que mostrar si el tipo es sets*/}
            {exerciseType === 'sets' && (
                <>
                    <div className='prompt'>
                        <label id='top-text' htmlFor="sets"><strong>Sets:</strong></label>
                        <input id='formsInput' type="number" placeholder='Enter number of sets:' name='sets'/>
                    </div>

                    <div className='prompt'>
                        <label id='top-text' htmlFor="reps"><strong>Reps per Set:</strong></label>
                        <input id='formsInput' type="number" placeholder='Enter reps per set:' name='reps'/>
                    </div>
                </>
            )}

            {exerciseType === 'time' && (
                <div className='prompt'>
                    <label id='top-text' htmlFor="duration"><strong>Duration (in minutes):</strong></label>
                    <input id='formsInput' type="number" placeholder='Enter duration in minutes:' name='duration'/>
                </div>
            )}

            <div className='prompt'>
                <button id='createExerciste'>Create exercise</button>
            </div>

        </div>

    );

}

function DropdownButton({placeholder, options}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown-container">
            <button onClick={toggleDropdown}>
                {isOpen ? 'Close' : placeholder}
            </button>
            {isOpen && <DropdownList options={options}/>}
        </div>
    );
}

const DropdownList = ({ options }) => {
    return (
        <ul className="dropdown-list">
            {options.map((option, index) => (
                <li key={index}>
                    <button onClick={() => option.onClick(option.value)}>{option.label}</button>
                </li>
            ))}
        </ul>
    );
};

export default CreateNewExercise;
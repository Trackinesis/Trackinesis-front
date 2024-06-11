import React, {useEffect, useState} from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import '../../styles.css';



function Stats() {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [data, setData] = useState({
        userId: [],
        date: [],
        bench: [],
        squat: [],
        deadLift: [],
        strengthRatio: []
    });

    const getData = (dataType) => {
        axios.get(`http://localhost:8081/user/${userId}/${dataType}`)
            .then((res) => {
                setData(prevState => ({...prevState, [dataType]: res.data}));
            })
            .catch((err) => {
                console.error('Error getting data:', err);
            });
    }
    useEffect(() => {
        getData('date');
        getData('bench');
        getData('squat');
        getData('deadLift');
        getData('strengthRatio');
    }, []);

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='main-page'>
            <button onClick={handleGoBack} id='backButton'>Back</button>
            <h2 className='main-page-header'>Statistics</h2>

            <BarChart
                xAxis={[{ scaleType: 'band', data: data.date}]}
                series={[
                    {label: 'Bench', data: data.bench},
                    {label: 'Squat', data: data.squat},
                    {label: 'DeadLift', data: data.deadLift},
                    {label: 'StrengthRatio', data: data.strengthRatio},
                ]}
                width={400}
                height={300}
            />
        </div>
    )
}

export default Stats;
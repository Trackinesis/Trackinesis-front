import React, {useEffect, useState} from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import '../../styles.css';

function Stats() {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [data, setData] = useState({
        dates: [],
        maxBench: [],
        maxSquat: [],
        maxDeadLift: [],
        strengthRatio: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/userHistory/graph/${userId}`);
                const userHistory = res.data.userHistory;

                const dates = userHistory.map(record => record.date);
                const maxBench = userHistory.map(record => record.maxBench);
                const maxSquat = userHistory.map(record => record.maxSquat);
                const maxDeadLift = userHistory.map(record => record.maxDeadLift);
                const strengthRatio = userHistory.map(record => record.strengthRatio);

                setData({ dates, maxBench, maxSquat, maxDeadLift, strengthRatio });
            } catch (err) {
                console.error('Error getting data:', err);
            }
        };

        fetchData();
    }, [userId]);

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='main-page'>
            <button onClick={handleGoBack} id='backButton'>Back</button>
            <h2 className='main-page-header'>Statistics</h2>

            <LineChart
                xAxis = {[{ scaleType: 'band', data: data.dates }]}
                series = {[
                    { label: 'Bench', data: data.maxBench },
                    { label: 'Squat', data: data.maxSquat },
                    { label: 'DeadLift', data: data.maxDeadLift },
                    { label: 'StrengthRatio', data: data.strengthRatio },
                ]}
                width={600}
                height={400}
            />
        </div>
    )
}

export default Stats;
import React, {useEffect, useState} from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import '../../styles.css';
import BackButton from "../../components/backButton/BackButton";
import './stats.css'
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/userHistory/graph/${userId}`);
                const userHistory = res.data.userHistory;

                const dates = userHistory.map(record => formatDate(record.date) );
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

    return (
        <div className='main-page p'>
            <Link to="/historicaltracking" id='backButton'> <BackButton/> </Link>
            <h1 className='main-page-header'>Statistics</h1>

            <LineChart
                xAxis = {[{ scaleType: 'band', data: data.dates }]}
                series = {[
                    { label: 'Bench', data: data.maxBench },
                    { label: 'Squat', data: data.maxSquat },
                    { label: 'DeadLift', data: data.maxDeadLift },
                    { label: 'StrengthRatio', data: data.strengthRatio },
                ]}
                width={400}
                height={400}
            />

            <FooterNavigation/>
        </div>
    )
}

export default Stats;
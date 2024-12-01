import React from 'react';
import { Link } from 'react-router-dom';
import './footerNavigation.css';
import { IoReaderOutline } from "react-icons/io5";
import { FaClockRotateLeft } from "react-icons/fa6";

const FooterNavigation = () => {
    return (
        <div className="button-container">
            <Link to='/home' className="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                     stroke="#FFFEFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-house">
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
                    <path
                        d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
            </Link>
            <div className="divider"></div>
            <Link to='/planslisted' className="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                     stroke="#FFFEFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-notebook-text">
                    <path d="M2 6h4"/>
                    <path d="M2 10h4"/>
                    <path d="M2 14h4"/>
                    <path d="M2 18h4"/>
                    <rect width="16" height="20" x="4" y="2" rx="2"/>
                    <path d="M9.5 8h5"/>
                    <path d="M9.5 12H16"/>
                    <path d="M9.5 16H14"/>
                </svg>
            </Link>
            <div className="divider"></div>
            <Link to='/routineslisted' className="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                     stroke="#FFFEFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-dumbbell">
                    <path d="M14.4 14.4 9.6 9.6"/>
                    <path
                        d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"/>
                    <path d="m21.5 21.5-1.4-1.4"/>
                    <path d="M3.9 3.9 2.5 2.5"/>
                    <path
                        d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"/>
                </svg>
            </Link>
            <div className="divider"></div>
            <Link to='/social' className="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                     stroke="#FFFEFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-users-round">
                    <path d="M18 21a8 8 0 0 0-16 0"/>
                    <circle cx="10" cy="8" r="5"/>
                    <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/>
                </svg>
            </Link>
        </div>
    );
};

export default FooterNavigation;

import React from 'react';
import { Link } from 'react-router-dom';
import './footerNavigation.css';
import { IoReaderOutline } from "react-icons/io5";
import { FaClockRotateLeft } from "react-icons/fa6";

const FooterNavigation = () => {
    return (
        <div className="button-container">
            <Link to='/planslisted' className="button">
                <IoReaderOutline style={{ color: 'white', fontSize: '24px' }} />
            </Link>
            <div className="divider"></div> {/* Línea divisoria */}
            <Link to='/routineslisted' className="button">
                <FaClockRotateLeft style={{ color: 'white', fontSize: '24px' }} />
            </Link>
            <div className="divider"></div> {/* Línea divisoria */}
            <Link to='/social' className="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="0" fill="currentColor" stroke="currentColor" style={{ color: 'white', fontSize: '20px' }}>
                    <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
                </svg>
            </Link>
        </div>
    );
};

export default FooterNavigation;

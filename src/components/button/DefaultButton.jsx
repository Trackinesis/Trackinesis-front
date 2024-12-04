import React from 'react';
import './defaultButton.css';

const DefaultButton = ({ children, ...props }) => {
    return (
        <button className="button" {...props}>
            <span>{children}</span>
        </button>
    );
};

export default DefaultButton;
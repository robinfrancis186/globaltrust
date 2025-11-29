import React from 'react';
import './ShinyButton.css';

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const ShinyButton: React.FC<ShinyButtonProps> = ({ children, className = '', ...props }) => {
    return (
        <button className={`shiny-cta ${className}`} {...props}>
            <span>{children}</span>
        </button>
    );
};

export default ShinyButton;

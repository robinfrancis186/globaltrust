import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = true }) => {
    return (
        <div
            className={`
        glass p-6 rounded-2xl 
        ${hoverEffect ? 'glass-hover cursor-pointer' : ''} 
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default GlassCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import styles from './HomeButton.module.css';

export default function HomeButton({ className }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <button
            className={`${styles.homeButton} ${className || ''}`}
            onClick={handleClick}
            aria-label="Go to Home"
        >
            <Home size={24} />
        </button>
    );
}

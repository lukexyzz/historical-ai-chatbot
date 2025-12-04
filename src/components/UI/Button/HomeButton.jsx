import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import styles from './HomeButton.module.css';

/**
 * A button component that navigates to the home page.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Optional additional CSS classes.
 * @returns {JSX.Element} The rendered home button.
 */
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

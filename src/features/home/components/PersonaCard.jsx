import React from 'react';
import styles from './PersonaCard.module.css';

/**
 * A card component displaying persona information and a chat button.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.persona - The persona object to display.
 * @param {string} props.persona.id - The unique identifier for the persona.
 * @param {string} props.persona.name - The name of the persona.
 * @param {string} props.persona.description - The description of the persona.
 * @param {Function} props.onClick - Callback function when the card is clicked.
 * @returns {JSX.Element} The rendered persona card.
 */
export default function PersonaCard({ persona, onClick }) {
    return (
        <div
            className={styles.personaCard}
            onClick={onClick}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            <div className={styles.personaInfo}>
                <h2>{persona.name}</h2>
                <p>{persona.description}</p>
                <span className={styles.chatButton}>Chat Now</span>
            </div>
        </div>
    );
}

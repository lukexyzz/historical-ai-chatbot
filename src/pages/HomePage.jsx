import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { personas } from '../data/personas';

export default function Home() {
    const navigate = useNavigate();

    const handlePersonaClick = (persona) => {
        navigate('/chat', { state: { persona } });
    };

    return (
        <div className={styles.homeContainer}>
            <h1>Choose Your Ancient Guide</h1>
            <div className={styles.personasGrid}>
                {personas.map((persona) => (
                    <div
                        key={persona.id}
                        className={styles.personaCard}
                        onClick={() => handlePersonaClick(persona)}
                        role="button"
                        tabIndex="0"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handlePersonaClick(persona);
                            }
                        }}
                    >
                        <div className={styles.personaInfo}>
                            <h2>{persona.name}</h2>
                            <p>{persona.description}</p>
                            <span className={styles.chatButton}>Chat Now</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

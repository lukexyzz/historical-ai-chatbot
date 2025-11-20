import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const personas = [
    {
        id: 'cleopatra',
        name: 'Cleopatra',
        description: 'The last active ruler of the Ptolemaic Kingdom of Egypt.'
    },
    {
        id: 'ramesses',
        name: 'Ramesses II',
        description: 'The third pharaoh of the Nineteenth Dynasty of Egypt.'
    },
    {
        id: 'tutankhamun',
        name: 'Tutankhamun',
        description: 'The ancient Egyptian pharaoh who was the last of his royal family.'
    }
];

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
                    <div key={persona.id} className={styles.personaCard} onClick={() => handlePersonaClick(persona)}>
                        <div className={styles.personaInfo}>
                            <h2>{persona.name}</h2>
                            <p>{persona.description}</p>
                            <button className={styles.chatButton}>Chat Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

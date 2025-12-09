import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { personas } from '../data/personas';
import PersonaCard from '../features/home/components/PersonaCard';

/**
 * The Home page component where users can select a persona to chat with.
 * 
 * @component
 * @returns {JSX.Element} The rendered home page.
 */
export default function Home() {
    const navigate = useNavigate();

    const handlePersonaClick = (persona) => {
        navigate('/chat', { state: { persona } });
    };

    return (
        <main className={styles.homeContainer}>
            <h1>Choose Your Ancient Guide</h1>
            <section className={styles.personasGrid}>
                {personas.map((persona) => (
                    <PersonaCard
                        key={persona.id}
                        persona={persona}
                        onClick={() => handlePersonaClick(persona)}
                    />
                ))}
            </section>
        </main>
    );
}

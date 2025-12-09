import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { personas } from '../data/personas';
import PersonaCard from '../features/home/components/PersonaCard';
import Grid from '../components/UI/Grid/Grid';

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
            <Grid
                items={personas}
                renderItem={(persona) => (
                    <PersonaCard
                        key={persona.id}
                        persona={persona}
                        onClick={() => handlePersonaClick(persona)}
                    />
                )}
                emptyState={<p>No personas available at the moment.</p>}
            />
        </main>
    );
}

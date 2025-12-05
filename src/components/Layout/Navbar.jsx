import { Menu, Feather } from 'lucide-react';
import styles from './Navbar.module.css';
import HomeButton from '../UI/Button/HomeButton.jsx';

/**
 * The navigation bar component displayed at the top of the chat interface.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onMenuClick - Callback function to handle menu button clicks (e.g., to open sidebar).
 * @param {string} props.personaName - The name of the current persona.
 * @returns {JSX.Element} The rendered navbar.
 */
export default function Navbar({ onMenuClick, personaName }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>

        <div className={styles.iconGroup}>
          <button className={styles.navButton} onClick={onMenuClick} aria-label="Open menu">
            <Menu size={28} />
          </button>
        </div>

        <div>
          <h1 className={styles.title}>
            Talk with {personaName || '...'}
          </h1>
        </div>

        <div className={styles.iconGroup}>
          <Feather size={26} />
          <HomeButton />
        </div>

      </div>
    </nav>
  );
}
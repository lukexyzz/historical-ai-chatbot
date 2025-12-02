import { Menu, Feather } from 'lucide-react';
import styles from './Navbar.module.css';
import HomeButton from '../Chat/HomeButton.jsx';

import LangDropdown from './LangDropdown';

/**
 * The navigation bar component displayed at the top of the chat interface.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onMenuClick - Callback function to handle menu button clicks (e.g., to open sidebar).
 * @param {string} props.personaName - The name of the current persona.
 * @param {string} props.language - The current language code.
 * @param {Function} props.setLanguage - State setter for updating the language.
 * @returns {JSX.Element} The rendered navbar.
 */
export default function Navbar({ onMenuClick, personaName, language, setLanguage }) {
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
          <LangDropdown language={language} setLanguage={setLanguage} />
          <Feather size={26} />
          <HomeButton />
        </div>

      </div>
    </nav>
  );
}
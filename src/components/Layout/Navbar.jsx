import { Menu, Feather } from 'lucide-react';
import styles from './Navbar.module.css';
import HomeButton from '../Chat/HomeButton.jsx';

import LangDropdown from './LangDropdown';

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
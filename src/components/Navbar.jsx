import { Menu, Feather} from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        
        <div className={styles.iconGroup}>
          <button className={styles.navButton}>
            <Menu size={28} />
          </button>
        </div>

        <div>
          <h1 className={styles.title}>
            The Historian
          </h1>
        </div>

        <div className={styles.iconGroup}>
          <Feather size={26} />
        </div>
        
      </div>
    </nav>
  );
}
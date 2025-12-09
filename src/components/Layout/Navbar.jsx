import { Menu, Feather } from "lucide-react";
import styles from "./Navbar.module.css";
import HomeButton from "../UI/Button/HomeButton.jsx";
import { useSidebar } from "../../context/SidebarContext";

/**
 * The navigation bar component displayed at the top of the chat interface.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.personaName - The name of the current persona.
 * @returns {JSX.Element} The rendered navbar.
 */
export default function Navbar({ personaName }) {
  const { openSidebar } = useSidebar();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.iconGroup}>
          <button
            className={styles.navButton}
            onClick={openSidebar}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>

        <div>
          <h1 className={styles.title}>Talk with {personaName || "..."}</h1>
        </div>

        <div className={styles.iconGroup}>
          <HomeButton />
        </div>
      </div>
    </nav>
  );
}

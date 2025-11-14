import styles from './Sidebar.module.css';

export default function Sidebar({ isOpen, onClose }) {
  const sidebarClasses = [
    styles.sidebar,
    isOpen ? styles.open : ''
  ].join(' ');

  return (
    <>
      <div className={sidebarClasses}>
        <div className={styles.sidebarHeader}>
          <h3>Previous Chats</h3>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <ul className={styles.chatList}>
          <li>Chat with Herodotus</li>
          <li>Thoughts on the Peloponnesian War</li>
          <li>Roman Republic vs. Empire</li>
        </ul>
      </div>
    </>
  );
}
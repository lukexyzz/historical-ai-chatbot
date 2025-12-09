import styles from './Sidebar.module.css';
import DeleteButton from '../UI/Button/DeleteButton.jsx';
import { handleKeyboardEvent } from '../../utils/accessibility';
import { useSidebar } from '../../context/SidebarContext';

/**
 * The sidebar component that displays previous chat history.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onChatClick - Callback function when a chat item is clicked.
 * @param {Array} props.chats - The list of chat history items.
 * @param {boolean} props.isLoading - Flag indicating if chats are loading.
 * @param {string|null} props.error - Error message if loading failed.
 * @param {Function} props.onDeleteChat - Callback function to delete a chat.
 * @returns {JSX.Element} The rendered sidebar.
 */
export default function Sidebar({
  onChatClick,
  chats = [],
  isLoading = false,
  error = null,
  onDeleteChat
}) {
  const { isOpen, closeSidebar } = useSidebar();

  const handleChatClick = (chat) => {
    if (onChatClick) {
      onChatClick(chat);
    }
    closeSidebar();
  };

  const sidebarClasses = [
    styles.sidebar,
    isOpen ? styles.open : ''
  ].join(' ');

  return (
    <aside className={sidebarClasses}>
      <header className={styles.sidebarHeader}>
        <h3>Previous Chats</h3>
        <button className={styles.closeButton} onClick={closeSidebar} aria-label="Close sidebar">
          &times;
        </button>
      </header>

      {isLoading && <p className={styles.statusMessage}>Loading previous chats...</p>}
      {error && <p className={styles.errorText}>{error}</p>}
      {!isLoading && !error && chats.length === 0 && (
        <p className={styles.statusMessage}>No previous chats found.</p>
      )}

      {!isLoading && !error && chats.length > 0 && (
        <ul className={styles.chatList}>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={styles.chatItem}
              role="button"
              tabIndex="0"
              aria-label={`Load chat: ${chat.title}`}
            >
              <span
                className={styles.chatTitle}
                onClick={() => handleChatClick(chat)}
                onKeyDown={(e) => handleKeyboardEvent(e, () => handleChatClick(chat))}
              >
                {chat.title}
              </span>
              <DeleteButton
                onClick={() => onDeleteChat(chat.id)}
                chatTitle={chat.title}
              />
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
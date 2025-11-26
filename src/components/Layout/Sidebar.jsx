import { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import { fetchPreviousChats } from '../../utils/api';

export default function Sidebar({ isOpen, onClose, onChatClick }) {
  const [previousChats, setPreviousChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadChats = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchPreviousChats();
        setPreviousChats(data);
      } catch (err) {
        setError("Failed to load chats. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadChats();

  }, []);

  const sidebarClasses = [
    styles.sidebar,
    isOpen ? styles.open : ''
  ].join(' ');

  const handleChatClick = (chatId) => {
    if (onChatClick) {
      onChatClick(chatId);
    }
  };

  return (
    <>
      <div className={sidebarClasses}>
        <div className={styles.sidebarHeader}>
          <h3>Previous Chats</h3>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close sidebar">
            &times;
          </button>
        </div>
        <ul className={styles.chatList}>
          {isLoading && <li>Loading previous chats...</li>}
          {error && <li className={styles.errorText}>{error}</li>}
          {!isLoading && !error && previousChats.length === 0 && (
            <li>No previous chats found.</li>
          )}

          {!isLoading && !error && previousChats.map((chat) => (
            <li
              key={chat.id}
              className={styles.chatItem}
              onClick={() => handleChatClick(chat.id)}
              role="button"
              tabIndex="0"
              aria-label={`Load chat: ${chat.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleChatClick(chat.id);
                }
              }}
            >
              {chat.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
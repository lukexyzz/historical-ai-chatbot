import { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import { getChatHistory, deleteChatHistory } from '../../services/chatService';
import DeleteButton from '../UI/Button/DeleteButton.jsx';
import { handleKeyboardEvent } from '../../utils/accessibility';
import { useSidebar } from '../../context/SidebarContext';

/**
 * The sidebar component that displays previous chat history.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onChatClick - Callback function when a chat item is clicked.
 * @param {number} props.refreshTrigger - A dependency value to trigger a refresh of the chat list.
 * @returns {JSX.Element} The rendered sidebar.
 */
export default function Sidebar({ onChatClick, refreshTrigger }) {
  const { isOpen, closeSidebar } = useSidebar();
  const [previousChats, setPreviousChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadChats = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getChatHistory();
        setPreviousChats(data);
      } catch (err) {
        setError("Failed to load chats. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadChats();

  }, [refreshTrigger]);

  const handleChatClick = (chat) => {
    if (onChatClick) {
      onChatClick(chat);
    }
    closeSidebar();
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteChatHistory(chatId);
      // Refresh the chat list by removing the deleted chat
      setPreviousChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    } catch (error) {
      console.error("Error deleting chat:", error);
      setError("Failed to delete chat. Please try again.");
    }
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
              onClick={() => handleDeleteChat(chat.id)}
              chatTitle={chat.title}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}
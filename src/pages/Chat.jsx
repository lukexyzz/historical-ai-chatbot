import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { savePreviousChat } from '../utils/api';
import Navbar from '../components/Layout/Navbar.jsx';
import Sidebar from '../components/Layout/Sidebar.jsx';
import styles from './Chat.module.css';
import ChatWindow from '../components/Chat/ChatWindow.jsx';
import { personas } from '../data/personas';

const PLACEMENT_TITLE = "Conversation History (Awaiting Title)";

/**
 * The main Chat page component that orchestrates the chat interface, sidebar, and navbar.
 * 
 * @component
 * @returns {JSX.Element|null} The rendered chat page or null if no persona is selected.
 */
export default function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [persona, setPersona] = useState(null);
  const [chat, setChat] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [language, setLanguage] = useState('English');
  const [refreshSidebarTrigger, setRefreshSidebarTrigger] = useState(0);

  useEffect(() => {
    if (location.state && location.state.persona) {
      setPersona(location.state.persona);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  const handleLoadChat = (chat) => {
    setPersona(personas.find(p => p.name === chat.personaName))
    setChat(chat);
    closeSidebar();
  };

  const handleSaveChat = async (currentMessages) => {
    setIsSaving(true);

    const dataToSave = {
      title: PLACEMENT_TITLE,
      personaName: persona.name,
      messages: currentMessages,
    };

    try {
      await savePreviousChat(dataToSave);
      console.log('Chat saved successfully!');

      setRefreshSidebarTrigger(prev => prev + 1);

    } catch (error) {
      console.error("Error saving chat:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const mainContentClasses = [
    styles.mainContent,
    isSidebarOpen ? styles.shifted : ''
  ].join(' ');

  if (!persona) return null;

  return (
    <div className={styles.chatPageContainer}>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        onChatClick={handleLoadChat}
        refreshTrigger={refreshSidebarTrigger}
      />
      <div className={mainContentClasses}>
        <Navbar
          onMenuClick={openSidebar}
          personaName={persona.name}
          language={language}
          setLanguage={setLanguage}
        />

        <div className={styles.chatArea}>
          <ChatWindow
            chat={chat}
            setChat={setChat}
            onSaveChat={handleSaveChat}
            isSaving={isSaving}
            persona={persona}
            language={language}
          />
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { savePreviousChat } from '../utils/api';
import Navbar from '../components/Layout/Navbar.jsx';
import Sidebar from '../components/Layout/Sidebar.jsx';
import styles from './Chat.module.css';
import ChatWindow from '../components/Chat/ChatWindow.jsx';

const PLACEMENT_TITLE = "Conversation History (Awaiting Title)";

export default function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [persona, setPersona] = useState(null);
  const [currentPersonaName, setCurrentPersonaName] = useState('');

  useEffect(() => {
    if (location.state && location.state.persona) {
      setPersona(location.state.persona);
      setCurrentPersonaName(location.state.persona.name);
    } else {
      // Redirect to home if no persona selected
      navigate('/');
    }
  }, [location, navigate]);

  const [isSaving, setIsSaving] = useState(false);
  const [chatToLoadId, setChatToLoadId] = useState(null);
  const [language, setLanguage] = useState('English');

  const handleLoadChat = (chatId) => {
    setChatToLoadId(chatId);
    closeSidebar();
  };

  const handleHistoryChange = (history) => {
    // Extract persona name from the first API message
    const firstApiMessage = history.find(msg => msg.role === 'api');
    if (firstApiMessage && firstApiMessage.name) {
      setCurrentPersonaName(firstApiMessage.name);
    }
  };

  const handleSaveChat = async (currentMessages) => {
    setIsSaving(true);

    const dataToSave = {
      title: PLACEMENT_TITLE,
      personaName: currentPersonaName,
      messages: currentMessages,
    };

    try {
      await savePreviousChat(dataToSave);
      console.log('Chat saved successfully!');
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

  if (!persona) return null; // or a loading spinner

  return (
    <div className={styles.chatPageContainer}>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        onChatClick={handleLoadChat}
      />
      <div className={mainContentClasses}>
        <Navbar
          onMenuClick={openSidebar}
          personaName={currentPersonaName}
          language={language}
          setLanguage={setLanguage}
        />

        <div className={styles.chatArea}>
          <ChatWindow
            chatToLoadId={chatToLoadId}
            setChatToLoadId={setChatToLoadId}
            onSaveChat={handleSaveChat}
            isSaving={isSaving}
            persona={persona}
            language={language}
            onHistoryChange={handleHistoryChange}
          />
        </div>
      </div>
    </div>
  );
}
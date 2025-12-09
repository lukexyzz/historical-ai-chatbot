import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { createChatHistory, getChatHistoryById } from '../services/chatService';
import Navbar from '../components/Layout/Navbar.jsx';
import Sidebar from '../components/Layout/Sidebar.jsx';
import styles from './Chat.module.css';
import ChatWindow from '../features/chat/components/ChatWindow.jsx';
import { personas } from '../data/personas';

/**
 * The main Chat page component that orchestrates the chat interface, sidebar, and navbar.
 * 
 * @component
 * @returns {JSX.Element|null} The rendered chat page or null if no persona is selected.
 */
export default function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { personaId } = useParams();
  const [persona, setPersona] = useState(null);
  const [chat, setChat] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [refreshSidebarTrigger, setRefreshSidebarTrigger] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get('chatId');

  useEffect(() => {
    const foundPersona = personas.find(p => p.id === personaId);

    if (foundPersona) {
      setPersona(foundPersona);

      const loadChat = async () => {
        if (chatId) {
          try {
            const loadedChat = await getChatHistoryById(chatId);
            setChat(loadedChat);
          } catch (error) {
            console.error("Failed to load chat:", error);
            // Optionally clear the invalid chatId from URL or show error
            setChat(null);
          }
        } else {
          setChat(null);
        }
      };

      loadChat();
    } else {
      // Invalid persona ID, redirect to home
      navigate('/');
    }
  }, [personaId, chatId, navigate]);

  const handleLoadChat = (chat) => {
    const targetPersona = personas.find(p => p.name === chat.personaName);
    if (targetPersona) {
      // Navigate to the persona's URL with chatId query param
      navigate(`/chat/${targetPersona.id}?chatId=${chat.id}`);
    }
    closeSidebar();
  };

  const handleSaveChat = async (currentMessages) => {
    setIsSaving(true);

    const dataToSave = {
      title: chat?.title || null,
      personaName: persona.name,
      messages: currentMessages,
    };

    try {
      await createChatHistory(dataToSave);
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
      <main className={mainContentClasses}>
        <Navbar
          onMenuClick={openSidebar}
          personaName={persona.name}
        />

        <section className={styles.chatArea}>
          <ChatWindow
            chat={chat}
            setChat={setChat}
            onSaveChat={handleSaveChat}
            isSaving={isSaving}
            persona={persona}
          />
        </section>
      </main>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar.jsx';
import Sidebar from '../components/Layout/Sidebar.jsx';
import styles from './Chat.module.css';
import ChatWindow from '../components/Chat/ChatWindow.jsx';

export default function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [persona, setPersona] = useState(null);

  useEffect(() => {
    if (location.state && location.state.persona) {
      setPersona(location.state.persona);
    } else {
      // Redirect to home if no persona selected
      navigate('/');
    }
  }, [location, navigate]);

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
      />

      <div className={mainContentClasses}>
        <Navbar
          onMenuClick={openSidebar}
          persona={persona}
        />

        <div className={styles.chatArea}>
          <ChatWindow persona={persona} />
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import styles from './Chat.module.css'; 
import ChatWindow from '../components/ChatWindow.jsx';

export default function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const mainContentClasses = [
    styles.mainContent,
    isSidebarOpen ? styles.shifted : ''
  ].join(' ');

  return (
    <div className={styles.chatPageContainer}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar} 
      />
      
      <div className={mainContentClasses}>
        <Navbar 
          onMenuClick={openSidebar} 
        />
        
        <div className={styles.chatArea}>
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}
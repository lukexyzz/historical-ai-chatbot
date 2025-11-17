import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import styles from './Chat.module.css'; 

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
          <h1>Chat Window</h1>
          <p>Your messages will go here.</p>
          <p>Click the menu icon in the top left to see your chats!</p>
        </div>
      </div>
    </div>
  );
}
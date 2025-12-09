import { useSidebar } from '../../context/SidebarContext';
import Sidebar from './Sidebar';
import styles from '../../pages/Chat.module.css';

/**
 * A layout component for the Chat page that handles the sidebar and main content shifting.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The main content to render.
 * @param {Function} props.onChatClick - Callback for when a chat is clicked in the sidebar.
 * @param {number} props.refreshTrigger - Trigger to refresh sidebar content.
 * @returns {JSX.Element} The rendered layout.
 */
export default function ChatLayout({ children, onChatClick, refreshTrigger }) {
    const { isOpen } = useSidebar();

    const mainContentClasses = [
        styles.mainContent,
        isOpen ? styles.shifted : ''
    ].join(' ');

    return (
        <div className={styles.chatPageContainer}>
            <Sidebar
                onChatClick={onChatClick}
                refreshTrigger={refreshTrigger}
            />
            <main className={mainContentClasses}>
                {children}
            </main>
        </div>
    );
}

import styles from './DeleteButton.module.css';

export default function DeleteButton({ onClick, chatTitle }) {
    const handleClick = (e) => {
        e.stopPropagation(); // Prevent triggering the chat item click
        onClick();
    };

    return (
        <button
            className={styles.deleteButton}
            onClick={handleClick}
            aria-label={`Delete chat: ${chatTitle}`}
            title="Delete chat"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.deleteIcon}
            >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
        </button>
    );
}

import styles from './ChatMessage.module.css';

export default function ChatMessage({ msg }) {
    
    //Apply correct CSS class clearly
    const isUser = msg.role === 'user';
    
    const containerClass = isUser ? styles.userMessageContainer : styles.apiMessageContainer;
    const nameClass = isUser ? styles.userName : styles.apiName;
    const bubbleClass = isUser ? styles.userBubble : styles.apiBubble;
    const timestampClass = isUser ? styles.userTimestamp : styles.apiTimestamp;

    return (
        <div 
            className={`${styles.messageContainer} ${containerClass}`}
            role="status"
            aria-label={`${msg.name} sent: ${msg.text} at ${msg.timestamp}`}
        >
            <small className={nameClass}>
                {msg.name}
            </small>

            <div className={`${styles.messageBubble} ${bubbleClass}`}>
                {msg.text}
            </div>
            
            <small className={timestampClass}>
                {msg.timestamp}
            </small>
        </div>
    );
}
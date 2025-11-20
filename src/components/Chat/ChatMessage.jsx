import styles from './ChatMessage.module.css';
import ProfilePicture from "./ProfilePicture";
import cleopatra from "../../assets/cleopatra.svg";
import user from "../../assets/user.svg";

export default function ChatMessage({ msg }) {
    
    //Apply correct CSS class clearly
    const isUser = msg.role === 'user';
    
    const containerClass = isUser ? styles.userMessageContainer : styles.apiMessageContainer;
    const nameClass = isUser ? styles.userName : styles.apiName;
    const bubbleClass = isUser ? styles.userBubble : styles.apiBubble;
    const timestampClass = isUser ? styles.userTimestamp : styles.apiTimestamp;
    const alignClass = isUser ? styles.alignRight : styles.alignLeft; 

    return (
        <div 
            className={`${styles.messageContainer} ${containerClass}`}
            role="status"
            aria-label={`${msg.name} sent: ${msg.text} at ${msg.timestamp}`}
        >
            {!isUser && (
                <div className={styles.avatarWrapper}>
                    <ProfilePicture src={cleopatra} />
                </div>
            )}
            <div className={`${styles.textGroup} ${alignClass}`}>
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

            {isUser && (
                <div className={styles.avatarWrapper}>
                    <ProfilePicture src={user} />
                </div>
            )}
        </div>
    );
}

import styles from './ChatMessage.module.css';
import ProfilePicture from "./ProfilePicture";
import cleopatra from "../../../assets/icons/cleopatra.svg";
import ramessesII from "../../../assets/icons/ramesses-ii.svg";
import tutankhamun from "../../../assets/icons/tutankhamun.svg";
import user from "../../../assets/icons/user.svg";

const personaImages = {
    cleopatra: cleopatra,
    ramesses: ramessesII,
    tutankhamun: tutankhamun
};

export default function ChatMessage({ msg, persona }) {

    //Apply correct CSS class clearly
    const isUser = msg.role === 'user';

    const containerClass = isUser ? styles.userMessageContainer : styles.apiMessageContainer;
    const nameClass = isUser ? styles.userName : styles.apiName;
    const bubbleClass = isUser ? styles.userBubble : styles.apiBubble;
    const timestampClass = isUser ? styles.userTimestamp : styles.apiTimestamp;
    const alignClass = isUser ? styles.alignRight : styles.alignLeft;

    // Determine the image to use
    let avatarSrc = cleopatra; // Default
    if (!isUser && persona && personaImages[persona.id]) {
        avatarSrc = personaImages[persona.id];
    } else if (isUser) {
        avatarSrc = user;
    }

    return (
        <div
            className={`${styles.messageContainer} ${containerClass}`}
            role="status"
            aria-label={`${msg.name} sent: ${msg.text} at ${msg.timestamp}`}
        >
            {!isUser && (
                <div className={styles.avatarWrapper}>
                    <ProfilePicture src={avatarSrc} alt={persona ? persona.name : 'AI'} />
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
                    <ProfilePicture src={user} alt="User" />
                </div>
            )}
        </div>
    );
}
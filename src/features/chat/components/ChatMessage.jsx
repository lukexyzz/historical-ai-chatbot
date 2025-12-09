
import styles from './ChatMessage.module.css';
import ProfilePicture from "./ProfilePicture";
import cleopatra from "../../../assets/icons/cleopatra.svg";
import ramessesII from "../../../assets/icons/ramesses-ii.svg";
import tutankhamun from "../../../assets/icons/tutankhamun.svg";
import user from "../../../assets/icons/user.svg";

/**
 * Mapping of persona IDs to their respective image assets.
 * @type {Object.<string, string>}
 */
const personaImages = {
    cleopatra: cleopatra,
    ramesses: ramessesII,
    tutankhamun: tutankhamun
};

/**
 * A component that displays a single chat message.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.msg - The message object containing details about the chat message.
 * @param {string} props.msg.role - The role of the sender ('user' or 'model').
 * @param {string} props.msg.name - The display name of the sender.
 * @param {string} props.msg.text - The content of the message.
 * @param {string} props.msg.timestamp - The timestamp of when the message was sent.
 * @param {Object} [props.persona] - The persona object associated with the chat (if applicable).
 * @param {string} props.persona.id - The unique identifier for the persona.
 * @param {string} props.persona.name - The name of the persona.
 * @param {Function} [props.onSendOption] - Callback to send a message when an option is clicked.
 * @param {number} [props.messageIndex] - The index of the message in the chat history.
 * @returns {JSX.Element} The rendered chat message component.
 */
export default function ChatMessage({ msg, persona, onSendOption, messageIndex }) {

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

                {msg.options && msg.options.length > 0 && !msg.selectedOption && (
                    <div className={styles.optionsContainer}>
                        {msg.options.map((option, idx) => (
                            <button
                                key={idx}
                                className={styles.optionButton}
                                onClick={() => onSendOption(option, messageIndex)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}

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
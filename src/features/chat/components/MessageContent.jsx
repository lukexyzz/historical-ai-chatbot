import styles from "./ChatMessage.module.css";

/**
 * Displays the content of a chat message, including text, options, and timestamp.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.msg - The message object.
 * @param {string} props.msg.name - The name of the sender.
 * @param {string} props.msg.text - The message text.
 * @param {string[]} [props.msg.options] - Array of interactive option strings.
 * @param {string} [props.msg.selectedOption] - The option selected by the user, if any.
 * @param {string} props.msg.timestamp - The timestamp of the message.
 * @param {Function} props.onSendOption - Callback function when an option is clicked.
 * @param {number} props.messageIndex - The index of this message in the conversation.
 * @param {boolean} props.isUser - Whether the message is from the user.
 * @returns {JSX.Element} The rendered message content.
 */
export default function MessageContent({
    msg,
    onSendOption,
    messageIndex,
    isUser,
}) {
    const nameClass = isUser ? styles.userName : styles.apiName;
    const bubbleClass = isUser ? styles.userBubble : styles.apiBubble;
    const timestampClass = isUser ? styles.userTimestamp : styles.apiTimestamp;
    const alignClass = isUser ? styles.alignRight : styles.alignLeft;

    return (
        <div className={`${styles.textGroup} ${alignClass}`}>
            <small className={nameClass}>{msg.name}</small>

            <div className={`${styles.messageBubble} ${bubbleClass}`}>{msg.text}</div>

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

            <small className={timestampClass}>{msg.timestamp}</small>
        </div>
    );
}

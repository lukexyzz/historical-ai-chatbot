import styles from "./ChatMessage.module.css";

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

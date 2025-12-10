import styles from "./ChatMessage.module.css";
import MessageAvatar from "./MessageAvatar";
import MessageContent from "./MessageContent";

/**
 * A component that displays a single chat message.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.msg - The message object containing details about the chat message.
 * @param {Object} [props.persona] - The persona object associated with the chat (if applicable).
 * @param {Function} [props.onSendOption] - Callback to send a message when an option is clicked.
 * @param {number} [props.messageIndex] - The index of the message in the chat history.
 * @returns {JSX.Element} The rendered chat message component.
 */
export default function ChatMessage({
  msg,
  persona,
  onSendOption,
  messageIndex,
}) {
  const isUser = msg.role === "user";

  const containerClass = isUser
    ? styles.userMessageContainer
    : styles.apiMessageContainer;

  return (
    <article className={`${styles.messageContainer} ${containerClass}`}>
      <MessageAvatar isUser={isUser} persona={persona} />
      <MessageContent
        msg={msg}
        onSendOption={onSendOption}
        messageIndex={messageIndex}
        isUser={isUser}
      />
    </article>
  );
}

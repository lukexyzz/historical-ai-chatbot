import styles from "./ChatWindow.module.css";
import ChatMessage from "./ChatMessage";
import ChatHeader from "./ChatHeader";
import LoadingIndicator from "../../../components/UI/LoadingIndicator";
import useChatLogic from "../hooks/useChatLogic";

/**
 * The main chat window component that displays the conversation and input area.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.chat - The current chat object containing messages and metadata.
 * @param {Function} props.setChat - State setter for updating the chat object.
 * @param {Function} props.onSaveChat - Callback function to save the current chat session.
 * @param {boolean} [props.isSaving=false] - Flag indicating if the chat is currently being saved.
 * @param {Object} props.persona - The persona object the user is chatting with.
 * @returns {JSX.Element} The rendered chat window.
 */
export default function ChatWindow({
  chat,
  setChat,
  onSaveChat,
  isSaving = false,
  persona,
}) {
  const {
    input,
    isLoading,
    chatBodyRef,
    setInput,
    handleSendMessage,
    onSendOption,
  } = useChatLogic({ chat, setChat, persona });

  const handleEndSession = () => {
    onSaveChat(messages);
  };

  const messages = chat?.messages || [];

  const handleClearChat = () => {
    setChat((prevChat) => ({
      ...prevChat,
      messages: [],
      mode: null,
      dialogueTree: null,
    }));
  };

  const hasHistory = messages.length > 0;
  const canSave = hasHistory && !isSaving && !isLoading;
  const canClear = hasHistory && !isLoading;

  return (
    <section className={styles.chatContainer}>
      <ChatHeader
        chat={chat}
        onClearChat={handleClearChat}
        onSaveChat={handleEndSession}
        canClear={canClear}
        canSave={canSave}
        isSaving={isSaving}
      />

      <div id="chat-body" className={styles.chatBody} ref={chatBodyRef}>
        <div role="log" aria-live="assertive" aria-relevant="additions">
          {messages.length === 0 && (
            <p className={styles.chatPlaceholder}>
              Start the conversation with {persona?.name || "your companion"}!
            </p>
          )}

          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              msg={msg}
              persona={persona}
              onSendOption={onSendOption}
              messageIndex={index}
            />
          ))}
        </div>

        {isLoading && <LoadingIndicator persona={persona?.name} />}
      </div>

      <form onSubmit={handleSendMessage} className={styles.inputForm}>
        <div className={styles.inputWrapper}>
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isLoading ? "Waiting for response..." : "Type your message..."
            }
            disabled={isLoading}
            className={styles.inputField}
            aria-label="Message input"
            maxLength={2000}
          />
          <span className={styles.charCounter}>
            {input.length}/2000
          </span>
        </div>
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={styles.sendButton}
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </section>
  );
}

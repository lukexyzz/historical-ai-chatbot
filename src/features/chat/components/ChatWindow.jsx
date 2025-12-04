import styles from './ChatWindow.module.css';
import ChatMessage from './ChatMessage';
import LoadingIndicator from '../../../components/UI/LoadingIndicator';
import useChatLogic from '../hooks/useChatLogic';

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
 * @param {string} [props.language='en'] - The language code for the conversation.
 * @returns {JSX.Element} The rendered chat window.
 */
export default function ChatWindow({
    chat,
    setChat,
    onSaveChat,
    isSaving = false,
    persona,
    language = 'en'
}) {

    const {
        input,
        isLoading,
        chatBodyRef,
        setInput,
        handleSendMessage
    } = useChatLogic({ chat, setChat, persona, language });

    const messages = chat?.messages || [];

    const handleEndSession = () => {
        onSaveChat(messages);
    };

    const hasHistory = messages.length > 0;
    const canSave = hasHistory && !isSaving && !isLoading;

    return (
        <div className={styles.chatContainer}>

            <div className={styles.chatActions}>
                {chat?.mode && <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Mode: {chat.mode}</span>}
                <button
                    onClick={handleEndSession}
                    disabled={!canSave}
                    className={styles.saveButton}
                    aria-label="Save conversation history"
                >
                    {isSaving ? 'Saving...' : '💾 Save Conversation'}
                </button>
            </div>

            <div
                id='chat-body'
                className={styles.chatBody}
                ref={chatBodyRef}
                role="log"
            >
                {messages.length === 0 && (
                    <p className={styles.chatPlaceholder}>
                        Start the conversation with {persona?.name || 'your companion'}!
                    </p>
                )}

                {messages.map((msg, index) => (
                    <ChatMessage key={index} msg={msg} persona={persona} />
                ))}

                {isLoading && <LoadingIndicator persona={persona?.name} />}
            </div>

            <form onSubmit={handleSendMessage} className={styles.inputForm}>
                <input
                    id="chat-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isLoading ? "Waiting for response..." : "Type your message..."}
                    disabled={isLoading}
                    className={styles.inputField}
                    aria-label="Message input"
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className={styles.sendButton}
                    aria-label="Send message"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
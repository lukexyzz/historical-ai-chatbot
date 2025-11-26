import styles from './ChatWindow.module.css';
import ChatMessage from './ChatMessage';
import LoadingIndicator from './LoadingIndicator';
import useChatLogic from '../../hooks/useChatLogic';

export default function ChatWindow({ onSaveChat, isSaving, chatToLoadId, setChatToLoadId, persona, language }) {

    const {
        history,
        input,
        isLoading,
        chatBodyRef,
        setInput,
        handleSendMessage
    } = useChatLogic({ chatToLoadId, setChatToLoadId, persona, language });

    const handleEndSession = () => {
        onSaveChat(history);
    };

    const hasHistory = history.length > 0;
    const canSave = hasHistory && !isSaving && !isLoading;


    return (
        <div className={styles.chatContainer}>

            <div className={styles.chatActions}>
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
                {history.length === 0 && (
                    <p className={styles.chatPlaceholder}>
                        Start the conversation with {persona.name}!
                    </p>
                )}

                {history.map((msg, index) => (
                    <ChatMessage key={index} msg={msg} {persona} />
                ))}

                {isLoading && <LoadingIndicator persona={persona.name} />}
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
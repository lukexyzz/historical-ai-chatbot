import React from "react";
import styles from "./ChatHeader.module.css";

/**
 * The header component for the chat window, containing actions and mode display.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.chat - The current chat object.
 * @param {Function} props.onClearChat - Handler for clearing the chat.
 * @param {Function} props.onSaveChat - Handler for saving the chat.
 * @param {boolean} props.canClear - Whether the chat can be cleared.
 * @param {boolean} props.canSave - Whether the chat can be saved.
 * @param {boolean} props.isSaving - Whether the chat is currently saving.

 * @returns {JSX.Element} The rendered chat header.
 */
export default function ChatHeader({
    chat,
    onClearChat,
    onSaveChat,
    canClear,
    canSave,
    isSaving,
}) {
    const formatMode = (mode) => {
        if (!mode) return "";
        return mode
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <header className={styles.chatActions}>
            {chat?.mode && (
                <span className={styles.modeBadge}>Mode: {formatMode(chat.mode)}</span>
            )}

            <button
                onClick={onClearChat}
                disabled={!canClear}
                className={styles.clearButton}
                aria-label="Clear conversation"
            >
                🗑️ Clear Chat
            </button>
            <button
                onClick={onSaveChat}
                disabled={!canSave}
                className={styles.saveButton}
                aria-label="Save conversation history"
            >
                {isSaving ? "Saving..." : "💾 Save Conversation"}
            </button>
        </header>
    );
}

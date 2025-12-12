/**
 * src/services/historyService.js
 * Handles saving, loading, and deleting chat sessions from the server.
 */

const API_URL = import.meta.env.VITE_APP_API_URL;

/**
 * Fetches the list of previous chat sessions (with pagination).
 */
export const getChatHistory = async (page = 1, limit = 8) => {
    try {
        const response = await fetch(
            `${API_URL}/api/chat/history?page=${page}&limit=${limit}`
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (err) {
        console.error("Error fetching previous chats:", err);
        throw new Error("Failed to fetch chat list.");
    }
};

/**
 * Fetches a single chat session by its ID.
 */
export const getChatById = async (chatId) => {
    try {
        const response = await fetch(`${API_URL}/api/chat/history/${chatId}`);
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching chat ${chatId}:`, error);
        throw new Error("Failed to load conversation.");
    }
};

/**
 * Saves (Creates or Updates) the current chat session.
 * IMPORTANT: You must pass 'id' to update an existing chat.
 */
export const saveChat = async ({
    id,
    title,
    personaName,
    messages,
    dialogueTree,
    mode,
}) => {
    try {
        const response = await fetch(`${API_URL}/api/chat/history`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
                title,
                personaName,
                messages,
                dialogueTree,
                mode,
            }),
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Save chat API error:", error);
        throw new Error("Failed to save the chat session.");
    }
};

/**
 * Deletes a chat session by its ID.
 */
export const deleteChat = async (chatId) => {
    try {
        const response = await fetch(`${API_URL}/api/chat/history/${chatId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Delete chat API error:", error);
        throw new Error("Failed to delete the chat session");
    }
};
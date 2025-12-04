/**
* Sends a user message to the chat API and retrieves the response.
* 
* @async
* @param {string} userMessage - The message text sent by the user.
* @param {Object} persona - The persona object the user is chatting with.
* @param {string} persona.name - The name of the persona.
* @param {string} language - The language code (e.g., 'en') for the conversation.
* @returns {Promise<Object>} A promise that resolves to the API response data, including the reply and potentially detected language.
* @throws {Error} If the server responds with an error status.
*/
export const sendMessage = async (userMessage, persona, language, dialogueTree) => {
    try {
        const response = await fetch(import.meta.env.VITE_APP_API_URL + "/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: userMessage,
                personaName: persona.name,
                language: language,
                dialogueTree: dialogueTree
            }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        return data; // Return full data to access detectedLanguage if present

    } catch (error) {
        console.error("Fetch API error:", error);
        return { reply: "Sorry, I couldn't reach the server." };
    }
};

/**
 * Fetches the list of previous chat sessions from the server.
 * 
 * @async
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of previous chat session objects.
 * @throws {Error} If the fetch operation fails or the server returns an error.
 */
export const getChatHistory = async () => {
    try {

        const response = await fetch(import.meta.env.VITE_APP_API_URL + "/api/chat/history");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Error fetching previous chats:", err);
        throw new Error("Failed to fetch chat list from server.");
    }
};

/**
 * Saves the current chat session to the server.
 * 
 * @async
 * @param {Object} chatData - The chat data to save.
 * @param {string} chatData.title - The title of the chat session.
 * @param {string} chatData.personaName - The name of the persona involved in the chat.
 * @param {Array<Object>} chatData.messages - The array of message objects in the chat history.
 * @returns {Promise<Object>} A promise that resolves to the server response.
 * @throws {Error} If the save operation fails.
 */
export const createChatHistory = async ({ title, personaName, messages }) => {
    try {
        const response = await fetch(import.meta.env.VITE_APP_API_URL + "/api/chat/history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, personaName, messages }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Save chat API error:", error);
        throw new Error("Failed to save the chat session.");
    }
};

/**
 * Fetches a single chat session by its ID.
 * 
 * @async
 * @param {string|number} chatId - The unique identifier of the chat session.
 * @returns {Promise<Object>} A promise that resolves to the chat session data.
 * @throws {Error} If the fetch operation fails.
 */
export const getChatHistoryById = async (chatId) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/api/chat/history/${chatId}`
        );

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching chat ${chatId}:`, error);
        throw new Error("Failed to load conversation.");
    }
};

/**
 * Deletes a previous chat session by its ID.
 * 
 * @async
 * @param {string|number} chatId - The unique identifier of the chat session to delete.
 * @returns {Promise<Object>} A promise that resolves to the server response.
 * @throws {Error} If the delete operation fails.
 */
export const deleteChatHistory = async (chatId) => {
    try {

        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/chat/history/${chatId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Delete chat API error:", error);
        throw new Error("Failed to delete the chat session");
    }
};
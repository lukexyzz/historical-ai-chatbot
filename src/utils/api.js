export const postUserMessage = async (userMessage) => {
    try {
        const response = await fetch(import.meta.env.VITE_APP_API_URL + "/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        return data.reply;

    } catch (error) {
        console.error("Fetch API error:", error);
        return "Sorry, I couldn't reach the server.";
    }
};

export const fetchPreviousChats = async () => {
    try {

        const response = await fetch(import.meta.env.VITE_APP_API_URL + "/previous-chat");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Error fetching previous chats:", err);
        throw new Error("Failed to fetch chat list from server.");
    }
};

export const savePreviousChat = async ({ title, personaId, messages }) => {
    try {
        const response = await fetch(import.meta.env.VITE_APP_API_URL + "/chat/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, personaId, messages }),
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

export const fetchSingleChat = async (chatId) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/chat/${chatId}`
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
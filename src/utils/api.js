export const postUserMessage = async (userMessage) => {
    try {
        // Using envirnment variable for URL
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
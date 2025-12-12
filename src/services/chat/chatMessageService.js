/**
 * src/services/chat/chatMessageService.js
 * Handles sending messages to the AI and processing the immediate response.
 */

export const sendMessage = async (
  userMessage,
  persona,
  dialogueTree,
  history = [],
) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_APP_API_URL + "/api/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          personaName: persona.name,
          treeState: dialogueTree,
          history,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch API error:", error);

    // Return the object structure the test expects
    return {
      reply: "I am having trouble reaching the scrolls. Please try again.",
      mode: 'error_network'
    };
  }
};
/**
 * Gets the current time formatted as a string (DD Mon HH:MM).
 *
 * @returns {string} The current time in 'en-UK' format (e.g., "10 Dec 16:44").
 */
export const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleDateString("en-UK", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

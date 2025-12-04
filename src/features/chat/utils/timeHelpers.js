/**
 * Gets the current time formatted as a string (HH:MM).
 * 
 * @returns {string} The current time in 'en-UK' format (24-hour clock).
 */
export const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit' });
};
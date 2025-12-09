/**
 * Handles keyboard events for clickable elements (Enter and Space keys).
 * 
 * @param {KeyboardEvent} e - The keyboard event.
 * @param {Function} callback - The function to execute when Enter or Space is pressed.
 */
export const handleKeyboardEvent = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        callback();
    }
};

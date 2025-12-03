export const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit' });
};
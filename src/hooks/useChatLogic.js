import { useState, useEffect, useRef } from 'react';
import { fetchApiMessage } from '../utils/api.js';
import { getCurrentTime } from '../utils/timeHelpers.js';

export default function useChatLogic(persona) {
    const [history, sethistory] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatBodyRef = useRef(null);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const userText = input.trim();
        if (!userText || isLoading) return;

        const currentTime = getCurrentTime();

        // Add User Message
        const userMessage = { role: 'user', text: userText, name: 'You', timestamp: currentTime };
        sethistory(prevHistory => [...prevHistory, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const apiResponseText = await fetchApiMessage(userText);

            if (!persona) {
                throw new Error("Persona is not defined");
            }

            // Add API Response
            const apiMessage = {
                role: 'api',
                text: apiResponseText,
                name: persona.name,
                timestamp: getCurrentTime()
            };
            sethistory(prevHistory => [...prevHistory, apiMessage]);
        } catch (error) {
            console.error("API Error in handleSendMessage:", error);
            const errorMessage = {
                role: "api",
                text: "Sorry, an unexpected error occurred during dialogue processing.",
                name: "Error",
                timestamp: getCurrentTime()
            };
            sethistory(prevHistory => [...prevHistory, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    //Effect hook for auto-scrolling.
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [history, isLoading]);

    return {
        history,
        input,
        isLoading,
        chatBodyRef,
        setInput,
        handleSendMessage
    };
}
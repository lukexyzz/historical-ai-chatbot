import { useState, useEffect, useRef } from 'react';
import { postUserMessage, fetchSingleChat } from '../utils/api';
import { getCurrentTime } from '../utils/timeHelpers.js';


export default function useChatLogic({ chatToLoadId, setChatToLoadId, persona } = {}) {
    const [history, sethistory] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatBodyRef = useRef(null);

    useEffect(() => {
        if (chatToLoadId) {
            const loadChat = async () => {
                try {
                    setIsLoading(true);
                    
                    const data = await fetchSingleChat(chatToLoadId);
                    
                    if (data && data.messages) {
                        sethistory(data.messages);
                    }
                    
                    if (setChatToLoadId) setChatToLoadId(null);
                    
                } catch (error) {
                    console.error("Error loading chat:", error);
                    sethistory([{ 
                        role: "error", 
                        text: "Failed to load chat history. Please try again.", 
                        name: "System", 
                        timestamp: getCurrentTime() 
                    }]);
                } finally {
                    setIsLoading(false);
                }
            };
            loadChat();
        }
    }, [chatToLoadId, setChatToLoadId]);


    const handleSendMessage = async (e) => {
        e.preventDefault();
        const userText = input.trim();
        if (!userText || isLoading) return;

        const currentTime = getCurrentTime();

        const userMessage = { role: 'user', text: userText, name: 'You', timestamp: currentTime };
        sethistory(prevHistory => [...prevHistory, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const apiResponseText = await postUserMessage(userText);
          
            if (!persona) {
                throw new Error("Persona is not defined");
            }
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
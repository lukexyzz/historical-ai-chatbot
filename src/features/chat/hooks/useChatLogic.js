import { useState, useEffect, useRef } from 'react';
import { postUserMessage, fetchSingleChat } from '../../../services/api';
import { getCurrentTime } from '../utils/timeHelpers.js';

export default function useChatLogic({ chat, setChat, persona, language } = {}) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatBodyRef = useRef(null);

    const messages = chat?.messages || [];

    useEffect(() => {
        if (chat?.id && messages.length === 0) {
            const loadChat = async () => {
                try {
                    setIsLoading(true);
                    const data = await fetchSingleChat(chat.id);

                    if (data && data.messages) {
                        setChat(prev => ({ ...prev, messages: data.messages }));
                    }
                } catch (error) {
                    console.error("Error loading chat:", error);
                    const errorMsg = {
                        role: "error",
                        text: "Failed to load chat history.",
                        name: "System",
                        timestamp: getCurrentTime()
                    };
                    setChat(prev => ({ ...prev, messages: [errorMsg] }));
                } finally {
                    setIsLoading(false);
                }
            };
            loadChat();
        }
    }, [chat?.id, setChat]);


    const handleSendMessage = async (e) => {
        e.preventDefault();
        const userText = input.trim();

        if (!userText || isLoading) return;

        const currentTime = getCurrentTime();

        const userMessage = {
            role: 'user',
            text: userText,
            name: 'You',
            timestamp: currentTime
        };

        setChat(prev => ({
            ...prev,
            messages: [...(prev?.messages || []), userMessage]
        }));

        setInput('');
        setIsLoading(true);

        try {
            if (!persona) throw new Error("Persona is not defined");

            const apiResponse = await postUserMessage(userText, persona, language, chat?.dialogueTree);

            const apiMessage = {
                role: 'api',
                text: apiResponse.reply,
                name: persona.name,
                timestamp: getCurrentTime()
            };

            setChat(prev => ({
                ...prev,
                messages: [...(prev?.messages || []), apiMessage],
                dialogueTree: apiResponse.dialogueTree,
                mode: apiResponse.mode
            }));

        } catch (error) {
            console.error("API Error:", error);
            const errorMessage = {
                role: "api",
                text: "Sorry, an error occurred.",
                name: "Error",
                timestamp: getCurrentTime()
            };

            setChat(prev => ({
                ...prev,
                messages: [...(prev?.messages || []), errorMessage]
            }));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return {
        input,
        isLoading,
        chatBodyRef,
        setInput,
        handleSendMessage
    };
}
import { useState, useEffect, useRef } from 'react';
import { sendMessage, getChatHistoryById } from '../../../services/chatService';
import { getCurrentTime } from '../utils/timeHelpers.js';

/**
 * Custom hook to manage chat logic, including sending messages, handling loading states, and scrolling.
 * 
 * @param {Object} params - The hook parameters.
 * @param {Object} [params.chat] - The current chat object containing messages.
 * @param {Function} [params.setChat] - State setter for the chat object.
 * @param {Object} [params.persona] - The persona object being chatted with.
 * @param {string} [params.language] - The language code for the conversation.
 * @returns {Object} An object containing the chat state and handlers.
 * @returns {string} returns.input - The current value of the message input field.
 * @returns {boolean} returns.isLoading - Whether a message is currently being sent or loaded.
 * @returns {Object} returns.chatBodyRef - A ref to the chat body element for auto-scrolling.
 * @returns {Function} returns.setInput - State setter for the input field.
 * @returns {Function} returns.handleSendMessage - Form submission handler to send a message.
 */
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
                    const data = await getChatHistoryById(chat.id);

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

            const apiResponse = await sendMessage(userText, persona, language, chat?.dialogueTree);

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
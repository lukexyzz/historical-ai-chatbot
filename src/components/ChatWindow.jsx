import React, { useState, useEffect } from 'react';
import styles from './ChatWindow.module.css';

const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit' });
};

// simulate API call replace with actual gemini api fetch call
const fetchApiMessage = async (userMessage) => {
    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userMessage }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        console.log("API response:", data);  // <-- Add this
        return data.reply;

    } catch (error) {
        console.error("Fetch API error:", error);
        return "Sorry, I couldn't reach the server.";
    }
};


function ChatComponent() {
    // 1. Revert history to empty array for interactive start
    const [history, sethistory] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Handle sending message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        const userText = input.trim();
        if (!userText || isLoading) return;

        const currentTime = getCurrentTime();

        // Send User Message
        const userMessage = {
            role: 'user',
            text: userText,
            name:'You',
            timestamp: currentTime
        };
        sethistory(prevHistory => [...prevHistory, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const apiResponseText = await fetchApiMessage(userText);

            // Add API Response
            const apiMessage = {
                role: 'api',
                text: apiResponseText,
                name: 'Historical Figure',
                timestamp: getCurrentTime()
            };
            sethistory(prevHistory => [...prevHistory, apiMessage]);
        } catch (error) {
            console.error("API Error:", error);
            const errorMessage = { 
                role: "api", 
                text: "Sorry, an error occurred.",
                name: "Error",
                timestamp: getCurrentTime()
            };
            sethistory(prevHistory => [...prevHistory, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const chatBody = document.getElementById('chat-body');
        if (chatBody) {
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }, [history]);



    // JSX render 
    return ( 
        <div className={styles.chatContainer}>
            <h2>Chat Messenger</h2>

            {/* Chat message display area */}
            <div id='chat-body' className={styles.chatBody}>
                {/* This condition is now TRUE when empty, showing the placeholder */}
                {history.length === 0 && (
                    <p className ={styles.chatPlaceholder}>
                        Start the conversation!
                    </p>
                )}
                
                {history.map((msg, index) => (
                    <div
                        key={index}
                        className={msg.role === 'user' ? styles.userMessageContainer : [styles.messageContainer, styles.apiMessageContainer]}
                    >
                        {/* User Name (Above Message) */}
                        <small className={msg.role === 'user' ? styles.userName : styles.apiName}>
                            {msg.name}
                        </small>

                        {/* Message Bubble */}
                        <div className={`${styles.messageBubble} ${msg.role === 'user' ? styles.userBubble : styles.apiBubble}`}>
                            {msg.text}
                        </div>
                        
                        {/* Time Stamp (Below Message) */}
                        <small className={msg.role === 'user' ? styles.userTimestamp : styles.apiTimestamp}>
                            {msg.timestamp}
                        </small>
                    </div>
                ))}
                
                {/*Loading Indicator*/}
                {isLoading && (
                    <div className={[styles.messageContainer, styles.apiMessageContainer]}>
                        <small className={styles.apiName}>Historical Figure</small>
                        <div className={styles.loadingBubble}>
                            <div className={styles.loadingDot}></div>
                            <div className={styles.loadingDot}></div>
                            <div className={styles.loadingDot}></div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Input Form and Button*/}
            <form onSubmit={handleSendMessage} className={styles.inputForm}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isLoading ? "Waiting..." : "Type your message..."}
                    disabled={isLoading}
                    className={styles.inputField}
                />
                <button 
                    type="submit" 
                    disabled={isLoading || !input.trim()} 
                    className={styles.sendButton}
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default ChatComponent;
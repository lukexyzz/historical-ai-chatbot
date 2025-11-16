import React, { useState, useEffect } from 'react'; 

const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit' });
};

// simulate API call replace with actual gemini api fetch call
const fetchApiMessage = async (userMessage) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // simulate network delay
    return `Echo: ${userMessage}`;
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
        <div className="chat-container">
            <h2>Chat Messenger</h2>

            {/* Chat message display area */}
            <div id='chat-body' className='chat-body'>
                {/* This condition is now TRUE when empty, showing the placeholder */}
                {history.length === 0 && (
                    <p className ="chat-placeholder">
                        Start the conversation!
                    </p>
                )}
                
                {history.map((msg, index) => (
                    <div
                        key={index}
                        className={msg.role === 'user' ? "user-message-container" : "message-container api-message-container"}
                    >
                        {/* User Name (Above Message) */}
                        <small className={msg.role === 'user' ? "user-name" : "api-name"}>
                            {msg.name}
                        </small>

                        {/* Message Bubble */}
                        <div className={msg.role === 'user' ? "message-bubble user-bubble" : "message-bubble api-bubble"}>
                            {msg.text}
                        </div>
                        
                        {/* Time Stamp (Below Message) */}
                        <small className={msg.role === 'user' ? "user-timestamp" : "api-timestamp"}>
                            {msg.timestamp}
                        </small>
                    </div>
                ))}
                
                {/*Loading Indicator*/}
                {isLoading && (
                    <div className="message-container api-message-container">
                        <small className="api-name">Historical Figure</small>
                        <div className="loading-bubble">
                            <div className="loading-dot"></div>
                            <div className="loading-dot"></div>
                            <div className="loading-dot"></div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Input Form and Button*/}
            <form onSubmit={handleSendMessage} className="input-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isLoading ? "Waiting..." : "Type your message..."}
                    disabled={isLoading}
                    className="input-field"
                />
                <button 
                    type="submit" 
                    disabled={isLoading || !input.trim()} 
                    className="send-button"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default ChatComponent;
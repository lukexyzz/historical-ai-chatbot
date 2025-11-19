import { useState, useEffect, useRef } from 'react';
import styles from './ChatWindow.module.css';
import ChatMessage from './ChatMessage'; 
import LoadingIndicator from './LoadingIndicator';
import useChatLogic from '../../hooks/useChatLogic';

export default function ChatWindow() { 
const { 
        history, 
        input, 
        isLoading, 
        chatBodyRef, 
        setInput,
        handleSendMessage
    } = useChatLogic();

    return ( 
        <div className={styles.chatContainer}>
            <h2>Historical Figure Chatbot</h2>

            <div 
                id='chat-body' 
                className={styles.chatBody} 
                ref={chatBodyRef}
                role="log" 
            >
                {history.length === 0 && (
                    <p className ={styles.chatPlaceholder}>
                        Start the conversation with your chosen historical figure!
                    </p>
                )}

                {/*Extracted chat message and loadingindicator into seperate components */}
                
                {history.map((msg, index) => (
                    <ChatMessage key={index} msg={msg} />
                ))}
                
                {isLoading && <LoadingIndicator />}
            </div>
            
           
            <form onSubmit={handleSendMessage} className={styles.inputForm}>
                <label className={styles.visuallyHidden}>Type your message here</label>
                <input
                    id="chat-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isLoading ? "Waiting for response..." : "Type your message..."}
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
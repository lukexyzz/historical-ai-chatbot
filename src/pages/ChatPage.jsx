import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  createChatHistory,
  getChatHistoryById,
  getChatHistory,
  deleteChatHistory,
} from "../services/chatService";
import Navbar from "../components/Layout/Navbar.jsx";
import ChatLayout from "../components/Layout/ChatLayout.jsx";
import styles from "./Chat.module.css";
import ChatWindow from "../features/chat/components/ChatWindow.jsx";
import { personas } from "../data/personas";
import { SidebarProvider } from "../context/SidebarContext";

/**
 * The main Chat page component that orchestrates the chat interface, sidebar, and navbar.
 *
 * @component
 * @returns {JSX.Element|null} The rendered chat page or null if no persona is selected.
 */
export default function Chat() {
  const navigate = useNavigate();
  const { personaId } = useParams();
  const [persona, setPersona] = useState(null);
  const [chat, setChat] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");

  // Sidebar State
  const [sidebarChats, setSidebarChats] = useState([]);
  const [isSidebarLoading, setIsSidebarLoading] = useState(true);
  const [sidebarError, setSidebarError] = useState(null);

  // Load Sidebar Chats
  const fetchSidebarChats = useCallback(async () => {
    try {
      setIsSidebarLoading(true);
      setSidebarError(null);
      const data = await getChatHistory();
      setSidebarChats(data);
    } catch (err) {
      setSidebarError("Failed to load chats. Please try again.");
    } finally {
      setIsSidebarLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSidebarChats();
  }, [fetchSidebarChats]);

  useEffect(() => {
    const foundPersona = personas.find((p) => p.id === personaId);

    if (foundPersona) {
      setPersona(foundPersona);

      const loadChat = async () => {
        if (chatId) {
          try {
            const loadedChat = await getChatHistoryById(chatId);
            setChat(loadedChat);
          } catch (error) {
            console.error("Failed to load chat:", error);
            setChat(null);
          }
        } else {
          setChat(null);
        }
      };

      loadChat();
    } else {
      // Invalid persona ID, redirect to home
      navigate("/");
    }
  }, [personaId, chatId, navigate]);

  /**
   * Switches the current persona and optionally loads a specific chat.
   *
   * @param {Object} targetPersona - The persona object to switch to.
   * @param {string|null} [specificChatId=null] - The ID of the chat to load, or null for a new chat.
   */
  const switchPersona = (targetPersona, specificChatId = null) => {
    if (targetPersona) {
      const url = specificChatId
        ? `/chat/${targetPersona.id}?chatId=${specificChatId}`
        : `/chat/${targetPersona.id}`;
      navigate(url);
    }
  };

  const handleLoadChat = (chat) => {
    const targetPersona = personas.find((p) => p.name === chat.personaName);
    switchPersona(targetPersona, chat.id);
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteChatHistory(chatId);
      // Optimistically update the list
      setSidebarChats((prevChats) =>
        prevChats.filter((chat) => chat.id !== chatId),
      );
    } catch (error) {
      console.error("Error deleting chat:", error);
      setSidebarError("Failed to delete chat. Please try again.");
    }
  };

  const handleSaveChat = async (currentMessages) => {
    setIsSaving(true);

    const dataToSave = {
      title: chat?.title || null,
      personaName: persona.name,
      messages: currentMessages,
    };

    try {
      await createChatHistory(dataToSave);
      console.log("Chat saved successfully!");

      // Refresh sidebar list after save
      fetchSidebarChats();
    } catch (error) {
      console.error("Error saving chat:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!persona) return null;

  return (
    <SidebarProvider>
      <ChatLayout
        onChatClick={handleLoadChat}
        sidebarChats={sidebarChats}
        isSidebarLoading={isSidebarLoading}
        sidebarError={sidebarError}
        onDeleteChat={handleDeleteChat}
      >
        <Navbar personaName={persona.name} />

        <section className={styles.chatArea}>
          <ChatWindow
            chat={chat}
            setChat={setChat}
            onSaveChat={handleSaveChat}
            isSaving={isSaving}
            persona={persona}
          />
        </section>
      </ChatLayout>
    </SidebarProvider>
  );
}

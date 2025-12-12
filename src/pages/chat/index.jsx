import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getChatById, saveChat } from "../../services/chat/chatHistoryService.js";
import Navbar from "../../components/Layout/Navbar.jsx";
import ChatLayout from "../../components/Layout/ChatLayout.jsx";
import styles from "./index.module.css";
import ChatWindow from "../../features/chat/components/ChatWindow.jsx";
import { personas } from "../../data/personas.js";
import { SidebarProvider, useSidebar } from "../../context/SidebarContext.jsx";

/**
 * The main Chat page component that orchestrates the chat interface, sidebar, and navbar.
 *
 * @component
 * @returns {JSX.Element|null} The rendered chat page or null if no persona is selected.
 */
export default function ChatPage() {
  return (
    <SidebarProvider>
      <ChatPageContent />
    </SidebarProvider>
  );
}

function ChatPageContent() {
  const navigate = useNavigate();
  const { personaId } = useParams();
  const [persona, setPersona] = useState(null);
  const [chat, setChat] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");

  const { loadChats } = useSidebar();

  useEffect(() => {
    const foundPersona = personas.find((p) => p.id === personaId);

    if (foundPersona) {
      setPersona(foundPersona);

      const loadChat = async () => {
        if (chatId) {
          try {
            const loadedChat = await getChatById(chatId);
            setChat(loadedChat);
          } catch (error) {
            console.error("Failed to load chat:", error);
            setChat(null);
          }
        } else {
          // If no chatId in URL, we are starting a fresh conversation
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

  /**
   * Saves the current conversation state to the backend.
   * Called by ChatWindow when the user clicks "Save".
   */
  const handleSaveChat = async (currentMessages, treeState, mode) => {
    setIsSaving(true);
    try {
      const dataToSave = {
        id: chat?.id, // Include ID if updating an existing chat
        title: chat?.title, // Keep existing title (backend handles generation if missing)
        personaName: persona.name,
        messages: currentMessages,
        dialogueTree: treeState,
        mode: mode,
      };

      const savedChat = await saveChat(dataToSave);

      console.log("Chat saved successfully!");
      setChat(savedChat); // Update local state with the saved version (contains ID)

      // If this was a new chat, update URL with the new ID without reloading
      if (!chatId) {
        setSearchParams({ chatId: savedChat.id });
      }

      // Refresh sidebar list to show the new/updated chat
      loadChats(true);
    } catch (error) {
      console.error("Error saving chat:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!persona) return null;

  return (
    <ChatLayout onChatClick={handleLoadChat}>
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
  );
}
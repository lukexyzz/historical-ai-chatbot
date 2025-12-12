import { createContext, useState, useContext, useEffect, useCallback } from "react";
import { getChatHistory, deleteChat } from "../services/chat/chatHistoryService";

const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);
  const openSidebar = () => setIsOpen(true);

  const loadChats = useCallback(async (reset = false) => {
    if (reset) {
      setIsLoading(true);
      setPage(1);
      setChats([]);
    } else {
      setIsLoadingMore(true);
    }
    setError(null);

    try {
      const currentPage = reset ? 1 : page;
      const data = await getChatHistory(currentPage);

      // Expect object now: { chats: [], hasMore: boolean, total: number }
      const newChats = data.chats;
      const hasMoreData = data.hasMore;

      setChats((prev) => reset ? newChats : [...prev, ...newChats]);
      setHasMore(hasMoreData);

      if (!reset) {
        setPage((prev) => prev + 1);
      } else {
        // If we reset, we prepared page 1, so next page should be 2
        setPage(2);
      }

    } catch (err) {
      setError("Failed to load chat history.");
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [page]);

  // Initial load
  useEffect(() => {
    if (isOpen && chats.length === 0) {
      loadChats(true);
    }
  }, [isOpen]);

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteChat(chatId);
      setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    } catch (err) {
      console.error("Failed to delete chat:", err);
      // Optionally set an error state here
    }
  };

  const value = {
    isOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar,
    chats,
    isLoading,
    error,
    loadChats,
    handleDeleteChat,
    hasMore,
    isLoadingMore,
    loadMoreChats: () => loadChats(false)
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

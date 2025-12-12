import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Sidebar from "./Sidebar";
import { useSidebar } from "../../context/SidebarContext";

// 1. Mock the module
vi.mock("../../context/SidebarContext", () => ({
  useSidebar: vi.fn(),
}));

// Mock API
vi.mock("../../services/chat/chatHistoryService", () => ({
  getChatHistory: vi.fn().mockResolvedValue({ chats: [], total: 0 }),
  deleteChat: vi.fn().mockResolvedValue({}),
}));

// Mock DeleteButton
vi.mock("../UI/Button/DeleteButton", () => ({
  default: ({ onClick }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label="Delete chat"
    >
      Delete
    </button>
  ),
}));

describe("Sidebar Component", () => {
  const mockCloseSidebar = vi.fn();
  const mockLoadChats = vi.fn();
  const mockDeleteChat = vi.fn();

  const defaultContext = {
    isOpen: true,
    chats: [],
    isLoading: false,
    error: null,
    closeSidebar: mockCloseSidebar,
    loadChats: mockLoadChats,
    handleDeleteChat: mockDeleteChat,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useSidebar.mockReturnValue(defaultContext);
  });


  it("renders loading state initially", () => {
    useSidebar.mockReturnValue({ ...defaultContext, isLoading: true });
    render(<Sidebar />);
    expect(screen.getByText("Loading previous chats...")).toBeInTheDocument();
  });

  it("renders chats after loading", () => {
    const mockChats = [{ id: 1, title: "Chat 1" }, { id: 2, title: "Chat 2" }];
    useSidebar.mockReturnValue({ ...defaultContext, chats: mockChats });
    render(<Sidebar />);
    expect(screen.getByText("Chat 1")).toBeInTheDocument();
    expect(screen.getByText("Chat 2")).toBeInTheDocument();
  });

  it("renders error message on fetch failure", () => {
    useSidebar.mockReturnValue({ ...defaultContext, error: "Failed." });
    render(<Sidebar />);
    expect(screen.getByText("Failed.")).toBeInTheDocument();
  });

  it("calls onChatClick and closeSidebar when a chat is clicked", () => {
    const mockChats = [{ id: 1, title: "Chat 1" }];
    useSidebar.mockReturnValue({ ...defaultContext, chats: mockChats });
    const onChatClick = vi.fn();

    render(<Sidebar onChatClick={onChatClick} />);

    fireEvent.click(screen.getByText("Chat 1"));
    expect(onChatClick).toHaveBeenCalledWith(mockChats[0]);
    expect(mockCloseSidebar).toHaveBeenCalled();
  });

  it("calls handleDeleteChat from context when delete is clicked", () => {
    const mockChats = [{ id: 1, title: "Chat 1" }];

    useSidebar.mockReturnValue({
      ...defaultContext,
      chats: mockChats,
      handleDeleteChat: mockDeleteChat, // Ensure the spy is in context
    });

    render(<Sidebar />); // No props needed for delete anymore

    const deleteButton = screen.getByLabelText("Delete chat");
    fireEvent.click(deleteButton);

    expect(mockDeleteChat).toHaveBeenCalledWith(1);
  });
});
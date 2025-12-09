import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Sidebar from "./Sidebar";
import * as chatService from "../../services/chatService";

// Mock API
vi.mock("../../services/chatService", () => ({
  getChatHistory: vi.fn(),
  deleteChatHistory: vi.fn(),
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

// Mock SidebarContext
const mockCloseSidebar = vi.fn();
vi.mock("../../context/SidebarContext", () => ({
  useSidebar: () => ({
    isOpen: true,
    closeSidebar: mockCloseSidebar,
  }),
}));

describe("Sidebar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    render(<Sidebar isLoading={true} />);
    expect(screen.getByText("Loading previous chats...")).toBeInTheDocument();
  });

  it("renders chats after loading", () => {
    const mockChats = [
      { id: 1, title: "Chat 1" },
      { id: 2, title: "Chat 2" },
    ];

    render(<Sidebar chats={mockChats} />);

    expect(screen.getByText("Chat 1")).toBeInTheDocument();
    expect(screen.getByText("Chat 2")).toBeInTheDocument();
  });

  it("renders error message on fetch failure", () => {
    render(<Sidebar error="Failed to load chats. Please try again." />);

    expect(
      screen.getByText("Failed to load chats. Please try again."),
    ).toBeInTheDocument();
  });

  it("calls onChatClick and closeSidebar when a chat is clicked", () => {
    const mockChats = [{ id: 1, title: "Chat 1" }];
    const onChatClick = vi.fn();

    render(<Sidebar chats={mockChats} onChatClick={onChatClick} />);

    expect(screen.getByText("Chat 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Chat 1"));
    expect(onChatClick).toHaveBeenCalledWith(mockChats[0]);
    expect(mockCloseSidebar).toHaveBeenCalled();
  });

  it("calls onDeleteChat when delete is clicked", () => {
    const mockChats = [{ id: 1, title: "Chat 1" }];
    const onDeleteChat = vi.fn();

    render(<Sidebar chats={mockChats} onDeleteChat={onDeleteChat} />);

    expect(screen.getByText("Chat 1")).toBeInTheDocument();

    const deleteButton = screen.getByLabelText("Delete chat");
    fireEvent.click(deleteButton);

    expect(onDeleteChat).toHaveBeenCalledWith(1);
  });
});

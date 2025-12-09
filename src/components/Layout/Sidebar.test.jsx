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

describe("Sidebar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    chatService.getChatHistory.mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<Sidebar isOpen={true} />);
    expect(screen.getByText("Loading previous chats...")).toBeInTheDocument();
  });

  it("renders chats after loading", async () => {
    const mockChats = [
      { id: 1, title: "Chat 1" },
      { id: 2, title: "Chat 2" },
    ];
    chatService.getChatHistory.mockResolvedValue(mockChats);

    render(<Sidebar isOpen={true} />);

    await waitFor(() => {
      expect(screen.getByText("Chat 1")).toBeInTheDocument();
      expect(screen.getByText("Chat 2")).toBeInTheDocument();
    });
  });

  it("renders error message on fetch failure", async () => {
    chatService.getChatHistory.mockRejectedValue(new Error("Failed"));

    render(<Sidebar isOpen={true} />);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to load chats. Please try again."),
      ).toBeInTheDocument();
    });
  });

  it("calls onChatClick when a chat is clicked", async () => {
    const mockChats = [{ id: 1, title: "Chat 1" }];
    chatService.getChatHistory.mockResolvedValue(mockChats);
    const onChatClick = vi.fn();

    render(<Sidebar isOpen={true} onChatClick={onChatClick} />);

    await waitFor(() => expect(screen.getByText("Chat 1")).toBeInTheDocument());

    fireEvent.click(screen.getByText("Chat 1"));
    expect(onChatClick).toHaveBeenCalledWith(mockChats[0]);
  });

  it("calls deleteChatHistory and updates list when delete is clicked", async () => {
    const mockChats = [{ id: 1, title: "Chat 1" }];
    chatService.getChatHistory.mockResolvedValue(mockChats);
    chatService.deleteChatHistory.mockResolvedValue({});

    render(<Sidebar isOpen={true} />);

    await waitFor(() => expect(screen.getByText("Chat 1")).toBeInTheDocument());

    const deleteButton = screen.getByLabelText("Delete chat");
    fireEvent.click(deleteButton);

    expect(chatService.deleteChatHistory).toHaveBeenCalledWith(1);

    await waitFor(() => {
      expect(screen.queryByText("Chat 1")).not.toBeInTheDocument();
    });
  });
});

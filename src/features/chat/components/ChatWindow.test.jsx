import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ChatWindow from "./ChatWindow";

// Mock useChatLogic hook
const mockHandleSendMessage = vi.fn((e) => e.preventDefault());
const mockSetInput = vi.fn();

vi.mock("../../hooks/useChatLogic", () => ({
  default: () => ({
    input: "",
    isLoading: false,
    chatBodyRef: { current: null },
    setInput: mockSetInput,
    handleSendMessage: mockHandleSendMessage,
  }),
}));

describe("ChatWindow Component", () => {
  const mockProps = {
    chat: { messages: [] },
    setChat: vi.fn(),
    onSaveChat: vi.fn(),
    persona: { name: "Cleopatra" },
  };

  it("renders placeholder when no messages exist", () => {
    render(<ChatWindow {...mockProps} />);
    expect(
      screen.getByText(/Start the conversation with Cleopatra/i),
    ).toBeInTheDocument();
  });

  it("renders messages when they exist", () => {
    const propsWithMessages = {
      ...mockProps,
      chat: {
        messages: [
          { role: "user", text: "Hello", name: "You" },
          { role: "api", text: "Greetings", name: "Cleopatra" },
        ],
      },
    };
    render(<ChatWindow {...propsWithMessages} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Greetings")).toBeInTheDocument();
  });

  it("calls onSaveChat when save button is clicked", () => {
    const propsWithMessages = {
      ...mockProps,
      chat: { messages: [{ role: "user", text: "Hi" }] },
    };
    render(<ChatWindow {...propsWithMessages} />);

    const saveButton = screen.getByLabelText("Save conversation history");
    fireEvent.click(saveButton);

    expect(mockProps.onSaveChat).toHaveBeenCalled();
  });

  it("has correct accessibility attributes for live region", () => {
    render(<ChatWindow {...mockProps} />);
    const chatBody = screen.getByRole("log");
    expect(chatBody).toHaveAttribute("aria-live", "assertive");
    expect(chatBody).toHaveAttribute("aria-relevant", "additions");
  });
});

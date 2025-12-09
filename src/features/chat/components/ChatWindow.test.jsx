import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ChatWindow from "./ChatWindow";

import useChatLogic from "../hooks/useChatLogic";

// Mock useChatLogic hook
vi.mock("../hooks/useChatLogic");

const mockSetInput = vi.fn();
const mockHandleSendMessage = vi.fn((e) => e.preventDefault());
const mockOnSendOption = vi.fn();

const defaultHookValues = {
  input: "",
  isLoading: false,
  messages: [],
  chatBodyRef: { current: null },
  setInput: mockSetInput,
  handleSendMessage: mockHandleSendMessage,
  onSendOption: mockOnSendOption,
};

describe("ChatWindow Component", () => {
  const mockProps = {
    chat: { messages: [] },
    setChat: vi.fn(),
    onSaveChat: vi.fn(),
    persona: { name: "Cleopatra" },
  };

  beforeEach(() => {
    vi.mocked(useChatLogic).mockReturnValue(defaultHookValues);
  });

  it("renders placeholder when no messages exist", () => {
    vi.mocked(useChatLogic).mockReturnValue({
      ...defaultHookValues,
      messages: [],
    });
    render(<ChatWindow {...mockProps} />);
    expect(
      screen.getByText(/Start the conversation with Cleopatra/i),
    ).toBeInTheDocument();
  });

  it("renders messages when they exist", () => {
    const messages = [
      { role: "user", text: "Hello", name: "You" },
      { role: "api", text: "Greetings", name: "Cleopatra" },
    ];

    vi.mocked(useChatLogic).mockReturnValue({
      ...defaultHookValues,
      messages: messages,
    });

    const propsWithMessages = {
      ...mockProps,
      chat: { messages },
    };
    render(<ChatWindow {...propsWithMessages} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Greetings")).toBeInTheDocument();
  });

  it("calls onSaveChat when save button is clicked", () => {
    vi.mocked(useChatLogic).mockReturnValue({
      ...defaultHookValues,
      messages: [{ role: "user", text: "Hi" }],
    });

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
    vi.mocked(useChatLogic).mockReturnValue(defaultHookValues);
    render(<ChatWindow {...mockProps} />);
    const chatBody = screen.getByRole("log");
    expect(chatBody).toHaveAttribute("aria-live", "assertive");
    expect(chatBody).toHaveAttribute("aria-relevant", "additions");
  });
});

import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Chat from "./index";
import { saveChat, getChatById } from "../../services/chat/chatHistoryService";

// Mock dependencies
vi.mock("../../services/chat/chatHistoryService", () => ({
  saveChat: vi.fn(),
  getChatById: vi.fn(),
}));

const mockNavigate = vi.fn();
const mockLocation = { state: null };
let mockParams = { personaId: null };
let mockSearchParams = new URLSearchParams();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
  useParams: () => mockParams,
  useSearchParams: () => [mockSearchParams, vi.fn()],
}));

// Mock child components to simplify testing and isolate Chat logic
vi.mock("../../features/chat/components/ChatWindow", () => ({
  default: ({ onSaveChat, persona, isSaving, chat }) => (
    <div data-testid="chat-window">
      Chat with {persona.name}
      {chat && <span data-testid="chat-title">{chat.title}</span>}
      <button onClick={() => onSaveChat([{ role: "user", content: "hi" }])}>
        {isSaving ? "Saving..." : "Save Chat"}
      </button>
    </div>
  ),
}));

vi.mock("../../components/Layout/Navbar", () => ({
  default: ({ personaName }) => <div data-testid="navbar">{personaName}</div>,
}));

vi.mock("../../components/Layout/Sidebar", () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>,
}));

describe("Chat Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.state = null;
    mockParams = { personaId: null };
    mockSearchParams = new URLSearchParams();
  });

  it("redirects to home if no persona ID is provided", () => {
    mockParams = { personaId: null };
    render(<Chat />);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("redirects to home if invalid persona ID is provided", () => {
    mockParams = { personaId: "invalid-id" };
    render(<Chat />);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("renders correctly when valid persona ID is provided", () => {
    mockParams = { personaId: "cleopatra" };

    render(<Chat />);

    expect(screen.getByTestId("navbar")).toHaveTextContent("Cleopatra");
    expect(screen.getByTestId("chat-window")).toHaveTextContent(
      "Chat with Cleopatra",
    );
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("loads chat history when chatId is present in URL", async () => {
    mockParams = { personaId: "cleopatra" };
    mockSearchParams.set("chatId", "123");
    const mockChat = {
      id: "123",
      title: "Test Chat",
      personaName: "Cleopatra",
      messages: [],
    };
    getChatById.mockResolvedValue(mockChat);

    render(<Chat />);

    await waitFor(() => {
      expect(getChatById).toHaveBeenCalledWith("123");
    });

    expect(screen.getByTestId("chat-title")).toHaveTextContent("Test Chat");
  });

  it("calls saveChat when save is triggered from ChatWindow", async () => {
    mockParams = { personaId: "cleopatra" };
    saveChat.mockResolvedValue({});
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => { });

    render(<Chat />);

    const saveButton = screen.getByText("Save Chat");

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(saveChat).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByText("Save Chat")).toBeInTheDocument();
    });

    expect(saveChat).toHaveBeenCalledWith(
      expect.objectContaining({
        personaName: "Cleopatra",
        messages: expect.any(Array),
      }),
    );

    logSpy.mockRestore();
  });
});

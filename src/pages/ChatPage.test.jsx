import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Chat from './ChatPage';
import { savePreviousChat } from '../services/api';

// Mock dependencies
vi.mock('../services/api', () => ({
    savePreviousChat: vi.fn(),
}));

const mockNavigate = vi.fn();
const mockLocation = { state: null };

vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
}));

// Mock child components to simplify testing and isolate Chat logic
vi.mock('../features/chat/components/ChatWindow', () => ({
    default: ({ onSaveChat, persona, isSaving }) => (
        <div data-testid="chat-window">
            Chat with {persona.name}
            <button onClick={() => onSaveChat([{ role: 'user', content: 'hi' }])}>
                {isSaving ? 'Saving...' : 'Save Chat'}
            </button>
        </div>
    ),
}));

vi.mock('../components/Layout/Navbar', () => ({
    default: ({ personaName }) => <div data-testid="navbar">{personaName}</div>,
}));

vi.mock('../components/Layout/Sidebar', () => ({
    default: () => <div data-testid="sidebar">Sidebar</div>,
}));

describe('Chat Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockLocation.state = null;
    });

    it('redirects to home if no persona is provided in state', () => {
        render(<Chat />);
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('renders correctly when persona is provided', () => {
        mockLocation.state = {
            persona: { id: 'cleopatra', name: 'Cleopatra', description: 'Queen' }
        };

        render(<Chat />);

        expect(screen.getByTestId('navbar')).toHaveTextContent('Cleopatra');
        expect(screen.getByTestId('chat-window')).toHaveTextContent('Chat with Cleopatra');
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('calls savePreviousChat when save is triggered from ChatWindow', async () => {
        mockLocation.state = {
            persona: { id: 'cleopatra', name: 'Cleopatra' }
        };
        savePreviousChat.mockResolvedValue({});
        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

        render(<Chat />);

        const saveButton = screen.getByText('Save Chat');

        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(savePreviousChat).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(screen.getByText('Save Chat')).toBeInTheDocument();
        });

        expect(savePreviousChat).toHaveBeenCalledWith(expect.objectContaining({
            personaName: 'Cleopatra',
            messages: expect.any(Array),
        }));

        logSpy.mockRestore();
    });
});

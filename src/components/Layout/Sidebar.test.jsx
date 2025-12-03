import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Sidebar from './Sidebar';
import * as api from '../../services/api';

// Mock API
vi.mock('../../services/api', () => ({
    fetchPreviousChats: vi.fn(),
    deletePreviousChat: vi.fn(),
}));

// Mock DeleteButton
vi.mock('../UI/Button/DeleteButton', () => ({
    default: ({ onClick }) => (
        <button onClick={(e) => { e.stopPropagation(); onClick(); }} aria-label="Delete chat">
            Delete
        </button>
    )
}));

describe('Sidebar Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state initially', () => {
        api.fetchPreviousChats.mockImplementation(() => new Promise(() => { })); // Never resolves
        render(<Sidebar isOpen={true} />);
        expect(screen.getByText('Loading previous chats...')).toBeInTheDocument();
    });

    it('renders chats after loading', async () => {
        const mockChats = [
            { id: 1, title: 'Chat 1' },
            { id: 2, title: 'Chat 2' }
        ];
        api.fetchPreviousChats.mockResolvedValue(mockChats);

        render(<Sidebar isOpen={true} />);

        await waitFor(() => {
            expect(screen.getByText('Chat 1')).toBeInTheDocument();
            expect(screen.getByText('Chat 2')).toBeInTheDocument();
        });
    });

    it('renders error message on fetch failure', async () => {
        api.fetchPreviousChats.mockRejectedValue(new Error('Failed'));

        render(<Sidebar isOpen={true} />);

        await waitFor(() => {
            expect(screen.getByText('Failed to load chats. Please try again.')).toBeInTheDocument();
        });
    });

    it('calls onChatClick when a chat is clicked', async () => {
        const mockChats = [{ id: 1, title: 'Chat 1' }];
        api.fetchPreviousChats.mockResolvedValue(mockChats);
        const onChatClick = vi.fn();

        render(<Sidebar isOpen={true} onChatClick={onChatClick} />);

        await waitFor(() => expect(screen.getByText('Chat 1')).toBeInTheDocument());

        fireEvent.click(screen.getByText('Chat 1'));
        expect(onChatClick).toHaveBeenCalledWith(mockChats[0]);
    });

    it('calls deletePreviousChat and updates list when delete is clicked', async () => {
        const mockChats = [{ id: 1, title: 'Chat 1' }];
        api.fetchPreviousChats.mockResolvedValue(mockChats);
        api.deletePreviousChat.mockResolvedValue({});

        render(<Sidebar isOpen={true} />);

        await waitFor(() => expect(screen.getByText('Chat 1')).toBeInTheDocument());

        const deleteButton = screen.getByLabelText('Delete chat');
        fireEvent.click(deleteButton);

        expect(api.deletePreviousChat).toHaveBeenCalledWith(1);

        await waitFor(() => {
            expect(screen.queryByText('Chat 1')).not.toBeInTheDocument();
        });
    });
});

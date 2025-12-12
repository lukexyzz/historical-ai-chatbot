import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { SidebarProvider, useSidebar } from './SidebarContext';
import * as chatService from "../services/chat/chatHistoryService";

// Mock the chatService
vi.mock('../services/chat/chatHistoryService');

// Test component to consume the context
const TestComponent = () => {
    const { chats, loadMoreChats, hasMore, isLoading, isLoadingMore, openSidebar } = useSidebar();

    // Open sidebar on mount to trigger load
    React.useEffect(() => {
        openSidebar();
    }, []);

    return (
        <div>
            <div data-testid="loading">{isLoading.toString()}</div>
            <div data-testid="loading-more">{isLoadingMore.toString()}</div>
            <div data-testid="has-more">{hasMore.toString()}</div>
            <ul>
                {chats.map((chat) => (
                    <li key={chat.id}>{chat.title}</li>
                ))}
            </ul>
            <button onClick={loadMoreChats}>Load More</button>
        </div>
    );
};

describe('SidebarContext', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('loads initial chats on mount', async () => {
        const mockChats = {
            chats: [{ id: '1', title: 'Chat 1' }],
            hasMore: true,
            total: 10
        };
        chatService.getChatHistory.mockResolvedValue(mockChats);

        render(
            <SidebarProvider>
                <TestComponent />
            </SidebarProvider>
        );

        // Initial load should trigger
        await waitFor(() => {
            expect(chatService.getChatHistory).toHaveBeenCalledWith(1);
        });

        expect(screen.getByText('Chat 1')).toBeInTheDocument();
        expect(screen.getByTestId('has-more')).toHaveTextContent('true');
    });

    it('loads more chats when loadMoreChats is called', async () => {
        const initialChats = {
            chats: [{ id: '1', title: 'Chat 1' }],
            hasMore: true,
            total: 10
        };
        const moreChats = {
            chats: [{ id: '2', title: 'Chat 2' }],
            hasMore: false,
            total: 10
        };

        chatService.getChatHistory
            .mockResolvedValueOnce(initialChats)
            .mockResolvedValueOnce(moreChats);

        render(
            <SidebarProvider>
                <TestComponent />
            </SidebarProvider>
        );

        // Wait for initial load
        await waitFor(() => {
            expect(screen.getByText('Chat 1')).toBeInTheDocument();
        });

        // Click load more
        await act(async () => {
            screen.getByText('Load More').click();
        });

        // Should call with page 2
        await waitFor(() => {
            expect(chatService.getChatHistory).toHaveBeenCalledWith(2);
        });

        expect(screen.getByText('Chat 2')).toBeInTheDocument();
        expect(screen.getByTestId('has-more')).toHaveTextContent('false');
    });
});

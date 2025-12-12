import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getChatHistory, saveChat, deleteChat } from './chatHistoryService.js';

global.fetch = vi.fn();

describe('historyService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getChatHistory', () => {
        it('fetches chats with pagination', async () => {
            const mockData = { chats: [], total: 0 };
            global.fetch.mockResolvedValue({
                ok: true,
                json: async () => mockData,
            });

            await getChatHistory(2, 5);

            // Verify URL parameters
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('page=2&limit=5')
            );
        });

        it('throws error if fetch fails', async () => {
            global.fetch.mockResolvedValue({ ok: false, status: 500 });
            await expect(getChatHistory()).rejects.toThrow('Failed to fetch chat list');
        });
    });

    describe('saveChat', () => {
        it('sends the correct data (including ID) to the server', async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                json: async () => ({ success: true }),
            });

            const chatData = {
                id: '123-abc', // <--- Critical Check
                title: 'Test Chat',
                messages: []
            };

            await saveChat(chatData);

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/chat/history'),
                expect.objectContaining({
                    method: 'POST',
                    // Check that ID was actually sent in the body
                    body: expect.stringContaining('"id":"123-abc"')
                })
            );
        });
    });

    describe('deleteChat', () => {
        it('sends a DELETE request to the correct URL', async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                json: async () => ({ success: true }),
            });

            await deleteChat('chat-id-999');

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/chat/history/chat-id-999'),
                expect.objectContaining({ method: 'DELETE' })
            );
        });
    });
});
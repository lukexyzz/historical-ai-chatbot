import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { postUserMessage, fetchPreviousChats, savePreviousChat, fetchSingleChat, deletePreviousChat } from './api';

// Mock global fetch
global.fetch = vi.fn();

describe('API Utils', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('postUserMessage', () => {
        it('sends a POST request and returns data on success', async () => {
            const mockResponse = { reply: 'Hello from AI' };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const result = await postUserMessage('Hello', { name: 'Cleopatra' }, 'en');

            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/chat'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: 'Hello',
                    personaName: 'Cleopatra',
                    language: 'en'
                }),
            });
            expect(result).toEqual(mockResponse);
        });

        it('returns error message on failure', async () => {
            fetch.mockRejectedValueOnce(new Error('Network error'));

            const result = await postUserMessage('Hello', { name: 'Cleopatra' }, 'en');

            expect(result).toEqual({ reply: "Sorry, I couldn't reach the server." });
        });
    });

    describe('fetchPreviousChats', () => {
        it('fetches previous chats successfully', async () => {
            const mockChats = [{ id: 1, title: 'Chat 1' }];
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockChats,
            });

            const result = await fetchPreviousChats();
            expect(result).toEqual(mockChats);
        });

        it('throws error on failure', async () => {
            fetch.mockResolvedValueOnce({ ok: false, status: 500 });
            await expect(fetchPreviousChats()).rejects.toThrow("Failed to fetch chat list from server.");
        });
    });

    describe('savePreviousChat', () => {
        it('sends POST request to save chat', async () => {
            const mockData = { id: 123 };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
            });

            const result = await savePreviousChat({ title: 'Test', personaName: 'Cleopatra', messages: [] });
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/chat/history'), expect.objectContaining({
                method: 'POST'
            }));
            expect(result).toEqual(mockData);
        });
    });
});

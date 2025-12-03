import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useChatLogic from './useChatLogic';
import * as api from '../utils/api';

// Mock API functions
vi.mock('../utils/api', () => ({
    postUserMessage: vi.fn(),
    fetchSingleChat: vi.fn(),
}));

describe('useChatLogic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('initializes with default state', () => {
        const { result } = renderHook(() => useChatLogic());
        expect(result.current.input).toBe('');
        expect(result.current.isLoading).toBe(false);
    });

    it('updates input state', () => {
        const { result } = renderHook(() => useChatLogic());

        act(() => {
            result.current.setInput('Hello');
        });

        expect(result.current.input).toBe('Hello');
    });

    it('sends a message and updates chat state', async () => {
        const setChat = vi.fn();
        const persona = { name: 'Cleopatra' };

        api.postUserMessage.mockResolvedValue({ reply: 'Hello User' });

        const { result } = renderHook(() => useChatLogic({ chat: { messages: [] }, setChat, persona }));

        act(() => {
            result.current.setInput('Hi');
        });

        await act(async () => {
            await result.current.handleSendMessage({ preventDefault: vi.fn() });
        });

        // Check if user message was added
        expect(setChat).toHaveBeenCalledWith(expect.any(Function));

        // Check if API was called
        expect(api.postUserMessage).toHaveBeenCalledWith('Hi', persona, undefined);
    });

    it('handles API errors gracefully', async () => {
        const setChat = vi.fn();
        const persona = { name: 'Cleopatra' };

        api.postUserMessage.mockRejectedValue(new Error('API Error'));

        const { result } = renderHook(() => useChatLogic({ chat: { messages: [] }, setChat, persona }));

        act(() => {
            result.current.setInput('Hi');
        });

        await act(async () => {
            await result.current.handleSendMessage({ preventDefault: vi.fn() });
        });

        // Should still try to update chat with error message
        expect(setChat).toHaveBeenCalled();
    });
});

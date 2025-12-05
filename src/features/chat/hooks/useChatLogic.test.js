import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useChatLogic from './useChatLogic';
import * as chatService from '../../../services/chatService';

// Mock API functions
vi.mock('../../../services/chatService', () => ({
    sendMessage: vi.fn(),
    getChatHistoryById: vi.fn(),
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

        chatService.sendMessage.mockResolvedValue({ reply: 'Hello User' });

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
        expect(chatService.sendMessage).toHaveBeenCalledWith('Hi', persona, undefined);
    });

    it('handles dialogueTree and mode updates', async () => {
        const setChat = vi.fn();
        const persona = { name: 'Cleopatra' };
        const initialChat = { messages: [], dialogueTree: { id: '1' } };

        chatService.sendMessage.mockResolvedValue({
            reply: 'Hello',
            treeState: { id: '2' },
            mode: 'interactive'
        });

        const { result } = renderHook(() => useChatLogic({ chat: initialChat, setChat, persona }));

        act(() => {
            result.current.setInput('Next');
        });

        await act(async () => {
            await result.current.handleSendMessage({ preventDefault: vi.fn() });
        });

        // Check if API was called with correct dialogueTree
        expect(chatService.sendMessage).toHaveBeenCalledWith('Next', persona, { id: '1' });

        // Check if state was updated with new dialogueTree and mode
        expect(setChat).toHaveBeenCalledWith(expect.any(Function));

        // Verify the updater function (second call is the API response update)
        const updater = setChat.mock.calls[1][0];
        const newState = updater(initialChat);

        expect(newState.dialogueTree).toEqual({ id: '2' });
        expect(newState.mode).toBe('interactive');
    });

    it('handles API errors gracefully', async () => {
        const setChat = vi.fn();
        const persona = { name: 'Cleopatra' };

        chatService.sendMessage.mockRejectedValue(new Error('API Error'));

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

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendMessage } from './chatMessageService';

// Mock the global fetch function
global.fetch = vi.fn();

describe('chatMessageService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends a message and returns the response data', async () => {
    // 1. Setup: Mock a successful API response
    const mockResponse = { reply: 'Hello from AI', mode: 'chat' };
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    // 2. Run
    const result = await sendMessage('Hi', { name: 'Cleopatra' }, null, []);

    // 3. Assert
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/chat'),
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('"message":"Hi"'),
      })
    );
  });

  it('handles server errors gracefully', async () => {
    // 1. Setup: Mock a 500 server error
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    // 2. Run
    const result = await sendMessage('Hi', { name: 'Cleopatra' }, null);

    // 3. Assert: Should return the safe fallback object, NOT crash
    expect(result).toEqual({
      reply: "I am having trouble reaching the scrolls. Please try again.",
      mode: 'error_network'
    });
  });

  it('handles network crashes (fetch throws)', async () => {
    // 1. Setup: Mock a total network failure
    global.fetch.mockRejectedValue(new Error('Network Down'));

    // 2. Run
    const result = await sendMessage('Hi', { name: 'Cleopatra' }, null);

    // 3. Assert: Should return the safe fallback object
    expect(result.mode).toBe('error_network');
  });
});
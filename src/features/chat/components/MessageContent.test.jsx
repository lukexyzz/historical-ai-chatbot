import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MessageContent from './MessageContent';

describe('MessageContent', () => {
    const mockMsg = {
        text: 'Hello world',
        timestamp: '10 Dec 12:00',
        name: 'User'
    };

    it('renders message text and timestamp', () => {
        render(<MessageContent msg={mockMsg} isUser={true} />);
        expect(screen.getByText('Hello world')).toBeInTheDocument();
        expect(screen.getByText('10 Dec 12:00')).toBeInTheDocument();
    });

    it('renders options when provided', () => {
        const msgWithOptions = { ...mockMsg, options: ['Option 1', 'Option 2'] };
        render(<MessageContent msg={msgWithOptions} isUser={false} />);
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('calls onSendOption when option is clicked', () => {
        const onSendOption = vi.fn();
        const msgWithOptions = { ...mockMsg, options: ['Option 1'] };
        render(
            <MessageContent
                msg={msgWithOptions}
                isUser={false}
                onSendOption={onSendOption}
                messageIndex={0}
            />
        );

        fireEvent.click(screen.getByText('Option 1'));
        expect(onSendOption).toHaveBeenCalledWith('Option 1', 0);
    });
});

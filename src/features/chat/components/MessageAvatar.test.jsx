import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MessageAvatar from './MessageAvatar';

describe('MessageAvatar', () => {
    it('renders user avatar when isUser is true', () => {
        render(<MessageAvatar isUser={true} />);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('alt', 'User');
        expect(img).toHaveAttribute('src', expect.stringContaining('/images/user.svg'));
    });

    it('renders persona avatar when isUser is false', () => {
        const persona = { name: 'Cleopatra', avatar: '/images/cleopatra.svg' };
        render(<MessageAvatar isUser={false} persona={persona} />);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('alt', 'Cleopatra');
        expect(img).toHaveAttribute('src', expect.stringContaining('/images/cleopatra.svg'));
    });
});

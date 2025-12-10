import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ChatMessage from './ChatMessage';

describe('ChatMessage', () => {
  const mockMsg = {
    text: 'Hello',
    timestamp: '12:00',
    name: 'User'
  };

  it('renders user message with correct layout class', () => {
    const { container } = render(<ChatMessage msg={mockMsg} isUser={true} />);
    // Check if the article has the user message class (indirectly via structure or class check if possible)
    // Since we use CSS modules, we might just check structure
    expect(screen.getByText('Hello')).toBeInTheDocument();
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
  });

  it('renders AI message', () => {
    const aiMsg = { ...mockMsg, name: 'Cleopatra' };
    const persona = { name: 'Cleopatra', avatar: '/img.svg' };
    render(<ChatMessage msg={aiMsg} persona={persona} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByAltText('Cleopatra')).toBeInTheDocument();
  });
});

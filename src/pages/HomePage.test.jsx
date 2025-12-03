import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from './HomePage';
import { personas } from '../data/personas';

// Mock react-router-dom's useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

describe('Home Component', () => {
    it('renders the correct number of persona cards', () => {
        render(<Home />);
        // Check if we have a card for each persona
        const cards = screen.getAllByRole('button');
        expect(cards).toHaveLength(personas.length);
    });

    it('displays persona information correctly', () => {
        render(<Home />);
        // Check if the first persona's name is visible
        expect(screen.getByText(personas[0].name)).toBeInTheDocument();
    });

    it('navigates to /chat with persona state when a card is clicked', () => {
        render(<Home />);

        const firstCard = screen.getAllByRole('button')[0];
        fireEvent.click(firstCard);

        expect(mockNavigate).toHaveBeenCalledWith('/chat', {
            state: { persona: personas[0] }
        });
    });
});

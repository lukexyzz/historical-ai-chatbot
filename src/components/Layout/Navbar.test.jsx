import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from './Navbar';

// Mock child components
vi.mock('./LangDropdown', () => ({
    default: () => <div data-testid="lang-dropdown">LangDropdown</div>
}));

vi.mock('../Chat/HomeButton', () => ({
    default: () => <div data-testid="home-button">HomeButton</div>
}));

describe('Navbar Component', () => {
    it('renders correctly with persona name', () => {
        render(<Navbar personaName="Cleopatra" />);
        expect(screen.getByText('Talk with Cleopatra')).toBeInTheDocument();
        expect(screen.getByTestId('lang-dropdown')).toBeInTheDocument();
        expect(screen.getByTestId('home-button')).toBeInTheDocument();
    });

    it('renders default title if no persona name provided', () => {
        render(<Navbar />);
        expect(screen.getByText('Talk with ...')).toBeInTheDocument();
    });

    it('calls onMenuClick when menu button is clicked', () => {
        const onMenuClick = vi.fn();
        render(<Navbar onMenuClick={onMenuClick} />);

        const menuButton = screen.getByLabelText('Open menu');
        fireEvent.click(menuButton);

        expect(onMenuClick).toHaveBeenCalledTimes(1);
    });
});

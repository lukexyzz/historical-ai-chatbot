import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App', () => {
    it('renders without crashing', () => {
        render(<App />);
        // Since we don't know exactly what's in App yet, we'll just check if it renders.
        // Ideally we'd look for a specific element, e.g.:
        // expect(screen.getByText(/some text/i)).toBeInTheDocument();
        expect(document.body).toBeInTheDocument();
    });
});

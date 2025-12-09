import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Grid from './Grid';

describe('Grid Component', () => {
    it('renders items correctly', () => {
        const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
        render(
            <Grid
                items={items}
                renderItem={(item) => <div key={item.id}>{item.name}</div>}
            />
        );

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('renders empty state when items are empty', () => {
        render(<Grid items={[]} emptyState={<p>Empty List</p>} />);
        expect(screen.getByText('Empty List')).toBeInTheDocument();
    });

    it('renders default empty state when no emptyState prop is provided', () => {
        render(<Grid items={[]} />);
        expect(screen.getByText('No items found.')).toBeInTheDocument();
    });
});

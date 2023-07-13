import { render, screen } from '@testing-library/react';
import Home from './Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient();

test('renders learn react link', () => {
    render(
        <QueryClientProvider client={queryClient}>
            <Home />
        </QueryClientProvider>,
        { wrapper: MemoryRouter }
    );
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

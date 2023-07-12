import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';

test('renders Header correctly', async () => {
    render(<Footer />, { wrapper: MemoryRouter });

    const faq = screen.getByText('FAQ');
    expect(faq).toBeVisible();

    const aboutUs = screen.getByText('About Us');
    expect(aboutUs).toBeVisible();

    const legal = screen.getByText('Legal');
    expect(legal).toBeVisible();

    const data = screen.getByText('Data');
    expect(data).toBeVisible();

    const download = screen.getByText('Download');
    expect(download).toBeVisible();

    const manuscript = screen.getByText('Manuscript');
    expect(manuscript).toBeVisible();
});

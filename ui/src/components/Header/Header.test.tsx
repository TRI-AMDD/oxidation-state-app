import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

test('renders Header correctly', async () => {
    render(<Header />, { wrapper: MemoryRouter });

    const faq = screen.getByText('FAQ');
    expect(faq).toBeVisible();

    const aboutUs = screen.getByText('About Us');
    expect(aboutUs).toBeVisible();
});

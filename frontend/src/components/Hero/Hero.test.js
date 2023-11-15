import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Hero from './index';

//mock scroll section
Hero.prototype.scrollToSection = jest.fn();

describe('<Hero/>', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <Router>
                <Hero />
            </Router>
        );
        expect(container).toBeTruthy();
    })

    it('renders the title correctly', () => {
        const { getByText } = render(
            <Router>
                <Hero />
            </Router>
        );
        expect(getByText('Fetch Friend Finder')).toBeInTheDocument();
    });

    it('shows login button when not logged in', () => {
        localStorage.setItem('isLoggedIn', 'false');
        const { getByText } = render(
            <Router>
                <Hero />
            </Router>
        );
        expect(getByText('Log In')).toBeInTheDocument();
    });

    it('shows view pets button when logged in', () => {
        localStorage.setItem('isLoggedIn', 'true');
        const { getByText } = render(
            <Router>
                <Hero />
            </Router>
        );
        expect(getByText('View Pets')).toBeInTheDocument();
    });

    it('renders the hero image with correct alt text', () => {
        const { getByAltText } = render(
            <Router>
                <Hero />
            </Router>
        );
        expect(getByAltText('Darron dog')).toBeInTheDocument();
    });

    it('renders the correct contact link', () => {
        const { getByText } = render(
            <Router>
                <Hero />
            </Router>
        );
        expect(getByText('1050 E Washington Ave Suite 200 Madison, WI 53703').closest('a')).toHaveAttribute('href', 'https://fetch.com/');
    });
})